// Système de questionnaire intelligent pour l'onboarding
// GXO Procedures Moissy-Cramayel - Version 4.7

// Variables globales pour stocker les réponses
let currentSituation = '';
let selectedPoste = '';
let selectedExperience = '';
let selectedCompetences = [];

// Données des métiers
const metiers = {
  'reception': {
    name: 'Réception',
    icon: 'fa-truck-loading',
    color: 'orange',
    formations: ['Formation initiale Réception', 'Utilisation terminal RF', 'SAP Goods Receipt', 'Sécurité quai'],
    procedures: ['/reception']
  },
  'agent-quai': {
    name: 'Agent de Quai',
    icon: 'fa-hard-hat',
    color: 'yellow',
    formations: ['Opérations de quai', 'Sécurité chargement/déchargement', 'Gestion des palettes', 'CACES R489 cat. 3'],
    procedures: ['/agent-quai']
  },
  'controleur': {
    name: 'Contrôleur',
    icon: 'fa-clipboard-check',
    color: 'green',
    formations: ['Contrôle qualité', 'Procédures d\'inspection', 'Gestion des non-conformités', 'Documentation qualité'],
    procedures: ['/controleur']
  },
  'administrateur': {
    name: 'Administrateur',
    icon: 'fa-user-tie',
    color: 'purple',
    formations: ['Gestion administrative', 'SAP MM/WM', 'Reporting et KPI', 'Communication interne'],
    procedures: ['/administrateur']
  },
  'accueil-chauffeur': {
    name: 'Accueil Chauffeur',
    icon: 'fa-truck',
    color: 'blue',
    formations: ['Procédure d\'accueil', 'Gestion des livraisons', 'Sécurité chauffeurs', 'Portail Action'],
    procedures: ['/accueil-chauffeur']
  },
  'autre': {
    name: 'Autre métier',
    icon: 'fa-ellipsis-h',
    color: 'gray',
    formations: ['Formation générale GXO', 'Sécurité', 'Outils informatiques'],
    procedures: ['/']
  }
};

// Données des niveaux d'expérience
const experiences = {
  'aucune': {
    label: 'Aucune expérience',
    formations: ['Formation de base', 'Sécurité obligatoire', 'Gestes et postures', 'Accompagnement renforcé']
  },
  'debutant': {
    label: 'Débutant (moins d\'1 an)',
    formations: ['Consolidation des bases', 'Procédures avancées', 'Autonomie progressive']
  },
  'intermediaire': {
    label: 'Intermédiaire (1-3 ans)',
    formations: ['Perfectionnement', 'Polyvalence', 'Cas complexes']
  },
  'experimente': {
    label: 'Expérimenté (3+ ans)',
    formations: ['Formation de formateur', 'Optimisation des processus', 'Mentorat']
  }
};

// Données des compétences
const competencesData = {
  'sap': { name: 'SAP / S4HANA', icon: 'fa-desktop' },
  'rf': { name: 'Terminal RF / Scanner', icon: 'fa-mobile-alt' },
  'caces': { name: 'CACES', icon: 'fa-forklift' },
  'controle': { name: 'Contrôle qualité', icon: 'fa-clipboard-check' },
  'admin': { name: 'Gestion administrative', icon: 'fa-file-alt' },
  'securite': { name: 'Sécurité / EPI', icon: 'fa-shield-alt' }
};

// Fonction principale : Afficher le questionnaire selon la situation dans un modal
function showSituationQuestionnaire(situation) {
  console.log('🎯 showSituationQuestionnaire appelée avec:', situation);
  
  currentSituation = situation;
  
  // Afficher le modal
  const modal = document.getElementById('questionnaire-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Bloquer le scroll de la page
    console.log('✅ Modal ouvert');
  } else {
    console.error('❌ Modal introuvable !');
    return;
  }
  
  // Mettre à jour le titre selon la situation
  const titles = {
    'nouveau': 'Nouvelle intégration - Définissons votre profil',
    'changement-poste': 'Changement de poste - Votre nouveau rôle',
    'changement-site': 'Changement de site - Adaptation à Moissy',
    'retour-conge': 'Retour après absence - Remise à niveau',
    'interim': 'Intérimaire / CDD - Formation rapide',
    'formation': 'Formation continue - Développement des compétences'
  };
  
  const titleElement = document.getElementById('modal-questionnaire-title');
  if (titleElement) {
    titleElement.textContent = titles[situation] || 'Questionnaire de formation';
  }
  
  // Afficher la première question
  document.getElementById('modal-question-poste').classList.remove('hidden');
  document.getElementById('modal-question-experience').classList.add('hidden');
  document.getElementById('modal-question-competences').classList.add('hidden');
  document.getElementById('modal-formations-recommandees').classList.add('hidden');
  
  // Réinitialiser les réponses
  selectedPoste = '';
  selectedExperience = '';
  selectedCompetences = [];
  
  // Décocher toutes les checkboxes
  document.querySelectorAll('.modal-competence-checkbox').forEach(cb => cb.checked = false);
}

