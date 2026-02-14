export function AdministrateurPage() {
  const processes = [
    {
      id: 'gestion-asn',
      title: 'Gestion des ASN (Advanced Shipping Notice)',
      icon: 'fa-file-alt',
      duration: '10-15 min',
      level: '🟡',
      vigilance: ['Vérifier données fournisseur', 'Contrôler références', 'Valider quantités'],
      checklist: [
        'Ouvrir EWM et accéder module ASN',
        'Vérifier la réception de l\'ASN',
        'Contrôler les informations fournisseur',
        'Valider les références produits',
        'Vérifier les quantités annoncées',
        'Assigner au quai approprié',
        'Créer TU si nécessaire',
        'Notifier équipe de réception'
      ]
    },
    {
      id: 'cloture-livraison-admin',
      title: 'Clôture administrative livraison',
      icon: 'fa-clipboard-check',
      duration: '15-20 min',
      level: '🟡',
      vigilance: ['Rapprocher BL physique et système', 'Gérer écarts', 'Archiver documents'],
      checklist: [
        'Récupérer BL signé de l\'agent de quai',
        'Vérifier signature chauffeur',
        'Rapprocher avec ASN dans EWM',
        'Traiter les écarts si présents',
        'Valider la clôture dans le système',
        'Scanner et archiver le BL',
        'Mettre à jour le statut livraison',
        'Envoyer notification fournisseur'
      ]
    },
    {
      id: 'gestion-ecarts',
      title: 'Gestion des écarts de livraison',
      icon: 'fa-exclamation-triangle',
      duration: '20-30 min',
      level: '🔴',
      vigilance: ['Documenter précisément', 'Photos si dommages', 'Notification rapide'],
      checklist: [
        'Identifier la nature de l\'écart',
        'Prendre photos si dommages visibles',
        'Remplir formulaire écart dans EWM',
        'Indiquer quantités exactes',
        'Contacter fournisseur si nécessaire',
        'Créer ticket litige',
        'Informer responsable exploitation',
        'Suivre résolution écart'
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting et suivi activité',
      icon: 'fa-chart-line',
      duration: '30-45 min',
      level: '🟢',
      vigilance: ['Données à jour', 'Respect délais', 'Indicateurs précis'],
      checklist: [
        'Extraire données EWM journalières',
        'Compiler nombre de livraisons',
        'Calculer taux d\'écarts',
        'Vérifier respect délais déchargement',
        'Préparer rapport quotidien',
        'Envoyer au responsable exploitation',
        'Archiver rapports',
        'Préparer tableau de bord hebdomadaire'
      ]
    },
    {
      id: 'gestion-documents',
      title: 'Gestion documentaire',
      icon: 'fa-folder-open',
      duration: '15-20 min',
      level: '🟢',
      vigilance: ['Classement correct', 'Numérisation qualité', 'Archivage sécurisé'],
      checklist: [
        'Scanner tous les BL de la journée',
        'Vérifier qualité numérisation',
        'Nommer fichiers selon nomenclature',
        'Classer dans arborescence réseau',
        'Archiver documents papier',
        'Mettre à jour registre livraisons',
        'Vérifier accessibilité documents',
        'Purger anciens documents selon règles'
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 p-4 rounded-full">
              <i class="fas fa-user-tie text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Administrateur Réception</h1>
              <p class="text-xl opacity-90">Gestion administrative et suivi</p>
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
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-purple-500">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class={`fas ${process.icon} text-2xl text-purple-600`}></i>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{process.title}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span class="flex items-center">
                      <i class="fas fa-clock mr-2 text-purple-500"></i>
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
                  onclick={`showChecklistInteractive('${process.id}', ${JSON.stringify(process.checklist)})`}
                  class="gxo-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 flex items-center"
                >
                  <i class="fas fa-list-check mr-2"></i>
                  Checklist interactive
                </button>
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
    </div>
  )
}
