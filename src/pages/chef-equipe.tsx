export function ChefEquipePage() {
  const processes = [
    {
      id: 'eop-checks',
      title: 'EOP Checks',
      icon: 'fa-clipboard-check',
      duration: '30-45 min',
      level: '🔴',
      vigilance: ['Fichier mensuel à jour', 'Transaction VL06I', 'Layout EOP correct'],
      document: 'EOP checks.docx'
    },
    {
      id: 'extraction-icpe',
      title: 'Extraction ICPE',
      icon: 'fa-file-excel',
      duration: '20-30 min',
      level: '🔴',
      vigilance: ['Tableau ICPE v2', 'Filtrer hazardous', 'Vérifier poids palettes'],
      document: 'EXTRACTION ICPE.docx'
    },
    {
      id: 'creer-conditionnement',
      title: 'Créer conditionnement PRD',
      icon: 'fa-box',
      duration: '10-15 min',
      level: '🟡',
      vigilance: ['Vérifier article dans MAT1', 'Calculer poids correctement', 'Sauvegarder dans ZMM42'],
      document: 'CREATION CONDITTIONNEMENT PRD .docx'
    },
    {
      id: 'creer-packspeck',
      title: 'Créer packspeck',
      icon: 'fa-cubes',
      duration: '10-15 min',
      level: '🟡',
      vigilance: ['Vérifier bon conditionnement', 'Copier ligne 9003', 'Confirmer enregistrement'],
      document: 'Créer packspeck.docx'
    }
  ]

  return (
    <div>
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-user-tie mr-3"></i>
              Chef d'équipe
            </h1>
            <p class="text-xl opacity-90">
              Supervision, reporting, gestion équipe
            </p>
          </div>
          <a href="/" class="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <i class={`fas ${process.icon} text-2xl mr-3`}></i>
                    <h3 class="text-xl font-bold">{process.title}</h3>
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

              <div class="flex flex-wrap gap-2 mt-4">
                <a 
                  href={`/static/documents/${process.document}`}
                  target="_blank"
                  class="gxo-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center"
                >
                  <i class="fas fa-file-download mr-2"></i>
                  Voir le document
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
