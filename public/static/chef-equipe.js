// ==============================================
// CHEF D'ÉQUIPE - GESTION IMPRODUCTIVITÉS
// Version 3.5.43 - CORRÉLATION RÉELLE QUAIS → KPI
// Date: 2026-03-09
// Affiche les vraies données depuis quai_status et controleur_alertes
// ==============================================

// État global
let currentFilter = 'en_transmission'
let currentImprods = []
let selectedImprodId = null

// Traductions
const traduireRaison = (raison) => {
  const traductions = {
    'etiquette': 'Erreur étiquette palette',
    'reseau': 'Problème de réseau',
    'formation': 'Formation',
    'accident': 'Accident sur palette'
  }
  return traductions[raison] || raison
}

// ==============================================
// INITIALISATION
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Chef d\'équipe - Initialisation...')
  loadImproductivites()
  
  // Rafraîchir toutes les 30 secondes
  setInterval(() => {
    loadImproductivites()
  }, 30000)
})

// ==============================================
// CHANGEMENT D'ONGLET
// ==============================================
function switchTabChef(tab) {
  // Masquer tous les contenus
  document.getElementById('tab-improd-chef-content').classList.add('hidden')
  document.getElementById('tab-kpi-chef-content').classList.add('hidden')
  document.getElementById('tab-procedures-chef-content').classList.add('hidden')
  
  // Réinitialiser tous les boutons
  const buttons = ['tab-improd-chef-btn', 'tab-kpi-chef-btn', 'tab-procedures-chef-btn']
  buttons.forEach(btnId => {
    const btn = document.getElementById(btnId)
    btn.classList.remove('bg-indigo-50', 'border-indigo-500', 'text-indigo-700')
    btn.classList.add('border-transparent', 'text-gray-500')
  })
  
  // Activer l'onglet sélectionné
  if (tab === 'improd') {
    document.getElementById('tab-improd-chef-content').classList.remove('hidden')
    const btn = document.getElementById('tab-improd-chef-btn')
    btn.classList.add('bg-indigo-50', 'border-indigo-500', 'text-indigo-700')
    btn.classList.remove('border-transparent', 'text-gray-500')
  } else if (tab === 'kpi') {
    document.getElementById('tab-kpi-chef-content').classList.remove('hidden')
    const btn = document.getElementById('tab-kpi-chef-btn')
    btn.classList.add('bg-indigo-50', 'border-indigo-500', 'text-indigo-700')
    btn.classList.remove('border-transparent', 'text-gray-500')
  } else if (tab === 'procedures') {
    document.getElementById('tab-procedures-chef-content').classList.remove('hidden')
    const btn = document.getElementById('tab-procedures-chef-btn')
    btn.classList.add('bg-indigo-50', 'border-indigo-500', 'text-indigo-700')
    btn.classList.remove('border-transparent', 'text-gray-500')
  }
}

// ==============================================
// CHARGEMENT DES IMPRODUCTIVITÉS
// ==============================================
async function loadImproductivites() {
  try {
    const response = await fetch('/api/chef-equipe/improductivites')
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || 'Erreur lors du chargement')
    }
    
    currentImprods = data.improductivites || []
    updateStatistiques(currentImprods)
    filtrerImprodChef(currentFilter)
    
  } catch (error) {
    console.error('❌ Erreur chargement improductivités:', error)
    document.getElementById('improd-liste-chef').innerHTML = `
      <div class="text-center text-red-500 py-12">
        <i class="fas fa-exclamation-triangle text-5xl mb-3"></i>
        <p class="text-lg">Erreur de chargement</p>
        <p class="text-sm">${error.message}</p>
      </div>
    `
  }
}

// ==============================================
// MISE À JOUR DES STATISTIQUES
// ==============================================
function updateStatistiques(improds) {
  const enTransmission = improds.filter(i => i.statut === 'en_transmission').length
  const validees = improds.filter(i => i.statut === 'validee').length
  const controleurs = improds.filter(i => i.role === 'controleur').length
  const agents = improds.filter(i => i.role === 'agent_quai').length
  
  document.getElementById('total-improd-count').textContent = enTransmission
  document.getElementById('badge-improd-count').textContent = enTransmission
  document.getElementById('stat-en-transmission').textContent = enTransmission
  document.getElementById('stat-validees').textContent = validees
  document.getElementById('stat-controleurs').textContent = controleurs
  document.getElementById('stat-agents').textContent = agents
}

