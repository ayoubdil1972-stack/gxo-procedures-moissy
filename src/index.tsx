import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { loginRenderer } from './login-renderer'
import { simpleRenderer } from './simple-renderer'
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
// ChauffeurConsignesPage : Now using static HTML files in /static/consignes/
import { ChauffeurInscriptionPage } from './pages/chauffeur-inscription'
import { ChauffeurTachesPage } from './pages/chauffeur-taches'
import { AdminDashboardChauffeurs } from './pages/admin-dashboard-chauffeurs'
import { traduireTexte } from './services/translation'
import * as workflowAPI from './routes/chauffeur-workflow-api'

type Bindings = {
  DB: D1Database;
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

// Page des tâches chauffeur
app.get('/chauffeur/taches', (c) => {
  const id = c.req.query('id');
  const lang = c.req.query('lang') || 'fr';
  if (!id) {
    return c.redirect('/chauffeur/langue');
  }
  return c.html(ChauffeurTachesPage({ lang, chauffeurId: id }));
});

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
    
    // Mapping tâche → colonne booléenne
    const colonneMap = {
      'epi': 'task_epi_porte',
      'placement': 'task_placement_quai',
      'palette': 'task_palette_change',
      'accueil': 'task_accueil_notifie',
      'clefs': 'task_clefs_remises'
    }
    
    // Mapping tâche → colonne timestamp
    const colonneTimeMap = {
      'epi': 'task_epi_time',
      'placement': 'task_placement_time',
      'palette': 'task_palette_time',
      'accueil': 'task_accueil_time',
      'clefs': 'task_clefs_time'
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

// API: Envoyer message chat (chauffeur → admin)
app.post('/api/chauffeur/chat', async (c) => {
  try {
    const { chauffeur_id, message } = await c.req.json()
    
    // Récupérer la langue du chauffeur
    const chauffeur = await c.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(chauffeur_id).first()
    
    const langueChauffeur = chauffeur?.langue || 'fr'
    
    // Traduire le message en français pour l'admin (si ce n'est pas déjà en français)
    let traductionFr = message
    if (langueChauffeur !== 'fr') {
      traductionFr = await traduireTexte(message, 'fr', langueChauffeur)
    }
    
    // Insérer le message avec traduction + statuts (delivered_at = now, sender_online = 1)
    await c.env.DB.prepare(`
      INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_fr, delivered_at, sender_online)
      VALUES (?, 'chauffeur', ?, ?, ?, datetime('now'), 1)
    `).bind(chauffeur_id, message, langueChauffeur, traductionFr).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi message:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Récupérer messages chat avec traductions
app.get('/api/chauffeur/chat', async (c) => {
  try {
    const chauffeur_id = c.req.query('chauffeur_id')
    
    // Récupérer la langue du chauffeur
    const chauffeur = await c.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(chauffeur_id).first()
    
    const langueChauffeur = chauffeur?.langue || 'fr'
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM chat_messages 
      WHERE chauffeur_id = ? 
      ORDER BY timestamp ASC
    `).bind(chauffeur_id).all()
    
    return c.json({ 
      success: true, 
      messages: results,
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
    
    // Mettre à jour ou créer la session
    // On utilise INSERT ... ON CONFLICT pour gérer les deux cas
    await c.env.DB.prepare(`
      INSERT INTO chauffeur_sessions (chauffeur_id, last_heartbeat, is_online, page_url)
      VALUES (?, datetime('now'), 1, ?)
      ON CONFLICT(chauffeur_id) 
      DO UPDATE SET 
        last_heartbeat = datetime('now'),
        is_online = 1,
        page_url = excluded.page_url
    `).bind(chauffeur_id, page_url || '').run()
    
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
    
    // Récupérer la session du chauffeur
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
  } catch (error) {
    console.error('Erreur statut en ligne:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Liste des chauffeurs en cours (pour admin)
app.get('/api/chauffeur/liste', async (c) => {
  try {
    // Récupérer les chauffeurs avec leur statut en ligne via LEFT JOIN
    const { results } = await c.env.DB.prepare(`
      SELECT 
        ca.*,
        cs.last_heartbeat,
        cs.is_online,
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
    
    // Récupérer la langue du chauffeur
    const chauffeur = await c.env.DB.prepare(`
      SELECT langue FROM chauffeur_arrivals WHERE id = ?
    `).bind(chauffeur_id).first()
    
    const langueChauffeur = chauffeur?.langue || 'fr'
    
    // Traduire le message dans la langue du chauffeur (si ce n'est pas français)
    let traductionChauffeur = message
    if (langueChauffeur !== 'fr') {
      traductionChauffeur = await traduireTexte(message, langueChauffeur, 'fr')
    }
    
    // Insérer le message avec traduction + statuts (delivered_at = now, sender_online = 1)
    await c.env.DB.prepare(`
      INSERT INTO chat_messages (chauffeur_id, sender, message, original_lang, translated_chauffeur, delivered_at, sender_online)
      VALUES (?, 'admin', ?, 'fr', ?, datetime('now'), 1)
    `).bind(chauffeur_id, message, traductionChauffeur).run()
    
    return c.json({ success: true })
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

export default app
