// Système de questionnaire intelligent pour l'onboarding
// GXO Procedures Moissy-Cramayel

// Parcours d'onboarding selon la situation
const onboardingPaths = {
  'nouveau': {
    title: 'Nouvelle intégration',
    icon: 'fa-user-plus',
    color: 'blue',
    priority: ['securite', 'epi', 'site', 'outils', 'contacts', 'metier'],
    message: 'Bienvenue chez GXO ! Commençons par l\'essentiel pour votre sécurité et votre intégration.',
    steps: [
      { title: 'Sécurité et EPI', duration: '30 min', essential: true },
      { title: 'Visite du site', duration: '45 min', essential: true },
      { title: 'Outils informatiques', duration: '30 min', essential: true },
      { title: 'Formation métier', duration: 'Selon métier', essential: true },
      { title: 'Contacts clés', duration: '15 min', essential: false }
    ]
  },
  'changement-poste': {
    title: 'Changement de poste',
    icon: 'fa-exchange-alt',
    color: 'green',
    priority: ['metier', 'outils', 'securite'],
    message: 'Vous connaissez déjà GXO, concentrons-nous sur votre nouveau métier.',
    steps: [
      { title: 'Formation nouveau métier', duration: 'Selon métier', essential: true },
      { title: 'Outils spécifiques', duration: '20 min', essential: true },
      { title: 'Procédures de sécurité spécifiques', duration: '15 min', essential: false },
      { title: 'Nouveaux contacts', duration: '10 min', essential: false }
    ]
  },
  'changement-site': {
    title: 'Changement de site',
    icon: 'fa-building',
    color: 'orange',
    priority: ['site', 'contacts', 'outils'],
    message: 'Bienvenue à Moissy-Cramayel ! Découvrons les spécificités de ce site.',
    steps: [
      { title: 'Visite du site de Moissy', duration: '30 min', essential: true },
      { title: 'Procédures locales', duration: '20 min', essential: true },
      { title: 'Contacts du site', duration: '15 min', essential: true },
      { title: 'Outils et systèmes locaux', duration: '15 min', essential: false }
    ]
  },
  'retour-conge': {
    title: 'Retour après absence',
    icon: 'fa-calendar-check',
    color: 'purple',
    priority: ['outils', 'metier', 'contacts'],
    message: 'Bon retour parmi nous ! Voici ce qui a évolué pendant votre absence.',
    steps: [
      { title: 'Mise à jour des procédures', duration: '20 min', essential: true },
      { title: 'Nouvelles procédures', duration: '15 min', essential: false },
      { title: 'Changements d\'organisation', duration: '10 min', essential: false },
      { title: 'Rappel outils', duration: '10 min', essential: false }
    ]
  },
  'interim': {
    title: 'Intérimaire / CDD',
    icon: 'fa-clock',
    color: 'yellow',
    priority: ['securite', 'epi', 'metier', 'contacts'],
    message: 'Bienvenue pour votre mission ! Concentrons-nous sur l\'essentiel opérationnel.',
    steps: [
      { title: 'Sécurité et EPI (OBLIGATOIRE)', duration: '20 min', essential: true },
      { title: 'Formation métier express', duration: '30 min', essential: true },
      { title: 'Contacts essentiels', duration: '10 min', essential: true },
      { title: 'Consignes spécifiques', duration: '15 min', essential: false }
    ]
  },
  'formation': {
    title: 'Formation / Montée en compétence',
    icon: 'fa-graduation-cap',
    color: 'indigo',
    priority: ['metier'],
    message: 'Excellente initiative ! Choisissez le métier ou processus que vous souhaitez apprendre.',
    steps: [
      { title: 'Formation théorique', duration: 'Selon processus', essential: true },
      { title: 'Formation pratique', duration: 'Selon processus', essential: true },
      { title: 'Suivi terrain', duration: '1-2 semaines', essential: false }
    ]
  }
};

