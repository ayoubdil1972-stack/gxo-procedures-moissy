import { FC } from 'hono/jsx'

export const ChauffeurTachesPage: FC = () => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mes Tâches - GXO Chauffeur</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header Mobile */}
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg sticky top-0 z-50">
          <div class="flex items-center justify-between max-w-4xl mx-auto">
            <div class="flex items-center space-x-3">
              <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-8" />
              <div>
                <div class="text-xs opacity-90">Bienvenue</div>
                <div class="font-bold text-lg" id="chauffeur-pseudo">Chauffeur</div>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              {/* Indicateur de langue fixe */}
              <div id="langue-indicator" class="bg-white/20 rounded-full px-3 py-2 flex items-center space-x-2">
                <span class="text-2xl">🇫🇷</span>
                <span class="font-bold">FR</span>
              </div>
              {/* Bouton Chat */}
              <button id="btn-chat" class="relative bg-white/20 hover:bg-white/30 rounded-full p-3 transition">
                <i class="fas fa-comments text-xl"></i>
                <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
              </button>
            </div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto p-4 pb-24">
          {/* Carte de Progression */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-orange-500">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-2xl font-bold text-gray-800">Votre Progression</h2>
                <p class="text-gray-600 text-sm">Quai <span id="info-quai" class="font-bold text-orange-600">--</span></p>
              </div>
              <div class="text-right">
                <div class="text-4xl font-bold text-orange-600" id="progression-percent">0%</div>
                <div class="text-xs text-gray-500">Complétée</div>
              </div>
            </div>
            
            {/* Barre de progression */}
            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div id="barre-progression" class="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
            
            <div class="mt-4 flex items-center text-sm text-gray-600">
              <i class="fas fa-clock mr-2"></i>
              <span>Temps écoulé: <span id="temps-ecoule" class="font-bold">0 min</span></span>
            </div>
          </div>

          {/* Liste des Tâches */}
          <div class="space-y-4" id="liste-taches">
            {/* Les tâches seront chargées dynamiquement */}
            <div class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          </div>

          {/* Message de Félicitations */}
          <div id="message-complet" class="hidden bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <i class="fas fa-check-circle text-6xl mb-4"></i>
            <h3 class="text-3xl font-bold mb-2">Félicitations !</h3>
            <p class="text-lg mb-4">Toutes les tâches sont terminées</p>
            <p class="text-sm opacity-90">Un agent va venir vous voir pour le déchargement</p>
          </div>
        </div>

        {/* Modal Chat */}
        <div id="modal-chat" class="hidden fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div class="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col" style="max-height: 90vh">
            {/* Header Chat */}
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between sm:rounded-t-2xl rounded-t-2xl">
              <div class="flex items-center space-x-3">
                <i class="fas fa-headset text-2xl"></i>
                <div>
                  <div class="font-bold text-lg">Support GXO</div>
                  <div class="text-xs opacity-90">En ligne</div>
                </div>
              </div>
              <button id="btn-fermer-chat" class="hover:bg-white/20 rounded-full p-2 transition">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Messages */}
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3" style="max-height: 60vh">
              <div class="text-center text-gray-500 text-sm py-8">
                <i class="fas fa-comments text-4xl mb-2 opacity-30"></i>
                <p>Commencez une conversation</p>
              </div>
            </div>

            {/* Input Chat */}
            <div class="border-t p-4 bg-gray-50 sm:rounded-b-2xl rounded-b-2xl">
              <div class="flex space-x-2">
                <input 
                  type="text" 
                  id="input-message" 
                  placeholder="Écrivez votre message..." 
                  class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button id="btn-envoyer-message" class="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-bold transition">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <script src="/static/chauffeur-taches.js"></script>
      </body>
    </html>
  )
}
