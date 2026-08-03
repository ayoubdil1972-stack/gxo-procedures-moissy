export function AdministrateurPage() {
  const processes = [
    {
      id: 'taches-ouvertes',
      title: 'Tâches Ouvertes 9010/9015 et Analyse 9030',
      icon: 'fa-tasks',
      duration: '20-30 min',
      level: '🟡',
      vigilance: [
        'Contrôle administratif quotidien',
        'Vérifier les tâches End of Period',
        'Analyser les 9030'
      ],
      document: '29_Taches_Ouvertes.pdf',
      description: 'Contrôle administratif quotidien et End of Period'
    },
    {
      id: 'mouvement-adprod',
      title: 'Mouvement ADPROD',
      icon: 'fa-exchange-alt',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Remettre un article 9030 sans HU dans le bon flux',
        'Vérifier le statut ADPROD',
        'Corriger le flux'
      ],
      document: '30_Mouvement_ADPROD.pdf',
      description: 'Remettre un article 9030 sans HU dans le bon flux'
    },
    {
      id: 'fichier-ecart-gds',
      title: 'Fichier Écart GDS',
      icon: 'fa-file-excel',
      duration: '15-20 min',
      level: '🟡',
      vigilance: [
        'Vérifier dans SAP si l\'écart est valide avant GDS',
        'Analyser les écarts',
        'Préparer le fichier GDS'
      ],
      document: '31_Fichier_Ecart_GDS.pdf',
      description: 'Vérifier dans SAP si l\'écart est valide avant GDS'
    },
    {
      id: 'retour-fournisseur',
      title: 'Retour Fournisseur',
      icon: 'fa-undo',
      duration: '20 min',
      level: '🟡',
      vigilance: [
        'Renvoyer marchandise au fournisseur après erreur',
        'Préparer les documents',
        'Tracer le retour'
      ],
      document: '32_Retour_Fournisseur.pdf',
      description: 'Renvoyer marchandise au fournisseur après erreur'
    },
    {
      id: 'creation-conditionnement-prd',
      title: 'Création Conditionnement PRD',
      icon: 'fa-cube',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Créer un nouveau conditionnement PRD dans SAP',
        'Vérifier les données techniques',
        'Valider dans le système'
      ],
      document: '33_Creation_Conditionnement_PRD.pdf',
      description: 'Créer un nouveau conditionnement PRD dans SAP'
    },
    {
      id: 'extraction-icpe',
      title: 'Extraction ICPE',
      icon: 'fa-database',
      duration: '30 min',
      level: '🔴',
      vigilance: [
        'Contrôler le volume ICPE',
        'Enrichir les données',
        'Générer le rapport'
      ],
      document: '34_Extraction_ICPE.pdf',
      description: 'Contrôler le volume ICPE et enrichir les données'
    },
    {
      id: 'chronogramme-journalier',
      title: 'Chronogramme Journalier - Procédures Administratives',
      icon: 'fa-clock',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Frise chronologique des tâches administratives quotidiennes',
        'Planning de référence',
        'Rythme quotidien'
      ],
      document: '38_Chronogramme_Journalier.pdf',
      description: 'Frise chronologique des tâches administratives quotidiennes'
    },
    {
      id: 'anomalie-order-planning-admin',
      title: 'Anomalie et Order Planning',
      icon: 'fa-clipboard-list',
      duration: '15-20 min',
      level: '🟡',
      vigilance: [
        'Traiter un écart de livraison',
        'Gérer les manquants',
        'Quantités incohérentes'
      ],
      document: '35_Anomalie_Order_Planning.pdf',
      description: 'Traiter un écart de livraison (manquant, quantité incohérente)'
    },
    {
      id: 'reception-ncg-admin',
      title: 'Réception NCG',
      icon: 'fa-box-open',
      duration: '20-30 min',
      level: '🔴',
      vigilance: [
        'Réception pour flux hors normes',
        'Flux non standardisés',
        'Procédure spécifique NCG'
      ],
      document: '36_Reception_NCG.pdf',
      description: 'Réception NCG pour flux hors normes ou non standardisés'
    },
    {
      id: 'fichier-etetage-admin',
      title: 'Fichier Étêtage et Container',
      icon: 'fa-file-excel',
      duration: '10 min',
      level: '🟢',
      vigilance: [
        'Mettre en forme le fichier quotidien',
        'Renseigner les données étêtage',
        'Vérifier les containers'
      ],
      document: '37_Fichier_Etetage_Container.pdf',
      description: 'Mettre en forme et renseigner le fichier quotidien étêtage'
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

      {/* GXO-Procédures Section */}
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-xl p-6 mb-6">
        <h2 class="text-3xl font-bold flex items-center">
          <i class="fas fa-file-alt mr-3"></i>
          GXO-Procédures Administrateur
        </h2>
        <p class="text-lg opacity-90 mt-2">
          {processes.length} procédures opérationnelles détaillées (dont 3 procédures partagées avec Contrôleur)
        </p>
      </div>

      {/* Process Cards - Format Reception.tsx */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
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
                  <i class="fas fa-exclamation-triangle text-purple-500 mr-2"></i>
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
                    class="gxo-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 flex items-center"
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
  )
}
