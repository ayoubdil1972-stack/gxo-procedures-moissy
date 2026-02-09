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
          <div class="flex items-center flex-1">
            <i class="fas ${formation.icon} text-${formation.color}-500 text-2xl mr-3"></i>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-bold text-gray-800">${formation.title}</h4>
                ${formation.difficultyLabel ? `<span class="${formation.difficultyBadge} text-white text-xs px-2 py-1 rounded-full">${formation.difficultyStars} ${formation.difficultyLabel}</span>` : ''}
              </div>
              <p class="text-sm text-gray-600">${formation.description}</p>
            </div>
          </div>
          ${priorityBadges[formation.priority]}
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center text-sm text-gray-600">
            <i class="fas fa-clock mr-1"></i>
            <span>Durée : ${formation.duration}</span>
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
  
  // Définition des formations par poste avec niveau de difficulté (1=facile, 5=difficile)
  const formationsParPoste = {
    'reception': [
      { title: 'Sécurité de base', description: 'EPI, gestes et postures, règles de sécurité', duration: '2h', difficulty: 1, icon: 'fa-shield-alt', color: 'red' },
      { title: 'Accueil camions', description: 'Procédure d\'accueil et vérification documents', duration: '1h', difficulty: 1, icon: 'fa-truck', color: 'blue' },
      { title: 'Terminal RF débutant', description: 'Utilisation basique du terminal RF', duration: '2h', difficulty: 2, icon: 'fa-mobile-alt', color: 'green' },
      { title: 'Déchargement marchandises', description: 'Techniques de déchargement sécurisé', duration: '3h', difficulty: 2, icon: 'fa-boxes', color: 'orange' },
      { title: 'Contrôle quantitatif', description: 'Vérification quantités et références', duration: '2h', difficulty: 2, icon: 'fa-calculator', color: 'blue' },
      { title: 'SAP Goods Receipt', description: 'Enregistrement réception dans SAP', duration: '4h', difficulty: 3, icon: 'fa-desktop', color: 'indigo' },
      { title: 'Contrôle qualitatif', description: 'Inspection qualité et gestion non-conformités', duration: '3h', difficulty: 3, icon: 'fa-clipboard-check', color: 'purple' },
      { title: 'Gestion litiges fournisseurs', description: 'Traitement réclamations et litiges', duration: '2h', difficulty: 4, icon: 'fa-exclamation-triangle', color: 'yellow' },
      { title: 'Procédures douanières', description: 'Import/export et documents douaniers', duration: '4h', difficulty: 5, icon: 'fa-passport', color: 'red' }
    ],
    'agent-quai': [
      { title: 'Sécurité quai', description: 'Sécurité spécifique zones de quai', duration: '2h', difficulty: 1, icon: 'fa-hard-hat', color: 'red' },
      { title: 'Utilisation transpalette', description: 'Conduite transpalette manuel et électrique', duration: '1h', difficulty: 1, icon: 'fa-dolly', color: 'yellow' },
      { title: 'Chargement camions', description: 'Techniques de chargement optimisé', duration: '2h', difficulty: 2, icon: 'fa-truck-loading', color: 'orange' },
      { title: 'Terminal RF opérations', description: 'Utilisation RF pour opérations de quai', duration: '2h', difficulty: 2, icon: 'fa-mobile-alt', color: 'green' },
      { title: 'CACES R489 cat. 1A/1B', description: 'Certification transpalettes à conducteur porté', duration: '2 jours', difficulty: 3, icon: 'fa-certificate', color: 'blue' },
      { title: 'Gestion palettes', description: 'Organisation et gestion stock palettes', duration: '2h', difficulty: 3, icon: 'fa-layer-group', color: 'indigo' },
      { title: 'CACES R489 cat. 3', description: 'Certification chariots élévateurs', duration: '3 jours', difficulty: 4, icon: 'fa-forklift', color: 'orange' },
      { title: 'Optimisation flux', description: 'Organisation flux et réduction temps morts', duration: '3h', difficulty: 5, icon: 'fa-stream', color: 'purple' }
    ],
    'controleur': [
      { title: 'Sécurité contrôle', description: 'Sécurité lors des contrôles qualité', duration: '1h', difficulty: 1, icon: 'fa-shield-alt', color: 'red' },
      { title: 'Standards qualité', description: 'Normes et standards qualité GXO', duration: '2h', difficulty: 2, icon: 'fa-star', color: 'yellow' },
      { title: 'Outils de contrôle', description: 'Utilisation équipements de mesure', duration: '2h', difficulty: 2, icon: 'fa-ruler', color: 'blue' },
      { title: 'Terminal RF contrôle', description: 'Enregistrement contrôles dans le système', duration: '2h', difficulty: 2, icon: 'fa-mobile-alt', color: 'green' },
      { title: 'SAP Quality Management', description: 'Module QM de SAP pour traçabilité', duration: '4h', difficulty: 3, icon: 'fa-desktop', color: 'indigo' },
      { title: 'Gestion non-conformités', description: 'Procédures de traitement NC et CAPA', duration: '3h', difficulty: 4, icon: 'fa-exclamation-circle', color: 'orange' },
      { title: 'Audit qualité', description: 'Réalisation audits internes et fournisseurs', duration: '1 jour', difficulty: 5, icon: 'fa-clipboard-list', color: 'purple' }
    ],
    'administrateur': [
      { title: 'Outils bureautiques', description: 'Word, Excel, PowerPoint niveau base', duration: '2h', difficulty: 1, icon: 'fa-laptop', color: 'blue' },
      { title: 'Organisation administrative', description: 'Classement, archivage, gestion documents', duration: '2h', difficulty: 1, icon: 'fa-folder', color: 'yellow' },
      { title: 'Communication interne', description: 'Rédaction emails, notes de service', duration: '2h', difficulty: 2, icon: 'fa-envelope', color: 'green' },
      { title: 'SAP MM/WM base', description: 'Transactions de base SAP logistique', duration: '4h', difficulty: 3, icon: 'fa-desktop', color: 'indigo' },
      { title: 'Excel avancé', description: 'TCD, formules complexes, macros', duration: '1 jour', difficulty: 3, icon: 'fa-table', color: 'green' },
      { title: 'Reporting KPI', description: 'Création tableaux de bord et indicateurs', duration: '3h', difficulty: 4, icon: 'fa-chart-line', color: 'purple' },
      { title: 'Gestion budgétaire', description: 'Suivi budget, analyse écarts, prévisions', duration: '1 jour', difficulty: 5, icon: 'fa-euro-sign', color: 'red' }
    ],
    'accueil-chauffeur': [
      { title: 'Procédure accueil', description: 'Accueil chauffeurs et enregistrement', duration: '1h', difficulty: 1, icon: 'fa-handshake', color: 'blue' },
      { title: 'Sécurité chauffeurs', description: 'Consignes sécurité et règles du site', duration: '1h', difficulty: 1, icon: 'fa-shield-alt', color: 'red' },
      { title: 'Portail Action', description: 'Utilisation système de gestion RDV', duration: '2h', difficulty: 2, icon: 'fa-calendar-check', color: 'green' },
      { title: 'Gestion conflits', description: 'Communication difficile et résolution conflits', duration: '3h', difficulty: 3, icon: 'fa-comments', color: 'orange' },
      { title: 'Documents transport', description: 'CMR, bons de livraison, douane', duration: '3h', difficulty: 4, icon: 'fa-file-alt', color: 'indigo' },
      { title: 'Planification livraisons', description: 'Optimisation planning et gestion slots', duration: '4h', difficulty: 4, icon: 'fa-clock', color: 'purple' }
    ],
    'autre': [
      { title: 'Sécurité générale', description: 'Formation sécurité obligatoire', duration: '2h', difficulty: 1, icon: 'fa-shield-alt', color: 'red' },
      { title: 'Procédures GXO', description: 'Présentation organisation et procédures', duration: '3h', difficulty: 1, icon: 'fa-building', color: 'blue' },
      { title: 'Outils informatiques', description: 'Messagerie, intranet, outils collaboratifs', duration: '2h', difficulty: 2, icon: 'fa-laptop', color: 'green' }
    ]
  };

  // Récupérer les formations pour le poste sélectionné
  let formationsPoste = formationsParPoste[selectedPoste] || formationsParPoste['autre'];
  
  // Filtrer selon les compétences déjà possédées
  formationsPoste = formationsPoste.filter(formation => {
    // Si la formation concerne une compétence déjà maîtrisée, la retirer
    if (formation.title.includes('SAP') && selectedCompetences.includes('sap')) return false;
    if (formation.title.includes('Terminal RF') && selectedCompetences.includes('rf')) return false;
    if (formation.title.includes('CACES') && selectedCompetences.includes('caces')) return false;
    if (formation.title.includes('Contrôle') && formation.title.includes('qualité') && selectedCompetences.includes('controle')) return false;
    if (formation.title.includes('administratif') && selectedCompetences.includes('admin')) return false;
    if (formation.title.includes('Sécurité') && selectedCompetences.includes('securite')) return false;
    return true;
  });

  // Adapter selon l'expérience
  let formationsAdaptees = [];
  
  if (selectedExperience === 'aucune') {
    // Débutant complet : TOUTES les formations, triées du plus facile au plus difficile
    formationsAdaptees = formationsPoste.sort((a, b) => a.difficulty - b.difficulty);
  } else if (selectedExperience === 'debutant') {
    // Débutant avec quelques bases : formations faciles et moyennes (difficultés 1-3)
    formationsAdaptees = formationsPoste
      .filter(f => f.difficulty <= 3)
      .sort((a, b) => a.difficulty - b.difficulty);
  } else if (selectedExperience === 'intermediaire') {
    // Intermédiaire : formations moyennes et avancées (difficultés 2-4)
    formationsAdaptees = formationsPoste
      .filter(f => f.difficulty >= 2 && f.difficulty <= 4)
      .sort((a, b) => a.difficulty - b.difficulty);
  } else if (selectedExperience === 'experimente') {
    // Expérimenté : UNIQUEMENT les formations difficiles (difficultés 4-5), triées du plus difficile au plus facile
    formationsAdaptees = formationsPoste
      .filter(f => f.difficulty >= 4)
      .sort((a, b) => b.difficulty - a.difficulty); // Tri inversé pour les experts
  }

  // Convertir en format attendu avec niveau de difficulté visible
  const difficultyLabels = {
    1: { label: 'Débutant', badge: 'bg-green-500', icon: '⭐' },
    2: { label: 'Facile', badge: 'bg-blue-500', icon: '⭐⭐' },
    3: { label: 'Moyen', badge: 'bg-yellow-500', icon: '⭐⭐⭐' },
    4: { label: 'Avancé', badge: 'bg-orange-500', icon: '⭐⭐⭐⭐' },
    5: { label: 'Expert', badge: 'bg-red-500', icon: '⭐⭐⭐⭐⭐' }
  };

  formations.push(...formationsAdaptees.map(f => {
    const diffInfo = difficultyLabels[f.difficulty];
    return {
      priority: f.difficulty <= 2 ? 'essentiel' : (f.difficulty <= 3 ? 'recommande' : 'optionnel'),
      title: f.title,
      description: f.description,
      duration: f.duration,
      difficulty: f.difficulty,
      difficultyLabel: diffInfo.label,
      difficultyBadge: diffInfo.badge,
      difficultyStars: diffInfo.icon,
      icon: f.icon,
      color: f.color,
      link: getLinkForFormation(f.title)
    };
  }));

  return formations;
}

// Fonction helper pour obtenir le lien adapté
function getLinkForFormation(title) {
  if (title.includes('SAP') || title.includes('Terminal RF')) return '/bibliotheque';
  if (title.includes('Sécurité')) return '/anomalies';
  if (title.includes('CACES')) return '/contacts';
  if (title.includes('Contrôle')) return '/controleur';
  if (title.includes('Réception') || title.includes('Accueil')) return '/reception';
  if (title.includes('Quai') || title.includes('Chargement')) return '/agent-quai';
  if (title.includes('Administratif') || title.includes('Excel')) return '/administrateur';
  if (title.includes('Chauffeur')) return '/accueil-chauffeur';
  return '/bibliotheque';
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
