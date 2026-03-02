// Updated: 2026-02-14 18:00 - Checklists interactives activées
export function AccueilChauffeurPage() {
  const processes = [
    {
      id: 'arrivee-chauffeur',
      title: 'Arrivée et enregistrement',
      icon: 'fa-truck',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Se présenter à l\'accueil', 'Préparer documents', 'Suivre signalisation'],
      document: 'Assigner camion à quai-2.docx',
      checklist: [
        'Se présenter à l\'accueil réception',
        'Présenter CMR et bon de livraison',
        'Indiquer le numéro de commande',
        'Recevoir l\'assignation du quai',
        'Suivre la signalisation vers le quai',
        'Stationner au quai assigné',
        'Attendre autorisation de déchargement'
      ]
    },
    {
      id: 'procedures-securite',
      title: 'Procédures de sécurité',
      icon: 'fa-shield-alt',
      duration: '5 min',
      level: '🟡',
      vigilance: ['Port EPI obligatoire', 'Respecter zones', 'Signaler anomalies'],
      checklist: [
        'Porter gilet haute visibilité',
        'Porter chaussures de sécurité',
        'Respecter les zones piétonnes',
        'Ne pas entrer dans l\'entrepôt',
        'Signaler toute anomalie',
        'Suivre instructions personnel GXO'
      ]
    },
    {
      id: 'dechargement-chauffeur',
      title: 'Opération de déchargement',
      icon: 'fa-dolly',
      duration: '30-60 min',
      level: '🟢',
      vigilance: ['Attendre autorisation', 'Ouvrir portes si demandé', 'Rester disponible'],
      checklist: [
        'Attendre signal de l\'agent de quai',
        'Ouvrir les portes arrière si demandé',
        'Faciliter l\'accès aux marchandises',
        'Rester disponible pour questions',
        'Vérifier les quantités déchargées',
        'Signaler tout écart ou dommage',
        'Attendre signature des documents'
      ]
    },
    {
      id: 'depart-chauffeur',
      title: 'Clôture et départ',
      icon: 'fa-sign-out-alt',
      duration: '10 min',
      level: '🟢',
      vigilance: ['Récupérer documents signés', 'Vérifier camion vide', 'Signaler départ'],
      checklist: [
        'Récupérer BL signé',
        'Vérifier que tout est déchargé',
        'Fermer et sécuriser le camion',
        'Se présenter à l\'accueil pour départ',
        'Rendre badge visiteur si applicable',
        'Sortir par la voie indiquée'
      ]
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

      {/* Dashboard Chauffeurs en Temps Réel */}
      <div id="dashboard-chauffeurs-container" class="mb-8">
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
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              {process.checklist && (
                <button 
                  onclick={`showChecklist('${process.id}', ${JSON.stringify(process.checklist)})`}
                  class="gxo-btn bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 flex items-center"
                >
                  <i class="fas fa-list-check mr-2"></i>
                  Checklist interactive
                </button>
              )}
              
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

      {/* Checklist Modal Container */}
      <div id="modal-container" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div id="modal-content"></div>
        </div>
      </div>
      
      {/* Script Dashboard Temps Réel */}
      <script src="/static/accueil-chauffeur-dashboard.js"></script>
    </div>
  )
}
