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
      description: 'Ce document de procédure EWM décrit en détail tous les processus de réception des marchandises au DC : enregistrement trucks, aiguillage vers quais, réception et inspection physique, enregistrement système, signalement/résolution des écarts, et présentation du flux marchandises.'
    },
    {
      id: 'reception-standard',
      title: 'Réception palette fournisseur',
      icon: 'fa-truck-loading',
      duration: '15-20 min',
      level: '🟢',
      vigilance: ['Vérifier état emballage', 'Scanner BL complet', 'Contrôle quantité'],
      document: 'Assigner camion à quai-2.docx',
      checklist: [
        'Vérifier BL du fournisseur (quantité, références)',
        'Inspecter visuellement l\'état de l\'emballage',
        'Scanner le code-barres du BL',
        'Contrôler le nombre de palettes reçues',
        'Vérifier la température si produits frais',
        'Apposer étiquette si nécessaire',
        'Ranger la palette en zone appropriée',
        'Clôturer la réception dans le système'
      ]
    },
    {
      id: 'dechargement',
      title: 'Déchargement camion',
      icon: 'fa-dolly-flatbed',
      duration: '30-45 min',
      level: '🟢',
      vigilance: ['Sécurité chauffeur', 'Respect zone déchargement', 'Vérifier température si requis'],
      document: 'Assigner camion à quai-2.docx',
      checklist: [
        'Vérifier l\'assignation du camion au quai',
        'Sécuriser la zone (calles, signalisation)',
        'Briefing sécurité avec le chauffeur',
        'Ouvrir les portes du camion',
        'Inspecter visuellement le chargement',
        'Décharger palette par palette avec chariot',
        'Vérifier chaque palette (état, quantité)',
        'Ranger les palettes en zone dédiée',
        'Faire signer le BL au chauffeur',
        'Libérer le quai et fermer la porte'
      ]
    },
    {
      id: 'cloture-livraison',
      title: 'Clôture livraison',
      icon: 'fa-check-circle',
      duration: '5-10 min',
      level: '🟡',
      vigilance: ['Vérifier ASN', 'Statut NOT STARTED → COMPLETED', 'Récupérer TU'],
      document: 'cloture livraison new.docx',
      checklist: [
        'Ouvrir EWM et accéder à l\'ASN',
        'Vérifier le statut de la livraison (NOT STARTED)',
        'Passer le statut à COMPLETED',
        'Récupérer le numéro TU généré',
        'Vérifier les HU associés au TU',
        'Contrôler les quantités',
        'Valider la clôture',
        'Imprimer étiquette TU si nécessaire'
      ]
    },
    {
      id: 'cloture-tu',
      title: 'Clôture TU actif',
      icon: 'fa-clipboard-check',
      duration: '10-15 min',
      level: '🟡',
      vigilance: ['Filtrer date J-1', 'Exclure date du jour', 'Vérifier articles, HU et statut'],
      document: 'Cloture TU actif.docx',
      checklist: [
        'Accéder à MON → Transport Unit Overview',
        'Filtrer par date J-1 (exclure date du jour)',
        'Identifier les TU en statut "Active"',
        'Vérifier les articles associés',
        'Vérifier les HU (Handling Units)',
        'Vérifier le statut de chaque TU',
        'Action : Unload + Finish unloading',
        'Alternative : Arrival + Departure',
        'Valider la clôture',
        'Vérifier que le statut passe à "Completed"'
      ]
    },
    {
      id: 'creer-tu',
      title: 'Créer TU',
      icon: 'fa-plus-circle',
      duration: '5 min',
      level: '🟢',
      vigilance: ['Numéro de document ou ERP', 'Vérifier zone destination'],
      document: 'Créer TU.docx',
      checklist: [
        'Récupérer le numéro de document ou ERP',
        'Accéder à la transaction de création TU',
        'Saisir le numéro de document',
        'Sélectionner la zone de destination',
        'Vérifier les articles à inclure',
        'Valider la création du TU',
        'Noter le numéro TU généré',
        'Imprimer l\'étiquette TU'
      ]
    },
    {
      id: 'verification-dossier',
      title: 'Vérification dossier après contrôle',
      icon: 'fa-folder-open',
      duration: '10-15 min',
      level: '🔴',
      vigilance: ['Vérifier manco/surplus', 'Comparer avec BL', 'Déclarer surplus sous 48h'],
      document: 'Verification dossier aprés control.docx',
      checklist: [
        'Récupérer le BL et le dossier de réception',
        'Comparer les quantités BL vs réception physique',
        'Identifier les mancos (manquants)',
        'Identifier les surplus (excédents)',
        'Si surplus : créer fichier GDS pour re-contrôle',
        'Si manco : signaler à Invoice Moissy sous 48h',
        'Prendre des photos si nécessaire',
        'Remplir le rapport d\'écart',
        'Informer le chef d\'équipe',
        'Archiver le dossier complété'
      ]
    },
    {
      id: 'etiquette',
      title: 'Rééditer une étiquette',
      icon: 'fa-barcode',
      duration: '2-3 min',
      level: '🟢',
      vigilance: ['Récupérer HU correct', 'Vérifier imprimante', 'Contrôler impression'],
      document: 'Réediter une étiquette.docx',
      checklist: [
        'Récupérer le numéro HU (Handling Unit)',
        'Accéder à la transaction MON',
        'Rechercher le HU dans le système',
        'Vérifier les informations du HU',
        'Sélectionner l\'option "Imprimer étiquette"',
        'Choisir l\'imprimante (contrôleur ou bureau)',
        'Lancer l\'impression',
        'Contrôler la qualité de l\'étiquette imprimée',
        'Apposer l\'étiquette sur la palette'
      ]
    },
    {
      id: 'fermer-quai',
      title: 'Fermer une porte de quai',
      icon: 'fa-door-closed',
      duration: '2 min',
      level: '🟢',
      vigilance: ['Vérifier absence camion', 'RFUI transaction'],
      document: 'Fermer une porte de quai.docx',
      checklist: [
        'Vérifier l\'absence de camion au quai',
        'Vérifier que toutes les palettes sont déchargées',
        'Fermer les portes du quai',
        'Accéder à la transaction RFUI',
        'Saisir le numéro de quai',
        'Sélectionner l\'action "Fermer quai"',
        'Valider la fermeture',
        'Vérifier le statut "Quai fermé" dans le système'
      ]
    },
    {
      id: 'etetage-container',
      title: 'Étêtage et container',
      icon: 'fa-file-excel',
      duration: '20-30 min',
      level: '🔴',
      vigilance: ['Filtrer containers uniquement', 'Trier par date appointment', 'Export Excel'],
      document: 'Mettre en forme et renseigner le fichier étêtage et container.docx',
      checklist: [
        'Ouvrir le fichier modèle "Étêtage et container"',
        'Accéder au portail Action',
        'Filtrer les containers uniquement (exclure palettes)',
        'Trier par date d\'appointment',
        'Exporter les données en Excel',
        'Copier les données dans le fichier modèle',
        'Mettre en forme (couleurs, bordures)',
        'Vérifier les informations (quantités, dates)',
        'Ajouter commentaires si nécessaire',
        'Enregistrer et partager avec le chef d\'équipe'
      ]
    },
    {
      id: 'charger-batterie',
      title: 'Changement / Charge batterie',
      icon: 'fa-battery-three-quarters',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Sécurité électrique', 'Niveau charge > 20%', 'Brancher correctement'],
      checklist: [
        'Surveiller le niveau de batterie du chariot',
        'Si niveau < 20% → aller à la zone de charge',
        'Stationner le chariot sur zone de charge',
        'Couper le contact du chariot',
        'Ouvrir le compartiment batterie',
        'Débrancher les câbles (respecter l\'ordre)',
        'Soulever la batterie avec le palan',
        'Installer la batterie chargée',
        'Brancher les câbles (respecter polarité)',
        'Vérifier le voyant de charge',
        'Refermer le compartiment',
        'Tester le chariot'
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-truck-loading mr-3"></i>
              Réception
            </h1>
            <p class="text-xl opacity-90">
              Réception marchandises, contrôle BL, déchargement
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
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
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

              {/* Actions */}
              <div class="flex flex-wrap gap-2 mt-4">
                {process.checklist ? (
                  <button 
                    onclick={`showChecklistInteractive('${process.id}', ${JSON.stringify(process.checklist)})`}
                    class="gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center"
                  >
                    <i class="fas fa-list-check mr-2"></i>
                    Checklist interactive
                  </button>
                ) : (
                  <button 
                    onclick={`showChecklist('${process.id}')`}
                    class="gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center"
                  >
                    <i class="fas fa-list-check mr-2"></i>
                    Checklist
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
                
                <button 
                  onclick="showDecisionTree('root')"
                  class="gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center"
                >
                  <i class="fas fa-sitemap mr-2"></i>
                  Que faire si...
                </button>
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
