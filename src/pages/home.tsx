export function HomePage() {
  const metiers = [
    {
      id: 'reception',
      title: 'Réception',
      icon: 'fa-truck-loading',
      color: 'bg-blue-500',
      description: 'Réception marchandises, contrôle BL, déchargement',
      processes: 29
    },
    {
      id: 'cariste',
      title: 'IPL',
      icon: 'fa-forklift',
      color: 'bg-green-500',
      description: 'Gestion des tâches, affectation, priorisation',
      processes: 7
    },
    {
      id: 'manutention',
      title: 'Préparation',
      icon: 'fa-dolly',
      color: 'bg-purple-500',
      description: 'Préparation commandes, prélèvement, montage rolls',
      processes: 5
    },
    {
      id: 'retours',
      title: 'Retours',
      icon: 'fa-undo-alt',
      color: 'bg-yellow-500',
      description: 'Gestion retours, collecte déchets, transferts',
      processes: 3
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
      <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white rounded-lg shadow-xl p-8 mb-8 relative overflow-hidden">
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
              <rect x="0" y="20" width="60" height="30" fill="#FF6B35" opacity="0.9"/>
              {/* Cabin */}
              <rect x="35" y="5" width="25" height="15" fill="#FF6B35" opacity="0.9"/>
              {/* Wheels */}
              <circle cx="15" cy="55" r="8" fill="currentColor"/>
              <circle cx="50" cy="55" r="8" fill="currentColor"/>
              {/* Fork */}
              <rect x="-15" y="25" width="10" height="30" fill="currentColor" opacity="0.8"/>
              {/* Mast */}
              <rect x="-5" y="-20" width="5" height="45" fill="currentColor" opacity="0.7"/>
            </g>
            
            {/* Pallets */}
            <rect x="60" y="90" width="15" height="20" fill="#FF6B35" opacity="0.7"/>
            <rect x="80" y="90" width="15" height="20" fill="#FF6B35" opacity="0.5"/>
            <rect x="160" y="140" width="15" height="20" fill="#FF6B35" opacity="0.6"/>
          </svg>
        </div>
        
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-start space-x-6">
            <img src="/static/gxo-logo.svg" alt="GXO Logistics" class="h-16 mt-2" id="hero-logo" />
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
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">Accès rapide</p>
              <p class="text-xl font-bold text-gray-800">En 2 clics</p>
            </div>
            <i class="fas fa-mouse-pointer text-3xl text-blue-500"></i>
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
          <i class="fas fa-briefcase mr-3 text-[#003DA5]"></i>
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
      <div class="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-bolt mr-3 text-yellow-500"></i>
          Accès rapide
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/reception#reception-standard" class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <i class="fas fa-truck text-blue-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Réception standard</span>
          </a>
          
          <a href="/cariste#relancer-tache" class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <i class="fas fa-tasks text-green-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Affectation tâche IPL</span>
          </a>
          
          <a href="/anomalies#retour-fournisseur" class="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <i class="fas fa-undo text-red-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Retour fournisseur</span>
          </a>
          
          <a href="/contacts" class="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            <i class="fas fa-address-book text-indigo-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Annuaire Contacts</span>
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
          <a href="/bibliotheque" class="inline-block bg-[#003DA5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0052CC] transition-colors">
            <i class="fas fa-book mr-2"></i>
            Bibliothèque de documents (34)
          </a>
          <a href="/contacts" class="inline-block bg-[#00205B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003DA5] transition-colors">
            <i class="fas fa-address-book mr-2"></i>
            Annuaire des contacts (20)
          </a>
        </div>
      </div>
    </div>
  )
}
