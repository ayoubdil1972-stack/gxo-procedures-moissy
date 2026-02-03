export function CaristePage() {
  const processes = [
    {
      id: 'affectation-tache',
      title: 'Affectation de tâche à un cariste dans le LTRMS',
      icon: 'fa-user-check',
      duration: '3-5 min',
      level: '🟢',
      vigilance: ['Ne pas affecter de tâche en bulk', 'Vérifier le code article ou N° OT', 'Confirmer le cariste avant validation'],
      document: 'Affectation de tache a un cariste dans le LTRMS.docx',
      checklist: [
        'Sélectionner la colonne article ou N° OT',
        'Activer le filtre',
        'Renseigner le code article ou le N° OT',
        'Valider',
        'Sélectionner la ligne',
        'Sélectionner (affecter) en haut à gauche',
        'Valider avec oui',
        'Sélectionner la ligne du cariste à qui vous désirez affecter la tâche',
        'Valider avec l\'icône de disquette en bas à droite'
      ]
    },
    {
      id: 'annuler-tache',
      title: 'Annuler une tâche affectée',
      icon: 'fa-times-circle',
      duration: '2-3 min',
      level: '🟢',
      vigilance: ['Vérifier le code article', 'Utiliser l\'icône MÉTHODE', 'Confirmer l\'annulation'],
      document: 'Annuler une tache affecter.docx',
      checklist: [
        'Sélectionner la colonne article',
        'Activer le filtre en haut à gauche',
        'Renseigner le code article',
        'Valider',
        'Sélectionner la ligne',
        'Sélectionner l\'icône MÉTHODE (à droite de PROBLÈME)',
        'Annuler l\'affectation'
      ]
    },
    {
      id: 'priorisation-taches',
      title: 'Priorisation de tâches dans le LTRMS',
      icon: 'fa-sort-amount-up',
      duration: '3-5 min',
      level: '🟡',
      vigilance: ['Ne pas prioriser sans en référer au chef d\'équipe IPL', 'Modifier de +30 à -30', 'Valider avec l\'icône disquette'],
      document: 'Priorisation de taches dans le LTRMS.docx',
      checklist: [
        'ATTENTION : Ne pas prioriser sans en référer au chef d\'équipe IPL',
        'Sélectionner la ou les lignes pour augmenter ou baisser la priorité',
        'Sélectionner l\'icône priorité en haut à gauche',
        'Modifier selon le besoin de +30 à -30',
        'Valider avec l\'icône de disquette en bas à droite'
      ]
    },
    {
      id: 'sortir-tache-ltra',
      title: 'Sortir une tâche du LTRA',
      icon: 'fa-box-open',
      duration: '5-8 min',
      level: '🟡',
      vigilance: ['Utiliser OBJETS DE GESTION', 'Sélectionner TÂCHE PROBLÉMATIQUE', 'Valider pour réapparition'],
      document: 'Sortir une tache du LTRA.docx',
      checklist: [
        'Sélectionner OBJETS DE GESTION',
        'Sélectionner TÂCHE PROBLÉMATIQUES',
        'Sélectionner la colonne article',
        'Activer le filtre',
        'Renseigner le code article',
        'Valider',
        'Sélectionner la ligne',
        'Sélectionner l\'icône MÉTHODE',
        'Sélectionner la fonction VALIDER',
        'La tâche réapparaîtra dans le LTRMS'
      ]
    },
    {
      id: 'visualisation-stocks',
      title: 'Visualisation des stocks LS03N',
      icon: 'fa-boxes',
      duration: '2-3 min',
      level: '🟢',
      vigilance: ['Type de magasin : pick (100,110,115) ou bulk (300)', 'Renseigner l\'emplacement correct', 'Valider avec entrée'],
      document: 'Visualisation des stocks LS03N.docx',
      checklist: [
        'Renseigner le type de magasin :',
        '• Pick : 100, 110, 115',
        '• Bulk : 300',
        'Renseigner l\'emplacement',
        'Valider avec (entrée)',
        'Les articles devant être à l\'emplacement apparaissent dans l\'encadré (stock par emplacement)'
      ]
    },
    {
      id: 'connection-terminal',
      title: 'Connexion / Déconnexion terminal',
      icon: 'fa-sign-in-alt',
      duration: '2 min',
      level: '🟢',
      vigilance: ['Noter le N° d\'appareil', 'Respecter la séquence de déconnexion', 'Écrire EXIT à la fin'],
      document: 'CONNECTION.docx',
      checklist: [
        'CONNEXION :',
        'LOGIN : IPL - -',
        'Entrer le mot de passe',
        'Appuyer sur Entrée',
        'Appuyer sur F1',
        'Appuyer 1 puis Entrée',
        'N° d\'appareil : r-.. (pour le – appuyer func puis 2)',
        'Appuyer sur F1',
        'Appuyer 1 puis Entrée',
        'Appuyer 1 puis Entrée',
        'DÉCONNEXION :',
        'Appuyer F3-F8-01-F8-F8',
        'Flèche du haut pour sélectionner oui',
        'Appuyer sur Entrée',
        'Puis écrire EXIT'
      ]
    },
    {
      id: 'relancer-tache',
      title: 'Relancer tâche cariste',
      icon: 'fa-redo',
      duration: '3-5 min',
      level: '🟢',
      vigilance: ['Entrer numéro HU correct', 'Vérifier OPEN WT', 'Confirmer dest stor bin'],
      document: 'relancer tache cariste.docx',
      checklist: [
        'Entrer le numéro de HU dans le système',
        'Vérifier OPEN WT (si non coché = pas de tâche cariste)',
        'Entrer dans le livret',
        'Whse proc type 1010',
        'Dest stor bin T200 pour palettes normales / T100 direct picking',
        'Dest stor bin T220 pour palettes hazardous / T120 direct picking',
        'Voir message en bas de l\'écran "warehouse task created"',
        'Valider la tâche'
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-forklift mr-3"></i>
              IPL
            </h1>
            <p class="text-xl opacity-90">
              Gestion des tâches, affectation, priorisation
            </p>
          </div>
          <a href="/" class="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Safety Warning */}
      <div class="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8">
        <div class="flex items-start">
          <i class="fas fa-info-circle text-yellow-500 text-2xl mr-4 mt-1"></i>
          <div>
            <h3 class="text-lg font-bold text-yellow-800 mb-2">Consignes importantes</h3>
            <ul class="space-y-1 text-yellow-700">
              <li>• Ne JAMAIS affecter de tâches en bulk</li>
              <li>• Toujours consulter le chef d'équipe IPL avant de prioriser</li>
              <li>• Vérifier les codes articles avant toute action</li>
              <li>• Respecter les procédures de connexion/déconnexion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Légende niveaux */}
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          <i class="fas fa-info-circle mr-2 text-green-500"></i>
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

      {/* Process Cards */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div id={process.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
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
              {/* Points de vigilance */}
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

              {/* Actions */}
              <div class="flex flex-wrap gap-2 mt-4">
                <button 
                  onclick={`showChecklistInteractive('${process.id}', ${JSON.stringify(process.checklist)})`}
                  class="gxo-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 flex items-center"
                >
                  <i class="fas fa-list-check mr-2"></i>
                  Checklist interactive
                </button>
                
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
          </div>
        ))}
      </div>

      {/* Checklist Modal Container */}
      <div id="modal-container" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div id="modal-content"></div>
        </div>
      </div>
    </div>
  )
}
