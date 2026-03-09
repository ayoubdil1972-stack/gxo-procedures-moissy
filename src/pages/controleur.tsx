export function ControleurPage() {
  const processes = [
    {
      id: 'controle-qualite',
      title: 'Contrôle qualité marchandises',
      icon: 'fa-search',
      duration: '20-30 min',
      level: '🟡',
      vigilance: ['Inspection visuelle', 'Vérifier température', 'Documenter anomalies']
    },
    {
      id: 'controle-quantitatif',
      title: 'Contrôle quantitatif',
      icon: 'fa-calculator',
      duration: '15-25 min',
      level: '🟢',
      vigilance: ['Recompter si doute', 'Vérifier unités', 'Noter écarts']
    },
    {
      id: 'controle-conformite',
      title: 'Contrôle de conformité produit',
      icon: 'fa-clipboard-check',
      duration: '25-35 min',
      level: '🔴',
      vigilance: ['Références exactes', 'Dates limite', 'Normes qualité']
    },
    {
      id: 'gestion-non-conformites',
      title: 'Gestion des non-conformités',
      icon: 'fa-times-circle',
      duration: '30-45 min',
      level: '🔴',
      vigilance: ['Isoler produits', 'Traçabilité', 'Notification rapide']
    },
    {
      id: 'audit-reception',
      title: 'Audit aléatoire réception',
      icon: 'fa-random',
      duration: '30-40 min',
      level: '🟡',
      vigilance: ['Sélection aléatoire', 'Objectivité', 'Reporting précis']
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
                  
                  {/* Bouton Vidéo tutoriel */}
                  <div class="mt-4">
                    <button 
                      class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 w-full justify-center"
                      onclick="alert('Fonctionnalité Vidéo tutoriel à venir')"
                    >
                      <i class="fas fa-video"></i>
                      <span class="font-semibold">Vidéo tutoriel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        ))}
      </div>

      {/* Script pour la gestion des improductivités */}
      <script src="/static/controleur-improd.js?v=3.5.21"></script>

    </div>
  )
}
