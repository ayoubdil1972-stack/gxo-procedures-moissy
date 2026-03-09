export function AgentQuaiPage() {
  const processes = [
    {
      id: 'accueil-camion',
      title: 'Accueil camion et préparation quai',
      icon: 'fa-hand-paper',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Vérifier assignation', 'Sécuriser zone', 'Briefing chauffeur']
    },
    {
      id: 'dechargement-quai',
      title: 'Déchargement et contrôle',
      icon: 'fa-dolly-flatbed',
      duration: '30-60 min',
      level: '🟢',
      vigilance: ['Respect sécurité', 'Vérifier palettes', 'Noter anomalies']
    },
    {
      id: 'verification-conformite-quai',
      title: 'Vérification conformité',
      icon: 'fa-check-double',
      duration: '15-20 min',
      level: '🟡',
      vigilance: ['BL vs physique', 'Références correctes', 'Températures']
    },
    {
      id: 'rangement-palettes',
      title: 'Rangement et étiquetage',
      icon: 'fa-warehouse',
      duration: '15-20 min',
      level: '🟢',
      vigilance: ['Zone appropriée', 'Étiquettes claires', 'Stabilité palettes']
    },
    {
      id: 'cloture-quai',
      title: 'Clôture quai et libération',
      icon: 'fa-door-closed',
      duration: '10 min',
      level: '🟢',
      vigilance: ['Documents complets', 'Zone propre', 'Quai libre']
    },
    {
      id: 'gestion-urgences-quai',
      title: 'Gestion des situations d\'urgence',
      icon: 'fa-ambulance',
      duration: 'Variable',
      level: '🔴',
      vigilance: ['Sécurité prioritaire', 'Alerter secours', 'Évacuer zone']
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

      {/* Double Interface - Onglets */}
      <div class="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        {/* Tabs Header */}
        <div class="flex border-b border-gray-200">
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 bg-yellow-50 border-yellow-500 text-yellow-700"
            id="tab-improd-quai-btn"
            onclick="switchTabAgentQuai('improd')"
          >
            <i class="fas fa-stopwatch mr-2"></i>
            Notifier une improductivité
          </button>
          <button 
            class="flex-1 px-6 py-4 text-center font-semibold transition-colors border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            id="tab-procedures-quai-btn"
            onclick="switchTabAgentQuai('procedures')"
          >
            <i class="fas fa-clipboard-list mr-2"></i>
            Procédures de travail
          </button>
        </div>

        {/* Tab Content - Improductivité */}
        <div id="tab-improd-quai-content" class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-stopwatch mr-2 text-yellow-500"></i>
            Notifier une improductivité
          </h2>

          {/* Formulaire Improductivité */}
          <div class="space-y-6">
            {/* Nom de l'agent */}
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-user mr-2 text-yellow-500"></i>
                Nom de l'agent de quai
              </label>
              <input 
                type="text" 
                id="agent-nom-improd"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Entrez votre nom"
              />
            </div>

            {/* Raisons d'improductivité */}
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <i class="fas fa-list mr-2 text-yellow-500"></i>
                Raison de l'improductivité
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1 */}
                <button 
                  class="improd-option-quai p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-left"
                  data-raison="etiquette"
                  onclick="selectImprodRaisonQuai('etiquette')"
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
                  class="improd-option-quai p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                  data-raison="reseau"
                  onclick="selectImprodRaisonQuai('reseau')"
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
                  class="improd-option-quai p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  data-raison="formation"
                  onclick="selectImprodRaisonQuai('formation')"
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
                  class="improd-option-quai p-4 border-2 border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                  data-raison="accident"
                  onclick="selectImprodRaisonQuai('accident')"
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

            {/* Timer et boutons */}
            <div id="improd-timer-quai" class="hidden">
              <div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <i class="fas fa-stopwatch text-4xl text-yellow-600"></i>
                  <div>
                    <div class="text-sm text-gray-600">Temps d'improductivité</div>
                    <div id="timer-display-quai" class="text-4xl font-bold text-yellow-600">00:00:00</div>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-4">Le timer est actif. Cliquez sur "Clôturer" pour arrêter.</p>
                <button 
                  class="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  onclick="cloturerImprodQuai()"
                >
                  <i class="fas fa-stop mr-2"></i>
                  Clôturer improductivité
                </button>
              </div>
            </div>

            {/* Bouton démarrer */}
            <div id="btn-demarrer-container-quai">
              <button 
                class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                id="btn-demarrer-improd-quai"
                onclick="demarrerImprodQuai()"
                disabled
              >
                <i class="fas fa-play-circle mr-2"></i>
                Démarrer le timer d'improductivité
              </button>
              <p class="text-sm text-gray-500 mt-2 text-center">
                <i class="fas fa-info-circle mr-1"></i>
                Sélectionnez une raison pour activer le bouton
              </p>
            </div>
          </div>

          {/* Historique improductivités */}
          <div class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
              <i class="fas fa-history mr-2 text-yellow-500"></i>
              Historique d'aujourd'hui
            </h3>
            <div id="improd-historique-quai" class="space-y-3">
              <div class="text-center text-gray-500 py-12">
                <i class="fas fa-inbox text-4xl mb-2"></i>
                <p>Aucune improductivité enregistrée aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content - Procédures */}
        <div id="tab-procedures-quai-content" class="p-6 hidden">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <i class="fas fa-clipboard-list mr-2 text-yellow-500"></i>
            Procédures de travail
          </h2>
          
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
        </div>
      </div>

      {/* Script pour la gestion des improductivités agent de quai */}
      <script src="/static/agent-quai-improd.js?v=3.5.36"></script>
    </div>
  )
}
