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
import { PDFBarcodesPage } from './pages/pdf-barcodes'
import { QRCodeGeneratorPage } from './pages/qrcode-generator'
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

// Page générateur PDF codes-barres (raw HTML)
app.get('/pdf-barcodes', (c) => {
  return c.html(PDFBarcodesPage())
})

// Page générateur QR Codes avec URL automatique
app.get('/qrcode-generator', (c) => {
  return c.html(QRCodeGeneratorPage())
})

// ===== ROUTE DE SCAN AUTOMATIQUE QR CODE =====
// Cette route est appelée automatiquement quand on scanne un QR Code
// URL Format: https://gxomoissyprocedures.com/scan?quai=75
app.get('/scan', (c) => {
  const quaiNumero = c.req.query('quai')
  const action = c.req.query('action') || 'start' // start, stop, info
  
  // Validation du numéro de quai
  if (!quaiNumero) {
    return c.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Scanner GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Code-barres invalide</h1>
          <p class="text-gray-600 mb-6">Le QR Code scanné ne contient pas de numéro de quai valide.</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `)
  }
  
  // Page de traitement automatique du scan
  return c.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scan Quai ${quaiNumero} - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <!-- État de chargement -->
        <div id="loading" class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            <i class="fas fa-qrcode text-blue-500 mr-2"></i>
            Traitement du scan...
          </h1>
          <p class="text-gray-600">Quai ${quaiNumero}</p>
        </div>
        
        <!-- Succès -->
        <div id="success" class="hidden text-center">
          <div class="text-6xl mb-4">✅</div>
          <h1 class="text-2xl font-bold text-green-600 mb-2">Scan réussi !</h1>
          <p class="text-gray-600 mb-4">Quai <span class="font-bold text-2xl text-blue-600">${quaiNumero}</span></p>
          <div class="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6">
            <p class="text-sm text-green-800 font-semibold mb-2">
              <i class="fas fa-check-circle mr-2"></i>
              Timer démarré
            </p>
            <p class="text-xs text-green-700">Le quai est maintenant marqué comme "En cours d'utilisation"</p>
          </div>
          <div class="space-y-3">
            <a href="/accueil-chauffeur" class="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
              <i class="fas fa-home mr-2"></i>
              Voir le tableau des quais
            </a>
            <button onclick="window.location.reload()" class="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
              <i class="fas fa-redo mr-2"></i>
              Scanner un autre quai
            </button>
          </div>
        </div>
        
        <!-- Erreur -->
        <div id="error" class="hidden text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-2">Erreur</h1>
          <p class="text-gray-600 mb-4" id="error-message">Une erreur s'est produite</p>
          <div class="space-y-3">
            <button onclick="window.location.reload()" class="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
              <i class="fas fa-redo mr-2"></i>
              Réessayer
            </button>
            <a href="/accueil-chauffeur" class="block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
              <i class="fas fa-home mr-2"></i>
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
      
      <script>
        // Auto-démarrage du timer pour le quai scanné
        async function autoStartQuai() {
          const quaiNumero = ${quaiNumero};
          const action = '${action}';
          
          console.log('🎯 Scan automatique détecté:', quaiNumero);
          console.log('📍 URL:', window.location.href);
          console.log('⚡ Action:', action);
          
          try {
            // Appel API pour démarrer le timer
            const response = await fetch('/api/quais/' + quaiNumero, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                statut: 'en_cours',
                commentaire: null,
                commentaire_auteur: 'Scan QR Code'
              })
            });
            
            const data = await response.json();
            console.log('✅ Réponse API:', data);
            
            if (data.success) {
              // Enregistrer le scan dans l'historique
              await fetch('/api/quai/scan', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  barcode: 'D' + String(quaiNumero).padStart(3, '0'),
                  quai: quaiNumero,
                  action: 'start_timer',
                  timestamp: new Date().toISOString()
                })
              });
              
              // Afficher le succès
              document.getElementById('loading').classList.add('hidden');
              document.getElementById('success').classList.remove('hidden');
              
              // Notification sonore (si disponible)
              try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKXi7LhjHgU7k9nyw3YpBSh+zPDajToJFl628ux8JAU2jdXzxnwsBS1+zPDajToJF2628ux8JAU2jdXzxnwsBS1+zPDajToJF2628ux8JAU=');
                audio.play().catch(() => console.log('Audio non disponible'));
              } catch (e) {
                console.log('Notification sonore non disponible');
              }
              
              // PAS de redirection automatique - l'agent reste sur la page de confirmation
              // Il peut cliquer manuellement sur "Voir le tableau des quais" s'il le souhaite
              console.log('✅ Scan terminé - Restez sur cette page ou cliquez sur un bouton pour naviguer');
            } else {
              throw new Error(data.error || 'Erreur inconnue');
            }
          } catch (error) {
            console.error('❌ Erreur:', error);
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('error-message').textContent = error.message || 'Impossible de démarrer le timer';
          }
        }
        
        // Démarrage automatique au chargement de la page
        window.addEventListener('load', autoStartQuai);
      </script>
    </body>
    </html>
  `)
})

