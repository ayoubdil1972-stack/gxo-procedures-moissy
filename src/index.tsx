import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { loginRenderer } from './login-renderer'
import { traduireTexte } from './services/translation'
import { HomePage } from './pages/home'
import { ReceptionPage } from './pages/reception'
import { AccueilChauffeurPage } from './pages/accueil-chauffeur'
import { AdministrateurPage } from './pages/administrateur'
import { ControleurPage } from './pages/controleur'
import { AgentQuaiPage } from './pages/agent-quai'
import { NouveauPage } from './pages/nouveau'
import { AnomaliesPage } from './pages/anomalies'
import { BibliothequePage } from './pages/bibliotheque'
import { ContactsPage } from './pages/contacts'
import { LoginPage } from './pages/login'
import { QRCodeChauffeurPage } from './pages/qrcode-chauffeur'
import { ChauffeurLanguePage } from './pages/chauffeur-langue'
import { ChauffeurInscriptionPage } from './pages/chauffeur-inscription'
import { ChauffeurTachesPage } from './pages/chauffeur-taches'
import { AdminDashboardChauffeurs } from './pages/admin-dashboard-chauffeurs'
import { GestionQuaisPage } from './pages/gestion-quais'
import * as workflowAPI from './routes/chauffeur-workflow-api'

type Bindings = {
  DB: D1Database;
  GOOGLE_TRANSLATE_API_KEY?: string; // Clé API Google Cloud Translation
}

const app = new Hono<{ Bindings: Bindings }>()

// Serve static files - Pour Cloudflare Workers, les fichiers sont dans dist/
app.use('/static/*', serveStatic({ 
  root: './',
  onNotFound: (path, c) => {
    console.log('Fichier non trouvé:', path)
    return c.notFound()
  }
}))

// Route de connexion (sans authentification)
app.get('/login', loginRenderer, (c) => c.render(<LoginPage />))

// ===== ROUTES CHAUFFEURS (PUBLIC - Sans authentification) =====

// Page QR Code
app.get('/qrcode-chauffeur', loginRenderer, (c) => c.render(<QRCodeChauffeurPage />))

// Page sélection langue
app.get('/chauffeur/langue', loginRenderer, (c) => c.render(<ChauffeurLanguePage />))

// Page gestion des quais (interface avec glissement)
app.get('/gestion-quais', loginRenderer, (c) => c.render(<GestionQuaisPage />))

// ===== PAGES CHAUFFEUR PUBLIC (Sans authentification) =====

// Page consignes - Redirection vers fichiers HTML statiques (Cloudflare Pages sert automatiquement public/)
// Note: Cloudflare Pages fait automatiquement un redirect de .html vers sans extension
app.get('/chauffeur/consignes', (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.redirect(`/consignes/${lang}`)
})

// Redirection ancienne URL vers nouvelle (compatibilité)
app.get('/chauffeur/video', (c) => c.redirect('/chauffeur/consignes?lang=' + (c.req.query('lang') || 'fr')))

// Page inscription et tâches
app.get('/chauffeur/inscription', (c) => {
  const lang = c.req.query('lang') || 'fr';
  return c.html(ChauffeurInscriptionPage({ lang }));
});

// Page des tâches chauffeur - VERSION FRANÇAISE SIMPLE
app.get('/chauffeur/taches', loginRenderer, (c) => c.render(<ChauffeurTachesPage />));

// ===== API CHAUFFEURS =====

