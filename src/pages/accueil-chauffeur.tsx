export function AccueilChauffeurPage() {
  const processes = [
    {
      id: 'arrivee-chauffeur',
      title: 'Arrivée et enregistrement',
      icon: 'fa-truck',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Se présenter à l\'accueil', 'Préparer documents', 'Suivre signalisation'],
      document: 'Assigner camion à quai-2.docx'
    },
    {
      id: 'procedures-securite',
      title: 'Procédures de sécurité',
      icon: 'fa-shield-alt',
      duration: '5 min',
      level: '🟡',
      vigilance: ['Port EPI obligatoire', 'Respecter zones', 'Signaler anomalies']
    },
    {
      id: 'dechargement-chauffeur',
      title: 'Opération de déchargement',
      icon: 'fa-dolly',
      duration: '30-60 min',
      level: '🟢',
      vigilance: ['Attendre autorisation', 'Ouvrir portes si demandé', 'Rester disponible']
    },
    {
      id: 'depart-chauffeur',
      title: 'Clôture et départ',
      icon: 'fa-sign-out-alt',
      duration: '10 min',
      level: '🟢',
      vigilance: ['Récupérer documents signés', 'Vérifier camion vide', 'Signaler départ']
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 p-4 rounded-full">
              <i class="fas fa-truck text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Accueil Chauffeur</h1>
              <p class="text-xl opacity-90">Procédures d'arrivée et livraison</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-5xl font-bold">{processes.length}</div>
            <div class="text-sm opacity-75">Procédures</div>
          </div>
        </div>
      </div>

      {/* Système d'Onglets pour Chauffeurs et Quais */}
      <div class="mb-8">
        {/* Onglets de navigation */}
        <div class="flex space-x-2 mb-6">
          <button 
            id="tab-chauffeurs"
            onclick="switchTab('chauffeurs')"
            class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-3">
            <i class="fas fa-users-cog text-2xl"></i>
            <div class="text-left">
              <div class="text-lg">Chauffeurs Actifs</div>
              <div class="text-xs opacity-75">Suivi en temps réel</div>
            </div>
            <div class="bg-white/20 rounded-lg px-3 py-1">
              <span class="text-2xl font-bold" id="tab-stat-chauffeurs">0</span>
            </div>
          </button>
          
          <button 
            id="tab-quais"
            onclick="switchTab('quais')"
            class="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl shadow-lg hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center space-x-3">
            <i class="fas fa-warehouse text-2xl"></i>
            <div class="text-left">
              <div class="text-lg">Gestion des Quais</div>
              <div class="text-xs opacity-75">45 quais GXO Moissy</div>
            </div>
            <div class="bg-gray-100 rounded-lg px-3 py-1">
              <span class="text-2xl font-bold text-green-600" id="tab-stat-quais-disponibles">0</span>
            </div>
          </button>
        </div>

        {/* Contenu de l'onglet Chauffeurs */}
        <div id="content-chauffeurs" class="tab-content">
          <div id="dashboard-chauffeurs-container">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-xl p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2 flex items-center">
                <i class="fas fa-users-cog mr-3"></i>
                Chauffeurs Actifs en Temps Réel
              </h2>
              <p class="text-sm opacity-90">Suivi de la progression des tâches de déchargement</p>
            </div>
            <div class="flex space-x-4">
              <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div class="text-3xl font-bold" id="stat-total-chauffeurs">0</div>
                <div class="text-xs opacity-75">Total</div>
              </div>
              <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div class="text-3xl font-bold text-green-300" id="stat-complets">0</div>
                <div class="text-xs opacity-75">Prêts</div>
              </div>
              <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div class="text-3xl font-bold text-orange-200" id="stat-en-cours">0</div>
                <div class="text-xs opacity-75">En cours</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grille des chauffeurs */}
        <div id="dashboard-chauffeurs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Chargement... */}
          <div class="col-span-full flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        </div>
        
        {/* Légende */}
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-info-circle text-blue-500 mr-2"></i>
            Légende des Tâches
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🦺</span>
              <span class="text-sm text-gray-700">EPI Porté</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🚚</span>
              <span class="text-sm text-gray-700">Placement Quai</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">📦</span>
              <span class="text-sm text-gray-700">Échange Palettes</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🔔</span>
              <span class="text-sm text-gray-700">Accueil Notifié</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🔑</span>
              <span class="text-sm text-gray-700">Remise Clés</span>
            </div>
          </div>
        </div>
      </div>
        </div>

        {/* Contenu de l'onglet Quais */}
        <div id="content-quais" class="tab-content hidden">
          {/* Header avec statistiques */}
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-xl p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold mb-2 flex items-center">
                  <i class="fas fa-warehouse mr-3"></i>
                  Gestion des Quais de Déchargement
                </h2>
                <p class="text-sm opacity-90">Visualisation et gestion de l'état des 45 quais GXO Moissy en temps réel</p>
              </div>
              <div class="flex space-x-4">
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-green-300" id="stat-quais-disponibles">0</div>
                  <div class="text-xs opacity-75">Disponibles</div>
                </div>
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-yellow-300" id="stat-quais-en-cours">0</div>
                  <div class="text-xs opacity-75">En cours</div>
                </div>
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-blue-300" id="stat-quais-fin-dechargement">0</div>
                  <div class="text-xs opacity-75">Fin déchargement</div>
                </div>
                <div class="bg-white/20 rounded-xl px-4 py-2 text-center">
                  <div class="text-3xl font-bold text-red-300" id="stat-quais-indisponibles">0</div>
                  <div class="text-xs opacity-75">Indisponibles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Panneau de scan code-barres et historique */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Indicateur de scan actif */}
            <div class="lg:col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-xl p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="bg-white/20 p-4 rounded-full animate-pulse">
                    <i class="fas fa-barcode text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold mb-1">Scanner Code-Barres Actif</h3>
                    <p class="text-sm opacity-90">Scannez un code-barres (ex: D075) pour démarrer automatiquement le timer du quai</p>
                    <div class="mt-2 flex items-center space-x-2 text-xs opacity-75">
                      <i class="fas fa-info-circle"></i>
                      <span>45 quais configurés • Détection automatique • Timer en temps réel</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="bg-white/20 rounded-xl px-4 py-2">
                    <div class="text-3xl font-bold" id="scan-counter">0</div>
                    <div class="text-xs opacity-75">Scans</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Historique des scans */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span>
                  <i class="fas fa-history text-blue-500 mr-2"></i>
                  Derniers Scans
                </span>
                <button onclick="loadScanHistory()" class="text-blue-500 hover:text-blue-700 text-xs">
                  <i class="fas fa-sync-alt"></i>
                </button>
              </h3>
              <div id="scan-history-list" class="space-y-2 max-h-48 overflow-y-auto">
                <div class="text-center text-gray-400 py-8">
                  <i class="fas fa-inbox text-4xl mb-2"></i>
                  <p class="text-sm">Aucun scan enregistré</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interface de Scan Manuel - NOUVELLE FONCTIONNALITÉ */}
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl p-6 mb-6">
            <div class="flex flex-col md:flex-row items-center gap-4">
              <div class="flex-shrink-0">
                <div class="bg-white/20 rounded-full p-4">
                  <i class="fas fa-qrcode text-white text-4xl"></i>
                </div>
              </div>
              <div class="flex-1 text-center md:text-left">
                <h3 class="text-2xl font-bold text-white mb-2">
                  Scanner un Code-Barres
                </h3>
                <p class="text-white/90 text-sm">
                  Tapez ou collez le code (ex: D075, D001) puis appuyez sur Entrée ou Scanner
                </p>
              </div>
              <div class="flex-1 max-w-md">
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    id="manual-scan-input"
                    placeholder="Code-barres (ex: D075)"
                    class="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 font-mono text-lg uppercase"
                    onkeypress="if(event.key==='Enter') triggerManualScan()"
                  />
                  <button 
                    onclick="triggerManualScan()"
                    class="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <i class="fas fa-search"></i>
                    Scanner
                  </button>
                </div>
                <div id="manual-scan-result" class="mt-2 text-sm"></div>
              </div>
            </div>
          </div>

          {/* Grille des 45 quais GXO Moissy - Organisation par zones */}
          <div class="space-y-6">
            {/* Zone 1-10 */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                Zone A (Quais 1-10)
              </h3>
              <div id="quais-zone-1-10" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"></div>
            </div>

            {/* Zone 32-38 */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt text-purple-500 mr-2"></i>
                Zone B (Quais 32-38)
              </h3>
              <div id="quais-zone-32-38" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"></div>
            </div>

            {/* Zone 45-49 */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt text-orange-500 mr-2"></i>
                Zone C (Quais 45-49)
              </h3>
              <div id="quais-zone-45-49" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"></div>
            </div>

            {/* Zone 60-69 */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt text-teal-500 mr-2"></i>
                Zone D (Quais 60-62, 67-69)
              </h3>
              <div id="quais-zone-60-69" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"></div>
            </div>

            {/* Zone 75-87 */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt text-pink-500 mr-2"></i>
                Zone E (Quais 75-79, 81-87)
              </h3>
              <div id="quais-zone-75-87" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"></div>
            </div>

            {/* Zone 99-103 */}
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt text-indigo-500 mr-2"></i>
                Zone F (Quais 99-103)
              </h3>
              <div id="quais-zone-99-103" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3"></div>
            </div>

            {/* Vue d'ensemble masquée - pour le chargement initial */}
            <div id="quais-grid" class="hidden"></div>
          </div>

          {/* Modal de gestion du quai */}
          <div id="modal-quai" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center hidden">
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
              <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                <h3 class="text-2xl font-bold flex items-center">
                  <i class="fas fa-warehouse mr-3"></i>
                  Gestion du Quai <span id="modal-quai-numero" class="ml-2"></span>
                </h3>
              </div>
              
              <div class="p-6">
                <div class="mb-6">
                  <label class="block text-sm font-bold text-gray-700 mb-3">
                    <i class="fas fa-traffic-light mr-2 text-green-500"></i>
                    Changer le statut
                  </label>
                  <div class="space-y-3">
                    <button onclick="setQuaiStatus('disponible')" 
                            class="w-full bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-xl hover:from-green-500 hover:to-green-600 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center">
                      <span class="text-2xl mr-3">✅</span>
                      Disponible - Prêt pour chargement
                    </button>
                    <button onclick="toggleCommentaire('mise_a_quai_non_decharge')" 
                            class="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center">
                      <span class="text-2xl mr-3">📦</span>
                      Mise à quai non déchargé
                    </button>
                    <button onclick="toggleCommentaire('indisponible')" 
                            class="w-full bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-500 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center">
                      <span class="text-2xl mr-3">🚫</span>
                      Indisponible - Problème signalé
                    </button>
                  </div>
                </div>

                <div id="commentaire-section" class="hidden mb-6">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-comment-alt mr-2"></i>
                    <span id="commentaire-label">Commentaire obligatoire</span>
                  </label>
                  <textarea 
                    id="quai-commentaire" 
                    rows="3" 
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
                    placeholder="Décrivez la situation (obligatoire)..."
                  ></textarea>
                  <button id="confirm-status-btn" onclick="confirmQuaiStatus()" 
                          class="w-full mt-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-md hover:shadow-lg font-semibold">
                    <i class="fas fa-check mr-2"></i>
                    <span id="confirm-btn-text">Confirmer</span>
                  </button>
                </div>

                <div class="flex space-x-3">
                  <button onclick="closeQuaiModal()" 
                          class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold">
                    <i class="fas fa-times mr-2"></i>
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Légende des statuts */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-info-circle text-green-500 mr-2"></i>
              Légende des Statuts
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div class="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div class="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">✅</span>
                <span class="text-xs font-semibold text-gray-700">Disponible</span>
              </div>
              <div class="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
                <div class="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">⏱️</span>
                <span class="text-xs font-semibold text-gray-700">En cours</span>
              </div>
              <div class="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <div class="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">📋</span>
                <span class="text-xs font-semibold text-gray-700">Fin de déchargement</span>
              </div>
              <div class="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                <div class="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">🔍</span>
                <span class="text-xs font-semibold text-gray-700">En contrôle</span>
              </div>
              <div class="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                <div class="w-4 h-4 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">📝</span>
                <span class="text-xs font-semibold text-gray-700">Fin de contrôle</span>
              </div>
              <div class="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg">
                <div class="w-4 h-4 bg-amber-700 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">📦</span>
                <span class="text-xs font-semibold text-gray-700">Mise à quai non déchargé</span>
              </div>
              <div class="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                <div class="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                <span class="text-lg mr-1">🚫</span>
                <span class="text-xs font-semibold text-gray-700">Indisponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processes Grid */}
      <div class="grid grid-cols-1 gap-6">
        {processes.map((process) => (
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class={`fas ${process.icon} text-2xl text-blue-600`}></i>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{process.title}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span class="flex items-center">
                      <i class="fas fa-clock mr-2 text-blue-500"></i>
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

            <div class="flex flex-wrap gap-2">
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
        ))}
      </div>
      
      {/* Script Système d'Onglets */}
      <script src="/static/accueil-chauffeur-tabs.js"></script>
      
      {/* Script Dashboard Temps Réel */}
      <script src="/static/accueil-chauffeur-dashboard.js"></script>
      
      {/* Script Gestion des Quais (version intégrée) */}
      <script src="/static/accueil-chauffeur-quais.js"></script>
      
      {/* Script de Scan Manuel */}
      <script dangerouslySetInnerHTML={{ __html: `
        function triggerManualScan() {
          const input = document.getElementById('manual-scan-input');
          const resultDiv = document.getElementById('manual-scan-result');
          const barcode = input.value.trim().toUpperCase();
          
          if (!barcode) {
            resultDiv.innerHTML = '<span class="text-red-200">⚠️ Veuillez saisir un code-barres</span>';
            return;
          }
          
          console.log('🔍 Scan manuel déclenché:', barcode);
          resultDiv.innerHTML = '<span class="text-yellow-200">⏳ Traitement en cours...</span>';
          
          // Appeler la fonction de scan du barcode-scanner.js
          if (typeof handleBarcodeScan === 'function') {
            handleBarcodeScan(barcode);
            resultDiv.innerHTML = '<span class="text-green-200">✅ Code scanné : ' + barcode + '</span>';
            
            // Effacer l'input après 1 seconde
            setTimeout(function() {
              input.value = '';
              resultDiv.innerHTML = '';
            }, 2000);
          } else {
            resultDiv.innerHTML = '<span class="text-red-200">❌ Scanner non initialisé. Rechargez la page.</span>';
            console.error('handleBarcodeScan non disponible');
          }
        }
        
        // Auto-focus sur l'input au chargement
        window.addEventListener('load', function() {
          const input = document.getElementById('manual-scan-input');
          if (input) {
            // Focus uniquement si on est sur l'onglet Quais
            const quaisTab = document.getElementById('tab-quais');
            if (quaisTab && quaisTab.classList.contains('tab-active')) {
              setTimeout(function() { input.focus(); }, 500);
            }
          }
        });
      ` }} />
      
      {/* Script Scanner Code-Barres pour Quais */}
      <script src="/static/barcode-scanner.js"></script>
    </div>
  )
}
// Version 2.5.2 - GRILLES UNIFORMES - 2026-03-04_12:19:33_UTC
