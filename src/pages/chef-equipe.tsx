export function ChefEquipePage() {
  return (
    <div>
      {/* Hero Section */}
      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 rounded-full p-4">
              <i class="fas fa-users-cog text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Chef d'équipe / Responsable d'exploitation</h1>
              <p class="text-xl opacity-90">Gestion d'équipe et supervision des opérations</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-5xl font-bold" id="total-improd-count">0</div>
            <div class="text-sm opacity-75">Demandes en attente</div>
          </div>
        </div>
      </div>

      {/* Triple Interface - Onglets */}
      <div class="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        {/* Tabs Header */}
        <div class="flex border-b border-gray-200">
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 bg-indigo-50 border-indigo-500 text-indigo-700"
            id="tab-improd-chef-btn"
            onclick="switchTabChef('improd')"
          >
            <i class="fas fa-stopwatch mr-2"></i>
            Suivi Improductivités
            <span id="badge-improd-count" class="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">0</span>
          </button>
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            id="tab-kpi-chef-btn"
            onclick="switchTabChef('kpi')"
          >
            <i class="fas fa-chart-line mr-2"></i>
            Suivi des KPI
          </button>
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            id="tab-procedures-chef-btn"
            onclick="switchTabChef('procedures')"
          >
            <i class="fas fa-clipboard-list mr-2"></i>
            Procédures
          </button>
        </div>

        {/* Tab Content - Suivi Improductivités */}
        <div id="tab-improd-chef-content" class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-stopwatch mr-2 text-indigo-500"></i>
            Suivi des demandes d'improductivité
          </h2>

          {/* Statistiques rapides */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-red-600 font-semibold">En transmission</p>
                  <p id="stat-en-transmission" class="text-3xl font-bold text-red-700">0</p>
                </div>
                <i class="fas fa-clock text-4xl text-red-300"></i>
              </div>
            </div>
            
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-green-600 font-semibold">Validées</p>
                  <p id="stat-validees" class="text-3xl font-bold text-green-700">0</p>
                </div>
                <i class="fas fa-check-circle text-4xl text-green-300"></i>
              </div>
            </div>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-blue-600 font-semibold">Contrôleurs</p>
                  <p id="stat-controleurs" class="text-3xl font-bold text-blue-700">0</p>
                </div>
                <i class="fas fa-user-check text-4xl text-blue-300"></i>
              </div>
            </div>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-yellow-600 font-semibold">Agents de quai</p>
                  <p id="stat-agents" class="text-3xl font-bold text-yellow-700">0</p>
                </div>
                <i class="fas fa-hard-hat text-4xl text-yellow-300"></i>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div class="mb-6 flex space-x-4">
            <button 
              id="btn-filtre-transmission"
              class="px-6 py-3 rounded-lg font-semibold transition-all bg-red-500 text-white"
              onclick="filtrerImprodChef('en_transmission')"
            >
              <i class="fas fa-clock mr-2"></i>
              En transmission
            </button>
            <button 
              id="btn-filtre-validees"
              class="px-6 py-3 rounded-lg font-semibold transition-all bg-gray-200 text-gray-700"
              onclick="filtrerImprodChef('validee')"
            >
              <i class="fas fa-check-circle mr-2"></i>
              Validées et transmises
            </button>
          </div>

          {/* Liste des demandes */}
          <div id="improd-liste-chef" class="space-y-4">
            <div class="text-center text-gray-500 py-12">
              <i class="fas fa-inbox text-5xl mb-3"></i>
              <p class="text-lg">Chargement des demandes...</p>
            </div>
          </div>
        </div>

        {/* Tab Content - KPI */}
        <div id="tab-kpi-chef-content" class="p-6 hidden">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-800">
              <i class="fas fa-truck-loading mr-2 text-indigo-500"></i>
              KPI Réception Camion
            </h2>
            
            {/* Sélection de date */}
            <div class="flex items-center gap-4">
              <input 
                type="date" 
                id="kpi-date-select" 
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onchange="loadKPIReception()"
              />
              <button 
                onclick="loadKPIReception()" 
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <i class="fas fa-sync-alt"></i>
                Actualiser
              </button>
            </div>
          </div>

          {/* Cartes de moyennes */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between mb-3">
                <i class="fas fa-truck text-3xl opacity-80"></i>
                <span class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Aujourd'hui</span>
              </div>
              <div class="text-3xl font-bold mb-1" id="kpi-nb-camions">-</div>
              <div class="text-blue-100 text-sm">Camions traités</div>
            </div>

            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between mb-3">
                <i class="fas fa-clock text-3xl opacity-80"></i>
                <span class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Objectif ≤20min</span>
              </div>
              <div class="text-3xl font-bold mb-1" id="kpi-moy-dechargement">-</div>
              <div class="text-green-100 text-sm">Temps déchargement moyen</div>
            </div>

            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between mb-3">
                <i class="fas fa-clipboard-check text-3xl opacity-80"></i>
                <span class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Objectif ≤30min</span>
              </div>
              <div class="text-3xl font-bold mb-1" id="kpi-moy-controle">-</div>
              <div class="text-purple-100 text-sm">Temps contrôle moyen</div>
            </div>

            <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between mb-3">
                <i class="fas fa-hourglass-half text-3xl opacity-80"></i>
                <span class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Objectif ≤1h</span>
              </div>
              <div class="text-3xl font-bold mb-1" id="kpi-moy-total">-</div>
              <div class="text-orange-100 text-sm">Temps total moyen</div>
            </div>
          </div>

          {/* Tableau détaillé */}
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-table text-indigo-500"></i>
                Détail par camion
              </h3>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr class="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <th class="px-6 py-4">Quai</th>
                    <th class="px-6 py-4">Camion</th>
                    <th class="px-6 py-4">Fournisseur</th>
                    <th class="px-6 py-4">Début déchargement</th>
                    <th class="px-6 py-4">Fin déchargement</th>
                    <th class="px-6 py-4">Validation contrôle</th>
                    <th class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <i class="fas fa-truck-loading text-green-500"></i>
                        <span>Déchargement</span>
                      </div>
                    </th>
                    <th class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <i class="fas fa-clipboard-check text-purple-500"></i>
                        <span>Contrôle</span>
                      </div>
                    </th>
                    <th class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <i class="fas fa-hourglass-half text-orange-500"></i>
                        <span>Total</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody id="kpi-tableau-body" class="divide-y divide-gray-200">
                  <tr>
                    <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                      <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                      <p>Chargement des données KPI...</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Légende */}
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i class="fas fa-info-circle text-gray-500"></i>
              Légende des seuils de performance
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div class="flex items-center gap-3">
                <div class="flex gap-2">
                  <span class="px-2 py-1 rounded bg-green-100 text-green-800 font-medium">Vert</span>
                  <span class="px-2 py-1 rounded bg-orange-100 text-orange-800 font-medium">Orange</span>
                  <span class="px-2 py-1 rounded bg-red-100 text-red-800 font-medium">Rouge</span>
                </div>
              </div>
              <div class="text-gray-600">
                <strong>Déchargement:</strong> ≤20min / 21-25min / &gt;25min
              </div>
              <div class="text-gray-600">
                <strong>Contrôle:</strong> ≤30min / 31-40min / &gt;40min
              </div>
              <div class="text-gray-600 md:col-span-3">
                <strong>Temps total:</strong> ≤1h / 1h-1h10 / &gt;1h10
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content - Procédures */}
        <div id="tab-procedures-chef-content" class="p-6 hidden">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-clipboard-list mr-2 text-indigo-500"></i>
            Procédures du Chef d'équipe
          </h2>

          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg">
            <h3 class="text-lg font-bold text-indigo-800 mb-3">
              <i class="fas fa-info-circle mr-2"></i>
              Contenu à venir
            </h3>
            <ul class="text-gray-700 space-y-2">
              <li><i class="fas fa-check text-indigo-500 mr-2"></i>Gestion des équipes et planification</li>
              <li><i class="fas fa-check text-indigo-500 mr-2"></i>Supervision des opérations quotidiennes</li>
              <li><i class="fas fa-check text-indigo-500 mr-2"></i>Reporting et indicateurs de performance</li>
              <li><i class="fas fa-check text-indigo-500 mr-2"></i>Gestion des incidents et escalades</li>
              <li><i class="fas fa-check text-indigo-500 mr-2"></i>Coordination inter-services</li>
              <li><i class="fas fa-check text-indigo-500 mr-2"></i>Formation et développement des équipes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de validation */}
      <div id="modal-validation" class="fixed inset-0 bg-black/50 hidden flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div class="bg-indigo-600 text-white p-6 flex items-center justify-between">
            <h3 class="text-2xl font-bold">
              <i class="fas fa-check-circle mr-2"></i>
              Validation de la demande
            </h3>
            <button onclick="fermerModalValidation()" class="text-white hover:text-indigo-200 transition-colors text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="p-6">
            <div id="modal-validation-details" class="space-y-4">
              {/* Détails chargés dynamiquement */}
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-comment mr-2 text-indigo-500"></i>
                Commentaire du chef d'équipe (optionnel)
              </label>
              <textarea 
                id="validation-commentaire"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ajoutez un commentaire si nécessaire..."
              ></textarea>
            </div>

            <div class="mt-6 flex space-x-4">
              <button 
                onclick="validerImprod()"
                class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <i class="fas fa-check mr-2"></i>
                Valider et transmettre
              </button>
              <button 
                onclick="fermerModalValidation()"
                class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                <i class="fas fa-times mr-2"></i>
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Script pour la gestion chef d'équipe */}
      <script src="/static/chef-equipe.js?v=3.5.37"></script>
    </div>
  )
}