// Fermer le modal
function closeQuestionnaireModal(event) {
  // Si event existe et que c'est un clic sur le backdrop, fermer
  if (event && event.target.id !== 'questionnaire-modal') return;
  
  const modal = document.getElementById('questionnaire-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Réactiver le scroll
    console.log('✅ Modal fermé');
  }
}

// Question 1 : Sélection du poste (version modal)
function selectPosteModal(poste) {
  selectedPoste = poste;
  console.log('✅ Poste sélectionné:', poste);
  
  // Masquer la question 1
  document.getElementById('modal-question-poste').classList.add('hidden');
  
  // Afficher la question 2
  document.getElementById('modal-question-experience').classList.remove('hidden');
}

// Question 2 : Sélection de l'expérience (version modal)
function selectExperienceModal(experience) {
  selectedExperience = experience;
  console.log('✅ Expérience sélectionnée:', experience);
  
  // Masquer la question 2
  document.getElementById('modal-question-experience').classList.add('hidden');
  
  // Afficher la question 3
  document.getElementById('modal-question-competences').classList.remove('hidden');
}

// Question 3 : Validation des compétences (version modal)
function validateCompetencesModal() {
  // Récupérer les compétences cochées
  const checkboxes = document.querySelectorAll('.modal-competence-checkbox:checked');
  selectedCompetences = Array.from(checkboxes).map(cb => cb.value);
  
  console.log('✅ Compétences sélectionnées:', selectedCompetences);
  
  // Masquer la question 3
  document.getElementById('modal-question-competences').classList.add('hidden');
  
  // Afficher les résultats
  showFormationsRecommandeesModal();
}

