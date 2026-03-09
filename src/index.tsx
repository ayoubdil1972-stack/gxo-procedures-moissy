// GXO Moissy v3.5.11 - FIX TIMER +1H - BUILD: 2026-03-08 14:24
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
import { ChefEquipePage } from './pages/chef-equipe'
import { ArchivesPage } from './pages/archives'
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

// ===== FONCTION UTILITAIRE : HEURE DE PARIS =====
// Cette fonction génère un timestamp au format ISO 8601 avec le fuseau horaire de Paris
// Utilisée pour garantir la cohérence des horodatages dans toute l'application
function getParisTime(): string {
  const now = new Date()
  // Convertir en heure de Paris (Europe/Paris)
  const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  // Retourner au format ISO 8601
  return parisTime.toISOString()
}

// Fonction pour formater l'affichage d'une date en français (Paris)
function formatParisDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('fr-FR', { 
    timeZone: 'Europe/Paris',
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

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
// ===== ROUTE DE SCAN DÉBUT DE DÉCHARGEMENT =====
// Alias pour /scan (compatibilité)
app.get('/scan-dechargement', (c) => {
  const quaiNumero = c.req.query('quai')
  // Rediriger vers /scan avec le paramètre quai
  return c.redirect(`/scan?quai=${quaiNumero}`)
})

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
  
  // Générer les options de palettes (1-68)
  const palettesOptions = Array.from({length: 68}, (_, i) => {
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


          <!-- Vérifications des 7 points de contrôle -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between cursor-pointer mb-4" id="verification-header">
              <label class="text-sm font-semibold text-gray-700 flex items-center">
                <i class="fas fa-clipboard-list text-blue-600 mr-2"></i>
                Vérifications des 7 points de contrôle <span class="text-red-500 ml-1">*</span>
              </label>
              <i id="verification-icon" class="fas fa-chevron-down text-gray-500 transition-transform"></i>
            </div>
            
            <div id="verification-content">
              <!-- Points obligatoires (1-7) -->
              <div class="border-2 border-blue-200 rounded-lg p-4 bg-blue-50 mb-4">
                <h3 class="text-sm font-bold text-blue-800 mb-3">Points obligatoires <span class="text-red-500">*</span></h3>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">1. Extérieur / Essieux (vérifier le plombage du camion) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_1" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_1" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_1" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">2. Côtés gauche et droit (ex : déchirures, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_2" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_2" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_2" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">3. Paroi avant (ex : double fond, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_3" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_3" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_3" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">4. Plancher (ex : trappes, plancher amovible, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_4" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_4" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_4" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">5. Plafond / Toit (ex : déchirures, usures, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_5" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_5" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_5" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">6. Portes intérieures / extérieures (herméticité, ...) <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_6" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_6" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_6" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">7. Cales roues bien positionnées <span class="text-red-500">*</span></p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_7" value="conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_7" value="non_conforme" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_7" value="non_applicable" required class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              <!-- Points optionnels (8-11) -->
              <div class="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
                <h3 class="text-sm font-bold text-orange-800 mb-2">Points optionnels (marchandises alimentaires)</h3>
                <p class="text-xs text-orange-700 mb-3">À remplir uniquement en cas de réception de marchandises alimentaires</p>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">8. Nuisibles</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_8" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_8" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_8" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">9. Corps étranger</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_9" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_9" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_9" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-700 mb-2">10. Propreté</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_10" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_10" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_10" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

                <div class="mb-3">
                  <p class="text-sm font-medium text-gray-700 mb-2">11. Odeur</p>
                  <div class="flex gap-2">
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_11" value="conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:font-semibold transition-all hover:border-green-300 text-xs sm:text-sm">
                        ✅ Conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_11" value="non_conforme" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:font-semibold transition-all hover:border-red-300 text-xs sm:text-sm">
                        ❌ Non conforme
                      </div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                      <input type="radio" name="point_11" value="non_applicable" class="peer hidden"/>
                      <div class="p-2 text-center border-2 border-gray-300 rounded-lg peer-checked:border-gray-500 peer-checked:bg-gray-50 peer-checked:font-semibold transition-all hover:border-gray-400 text-xs sm:text-sm">
                        ⚪ N/A
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Problématiques -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between cursor-pointer mb-3" id="problematiques-header">
              <label class="text-sm font-semibold text-gray-700 flex items-center">
                <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                Problématiques rencontrées (cocher si applicable)
              </label>
              <i id="problematiques-icon" class="fas fa-chevron-down text-gray-500 transition-transform"></i>
            </div>
            <div id="problematiques-content" class="hidden">
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
          <p class="text-green-700">Les informations ont été enregistrées avec succès.</p>
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
        

        
        // ===== GESTION SECTIONS REPLIABLES =====
        
        console.log('🔧 Initialisation des toggles...');
        
        // Toggle section vérification
        try {
          const verificationHeader = document.getElementById('verification-header');
          if (verificationHeader) {
            console.log('✅ verification-header trouvé');
            verificationHeader.addEventListener('click', function() {
              console.log('🔵 Toggle Vérification cliqué');
              const content = document.getElementById('verification-content');
              const icon = document.getElementById('verification-icon');
              
              if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                console.log('↑ Section Vérification ouverte');
              } else {
                content.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                console.log('↓ Section Vérification fermée');
              }
            });
          } else {
            console.error('❌ verification-header NON trouvé');
          }
        } catch (error) {
          console.error('❌ Erreur toggle vérification:', error);
        }
        
        // Toggle section problématiques
        try {
          const problematiquesHeader = document.getElementById('problematiques-header');
          if (problematiquesHeader) {
            console.log('✅ problematiques-header trouvé');
            problematiquesHeader.addEventListener('click', function() {
              console.log('🟡 Toggle Problématiques cliqué');
              const content = document.getElementById('problematiques-content');
              const icon = document.getElementById('problematiques-icon');
              
              if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                console.log('↑ Section Problématiques ouverte');
              } else {
                content.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                console.log('↓ Section Problématiques fermée');
              }
            });
          } else {
            console.error('❌ problematiques-header NON trouvé');
          }
        } catch (error) {
          console.error('❌ Erreur toggle problématiques:', error);
        }
        
        console.log('✅ Toggles initialisés');

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
          
          // Récupérer les données du formulaire AVANT tout traitement
          const formData = new FormData(this);
          
          // ===== VALIDATION DES 7 POINTS OBLIGATOIRES =====
          const requiredPoints = [1, 2, 3, 4, 5, 6, 7];
          const missingPoints = [];
          
          for (const pointNum of requiredPoints) {
            const pointName = 'point_' + pointNum;
            const checkedRadio = document.querySelector('input[name="' + pointName + '"]:checked');
            if (!checkedRadio) {
              missingPoints.push(pointNum);
            }
          }
          
          if (missingPoints.length > 0) {
            alert('⚠️ Veuillez remplir tous les points de contrôle obligatoires.\\n\\nPoints manquants : ' + missingPoints.join(', '));
            // Déplier la section si elle est repliée
            const verificationContent = document.getElementById('verification-content');
            const verificationIcon = document.getElementById('verification-icon');
            verificationContent.classList.remove('hidden');
            verificationIcon.classList.remove('fa-chevron-down');
            verificationIcon.classList.add('fa-chevron-up');
            // Scroll vers la section
            document.getElementById('verification-header').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          
          // Récupérer les points de contrôle
          const verificationPoints = {};
          for (let i = 1; i <= 11; i++) {
            const pointValue = formData.get('point_' + i);
            if (pointValue) {
              verificationPoints['point_' + i] = pointValue;
            }
          }

          
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
            verification_points: verificationPoints,
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
              // Afficher message d'alerte si créée
              if (result.alerte_creee) {
                console.log('🚨 ALERTE CRÉÉE - Visible dans onglet Contrôleur');
                alert('⚠️ ÉCART OU NON-CONFORMITÉ DÉTECTÉ\\n\\nUne alerte a été créée pour le contrôleur.\\nIl sera notifié de cet écart.');
              }
              
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

// ===== PAGES SCAN CONTRÔLE =====

// URL Format: https://gxomoissyprocedures.com/scan-controle?quai=75
// Démarrage du contrôle par l'agent de contrôle
app.get('/scan-controle', async (c) => {
  const quaiNumero = c.req.query('quai')
  
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
  
  try {
    // Récupérer les informations du déchargement (fournisseur, ID chauffeur)
    const quaiData = await c.env.DB.prepare(`
      SELECT commentaire FROM quai_status WHERE quai_numero = ?
    `).bind(quaiNumero).first()
    
    // Extraire fournisseur et ID du commentaire (format: "Déchargement terminé - Agent - Fournisseur - ID:123456")
    let fournisseur = null
    let idChauffeur = null
    if (quaiData?.commentaire) {
      const parts = quaiData.commentaire.split(' - ')
      if (parts.length >= 3) {
        fournisseur = parts[2] // Fournisseur
      }
      if (parts.length >= 4) {
        const idMatch = parts[3].match(/ID:(\d+)/)
        if (idMatch) {
          idChauffeur = idMatch[1]
        }
      }
    }
    
    // Mettre à jour le statut du quai à "en_controle" et sauvegarder les infos
    // Note: datetime('now', 'localtime') utilise le fuseau horaire du serveur
    await c.env.DB.prepare(`
      UPDATE quai_status 
      SET statut = 'en_controle',
          timer_controle_start = datetime('now', 'localtime'),
          timer_controle_duration = NULL,
          controle_debut_timestamp = datetime('now', 'localtime'),
          controle_fournisseur = ?,
          controle_id_chauffeur = ?,
          updated_at = datetime('now', 'localtime')
      WHERE quai_numero = ?
    `).bind(fournisseur, idChauffeur, quaiNumero).run()
    
    console.log(`✅ Quai ${quaiNumero} passé en contrôle - Timer contrôle démarré - Fournisseur: ${fournisseur}, ID: ${idChauffeur}`)
    
    // Page de succès
    return c.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contrôle Démarré - GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center transform hover:scale-105 transition-transform">
          <div class="text-7xl mb-4 animate-bounce">🔍</div>
          <h1 class="text-3xl font-bold text-orange-600 mb-4">Contrôle Démarré</h1>
          <p class="text-2xl font-bold text-gray-800 mb-6">Quai n°${quaiNumero}</p>
          <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
            <p class="text-orange-800 font-semibold">
              <i class="fas fa-clock mr-2"></i>
              Le timer de contrôle est maintenant actif
            </p>
          </div>
          <a href="/accueil-chauffeur" class="bg-orange-500 text-white px-8 py-4 rounded-xl inline-block hover:bg-orange-600 transition-colors font-bold text-lg shadow-lg">
            <i class="fas fa-warehouse mr-2"></i>
            Retour à la gestion des quais
          </a>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    console.error(`❌ Erreur scan contrôle quai ${quaiNumero}:`, error)
    return c.html(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur - GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">⚠️</div>
          <h1 class="text-2xl font-bold text-red-600 mb-4">Erreur de traitement</h1>
          <p class="text-gray-600 mb-6">${error.message}</p>
          <a href="/accueil-chauffeur" class="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600">
            Retour à l'accueil
          </a>
        </div>
      </body>
      </html>
    `)
  }
})

// URL Format: https://gxomoissyprocedures.com/scan-fin-controle?quai=75
// Fin du contrôle par l'agent de contrôle - AFFICHE FORMULAIRE
app.get('/scan-fin-controle', async (c) => {
  const quaiNumero = c.req.query('quai')
  
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
  
  // Afficher le formulaire pour saisir le nom du contrôleur
  return c.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fin de Contrôle - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="text-7xl mb-4">📝</div>
          <h1 class="text-3xl font-bold text-purple-600 mb-2">Fin de Contrôle</h1>
          <p class="text-2xl font-bold text-gray-800">Quai n°${quaiNumero}</p>
        </div>

        <form id="finControleForm" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <i class="fas fa-user mr-2 text-purple-600"></i>
              Nom du contrôleur <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="controleurNom"
              name="controleurNom"
              list="savedControleurs"
              required
              placeholder="Ex: Jean Dupont"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            >
            <datalist id="savedControleurs"></datalist>
            <p class="text-xs text-gray-500 mt-1">Votre nom sera enregistré pour un remplissage rapide</p>
          </div>

          <div id="errorMessage" class="hidden bg-red-50 border-l-4 border-red-500 p-4 text-red-700"></div>
          
          <button 
            type="submit"
            class="w-full bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-600 transition-colors font-bold text-lg shadow-lg flex items-center justify-center"
          >
            <i class="fas fa-check-circle mr-2"></i>
            Terminer le contrôle
          </button>
        </form>

        <div class="mt-6 text-center">
          <a href="/accueil-chauffeur" class="text-gray-500 hover:text-gray-700 text-sm">
            <i class="fas fa-arrow-left mr-1"></i>
            Retour
          </a>
        </div>
      </div>

      <script>
        // Charger les noms sauvegardés depuis localStorage
        const savedControleurs = JSON.parse(localStorage.getItem('gxo_controleurs') || '[]');
        const datalist = document.getElementById('savedControleurs');
        savedControleurs.forEach(nom => {
          const option = document.createElement('option');
          option.value = nom;
          datalist.appendChild(option);
        });

        // Gestion du formulaire
        document.getElementById('finControleForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const controleurNom = document.getElementById('controleurNom').value.trim();
          const errorDiv = document.getElementById('errorMessage');
          const submitBtn = e.target.querySelector('button[type="submit"]');
          
          if (!controleurNom) {
            errorDiv.textContent = 'Veuillez saisir votre nom';
            errorDiv.classList.remove('hidden');
            return;
          }

          // Désactiver le bouton pendant la soumission
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...';
          errorDiv.classList.add('hidden');

          try {
            // Envoyer les données au backend
            const response = await fetch('/api/fin-controle', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                quai: ${quaiNumero},
                controleurNom: controleurNom
              })
            });

            if (!response.ok) {
              throw new Error('Erreur lors de l\\'enregistrement');
            }

            const result = await response.json();

            // Sauvegarder le nom dans localStorage
            if (!savedControleurs.includes(controleurNom)) {
              savedControleurs.push(controleurNom);
              // Garder seulement les 10 derniers noms
              if (savedControleurs.length > 10) savedControleurs.shift();
              localStorage.setItem('gxo_controleurs', JSON.stringify(savedControleurs));
            }

            // Rediriger vers la page de succès avec toutes les infos
            const params = new URLSearchParams({
              quai: '${quaiNumero}',
              duree: result.dureeControle,
              nom: controleurNom,
              fournisseur: result.fournisseur || '',
              id: result.idChauffeur || '',
              debut: result.debutTimestamp || ''
            });
            window.location.href = '/scan-fin-controle-success?' + params.toString();
          } catch (error) {
            console.error('Erreur:', error);
            errorDiv.textContent = 'Erreur lors de l\\'enregistrement. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Terminer le contrôle';
          }
        });
      </script>
    </body>
    </html>
  `)
})

// API: Enregistrer la fin de contrôle avec nom du contrôleur
app.post('/api/fin-controle', async (c) => {
  try {
    const data = await c.req.json()
    const { quai, controleurNom } = data

    if (!quai || !controleurNom) {
      return c.json({ error: 'Données manquantes' }, 400)
    }

    // Récupérer les informations du quai (timer + infos contrôle)
    const quaiData = await c.env.DB.prepare(`
      SELECT 
        timer_controle_start,
        controle_fournisseur,
        controle_id_chauffeur,
        controle_debut_timestamp
      FROM quai_status 
      WHERE quai_numero = ?
    `).bind(quai).first()
    
    let timerControleDuration = null
    if (quaiData?.timer_controle_start) {
      // Calculer la durée en secondes (en utilisant l'heure de Paris)
      // ⚠️ NE PAS AJOUTER 'Z' car timer_controle_start est déjà en heure locale
      const startTime = new Date(quaiData.timer_controle_start.replace(' ', 'T')).getTime()
      const endTime = new Date(getParisTime()).getTime()
      timerControleDuration = Math.floor((endTime - startTime) / 1000)
      console.log(`⏱️ Durée contrôle calculée: ${timerControleDuration}s`)
    }
    
    // Mettre à jour le statut du quai à "fin_controle" avec le nom du contrôleur
    await c.env.DB.prepare(`
      UPDATE quai_status 
      SET statut = 'fin_controle',
          timer_controle_start = NULL,
          timer_controle_duration = ?,
          controle_fin_timestamp = datetime('now', 'localtime'),
          controleur_nom = ?,
          updated_at = datetime('now', 'localtime')
      WHERE quai_numero = ?
    `).bind(timerControleDuration, controleurNom, quai).run()
    
    console.log(`✅ Quai ${quai} passé en fin de contrôle - Timer figé à ${timerControleDuration}s - Contrôleur: ${controleurNom}`)
    
    return c.json({ 
      success: true, 
      quai: quai,
      dureeControle: timerControleDuration,
      controleurNom: controleurNom,
      fournisseur: quaiData?.controle_fournisseur || '',
      idChauffeur: quaiData?.controle_id_chauffeur || '',
      debutTimestamp: quaiData?.controle_debut_timestamp || ''
    })
  } catch (error) {
    console.error('❌ Erreur fin contrôle:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// Page de succès après fin de contrôle - NON ASYNC pour éviter Promise error
app.get('/scan-fin-controle-success', (c) => {
  const quaiNumero = c.req.query('quai')
  const dureeControle = parseInt(c.req.query('duree') || '0')
  const controleurNom = c.req.query('nom') || ''
  const fournisseur = c.req.query('fournisseur') || ''
  const idChauffeur = c.req.query('id') || ''
  const debutTimestamp = c.req.query('debut') || ''
  
  // Formater la durée du contrôle pour l'affichage
  const hours = Math.floor(dureeControle / 3600)
  const minutes = Math.floor((dureeControle % 3600) / 60)
  const seconds = dureeControle % 60
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  
  // Formater la date et l'heure de début (format: 2026-03-07 20:35:00 -> 07/03/2026 à 20h35)
  let formattedDebut = ''
  if (debutTimestamp) {
    try {
      const date = new Date(debutTimestamp.replace(' ', 'T') + 'Z')
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      formattedDebut = `${day}/${month}/${year} à ${hour}h${minute}`
    } catch (e) {
      formattedDebut = debutTimestamp
    }
  }
  
  // Page de succès
  return c.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contrôle Terminé - GXO Moissy</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center transform hover:scale-105 transition-transform">
        <div class="text-7xl mb-4 animate-bounce">📝</div>
        <h1 class="text-3xl font-bold text-purple-600 mb-4">Contrôle Terminé</h1>
        <p class="text-2xl font-bold text-gray-800 mb-4">Quai n°${quaiNumero}</p>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p class="text-blue-800 font-semibold mb-2">
            <i class="fas fa-user mr-2"></i>
            Contrôleur
          </p>
          <p class="text-xl font-bold text-blue-900">${controleurNom}</p>
        </div>

        ${fournisseur ? `
          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
            <p class="text-indigo-800 font-semibold mb-2">
              <i class="fas fa-truck mr-2"></i>
              Fournisseur
            </p>
            <p class="text-lg font-bold text-indigo-900">${fournisseur}</p>
          </div>
        ` : ''}

        ${idChauffeur ? `
          <div class="bg-teal-50 border-l-4 border-teal-500 p-4 mb-4">
            <p class="text-teal-800 font-semibold mb-2">
              <i class="fas fa-id-card mr-2"></i>
              ID Chauffeur
            </p>
            <p class="text-lg font-bold text-teal-900">${idChauffeur}</p>
          </div>
        ` : ''}

        ${formattedDebut ? `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <p class="text-amber-800 font-semibold mb-2">
              <i class="fas fa-clock mr-2"></i>
              Début du contrôle
            </p>
            <p class="text-lg font-bold text-amber-900">${formattedDebut}</p>
          </div>
        ` : ''}
        <a href="/accueil-chauffeur" class="bg-purple-500 text-white px-8 py-4 rounded-xl inline-block hover:bg-purple-600 transition-colors font-bold text-lg shadow-lg">
          <i class="fas fa-warehouse mr-2"></i>
          Retour à la gestion des quais
        </a>
      </div>
    </body>
    </html>
  `)
})

// ===== PAGES DE TÉLÉCHARGEMENT QR CODES =====

// QR Codes Début de Contrôle
app.get('/download-qr-controle', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Codes Début de Contrôle - GXO Moissy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body class="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-qrcode text-orange-600 mr-3"></i>
                        QR Codes - Début de Contrôle
                    </h1>
                    <p class="text-gray-600">GXO Moissy - 45 QR codes pour les quais</p>
                </div>
                <div class="text-6xl">🔍</div>
            </div>
            
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center mb-6">
                <div class="text-white mb-4">
                    <i class="fas fa-file-pdf text-6xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Générer le PDF</h2>
                    <p class="text-lg opacity-90">45 QR codes - Format A4 - Haute qualité</p>
                </div>
                <button 
                    id="generatePDF"
                    onclick="generatePDF()"
                    class="inline-block bg-white text-orange-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                    <i class="fas fa-file-pdf mr-2"></i>
                    Générer et Télécharger le PDF
                </button>
                <div id="loading" class="hidden mt-4 text-white">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Génération en cours...
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-orange-50 rounded-xl p-6">
                    <h3 class="font-bold text-orange-900 mb-3">
                        <i class="fas fa-info-circle mr-2"></i>
                        Contenu du PDF
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>45 QR codes (C001-C103)</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Organisés par zones (A-F)</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Format A4 portrait</li>
                    </ul>
                </div>

                <div class="bg-blue-50 rounded-xl p-6">
                    <h3 class="font-bold text-blue-900 mb-3">
                        <i class="fas fa-clipboard-check mr-2"></i>
                        Fonctionnalité
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Démarre le timer de contrôle</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Statut "En contrôle"</li>
                        <li><i class="fas fa-check text-orange-600 mr-2"></i>Conservation des données</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <a href="/accueil-chauffeur" class="inline-block bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à la gestion des quais
            </a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"></script>
    <script>
        const quaisGXO = [1,2,3,4,5,6,7,8,9,10,32,33,34,35,36,37,38,45,46,47,48,49,60,61,62,67,68,69,75,76,77,78,79,81,82,83,84,85,86,87,99,100,101,102,103];

        async function generatePDF() {
            const button = document.getElementById('generatePDF');
            const loading = document.getElementById('loading');
            
            button.disabled = true;
            button.classList.add('opacity-50');
            loading.classList.remove('hidden');

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 10;
                const qrSize = 50;
                const cols = 3;
                const rows = 5;
                const spacingX = (pageWidth - 2 * margin - cols * qrSize) / (cols - 1);
                const spacingY = (pageHeight - 2 * margin - rows * qrSize) / (rows - 1);

                let currentRow = 0;
                let currentCol = 0;

                for (let i = 0; i < quaisGXO.length; i++) {
                    const quaiNum = quaisGXO[i];
                    const qrCode = String(quaiNum).padStart(3, '0');
                    const url = window.location.origin + '/scan-controle?quai=' + quaiNum;

                    if (i > 0 && i % (cols * rows) === 0) {
                        pdf.addPage();
                        currentRow = 0;
                        currentCol = 0;
                    }

                    const x = margin + currentCol * (qrSize + spacingX);
                    const y = margin + currentRow * (qrSize + spacingY);

                    const canvas = document.createElement('canvas');
                    new QRious({ element: canvas, value: url, size: 400, level: 'H' });
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, qrSize, qrSize);

                    pdf.setFontSize(12);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('C' + qrCode, x + qrSize / 2, y + qrSize + 5, { align: 'center' });
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text('Quai ' + quaiNum, x + qrSize / 2, y + qrSize + 9, { align: 'center' });
                    pdf.text('Début contrôle', x + qrSize / 2, y + qrSize + 12, { align: 'center' });

                    currentCol++;
                    if (currentCol >= cols) {
                        currentCol = 0;
                        currentRow++;
                    }
                }

                const today = new Date().toISOString().split('T')[0];
                pdf.save('GXO-Moissy-QR-Codes-Debut-Controle-' + today + '.pdf');

                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
                alert('✅ PDF généré avec succès !');
            } catch (error) {
                console.error('Erreur:', error);
                alert('❌ Erreur lors de la génération du PDF');
                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
            }
        }
    </script>
</body>
</html>`);
});

// QR Codes Fin de Contrôle
app.get('/download-qr-fin-controle', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Codes Fin de Contrôle - GXO Moissy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body class="bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-qrcode text-purple-600 mr-3"></i>
                        QR Codes - Fin de Contrôle
                    </h1>
                    <p class="text-gray-600">GXO Moissy - 45 QR codes pour les quais</p>
                </div>
                <div class="text-6xl">📝</div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-8 text-center mb-6">
                <div class="text-white mb-4">
                    <i class="fas fa-file-pdf text-6xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Générer le PDF</h2>
                    <p class="text-lg opacity-90">45 QR codes - Format A4 - Haute qualité</p>
                </div>
                <button 
                    id="generatePDF"
                    onclick="generatePDF()"
                    class="inline-block bg-white text-purple-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                    <i class="fas fa-file-pdf mr-2"></i>
                    Générer et Télécharger le PDF
                </button>
                <div id="loading" class="hidden mt-4 text-white">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Génération en cours...
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-purple-50 rounded-xl p-6">
                    <h3 class="font-bold text-purple-900 mb-3">
                        <i class="fas fa-info-circle mr-2"></i>
                        Contenu du PDF
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>45 QR codes (FC001-FC103)</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Organisés par zones (A-F)</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Format A4 portrait</li>
                    </ul>
                </div>

                <div class="bg-blue-50 rounded-xl p-6">
                    <h3 class="font-bold text-blue-900 mb-3">
                        <i class="fas fa-clipboard-check mr-2"></i>
                        Fonctionnalité
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Arrête le timer de contrôle</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Statut "Fin de contrôle"</li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i>Timer figé</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <a href="/accueil-chauffeur" class="inline-block bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à la gestion des quais
            </a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"></script>
    <script>
        const quaisGXO = [1,2,3,4,5,6,7,8,9,10,32,33,34,35,36,37,38,45,46,47,48,49,60,61,62,67,68,69,75,76,77,78,79,81,82,83,84,85,86,87,99,100,101,102,103];

        async function generatePDF() {
            const button = document.getElementById('generatePDF');
            const loading = document.getElementById('loading');
            
            button.disabled = true;
            button.classList.add('opacity-50');
            loading.classList.remove('hidden');

            try {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 10;
                const qrSize = 50;
                const cols = 3;
                const rows = 5;
                const spacingX = (pageWidth - 2 * margin - cols * qrSize) / (cols - 1);
                const spacingY = (pageHeight - 2 * margin - rows * qrSize) / (rows - 1);

                let currentRow = 0;
                let currentCol = 0;

                for (let i = 0; i < quaisGXO.length; i++) {
                    const quaiNum = quaisGXO[i];
                    const qrCode = String(quaiNum).padStart(3, '0');
                    const url = window.location.origin + '/scan-fin-controle?quai=' + quaiNum;

                    if (i > 0 && i % (cols * rows) === 0) {
                        pdf.addPage();
                        currentRow = 0;
                        currentCol = 0;
                    }

                    const x = margin + currentCol * (qrSize + spacingX);
                    const y = margin + currentRow * (qrSize + spacingY);

                    const canvas = document.createElement('canvas');
                    new QRious({ element: canvas, value: url, size: 400, level: 'H' });
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, qrSize, qrSize);

                    pdf.setFontSize(12);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('FC' + qrCode, x + qrSize / 2, y + qrSize + 5, { align: 'center' });
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text('Quai ' + quaiNum, x + qrSize / 2, y + qrSize + 9, { align: 'center' });
                    pdf.text('Fin contrôle', x + qrSize / 2, y + qrSize + 12, { align: 'center' });

                    currentCol++;
                    if (currentCol >= cols) {
                        currentCol = 0;
                        currentRow++;
                    }
                }

                const today = new Date().toISOString().split('T')[0];
                pdf.save('GXO-Moissy-QR-Codes-Fin-Controle-' + today + '.pdf');

                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
                alert('✅ PDF généré avec succès !');
            } catch (error) {
                console.error('Erreur:', error);
                alert('❌ Erreur lors de la génération du PDF');
                loading.classList.add('hidden');
                button.disabled = false;
                button.classList.remove('opacity-50');
            }
        }
    </script>
</body>
</html>`);
});

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
      SET ${colonne} = 1, ${colonneTime} = datetime('now', 'localtime')
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
        VALUES (?, datetime('now', 'localtime'), 1, ?)
        ON CONFLICT(chauffeur_id) 
        DO UPDATE SET 
          last_heartbeat = datetime('now', 'localtime'),
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
app.get('/chef-equipe', (c) => c.render(<ChefEquipePage />))
app.get('/nouveau', (c) => c.render(<NouveauPage />))
app.get('/archives', (c) => c.render(<ArchivesPage />))
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
      SET ${column} = 1, read_at = datetime('now', 'localtime')
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
          completion_time = datetime('now', 'localtime')
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
          departure_time = datetime('now', 'localtime')
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

// ===== CONTRÔLEUR IMPRODUCTIVITÉ - API ROUTES =====

// POST /api/controleur/improd - Enregistrer une improductivité
app.post('/api/controleur/improd', async (c) => {
  try {
    const data = await c.req.json()
    console.log('📋 Improductivité reçue:', data)

    // Validation
    if (!data.controleur_nom || !data.raison || !data.duree) {
      return c.json({ success: false, error: 'Données manquantes' }, 400)
    }

    // Créer la table si elle n'existe pas
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS controleur_improd (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        controleur_nom TEXT NOT NULL,
        raison TEXT NOT NULL,
        duree TEXT NOT NULL,
        commentaire TEXT,
        date_debut TEXT NOT NULL,
        date_fin TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()

    // Insérer l'improductivité
    const result = await c.env.DB.prepare(`
      INSERT INTO controleur_improd (
        controleur_nom, raison, duree, commentaire, date_debut, date_fin
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      data.controleur_nom,
      data.raison,
      data.duree,
      data.commentaire || '',
      data.date_debut,
      data.date_fin
    ).run()

    console.log('✅ Improductivité enregistrée:', result.meta.last_row_id)

    return c.json({ 
      success: true, 
      id: result.meta.last_row_id 
    })

  } catch (error) {
    console.error('❌ Erreur enregistrement improductivité:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/controleur/improd/historique - Récupérer l'historique des improductivités
app.get('/api/controleur/improd/historique', async (c) => {
  try {
    // Récupérer les improductivités du jour
    const today = new Date().toISOString().split('T')[0]
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM controleur_improd 
      WHERE DATE(created_at) = DATE('now', 'localtime')
      ORDER BY created_at DESC
      LIMIT 50
    `).all()

    return c.json({ 
      success: true, 
      improds: results || []
    })

  } catch (error) {
    console.error('❌ Erreur récupération historique:', error)
    // Retourner un tableau vide si la table n'existe pas encore
    return c.json({ success: true, improds: [] })
  }
})

// GET /api/controleur/alertes - Récupérer les alertes en attente
app.get('/api/controleur/alertes', async (c) => {
  try {
    const statut = c.req.query('statut') || 'en_attente'
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM controleur_alertes 
      WHERE statut = ?
      ORDER BY created_at DESC
      LIMIT 100
    `).bind(statut).all()

    return c.json({ 
      success: true, 
      alertes: results || []
    })

  } catch (error) {
    console.error('❌ Erreur récupération alertes:', error)
    // Retourner un tableau vide si la table n'existe pas encore
    return c.json({ success: true, alertes: [] })
  }
})

// GET /api/controleur/alertes/stats - Statistiques des alertes
app.get('/api/controleur/alertes/stats', async (c) => {
  try {
    // Alertes en attente
    const enAttente = await c.env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM controleur_alertes 
      WHERE statut = 'en_attente'
    `).first()
    
    // Alertes traitées aujourd'hui (date = date actuelle)
    const traiteesAujourdhui = await c.env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM controleur_alertes 
      WHERE statut = 'traitee' 
      AND DATE(traite_le) = DATE('now', 'localtime')
    `).first()
    
    // Alertes traitées cette semaine (depuis lundi jusqu'à aujourd'hui inclus)
    // Pour dimanche (0), on remonte à 6 jours (lundi précédent)
    // Pour lundi (1), on est déjà au début de la semaine (0 jours)
    // Pour mardi (2), on remonte à 1 jour (lundi)
    // etc.
    const traiteesSemaine = await c.env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM controleur_alertes 
      WHERE statut = 'traitee' 
      AND DATE(traite_le) >= DATE('now', 'localtime', 'weekday 1', '-7 days')
      AND DATE(traite_le) <= DATE('now', 'localtime')
    `).first()

    console.log('📊 Stats alertes:', {
      enAttente: enAttente?.count || 0,
      traiteesAujourdhui: traiteesAujourdhui?.count || 0,
      traiteesSemaine: traiteesSemaine?.count || 0
    })

    return c.json({ 
      success: true, 
      stats: {
        en_attente: enAttente?.count || 0,
        traitees_aujourd_hui: traiteesAujourdhui?.count || 0,
        traitees_semaine: traiteesSemaine?.count || 0
      }
    })

  } catch (error) {
    console.error('❌ Erreur récupération stats alertes:', error)
    return c.json({ 
      success: true, 
      stats: {
        en_attente: 0,
        traitees_aujourd_hui: 0,
        traitees_semaine: 0
      }
    })
  }
})

// GET /api/controleur/alertes/semaine - Toutes les alertes de la semaine groupées par jour
app.get('/api/controleur/alertes/semaine', async (c) => {
  try {
    // Calculer les dates de début et fin de semaine
    const datesResult = await c.env.DB.prepare(`
      SELECT 
        DATE('now', 'localtime', 'weekday 1', '-7 days') as lundi,
        DATE('now', 'localtime', 'weekday 5') as vendredi,
        'Lundi ' || strftime('%d', DATE('now', 'localtime', 'weekday 1', '-7 days')) || ' ' ||
        CASE CAST(strftime('%m', DATE('now', 'localtime', 'weekday 1', '-7 days')) AS INTEGER)
          WHEN 1 THEN 'Janvier' WHEN 2 THEN 'Février' WHEN 3 THEN 'Mars'
          WHEN 4 THEN 'Avril' WHEN 5 THEN 'Mai' WHEN 6 THEN 'Juin'
          WHEN 7 THEN 'Juillet' WHEN 8 THEN 'Août' WHEN 9 THEN 'Septembre'
          WHEN 10 THEN 'Octobre' WHEN 11 THEN 'Novembre' WHEN 12 THEN 'Décembre'
        END || ' ' || strftime('%Y', DATE('now', 'localtime', 'weekday 1', '-7 days')) as lundi_formate,
        'Vendredi ' || strftime('%d', DATE('now', 'localtime', 'weekday 5')) || ' ' ||
        CASE CAST(strftime('%m', DATE('now', 'localtime', 'weekday 5')) AS INTEGER)
          WHEN 1 THEN 'Janvier' WHEN 2 THEN 'Février' WHEN 3 THEN 'Mars'
          WHEN 4 THEN 'Avril' WHEN 5 THEN 'Mai' WHEN 6 THEN 'Juin'
          WHEN 7 THEN 'Juillet' WHEN 8 THEN 'Août' WHEN 9 THEN 'Septembre'
          WHEN 10 THEN 'Octobre' WHEN 11 THEN 'Novembre' WHEN 12 THEN 'Décembre'
        END || ' ' || strftime('%Y', DATE('now', 'localtime', 'weekday 5')) as vendredi_formate
    `).first()
    
    // Récupérer toutes les alertes traitées de la semaine (depuis lundi jusqu'à aujourd'hui)
    const alertesSemaine = await c.env.DB.prepare(`
      SELECT 
        id,
        quai_numero,
        numero_id,
        fournisseur,
        heure_premier_scan,
        heure_fin_dechargement,
        ecart_palettes_attendues,
        ecart_palettes_recues,
        non_conformites,
        verification_points,
        consignes,
        statut,
        traite_par,
        traite_le,
        created_at,
        CAST(strftime('%w', traite_le) AS INTEGER) as jour_semaine_numero,
        CASE CAST(strftime('%w', traite_le) AS INTEGER)
          WHEN 0 THEN 'Dimanche' WHEN 1 THEN 'Lundi' WHEN 2 THEN 'Mardi'
          WHEN 3 THEN 'Mercredi' WHEN 4 THEN 'Jeudi' WHEN 5 THEN 'Vendredi'
          WHEN 6 THEN 'Samedi'
        END as jour_nom,
        DATE(traite_le) as date_traitement
      FROM controleur_alertes 
      WHERE statut = 'traitee' 
      AND DATE(traite_le) >= DATE('now', 'localtime', 'weekday 1', '-7 days')
      AND DATE(traite_le) <= DATE('now', 'localtime')
      ORDER BY traite_le DESC
      LIMIT 1000
    `).all()

    console.log(`📅 Alertes semaine récupérées: ${alertesSemaine.results?.length || 0}`)

    return c.json({ 
      success: true,
      semaine: {
        lundi: datesResult?.lundi,
        vendredi: datesResult?.vendredi,
        lundi_formate: datesResult?.lundi_formate,
        vendredi_formate: datesResult?.vendredi_formate,
        titre: `${datesResult?.lundi_formate} à ${datesResult?.vendredi_formate}`
      },
      alertes: alertesSemaine.results || []
    })

  } catch (error) {
    console.error('❌ Erreur récupération alertes semaine:', error)
    return c.json({ 
      success: false, 
      error: error.message,
      alertes: []
    })
  }
})

// GET /api/controleur/alertes/archives - Toutes les alertes traitées (hiérarchie Mois → Semaine → Jour)
app.get('/api/controleur/alertes/archives', async (c) => {
  try {
    const archives = await c.env.DB.prepare(`
      SELECT 
        id,
        quai_numero,
        fournisseur,
        created_at,
        traite_le,
        traite_par,
        consignes,
        ecart_palettes_attendues,
        ecart_palettes_recues,
        non_conformites,
        verification_points,
        statut,
        strftime('%Y', created_at) as annee,
        strftime('%m', created_at) as mois_numero,
        strftime('%W', created_at) as semaine_numero,
        strftime('%w', created_at) as jour_semaine_numero,
        CASE strftime('%m', created_at)
          WHEN '01' THEN 'Janvier' WHEN '02' THEN 'Février' WHEN '03' THEN 'Mars'
          WHEN '04' THEN 'Avril' WHEN '05' THEN 'Mai' WHEN '06' THEN 'Juin'
          WHEN '07' THEN 'Juillet' WHEN '08' THEN 'Août' WHEN '09' THEN 'Septembre'
          WHEN '10' THEN 'Octobre' WHEN '11' THEN 'Novembre' WHEN '12' THEN 'Décembre'
        END || ' ' || strftime('%Y', created_at) as mois_nom,
        CASE strftime('%w', created_at)
          WHEN '0' THEN 'Dimanche' WHEN '1' THEN 'Lundi' WHEN '2' THEN 'Mardi'
          WHEN '3' THEN 'Mercredi' WHEN '4' THEN 'Jeudi' WHEN '5' THEN 'Vendredi'
          WHEN '6' THEN 'Samedi'
        END || ' ' || strftime('%d', created_at) as jour_nom,
        strftime('%d/%m/%Y', date(created_at, 'weekday 0', '-6 days')) || 
        ' au ' || 
        strftime('%d/%m/%Y', date(created_at, 'weekday 0')) as semaine_dates,
        strftime('%Y', created_at) || '-S' || strftime('%W', created_at) as annee_semaine
      FROM controleur_alertes
      WHERE statut = 'traitee'
      ORDER BY created_at DESC
      LIMIT 5000
    `).all()

    console.log(`📚 Archives récupérées: ${archives.results?.length || 0}`)

    return c.json({ 
      success: true,
      count: archives.results?.length || 0,
      alertes: archives.results || []
    })

  } catch (error) {
    console.error('❌ Erreur récupération archives:', error)
    return c.json({ 
      success: false, 
      error: error.message,
      count: null,
      alertes: []
    })
  }
})

// PUT /api/controleur/alertes/:id - Traiter une alerte
app.put('/api/controleur/alertes/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    console.log('📝 Traitement alerte:', id, data)

    // Validation
    if (!data.traite_par || !data.consignes) {
      return c.json({ success: false, error: 'Contrôleur et consignes requis' }, 400)
    }

    // ✅ RÉCUPÉRER LE QUAI ET SON TIMER_CONTROLE_DURATION
    const alerte = await c.env.DB.prepare(`
      SELECT quai_numero FROM controleur_alertes WHERE id = ?
    `).bind(id).first()
    
    let timerControleDuration = null
    if (alerte?.quai_numero) {
      const quaiData = await c.env.DB.prepare(`
        SELECT timer_controle_duration FROM quai_status WHERE quai_numero = ?
      `).bind(alerte.quai_numero).first()
      
      timerControleDuration = quaiData?.timer_controle_duration
      console.log(`⏱️ Durée contrôle récupérée pour quai ${alerte.quai_numero}:`, timerControleDuration, 'secondes')
    }

    // ✅ CRÉER COLONNE duree_controle_secondes SI N'EXISTE PAS
    try {
      await c.env.DB.prepare(`
        ALTER TABLE controleur_alertes ADD COLUMN duree_controle_secondes INTEGER
      `).run()
      console.log('✅ Colonne duree_controle_secondes ajoutée')
    } catch (e) {
      // Colonne existe déjà, ignorer l'erreur
    }

    // Mettre à jour l'alerte AVEC la durée de contrôle
    await c.env.DB.prepare(`
      UPDATE controleur_alertes 
      SET statut = 'traitee',
          consignes = ?,
          traite_par = ?,
          traite_le = datetime('now', 'localtime'),
          duree_controle_secondes = ?
      WHERE id = ?
    `).bind(
      data.consignes,
      data.traite_par,
      timerControleDuration,
      id
    ).run()

    console.log('✅ Alerte', id, 'traitée par', data.traite_par, 'avec durée contrôle:', timerControleDuration, 's')

    return c.json({ 
      success: true,
      message: 'Alerte traitée avec succès'
    })

  } catch (error) {
    console.error('❌ Erreur traitement alerte:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

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

    // SOLUTION DE CONTOURNEMENT: Stocker numero_id et fournisseur dans remarques comme JSON
    // Cela évite les erreurs de colonnes manquantes
    const remarquesData = {
      numero_id: data.numero_id,
      fournisseur: data.fournisseur,
      remarques_utilisateur: data.remarques || ''
    }
    const remarquesJson = JSON.stringify(remarquesData)

    // Convertir le tableau de problèmes en JSON string
    const problemesJson = JSON.stringify(data.problemes || [])

    // Créer la table avec structure minimale (colonnes de base seulement)
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS fin_dechargement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quai_numero INTEGER NOT NULL,
        nom_agent TEXT NOT NULL,
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

    console.log('✅ Table fin_dechargement vérifiée (structure de base)')

    // Insérer les données SANS numero_id et fournisseur comme colonnes séparées
    const result = await c.env.DB.prepare(`
      INSERT INTO fin_dechargement (
        quai_numero, nom_agent, palettes_attendues, palettes_recues,
        palettes_a_rendre, problemes, autres_commentaire, remarques, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `).bind(
      data.quai_numero,
      data.nom_agent,
      data.palettes_attendues,
      data.palettes_recues,
      data.palettes_a_rendre,
      problemesJson,
      data.autres_commentaire || null,
      remarquesJson  // Contient numero_id + fournisseur + remarques
    ).run()

    console.log('✅ Fin de déchargement enregistrée - ID:', result.meta.last_row_id)

    // Mettre à jour le statut du quai à "fin_dechargement" (timer reste figé)
    // IMPORTANT: Essayer d'abord avec 'fin_dechargement', si échec utiliser 'disponible'
    try {
      // Récupérer le timer_start pour calculer la durée
      // ✨ RÉCUPÉRER timer_start ET timer_fin_timestamp AVANT l'UPDATE (car ils seront modifiés)
      const quaiData = await c.env.DB.prepare(`
        SELECT timer_start, timer_fin_timestamp FROM quai_status WHERE quai_numero = ?
      `).bind(data.quai_numero).first()

      console.log('📊 Quai data AVANT UPDATE:', quaiData)
      
      // 💾 SAUVEGARDER timer_start pour l'alerte KPI (car il sera mis à NULL dans l'UPDATE)
      const timerStartSauvegarde = quaiData?.timer_start

      let timerDuration = null
      if (quaiData?.timer_start) {
        // Calculer la durée en secondes (en utilisant l'heure de Paris)
        // timer_start est au format SQLite: "YYYY-MM-DD HH:MM:SS"
        // ⚠️ NE PAS AJOUTER 'Z' car timer_start est déjà en heure locale
        const startTime = new Date(quaiData.timer_start.replace(' ', 'T')).getTime()
        const endTime = new Date(getParisTime()).getTime()
        timerDuration = Math.floor((endTime - startTime) / 1000)
        console.log(`⏱️ Durée calculée: ${timerDuration}s (${Math.floor(timerDuration/3600)}h ${Math.floor((timerDuration%3600)/60)}m ${timerDuration%60}s)`)
      }

      console.log('💾 UPDATE avec:', {
        timerDuration,
        commentaire: `Déchargement terminé - ${data.nom_agent} - ${data.fournisseur} - ID:${data.numero_id}`,
        commentaire_auteur: data.nom_agent,
        quai_numero: data.quai_numero
      })

      await c.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = 'fin_dechargement',
            timer_start = NULL,
            timer_duration = ?,
            timer_fin_timestamp = datetime('now', 'localtime'),
            commentaire = ?,
            commentaire_auteur = ?,
            updated_at = datetime('now', 'localtime')
        WHERE quai_numero = ?
      `).bind(
        timerDuration,
        `Déchargement terminé - ${data.nom_agent} - ${data.fournisseur} - ID:${data.numero_id}`,
        data.nom_agent,
        data.quai_numero
      ).run()

      console.log('✅ Quai', data.quai_numero, 'marqué comme fin de déchargement - Timer figé à', timerDuration, 'secondes (timer_start supprimé)')
    } catch (error) {
      // Si échec (contrainte CHECK), utiliser 'disponible' comme fallback
      console.warn('⚠️ Contrainte CHECK - Fallback vers disponible:', error.message)
      
      await c.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = 'disponible',
            timer_start = timer_start,
            commentaire = ?,
            commentaire_auteur = ?,
            updated_at = datetime('now', 'localtime')
        WHERE quai_numero = ?
      `).bind(
        `✅ Déchargement terminé - ${data.nom_agent} - ${data.fournisseur} - ID:${data.numero_id} - Timer: voir historique`,
        data.nom_agent,
        data.quai_numero
      ).run()

      console.log('✅ Quai', data.quai_numero, 'marqué comme disponible (fallback) - Timer conservé dans commentaire')
    }

    // ===== CRÉATION ALERTE AUTOMATIQUE SI ÉCART OU NON-CONFORMITÉ =====
    let alerteCreee = false
    try {
      console.log('🔍 Vérification alerte - Données reçues:', {
        palettes_attendues: data.palettes_attendues,
        palettes_recues: data.palettes_recues,
        problemes: data.problemes
      })
      
      // Vérifier s'il y a un écart de palettes
      const ecartPalettes = parseInt(data.palettes_attendues) !== parseInt(data.palettes_recues)
      console.log('📊 Écart palettes:', ecartPalettes, `(${data.palettes_attendues} vs ${data.palettes_recues})`)
      
      // Vérifier s'il y a des non-conformités dans les problèmes
      const problemes = data.problemes || []
      const aDesNonConformites = problemes.length > 0
      console.log('⚠️ Non-conformités:', aDesNonConformites, 'Nombre:', problemes.length)
      
      // ✨ CRÉER SYSTÉMATIQUEMENT UNE ALERTE KPI POUR CHAQUE CAMION (même sans problème)
      // Cela permet de capturer tous les temps pour les KPI de la page Chef d'équipe
      console.log('📊 CRÉATION ALERTE KPI - Tous les camions sont enregistrés')
      console.log('   Quai:', data.quai_numero)
      console.log('   ID:', data.numero_id)
      console.log('   Fournisseur:', data.fournisseur)
      
      if (true) {  // Toujours vrai pour créer l'alerte systématiquement
        
        // ✅ UTILISER timer_start sauvegardé AVANT l'UPDATE (au lieu de re-requêter)
        // ✅ timer_fin_timestamp = NOW (car UPDATE vient juste d'être fait)
        const timerFinTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
        console.log('⏰ Utilisation timer_start sauvegardé:', timerStartSauvegarde)
        console.log('⏰ timer_fin_timestamp (NOW):', timerFinTimestamp)
        
        // Créer la table alertes si elle n'existe pas
        await c.env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS controleur_alertes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quai_numero INTEGER NOT NULL,
            numero_id TEXT NOT NULL,
            fournisseur TEXT NOT NULL,
            heure_premier_scan TEXT,
            heure_fin_dechargement TEXT,
            duree_dechargement_secondes INTEGER,
            duree_controle_secondes INTEGER,
            ecart_palettes_attendues INTEGER,
            ecart_palettes_recues INTEGER,
            non_conformites TEXT,
            verification_points TEXT,
            consignes TEXT,
            statut TEXT DEFAULT 'en_attente',
            traite_par TEXT,
            traite_le TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `).run()
        
        console.log('✅ Table controleur_alertes vérifiée')
        
        // Préparer les détails de l'écart
        let detailsEcart = ''
        if (ecartPalettes) {
          detailsEcart = `Écart palettes: Attendues ${data.palettes_attendues}, Reçues ${data.palettes_recues}`
        }
        
        // Préparer les non-conformités (problèmes checkboxes)
        const nonConformitesJson = JSON.stringify(problemes)
        console.log('📝 Non-conformités (problèmes):', nonConformitesJson)
        
        // Préparer les points de vérification (point_1 à point_11)
        const verificationPointsJson = JSON.stringify(data.verification_points || {})
        console.log('📝 Points de vérification:', verificationPointsJson)
        
        // Définir le statut de l'alerte : 'traitee' si tout est OK, 'en_attente' si problème
        const statutAlerte = (ecartPalettes || aDesNonConformites) ? 'en_attente' : 'traitee'
        console.log('📊 Statut alerte:', statutAlerte, '(Problèmes:', ecartPalettes || aDesNonConformites, ')')
        
        // ✅ AJOUTER LA DURÉE DE DÉCHARGEMENT EN SECONDES
        console.log('⏱️ Durée déchargement:', timerDuration, 'secondes')
        
        // Insérer l'alerte avec tous les champs + durée déchargement
        const alerteResult = await c.env.DB.prepare(`
          INSERT INTO controleur_alertes (
            quai_numero, numero_id, fournisseur, heure_premier_scan, heure_fin_dechargement, duree_dechargement_secondes,
            ecart_palettes_attendues, ecart_palettes_recues, non_conformites, verification_points,
            traite_le, statut
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'), ?)
        `).bind(
          data.quai_numero,
          data.numero_id,
          data.fournisseur,
          timerStartSauvegarde || null,  // ✅ Utiliser la sauvegarde du timer_start
          timerFinTimestamp || null,     // ✅ Utiliser NOW comme heure_fin_dechargement
          timerDuration || null,         // ✅ Durée de déchargement en secondes
          parseInt(data.palettes_attendues),
          parseInt(data.palettes_recues),
          nonConformitesJson,
          verificationPointsJson,
          statutAlerte
        ).run()
        
        alerteCreee = true
        const typeAlerte = (ecartPalettes || aDesNonConformites) ? '🚨 AVEC PROBLÈMES' : '✅ SANS PROBLÈME'
        console.log(`✅✅✅ ALERTE KPI CRÉÉE ${typeAlerte} - ID:`, alerteResult.meta.last_row_id)
      }
    } catch (error) {
      console.error('❌ ERREUR création alerte:', error)
      console.error('❌ Stack:', error.stack)
    }

    return c.json({ 
      success: true, 
      id: result.meta.last_row_id,
      message: 'Déchargement enregistré avec succès',
      alerte_creee: alerteCreee
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
    
    // Parser les problèmes JSON et extraire numero_id/fournisseur du champ remarques
    const formattedResults = results.map(row => {
      let remarquesData = null
      try {
        // Essayer de parser remarques comme JSON
        remarquesData = JSON.parse(row.remarques || '{}')
      } catch (e) {
        // Si ce n'est pas du JSON, c'est du texte simple
        remarquesData = { remarques_utilisateur: row.remarques || '' }
      }
      
      return {
        ...row,
        problemes: JSON.parse(row.problemes || '[]'),
        numero_id: remarquesData.numero_id || null,
        fournisseur: remarquesData.fournisseur || null,
        remarques: remarquesData.remarques_utilisateur || row.remarques || ''
      }
    })
    
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
    
    if (!['disponible', 'en_cours', 'indisponible', 'fin_dechargement'].includes(statut)) {
      return c.json({ success: false, error: 'Statut invalide' }, 400)
    }
    
    if (statut === 'indisponible' && !commentaire) {
      return c.json({ success: false, error: 'Commentaire obligatoire pour statut indisponible' }, 400)
    }
    
    // Mettre à jour le quai avec gestion du timer
    if (statut === 'en_cours') {
      // Démarrer le timer avec datetime SQLite (heure locale)
      await c.env.DB.prepare(`
        UPDATE quai_status 
        SET statut = ?, 
            timer_start = datetime('now', 'localtime'),
            commentaire = NULL,
            commentaire_auteur = NULL,
            updated_at = datetime('now', 'localtime')
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
            updated_at = datetime('now', 'localtime')
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
            updated_at = datetime('now', 'localtime')
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

// ==============================================
// APIS CHEF D'ÉQUIPE - IMPRODUCTIVITÉS
// ==============================================

// POST /api/improductivites - Créer une improductivité (appelé par Contrôleur et Agent de Quai)
app.post('/api/improductivites', async (c) => {
  try {
    const data = await c.req.json()
    const { utilisateur_nom, role, raison, duree, commentaire, date_debut, date_fin } = data
    
    // Validation
    if (!utilisateur_nom || !role || !raison || !duree || !date_debut || !date_fin) {
      return c.json({ success: false, error: 'Données manquantes' }, 400)
    }
    
    if (!['controleur', 'agent_quai'].includes(role)) {
      return c.json({ success: false, error: 'Rôle invalide' }, 400)
    }
    
    // Créer la table si elle n'existe pas
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS improductivites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        utilisateur_nom TEXT NOT NULL,
        role TEXT NOT NULL,
        raison TEXT NOT NULL,
        duree TEXT NOT NULL,
        commentaire TEXT,
        statut TEXT DEFAULT 'en_transmission',
        validation_commentaire TEXT,
        date_debut TEXT NOT NULL,
        date_fin TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Insérer l'improductivité
    const result = await c.env.DB.prepare(`
      INSERT INTO improductivites (
        utilisateur_nom, role, raison, duree, commentaire, date_debut, date_fin
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      utilisateur_nom,
      role,
      raison,
      duree,
      commentaire || null,
      date_debut,
      date_fin
    ).run()
    
    console.log('✅ Improductivité créée:', result.meta.last_row_id)
    
    return c.json({ 
      success: true, 
      id: result.meta.last_row_id,
      message: 'Improductivité enregistrée et transmise au chef d\'équipe'
    })
  } catch (error) {
    console.error('❌ Erreur création improductivité:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/chef-equipe/improductivites - Récupérer toutes les improductivités
app.get('/api/chef-equipe/improductivites', async (c) => {
  try {
    // Créer la table si elle n'existe pas
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS improductivites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        utilisateur_nom TEXT NOT NULL,
        role TEXT NOT NULL,
        raison TEXT NOT NULL,
        duree TEXT NOT NULL,
        commentaire TEXT,
        statut TEXT DEFAULT 'en_transmission',
        validation_commentaire TEXT,
        date_debut TEXT NOT NULL,
        date_fin TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Récupérer toutes les improductivités
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM improductivites
      ORDER BY created_at DESC
      LIMIT 1000
    `).all()
    
    return c.json({ 
      success: true, 
      improductivites: results
    })
  } catch (error) {
    console.error('❌ Erreur récupération improductivités:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// PUT /api/chef-equipe/improductivites/:id/valider - Valider une improductivité
app.put('/api/chef-equipe/improductivites/:id/valider', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const data = await c.req.json()
    const { validation_commentaire } = data
    
    // Mettre à jour le statut
    await c.env.DB.prepare(`
      UPDATE improductivites 
      SET statut = 'validee',
          validation_commentaire = ?
      WHERE id = ?
    `).bind(
      validation_commentaire || null,
      id
    ).run()
    
    console.log(`✅ Improductivité ${id} validée`)
    
    return c.json({ 
      success: true, 
      message: 'Improductivité validée et transmise'
    })
  } catch (error) {
    console.error('❌ Erreur validation improductivité:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/improductivites/utilisateur/:nom - Récupérer les improductivités d'un utilisateur
app.get('/api/improductivites/utilisateur/:nom', async (c) => {
  try {
    const nom = c.req.param('nom')
    
    if (!nom) {
      return c.json({ success: false, error: 'Nom requis' }, 400)
    }
    
    // Récupérer les improductivités de l'utilisateur
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM improductivites
      WHERE utilisateur_nom = ?
      ORDER BY created_at DESC
      LIMIT 100
    `).bind(nom).all()
    
    return c.json({ 
      success: true, 
      improductivites: results
    })
  } catch (error) {
    console.error('❌ Erreur récupération improductivités utilisateur:', error)
    // Si la table n'existe pas, retourner liste vide
    return c.json({ success: true, improductivites: [] })
  }
})

// ==============================================
// APIS KPI RÉCEPTION CAMION
// ==============================================

// GET /api/chef-equipe/kpi/reception-camion - KPI réception camion
app.get('/api/chef-equipe/kpi/reception-camion', async (c) => {
  try {
    const date = c.req.query('date') // Format: YYYY-MM-DD
    const dateFilter = date || new Date().toISOString().split('T')[0]
    
    console.log('📊 Récupération KPI pour date:', dateFilter)
    
    // Récupérer TOUTES les alertes avec les données réelles depuis controleur_alertes
    const { results } = await c.env.DB.prepare(`
      SELECT 
        ca.id,
        ca.quai_numero,
        ca.numero_id,
        ca.fournisseur,
        ca.heure_premier_scan,
        ca.heure_fin_dechargement,
        ca.traite_le,
        ca.created_at
      FROM controleur_alertes ca
      WHERE DATE(ca.heure_premier_scan) = ?
      ORDER BY ca.heure_premier_scan ASC
      LIMIT 100
    `).bind(dateFilter).all()
    
    console.log(`📊 ${results.length} camions trouvés pour ${dateFilter}`)
    
    // Calculer les KPI pour chaque camion
    const kpiData = results.map(row => {
      // Convertir les timestamps SQL en format Date JavaScript
      const debutDechargement = row.heure_premier_scan ? new Date(row.heure_premier_scan.replace(' ', 'T')) : null
      const finDechargement = row.heure_fin_dechargement ? new Date(row.heure_fin_dechargement.replace(' ', 'T')) : null
      const validationControle = row.traite_le ? new Date(row.traite_le.replace(' ', 'T')) : null
      
      // 1. TEMPS DE DÉCHARGEMENT (heure_premier_scan → heure_fin_dechargement)
      let tempsDechargementMinutes = null
      let tempsDechargementStatut = 'grey'
      let tempsDechargementFormate = '—'
      
      if (debutDechargement && finDechargement) {
        const diffMs = finDechargement.getTime() - debutDechargement.getTime()
        tempsDechargementMinutes = Math.round(diffMs / 60000)
        const hours = Math.floor(tempsDechargementMinutes / 60)
        const mins = tempsDechargementMinutes % 60
        tempsDechargementFormate = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`
        
        // Seuils: ≤20 min = vert, 21-25 = orange, >25 = rouge
        if (tempsDechargementMinutes <= 20) {
          tempsDechargementStatut = 'green'
        } else if (tempsDechargementMinutes <= 25) {
          tempsDechargementStatut = 'orange'
        } else {
          tempsDechargementStatut = 'red'
        }
      }
      
      // 2. TEMPS DE CONTRÔLE (heure_fin_dechargement → traite_le)
      let tempsControleMinutes = null
      let tempsControleStatut = 'grey'
      let tempsControleFormate = '—'
      
      if (finDechargement && validationControle) {
        const diffMs = validationControle.getTime() - finDechargement.getTime()
        tempsControleMinutes = Math.round(diffMs / 60000)
        const hours = Math.floor(tempsControleMinutes / 60)
        const mins = tempsControleMinutes % 60
        tempsControleFormate = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`
        
        // Seuils: ≤30 min = vert, 31-40 = orange, >40 = rouge
        if (tempsControleMinutes <= 30) {
          tempsControleStatut = 'green'
        } else if (tempsControleMinutes <= 40) {
          tempsControleStatut = 'orange'
        } else {
          tempsControleStatut = 'red'
        }
      }
      
      // 3. TEMPS TOTAL AU QUAI (heure_premier_scan → traite_le)
      let tempsTotalMinutes = null
      let tempsTotalStatut = 'grey'
      let tempsTotalFormate = '—'
      
      if (debutDechargement && validationControle) {
        const diffMs = validationControle.getTime() - debutDechargement.getTime()
        tempsTotalMinutes = Math.round(diffMs / 60000)
        const hours = Math.floor(tempsTotalMinutes / 60)
        const mins = tempsTotalMinutes % 60
        tempsTotalFormate = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`
        
        // Seuils: ≤60 min = vert, 61-70 = orange, >70 = rouge
        if (tempsTotalMinutes <= 60) {
          tempsTotalStatut = 'green'
        } else if (tempsTotalMinutes <= 70) {
          tempsTotalStatut = 'orange'
        } else {
          tempsTotalStatut = 'red'
        }
      }
      
      // Formater les heures au format HH:MM
      const formatHeure = (dateStr) => {
        if (!dateStr) return '—'
        const d = new Date(dateStr.replace(' ', 'T'))
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
      }
      
      return {
        id: row.id,
        quai_numero: row.quai_numero,
        numero_camion: row.numero_id || `C${String(row.id).padStart(3, '0')}e`,
        fournisseur: row.fournisseur,
        heure_debut: formatHeure(row.heure_premier_scan),
        heure_fin: formatHeure(row.heure_fin_dechargement),
        heure_validation: formatHeure(row.traite_le),
        duree_dechargement: tempsDechargementFormate,
        duree_dechargement_minutes: tempsDechargementMinutes,
        duree_dechargement_status: tempsDechargementStatut,
        duree_controle: tempsControleFormate,
        duree_controle_minutes: tempsControleMinutes,
        duree_controle_status: tempsControleStatut,
        duree_totale: tempsTotalFormate,
        duree_totale_minutes: tempsTotalMinutes,
        duree_totale_status: tempsTotalStatut
      }
    })
    
    // Calculer les moyennes
    const kpiAvecTemps = kpiData.filter(k => 
      k.duree_dechargement_minutes !== null && 
      k.duree_controle_minutes !== null && 
      k.duree_totale_minutes !== null
    )
    
    const moyennes = {
      dechargement_minutes: kpiAvecTemps.length > 0 
        ? Math.round(kpiAvecTemps.reduce((sum, k) => sum + k.duree_dechargement_minutes, 0) / kpiAvecTemps.length)
        : 0,
      controle_minutes: kpiAvecTemps.length > 0
        ? Math.round(kpiAvecTemps.reduce((sum, k) => sum + k.duree_controle_minutes, 0) / kpiAvecTemps.length)
        : 0,
      total_minutes: kpiAvecTemps.length > 0
        ? Math.round(kpiAvecTemps.reduce((sum, k) => sum + k.duree_totale_minutes, 0) / kpiAvecTemps.length)
        : 0,
      total_camions: kpiData.length,
      camions_complets: kpiAvecTemps.length
    }
    
    return c.json({
      success: true,
      date: dateFilter,
      kpi: kpiData,
      moyennes
    })
  } catch (error) {
    console.error('❌ Erreur récupération KPI:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

export default app
