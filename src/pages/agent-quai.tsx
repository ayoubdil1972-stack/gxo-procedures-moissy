export function AgentQuaiPage() {
  const processes = [
    {
      id: 'accueil-camion',
      title: 'Accueil camion et préparation quai',
      icon: 'fa-hand-paper',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Vérifier assignation', 'Sécuriser zone', 'Briefing chauffeur'],
      checklist: [
        'Vérifier assignation camion/quai dans système',
        'Guider le camion jusqu\'au quai',
        'Installer calles de sécurité',
        'Sécuriser la zone de déchargement',
        'Briefing sécurité avec le chauffeur',
        'Vérifier documents transport',
        'Noter heure d\'arrivée',
        'Autoriser ouverture portes'
      ]
    },
    {
      id: 'dechargement-quai',
      title: 'Déchargement et contrôle',
      icon: 'fa-dolly-flatbed',
      duration: '30-60 min',
      level: '🟢',
      vigilance: ['Respect sécurité', 'Vérifier palettes', 'Noter anomalies'],
      checklist: [
        'Inspecter visuellement le chargement',
        'Décharger palette par palette',
        'Vérifier état de chaque palette',
        'Scanner code-barres BL',
        'Compter quantités physiques',
        'Noter tout écart ou dommage',
        'Ranger palettes en zone dédiée',
        'Photographier anomalies',
        'Faire signer BL au chauffeur'
      ]
    },
    {
      id: 'verification-conformite-quai',
      title: 'Vérification conformité',
      icon: 'fa-check-double',
      duration: '15-20 min',
      level: '🟡',
      vigilance: ['BL vs physique', 'Références correctes', 'Températures'],
      checklist: [
        'Comparer BL avec marchandises reçues',
        'Vérifier références produits',
        'Contrôler nombre de palettes',
        'Vérifier emballages non endommagés',
        'Contrôler température si produits frais',
        'Vérifier dates de péremption visibles',
        'Signaler écarts à l\'administrateur',
        'Remplir formulaire réception'
      ]
    },
    {
      id: 'rangement-palettes',
      title: 'Rangement et étiquetage',
      icon: 'fa-warehouse',
      duration: '15-20 min',
      level: '🟢',
      vigilance: ['Zone appropriée', 'Étiquettes claires', 'Stabilité palettes'],
      checklist: [
        'Identifier zone de rangement appropriée',
        'Vérifier stabilité des palettes',
        'Apposer étiquettes réception',
        'Scanner code-barres emplacement',
        'Ranger palettes de manière sécurisée',
        'Respecter hauteurs maximales',
        'Laisser allées de circulation dégagées',
        'Mettre à jour système de localisation'
      ]
    },
    {
      id: 'cloture-quai',
      title: 'Clôture quai et libération',
      icon: 'fa-door-closed',
      duration: '10 min',
      level: '🟢',
      vigilance: ['Documents complets', 'Zone propre', 'Quai libre'],
      checklist: [
        'Vérifier que tout est déchargé',
        'Récupérer tous les documents signés',
        'Retirer calles de sécurité',
        'Fermer porte du quai',
        'Nettoyer zone si nécessaire',
        'Remettre documents à l\'administrateur',
        'Libérer le quai dans le système',
        'Noter heure de départ'
      ]
    },
    {
      id: 'gestion-urgences-quai',
      title: 'Gestion des situations d\'urgence',
      icon: 'fa-ambulance',
      duration: 'Variable',
      level: '🔴',
      vigilance: ['Sécurité prioritaire', 'Alerter secours', 'Évacuer zone'],
      checklist: [
        'Arrêter immédiatement opérations',
        'Sécuriser la zone',
        'Alerter secours si nécessaire (18 / 112)',
        'Prévenir responsable exploitation',
        'Évacuer personnel si danger',
        'Ne pas déplacer blessé sans formation',
        'Utiliser extincteur si petit feu',
        'Rédiger rapport d\'incident'
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 p-4 rounded-full">
              <i class="fas fa-hard-hat text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Agent de Quai</h1>
              <p class="text-xl opacity-90">Opérations de déchargement et contrôle</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-5xl font-bold">{processes.length}</div>
            <div class="text-sm opacity-75">Procédures</div>
          </div>
        </div>
      </div>

      {/* Processes Grid */}
      <div class="grid grid-cols-1 gap-6">
        {processes.map((process) => (
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-yellow-500">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <i class={`fas ${process.icon} text-2xl text-yellow-600`}></i>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{process.title}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span class="flex items-center">
                      <i class="fas fa-clock mr-2 text-yellow-500"></i>
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
                  onclick={`showChecklist('${process.id}')`}
                  class="gxo-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 flex items-center"
                >
                  <i class="fas fa-list-check mr-2"></i>
                  Checklist
                </button>
              )}
            </div>

            {/* Hidden checklist data */}
            {process.checklist && (
              <div id={`checklist-${process.id}`} class="hidden">
                {JSON.stringify(process.checklist)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Checklist Modal Container */}
      <div id="modal-container" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div id="modal-content"></div>
        </div>
      </div>
    </div>
  )
}