// Afficher les formations recommandées dans le modal
function showFormationsRecommandeesModal() {
  const resultDiv = document.getElementById('modal-formations-recommandees');
  resultDiv.classList.remove('hidden');
  
  // Mettre à jour le résumé du profil
  const posteNames = {
    'reception': 'Réception',
    'agent-quai': 'Agent de Quai',
    'controleur': 'Contrôleur',
    'administrateur': 'Administrateur',
    'accueil-chauffeur': 'Accueil Chauffeur',
    'autre': 'Autre métier'
  };
  
  const experienceNames = {
    'aucune': 'Aucune',
    'debutant': 'Débutant',
    'intermediaire': 'Intermédiaire',
    'experimente': 'Expérimenté'
  };
  
  document.getElementById('modal-profil-poste').textContent = posteNames[selectedPoste] || selectedPoste;
  document.getElementById('modal-profil-experience').textContent = experienceNames[selectedExperience] || selectedExperience;
  document.getElementById('modal-profil-competences').textContent = selectedCompetences.length + ' compétence(s)';
  
  // Générer les formations recommandées
  const formations = generateFormations();
  const formationsListDiv = document.getElementById('modal-formations-list');
  
  formationsListDiv.innerHTML = formations.map(formation => {
    const priorityBadges = {
      'essentiel': '<span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Essentiel</span>',
      'recommande': '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Recommandé</span>',
      'optionnel': '<span class="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Optionnel</span>'
    };
    
    const colorClasses = {
      'red': 'border-red-500 bg-red-50',
      'orange': 'border-orange-500 bg-orange-50',
      'yellow': 'border-yellow-500 bg-yellow-50',
      'green': 'border-green-500 bg-green-50',
      'blue': 'border-blue-500 bg-blue-50',
      'indigo': 'border-indigo-500 bg-indigo-50',
      'purple': 'border-purple-500 bg-purple-50',
      'gray': 'border-gray-500 bg-gray-50'
    };
    
    return `
      <div class="bg-white rounded-lg p-4 shadow-md border-l-4 ${colorClasses[formation.color]}">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <i class="fas ${formation.icon} text-${formation.color}-500 text-2xl mr-3"></i>
            <div>
              <h4 class="font-bold text-gray-800">${formation.title}</h4>
              <p class="text-sm text-gray-600">${formation.description}</p>
            </div>
          </div>
          ${priorityBadges[formation.priority]}
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center text-sm text-gray-600">
            <i class="fas fa-clock mr-1"></i>
            <span>${formation.duration}</span>
          </div>
          ${formation.link ? `<a href="${formation.link}" class="text-${formation.color}-600 hover:underline text-sm font-semibold">Voir les procédures →</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  console.log('✅ Formations affichées:', formations.length);
}

// Fonction pour générer les formations recommandées
function generateFormations() {
  const formations = [];
  
  // 1. Formations obligatoires de sécurité (toujours en premier)
  if (currentSituation === 'nouveau' || currentSituation === 'interim') {
    formations.push({
      priority: 'essentiel',
      title: 'Sécurité et EPI obligatoires',
      description: 'Formation sécurité, port des EPI, gestes et postures',
      duration: '2 heures',
      icon: 'fa-shield-alt',
      color: 'red',
      link: '/anomalies'
    });
  }
  
  // 2. Formations métier de base
  metier.formations.forEach((formation, index) => {
    const needsFormation = index === 0 || (selectedExperience === 'aucune' || selectedExperience === 'debutant');
    
    if (needsFormation) {
      formations.push({
        priority: index === 0 ? 'essentiel' : 'recommande',
        title: formation,
        description: `Formation spécifique au poste ${metier.name}`,
        duration: '4 heures',
        icon: metier.icon,
        color: metier.color,
        link: metier.procedures[0]
      });
    }
  });
  
  // 3. Formations selon l'expérience
  if (selectedExperience === 'aucune' || selectedExperience === 'debutant') {
    formations.push({
      priority: 'recommande',
      title: 'Accompagnement tuteur',
      description: 'Suivi personnalisé par un tuteur expérimenté',
      duration: '1 semaine',
      icon: 'fa-user-friends',
      color: 'blue',
      link: '/contacts'
    });
  }
  
  if (selectedExperience === 'experimente') {
    formations.push({
      priority: 'optionnel',
      title: 'Formation de formateur',
      description: 'Devenir référent et former les nouveaux collaborateurs',
      duration: '2 jours',
      icon: 'fa-chalkboard-teacher',
      color: 'purple',
      link: '/nouveau'
    });
  }
  
  // 4. Formations selon les compétences manquantes
  const competencesManquantes = [];
  
  if (!selectedCompetences.includes('sap') && ['reception', 'administrateur', 'controleur'].includes(selectedPoste)) {
    competencesManquantes.push({
      priority: 'essentiel',
      title: 'Formation SAP / S4HANA',
      description: 'Utilisation du système de gestion SAP',
      duration: '1 journée',
      icon: 'fa-desktop',
      color: 'indigo',
      link: '/bibliotheque'
    });
  }
  
  if (!selectedCompetences.includes('rf') && ['reception', 'agent-quai', 'controleur'].includes(selectedPoste)) {
    competencesManquantes.push({
      priority: 'essentiel',
      title: 'Terminal RF / Scanner',
      description: 'Maîtrise du terminal RF et des scanners',
      duration: '2 heures',
      icon: 'fa-mobile-alt',
      color: 'green',
      link: '/bibliotheque'
    });
  }
  
  if (!selectedCompetences.includes('caces') && selectedPoste === 'agent-quai') {
    competencesManquantes.push({
      priority: 'essentiel',
      title: 'CACES R489 catégorie 3',
      description: 'Certification obligatoire pour chariot élévateur',
      duration: '3 jours',
      icon: 'fa-forklift',
      color: 'orange',
      link: '/contacts'
    });
  }
  
  formations.push(...competencesManquantes);
  
  // 5. Formation système si changement de site
  if (currentSituation === 'changement-site') {
    formations.push({
      priority: 'recommande',
      title: 'Spécificités du site de Moissy',
      description: 'Procédures locales et organisation du site',
      duration: '1/2 journée',
      icon: 'fa-building',
      color: 'orange',
      link: '/nouveau'
    });
  }
  
  // Trier les formations par priorité
  const priorityOrder = { 'essentiel': 1, 'recommande': 2, 'optionnel': 3 };
  formations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  // Afficher les formations
  formations.forEach((formation) => {
    const priorityBadges = {
      'essentiel': '<span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Essentiel</span>',
      'recommande': '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Recommandé</span>',
      'optionnel': '<span class="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Optionnel</span>'
    };
    
    const colorClasses = {
      'red': 'border-red-500 bg-red-50',
      'orange': 'border-orange-500 bg-orange-50',
      'yellow': 'border-yellow-500 bg-yellow-50',
      'green': 'border-green-500 bg-green-50',
      'blue': 'border-blue-500 bg-blue-50',
      'indigo': 'border-indigo-500 bg-indigo-50',
      'purple': 'border-purple-500 bg-purple-50',
      'gray': 'border-gray-500 bg-gray-50'
    };
    
    const formationCard = `
      <div class="bg-white rounded-lg p-4 shadow-md border-l-4 ${colorClasses[formation.color]}">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <i class="fas ${formation.icon} text-${formation.color}-500 text-2xl mr-3"></i>
            <div>
              <h4 class="font-bold text-gray-800">${formation.title}</h4>
              <p class="text-sm text-gray-600">${formation.description}</p>
            </div>
          </div>
          ${priorityBadges[formation.priority]}
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center text-sm text-gray-600">
            <i class="fas fa-clock mr-2"></i>
            <span>Durée : ${formation.duration}</span>
          </div>
          <a href="${formation.link}" class="text-${formation.color}-600 hover:text-${formation.color}-700 font-semibold text-sm">
            Voir les procédures <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    `;
    
    formationsList.innerHTML += formationCard;
  });
  
  // Scroll vers les résultats
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Retour à la sélection du métier
function backToMetierSelection() {
  document.getElementById('formation-selection-step').classList.add('hidden');
  document.getElementById('metier-selection-step').classList.remove('hidden');
}

// Réinitialiser le questionnaire
function resetQuestionnaire() {
  // Réinitialiser les variables
  currentSituation = '';
  selectedPoste = '';
  selectedExperience = '';
  selectedCompetences = [];
  
  // Décocher toutes les checkboxes
  document.querySelectorAll('.competence-checkbox').forEach(cb => cb.checked = false);
  
  // Masquer toutes les sections
  document.getElementById('situation-questionnaire').classList.add('hidden');
  document.getElementById('metier-selection-step').classList.add('hidden');
  document.getElementById('formation-selection-step').classList.add('hidden');
  document.getElementById('final-result').classList.add('hidden');
  document.getElementById('formations-recommandees').classList.add('hidden');
  
  // Réafficher la sélection initiale
  document.getElementById('situation-selection').classList.remove('hidden');
  
  // Scroll vers le haut
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fonction héritée pour compatibilité
function resetOnboarding() {
  resetQuestionnaire();
}

// Rendre les fonctions globales immédiatement
window.showSituationQuestionnaire = showSituationQuestionnaire;
window.closeQuestionnaireModal = closeQuestionnaireModal;
window.selectPosteModal = selectPosteModal;
window.selectExperienceModal = selectExperienceModal;
window.validateCompetencesModal = validateCompetencesModal;
window.selectPoste = selectPoste;
window.selectExperience = selectExperience;
window.validateCompetences = validateCompetences;
window.resetQuestionnaire = resetQuestionnaire;
window.resetOnboarding = resetOnboarding;
window.backToMetierSelection = backToMetierSelection;

// Initialisation au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOnboarding);
} else {
  // Le DOM est déjà chargé
  initOnboarding();
}

function initOnboarding() {
  console.log('✅ Onboarding system v4.9 loaded');
  console.log('✅ Fonctions globales enregistrées');
  
  // Attendre un peu pour que le HTML soit complètement injecté
  setTimeout(function() {
    // Test de présence des éléments
    const testElements = [
      'situation-selection',
      'situation-questionnaire',
      'question-poste',
      'question-experience',
      'question-competences',
      'formations-recommandees'
    ];
    
    testElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        console.log(`✅ Element #${id} trouvé`);
      } else {
        console.warn(`⚠️ Element #${id} introuvable`);
      }
    });
  }, 100); // Attendre 100ms
}