// ===== ROUTE DE SCAN FIN DE DÉCHARGEMENT =====
// Cette route est appelée quand on scanne le QR Code de fin de déchargement
// URL Format: https://gxomoissyprocedures.com/scan-fin-dechargement?quai=75
app.get('/scan-fin-dechargement', (c) => {
  const quaiNumero = c.req.query('quai')
  
  // Validation du numéro de quai
  if (!quaiNumero) {
    return c.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - Scanner GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Code-barres invalide</h1>
          <p class="text-gray-600 mb-6">Le QR Code scanné ne contient pas de numéro de quai valide.</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `)
  }
  
  // Générer les options de palettes (1-33)
  const palettesOptions = Array.from({length: 33}, (_, i) => {
    const num = i + 1
    return `<option value="${num}">${num} palette${num > 1 ? 's' : ''}</option>`
  }).join('')
  
  // Page de formulaire de fin de déchargement
  return c.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fin Déchargement Quai ${quaiNumero} - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .checkbox-item:hover {
          border-color: #3b82f6;
          background-color: #eff6ff;
        }
        .checkbox-item input:checked + label {
          font-weight: 600;
          color: #2563eb;
        }
        .checkbox-item input:checked ~ .checkbox-border {
          border-color: #2563eb;
          background-color: #dbeafe;
        }
      </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-clipboard-check text-green-600 mr-3"></i>
                Fin de Déchargement
              </h1>
              <p class="text-gray-600 mt-2">Quai n°${quaiNumero}</p>
            </div>
            <div class="text-5xl">📦</div>
          </div>
        </div>

        <!-- Formulaire -->
        <form id="fin-dechargement-form" class="space-y-6">
          <!-- Informations agent et fournisseur -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="grid md:grid-cols-3 gap-4">
              <!-- Nom -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-user text-blue-600 mr-2"></i>
                  Nom de l'agent
                </label>
                <input 
                  type="text" 
                  id="nom-agent" 
                  name="nom_agent"
                  required
                  placeholder="Entrez votre nom"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <!-- N°ID -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-id-card text-purple-600 mr-2"></i>
                  N°ID
                </label>
                <input 
                  type="text" 
                  id="numero-id" 
                  name="numero_id"
                  required
                  placeholder="1827314"
                  pattern="[0-9]{7}"
                  maxlength="7"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  style="font-family: monospace;"
                />
              </div>

              <!-- Fournisseur -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-building text-indigo-600 mr-2"></i>
                  Fournisseur
                </label>
                <input 
                  type="text" 
                  id="fournisseur" 
                  name="fournisseur"
                  required
                  placeholder="Nom du fournisseur"
                  list="fournisseurs-datalist"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <datalist id="fournisseurs-datalist">
                  <!-- Suggestions seront chargées dynamiquement -->
                </datalist>
              </div>
            </div>
          </div>

          <!-- Nombre de palettes -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Palettes attendues -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-truck-loading text-orange-600 mr-2"></i>
                  Palettes attendues
                </label>
                <select 
                  id="palettes-attendues" 
                  name="palettes_attendues"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">Sélectionner...</option>
                  ${palettesOptions}
                </select>
              </div>

              <!-- Palettes reçues -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-check-circle text-green-600 mr-2"></i>
                  Palettes reçues
                </label>
                <select 
                  id="palettes-recues" 
                  name="palettes_recues"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">Sélectionner...</option>
                  ${palettesOptions}
                </select>
              </div>
            </div>
          </div>

          <!-- Palettes à rendre -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              <i class="fas fa-exchange-alt text-purple-600 mr-2"></i>
              Les palettes sont à rendre ?
            </label>
            <div class="flex gap-4">
              <label class="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="palettes_a_rendre" 
                  value="oui" 
                  required
                  class="peer hidden"
                />
                <div class="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300">
                  <i class="fas fa-check-circle text-2xl text-green-600 mb-2"></i>
                  <div>Oui</div>
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="palettes_a_rendre" 
                  value="non" 
                  required
                  class="peer hidden"
                />
                <div class="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300">
                  <i class="fas fa-times-circle text-2xl text-red-600 mb-2"></i>
                  <div>Non</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Problématiques -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
              Problématiques rencontrées (cocher si applicable)
            </label>
            <div class="space-y-2">
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_largeur"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes chargées en largeur</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_instables"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes instables / chargées de manière incorrecte</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_mal_dechargees"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes mal déchargées</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="marchandises_dangereuses"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Marchandises dangereuses non chargées à l'arrière</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="palettes_mal_filmees"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Palettes mal filmées</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="mauvais_formulaire_tu"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700">Mauvais formulaire TU entrant</span>
              </label>
              
              <label class="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <input 
                  type="checkbox" 
                  name="probleme[]" 
                  value="autres"
                  id="probleme-autres"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-3 text-gray-700 font-semibold">Autres</span>
              </label>
            </div>

            <!-- Champ Autres (affiché si "Autres" coché) -->
            <div id="autres-details" class="mt-4 hidden">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-edit text-orange-600 mr-2"></i>
                Précisez la problématique
              </label>
              <textarea 
                id="autres-commentaire"
                name="autres_commentaire"
                rows="3"
                placeholder="Décrivez la problématique..."
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Remarques -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <i class="fas fa-comment text-indigo-600 mr-2"></i>
              Remarques / Commentaires
            </label>
            <textarea 
              id="remarques"
              name="remarques"
              rows="4"
              placeholder="Ajoutez vos remarques ou commentaires..."
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            ></textarea>
          </div>

          <!-- Boutons -->
          <div class="flex gap-4">
            <button 
              type="submit"
              class="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              <i class="fas fa-check-circle mr-2"></i>
              Valider le Déchargement
            </button>
            <a 
              href="/accueil-chauffeur"
              class="bg-gray-200 text-gray-800 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              <i class="fas fa-times mr-2"></i>
              Annuler
            </a>
          </div>
        </form>

        <!-- Messages de succès/erreur -->
        <div id="success-message" class="hidden mt-6 bg-green-100 border-2 border-green-500 rounded-xl p-6 text-center">
          <div class="text-5xl mb-4">✅</div>
          <h2 class="text-2xl font-bold text-green-800 mb-2">Déchargement Validé !</h2>
          <p class="text-green-700 mb-4">Les informations ont été enregistrées avec succès.</p>
          <div class="flex gap-4 justify-center">
            <a href="/accueil-chauffeur" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
              <i class="fas fa-home mr-2"></i>
              Retour à l'accueil
            </a>
            <button onclick="window.location.reload()" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all">
              <i class="fas fa-redo mr-2"></i>
              Nouveau formulaire
            </button>
          </div>
        </div>

        <div id="error-message" class="hidden mt-6 bg-red-100 border-2 border-red-500 rounded-xl p-6 text-center">
          <div class="text-5xl mb-4">❌</div>
          <h2 class="text-2xl font-bold text-red-800 mb-2">Erreur</h2>
          <p id="error-text" class="text-red-700 mb-4"></p>
          <button onclick="document.getElementById('error-message').classList.add('hidden')" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all">
            <i class="fas fa-times mr-2"></i>
            Fermer
          </button>
        </div>
      </div>

      <script>
        // ===== GESTION AUTOCOMPLETE NOMS ET FOURNISSEURS =====
        
        // Charger les noms et fournisseurs depuis localStorage
        function loadStoredData() {
          const storedNoms = JSON.parse(localStorage.getItem('gxo_agent_names') || '[]');
          const storedFournisseurs = JSON.parse(localStorage.getItem('gxo_fournisseurs') || '[]');
          
          // Créer datalist pour les noms
          const nomsDatalist = document.createElement('datalist');
          nomsDatalist.id = 'noms-datalist';
          storedNoms.forEach(nom => {
            const option = document.createElement('option');
            option.value = nom;
            nomsDatalist.appendChild(option);
          });
          document.body.appendChild(nomsDatalist);
          document.getElementById('nom-agent').setAttribute('list', 'noms-datalist');
          
          // Créer datalist pour les fournisseurs
          const fournisseursDatalist = document.getElementById('fournisseurs-datalist');
          storedFournisseurs.forEach(fournisseur => {
            const option = document.createElement('option');
            option.value = fournisseur;
            fournisseursDatalist.appendChild(option);
          });
          
          console.log('📋 Chargé:', storedNoms.length, 'noms et', storedFournisseurs.length, 'fournisseurs');
        }
        
        // Sauvegarder un nouveau nom
        function saveAgentName(nom) {
          if (!nom || nom.trim() === '') return;
          const stored = JSON.parse(localStorage.getItem('gxo_agent_names') || '[]');
          if (!stored.includes(nom.trim())) {
            stored.push(nom.trim());
            localStorage.setItem('gxo_agent_names', JSON.stringify(stored));
            console.log('💾 Nom sauvegardé:', nom);
          }
        }
        
        // Sauvegarder un nouveau fournisseur
        function saveFournisseur(fournisseur) {
          if (!fournisseur || fournisseur.trim() === '') return;
          const stored = JSON.parse(localStorage.getItem('gxo_fournisseurs') || '[]');
          if (!stored.includes(fournisseur.trim())) {
            stored.push(fournisseur.trim());
            localStorage.setItem('gxo_fournisseurs', JSON.stringify(stored));
            console.log('💾 Fournisseur sauvegardé:', fournisseur);
          }
        }
        
        // Charger au démarrage
        loadStoredData();
        
        // ===== GESTION DU FORMULAIRE =====
        
        // Afficher le champ "Autres" si coché
        document.getElementById('probleme-autres').addEventListener('change', function() {
          const autresDetails = document.getElementById('autres-details');
          if (this.checked) {
            autresDetails.classList.remove('hidden');
            document.getElementById('autres-commentaire').setAttribute('required', 'required');
          } else {
            autresDetails.classList.add('hidden');
            document.getElementById('autres-commentaire').removeAttribute('required');
            document.getElementById('autres-commentaire').value = '';
          }
        });

        // Soumission du formulaire
        document.getElementById('fin-dechargement-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const formData = new FormData(this);
          const nomAgent = formData.get('nom_agent');
          const numeroId = formData.get('numero_id');
          const fournisseur = formData.get('fournisseur');
          
          // Sauvegarder les nouvelles données
          saveAgentName(nomAgent);
          saveFournisseur(fournisseur);
          
          const data = {
            quai_numero: ${quaiNumero},
            nom_agent: nomAgent,
            numero_id: numeroId,
            fournisseur: fournisseur,
            palettes_attendues: parseInt(formData.get('palettes_attendues')),
            palettes_recues: parseInt(formData.get('palettes_recues')),
            palettes_a_rendre: formData.get('palettes_a_rendre'),
            problemes: formData.getAll('probleme[]'),
            autres_commentaire: formData.get('autres_commentaire'),
            remarques: formData.get('remarques'),
            timestamp: new Date().toISOString()
          };

          console.log('📦 Données du formulaire:', data);

          try {
            const response = await fetch('/api/fin-dechargement', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('✅ Réponse API:', result);

            if (result.success) {
              // Cacher le formulaire
              document.getElementById('fin-dechargement-form').classList.add('hidden');
              // Afficher le message de succès
              document.getElementById('success-message').classList.remove('hidden');
              // Scroll vers le haut
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              throw new Error(result.error || 'Erreur inconnue');
            }
          } catch (error) {
            console.error('❌ Erreur:', error);
            document.getElementById('error-text').textContent = error.message || 'Impossible d\\'enregistrer les données';
            document.getElementById('error-message').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      </script>
    </body>
    </html>
  `)
})

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