// ==============================================
// FILTRAGE DES IMPRODUCTIVITÉS
// ==============================================
function filtrerImprodChef(statut) {
  currentFilter = statut
  
  // Mettre à jour les boutons
  document.getElementById('btn-filtre-transmission').classList.remove('bg-red-500', 'text-white')
  document.getElementById('btn-filtre-transmission').classList.add('bg-gray-200', 'text-gray-700')
  
  document.getElementById('btn-filtre-validees').classList.remove('bg-green-500', 'text-white')
  document.getElementById('btn-filtre-validees').classList.add('bg-gray-200', 'text-gray-700')
  
  if (statut === 'en_transmission') {
    document.getElementById('btn-filtre-transmission').classList.remove('bg-gray-200', 'text-gray-700')
    document.getElementById('btn-filtre-transmission').classList.add('bg-red-500', 'text-white')
  } else if (statut === 'validee') {
    document.getElementById('btn-filtre-validees').classList.remove('bg-gray-200', 'text-gray-700')
    document.getElementById('btn-filtre-validees').classList.add('bg-green-500', 'text-white')
  }
  
  // Filtrer et afficher
  const filteredImprods = currentImprods.filter(i => i.statut === statut)
  afficherImproductivites(filteredImprods, statut)
}

// ==============================================
// AFFICHAGE DES IMPRODUCTIVITÉS
// ==============================================
function afficherImproductivites(improds, statut) {
  const container = document.getElementById('improd-liste-chef')
  
  if (improds.length === 0) {
    const message = statut === 'en_transmission' 
      ? 'Aucune demande en transmission' 
      : 'Aucune demande validée'
    
    container.innerHTML = `
      <div class="text-center text-gray-500 py-12">
        <i class="fas fa-inbox text-5xl mb-3"></i>
        <p class="text-lg">${message}</p>
      </div>
    `
    return
  }
  
  // Trier par date (plus récent en premier)
  improds.sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut))
  
  container.innerHTML = improds.map(improd => generateImprodCard(improd)).join('')
}

// ==============================================
// GÉNÉRATION CARTE IMPRODUCTIVITÉ
// ==============================================
function generateImprodCard(improd) {
  const roleColor = improd.role === 'controleur' ? 'blue' : 'yellow'
  const roleLabel = improd.role === 'controleur' ? 'Contrôleur' : 'Agent de Quai'
  const roleIcon = improd.role === 'controleur' ? 'user-check' : 'hard-hat'
  
  const raisonIcons = {
    'etiquette': { icon: 'tag', color: 'red' },
    'reseau': { icon: 'wifi', color: 'orange' },
    'formation': { icon: 'graduation-cap', color: 'blue' },
    'accident': { icon: 'exclamation-triangle', color: 'purple' }
  }
  
  const raisonInfo = raisonIcons[improd.raison] || { icon: 'clock', color: 'gray' }
  
  const dateDebut = new Date(improd.date_debut)
  const dateFin = new Date(improd.date_fin)
  const heureDebut = dateDebut.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  const heureFin = dateFin.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  
  const actionButton = improd.statut === 'en_transmission' ? `
    <button 
      onclick="ouvrirModalValidation(${improd.id})"
      class="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
    >
      <i class="fas fa-check-circle mr-2"></i>
      Valider et transmettre
    </button>
  ` : `
    <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
      <i class="fas fa-check-circle text-green-600 mr-2"></i>
      <span class="text-green-700 font-semibold">Validée et transmise</span>
      ${improd.validation_commentaire ? `
        <p class="text-sm text-gray-600 mt-2">
          <i class="fas fa-comment text-gray-400 mr-1"></i>
          ${improd.validation_commentaire}
        </p>
      ` : ''}
    </div>
  `
  
  return `
    <div class="bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="bg-${roleColor}-100 p-3 rounded-full">
            <i class="fas fa-${roleIcon} text-2xl text-${roleColor}-600"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">${improd.utilisateur_nom}</h3>
            <p class="text-sm text-${roleColor}-600 font-semibold">
              <i class="fas fa-id-badge mr-1"></i>
              ${roleLabel}
            </p>
          </div>
        </div>
        
        <div class="text-right">
          <span class="inline-block bg-${improd.statut === 'en_transmission' ? 'red' : 'green'}-100 text-${improd.statut === 'en_transmission' ? 'red' : 'green'}-700 px-3 py-1 rounded-full text-sm font-semibold">
            <i class="fas fa-${improd.statut === 'en_transmission' ? 'clock' : 'check-circle'} mr-1"></i>
            ${improd.statut === 'en_transmission' ? 'En transmission' : 'Validée'}
          </span>
        </div>
      </div>
      
      <div class="space-y-3 mb-4">
        <div class="flex items-center space-x-3 bg-${raisonInfo.color}-50 p-3 rounded-lg">
          <i class="fas fa-${raisonInfo.icon} text-2xl text-${raisonInfo.color}-600"></i>
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wide">Raison</p>
            <p class="font-semibold text-gray-800">${traduireRaison(improd.raison)}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
              <i class="fas fa-clock mr-1"></i>Durée
            </p>
            <p class="text-2xl font-bold text-gray-800">${improd.duree}</p>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
              <i class="fas fa-calendar mr-1"></i>Horaire
            </p>
            <p class="text-sm font-semibold text-gray-700">${heureDebut} → ${heureFin}</p>
          </div>
        </div>
        
        ${improd.commentaire ? `
          <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <p class="text-xs text-blue-600 font-semibold mb-1">
              <i class="fas fa-comment mr-1"></i>Commentaire
            </p>
            <p class="text-sm text-gray-700">${improd.commentaire}</p>
          </div>
        ` : ''}
      </div>
      
      ${actionButton}
    </div>
  `
}

