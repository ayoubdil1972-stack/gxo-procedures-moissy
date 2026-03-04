export function AccueilChauffeurPage() {
  const processes = [
    {
      id: 'arrivee-chauffeur',
      title: 'Arrivée et enregistrement',
      icon: 'fa-truck',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Se présenter à l\'accueil', 'Préparer documents', 'Suivre signalisation'],
      document: 'Assigner camion à quai-2.docx'
    },
    {
      id: 'procedures-securite',
      title: 'Procédures de sécurité',
      icon: 'fa-shield-alt',
      duration: '5 min',
      level: '🟡',
      vigilance: ['Port EPI obligatoire', 'Respecter zones', 'Signaler anomalies']
    },
    {
      id: 'dechargement-chauffeur',
      title: 'Opération de déchargement',
      icon: 'fa-dolly',
      duration: '30-60 min',
      level: '🟢',
      vigilance: ['Attendre autorisation', 'Ouvrir portes si demandé', 'Rester disponible']
    },
    {
      id: 'depart-chauffeur',
      title: 'Clôture et départ',
      icon: 'fa-sign-out-alt',
      duration: '10 min',
      level: '🟢',
      vigilance: ['Récupérer documents signés', 'Vérifier camion vide', 'Signaler départ']
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 p-4 rounded-full">
              <i class="fas fa-truck text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Accueil Chauffeur</h1>
              <p class="text-xl opacity-90">Procédures d'arrivée et livraison</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-5xl font-bold">{processes.length}</div>
            <div class="text-sm opacity-75">Procédures</div>
          </div>
        </div>
      </div>

      {/* Système d'Onglets pour Chauffeurs et Quais */}
      <div class="mb-8">
        {/* Onglets de navigation */}
        <div class="flex space-x-2 mb-6">
          <button 
            id="tab-chauffeurs"
            onclick="switchTab('chauffeurs')"
            class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-3">
            <i class="fas fa-users-cog text-2xl"></i>
            <div class="text-left">
              <div class="text-lg">Chauffeurs Actifs</div>
              <div class="text-xs opacity-75">Suivi en temps réel</div>
            </div>
            <div class="bg-white/20 rounded-lg px-3 py-1">
              <span class="text-2xl font-bold" id="tab-stat-chauffeurs">0</span>
            </div>
          </button>
          
          <button 
            id="tab-quais"
            onclick="switchTab('quais')"
            class="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl shadow-lg hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center space-x-3">
            <i class="fas fa-warehouse text-2xl"></i>
            <div class="text-left">
              <div class="text-lg">Gestion des Quais</div>
              <div class="text-xs opacity-75">45 quais GXO Moissy</div>
            </div>
            <div class="bg-gray-100 rounded-lg px-3 py-1">
              <span class="text-2xl font-bold text-green-600" id="tab-stat-quais-disponibles">0</span>
            </div>
          </button>
        </div>

        {/* Contenu de l'onglet Chauffeurs */}
        <div id="content-chauffeurs" class="tab-content">
          <div id="dashboard-chauffeurs-container">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-xl p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2 flex items-center">
                <i class="fas fa-users-cog mr-3"></i>
                Chauffeurs Actifs en Temps Réel
              </h2>
              <p class="text-sm opacity-90">Suivi de la progression des tâches de déchargement</p>
            </div>
            <div class="flex space-x-4">
              <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div class="text-3xl font-bold" id="stat-total-chauffeurs">0</div>
                <div class="text-xs opacity-75">Total</div>
              </div>
              <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div class="text-3xl font-bold text-green-300" id="stat-complets">0</div>
                <div class="text-xs opacity-75">Prêts</div>
              </div>
              <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div class="text-3xl font-bold text-orange-200" id="stat-en-cours">0</div>
                <div class="text-xs opacity-75">En cours</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grille des chauffeurs */}
        <div id="dashboard-chauffeurs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Chargement... */}
          <div class="col-span-full flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        </div>
        
        {/* Légende */}
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-info-circle text-blue-500 mr-2"></i>
            Légende des Tâches
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🦺</span>
              <span class="text-sm text-gray-700">EPI Porté</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🚚</span>
              <span class="text-sm text-gray-700">Placement Quai</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">📦</span>
              <span class="text-sm text-gray-700">Échange Palettes</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🔔</span>
              <span class="text-sm text-gray-700">Accueil Notifié</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🔑</span>
              <span class="text-sm text-gray-700">Remise Clés</span>
            </div>
          </div>
        </div>
      </div>
        </div>

        {/* Contenu de l'onglet Quais */}
        <div id="content-quais" class="tab-content hidden">
          {/* Header avec statistiques */}
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-xl p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold mb-2 flex items-center">
                  <i class="fas fa-warehouse mr-3"></i>
                  Gestion des Quais de Déchargement
                </h2>
                <p class="text-sm opacity-90">Visualisation et gestion de l'état des 45 quais GXO Moissy en temps réel</p>
              </div>
              <div class="flex space-x-4">
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-green-300" id="stat-quais-disponibles">0</div>
                  <div class="text-xs opacity-75">Disponibles</div>
                </div>
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-yellow-300" id="stat-quais-en-cours">0</div>
                  <div class="text-xs opacity-75">En cours</div>
                </div>
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-red-300" id="stat-quais-indisponibles">0</div>
                  <div class="text-xs opacity-75">Indisponibles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Grille des 45 quais GXO Moissy */}
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div id="quais-grid" class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-4">
              {/* Chargement... */}
              <div class="col-span-full flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              </div>
            </div>
          </div>

          {/* Légende des statuts */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-info-circle text-green-500 mr-2"></i>
              Légende des Statuts
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                <span class="text-sm font-semibold text-gray-700">Disponible - Prêt pour chargement</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span class="text-sm font-semibold text-gray-700">En cours d'utilisation - Timer actif</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                <span class="text-sm font-semibold text-gray-700">Indisponible - Problème signalé</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processes Grid */}
      <div class="grid grid-cols-1 gap-6">
        {processes.map((process) => (
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class={`fas ${process.icon} text-2xl text-blue-600`}></i>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{process.title}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span class="flex items-center">
                      <i class="fas fa-clock mr-2 text-blue-500"></i>
                      {process.duration}
                    </span>
                    <span class="flex items-center">
                      <span class="mr-2">Niveau:</span>
                      <span class="text-lg">{process.level}</span>
                    </span>
                  </div>
                  {process.vigilance && (
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
                      <p class="text-sm font-semibold text-yellow-800 mb-2">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Points de vigilance:
                      </p>
                      <ul class="text-sm text-yellow-700 space-y-1">
                        {process.vigilance.map(point => (
                          <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-1 text-xs"></i>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Bouton Vidéo tutoriel */}
                  <div class="mt-4">
                    <button 
                      class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 w-full justify-center"
                      onclick="alert('Fonctionnalité Vidéo tutoriel à venir')"
                    >
                      <i class="fas fa-video"></i>
                      <span class="font-semibold">Vidéo tutoriel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              {process.document && (
                <a 
                  href={`/static/documents/${process.document}`}
                  target="_blank"
                  class="gxo-btn bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 flex items-center"
                >
                  <i class="fas fa-file-download mr-2"></i>
                  Document
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Script Système d'Onglets */}
      <script src="/static/accueil-chauffeur-tabs.js"></script>
      
      {/* Script Dashboard Temps Réel */}
      <script src="/static/accueil-chauffeur-dashboard.js"></script>
      
      {/* Script Gestion des Quais (version intégrée) */}
      <script src="/static/accueil-chauffeur-quais.js"></script>
    </div>
  )
}
