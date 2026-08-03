export function ControleurPage() {
  const processes = [
    {
      id: 'process-scan',
      title: 'Process Scan',
      icon: 'fa-barcode',
      duration: '2-3 min',
      level: '🟢',
      vigilance: [
        'Allumer le scan correctement',
        'S\'identifier avec ses codes',
        'Connecter l\'imprimante avant de commencer'
      ],
      document: '04_Process_Scan.pdf',
      description: 'Allumer le scan, s\'identifier et connecter l\'imprimante'
    },
    {
      id: 'traitement-anomalie',
      title: 'Traitement d\'une Anomalie',
      icon: 'fa-exclamation-triangle',
      duration: '10-15 min',
      level: '🟡',
      vigilance: [
        'Utiliser le formulaire Teams',
        'Documenter le problème précisément',
        'Joindre des photos si nécessaire'
      ],
      document: '05_Traitement_Anomalie.pdf',
      description: 'Utiliser le formulaire Teams pour signaler un problème'
    },
    {
      id: 'dlc-courte-abrand',
      title: 'DLC Courte Abrand Crossdock',
      icon: 'fa-calendar-times',
      duration: '10 min',
      level: '🟡',
      vigilance: [
        'Vérifier la date limite de consommation',
        'Tracer la modification dans le système',
        'Appliquer la procédure Abrand'
      ],
      document: '06_DLC_Courte_Abrand.pdf',
      description: 'Traiter une palette avec DLC courte et tracer la modification'
    },
    {
      id: 'etiquettes-rouges',
      title: 'Étiquettes Rouges - Traçabilité',
      icon: 'fa-tag',
      duration: '5 min',
      level: '🟡',
      vigilance: [
        'Renseigner l\'étiquette rouge complètement',
        'Tracer l\'anomalie dans le système',
        'Placer l\'étiquette de manière visible'
      ],
      document: '07_Etiquettes_Rouges.pdf',
      description: 'Renseigner et tracer les anomalies avec étiquettes rouges'
    },
    {
      id: 'mode-operatoire-controleur',
      title: 'Mode Opératoire Synthétique',
      icon: 'fa-list-check',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Lecture rapide du flux terrain contrôleur',
        'Points clés du processus',
        'Référence quotidienne'
      ],
      document: '08_Mode_Operatoire_Controleur.pdf',
      description: 'Lecture rapide du flux terrain contrôleur'
    },
    {
      id: 'anomalie-order-planning',
      title: 'Anomalie et Order Planning',
      icon: 'fa-clipboard-list',
      duration: '15-20 min',
      level: '🟡',
      vigilance: [
        'Traiter les écarts de livraison',
        'Gérer les manquants',
        'Vérifier les quantités incohérentes'
      ],
      document: '35_Anomalie_Order_Planning.pdf',
      description: 'Traiter un écart de livraison (manquant, quantité incohérente)'
    },
    {
      id: 'reception-ncg',
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
      id: 'fichier-etetage',
      title: 'Fichier Étêtage et Container',
      icon: 'fa-file-excel',
      duration: '10 min',
      level: '🟢',
      vigilance: [
        'Mettre en forme le fichier quotidien',
        'Renseigner toutes les données',
        'Vérifier les containers'
      ],
      document: '37_Fichier_Etetage_Container.pdf',
      description: 'Mettre en forme et renseigner le fichier quotidien étêtage'
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

      {/* Double Interface - Onglets */}
      <div class="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        {/* Tabs Header */}
        <div class="flex border-b border-gray-200">
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 bg-green-50 border-green-500 text-green-700"
            id="tab-improd-btn"
            onclick="switchTabControleur('improd')"
          >
            <i class="fas fa-stopwatch mr-2"></i>
            Notifier une improductivité
          </button>
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            id="tab-ecart-btn"
            onclick="switchTabControleur('ecart')"
          >
            <i class="fas fa-exclamation-triangle mr-2"></i>
            Écart et Non-conformité
          </button>
        </div>

        {/* Tab Content - Improductivité */}
        <div id="tab-improd-content" class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-stopwatch mr-2 text-green-500"></i>
            Notifier une improductivité
          </h2>

          {/* Formulaire Improductivité */}
          <div class="space-y-6">
            {/* Nom du contrôleur */}
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-user mr-2 text-green-500"></i>
                Nom du contrôleur
              </label>
              <input 
                type="text" 
                id="controleur-nom-improd"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Entrez votre nom"
              />
            </div>

            {/* Raisons d'improductivité */}
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <i class="fas fa-list mr-2 text-green-500"></i>
                Raison de l'improductivité
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1 */}
                <button 
                  class="improd-option p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-left"
                  data-raison="etiquette"
                  onclick="selectImprodRaison('etiquette')"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <i class="fas fa-tag text-red-600"></i>
                    </div>
                    <div class="flex-1">
                      <div class="font-semibold text-gray-800">Erreur étiquette palette</div>
                      <div class="text-xs text-gray-500">Timer démarre automatiquement</div>
                    </div>
                  </div>
                </button>

                {/* Option 2 */}
                <button 
                  class="improd-option p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                  data-raison="reseau"
                  onclick="selectImprodRaison('reseau')"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <i class="fas fa-wifi text-orange-600"></i>
                    </div>
                    <div class="flex-1">
                      <div class="font-semibold text-gray-800">Problème de réseau</div>
                      <div class="text-xs text-gray-500">Timer démarre automatiquement</div>
                    </div>
                  </div>
                </button>

                {/* Option 3 */}
                <button 
                  class="improd-option p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  data-raison="formation"
                  onclick="selectImprodRaison('formation')"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-graduation-cap text-blue-600"></i>
                    </div>
                    <div class="flex-1">
                      <div class="font-semibold text-gray-800">Formation</div>
                      <div class="text-xs text-gray-500">Durée fixe : 07:00:00</div>
                    </div>
                  </div>
                </button>

                {/* Option 4 */}
                <button 
                  class="improd-option p-4 border-2 border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                  data-raison="accident"
                  onclick="selectImprodRaison('accident')"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <i class="fas fa-exclamation-triangle text-purple-600"></i>
                    </div>
                    <div class="flex-1">
                      <div class="font-semibold text-gray-800">Accident sur palette</div>
                      <div class="text-xs text-gray-500">Cassée, penchée, dangereuse</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Timer Display (caché au départ) */}
            <div id="improd-timer-section" class="hidden">
              <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
                <div class="text-sm font-semibold mb-2">Improductivité en cours</div>
                <div id="improd-timer-display" class="text-5xl font-bold mb-2">00:00:00</div>
                <div id="improd-raison-display" class="text-sm opacity-90">-</div>
              </div>

              {/* Commentaire */}
              <div class="mt-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-comment mr-2 text-green-500"></i>
                  Commentaire (optionnel)
                </label>
                <textarea 
                  id="improd-commentaire"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Détails supplémentaires..."
                ></textarea>
              </div>

              {/* Bouton Clôturer */}
              <button 
                id="btn-cloturer-improd"
                class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg mt-4"
                onclick="cloturerImprod()"
              >
                <i class="fas fa-stop-circle mr-2"></i>
                Fermer l'improductivité
              </button>
            </div>

            {/* Bouton Démarrer (visible au départ) */}
            <button 
              id="btn-demarrer-improd"
              class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
              onclick="demarrerImprod()"
            >
              <i class="fas fa-play-circle mr-2"></i>
              Démarrer la notification
            </button>
          </div>

          {/* Historique (à implémenter plus tard) */}
          <div class="mt-8 border-t pt-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-history mr-2 text-green-500"></i>
              Historique des improductivités
            </h3>
            <div id="improd-historique" class="space-y-3">
              <div class="text-center text-gray-500 py-8">
                <i class="fas fa-inbox text-4xl mb-2"></i>
                <p>Aucune improductivité enregistrée aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content - Écart et Non-conformité */}
        <div id="tab-ecart-content" class="p-6 hidden">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-exclamation-triangle mr-2 text-orange-500"></i>
            Écart et Non-conformité repérés au déchargement
          </h2>
          
          {/* Statistiques */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-red-600 font-semibold">En attente</p>
                  <p id="stat-en-attente" class="text-3xl font-bold text-red-700">0</p>
                </div>
                <i class="fas fa-exclamation-circle text-4xl text-red-300"></i>
              </div>
            </div>
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-green-600 font-semibold">Traitées aujourd'hui</p>
                  <p id="stat-traitees" class="text-3xl font-bold text-green-700">0</p>
                </div>
                <i class="fas fa-check-circle text-4xl text-green-300"></i>
              </div>
            </div>
            <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-orange-600 font-semibold">Total cette semaine</p>
                  <p id="stat-semaine" class="text-3xl font-bold text-orange-700">0</p>
                </div>
                <i class="fas fa-chart-line text-4xl text-orange-300"></i>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div class="flex space-x-2 mb-6">
            <button 
              class="px-4 py-2 rounded-lg font-semibold transition-colors bg-orange-500 text-white"
              id="btn-filtre-attente"
              onclick="filtrerAlertes('en_attente')"
            >
              <i class="fas fa-clock mr-2"></i>
              En attente
            </button>
            <button 
              class="px-4 py-2 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
              id="btn-filtre-traitees"
              onclick="filtrerAlertes('traitee')"
            >
              <i class="fas fa-check mr-2"></i>
              Traitées
            </button>
          </div>

          {/* Liste des alertes */}
          <div id="alertes-container" class="space-y-4">
            <div class="text-center text-gray-500 py-12">
              <i class="fas fa-inbox text-5xl mb-3"></i>
              <p class="text-lg">Aucune alerte en attente</p>
              <p class="text-sm mt-2">Les alertes apparaîtront automatiquement ici</p>
            </div>
          </div>

          {/* Modal Traiter Alerte */}
          <div id="modal-traiter-alerte" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div class="bg-orange-500 text-white p-6 rounded-t-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-2xl font-bold">Traiter l'alerte</h3>
                    <p class="text-sm opacity-90 mt-1" id="modal-alerte-titre">Quai X</p>
                  </div>
                  <button onclick="fermerModalAlerte()" class="text-white hover:text-orange-200 transition-colors text-2xl">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div class="p-6">
                {/* Informations alerte */}
                <div id="modal-alerte-details" class="mb-6 space-y-3">
                  {/* Rempli dynamiquement par JS */}
                </div>

                {/* Formulaire consignes */}
                <div class="border-t pt-6">
                  <h4 class="text-lg font-bold text-gray-800 mb-4">
                    <i class="fas fa-clipboard-list mr-2 text-orange-500"></i>
                    Consignes du contrôleur
                  </h4>

                  {/* Nom contrôleur */}
                  <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      <i class="fas fa-user mr-2 text-orange-500"></i>
                      Votre nom
                    </label>
                    <input 
                      type="text" 
                      id="modal-controleur-nom"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Nom du contrôleur"
                    />
                  </div>

                  {/* Consignes */}
                  <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      <i class="fas fa-comment-dots mr-2 text-orange-500"></i>
                      Consignes et actions entreprises
                    </label>
                    <textarea 
                      id="modal-consignes"
                      rows="6"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Décrivez les consignes données, les actions prises, les vérifications effectuées..."
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-1">
                      Ces consignes seront enregistrées et pourront être consultées plus tard
                    </p>
                  </div>

                  {/* Boutons */}
                  <div class="flex space-x-3">
                    <button 
                      id="btn-valider-traitement"
                      class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                      onclick="validerTraitementAlerte()"
                    >
                      <i class="fas fa-check-circle mr-2"></i>
                      Valider le traitement
                    </button>
                    <button 
                      class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      onclick="fermerModalAlerte()"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GXO-Procédures Section */}
      <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-xl p-6 mb-6">
        <h2 class="text-3xl font-bold flex items-center">
          <i class="fas fa-file-alt mr-3"></i>
          GXO-Procédures Contrôleur
        </h2>
        <p class="text-lg opacity-90 mt-2">
          {processes.length} procédures opérationnelles détaillées
        </p>
      </div>

      {/* Process Cards - Format Reception.tsx */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
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
                  <i class="fas fa-exclamation-triangle text-green-500 mr-2"></i>
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
                    class="gxo-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 flex items-center"
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

      {/* Script pour la gestion des improductivités */}
      <script src="/static/controleur-improd.js?v=3.5.35"></script>

    </div>
  )
}
