export function ArchivesPage() {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Archives - GXO Logistics Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-100 min-h-screen">
        {/* Header */}
        <div class="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6 shadow-lg">
          <div class="container mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="bg-white/20 rounded-full p-4">
                  <i class="fas fa-archive text-4xl"></i>
                </div>
                <div>
                  <h1 class="text-4xl font-bold mb-2">Archives</h1>
                  <p class="text-xl opacity-90">Historique des activités et données archivées</p>
                </div>
              </div>
              <a href="/" class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour
              </a>
            </div>
          </div>
        </div>

        {/* Container principal */}
        <div class="container mx-auto p-6">
          {/* Filtres de période */}
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              <i class="fas fa-calendar-alt mr-2 text-blue-500"></i>
              Sélection de la période
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Année */}
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Année</label>
                <select id="filter-year" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              
              {/* Mois */}
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mois</label>
                <select id="filter-month" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option value="">Tous les mois</option>
                  <option value="01">Janvier</option>
                  <option value="02">Février</option>
                  <option value="03" selected>Mars</option>
                  <option value="04">Avril</option>
                  <option value="05">Mai</option>
                  <option value="06">Juin</option>
                  <option value="07">Juillet</option>
                  <option value="08">Août</option>
                  <option value="09">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
              </div>
              
              {/* Semaine */}
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Semaine</label>
                <select id="filter-week" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option value="">Toutes les semaines</option>
                </select>
              </div>
              
              {/* Jour */}
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Jour</label>
                <select id="filter-day" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option value="">Tous les jours</option>
                  <option value="1">Lundi</option>
                  <option value="2">Mardi</option>
                  <option value="3">Mercredi</option>
                  <option value="4">Jeudi</option>
                  <option value="5">Vendredi</option>
                  <option value="6">Samedi</option>
                  <option value="7">Dimanche</option>
                </select>
              </div>
            </div>
            
            <div class="mt-4 flex gap-3">
              <button onclick="appliquerFiltres()" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <i class="fas fa-filter mr-2"></i>
                Appliquer les filtres
              </button>
              <button onclick="resetFiltres()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors">
                <i class="fas fa-redo mr-2"></i>
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Onglets des rubriques */}
          <div class="bg-white rounded-xl shadow-lg mb-6">
            <div class="flex border-b">
              <button id="tab-kpi" onclick="switchTab('kpi')" class="flex-1 px-6 py-4 font-bold text-lg transition-colors bg-blue-500 text-white">
                <i class="fas fa-chart-line mr-2"></i>
                Suivi des KPI
              </button>
              <button id="tab-improd" onclick="switchTab('improd')" class="flex-1 px-6 py-4 font-bold text-lg transition-colors hover:bg-gray-100">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Improductivité
              </button>
              <button id="tab-ecarts" onclick="switchTab('ecarts')" class="flex-1 px-6 py-4 font-bold text-lg transition-colors hover:bg-gray-100">
                <i class="fas fa-clipboard-check mr-2"></i>
                Écarts & Non-conformités
              </button>
            </div>
          </div>

          {/* Contenu KPI */}
          <div id="content-kpi" class="tab-content">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                <i class="fas fa-warehouse mr-2 text-green-500"></i>
                Quais terminés - Suivi des KPI
              </h3>
              
              {/* Stats */}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" id="stats-kpi">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="text-sm text-blue-600 font-semibold">Total Camions</div>
                  <div class="text-3xl font-bold text-blue-700" id="stat-total-camions">0</div>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                  <div class="text-sm text-green-600 font-semibold">Temps Déchargement Moyen</div>
                  <div class="text-3xl font-bold text-green-700" id="stat-dechargement">0 min</div>
                </div>
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="text-sm text-purple-600 font-semibold">Temps Contrôle Moyen</div>
                  <div class="text-3xl font-bold text-purple-700" id="stat-controle">0 min</div>
                </div>
              </div>
              
              {/* Liste des quais */}
              <div id="liste-kpi" class="grid grid-cols-1 gap-4">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                  <p>Chargement des données...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu Improductivité */}
          <div id="content-improd" class="tab-content hidden">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                <i class="fas fa-exclamation-triangle mr-2 text-orange-500"></i>
                Improductivités validées et traitées
              </h3>
              
              {/* Sous-onglets Improductivité */}
              <div class="flex space-x-2 mb-6">
                <button id="improd-tab-total" onclick="switchImprodTab('total')" class="px-4 py-2 rounded-lg font-semibold transition-colors bg-orange-500 text-white">
                  <i class="fas fa-list mr-2"></i>
                  Total
                </button>
                <button id="improd-tab-controleurs" onclick="switchImprodTab('controleurs')" class="px-4 py-2 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300">
                  <i class="fas fa-clipboard-check mr-2"></i>
                  Contrôleurs
                </button>
                <button id="improd-tab-agents" onclick="switchImprodTab('agents')" class="px-4 py-2 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300">
                  <i class="fas fa-dolly mr-2"></i>
                  Agents de Quai
                </button>
              </div>
              
              {/* Stats */}
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" id="stats-improd">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="text-sm text-blue-600 font-semibold">Total</div>
                  <div class="text-3xl font-bold text-blue-700" id="stat-total-improd">0</div>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                  <div class="text-sm text-green-600 font-semibold">Traités</div>
                  <div class="text-3xl font-bold text-green-700" id="stat-traites-improd">0</div>
                </div>
                <div class="bg-orange-50 rounded-lg p-4">
                  <div class="text-sm text-orange-600 font-semibold">En Transmission</div>
                  <div class="text-3xl font-bold text-orange-700" id="stat-attente-improd">0</div>
                </div>
                <div class="bg-red-50 rounded-lg p-4">
                  <div class="text-sm text-red-600 font-semibold">Durée Totale</div>
                  <div class="text-3xl font-bold text-red-700" id="stat-duree-improd">0 min</div>
                </div>
              </div>
              
              {/* Liste des improductivités */}
              <div id="liste-improd" class="space-y-4">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                  <p>Chargement des données...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu Écarts */}
          <div id="content-ecarts" class="tab-content hidden">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                <i class="fas fa-clipboard-check mr-2 text-red-500"></i>
                Écarts et Non-conformités traités
              </h3>
              
              {/* Stats */}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" id="stats-ecarts">
                <div class="bg-red-50 rounded-lg p-4">
                  <div class="text-sm text-red-600 font-semibold">Total Écarts</div>
                  <div class="text-3xl font-bold text-red-700" id="stat-total-ecarts">0</div>
                </div>
                <div class="bg-yellow-50 rounded-lg p-4">
                  <div class="text-sm text-yellow-600 font-semibold">Non-conformités</div>
                  <div class="text-3xl font-bold text-yellow-700" id="stat-non-conformites">0</div>
                </div>
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="text-sm text-purple-600 font-semibold">Alertes Critiques</div>
                  <div class="text-3xl font-bold text-purple-700" id="stat-alertes">0</div>
                </div>
              </div>
              
              {/* Liste des écarts */}
              <div id="liste-ecarts" class="space-y-4">
                <div class="text-center py-8 text-gray-500">
                  <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                  <p>Chargement des données...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="/static/archives.js"></script>
      </body>
    </html>
  )
}
