export function ChefEquipePage() {
  const processes = [
    {
      id: 'chef-equipe-reception',
      title: 'Chef d\'Équipe Réception',
      icon: 'fa-users-cog',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Position dans la chaîne de commandement',
        'Responsabilités et périmètre',
        'Coordination avec les équipes'
      ],
      document: '13_Chef_Equipe_Reception.pdf',
      description: 'Position dans la chaîne de commandement'
    },
    {
      id: 'pilotage-quotidien',
      title: 'Pilotage Quotidien et Supervision',
      icon: 'fa-clipboard-list',
      duration: 'Journée',
      level: '🟡',
      vigilance: [
        'Organisation quotidienne',
        'Formation de l\'équipe',
        'Suivi des performances'
      ],
      document: '14_Pilotage_Quotidien.pdf',
      description: 'Organisation quotidienne et formation équipe'
    },
    {
      id: 'supervision-terrain',
      title: 'Supervision Terrain et Backoffice',
      icon: 'fa-eye',
      duration: 'Continu',
      level: '🟡',
      vigilance: [
        'Supervision du contrôleur terrain',
        'Coordination backoffice',
        'Résolution de problèmes'
      ],
      document: '15_Supervision_Terrain.pdf',
      description: 'Supervision du contrôleur terrain'
    },
    {
      id: 'gestion-ecarts',
      title: 'Gestion des Écarts et Suivi KPI',
      icon: 'fa-chart-line',
      duration: 'Variable',
      level: '🟡',
      vigilance: [
        'Gestion des mancos/surplus',
        'Traitement des litiges',
        'Suivi des indicateurs'
      ],
      document: '16_Gestion_Ecarts.pdf',
      description: 'Gestion des écarts (manco/surplus) et litiges'
    },
    {
      id: 'controles-eop',
      title: 'Contrôles Quotidiens et End of Period',
      icon: 'fa-calendar-check',
      duration: '20-30 min',
      level: '🟡',
      vigilance: [
        'Contrôles administratifs',
        'Planning de charge',
        'Vérifications EOP'
      ],
      document: '17_Controles_EOP.pdf',
      description: 'Contrôles administratifs et planning de charge'
    },
    {
      id: 'flux-hazardous-analyse',
      title: 'Flux Hazardous - Analyse et Regroupement TU',
      icon: 'fa-radiation',
      duration: '20-30 min',
      level: '🔴',
      vigilance: [
        'Repérer le flux hazardous',
        'Décider des manipulations',
        'Sécurité renforcée'
      ],
      document: '18_Flux_Hazardous_Analyse.pdf',
      description: 'Repérer le flux hazardous et décider des manipulations'
    },
    {
      id: 'flux-hazardous-checkpoint',
      title: 'Flux Hazardous - Checkpoint et Mise à Quai',
      icon: 'fa-warehouse',
      duration: '15-20 min',
      level: '🔴',
      vigilance: [
        'Vider et clôturer le TU PGS',
        'Mise à quai sécurisée',
        'Respect des normes hazardous'
      ],
      document: '19_Flux_Hazardous_Checkpoint.pdf',
      description: 'Vider et clôturer le TU PGS'
    },
    {
      id: 'correction-etiquette-suppression',
      title: 'Correction Étiquette - Suppression HU',
      icon: 'fa-tag',
      duration: '5-10 min',
      level: '🟡',
      vigilance: [
        'Supprimer une étiquette HU posée à tort',
        'Vérifier avant suppression',
        'Tracer la correction'
      ],
      document: '20_Correction_Etiquette_Suppression.pdf',
      description: 'Supprimer une étiquette HU posée à tort'
    },
    {
      id: 'correction-etiquette-reedition',
      title: 'Correction Étiquette - Réédition HU',
      icon: 'fa-print',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Rééditer un HU correct dont l\'étiquette est illisible',
        'Vérifier la qualité d\'impression',
        'Apposer la nouvelle étiquette'
      ],
      document: '21_Correction_Etiquette_Reedition.pdf',
      description: 'Rééditer un HU correct dont l\'étiquette est illisible'
    },
    {
      id: 'verification-dossier',
      title: 'Vérification Dossier Après Contrôle',
      icon: 'fa-folder-open',
      duration: '10-15 min',
      level: '🟡',
      vigilance: [
        'Reprendre le dossier après contrôle physique',
        'Vérifier la cohérence des données',
        'Valider les corrections'
      ],
      document: '22_Verification_Dossier.pdf',
      description: 'Reprendre le dossier après contrôle physique'
    },
    {
      id: 'fermer-porte-quai',
      title: 'Fermer une Porte de Quai',
      icon: 'fa-door-closed',
      duration: '2-3 min',
      level: '🟢',
      vigilance: [
        'Libérer une porte de quai dans RFUI',
        'Vérifier qu\'aucun camion n\'est présent',
        'Mettre à jour le statut'
      ],
      document: '23_Fermer_Porte_Quai.pdf',
      description: 'Libérer une porte de quai dans RFUI'
    },
    {
      id: 'cloture-livraisons',
      title: 'Clôture Livraisons Ouvertes',
      icon: 'fa-check-double',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Clôturer une livraison inbound restée ouverte dans MON',
        'Vérifier les HU associés',
        'Confirmer la clôture'
      ],
      document: '24_Cloture_Livraisons.pdf',
      description: 'Clôturer une livraison inbound restée ouverte dans MON'
    },
    {
      id: 'livraison-ouverte-eop',
      title: 'Livraison Ouverte EOP',
      icon: 'fa-calendar-times',
      duration: '5-10 min',
      level: '🟡',
      vigilance: [
        'Clôturer une livraison EOP ouverte sans flux démarré',
        'Vérifier l\'absence de flux',
        'Forcer la clôture si nécessaire'
      ],
      document: '25_Livraison_Ouverte_EOP.pdf',
      description: 'Clôturer une livraison EOP ouverte sans flux démarré'
    },
    {
      id: 'cloture-tu-actif',
      title: 'Clôture TU Actif',
      icon: 'fa-times-circle',
      duration: '10-15 min',
      level: '🟡',
      vigilance: [
        'Clôturer une TU en statut Active déjà terminée terrain',
        'Vérifier le statut terrain',
        'Synchroniser système et réel'
      ],
      document: '26_Cloture_TU_Actif.pdf',
      description: 'Clôturer une TU en statut Active déjà terminée terrain'
    },
    {
      id: 'creer-packspec',
      title: 'Créer un Packspec',
      icon: 'fa-box',
      duration: '15-20 min',
      level: '🔴',
      vigilance: [
        'Créer ou corriger un packspec manquant ou faux',
        'Vérifier les données techniques',
        'Valider dans SAP'
      ],
      document: '27_Creer_Packspec.pdf',
      description: 'Créer ou corriger un packspec manquant ou faux'
    },
    {
      id: 'procedures-operationnelles',
      title: 'Procédures Opérationnelles à Utiliser',
      icon: 'fa-list-ul',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Liste des procédures terrain à appliquer',
        'Guide de référence quotidien',
        'Arbre décisionnel'
      ],
      document: '28_Procedures_Operationnelles.pdf',
      description: 'Liste des procédures terrain à appliquer'
    }
  ]

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

            <div id="card-moy-dechargement" class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transition-all duration-300">
              <div class="flex items-center justify-between mb-3">
                <i class="fas fa-clock text-3xl opacity-80"></i>
                <span class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Objectif ≤30min</span>
              </div>
              <div class="text-3xl font-bold mb-1" id="kpi-moy-dechargement">-</div>
              <div class="text-green-100 text-sm">Temps déchargement moyen</div>
            </div>

            <div id="card-moy-controle" class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transition-all duration-300">
              <div class="flex items-center justify-between mb-3">
                <i class="fas fa-clipboard-check text-3xl opacity-80"></i>
                <span class="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Objectif ≤40min</span>
              </div>
              <div class="text-3xl font-bold mb-1" id="kpi-moy-controle">-</div>
              <div class="text-purple-100 text-sm">Temps contrôle moyen</div>
            </div>
          </div>

          {/* Grille de cartes quais terminés */}
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-warehouse text-indigo-500"></i>
                Quais terminés (Fin de contrôle)
              </h3>
            </div>
            
            {/* Grille de cartes */}
            <div id="kpi-quais-grid" class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Les cartes seront générées par JavaScript */}
              <div class="col-span-full text-center py-12 text-gray-500">
                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                <p>Chargement des quais terminés...</p>
              </div>
            </div>
          </div>

          {/* Légende */}
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-center gap-2">
              <i class="fas fa-info-circle text-gray-500"></i>
              Objectifs de performance
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="text-gray-700 bg-white p-3 rounded-lg border border-gray-200 text-center">
                <strong class="text-green-600 flex items-center justify-center gap-1">
                  <i class="fas fa-truck-loading"></i>
                  Déchargement
                </strong>
                <div class="mt-1 text-xs">Objectif ≤ 30 minutes</div>
              </div>
              <div class="text-gray-700 bg-white p-3 rounded-lg border border-gray-200 text-center">
                <strong class="text-purple-600 flex items-center justify-center gap-1">
                  <i class="fas fa-clipboard-check"></i>
                  Contrôle
                </strong>
                <div class="mt-1 text-xs">Objectif ≤ 40 minutes</div>
              </div>
            </div>
            <div class="mt-3 text-xs text-gray-500 text-center">
              💡 Les cartes de moyennes passent en <span class="text-red-600 font-bold">ROUGE</span> si l'objectif est dépassé
            </div>
          </div>
        </div>

        {/* Tab Content - Procédures */}
        <div id="tab-procedures-chef-content" class="p-6 hidden">
          {/* GXO-Procédures Section */}
          <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-xl p-6 mb-6">
            <h2 class="text-3xl font-bold flex items-center">
              <i class="fas fa-file-alt mr-3"></i>
              GXO-Procédures Chef d'Équipe
            </h2>
            <p class="text-lg opacity-90 mt-2">
              {processes.length} procédures opérationnelles détaillées
            </p>
          </div>

          {/* Process Cards - Format Reception.tsx */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {processes.map((process) => (
              <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center mb-2">
                        <i class={`fas ${process.icon} text-3xl mr-4`}></i>
                        <h3 class="text-xl font-bold flex-1">{process.title}</h3>
                      </div>
                      <div class="flex items-center space-x-4 text-sm opacity-90">
                        <span>
                          <i class="far fa-clock mr-1"></i>{process.duration}
                        </span>
                        <span>
                          Niveau {process.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="p-6">
                  {/* Description */}
                  {process.description && (
                    <div class="mb-4">
                      <p class="text-gray-700 text-sm">{process.description}</p>
                    </div>
                  )}

                  {/* Points de vigilance */}
                  <div class="mb-4">
                    <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                      <i class="fas fa-exclamation-triangle text-indigo-500 mr-2"></i>
                      Points de vigilance
                    </h4>
                    <ul class="space-y-1">
                      {process.vigilance.map((point) => (
                        <li class="text-sm text-gray-600 flex items-start">
                          <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div class="flex flex-wrap gap-2 mt-4">
                    {process.document && (
                      <a 
                        href={`/procedures/${process.document}`}
                        target="_blank"
                        class="gxo-btn bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 flex items-center"
                      >
                        <i class="fas fa-file-download mr-2"></i>
                        Télécharger PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
      <script src="/static/chef-equipe.js?v=3.5.43"></script>
    </div>
  )
}
