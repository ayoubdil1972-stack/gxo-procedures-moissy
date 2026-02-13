export function ChauffeurTachesPage() {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title data-i18n="pageTitle">Mes Tâches - GXO Chauffeur</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="/static/task-translations.js"></script>
      </head>
      <body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
          <div class="container mx-auto flex items-center justify-between">
            <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10" />
            <div class="text-white font-bold text-lg" data-i18n="pageTitle">Mes Tâches</div>
            <button id="btn-chat" class="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors relative">
              <i class="fas fa-comments mr-2"></i>
              <span data-i18n="support">Support</span>
              <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>

        {/* Conteneur principal */}
        <div class="container mx-auto p-4 max-w-4xl">
          {/* Section Infos Chauffeur */}
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] rounded-full flex items-center justify-center">
                <i class="fas fa-user text-white text-2xl"></i>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-gray-800" id="chauffeur-pseudo">Chargement...</h2>
                <p class="text-gray-600" id="chauffeur-entreprise"></p>
                <p class="text-sm text-gray-500">Quai: <span id="chauffeur-quai" class="font-bold text-[#FF5A1A]">--</span></p>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-[#FF5A1A]" id="progression-percent">0%</div>
                <div class="text-xs text-gray-500" data-i18n="completed">Complétée</div>
              </div>
            </div>
            
            {/* Barre de progression */}
            <div class="mt-4 w-full bg-gray-200 rounded-full h-3">
              <div id="barre-progression" class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] h-full rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
          </div>

          {/* Liste des 5 Tâches */}
          <div class="space-y-4" id="liste-taches">
            <div class="text-center py-8">
              <i class="fas fa-spinner fa-spin text-4xl text-white"></i>
            </div>
          </div>

          {/* Message Complet */}
          <div id="message-complet" class="hidden bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xl p-8 text-center text-white">
            <i class="fas fa-check-circle text-6xl mb-4"></i>
            <h3 class="text-3xl font-bold mb-2" data-i18n="congratulations">Félicitations !</h3>
            <p class="text-lg" data-i18n="allTasksCompleted">Toutes les tâches sont terminées</p>
            <p class="text-sm opacity-90 mt-2">Un agent va venir vous voir</p>
          </div>
        </div>

        {/* Modal Chat */}
        <div id="modal-chat" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col">
            <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 rounded-t-xl">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                  <i class="fas fa-headset"></i>
                  <span data-i18n="chat.title">Support GXO</span>
                </h3>
                <button id="btn-fermer-chat" class="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            
            <div id="messages-container" class="flex-1 p-4 overflow-y-auto space-y-3 min-h-[300px]"></div>
            
            <div class="p-4 border-t">
              <form id="form-message" class="flex gap-2">
                <input 
                  type="text" 
                  id="message-input" 
                  data-i18n-placeholder="chat.placeholder"
                  placeholder="Tapez votre message..."
                  class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none"
                />
                <button 
                  type="submit"
                  class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <script src="/static/chauffeur-taches.js"></script>
      </body>
    </html>
  )
}