// API: Enregistrer les données de fin de déchargement
app.post('/api/fin-dechargement', async (c) => {
  try {
    const data = await c.req.json()
    console.log('📦 Données reçues fin déchargement:', data)

    // Validation des données
    if (!data.quai_numero || !data.nom_agent || !data.numero_id || !data.fournisseur || !data.palettes_attendues || !data.palettes_recues || !data.palettes_a_rendre) {
      return c.json({ success: false, error: 'Données manquantes' }, 400)
    }

    // Créer la table si elle n'existe pas
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS fin_dechargement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quai_numero INTEGER NOT NULL,
        nom_agent TEXT NOT NULL,
        numero_id TEXT NOT NULL,
        fournisseur TEXT NOT NULL,
        palettes_attendues INTEGER NOT NULL,
        palettes_recues INTEGER NOT NULL,
        palettes_a_rendre TEXT NOT NULL,
        problemes TEXT,
        autres_commentaire TEXT,
        remarques TEXT,
        timestamp TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()

    // Convertir le tableau de problèmes en JSON string
    const problemesJson = JSON.stringify(data.problemes || [])

    // Insérer les données
    const result = await c.env.DB.prepare(`
      INSERT INTO fin_dechargement (
        quai_numero, nom_agent, numero_id, fournisseur, palettes_attendues, palettes_recues,
        palettes_a_rendre, problemes, autres_commentaire, remarques, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.quai_numero,
      data.nom_agent,
      data.numero_id,
      data.fournisseur,
      data.palettes_attendues,
      data.palettes_recues,
      data.palettes_a_rendre,
      problemesJson,
      data.autres_commentaire || null,
      data.remarques || null,
      data.timestamp
    ).run()

    console.log('✅ Fin de déchargement enregistrée - ID:', result.meta.last_row_id)

    // Mettre à jour le statut du quai à "disponible"
    await c.env.DB.prepare(`
      UPDATE quai_status 
      SET statut = 'disponible', 
          timer_start = NULL,
          commentaire = NULL,
          commentaire_auteur = NULL,
          updated_at = datetime('now')
      WHERE quai_numero = ?
    `).bind(data.quai_numero).run()

    console.log('✅ Quai', data.quai_numero, 'marqué comme disponible')

    return c.json({ 
      success: true, 
      id: result.meta.last_row_id,
      message: 'Déchargement enregistré avec succès'
    })
  } catch (error) {
    console.error('❌ Erreur enregistrement fin déchargement:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// API: Récupérer l'historique des fins de déchargement
app.get('/api/fin-dechargement', async (c) => {
  try {
    const quai = c.req.query('quai')
    const limit = parseInt(c.req.query('limit') || '50')
    
    let query = 'SELECT * FROM fin_dechargement'
    let params = []
    
    if (quai) {
      query += ' WHERE quai_numero = ?'
      params.push(parseInt(quai))
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all()
    
    // Parser les problèmes JSON
    const formattedResults = results.map(row => ({
      ...row,
      problemes: JSON.parse(row.problemes || '[]')
    }))
    
    return c.json({ success: true, data: formattedResults })
  } catch (error) {
    console.error('❌ Erreur récupération fins déchargement:', error)
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

// POST /api/quai/scan - Enregistrer un scan de code-barres
app.post('/api/quai/scan', async (c) => {
  try {
    const { barcode, quai, action, timestamp } = await c.req.json()
    
    // Validation
    if (!barcode || !quai || !action) {
      return c.json({ 
        success: false, 
        error: 'Paramètres manquants (barcode, quai, action requis)' 
      }, 400)
    }
    
    // Créer la table des scans si elle n'existe pas
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS quai_scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        barcode TEXT NOT NULL,
        quai_numero INTEGER NOT NULL,
        action TEXT NOT NULL,
        scan_timestamp TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Enregistrer le scan
    const result = await c.env.DB.prepare(`
      INSERT INTO quai_scans (barcode, quai_numero, action, scan_timestamp)
      VALUES (?, ?, ?, ?)
    `).bind(barcode, quai, action, timestamp || new Date().toISOString()).run()
    
    // Récupérer les statistiques de scan
    const stats = await c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_scans,
        COUNT(DISTINCT quai_numero) as unique_quais,
        MAX(scan_timestamp) as last_scan
      FROM quai_scans
      WHERE date(scan_timestamp) = date('now')
    `).first()
    
    return c.json({ 
      success: true, 
      scan_id: result.meta.last_row_id,
      barcode,
      quai,
      action,
      timestamp,
      stats
    })
  } catch (error) {
    console.error('Erreur enregistrement scan:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/quai/scans - Récupérer l'historique des scans
app.get('/api/quai/scans', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50')
    const quaiNumero = c.req.query('quai')
    
    let query = `
      SELECT * FROM quai_scans 
      ${quaiNumero ? 'WHERE quai_numero = ?' : ''}
      ORDER BY created_at DESC 
      LIMIT ?
    `
    
    const { results } = quaiNumero
      ? await c.env.DB.prepare(query).bind(parseInt(quaiNumero), limit).all()
      : await c.env.DB.prepare(query).bind(limit).all()
    
    // Compter le total des scans
    const totalQuery = `
      SELECT COUNT(*) as total FROM quai_scans
      ${quaiNumero ? 'WHERE quai_numero = ?' : ''}
    `
    const totalResult = quaiNumero
      ? await c.env.DB.prepare(totalQuery).bind(parseInt(quaiNumero)).first()
      : await c.env.DB.prepare(totalQuery).first()
    
    const total = (totalResult as { total: number })?.total || 0
    
    return c.json({ 
      success: true, 
      scans: results,
      total,
      limit
    })
  } catch (error) {
    // Si la table n'existe pas encore, retourner une liste vide
    if (error.message?.includes('no such table')) {
      return c.json({ 
        success: true, 
        scans: [],
        total: 0,
        limit: 0
      })
    }
    
    console.error('Erreur récupération scans:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
