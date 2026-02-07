export function ControleurPage() {
  const processes = [
    {
      id: 'controle-qualite',
      title: 'Contrôle qualité marchandises',
      icon: 'fa-search',
      duration: '20-30 min',
      level: '🟡',
      vigilance: ['Inspection visuelle', 'Vérifier température', 'Documenter anomalies'],
      checklist: [
        'Prélever échantillon selon procédure',
        'Inspecter visuellement la marchandise',
        'Vérifier conformité emballage',
        'Contrôler étiquetage produit',
        'Vérifier température si applicable',
        'Tester fonctionnalité si requis',
        'Documenter résultats contrôle',
        'Valider ou refuser lot'
      ]
    },
    {
      id: 'controle-quantitatif',
      title: 'Contrôle quantitatif',
      icon: 'fa-calculator',
      duration: '15-25 min',
      level: '🟢',
      vigilance: ['Recompter si doute', 'Vérifier unités', 'Noter écarts'],
      checklist: [
        'Comparer quantité BL vs physique',
        'Compter palettes reçues',
        'Vérifier nombre de colis par palette',
        'Contrôler unités par colis',
        'Recompter si écart détecté',
        'Noter tous les écarts',
        'Remplir formulaire contrôle',
        'Signer et dater le BL'
      ]
    },
    {
      id: 'controle-conformite',
      title: 'Contrôle de conformité produit',
      icon: 'fa-clipboard-check',
      duration: '25-35 min',
      level: '🔴',
      vigilance: ['Références exactes', 'Dates limite', 'Normes qualité'],
      checklist: [
        'Vérifier références produit vs commande',
        'Contrôler dates de péremption',
        'Vérifier numéros de lot',
        'Inspecter conditionnement',
        'Valider conformité réglementaire',
        'Vérifier certificats si requis',
        'Prendre photos si non-conformité',
        'Compléter rapport de contrôle'
      ]
    },
    {
      id: 'gestion-non-conformites',
      title: 'Gestion des non-conformités',
      icon: 'fa-times-circle',
      duration: '30-45 min',
      level: '🔴',
      vigilance: ['Isoler produits', 'Traçabilité', 'Notification rapide'],
      checklist: [
        'Identifier et isoler produits non-conformes',
        'Apposer étiquette de blocage',
        'Photographier non-conformité',
        'Remplir fiche de non-conformité',
        'Enregistrer dans système qualité',
        'Notifier responsable qualité',
        'Informer fournisseur',
        'Suivre traitement (retour, destruction, etc.)'
      ]
    },
    {
      id: 'audit-reception',
      title: 'Audit aléatoire réception',
      icon: 'fa-random',
      duration: '30-40 min',
      level: '🟡',
      vigilance: ['Sélection aléatoire', 'Objectivité', 'Reporting précis'],
      checklist: [
        'Sélectionner aléatoirement réceptions',
        'Vérifier traçabilité complète',
        'Contrôler documentation',
        'Auditer conformité process',
        'Vérifier étiquetage et stockage',
        'Interviewer agents de quai',
        'Documenter observations',
        'Rédiger rapport d\'audit'
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 p-4 rounded-full">
              <i class="fas fa-user-check text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Contrôleur Qualité</h1>
              <p class="text-xl opacity-90">Contrôle et conformité réception</p>
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
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-green-500">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class={`fas ${process.icon} text-2xl text-green-600`}></i>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{process.title}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span class="flex items-center">
                      <i class="fas fa-clock mr-2 text-green-500"></i>
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
                  class="gxo-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 flex items-center"
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
