import { FC } from 'hono/jsx'

export const AdminDashboardChauffeurs: FC = () => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard Chauffeurs - GXO Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-100">
        {/* Header */}
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
          <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10" />
                <div>
                  <h1 class="text-2xl font-bold">Dashboard Chauffeurs</h1>
                  <p class="text-sm opacity-90">Suivi en temps réel</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="bg-white/20 rounded-xl px-4 py-2">
                  <div class="text-xs opacity-90">Chauffeurs actifs</div>
                  <div class="text-2xl font-bold" id="count-actifs">0</div>
                </div>
                <a href="/" class="bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 transition">
                  <i class="fas fa-home mr-2"></i>
                  Accueil
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-6">
          {/* Filtres et Statistiques */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Tâches Complètes</p>
                  <p class="text-3xl font-bold text-green-600" id="stat-completes">0</p>
                </div>
                <i class="fas fa-check-circle text-4xl text-green-500 opacity-20"></i>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">En Cours</p>
                  <p class="text-3xl font-bold text-orange-600" id="stat-en-cours">0</p>
                </div>
                <i class="fas fa-clock text-4xl text-orange-500 opacity-20"></i>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Nouveaux</p>
                  <p class="text-3xl font-bold text-blue-600" id="stat-nouveaux">0</p>
                </div>
                <i class="fas fa-plus-circle text-4xl text-blue-500 opacity-20"></i>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Messages Non Lus</p>
                  <p class="text-3xl font-bold text-red-600" id="stat-messages">0</p>
                </div>
                <i class="fas fa-envelope text-4xl text-red-500 opacity-20"></i>
              </div>
            </div>
          </div>

          {/* Notifications Temps Réel */}
          <div id="notifications-live" class="mb-6"></div>

          {/* Liste des Chauffeurs */}
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-users mr-2"></i>
                Chauffeurs Actifs
              </h2>
              <button onclick="chargerChauffeurs()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                <i class="fas fa-sync-alt mr-2"></i>
                Actualiser
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-100 border-b">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chauffeur</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quai</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progression</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tâches</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody id="table-chauffeurs" class="divide-y divide-gray-200">
                  {/* Chargement... */}
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center">
                      <div class="flex flex-col items-center space-y-3">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        <p class="text-gray-500">Chargement des chauffeurs...</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Chat avec un Chauffeur */}
        <div id="modal-chat" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col" style="max-height: 80vh">
            {/* Header Chat */}
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-user-circle text-3xl"></i>
                  <div>
                    <h3 class="font-bold text-xl" id="chat-chauffeur-nom">Chauffeur</h3>
                    <p class="text-sm opacity-90">
                      Quai <span id="chat-chauffeur-quai">--</span> • 
                      <span id="chat-chauffeur-entreprise">--</span>
                    </p>
                  </div>
                </div>
                <button id="btn-fermer-chat" class="hover:bg-white/20 rounded-full p-2 transition">
                  <i class="fas fa-times text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div id="chat-messages" class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              <div class="text-center text-gray-500 py-12">
                <i class="fas fa-comments text-5xl mb-3 opacity-30"></i>
                <p>Aucun message</p>
              </div>
            </div>

            {/* Input */}
            <div class="p-6 bg-white border-t rounded-b-2xl">
              <div class="flex space-x-3">
                <input 
                  type="text" 
                  id="input-admin-message" 
                  placeholder="Écrivez un message au chauffeur..." 
                  class="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button id="btn-envoyer-admin-message" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <script src="/static/admin-dashboard-chauffeurs.js"></script>
      </body>
    </html>
  )
}
