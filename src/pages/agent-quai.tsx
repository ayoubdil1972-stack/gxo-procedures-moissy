export function AgentQuaiPage() {
  const processes = [
    {
      id: 'accueil-camion',
      title: 'Accueil Camion et Préparation Quai',
      icon: 'fa-truck',
      duration: '5 min',
      level: '🟢',
      vigilance: [
        'Sécurité et contrôle avant déchargement',
        'Vérifier assignation du camion',
        'Préparer la zone de déchargement'
      ],
      document: '09_Accueil_Camion.pdf',
      description: 'Sécurité et contrôle avant déchargement'
    },
    {
      id: 'dechargement-controle',
      title: 'Déchargement et Contrôle',
      icon: 'fa-dolly',
      duration: '30-60 min',
      level: '🟢',
      vigilance: [
        'Mise en place sécurisée',
        'Vérifications de sécurité complètes',
        'Respecter les procédures'
      ],
      document: '10_Dechargement_Controle.pdf',
      description: 'Mise en place et vérifications de sécurité'
    },
    {
      id: 'verification-conformite',
      title: 'Vérification Conformité',
      icon: 'fa-check-circle',
      duration: '10 min',
      level: '🟢',
      vigilance: [
        'Disposition correcte des palettes',
        'Espacement réglementaire',
        'Stabilité des charges'
      ],
      document: '11_Verification_Conformite.pdf',
      description: 'Disposition et espacement des palettes'
    },
    {
      id: 'mode-operatoire-agent',
      title: 'Mode Opératoire Synthétique',
      icon: 'fa-list-check',
      duration: 'Référence',
      level: '🟢',
      vigilance: [
        'Fil conducteur du flux quai',
        'Points clés du processus',
        'Référence quotidienne'
      ],
      document: '12_Mode_Operatoire_Agent.pdf',
      description: 'Fil conducteur du flux quai'
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
          
          {/* GXO-Procédures Section */}
          <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-xl p-6 mb-6">
            <h2 class="text-3xl font-bold flex items-center">
              <i class="fas fa-file-alt mr-3"></i>
              GXO-Procédures Agent de Quai
            </h2>
            <p class="text-lg opacity-90 mt-2">
              {processes.length} procédures opérationnelles détaillées
            </p>
          </div>

          {/* Process Cards - Format Reception.tsx */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {processes.map((process) => (
              <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4">
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
                      <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
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
                        class="gxo-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 flex items-center"
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
      </div>

      {/* Script pour la gestion des improductivités agent de quai */}
      <script src="/static/agent-quai-improd.js?v=3.5.36"></script>
    </div>
  )
}