// Recommandations par métier
const metierPaths = {
  'reception': {
    title: 'Réception',
    procedures: [
      { id: 'reception-standard', title: 'Réception palette fournisseur', priority: 'high', url: '/reception#reception-standard' },
      { id: 'dechargement', title: 'Déchargement camion', priority: 'high', url: '/reception#dechargement' },
      { id: 'etiquette', title: 'Rééditer une étiquette', priority: 'medium', url: '/reception#etiquette' },
      { id: 'verification-dossier', title: 'Vérification dossier', priority: 'high', url: '/reception#verification-dossier' }
    ],
    documents: ['Manuel EWM Goods Receipt', 'Assigner camion à quai'],
    formation: '2-3 jours avec tuteur'
  },
  'ipl': {
    title: 'IPL (Cariste)',
    procedures: [
      { id: 'affectation-tache', title: 'Affectation tâche', priority: 'high', url: '/cariste#affectation-tache' },
      { id: 'mise-en-stock', title: 'Mise en stock', priority: 'high', url: '/cariste#mise-en-stock' },
      { id: 'charger-batterie', title: 'Changement batterie', priority: 'medium', url: '/reception#charger-batterie' }
    ],
    documents: ['Checklists IPL', 'Procédures sécurité chariot'],
    formation: '3-5 jours avec CACES requis'
  },
  'preparation': {
    title: 'Préparation',
    procedures: [
      { id: 'preparation-commande', title: 'Préparation commande standard', priority: 'high', url: '/manutention#preparation-commande' },
      { id: 'montage-roll', title: 'Montage roll', priority: 'high', url: '/manutention#montage-roll' }
    ],
    documents: ['Procédures préparation', 'Checklists qualité'],
    formation: '1-2 jours'
  },
  'retours': {
    title: 'Retours',
    procedures: [
      { id: 'retour-fournisseur', title: 'Retour fournisseur', priority: 'high', url: '/anomalies#retour-fournisseur' },
      { id: 'collecte-dechets', title: 'Collecte déchets', priority: 'medium', url: '/retours#collecte-dechets' }
    ],
    documents: ['Procédures retours', 'Arbres de décision'],
    formation: '1 jour'
  },
  'admin': {
    title: 'Administratif',
    procedures: [
      { id: 'gestion-planning', title: 'Gestion planning', priority: 'high', url: '/contacts' },
      { id: 'reporting', title: 'Reporting quotidien', priority: 'high', url: '/contacts' }
    ],
    documents: ['Tous les documents'],
    formation: '2-3 jours'
  },
  'chef': {
    title: 'Chef d\'équipe',
    procedures: [
      { id: 'management', title: 'Management équipe', priority: 'high', url: '/contacts' },
      { id: 'reporting-chef', title: 'Reporting chef d\'équipe', priority: 'high', url: '/contacts' }
    ],
    documents: ['Tous les documents', 'Procédures management'],
    formation: '1 semaine'
  }
};

// Fonction principale : afficher le parcours selon la situation
function showOnboardingPath(situation) {
  const path = onboardingPaths[situation];
  if (!path) return;
  
  // Masquer le questionnaire initial
  document.getElementById('onboarding-questionnaire').classList.add('hidden');
  
  // Afficher le résultat
  const resultDiv = document.getElementById('onboarding-result');
  resultDiv.classList.remove('hidden');
  
  // Construire le contenu
  let html = `
    <div class="mb-6 p-4 bg-${path.color}-50 border-l-4 border-${path.color}-500 rounded">
      <div class="flex items-center mb-2">
        <i class="fas ${path.icon} text-${path.color}-600 text-2xl mr-3"></i>
        <h4 class="font-bold text-gray-800 text-lg">${path.title}</h4>
      </div>
      <p class="text-gray-700">${path.message}</p>
    </div>
    
    <div class="mb-6">
      <h4 class="font-bold text-gray-800 mb-3">
        <i class="fas fa-list-check mr-2"></i>
        Étapes de votre parcours :
      </h4>
      <div class="space-y-3">
  `;
  
  path.steps.forEach((step, index) => {
    html += `
      <div class="flex items-start p-3 bg-gray-50 rounded-lg">
        <div class="bg-${path.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
          ${index + 1}
        </div>
        <div class="flex-1">
          <div class="font-semibold text-gray-800">
            ${step.title}
            ${step.essential ? '<span class="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">ESSENTIEL</span>' : ''}
          </div>
          <div class="text-sm text-gray-600">Durée : ${step.duration}</div>
        </div>
      </div>
    `;
  });
  
  html += `
      </div>
    </div>
    
    <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h4 class="font-bold text-gray-800 mb-3">
        <i class="fas fa-arrow-right mr-2 text-indigo-600"></i>
        Prochaine étape
      </h4>
      <p class="text-gray-700 mb-4">
        ${situation === 'formation' || situation === 'changement-poste' 
          ? 'Sélectionnez votre métier pour accéder aux procédures spécifiques.'
          : 'Commencez par les étapes essentielles marquées ci-dessus, puis sélectionnez votre métier.'}
      </p>
      <button onclick="showMetierSelection()" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
        <i class="fas fa-briefcase mr-2"></i>
        Choisir mon métier
      </button>
    </div>
  `;
  
  document.getElementById('onboarding-content').innerHTML = html;
}

