export function ReceptionPage() {
  const processes = [
    {
      id: 'ewm-goods-receipt-manuel',
      title: 'Manuel EWM Goods Receipt (Référence Complète)',
      icon: 'fa-book',
      duration: 'Manuel de référence',
      level: '🔴',
      vigilance: [
        'Document de procédure complet EWM', 
        'Enregistrement des trucks entrants',
        'Inspection physique des marchandises',
        'Gestion des écarts de livraison',
        'Processus de contrôle qualité',
        'Flux administratif et physique'
      ],
      document: 'EWM Procedure document - 01. Goods Receipt - FR.pdf',
      documentPath: '/static/documents',
      description: 'Ce document de procédure EWM décrit en détail tous les processus de réception des marchandises au DC : enregistrement trucks, aiguillage vers quais, réception et inspection physique, enregistrement système, signalement/résolution des écarts, et présentation du flux marchandises.'
    },
    {
      id: 'creation-tu',
      title: 'Création TU',
      icon: 'fa-plus-circle',
      duration: '5-10 min',
      level: '🟢',
      vigilance: [
        'Créer une Transportation Unit dans Process TU et y rattacher une livraison'
      ],
      document: '01_Creation_TU.pdf',
      documentPath: '/procedures',
      description: 'Créer une Transportation Unit dans Process TU et y rattacher une livraison'
    },
    {
      id: 'assigner-camion-quai',
      title: 'Assigner Camion à Quai',
      icon: 'fa-truck-loading',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Retrouver le dossier du camion, identifier la TU et l\'affecter au bon quai'
      ],
      document: '02_Assigner_Camion_Quai.pdf',
      documentPath: '/procedures',
      description: 'Retrouver le dossier du camion, identifier la TU et l\'affecter au bon quai'
    },
    {
      id: 'mode-operatoire-accueil',
      title: 'Mode Opératoire Synthétique',
      icon: 'fa-list-check',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Lecture rapide du flux accueil chauffeur - Points clés à mémoriser'
      ],
      document: '03_Mode_Operatoire_Accueil.pdf',
      documentPath: '/procedures',
      description: 'Lecture rapide du flux accueil chauffeur - Points clés à mémoriser'
    },
    {
      id: 'process-scan',
      title: 'Process Scan',
      icon: 'fa-barcode',
      duration: '2-3 min',
      level: '🟢',
      vigilance: [
        'Allumer le scan, s\'identifier et connecter l\'imprimante'
      ],
      document: '04_Process_Scan.pdf',
      documentPath: '/procedures',
      description: 'Allumer le scan, s\'identifier et connecter l\'imprimante'
    },
    {
      id: 'traitement-anomalie',
      title: 'Traitement d\'une Anomalie',
      icon: 'fa-exclamation-triangle',
      duration: '10-15 min',
      level: '🟡',
      vigilance: [
        'Utiliser le formulaire Teams pour signaler un problème'
      ],
      document: '05_Traitement_Anomalie.pdf',
      documentPath: '/procedures',
      description: 'Utiliser le formulaire Teams pour signaler un problème'
    },
    {
      id: 'dlc-courte-abrand',
      title: 'DLC Courte Abrand Crossdock',
      icon: 'fa-calendar-times',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Traiter une palette avec DLC courte et tracer la modification'
      ],
      document: '06_DLC_Courte_Abrand.pdf',
      documentPath: '/procedures',
      description: 'Traiter une palette avec DLC courte et tracer la modification'
    },
    {
      id: 'etiquettes-rouges',
      title: 'Étiquettes Rouges - Traçabilité',
      icon: 'fa-tag',
      duration: '5 min',
      level: '🟡',
      vigilance: [
        'Renseigner et tracer les anomalies avec étiquettes rouges'
      ],
      document: '07_Etiquettes_Rouges.pdf',
      documentPath: '/procedures',
      description: 'Renseigner et tracer les anomalies avec étiquettes rouges'
    },
    {
      id: 'mode-operatoire-controleur',
      title: 'Mode Opératoire Synthétique',
      icon: 'fa-list-check',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Lecture rapide du flux terrain contrôleur'
      ],
      document: '08_Mode_Operatoire_Controleur.pdf',
      documentPath: '/procedures',
      description: 'Lecture rapide du flux terrain contrôleur'
    },
    {
      id: 'anomalie-order-planning',
      title: 'Anomalie et Order Planning',
      icon: 'fa-clipboard-list',
      duration: '5-10 min',
      level: '🟡',
      vigilance: [
        'Gérer les anomalies dans l\'Order Planning système'
      ],
      document: '35_Anomalie_Order_Planning.pdf',
      documentPath: '/procedures',
      description: 'Gérer les anomalies dans l\'Order Planning système'
    },
    {
      id: 'accueil-camion-controleur',
      title: 'Accueil Camion',
      icon: 'fa-handshake',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Accueillir le chauffeur, vérifier documents et identifier anomalies'
      ],
      document: '09_Accueil_Camion.pdf',
      documentPath: '/procedures',
      description: 'Accueillir le chauffeur, vérifier documents et identifier anomalies'
    },
    {
      id: 'dechargement-controle',
      title: 'Déchargement et Contrôle',
      icon: 'fa-truck-loading',
      duration: '20-30 min',
      level: '🟡',
      vigilance: [
        'Superviser le déchargement et effectuer les contrôles terrain'
      ],
      document: '10_Dechargement_Controle.pdf',
      documentPath: '/procedures',
      description: 'Superviser le déchargement et effectuer les contrôles terrain'
    },
    {
      id: 'verification-conformite',
      title: 'Vérification de Conformité',
      icon: 'fa-clipboard-check',
      duration: '15 min',
      level: '🟡',
      vigilance: [
        'Vérifier la conformité physique et documentaire de la réception'
      ],
      document: '11_Verification_Conformite.pdf',
      documentPath: '/procedures',
      description: 'Vérifier la conformité physique et documentaire de la réception'
    },
    {
      id: 'mode-operatoire-agent',
      title: 'Mode Opératoire Synthétique',
      icon: 'fa-list-check',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Lecture rapide du flux agent de quai - Points essentiels'
      ],
      document: '12_Mode_Operatoire_Agent.pdf',
      documentPath: '/procedures',
      description: 'Lecture rapide du flux agent de quai - Points essentiels'
    },
    {
      id: 'chef-equipe-reception',
      title: 'Chef Équipe Réception',
      icon: 'fa-users',
      duration: 'Référence',
      level: '🔴',
      vigilance: [
        'Responsabilités et missions du chef d\'équipe réception'
      ],
      document: '13_Chef_Equipe_Reception.pdf',
      documentPath: '/procedures',
      description: 'Responsabilités et missions du chef d\'équipe réception'
    },
    {
      id: 'pilotage-quotidien',
      title: 'Pilotage Quotidien',
      icon: 'fa-tachometer-alt',
      duration: '30 min',
      level: '🔴',
      vigilance: [
        'Piloter l\'activité quotidienne et suivre les KPIs'
      ],
      document: '14_Pilotage_Quotidien.pdf',
      documentPath: '/procedures',
      description: 'Piloter l\'activité quotidienne et suivre les KPIs'
    },
    {
      id: 'supervision-terrain',
      title: 'Supervision Terrain',
      icon: 'fa-binoculars',
      duration: 'Continu',
      level: '🟡',
      vigilance: [
        'Superviser les opérations terrain et manager les équipes'
      ],
      document: '15_Supervision_Terrain.pdf',
      documentPath: '/procedures',
      description: 'Superviser les opérations terrain et manager les équipes'
    },
    {
      id: 'gestion-ecarts',
      title: 'Gestion des Écarts',
      icon: 'fa-chart-line',
      duration: '15-20 min',
      level: '🔴',
      vigilance: [
        'Analyser et traiter les écarts de réception'
      ],
      document: '16_Gestion_Ecarts.pdf',
      documentPath: '/procedures',
      description: 'Analyser et traiter les écarts de réception'
    },
    {
      id: 'controles-eop',
      title: 'Contrôles EOP',
      icon: 'fa-check-double',
      duration: '30-45 min',
      level: '🟡',
      vigilance: [
        'Effectuer les contrôles End of Period (fin de période)'
      ],
      document: '17_Controles_EOP.pdf',
      documentPath: '/procedures',
      description: 'Effectuer les contrôles End of Period (fin de période)'
    },
    {
      id: 'flux-hazardous-analyse',
      title: 'Flux Hazardous - Analyse Détaillée',
      icon: 'fa-exclamation-circle',
      duration: '20 min',
      level: '🔴',
      vigilance: [
        'Analyse détaillée du flux matières dangereuses'
      ],
      document: '18_Flux_Hazardous_Analyse.pdf',
      documentPath: '/procedures',
      description: 'Analyse détaillée du flux matières dangereuses'
    },
    {
      id: 'flux-hazardous-checkpoint',
      title: 'Flux Hazardous - Checkpoint',
      icon: 'fa-radiation',
      duration: '15 min',
      level: '🔴',
      vigilance: [
        'Points de contrôle spécifiques pour matières dangereuses'
      ],
      document: '19_Flux_Hazardous_Checkpoint.pdf',
      documentPath: '/procedures',
      description: 'Points de contrôle spécifiques pour matières dangereuses'
    },
    {
      id: 'correction-etiquette-suppression',
      title: 'Correction Étiquette - Suppression',
      icon: 'fa-eraser',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Procédure pour supprimer une étiquette incorrecte'
      ],
      document: '20_Correction_Etiquette_Suppression.pdf',
      documentPath: '/procedures',
      description: 'Procédure pour supprimer une étiquette incorrecte'
    },
    {
      id: 'correction-etiquette-reedition',
      title: 'Correction Étiquette - Réédition',
      icon: 'fa-print',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Procédure pour rééditer une étiquette corrigée'
      ],
      document: '21_Correction_Etiquette_Reedition.pdf',
      documentPath: '/procedures',
      description: 'Procédure pour rééditer une étiquette corrigée'
    },
    {
      id: 'verification-dossier',
      title: 'Vérification Dossier',
      icon: 'fa-folder-open',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Vérifier la complétude et conformité du dossier de réception'
      ],
      document: '22_Verification_Dossier.pdf',
      documentPath: '/procedures',
      description: 'Vérifier la complétude et conformité du dossier de réception'
    },
    {
      id: 'fermer-porte-quai',
      title: 'Fermer Porte de Quai',
      icon: 'fa-door-closed',
      duration: '2 min',
      level: '🟢',
      vigilance: [
        'Procédure de fermeture sécurisée d\'un quai'
      ],
      document: '23_Fermer_Porte_Quai.pdf',
      documentPath: '/procedures',
      description: 'Procédure de fermeture sécurisée d\'un quai'
    },
    {
      id: 'cloture-livraisons',
      title: 'Clôture Livraisons',
      icon: 'fa-check-circle',
      duration: '5-10 min',
      level: '🟡',
      vigilance: [
        'Clôturer une livraison dans le système EWM'
      ],
      document: '24_Cloture_Livraisons.pdf',
      documentPath: '/procedures',
      description: 'Clôturer une livraison dans le système EWM'
    },
    {
      id: 'livraison-ouverte-eop',
      title: 'Livraison Ouverte EOP',
      icon: 'fa-box-open',
      duration: '10-15 min',
      level: '🟡',
      vigilance: [
        'Traiter les livraisons encore ouvertes en fin de période'
      ],
      document: '25_Livraison_Ouverte_EOP.pdf',
      documentPath: '/procedures',
      description: 'Traiter les livraisons encore ouvertes en fin de période'
    },
    {
      id: 'cloture-tu-actif',
      title: 'Clôture TU Actif',
      icon: 'fa-clipboard-check',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Clôturer les Transportation Units encore actifs'
      ],
      document: '26_Cloture_TU_Actif.pdf',
      documentPath: '/procedures',
      description: 'Clôturer les Transportation Units encore actifs'
    },
    {
      id: 'creer-packspec',
      title: 'Créer Packspec',
      icon: 'fa-cube',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Créer une spécification d\'emballage dans le système'
      ],
      document: '27_Creer_Packspec.pdf',
      documentPath: '/procedures',
      description: 'Créer une spécification d\'emballage dans le système'
    },
    {
      id: 'procedures-operationnelles',
      title: 'Procédures Opérationnelles',
      icon: 'fa-cogs',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Vue d\'ensemble des procédures opérationnelles standards'
      ],
      document: '28_Procedures_Operationnelles.pdf',
      documentPath: '/procedures',
      description: 'Vue d\'ensemble des procédures opérationnelles standards'
    },
    {
      id: 'taches-ouvertes',
      title: 'Tâches Ouvertes',
      icon: 'fa-tasks',
      duration: '15 min',
      level: '🟡',
      vigilance: [
        'Gérer et suivre les tâches ouvertes dans le système'
      ],
      document: '29_Taches_Ouvertes.pdf',
      documentPath: '/procedures',
      description: 'Gérer et suivre les tâches ouvertes dans le système'
    },
    {
      id: 'mouvement-adprod',
      title: 'Mouvement ADPROD',
      icon: 'fa-exchange-alt',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Créer un mouvement ADPROD pour ajustement de stock'
      ],
      document: '30_Mouvement_ADPROD.pdf',
      documentPath: '/procedures',
      description: 'Créer un mouvement ADPROD pour ajustement de stock'
    },
    {
      id: 'fichier-ecart-gds',
      title: 'Fichier Écart GDS',
      icon: 'fa-file-alt',
      duration: '15 min',
      level: '🔴',
      vigilance: [
        'Renseigner le fichier d\'écart GDS pour suivi qualité'
      ],
      document: '31_Fichier_Ecart_GDS.pdf',
      documentPath: '/procedures',
      description: 'Renseigner le fichier d\'écart GDS pour suivi qualité'
    },
    {
      id: 'retour-fournisseur',
      title: 'Retour Fournisseur',
      icon: 'fa-undo',
      duration: '20 min',
      level: '🔴',
      vigilance: [
        'Gérer un retour de marchandises vers le fournisseur'
      ],
      document: '32_Retour_Fournisseur.pdf',
      documentPath: '/procedures',
      description: 'Gérer un retour de marchandises vers le fournisseur'
    },
    {
      id: 'creation-conditionnement-prd',
      title: 'Création Conditionnement PRD',
      icon: 'fa-box',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Créer un conditionnement produit dans le système'
      ],
      document: '33_Creation_Conditionnement_PRD.pdf',
      documentPath: '/procedures',
      description: 'Créer un conditionnement produit dans le système'
    },
    {
      id: 'extraction-icpe',
      title: 'Extraction ICPE',
      icon: 'fa-database',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Extraire les données ICPE (Installations Classées)'
      ],
      document: '34_Extraction_ICPE.pdf',
      documentPath: '/procedures',
      description: 'Extraire les données ICPE (Installations Classées)'
    },
    {
      id: 'reception-ncg',
      title: 'Réception NCG',
      icon: 'fa-truck',
      duration: '15 min',
      level: '🟡',
      vigilance: [
        'Réception NCG pour flux hors normes ou non standardisés'
      ],
      document: '36_Reception_NCG.pdf',
      documentPath: '/procedures',
      description: 'Réception NCG pour flux hors normes ou non standardisés'
    },
    {
      id: 'fichier-etetage-admin',
      title: 'Fichier Étêtage et Container',
      icon: 'fa-file-excel',
      duration: '10 min',
      level: '🟢',
      vigilance: [
        'Mettre en forme et renseigner le fichier quotidien étêtage'
      ],
      document: '37_Fichier_Etetage_Container.pdf',
      documentPath: '/procedures',
      description: 'Mettre en forme et renseigner le fichier quotidien étêtage'
    },
    {
      id: 'chronogramme-journalier',
      title: 'Chronogramme Journalier',
      icon: 'fa-calendar-day',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Planning type d\'une journée de réception - horaires et jalons'
      ],
      document: '38_Chronogramme_Journalier.pdf',
      documentPath: '/procedures',
      description: 'Planning type d\'une journée de réception - horaires et jalons'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-truck-loading mr-3"></i>
              Réception - GXO Procédures
            </h1>
            <p class="text-xl opacity-90">
              Manuel EWM + 38 procédures GXO opérationnelles
            </p>
          </div>
          <a href="/" class="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Légende niveaux */}
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          <i class="fas fa-info-circle mr-2 text-orange-500"></i>
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
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
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

              {/* Description */}
              {process.description && (
                <div class="mb-4 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                  {process.description}
                </div>
              )}

              {/* Actions */}
              <div class="flex flex-wrap gap-2 mt-4">
                {process.document && (
                  <a 
                    href={`${process.documentPath || '/procedures'}/${process.document}`}
                    target="_blank"
                    class="gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center"
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
