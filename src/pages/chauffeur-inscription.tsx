export function ChauffeurInscriptionPage() {
  return (
    <div class="min-h-screen bg-gray-100">
      {/* Header */}
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
        <div class="container mx-auto flex items-center justify-between">
          <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10" />
          <div class="text-white font-bold" id="langue-header"></div>
        </div>
      </div>

      {/* Conteneur principal */}
      <div class="container mx-auto p-4 max-w-4xl">
        
        {/* Section Inscription (visible au début) */}
        <div id="section-inscription" class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-user-plus text-[#FF5A1A] mr-3"></i>
            <span id="titre-inscription">Inscription Chauffeur</span>
          </h2>

          <form id="form-inscription" class="space-y-4">
            {/* Pseudo */}
            <div>
              <label class="block text-gray-700 font-semibold mb-2">
                <i class="fas fa-user mr-2"></i>
                <span id="label-pseudo">Pseudo / Nom</span>
                <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="input-pseudo" 
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5A1A] focus:outline-none transition-colors"
                placeholder="Ex: Jean Dupont"
              />
            </div>

            {/* Entreprise */}
            <div>
              <label class="block text-gray-700 font-semibold mb-2">
                <i class="fas fa-building mr-2"></i>
                <span id="label-entreprise">Entreprise de transport</span>
                <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="input-entreprise" 
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5A1A] focus:outline-none transition-colors"
                placeholder="Ex: DHL Express"
              />
            </div>

            {/* Numéro de Quai */}
            <div>
              <label class="block text-gray-700 font-semibold mb-2">
                <i class="fas fa-warehouse mr-2"></i>
                <span id="label-quai">Numéro de quai attribué</span>
                <span class="text-red-500">*</span>
              </label>
              <select 
                id="input-quai" 
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5A1A] focus:outline-none transition-colors"
              >
                <option value="">-- Sélectionner --</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                  <option value={`Q${num}`}>Quai {num}</option>
                ))}
              </select>
            </div>

            {/* Bouton de soumission */}
            <button 
              type="submit"
              class="w-full bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
            >
              <i class="fas fa-check-circle mr-2"></i>
              <span id="btn-submit">Valider et commencer</span>
            </button>
          </form>
        </div>

        {/* Section Tâches (masquée au début) */}
        <div id="section-taches" class="hidden">
          {/* Barre de progression globale */}
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4" id="titre-progression">Progression</h3>
            <div class="bg-gray-200 rounded-full h-6 overflow-hidden">
              <div 
                id="progress-global" 
                class="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500 flex items-center justify-center text-white text-sm font-bold"
                style="width: 0%"
              >
                0%
              </div>
            </div>
          </div>

          {/* Liste des tâches */}
          <div class="space-y-4">
            
            {/* Tâche 1: EPI */}
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div id="icon-epi" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-hard-hat text-gray-400 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800" id="titre-epi">Port des EPI obligatoires</h4>
                  </div>
                  <p class="text-gray-600 text-sm ml-13" id="desc-epi">
                    Casque, gilet de sécurité, chaussures de sécurité
                  </p>
                </div>
                <button 
                  onclick="validerTache('epi')" 
                  id="btn-epi"
                  class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  <i class="fas fa-check mr-1"></i>
                  <span id="btn-epi-text">Valider</span>
                </button>
              </div>
            </div>

            {/* Tâche 2: Placement à quai */}
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div id="icon-placement" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-truck-loading text-gray-400 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800" id="titre-placement">Placement correct à quai</h4>
                  </div>
                  <p class="text-gray-600 text-sm ml-13" id="desc-placement">
                    Camion positionné et calé
                  </p>
                </div>
                <button 
                  onclick="validerTache('placement')" 
                  id="btn-placement"
                  class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  <i class="fas fa-check mr-1"></i>
                  <span id="btn-placement-text">Valider</span>
                </button>
              </div>
            </div>

            {/* Tâche 3: Changement de palettes */}
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div id="icon-palette" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-pallet text-gray-400 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800" id="titre-palette">Échange de palettes</h4>
                  </div>
                  <p class="text-gray-600 text-sm ml-13" id="desc-palette">
                    Palettes EPAL / EUR comptées
                  </p>
                </div>
                <button 
                  onclick="validerTache('palette')" 
                  id="btn-palette"
                  class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  <i class="fas fa-check mr-1"></i>
                  <span id="btn-palette-text">Valider</span>
                </button>
              </div>
            </div>

            {/* Tâche 4: Accueil notifié */}
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div id="icon-accueil" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-bell text-gray-400 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800" id="titre-accueil">Accueil notifié</h4>
                  </div>
                  <p class="text-gray-600 text-sm ml-13" id="desc-accueil">
                    Signaler votre arrivée à l'accueil
                  </p>
                </div>
                <button 
                  onclick="validerTache('accueil')" 
                  id="btn-accueil"
                  class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  <i class="fas fa-check mr-1"></i>
                  <span id="btn-accueil-text">Valider</span>
                </button>
              </div>
            </div>

            {/* Tâche 5: Remise des clefs */}
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div id="icon-clefs" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-key text-gray-400 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800" id="titre-clefs">Remise des clefs</h4>
                  </div>
                  <p class="text-gray-600 text-sm ml-13" id="desc-clefs">
                    Remettre les clefs à l'agent de quai
                  </p>
                </div>
                <button 
                  onclick="validerTache('clefs')" 
                  id="btn-clefs"
                  class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  <i class="fas fa-check mr-1"></i>
                  <span id="btn-clefs-text">Valider</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bouton Chat */}
          <button 
            onclick="toggleChat()"
            class="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          >
            <i class="fas fa-comments text-2xl"></i>
            <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">0</span>
          </button>
        </div>

      </div>

      {/* Modal Chat (à implémenter dans la prochaine étape) */}
      <div id="chat-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-6 z-50">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md h-[600px] flex flex-col">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-lg flex items-center justify-between">
            <h3 class="text-white font-bold">
              <i class="fas fa-comments mr-2"></i>
              Chat avec l'accueil
            </h3>
            <button onclick="toggleChat()" class="text-white hover:text-gray-200">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <div id="chat-messages" class="flex-1 p-4 overflow-y-auto bg-gray-50">
            {/* Messages ici */}
          </div>
          <div class="p-4 border-t">
            <div class="flex space-x-2">
              <input 
                type="text" 
                id="chat-input" 
                placeholder="Votre message..."
                class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                onkeypress="if(event.key==='Enter') envoyerMessage()"
              />
              <button 
                onclick="envoyerMessage()"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scripts */}
      <script src="/static/chauffeur-app.js"></script>
    </div>
  )
}
