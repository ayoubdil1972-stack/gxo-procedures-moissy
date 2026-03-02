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


    </div>
  )
}