// ==============================================
// MODAL DE VALIDATION
// ==============================================
function ouvrirModalValidation(improdId) {
  const improd = currentImprods.find(i => i.id === improdId)
  if (!improd) return
  
  selectedImprodId = improdId
  
  const roleColor = improd.role === 'controleur' ? 'blue' : 'yellow'
  const roleLabel = improd.role === 'controleur' ? 'Contrôleur' : 'Agent de Quai'
  
  const dateDebut = new Date(improd.date_debut)
  const dateFin = new Date(improd.date_fin)
  
  document.getElementById('modal-validation-details').innerHTML = `
    <div class="bg-gradient-to-r from-${roleColor}-50 to-${roleColor}-100 p-4 rounded-lg border-l-4 border-${roleColor}-500">
      <div class="flex items-center space-x-3 mb-3">
        <i class="fas fa-${improd.role === 'controleur' ? 'user-check' : 'hard-hat'} text-3xl text-${roleColor}-600"></i>
        <div>
          <h4 class="text-xl font-bold text-gray-800">${improd.utilisateur_nom}</h4>
          <p class="text-sm text-${roleColor}-600 font-semibold">${roleLabel}</p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Raison</p>
        <p class="font-bold text-gray-800">${traduireRaison(improd.raison)}</p>
      </div>
      
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Durée</p>
        <p class="text-2xl font-bold text-gray-800">${improd.duree}</p>
      </div>
      
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Début</p>
        <p class="font-semibold text-gray-700">${dateDebut.toLocaleString('fr-FR')}</p>
      </div>
      
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Fin</p>
        <p class="font-semibold text-gray-700">${dateFin.toLocaleString('fr-FR')}</p>
      </div>
    </div>
    
    ${improd.commentaire ? `
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p class="text-xs text-blue-600 font-semibold mb-2">
          <i class="fas fa-comment mr-1"></i>Commentaire de l'utilisateur
        </p>
        <p class="text-gray-700">${improd.commentaire}</p>
      </div>
    ` : ''}
  `
  
  document.getElementById('validation-commentaire').value = ''
  document.getElementById('modal-validation').classList.remove('hidden')
}

function fermerModalValidation() {
  document.getElementById('modal-validation').classList.add('hidden')
  selectedImprodId = null
}

// ==============================================
// VALIDATION IMPRODUCTIVITÉ
// ==============================================
async function validerImprod() {
  if (!selectedImprodId) return
  
  const commentaire = document.getElementById('validation-commentaire').value.trim()
  
  try {
    const response = await fetch(`/api/chef-equipe/improductivites/${selectedImprodId}/valider`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        validation_commentaire: commentaire
      })
    })
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.success) {
      alert('✅ Improductivité validée et transmise avec succès')
      fermerModalValidation()
      loadImproductivites()
    } else {
      throw new Error(data.error || 'Erreur lors de la validation')
    }
    
  } catch (error) {
    console.error('❌ Erreur validation:', error)
    alert(`❌ Erreur: ${error.message}`)
  }
}

