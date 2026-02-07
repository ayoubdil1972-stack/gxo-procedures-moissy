export function BibliothequePage() {
  const documents = [
    // Réception - 16 documents
    {
      id: 1,
      name: 'EWM Procédures Goods Receipt (Manuel Complet)',
      file: 'EWM Procedure document - 01. Goods Receipt - FR.pdf',
      category: 'Réception',
      type: 'pdf',
      description: 'Document de procédure EWM complet pour la réception des marchandises - Enregistrement trucks, inspection, contrôle qualité, flux marchandises',
      keywords: 'EWM, goods receipt, réception, trucks, quai, inspection, contrôle qualité, SAP, manuel, procédures complètes',
      level: '🔴'
    },
    {
      id: 3,
      name: 'Assigner camion à quai',
      file: 'Assigner camion à quai-2.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Procédure d\'assignation de camion aux quais de déchargement',
      keywords: 'camion, quai, assignation, réception',
      level: '🟢'
    },
    {
      id: 3,
      name: 'Clôture livraison',
      file: 'cloture livraison new.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Procédure de clôture de livraison dans le système',
      keywords: 'clôture, livraison, réception',
      level: '🟢'
    },
    {
      id: 3,
      name: 'Clôture TU actif',
      file: 'Cloture TU actif.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Clôture des unités de transport actives',
      keywords: 'TU, clôture, transport',
      level: '🟡'
    },
    {
      id: 34,
      name: 'Créer TU',
      file: 'Créer TU.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Création d\'une unité de transport dans SAP',
      keywords: 'TU, création, SAP',
      level: '🟢'
    },
    {
      id: 5,
      name: 'Fermer une porte de quai',
      file: 'Fermer une porte de quai.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Procédure de fermeture d\'une porte de quai',
      keywords: 'quai, porte, fermeture',
      level: '🟢'
    },
    {
      id: 6,
      name: 'Mail fournisseur',
      file: 'Mail fournisseur.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Modèle de communication avec les fournisseurs',
      keywords: 'mail, fournisseur, communication',
      level: '🟢'
    },
    {
      id: 7,
      name: 'Vérification dossier après contrôle',
      file: 'Verification dossier aprés control.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Vérification du dossier après contrôle qualité',
      keywords: 'vérification, contrôle, dossier',
      level: '🟡'
    },
    {
      id: 8,
      name: 'Fausses étiquettes',
      file: 'Fausses  étiquettes.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Procédure de gestion des fausses étiquettes',
      keywords: 'étiquettes, impression, réception',
      level: '🟢'
    },
    {
      id: 9,
      name: 'Fausses étiquettes date du jour',
      file: 'Fausses  étiquettes date du jour .docx',
      category: 'Réception',
      type: 'docx',
      description: 'Impression d\'étiquettes avec date du jour',
      keywords: 'étiquettes, date, impression',
      level: '🟢'
    },
    {
      id: 10,
      name: 'Rééditer une étiquette',
      file: 'Réediter une étiquette.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Réimpression d\'une étiquette existante',
      keywords: 'étiquette, réédition, impression',
      level: '🟢'
    },

    // IPL - 9 documents
    {
      id: 11,
      name: 'Affectation de tâche dans LTRMS',
      file: 'Affectation de tache a un cariste dans le LTRMS.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Affectation d\'une tâche à un cariste via LTRMS',
      keywords: 'LTRMS, tâche, affectation, cariste',
      level: '🟢'
    },
    {
      id: 12,
      name: 'Annuler une tâche affectée',
      file: 'Annuler une tache affecter.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Procédure d\'annulation d\'une tâche affectée',
      keywords: 'annulation, tâche, LTRMS',
      level: '🟡'
    },
    {
      id: 13,
      name: 'Connexion terminal',
      file: 'CONNECTION.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Connexion et déconnexion au terminal cariste',
      keywords: 'connexion, terminal, cariste',
      level: '🟢'
    },
    {
      id: 14,
      name: 'Priorisation de tâches LTRMS',
      file: 'Priorisation de taches dans le LTRMS.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Gestion des priorités de tâches dans LTRMS',
      keywords: 'priorisation, LTRMS, tâche',
      level: '🟡'
    },
    {
      id: 15,
      name: 'Sortir une tâche du LTRA',
      file: 'Sortir une tache du LTRA.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Extraction d\'une tâche du système LTRA',
      keywords: 'LTRA, tâche, extraction',
      level: '🟡'
    },
    {
      id: 16,
      name: 'Visualisation des stocks LS03N',
      file: 'Visualisation des stocks LS03N.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Consultation des stocks via transaction LS03N',
      keywords: 'LS03N, stocks, SAP',
      level: '🟢'
    },
    {
      id: 17,
      name: 'Relancer tâche cariste',
      file: 'relancer tache cariste.docx',
      category: 'IPL',
      type: 'docx',
      description: 'Relance d\'une tâche cariste bloquée',
      keywords: 'relance, tâche, cariste',
      level: '🟡'
    },
    {
      id: 18,
      name: 'Passation des anomalies',
      file: 'Passation des anomalies.xlsx',
      category: 'IPL',
      type: 'xlsx',
      description: 'Fichier de suivi des anomalies et passation',
      keywords: 'anomalies, passation, suivi',
      level: '🟡'
    },
    {
      id: 19,
      name: 'Workload planning',
      file: 'workload.xltm',
      category: 'IPL',
      type: 'xltm',
      description: 'Template Excel de planification de charge de travail',
      keywords: 'workload, planning, charge',
      level: '🟡'
    },

    // Préparation - 4 documents (RHM retiré car inexistant)
    {
      id: 20,
      name: 'Cartons vides Dernier Prélèvement',
      file: 'Cartons vides Dernier Prelevement_1.docx',
      category: 'Préparation',
      type: 'docx',
      description: 'Transaction LT24 - Dernier prélèvement',
      keywords: 'LT24, prélèvement, cartons',
      level: '🟢'
    },
    {
      id: 21,
      name: 'Écart premier/dernier prélèvement',
      file: 'Ecart premier dernier prélèvement_1.docx',
      category: 'Préparation',
      type: 'docx',
      description: 'Analyse des écarts de prélèvement',
      keywords: 'écart, prélèvement, analyse',
      level: '🟡'
    },
    {
      id: 22,
      name: 'Quai fictif - Affichage',
      file: 'Quai fictif - Affichage_1.docx',
      category: 'Préparation',
      type: 'docx',
      description: 'Localisation et utilisation du quai fictif 91A',
      keywords: 'quai fictif, affichage, zone',
      level: '🟢'
    },
    {
      id: 23,
      name: 'Process Monteur de Rolls',
      file: 'Process Monteur de Rolls.docx',
      category: 'Préparation',
      type: 'docx',
      description: 'Procédure de montage des rolls',
      keywords: 'rolls, montage, préparation',
      level: '🟢'
    },

    // Chef d'équipe - 5 documents
    {
      id: 24,
      name: 'Création conditionnement PRD',
      file: 'CREATION CONDITTIONNEMENT PRD .docx',
      category: 'Réception',
      type: 'docx',
      description: 'Création de conditionnement produit',
      keywords: 'conditionnement, PRD, création',
      level: '🟡'
    },
    {
      id: 26,
      name: 'Créer packspeck',
      file: 'Créer packspeck.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Création d\'un packspeck dans le système',
      keywords: 'packspeck, création, système',
      level: '🟡'
    },
    {
      id: 27,
      name: 'EOP checks',
      file: 'EOP checks.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Contrôles de fin de production (End Of Production)',
      keywords: 'EOP, contrôle, production',
      level: '🟢'
    },
    {
      id: 28,
      name: 'Extraction ICPE',
      file: 'EXTRACTION ICPE.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Extraction de données ICPE',
      keywords: 'ICPE, extraction, données',
      level: '🟡'
    },
    {
      id: 29,
      name: 'Étêtage et container',
      file: 'Mettre en forme et renseigner le fichier étêtage et container.docx',
      category: 'Réception',
      type: 'docx',
      description: 'Renseignement du fichier étêtage et container',
      keywords: 'étêtage, container, fichier',
      level: '🟡'
    },

    // Anomalies - 2 documents
    {
      id: 30,
      name: 'Retour fournisseur',
      file: 'RETOUR FOURNISSEUR.docx',
      category: 'Anomalies',
      type: 'docx',
      description: 'Procédure de retour marchandises au fournisseur',
      keywords: 'retour, fournisseur, marchandises',
      level: '🟡'
    },
    {
      id: 30,
      name: 'Decision tree produits cassés/expirés',
      file: '0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf',
      category: 'Anomalies',
      type: 'pdf',
      description: 'Arbre de décision pour produits cassés ou expirés',
      keywords: 'decision tree, cassés, expirés, anomalies',
      level: '🔴'
    },

    // Retours - 3 documents
    {
      id: 31,
      name: 'Rappel petits contenants PAPREC/BIONERVAL',
      file: 'Rappel des petits contenants installés par PAPREC ou BIONERVAL.docx',
      category: 'Retours',
      type: 'docx',
      description: 'Collecte biodéchets (9 palboxs rouges) et déchets spéciaux',
      keywords: 'PAPREC, BIONERVAL, biodéchets, palbox, collecte',
      level: '🟢'
    },
    {
      id: 32,
      name: 'Clôture livraison retour',
      file: 'cloture livraison new.docx',
      category: 'Retours',
      type: 'docx',
      description: 'Clôture de livraison retour via portail ASN',
      keywords: 'clôture, livraison, retour, ASN, reject',
      level: '🟢'
    },
    {
      id: 33,
      name: 'Procédure transfert roll',
      file: 'procédure transfert.docx',
      category: 'Retours',
      type: 'docx',
      description: 'Transfert de rolls via TRM Manipulation (RET_PICK_01)',
      keywords: 'transfert, roll, TRM, RET_PICK_01, manipulation',
      level: '🟡'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <i class="fas fa-folder-open text-5xl"></i>
            <div>
              <h1 class="text-4xl font-bold mb-2">
                Bibliothèque de Documents
              </h1>
              <p class="text-xl opacity-90">
                {documents.length} documents disponibles • Classés par rubrique
              </p>
            </div>
          </div>
          <a href="/" class="bg-white text-[#FF6B35] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex items-center space-x-4">
          <div class="flex-1 relative">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
            <input 
              type="text" 
              id="search-input"
              placeholder="Rechercher un document (nom, catégorie, mots-clés)..."
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none"
              onkeyup="filterDocuments()"
            />
          </div>
          <button 
            onclick="clearSearch()"
            class="bg-gray-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            <i class="fas fa-times mr-2"></i>Effacer
          </button>
        </div>

        {/* Filter Buttons */}
        <div class="mt-4 flex flex-wrap gap-2">
          <button 
            onclick="filterByCategory('all')"
            class="filter-btn bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
            data-category="all"
          >
            <i class="fas fa-th mr-2"></i>Tous ({documents.length})
          </button>
          <button 
            onclick="filterByCategory('Réception')"
            class="filter-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
            data-category="Réception"
          >
            <i class="fas fa-truck-loading mr-2"></i>Réception ({documents.filter(d => d.category === 'Réception').length})
          </button>
          <button 
            onclick="filterByCategory('IPL')"
            class="filter-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
            data-category="IPL"
          >
            <i class="fas fa-forklift mr-2"></i>IPL ({documents.filter(d => d.category === 'IPL').length})
          </button>
          <button 
            onclick="filterByCategory('Préparation')"
            class="filter-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors"
            data-category="Préparation"
          >
            <i class="fas fa-dolly mr-2"></i>Préparation ({documents.filter(d => d.category === 'Préparation').length})
          </button>
          <button 
            onclick="filterByCategory('Anomalies')"
            class="filter-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
            data-category="Anomalies"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>Anomalies ({documents.filter(d => d.category === 'Anomalies').length})
          </button>
          <button 
            onclick="filterByCategory('Retours')"
            class="filter-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors"
            data-category="Retours"
          >
            <i class="fas fa-undo-alt mr-2"></i>Retours ({documents.filter(d => d.category === 'Retours').length})
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div id="documents-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => {
          const categoryColors = {
            'Réception': 'border-orange-500 bg-orange-50',
            'IPL': 'border-green-500 bg-green-50',
            'Préparation': 'border-purple-500 bg-purple-50',
            'Anomalies': 'border-red-500 bg-red-50',
            'Retours': 'border-yellow-500 bg-yellow-50'
          }

          const categoryIcons = {
            'Réception': 'fa-truck-loading',
            'IPL': 'fa-forklift',
            'Préparation': 'fa-dolly',
            'Anomalies': 'fa-exclamation-circle',
            'Retours': 'fa-undo-alt'
          }

          const fileIcons = {
            'docx': 'fa-file-word text-orange-600',
            'pdf': 'fa-file-pdf text-red-600',
            'xlsx': 'fa-file-excel text-green-600',
            'xltm': 'fa-file-excel text-green-600'
          }

          return (
            <div 
              class={`document-card bg-white rounded-lg shadow-lg border-l-4 ${categoryColors[doc.category]} overflow-hidden hover:shadow-xl transition-shadow`}
              data-category={doc.category}
              data-keywords={doc.keywords}
              data-name={doc.name.toLowerCase()}
              data-description={doc.description.toLowerCase()}
            >
              <div class="p-6">
                {/* Header */}
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <i class={`fas ${categoryIcons[doc.category]} text-2xl mr-3`}></i>
                      <span class="text-xs font-semibold text-gray-600 uppercase">{doc.category}</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">
                      {doc.name}
                    </h3>
                  </div>
                  <span class="text-2xl">{doc.level}</span>
                </div>

                {/* Description */}
                <p class="text-sm text-gray-600 mb-4 min-h-[40px]">
                  {doc.description}
                </p>

                {/* File Info */}
                <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class={`fas ${fileIcons[doc.type]} text-2xl mr-2`}></i>
                    <span class="uppercase font-semibold">{doc.type}</span>
                  </div>
                  <span class="text-xs text-gray-400 truncate max-w-[150px]" title={doc.file}>
                    {doc.file}
                  </span>
                </div>

                {/* Actions */}
                <div class="flex gap-2">
                  <button 
                    onclick={`openDocumentPreview('${doc.file}', '${doc.type}', '${doc.name.replace(/'/g, "\\'")}')`}
                    class="flex-1 bg-[#FF6B35] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors text-center"
                  >
                    <i class="fas fa-eye mr-2"></i>Aperçu
                  </button>
                  <a 
                    href={`/static/documents/${doc.file}`}
                    download
                    class="bg-[#FF6B35] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
                    title="Télécharger"
                  >
                    <i class="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* No Results Message */}
      <div id="no-results" class="hidden text-center py-12">
        <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-2xl font-bold text-gray-600 mb-2">Aucun document trouvé</h3>
        <p class="text-gray-500">Essayez avec d'autres mots-clés ou filtres</p>
      </div>

      {/* Document Preview Modal */}
      <div id="preview-modal" class="hidden fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
          {/* Modal Header */}
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="flex-1">
              <h3 id="preview-title" class="text-xl font-bold text-gray-800"></h3>
              <p class="text-sm text-gray-500 mt-1">Aperçu du document</p>
            </div>
            <div class="flex items-center gap-2">
              <a 
                id="preview-download-btn"
                href="#"
                download
                class="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
              >
                <i class="fas fa-download mr-2"></i>Télécharger
              </a>
              <button 
                onclick="closePreview()"
                class="text-gray-500 hover:text-gray-700 text-2xl px-3"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div id="preview-content" class="flex-1 overflow-hidden bg-gray-100">
            {/* Content will be injected here */}
          </div>
        </div>
      </div>
    </div>
  )
}
