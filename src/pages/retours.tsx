export function RetoursPage() {
  const processes = [
    {
      id: 'rappel-contenants',
      title: 'Rappel petits contenants PAPREC/BIONERVAL',
      icon: 'fa-recycle',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Contacter BIONERVAL pour palbox',
        'Vérifier planning collecte mardi',
        'Canettes avec biodéchets (pas RECYDIS)'
      ],
      document: 'Rappel des petits contenants installés par PAPREC ou BIONERVAL.docx',
      description: 'Collecte biodéchets (9 palboxs rouges) et déchets spéciaux (verre, céramique)',
      contacts: [
        'Medhi SEGHIR: 06 59 00 30 98 / 01 69 95 13 76',
        'Prescilla DELTON: prescilla.delton@saria.fr'
      ]
    },
    {
      id: 'cloture-livraison-retour',
      title: 'Clôture livraison retour',
      icon: 'fa-check-circle',
      duration: '3-5 min',
      level: '🟢',
      vigilance: [
        'Vérifier ASN sur portail',
        'Statut NOT STARTED avant reject',
        'TU doit être en planned'
      ],
      document: 'cloture livraison new.docx',
      checklist: [
        'Ouvrir livraison EOP',
        'Vérifier sur le portail avec l\'ASN',
        'Cliquer sur le document',
        'Page PRD s\'ouvre - livraison NOT STARTED',
        'Cliquer sur REJECT',
        'Livraison passe en COMPLETED',
        'Récupérer le TU',
        'Ouvrir transaction TU (statut PLANNED)',
        'Action → Checkpoint → Arrival + Save',
        'Action → Checkpoint → Departure + Save',
        'Statut TU passe en COMPLETED'
      ]
    },
    {
      id: 'procedure-transfert',
      title: 'Procédure transfert roll',
      icon: 'fa-exchange-alt',
      duration: '10-15 min',
      level: '🟡',
      vigilance: [
        'Scanner appareil RET_PICK_01',
        'Trouver le roll AVANT de continuer',
        'Alerter chef d\'équipe si roll introuvable'
      ],
      document: 'procédure transfert.docx',
      checklist: [
        '1ère étape: Accès menu TRM MANIPULATION',
        'Taper 1 + Enter (sélection TRM Manipulation)',
        'Scanner appareil RET_PICK_01',
        'Appuyer F1',
        'Taper 1 + Enter (sélection Movements)',
        'Taper 1 + Enter (confirmation Movements)',
        '2ème étape: Identification et édition étiquette',
        'Trouver le roll correspondant au numéro affiché',
        '⚠️ IMPÉRATIF: Trouver le roll avant de continuer',
        'Scanner l\'étiquette présente sur le roll',
        'Appuyer F1',
        'Suivre les instructions à l\'écran'
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-undo-alt mr-3"></i>
              Retours
            </h1>
            <p class="text-xl opacity-90">
              Gestion retours, collecte déchets, transferts
            </p>
          </div>
          <a href="/" class="bg-white text-yellow-600 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Légende niveaux */}
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          <i class="fas fa-info-circle mr-2 text-yellow-500"></i>
          Niveaux de complexité
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center">
            <span class="text-2xl mr-3">🟢</span>
            <div>
              <div class="font-semibold text-green-600">Niveau 1 - Essentiel</div>
              <div class="text-sm text-gray-600">Opérations de base quotidiennes</div>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-2xl mr-3">🟡</span>
            <div>
              <div class="font-semibold text-yellow-600">Niveau 2 - Standard</div>
              <div class="text-sm text-gray-600">Procédures intermédiaires</div>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-2xl mr-3">🔴</span>
            <div>
              <div class="font-semibold text-red-600">Niveau 3 - Avancé</div>
              <div class="text-sm text-gray-600">Cas complexes et rares</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Cards */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div class="flex flex-col items-center mr-4">
                      <i class={`fas ${process.icon} text-3xl mb-2`}></i>
                      {/* Système de notation étoiles */}
                      <div 
                        class="flex gap-1 cursor-pointer" 
                        onclick={`showReviewModal('${process.id}', '${process.title}')`}
                        title="Cliquez pour donner votre avis"
                      >
                        <span class="star-display text-yellow-300 hover:text-yellow-400 transition-colors" data-procedure-id={process.id}>
                          ☆☆☆☆☆
                        </span>
                      </div>
                      {/* Badge nombre d'avis */}
                      <div class="text-xs mt-1 opacity-75" data-procedure-rating={process.id}>
                        Pas encore noté
                      </div>
                    </div>
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
                <div class="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p class="text-sm text-gray-700">
                    <i class="fas fa-lightbulb mr-2 text-yellow-600"></i>
                    {process.description}
                  </p>
                </div>
              )}

              {/* Contacts */}
              {process.contacts && (
                <div class="mb-4">
                  <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                    <i class="fas fa-address-book text-yellow-500 mr-2"></i>
                    Contacts
                  </h4>
                  <ul class="space-y-1">
                    {process.contacts.map((contact) => (
                      <li class="text-sm text-gray-600 flex items-start">
                        <i class="fas fa-phone text-green-500 mr-2 mt-1"></i>
                        <span>{contact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Points de vigilance */}
              <div class="mb-4">
                <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                  <i class="fas fa-exclamation-triangle text-orange-500 mr-2"></i>
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
                {process.checklist ? (
                  <button 
                    onclick={`showChecklistInteractive('${process.id}', ${JSON.stringify(process.checklist)})`}
                    class="gxo-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 flex items-center"
                  >
                    <i class="fas fa-list-check mr-2"></i>
                    Checklist interactive
                  </button>
                ) : null}
                
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
