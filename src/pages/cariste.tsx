export function CaristePage() {
  const processes = [
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
    },
    {
      id: 'mise-en-stock',
      title: 'Mise en stock standard',
      icon: 'fa-warehouse',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Vérifier zone stockage', 'Scanner emplacement', 'Confirmer HU'],
      checklist: [
        'Scanner le code-barres de la palette (HU)',
        'Vérifier l\'écran du terminal - tâche affichée',
        'Se rendre à l\'emplacement indiqué',
        'Vérifier que l\'emplacement est libre',
        'Déposer la palette avec précaution',
        'Scanner le code-barres de l\'emplacement',
        'Confirmer la mise en stock sur le terminal',
        'Vérifier le message de validation'
      ]
    },
    {
      id: 'picking',
      title: 'Picking direct',
      icon: 'fa-hand-holding-box',
      duration: '5-10 min',
      level: '🟢',
      vigilance: ['Vérifier quantité', 'Zone picking correcte', 'Étiquetage clair'],
      checklist: [
        'Récupérer la liste de picking sur le terminal',
        'Se rendre à l\'emplacement indiqué',
        'Vérifier le code article sur l\'étiquette',
        'Scanner le HU à prélever',
        'Saisir ou confirmer la quantité',
        'Déplacer vers la zone de préparation',
        'Scanner l\'emplacement de destination',
        'Valider le picking sur le terminal'
      ]
    },
    {
      id: 'deplacer-palette',
      title: 'Déplacer une palette',
      icon: 'fa-arrows-alt',
      duration: '5-8 min',
      level: '🟢',
      vigilance: ['Vérifier stabilité', 'Respecter hauteur max', 'Zone autorisée'],
      checklist: [
        'Recevoir l\'ordre de déplacement',
        'Se rendre à l\'emplacement source',
        'Scanner le HU de la palette',
        'Vérifier la stabilité de la palette',
        'Lever la palette avec précaution',
        'Se déplacer vers l\'emplacement destination',
        'Vérifier que l\'emplacement est correct et libre',
        'Déposer la palette',
        'Scanner l\'emplacement destination',
        'Confirmer le déplacement'
      ]
    },
    {
      id: 'palette-hazardous',
      title: 'Manutention palette hazardous',
      icon: 'fa-exclamation-triangle',
      duration: '15-20 min',
      level: '🔴',
      vigilance: ['EPI obligatoires', 'Zone hazardous uniquement', 'Signalétique visible'],
      checklist: [
        'STOP - Vérifier que vous avez les EPI nécessaires',
        'Vérifier la signalétique hazardous sur la palette',
        'Scanner le HU avec précaution',
        'Vérifier zone destination = T220 ou T120 UNIQUEMENT',
        'Ne PAS mélanger avec palettes normales',
        'Manipuler avec précaution accrue',
        'Déposer dans la zone hazardous désignée',
        'Scanner l\'emplacement hazardous',
        'Confirmer et signaler si anomalie',
        'Laver les mains après manipulation'
      ]
    },
    {
      id: 'inventaire',
      title: 'Inventaire tournant',
      icon: 'fa-clipboard-list',
      duration: '20-30 min',
      level: '🟡',
      vigilance: ['Compter avec précision', 'Vérifier références', 'Signaler écarts'],
      checklist: [
        'Récupérer la liste d\'inventaire du jour',
        'Se rendre à la première zone à inventorier',
        'Scanner le code zone',
        'Compter physiquement toutes les palettes',
        'Pour chaque palette : scanner le HU',
        'Saisir la quantité comptée',
        'Vérifier les références articles',
        'Signaler immédiatement tout écart > 5%',
        'Passer à la zone suivante',
        'Valider l\'inventaire complet'
      ]
    },
    {
      id: 'charger-batterie',
      title: 'Changement/Charge batterie',
      icon: 'fa-battery-three-quarters',
      duration: '10-15 min',
      level: '🟢',
      vigilance: ['Sécurité électrique', 'Niveau charge > 20%', 'Brancher correctement'],
      checklist: [
        'Surveiller le niveau de batterie du chariot',
        'Si niveau < 20% → aller à la zone de charge',
        'Stationner le chariot sur zone de charge',
        'Couper le contact du chariot',
        'Ouvrir le compartiment batterie',
        'Débrancher les câbles (respecter l\'ordre)',
        'Soulever la batterie avec le palan',
        'Installer la batterie chargée',
        'Brancher les câbles (respecter polarité)',
        'Vérifier le voyant de charge',
        'Refermer le compartiment',
        'Tester le chariot'
      ]
    },
    {
      id: 'anomalie-palette',
      title: 'Signaler anomalie palette',
      icon: 'fa-flag',
      duration: '5-10 min',
      level: '🟢',
      vigilance: ['Photo obligatoire', 'Mettre en quarantaine', 'Signaler immédiatement'],
      checklist: [
        'STOP - Ne pas ranger la palette',
        'Prendre une photo claire de l\'anomalie',
        'Noter le numéro HU de la palette',
        'Déplacer vers zone QUARANTAINE',
        'Scanner HU + zone quarantaine',
        'Ouvrir le formulaire anomalie sur le terminal',
        'Sélectionner le type d\'anomalie',
        'Joindre la photo',
        'Ajouter un commentaire descriptif',
        'Valider et envoyer',
        'Informer le chef d\'équipe verbalement'
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
              Cariste
            </h1>
            <p class="text-xl opacity-90">
              Manutention, rangement, picking
            </p>
          </div>
          <a href="/" class="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Safety Warning */}
      <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
        <div class="flex items-start">
          <i class="fas fa-exclamation-triangle text-red-500 text-2xl mr-4 mt-1"></i>
          <div>
            <h3 class="text-lg font-bold text-red-800 mb-2">Consignes de sécurité</h3>
            <ul class="space-y-1 text-red-700">
              <li>• Port du casque et chaussures de sécurité OBLIGATOIRE</li>
              <li>• Respecter les limitations de vitesse (10 km/h en entrepôt)</li>
              <li>• Klaxonner aux intersections et portes</li>
              <li>• Ne jamais transporter de personnes sur le chariot</li>
              <li>• Vérifier la stabilité de la charge avant de lever</li>
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
