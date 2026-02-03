export function ManutentionPage() {
  const processes = [
    {
      id: 'dernier-prelevement',
      title: 'Dernier prélèvement (Transaction LT24)',
      icon: 'fa-history',
      duration: '5-8 min',
      level: '🟢',
      vigilance: ['Rentrer le code article correct', 'Sélectionner tous les postes OT', 'Vérifier la date du jour'],
      document: 'Cartons vides Dernier Prelevement_1.docx',
      checklist: [
        'Ouvrir la transaction LT24',
        'Rentrer le code article',
        'Sélectionner tous les postes OT',
        'Sélectionner la mise en forme "GDS"',
        'Pour plus de précisions : cliquer sur "sélections définies par l\'utilisateur"',
        'Cliquer sur "Poste de l\'ordre de transfert"',
        'Cliquer deux fois sur "Date confirmation"',
        'Sélectionner la date du jour',
        'Cliquer sur "Exécuter"',
        'Le dernier préparateur apparaîtra tout en bas du tableau',
        'L\'heure de dernier prélèvement est indiquée sur la première ligne'
      ]
    },
    {
      id: 'ecart-prelevement',
      title: 'Écart premier/dernier prélèvement',
      icon: 'fa-exchange-alt',
      duration: '10-15 min',
      level: '🟡',
      vigilance: ['Utiliser la variante "Colis fait PRP"', 'Copier les numéros SAP corrects', 'Vérifier la date pour les shifts de nuit'],
      document: 'Ecart premier dernier prélèvement_1.docx',
      checklist: [
        'Entrer dans le module LT23 dans SAP',
        'Choisir la variante "Colis fait PRP"',
        'Ajouter l\'actif "utilisateur" (le deuxième de la liste)',
        'Modifier la date si besoin (pour la nuit : date de la 2ème partie du shift)',
        'Copier tous les numéros SAP dans la planif de l\'équipe recherchée',
        'Les coller dans la sélection multiple',
        'Sélect. Valeurs indiv.',
        'Coller le presse-papier avec l\'avant-dernière case',
        'Valider le tout et lancer l\'extraction',
        'Extraire les données avec la touche F9',
        'Format "Texte avec tableurs" puis valider',
        'Sélectionner le nom de fichier approprié'
      ]
    },
    {
      id: 'quai-fictif',
      title: 'Quai fictif - Affichage',
      icon: 'fa-map-signs',
      duration: '2 min',
      level: '🟢',
      vigilance: ['Vérifier le numéro de quai', 'Confirmer la bonne allée', 'Noter les emplacements'],
      document: 'Quai fictif - Affichage_1.docx',
      checklist: [
        'Identifier le quai fictif 91 A',
        'Localiser l\'allée 49',
        'Vérifier les emplacements : 49-016 à 49-028',
        'Confirmer la zone avec le chef d\'équipe'
      ]
    },
    {
      id: 'monteur-rolls',
      title: 'Process Monteur de Rolls',
      icon: 'fa-dolly-flatbed',
      duration: '15-20 min',
      level: '🟢',
      vigilance: ['Vérifier la zone avant de commencer', 'Cocher la case tous les 5 Rolls', 'Changer de secteur chaque semaine'],
      document: 'Process Monteur de Rolls.docx',
      checklist: [
        'Récupérer les feuilles de productivité auprès du référent',
        'Cocher une case chaque fois que vous montez 5 Rolls',
        'Se rendre sur le poste de travail',
        'Vérifier qu\'il n\'y a pas de produit consommé sur la zone',
        'Vérifier que la zone est propre (sinon contacter le chef d\'équipe)',
        'Changement de secteur hebdomadaire (entre cellule 1 et cellule 6)',
        'Récupérer le Rolls plié',
        'Désangler le Rolls des deux côtés',
        'Faire tomber les socles du côté opposé',
        'Monter le Rolls individuellement',
        'Ranger la zone en équipe'
      ]
    },
    {
      id: 'formation-integration',
      title: 'Formation à l\'intégration',
      icon: 'fa-chalkboard-teacher',
      duration: '60-90 min',
      level: '🟡',
      vigilance: ['Document obligatoire pour nouveaux arrivants', 'Concerne tous les postes', 'Peut être réalisé par DS, DEX, REX ou chef d\'équipe'],
      document: 'RHM-0001-1-I Formation à l\'intégration.docx'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-dolly mr-3"></i>
              Préparation
            </h1>
            <p class="text-xl opacity-90">
              Préparation commandes, prélèvement, montage rolls
            </p>
          </div>
          <a href="/" class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Légende niveaux */}
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          <i class="fas fa-info-circle mr-2 text-purple-500"></i>
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
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
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
                {process.checklist ? (
                  <button 
                    onclick={`showChecklistInteractive('${process.id}', ${JSON.stringify(process.checklist)})`}
                    class="gxo-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 flex items-center"
                  >
                    <i class="fas fa-list-check mr-2"></i>
                    Checklist interactive
                  </button>
                ) : null}
                
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
