export function HomePage() {
  const metiers = [
    {
      id: 'reception',
      title: 'Réception',
      icon: 'fa-truck-loading',
      color: 'bg-orange-500',
      description: 'Base générale des procédures - Réception marchandises',
      processes: 29
    },
    {
      id: 'accueil-chauffeur',
      title: 'Accueil Chauffeur',
      icon: 'fa-truck',
      color: 'bg-blue-500',
      description: 'Procédures d\'arrivée et livraison chauffeurs',
      processes: 4
    },
    {
      id: 'administrateur',
      title: 'Administrateur',
      icon: 'fa-user-tie',
      color: 'bg-purple-500',
      description: 'Gestion administrative et suivi documentaire',
      processes: 5
    },
    {
      id: 'controleur',
      title: 'Contrôleur',
      icon: 'fa-user-check',
      color: 'bg-green-500',
      description: 'Contrôle qualité et conformité réception',
      processes: 5
    },
    {
      id: 'agent-quai',
      title: 'Agent de Quai',
      icon: 'fa-hard-hat',
      color: 'bg-yellow-500',
      description: 'Opérations de déchargement et contrôle',
      processes: 6
    },
    {
      id: 'nouveau',
      title: 'Nouvel Arrivant',
      icon: 'fa-graduation-cap',
      color: 'bg-pink-500',
      description: 'Parcours d\'intégration et formations de base',
      processes: 6
    },
    {
      id: 'anomalies',
      title: 'Anomalies / FAQ',
      icon: 'fa-exclamation-circle',
      color: 'bg-red-500',
      description: 'Gestion incidents, litiges, arbres de décision',
      processes: 20
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div class="bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white rounded-lg shadow-xl p-8 mb-8 relative overflow-hidden">
        {/* Background illustration */}
        <div class="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <svg viewBox="0 0 400 300" class="w-full h-full">
            {/* Warehouse shelves */}
            <rect x="50" y="80" width="80" height="40" fill="currentColor" opacity="0.8"/>
            <rect x="50" y="130" width="80" height="40" fill="currentColor" opacity="0.8"/>
            <rect x="50" y="180" width="80" height="40" fill="currentColor" opacity="0.8"/>
            <rect x="150" y="80" width="80" height="40" fill="currentColor" opacity="0.6"/>
            <rect x="150" y="130" width="80" height="40" fill="currentColor" opacity="0.6"/>
            <rect x="150" y="180" width="80" height="40" fill="currentColor" opacity="0.6"/>
            
            {/* Forklift */}
            <g transform="translate(270, 180)">
              {/* Forklift body */}
              <rect x="0" y="20" width="60" height="30" fill="#FF4500" opacity="0.9"/>
              {/* Cabin */}
              <rect x="35" y="5" width="25" height="15" fill="#FF4500" opacity="0.9"/>
              {/* Wheels */}
              <circle cx="15" cy="55" r="8" fill="currentColor"/>
              <circle cx="50" cy="55" r="8" fill="currentColor"/>
              {/* Fork */}
              <rect x="-15" y="25" width="10" height="30" fill="currentColor" opacity="0.8"/>
              {/* Mast */}
              <rect x="-5" y="-20" width="5" height="45" fill="currentColor" opacity="0.7"/>
            </g>
            
            {/* Pallets */}
            <rect x="60" y="90" width="15" height="20" fill="#FF4500" opacity="0.7"/>
            <rect x="80" y="90" width="15" height="20" fill="#FF4500" opacity="0.5"/>
            <rect x="160" y="140" width="15" height="20" fill="#FF4500" opacity="0.6"/>
          </svg>
        </div>
        
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-start space-x-6">
            <img src="/static/gxo-logo-official.svg" alt="GXO Logistics" class="h-16 mt-2" id="hero-logo" />
            <div>
              <h1 class="text-4xl font-bold mb-3">
                HUB Procédures Logistiques
              </h1>
              <p class="text-xl opacity-90">
                Intranet Moissy-Cramayel
              </p>
            </div>
          </div>
          <div class="text-right" id="hero-counter">
            <div class="text-5xl font-bold">{metiers.reduce((sum, m) => sum + m.processes, 0)}</div>
            <div class="text-sm opacity-75 mt-1">
              Procédures disponibles
            </div>
          </div>
        </div>
        <div class="text-center text-xs opacity-75 mt-4 leading-tight" id="hero-description">
          Accès direct à tous les documents et contacts de l'équipe GXO Moissy-Cramayel
        </div>
      </div>

      {/* Quick Stats */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">Accès rapide</p>
              <p class="text-xl font-bold text-gray-800">En 2 clics</p>
            </div>
            <i class="fas fa-mouse-pointer text-3xl text-orange-500"></i>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">Assistance</p>
              <p class="text-xl font-bold text-gray-800">24h/24</p>
            </div>
            <i class="fas fa-headset text-3xl text-green-500"></i>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">Compatible</p>
              <p class="text-xl font-bold text-gray-800">Mobile</p>
            </div>
            <i class="fas fa-mobile-alt text-3xl text-orange-500"></i>
          </div>
        </div>
      </div>

      {/* Métiers Cards */}
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-briefcase mr-3 text-[#FF5A1A]"></i>
          Sélectionnez votre métier
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metiers.map((metier) => (
            <a href={`/${metier.id}`} class="block">
              <div class={`gxo-card bg-white rounded-lg shadow-lg overflow-hidden border-t-4 ${metier.color.replace('bg-', 'border-')}`}>
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    {metier.id === 'cariste' ? (
                      <div class="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                        <img src="/static/ipl-icon.svg" alt="IPL" class="w-full h-full" />
                      </div>
                    ) : (
                      <div class={`${metier.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl`}>
                        <i class={`fas ${metier.icon}`}></i>
                      </div>
                    )}
                    <span class="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {metier.processes} process
                    </span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-800 mb-2">
                    {metier.title}
                  </h3>
                  
                  <p class="text-gray-600 text-sm mb-4">
                    {metier.description}
                  </p>
                  
                  <div class="flex items-center justify-between">
                    <span class={`text-sm font-semibold ${metier.color.replace('bg-', 'text-')}`}>
                      Voir les procédures
                    </span>
                    <i class="fas fa-arrow-right text-gray-400"></i>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Access Section */}
      <div class="mt-12 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl p-8 border-t-4 border-[#FF5A1A]">
        <h2 class="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <i class="fas fa-bolt mr-3 text-yellow-500"></i>
          Accès rapide
        </h2>
        <p class="text-gray-600 text-sm mb-6">Les raccourcis les plus utilisés par l'équipe</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nouvel Arrivant - Questionnaire Intelligent */}
          <a href="/nouveau" class="group block bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-pink-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <span class="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">NOUVEAU</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Nouvel Arrivant</h3>
            <p class="text-gray-600 text-xs mb-2">Questionnaire intelligent pour formations personnalisées</p>
            <div class="flex items-center text-pink-600 text-sm font-semibold">
              <span>Démarrer →</span>
            </div>
          </a>

          {/* Réception Standard */}
          <a href="/reception#reception-standard" class="group block bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-orange-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-orange-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-truck-loading"></i>
              </div>
              <span class="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">29 docs</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Réception Standard</h3>
            <p class="text-gray-600 text-xs mb-2">Procédures de réception et déchargement marchandises</p>
            <div class="flex items-center text-orange-600 text-sm font-semibold">
              <span>Accéder →</span>
            </div>
          </a>

          {/* Anomalies & FAQ */}
          <a href="/anomalies" class="group block bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-red-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-red-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <span class="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">20 docs</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Anomalies & FAQ</h3>
            <p class="text-gray-600 text-xs mb-2">Gestion incidents, litiges et arbres de décision</p>
            <div class="flex items-center text-red-600 text-sm font-semibold">
              <span>Résoudre →</span>
            </div>
          </a>

          {/* Contacts */}
          <a href="/contacts" class="group block bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-indigo-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-indigo-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-address-book"></i>
              </div>
              <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">20 contacts</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Annuaire</h3>
            <p class="text-gray-600 text-xs mb-2">Contacts de l'équipe : expédition, retours, litiges...</p>
            <div class="flex items-center text-indigo-600 text-sm font-semibold">
              <span>Contacter →</span>
            </div>
          </a>

          {/* Agent de Quai */}
          <a href="/agent-quai" class="group block bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-yellow-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-yellow-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-hard-hat"></i>
              </div>
              <span class="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">6 docs</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Agent de Quai</h3>
            <p class="text-gray-600 text-xs mb-2">Opérations de déchargement et contrôle quai</p>
            <div class="flex items-center text-yellow-600 text-sm font-semibold">
              <span>Voir →</span>
            </div>
          </a>

          {/* Contrôleur Qualité */}
          <a href="/controleur" class="group block bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-green-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-green-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-user-check"></i>
              </div>
              <span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">5 docs</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Contrôleur</h3>
            <p class="text-gray-600 text-xs mb-2">Contrôle qualité et conformité réception</p>
            <div class="flex items-center text-green-600 text-sm font-semibold">
              <span>Contrôler →</span>
            </div>
          </a>

          {/* Bibliothèque */}
          <a href="/bibliotheque" class="group block bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-purple-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-purple-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-book"></i>
              </div>
              <span class="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">34 docs</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Bibliothèque</h3>
            <p class="text-gray-600 text-xs mb-2">Tous les documents et procédures centralisés</p>
            <div class="flex items-center text-purple-600 text-sm font-semibold">
              <span>Explorer →</span>
            </div>
          </a>

          {/* Accueil Chauffeur */}
          <a href="/accueil-chauffeur" class="group block bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-blue-200">
            <div class="flex items-start justify-between mb-3">
              <div class="bg-blue-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fas fa-truck"></i>
              </div>
              <span class="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">4 docs</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1 text-lg">Accueil Chauffeur</h3>
            <p class="text-gray-600 text-xs mb-2">Procédures d'arrivée et livraison chauffeurs</p>
            <div class="flex items-center text-blue-600 text-sm font-semibold">
              <span>Accueillir →</span>
            </div>
          </a>
        </div>
      </div>

      {/* Documents Section */}
      <div class="mt-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-folder-open mr-3 text-gray-600"></i>
          Ressources & Documents
        </h2>
        <div class="flex flex-wrap gap-4">
          <a href="/bibliotheque" class="inline-block bg-[#FF5A1A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E53D00] transition-colors">
            <i class="fas fa-book mr-2"></i>
            Bibliothèque de documents (34)
          </a>
          <a href="/contacts" class="inline-block bg-[#FF4500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF5A1A] transition-colors">
            <i class="fas fa-address-book mr-2"></i>
            Annuaire des contacts (20)
          </a>
        </div>
      </div>
    </div>
  )
}