// ==============================================
// KPI RÉCEPTION CAMION
// ==============================================

// Charger les KPI de réception
async function loadKPIReception() {
  try {
    // Récupérer la date sélectionnée
    const dateInput = document.getElementById('kpi-date-select')
    const dateParam = dateInput.value ? `?date=${dateInput.value}` : ''
    
    console.log('🔄 Chargement KPI réception...', dateParam)
    
    const response = await fetch(`/api/chef-equipe/kpi/reception-camion${dateParam}`)
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || 'Erreur lors du chargement')
    }
    
    console.log('✅ KPI reçus:', data)
    
    // Mettre à jour les cartes de moyennes
    updateKPIMoyennes(data.moyennes)
    
    // Mettre à jour la grille de cartes quais
    updateKPITableau(data.quais)
    
  } catch (error) {
    console.error('❌ Erreur chargement KPI:', error)
    document.getElementById('kpi-tableau-body').innerHTML = `
      <tr>
        <td colspan="9" class="px-6 py-12 text-center text-red-500">
          <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
          <p>Erreur de chargement: ${error.message}</p>
        </td>
      </tr>
    `
  }
}

// Mettre à jour les cartes de moyennes (SANS Total)
function updateKPIMoyennes(moyennes) {
  document.getElementById('kpi-nb-camions').textContent = moyennes.total_camions || 0
  
  const dechargement = moyennes.dechargement_minutes || 0
  document.getElementById('kpi-moy-dechargement').textContent = `${dechargement} min`
  
  const controle = moyennes.controle_minutes || 0
  document.getElementById('kpi-moy-controle').textContent = `${controle} min`
}