// Afficher la sélection de métier
function showMetierSelection() {
  document.getElementById('metier-selection').classList.remove('hidden');
  document.getElementById('metier-selection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Afficher le parcours métier
function showMetierPath(metier) {
  const path = metierPaths[metier];
  if (!path) return;
  
  let html = `
    <div class="bg-white rounded-lg p-6 shadow-md mt-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4">
        <i class="fas fa-route mr-2 text-green-600"></i>
        Parcours formation : ${path.title}
      </h3>
      
      <div class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
        <div class="font-semibold text-gray-800 mb-2">Durée de formation : ${path.formation}</div>
        <div class="text-sm text-gray-600">Formation théorique + pratique terrain avec tuteur</div>
      </div>
      
      <div class="mb-6">
        <h4 class="font-bold text-gray-800 mb-3">
          <i class="fas fa-list-ol mr-2"></i>
          Procédures à maîtriser (par ordre de priorité) :
        </h4>
        <div class="space-y-2">
  `;
  
  path.procedures.forEach((proc, index) => {
    const priorityBadge = proc.priority === 'high' 
      ? '<span class="text-xs bg-red-500 text-white px-2 py-1 rounded ml-2">PRIORITAIRE</span>'
      : '<span class="text-xs bg-orange-400 text-white px-2 py-1 rounded ml-2">SECONDAIRE</span>';
    
    html += `
      <a href="${proc.url}" class="flex items-center p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200">
        <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
          ${index + 1}
        </div>
        <div class="flex-1">
          <div class="font-semibold text-gray-800">${proc.title} ${priorityBadge}</div>
        </div>
        <i class="fas fa-arrow-right text-gray-400"></i>
      </a>
    `;
  });
  
  html += `
        </div>
      </div>
      
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="font-bold text-gray-800 mb-2">
          <i class="fas fa-lightbulb mr-2 text-yellow-500"></i>
          Conseil
        </h4>
        <p class="text-gray-700 text-sm">
          Suivez les procédures dans l'ordre indiqué. Les procédures <strong>PRIORITAIRES</strong> sont essentielles pour votre premier jour. 
          Utilisez les checklists interactives pour valider votre apprentissage.
        </p>
      </div>
      
      <div class="mt-4 flex gap-3">
        <a href="/${metier === 'ipl' ? 'cariste' : metier}" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center">
          <i class="fas fa-book-open mr-2"></i>
          Accéder aux procédures ${path.title}
        </a>
        <button onclick="resetOnboarding()" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          <i class="fas fa-redo mr-2"></i>
          Recommencer
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('metier-selection').insertAdjacentHTML('afterend', html);
  
  // Scroll vers le résultat
  setTimeout(() => {
    const newElement = document.getElementById('metier-selection').nextElementSibling;
    newElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// Réinitialiser le questionnaire
function resetOnboarding() {
  // Masquer les résultats
  document.getElementById('onboarding-result').classList.add('hidden');
  document.getElementById('metier-selection').classList.add('hidden');
  
  // Réafficher le questionnaire
  document.getElementById('onboarding-questionnaire').classList.remove('hidden');
  
  // Supprimer les parcours métier dynamiques
  const metierResults = document.querySelectorAll('#metier-selection ~ .bg-white.rounded-lg.p-6.shadow-md');
  metierResults.forEach(el => el.remove());
  
  // Scroll vers le haut
  document.getElementById('onboarding-questionnaire').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
