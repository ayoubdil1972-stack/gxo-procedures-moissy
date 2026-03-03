// Système d'onglets pour basculer entre Chauffeurs et Quais
// Gère l'affichage et les statistiques des deux sections

let currentTab = 'chauffeurs' // Onglet actif par défaut

// ===== GESTION DES ONGLETS =====

function switchTab(tab) {
  currentTab = tab
  
  // Mettre à jour l'apparence des boutons d'onglets
  const tabChauffeurs = document.getElementById('tab-chauffeurs')
  const tabQuais = document.getElementById('tab-quais')
  const contentChauffeurs = document.getElementById('content-chauffeurs')
  const contentQuais = document.getElementById('content-quais')
  
  if (tab === 'chauffeurs') {
    // Activer onglet Chauffeurs
    tabChauffeurs.className = 'flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-3'
    tabQuais.className = 'flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl shadow-lg hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center space-x-3'
    
    // Afficher contenu Chauffeurs
    contentChauffeurs.classList.remove('hidden')
    contentQuais.classList.add('hidden')
    
    // Charger les données si besoin
    if (typeof loadChauffeursData === 'function') {
      loadChauffeursData()
    }
  } else if (tab === 'quais') {
    // Activer onglet Quais
    tabQuais.className = 'flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-3'
    tabChauffeurs.className = 'flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl shadow-lg hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center justify-center space-x-3'
    
    // Afficher contenu Quais
    contentQuais.classList.remove('hidden')
    contentChauffeurs.classList.add('hidden')
    
    // Charger les données si besoin
    if (typeof loadQuais === 'function') {
      loadQuais()
    }
  }
}

// ===== MISE À JOUR DES STATISTIQUES DES ONGLETS =====

function updateTabStats() {
  // Mettre à jour le nombre de chauffeurs dans l'onglet
  const statChauffeurs = document.getElementById('stat-total-chauffeurs')
  const tabStatChauffeurs = document.getElementById('tab-stat-chauffeurs')
  if (statChauffeurs && tabStatChauffeurs) {
    tabStatChauffeurs.textContent = statChauffeurs.textContent
  }
  
  // Mettre à jour le nombre de quais disponibles dans l'onglet
  const statQuaisDisponibles = document.getElementById('stat-quais-disponibles')
  const tabStatQuaisDisponibles = document.getElementById('tab-stat-quais-disponibles')
  if (statQuaisDisponibles && tabStatQuaisDisponibles) {
    tabStatQuaisDisponibles.textContent = statQuaisDisponibles.textContent
  }
}

// ===== OBSERVER LES CHANGEMENTS DE STATISTIQUES =====

function observeStatsChanges() {
  // Observer les changements sur les statistiques des chauffeurs
  const statChauffeurs = document.getElementById('stat-total-chauffeurs')
  if (statChauffeurs) {
    const observer = new MutationObserver(() => {
      updateTabStats()
    })
    observer.observe(statChauffeurs, { childList: true, characterData: true, subtree: true })
  }
  
  // Observer les changements sur les statistiques des quais
  const statQuaisDisponibles = document.getElementById('stat-quais-disponibles')
  if (statQuaisDisponibles) {
    const observer = new MutationObserver(() => {
      updateTabStats()
    })
    observer.observe(statQuaisDisponibles, { childList: true, characterData: true, subtree: true })
  }
}

// ===== INITIALISATION =====

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Activer l'onglet par défaut
    switchTab('chauffeurs')
    
    // Observer les changements de statistiques
    observeStatsChanges()
    
    // Mettre à jour les stats toutes les secondes
    setInterval(updateTabStats, 1000)
  })
} else {
  switchTab('chauffeurs')
  observeStatsChanges()
  setInterval(updateTabStats, 1000)
}