// API: Inscription chauffeur
app.post('/api/chauffeur/inscription', async (c) => {
  try {
    const { pseudo, entreprise, numero_quai, langue, video_completed } = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO chauffeur_arrivals (
        pseudo, entreprise, numero_quai, langue, video_completed, 
        status, arrival_time
      )
      VALUES (?, ?, ?, ?, ?, 'in_progress', CURRENT_TIMESTAMP)
    `).bind(pseudo, entreprise, numero_quai, langue, video_completed ? 1 : 0).run()
    
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    console.error('Erreur inscription:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Valider une tâche
app.post('/api/chauffeur/valider-tache', async (c) => {
  try {
    const { chauffeur_id, tache } = await c.req.json()
    
    // Mapping tâche → colonne booléenne (accepte les deux formats)
    const colonneMap = {
      'epi': 'task_epi_porte',
      'task_epi_porte': 'task_epi_porte',
      'placement': 'task_placement_quai',
      'task_placement_quai': 'task_placement_quai',
      'palette': 'task_palette_change',
      'task_palette_change': 'task_palette_change',
      'accueil': 'task_accueil_notifie',
      'task_accueil_notifie': 'task_accueil_notifie',
      'clefs': 'task_clefs_remises',
      'task_clefs_remises': 'task_clefs_remises'
    }
    
    // Mapping tâche → colonne timestamp
    const colonneTimeMap = {
      'epi': 'task_epi_time',
      'task_epi_porte': 'task_epi_time',
      'placement': 'task_placement_time',
      'task_placement_quai': 'task_placement_time',
      'palette': 'task_palette_time',
      'task_palette_change': 'task_palette_time',
      'accueil': 'task_accueil_time',
      'task_accueil_notifie': 'task_accueil_time',
      'clefs': 'task_clefs_time',
      'task_clefs_remises': 'task_clefs_time'
    }
    
    const colonne = colonneMap[tache]
    const colonneTime = colonneTimeMap[tache]
    
    if (!colonne || !colonneTime) {
      return c.json({ success: false, error: 'Tâche invalide' }, 400)
    }
    
    await c.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET ${colonne} = 1, ${colonneTime} = datetime('now')
      WHERE id = ?
    `).bind(chauffeur_id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur validation tâche:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Récupérer la progression
app.get('/api/chauffeur/progression', async (c) => {
  try {
    const id = c.req.query('id')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM chauffeur_arrivals WHERE id = ?
    `).bind(id).first()
    
    return c.json({ success: true, ...result })
  } catch (error) {
    console.error('Erreur progression:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Auto-migration: Créer/mettre à jour la table chat_messages avec colonnes de traduction
async function ensureChatTableSchema(db: D1Database) {
  try {
    // Créer la table avec toutes les colonnes si elle n'existe pas
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chauffeur_id INTEGER NOT NULL,
        sender TEXT NOT NULL DEFAULT 'chauffeur',
        message TEXT NOT NULL,
        original_lang TEXT DEFAULT 'fr',
        translated_fr TEXT,
        translated_chauffeur TEXT,
        read_by_admin INTEGER DEFAULT 0,
        read_by_chauffeur INTEGER DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
      )
    `).run()
    
    // Ajouter les index
    await db.prepare(`CREATE INDEX IF NOT EXISTS idx_chat_messages_chauffeur_id ON chat_messages(chauffeur_id)`).run()
    await db.prepare(`CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp)`).run()
    
    console.log('✅ Table chat_messages prête avec colonnes de traduction')
  } catch (error) {
    console.error('⚠️ Erreur auto-migration chat_messages:', error.message)
  }
}

// API: Envoyer message chat (chauffeur → admin OU admin → chauffeur)
app.post('/api/chauffeur/chat', async (c) => {
  try {
    // Assurer que la table a la bonne structure
    await ensureChatTableSchema(c.env.DB)
    
    const { chauffeur_id, message, sender, lang } = await c.req.json()
    
    if (!chauffeur_id || !message) {
      return c.json({ success: false, error: 'Données manquantes' }, 400)
    }
    
    // CORRECTIF 2: Utiliser le paramètre lang envoyé par le frontend en priorité
    // Sinon, récupérer la langue du chauffeur depuis la DB
    let langueChauffeur = lang || 'fr'
    
    if (!lang) {
      // Fallback : récupérer la langue depuis la DB si non fournie
      const chauffeur = await c.env.DB.prepare(`
        SELECT langue FROM chauffeur_arrivals WHERE id = ?
      `).bind(chauffeur_id).first()
      
      langueChauffeur = chauffeur?.langue || 'fr'
    }
    
    const senderType = sender || 'chauffeur' // 'chauffeur' ou 'admin'
    
    console.log(`📝 [CHAT] Message reçu - Sender: ${senderType}, Langue: ${langueChauffeur} (source: ${lang ? 'frontend' : 'DB'})`)
    
    // Traduction du message
    let translated_fr = message
    let translated_chauffeur = message
    let originalLang = langueChauffeur
    
    if (senderType === 'chauffeur') {
      // Chauffeur → Admin : traduire vers le français avec autodetect
      console.log(`🌐 [CHAT] Chauffeur → Admin - Message: "${message.substring(0, 50)}..."`)
      if (langueChauffeur !== 'fr') {
        // Utiliser autodetect pour détecter automatiquement la langue
        translated_fr = await traduireTexte(message, 'fr', 'auto', c.env.GOOGLE_TRANSLATE_API_KEY)
        console.log(`✅ [CHAT] Traduction FR: "${translated_fr.substring(0, 50)}..."`)
      } else {
        console.log(`ℹ️ [CHAT] Chauffeur français - pas de traduction nécessaire`)
      }
      originalLang = langueChauffeur
      translated_chauffeur = message // Le message original du chauffeur
    } else {
      // Admin → Chauffeur : traduire vers la langue du chauffeur
      console.log(`🌐 [CHAT] Admin → Chauffeur - Message: "${message.substring(0, 50)}..."`)
      if (langueChauffeur !== 'fr') {
        translated_chauffeur = await traduireTexte(message, langueChauffeur, 'fr', c.env.GOOGLE_TRANSLATE_API_KEY)
        console.log(`✅ [CHAT] Traduction ${langueChauffeur}: "${translated_chauffeur.substring(0, 50)}..."`)
      } else {
        console.log(`ℹ️ [CHAT] Chauffeur français - pas de traduction nécessaire`)
      }
      originalLang = 'fr'
      translated_fr = message // Le message original de l'admin (français)
    }
    
    // Insérer le message avec traductions
    console.log(`💾 [CHAT] Insertion DB - message: "${message.substring(0, 30)}...", translated_fr: "${translated_fr.substring(0, 30)}...", translated_chauffeur: "${translated_chauffeur.substring(0, 30)}..."`)
    
    await c.env.DB.prepare(`
      INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_fr, translated_chauffeur, read_by_admin, read_by_chauffeur)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      chauffeur_id, 
      senderType, 
      message, 
      originalLang,
      translated_fr,
      translated_chauffeur,
      senderType === 'chauffeur' ? 0 : 1, // Si chauffeur envoie, admin n'a pas lu
      senderType === 'admin' ? 0 : 1      // Si admin envoie, chauffeur n'a pas lu
    ).run()
    
    console.log(`✅ [CHAT] Message enregistré avec succès - ID chauffeur: ${chauffeur_id}`)
    
    return c.json({ success: true, translated_fr, translated_chauffeur })
  } catch (error) {
    console.error('Erreur envoi message:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Récupérer messages chat avec traductions
app.get('/api/chauffeur/chat', async (c) => {
  try {
    // Assurer que la table a la bonne structure
    await ensureChatTableSchema(c.env.DB)
    
    const chauffeur_id = c.req.query('id') || c.req.query('chauffeur_id')
    const viewer = c.req.query('viewer') || 'chauffeur' // 'chauffeur' ou 'admin'
    
    console.log(`📥 [CHAT GET] Récupération messages - Chauffeur: ${chauffeur_id}, Viewer: ${viewer}`)
    
    // Récupérer la langue du chauffeur
    const chauffeur = await c.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(chauffeur_id).first()
    
    const langueChauffeur = chauffeur?.langue || 'fr'
    console.log(`ℹ️ [CHAT GET] Langue chauffeur: ${langueChauffeur}`)
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM chat_messages 
      WHERE chauffeur_id = ? 
      ORDER BY timestamp ASC
    `).bind(chauffeur_id).all()
    
    console.log(`📊 [CHAT GET] Nombre de messages: ${results.length}`)
    
    // Retourner tous les messages avec leurs traductions
    // Le frontend décide quoi afficher (original ou traduction)
    const messages = results.map(msg => {
      const processed = {
        ...msg,
        // Garder tous les champs originaux
        message: msg.message,
        translated_fr: msg.translated_fr || msg.message,
        translated_chauffeur: msg.translated_chauffeur || msg.message,
        original_lang: msg.original_lang || 'fr'
      }
      
      // Log premier message pour debug
      if (msg.id === results[0]?.id) {
        console.log(`📝 [CHAT GET] Premier message - message: "${msg.message?.substring(0, 30)}...", translated_fr: "${msg.translated_fr?.substring(0, 30)}...", translated_chauffeur: "${msg.translated_chauffeur?.substring(0, 30)}..."`)
      }
      
      return processed
    })
    
    return c.json({ 
      success: true, 
      messages: messages,
      chauffeur_langue: langueChauffeur
    })
  } catch (error) {
    console.error('Erreur récupération messages:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Heartbeat pour indiquer qu'un utilisateur est en ligne
app.post('/api/chat/heartbeat', async (c) => {
  try {
    const { chauffeur_id, page_url } = await c.req.json()
    
    // Essayer de mettre à jour la session
    try {
      await c.env.DB.prepare(`
        INSERT INTO chauffeur_sessions (chauffeur_id, last_heartbeat, is_online, page_url)
        VALUES (?, datetime('now'), 1, ?)
        ON CONFLICT(chauffeur_id) 
        DO UPDATE SET 
          last_heartbeat = datetime('now'),
          is_online = 1,
          page_url = excluded.page_url
      `).bind(chauffeur_id, page_url || '').run()
    } catch (tableError) {
      // Si la table n'existe pas, ignorer silencieusement
      console.log('Table chauffeur_sessions not found, heartbeat skipped')
    }
    
    return c.json({ success: true, online: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Erreur heartbeat:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Vérifier si un utilisateur est en ligne (basé sur le dernier heartbeat)
app.get('/api/chat/online-status', async (c) => {
  try {
    const chauffeur_id = c.req.query('chauffeur_id')
    
    // Essayer de récupérer la session du chauffeur
    try {
      const session = await c.env.DB.prepare(`
        SELECT last_heartbeat, is_online,
               (julianday('now') - julianday(last_heartbeat)) * 86400 as seconds_ago
        FROM chauffeur_sessions
        WHERE chauffeur_id = ?
      `).bind(chauffeur_id).first()
      
      // Considérer en ligne si heartbeat < 30 secondes
      const isOnline = session && session.seconds_ago < 30
      
      return c.json({ 
        success: true, 
        online: isOnline,
        last_heartbeat: session?.last_heartbeat || null,
        seconds_ago: session?.seconds_ago || null
      })
    } catch (tableError) {
      // Si la table n'existe pas, retourner offline par défaut
      console.log('Table chauffeur_sessions not found, returning offline')
      return c.json({ 
        success: true, 
        online: false,
        last_heartbeat: null,
        seconds_ago: null
      })
    }
  } catch (error) {
    console.error('Erreur statut en ligne:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Liste des chauffeurs en cours (pour admin)
app.get('/api/chauffeur/liste', async (c) => {
  try {
    // Vérifier si la table chauffeur_sessions existe
    let query = `
      SELECT 
        ca.*,
        0 as online_status
      FROM chauffeur_arrivals ca
      WHERE ca.status = 'in_progress' 
      ORDER BY ca.arrival_time DESC
    `
    
    try {
      // Essayer avec LEFT JOIN si la table existe
      const { results } = await c.env.DB.prepare(`
        SELECT 
          ca.*,
          cs.last_heartbeat,
          cs.is_online,
          cs.page_url,
          CASE 
            WHEN cs.last_heartbeat IS NOT NULL 
              AND (julianday('now') - julianday(cs.last_heartbeat)) * 86400 < 30 
            THEN 1 
            ELSE 0 
          END as online_status
        FROM chauffeur_arrivals ca
        LEFT JOIN chauffeur_sessions cs ON ca.id = cs.chauffeur_id
        WHERE ca.status = 'in_progress' 
        ORDER BY ca.arrival_time DESC
      `).all()
      
      return c.json({ success: true, chauffeurs: results })
    } catch (joinError) {
      // Si le JOIN échoue (table n'existe pas), utiliser query simple
      console.log('Table chauffeur_sessions not found, using simple query')
      const { results } = await c.env.DB.prepare(query).all()
      return c.json({ success: true, chauffeurs: results })
    }
  } catch (error) {
    console.error('Erreur liste chauffeurs:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Middleware pour vérifier l'authentification (toutes les autres routes)
app.use('*', async (c, next) => {
  const path = c.req.path
  
  // Routes publiques : login, test, fichiers statiques, et TOUTES les routes chauffeur
  const publicPaths = [
    '/login',
    '/test-questionnaire',
    '/qrcode-chauffeur',
    '/chauffeur/langue',
    '/chauffeur/video',
    '/chauffeur/inscription',
    '/chauffeur/taches'
  ];
  
  if (publicPaths.includes(path) || path.startsWith('/static/') || path.startsWith('/api/chauffeur/')) {
    await next()
    return
  }
  
  // Vérifier l'authentification côté client (géré par JavaScript)
  // Note: Pour une sécurité maximale en production, utiliser des sessions côté serveur
  await next()
})

// Use renderer middleware pour les pages protégées
app.use(renderer)

// Routes protégées
app.get('/', (c) => c.render(<HomePage />))
app.get('/reception', (c) => c.render(<ReceptionPage />))
app.get('/accueil-chauffeur', (c) => c.render(<AccueilChauffeurPage />))
app.get('/administrateur', (c) => c.render(<AdministrateurPage />))
app.get('/controleur', (c) => c.render(<ControleurPage />))
app.get('/agent-quai', (c) => c.render(<AgentQuaiPage />))
app.get('/nouveau', (c) => c.render(<NouveauPage />))
app.get('/anomalies', (c) => c.render(<AnomaliesPage />))
app.get('/bibliotheque', (c) => c.render(<BibliothequePage />))
app.get('/contacts', (c) => c.render(<ContactsPage />))

// Dashboard Admin Chauffeurs (route protégée)
app.get('/admin/chauffeurs-dashboard', (c) => c.render(<AdminDashboardChauffeurs />))

// API Admin supplémentaires
app.post('/api/admin/chat', async (c) => {
  try {
    const { chauffeur_id, message } = await c.req.json()
    
    if (!chauffeur_id || !message) {
      return c.json({ success: false, error: 'Données manquantes' }, 400)
    }
    
    // Récupérer la langue du chauffeur
    const chauffeur = await c.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(chauffeur_id).first()
    
    const langueChauffeur = chauffeur?.langue || 'fr'
    
    // Admin envoie toujours en français, traduire vers la langue du chauffeur
    let translated_chauffeur = message
    if (langueChauffeur !== 'fr') {
      translated_chauffeur = await traduireTexte(message, langueChauffeur, 'fr')
    }
    
    // Essayer d'insérer avec toutes les colonnes (nouvelle structure)
    try {
      await c.env.DB.prepare(`
        INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_fr, translated_chauffeur, read_by_admin, read_by_chauffeur)
        VALUES (?, 'admin', ?, 'fr', ?, ?, 1, 0)
      `).bind(chauffeur_id, message, message, translated_chauffeur).run()
    } catch (insertError) {
      // Si erreur (colonnes n'existent pas), utiliser structure simple
      console.log('Using simple chat_messages structure for admin')
      await c.env.DB.prepare(`
        INSERT INTO chat_messages (chauffeur_id, sender, message, read)
        VALUES (?, 'admin', ?, 0)
      `).bind(chauffeur_id, message).run()
    }
    
    return c.json({ success: true, translated: translated_chauffeur })
  } catch (error) {
    console.error('Erreur envoi message admin:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

app.post('/api/chauffeur/chat/mark-read', async (c) => {
  try {
    const { chauffeur_id, reader } = await c.req.json()
    const column = reader === 'admin' ? 'read_by_admin' : 'read_by_chauffeur'
    
    // Mettre à jour à la fois le booléen et le timestamp read_at
    await c.env.DB.prepare(`
      UPDATE chat_messages 
      SET ${column} = 1, read_at = datetime('now')
      WHERE chauffeur_id = ? AND ${column} = 0
    `).bind(chauffeur_id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur marquage lu:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Clôturer un chauffeur (admin)
app.post('/api/admin/cloturer-chauffeur', async (c) => {
  try {
    const { chauffeur_id } = await c.req.json()
    
    // Marquer le chauffeur comme completed et changer le status
    await c.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET status = 'completed', 
          completed = 1,
          completion_time = datetime('now')
      WHERE id = ?
    `).bind(chauffeur_id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur clôture chauffeur:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

app.get('/api/notifications/non-lues', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM notifications 
      WHERE read = 0 
      ORDER BY timestamp DESC
      LIMIT 10
    `).all()
    
    return c.json({ success: true, notifications: results })
  } catch (error) {
    console.error('Erreur notifications:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

app.post('/api/notification/mark-read', async (c) => {
  try {
    const { notification_id } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE notifications SET read = 1 WHERE id = ?
    `).bind(notification_id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur marquage notification:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Admin: Clôturer le départ d'un chauffeur
app.post('/api/admin/cloturer-chauffeur', async (c) => {
  try {
    const { chauffeur_id } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE chauffeur_arrivals 
      SET status = 'completed', 
          departure_time = datetime('now')
      WHERE id = ?
    `).bind(chauffeur_id).run()
    
    console.log(`✅ Chauffeur ${chauffeur_id} clôturé`)
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur clôture chauffeur:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

app.post('/api/chauffeur/notification', async (c) => {
  try {
    const { chauffeur_id, type, titre, message } = await c.req.json()
    
    await c.env.DB.prepare(`
      INSERT INTO notifications (chauffeur_id, type, titre, message)
      VALUES (?, ?, ?, ?)
    `).bind(chauffeur_id, type, titre, message).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur création notification:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ===== NOUVEAU WORKFLOW CHAUFFEUR - API ROUTES =====

// POST /api/chauffeurs/inscription - Inscription nouveau chauffeur
app.post('/api/chauffeurs/inscription', workflowAPI.inscriptionChauffeur);

// GET /api/chauffeurs/:id - Récupérer info chauffeur
app.get('/api/chauffeurs/:id', workflowAPI.getChauffeur);

// GET /api/chauffeurs/:id/taches - Récupérer tâches chauffeur
app.get('/api/chauffeurs/:id/taches', workflowAPI.getTachesChauffeur);

// POST /api/taches/:id/completer - Marquer tâche comme terminée
app.post('/api/taches/:id/completer', workflowAPI.completerTache);

// GET /api/chauffeurs/:id/messages - Récupérer messages chauffeur
app.get('/api/chauffeurs/:id/messages', workflowAPI.getMessagesChauffeur);

// POST /api/messages - Envoyer un message
app.post('/api/messages', workflowAPI.envoyerMessage);

// POST /api/messages/:id/marquer-vu - Marquer message comme vu
app.post('/api/messages/:id/marquer-vu', workflowAPI.marquerMessageVu);

// GET /api/admin/chauffeurs-actifs - Liste chauffeurs actifs (dashboard admin)
app.get('/api/admin/chauffeurs-actifs', workflowAPI.getChauffeursActifs);

// POST /api/admin/taches/assigner - Assigner nouvelle tâche
app.post('/api/admin/taches/assigner', workflowAPI.assignerTache);

// ===== GESTION DES QUAIS - API ROUTES =====

// GET /api/quais - Récupérer l'état de tous les quais
app.get('/api/quais', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM quai_status ORDER BY quai_numero ASC
    `).all()
    
    return c.json({ success: true, quais: results })
  } catch (error) {
    console.error('Erreur récupération quais:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/quais/:numero - Changer le statut d'un quai
app.post('/api/quais/:numero', async (c) => {
  try {
    const numero = parseInt(c.req.param('numero'))
    const { statut, commentaire, commentaire_auteur } = await c.req.json()
    
    // Liste des numéros de quais valides GXO Moissy (45 quais)
    const quaisValides = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, // 1-10
      32, 33, 34, 35, 36, 37, 38, // 32-38
      45, 46, 47, 48, 49, // 45-49
      60, 61, 62, // 60-62
      67, 68, 69, // 67-69
      75, 76, 77, 78, 79, // 75-79
      81, 82, 83, 84, 85, 86, 87, // 81-87
      99, 100, 101, 102, 103 // 99-103
    ]
    
    // Validation
    if (!quaisValides.includes(numero)) {
      return c.json({ success: false, error: `Numéro de quai invalide. Quais valides : ${quaisValides.join(', ')}` }, 400)
    }
    
    if (!['disponible', 'en_cours', 'indisponible'].includes(statut)) {
      return c.json({ success: false, error: 'Statut invalide' }, 400)
    }
    
    if (statut === 'indisponible' && !commentaire) {
      return c.json({ success: false, error: 'Commentaire obligatoire pour statut indisponible' }, 400)
    }
    
    // Mettre à jour le quai avec gestion du timer
    if (statut === 'en_cours') {
      // Démarrer le timer avec datetime SQLite
      await c.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = datetime('now'),
            commentaire = NULL,
            commentaire_auteur = NULL,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(statut, numero).run()
    } else if (statut === 'disponible') {
      // Réinitialiser le timer
      await c.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = NULL,
            commentaire = NULL,
            commentaire_auteur = NULL,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(statut, numero).run()
    } else {
      // Statut indisponible avec commentaire
      await c.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = NULL,
            commentaire = ?, 
            commentaire_auteur = ?,
            updated_at = datetime('now')
        WHERE quai_numero = ?
      `).bind(
        statut,
        commentaire || null,
        commentaire_auteur || null,
        numero
      ).run()
    }
    
    // Récupérer le quai mis à jour
    const quai = await c.env.DB.prepare(`
      SELECT * FROM quai_status WHERE quai_numero = ?
    `).bind(numero).first()
    
    return c.json({ success: true, quai })
  } catch (error) {
    console.error('Erreur mise à jour quai:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