// Afficher les quais terminés sous forme de cartes (comme interface quais)
function updateKPITableau(quais) {
  const grid = document.getElementById('kpi-quais-grid')
  
  if (!quais || quais.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fas fa-inbox text-4xl mb-3 opacity-50"></i>
        <p class="text-lg">Aucun quai terminé pour cette date</p>
      </div>
    `
    return
  }
  
  // Générer les cartes de quais (EXACTEMENT comme dans l'interface quais)
  grid.innerHTML = quais.map(quai => renderQuaiCardKPI(quai)).join('')
}

// Fonction pour rendre une carte de quai (copie de renderQuaiCard)
function renderQuaiCardKPI(quai) {
  // Fonction helper pour formater les durées
  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return null
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  
  // Formater durées
  const formattedDechargement = formatDuration(quai.timer_duration)
  const formattedControle = formatDuration(quai.timer_controle_duration)
  
  // Info déchargement
  const dechargementInfo = formattedDechargement ? `
    <div class="mt-2 bg-blue-50 rounded-lg p-2 border border-blue-200">
      <div class="text-xs text-blue-800 font-semibold mb-1">📋 Déchargement terminé</div>
      <div class="text-sm font-mono font-bold text-blue-900">${formattedDechargement}</div>
    </div>
  ` : ''
  
  // Info contrôle
  let controleInfo = ''
  if (formattedControle) {
    // Formater date de fin
    let finControleFormatted = ''
    if (quai.controle_fin_timestamp) {
      try {
        const date = new Date(quai.controle_fin_timestamp.replace(' ', 'T') + 'Z')
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hour = String(date.getHours()).padStart(2, '0')
        const minute = String(date.getMinutes()).padStart(2, '0')
        finControleFormatted = `${day}/${month}/${year} à ${hour}h${minute}`
      } catch (e) {
        finControleFormatted = quai.controle_fin_timestamp
      }
    }
    
    controleInfo = `
      <div class="mt-2 bg-purple-50 rounded-lg p-2 border border-purple-200">
        <div class="text-xs text-purple-800 font-semibold mb-1">📝 Contrôle terminé</div>
        <div class="text-sm font-mono font-bold text-purple-900">${formattedControle}</div>
        ${quai.controleur_nom ? `<div class="text-xs text-purple-700 mt-1"><i class="fas fa-user mr-1"></i>${quai.controleur_nom}</div>` : ''}
        ${quai.controle_fournisseur ? `<div class="text-xs text-purple-700 mt-0.5"><i class="fas fa-truck mr-1"></i>${quai.controle_fournisseur}</div>` : ''}
        ${quai.controle_id_chauffeur ? `<div class="text-xs text-purple-700 mt-0.5"><i class="fas fa-id-card mr-1"></i>ID: ${quai.controle_id_chauffeur}</div>` : ''}
        ${finControleFormatted ? `<div class="text-xs text-purple-700 mt-0.5"><i class="fas fa-clock mr-1"></i>${finControleFormatted}</div>` : ''}
      </div>
    `
  }
  
  return `
    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-200 hover:scale-105">
      <div class="text-center">
        <!-- Icône -->
        <div class="flex justify-center mb-3">
          <div class="bg-green-200 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <span class="text-3xl">✅</span>
          </div>
        </div>
        
        <!-- Numéro du quai -->
        <div class="font-extrabold text-gray-800 text-2xl mb-1">
          Quai ${quai.quai_numero}
        </div>
        
        <!-- Statut -->
        <div class="text-sm font-bold uppercase tracking-wide text-green-800 mb-1">
          Fin de contrôle
        </div>
        
        <!-- Info déchargement -->
        ${dechargementInfo}
        
        <!-- Info contrôle -->
        ${controleInfo}
        
        <!-- Commentaire -->
        ${quai.commentaire ? `
          <div class="mt-3 text-xs bg-white/70 rounded-lg p-3 text-left shadow-inner">
            <div class="flex items-start space-x-2 mb-1">
              <i class="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
              <div class="font-semibold text-gray-800">${quai.commentaire}</div>
            </div>
            <div class="text-gray-600 flex items-center space-x-1 mt-1">
              <i class="fas fa-user text-xs"></i>
              <span>${quai.commentaire_auteur || 'Inconnu'}</span>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `
}

// Obtenir le badge de statut
function getStatutBadge(dureeFormatee, statut) {
  if (!dureeFormatee || dureeFormatee === '—' || !statut || statut === 'grey') {
    return '<span class="text-gray-400 text-xs">En attente</span>'
  }
  
  const couleurs = {
    'green': 'bg-green-100 text-green-800 border-green-300',
    'orange': 'bg-orange-100 text-orange-800 border-orange-300',
    'red': 'bg-red-100 text-red-800 border-red-300'
  }
  
  const icones = {
    'green': 'fa-check-circle',
    'orange': 'fa-exclamation-circle',
    'red': 'fa-times-circle'
  }
  
  const classe = couleurs[statut] || 'bg-gray-100 text-gray-800'
  const icone = icones[statut] || 'fa-circle'
  
  return `
    <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold border ${classe}">
      <i class="fas ${icone} mr-1.5"></i>
      ${dureeFormatee}
    </span>
  `
}

// Formater une heure
function formatHeure(dateStr) {
  if (!dateStr) return '-'
  
  try {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  } catch {
    return dateStr
  }
}

// Initialiser la date du jour et charger les KPI au changement d'onglet
let kpiRefreshInterval = null

const originalSwitchTabChef = switchTabChef
window.switchTabChef = function(tab) {
  originalSwitchTabChef(tab)
  
  // Arrêter le rafraîchissement automatique si on quitte l'onglet KPI
  if (tab !== 'kpi' && kpiRefreshInterval) {
    clearInterval(kpiRefreshInterval)
    kpiRefreshInterval = null
    console.log('⏸️ Auto-refresh KPI désactivé')
  }
  
  if (tab === 'kpi') {
    // Initialiser la date du jour si pas encore fait
    const dateInput = document.getElementById('kpi-date-select')
    if (!dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0]
    }
    
    // Charger les KPI immédiatement
    loadKPIReception()
    
    // Démarrer le rafraîchissement automatique toutes les 30 secondes
    if (!kpiRefreshInterval) {
      kpiRefreshInterval = setInterval(() => {
        console.log('🔄 Auto-refresh KPI...')
        loadKPIReception()
      }, 30000) // 30 secondes
      console.log('▶️ Auto-refresh KPI activé (30s)')
    }
  }
}

// ==============================================
// EXPOSITION GLOBALE DES FONCTIONS
// ==============================================
window.switchTabChef = switchTabChef
window.filtrerImprodChef = filtrerImprodChef
window.ouvrirModalValidation = ouvrirModalValidation
window.fermerModalValidation = fermerModalValidation
window.validerImprod = validerImprod
window.loadKPIReception = loadKPIReception

console.log('✅ Chef d\'équipe - Script chargé et fonctions exposées')
