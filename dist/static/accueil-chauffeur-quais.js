// Gestion des quais - Version intégrée pour page Accueil Chauffeur
// Gère les 30 quais avec statuts, timer, et commentaires

let quais = []
let currentQuaiNumero = null
let timerIntervals = {} // Stocke les intervalles des timers

// ===== CHARGEMENT DES DONNÉES =====

async function loadQuais() {
  try {
    const response = await fetch('/api/quais')
    const data = await response.json()
    
    if (!data.success) {
      console.error('Erreur chargement quais:', data.error)
      return
    }
    
    quais = data.quais
    renderQuais()
    updateStats()
    startTimers()
  } catch (error) {
    console.error('Erreur chargement quais:', error)
  }
}

function renderQuais() {
  const grid = document.getElementById('quais-grid')
  
  if (!grid) {
    console.error('Element #quais-grid non trouvé')
    return
  }
  
  if (quais.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <i class="fas fa-warehouse text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500 text-lg">Aucun quai trouvé</p>
        <p class="text-gray-400 text-sm mt-2">Vérifiez que la table quai_status est créée</p>
      </div>
    `
    return
  }
  
  grid.innerHTML = quais.map(quai => {
    const bgColor = getStatusColor(quai.statut)
    const icon = getStatusIcon(quai.statut)
    
    // Validation stricte : n'afficher le timer que si timer_start est valide
    const hasValidTimer = quai.statut === 'en_cours' && 
                          quai.timer_start && 
                          quai.timer_start !== 'null' && 
                          quai.timer_start !== 'undefined' &&
                          quai.timer_start.trim() !== ''
    
    const timerDisplay = hasValidTimer
      ? `<div class="timer-display text-lg font-mono font-bold text-gray-800 mt-2" data-start="${quai.timer_start}">00:00:00</div>`
      : ''
    
    return `
      <div class="quai-card ${bgColor} rounded-xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform"
           onclick="openQuaiModal(${quai.quai_numero})"
           data-quai="${quai.quai_numero}">
        <div class="text-center">
          <div class="text-2xl mb-2">${icon}</div>
          <div class="font-bold text-gray-800 text-xl mb-1">Quai ${quai.quai_numero}</div>
          <div class="text-sm font-semibold text-gray-700">
            ${getStatusLabel(quai.statut)}
          </div>
          ${timerDisplay}
          ${quai.commentaire ? `
            <div class="mt-3 text-xs bg-white/50 rounded p-2 text-left">
              <div class="font-semibold text-gray-800 mb-1">⚠️ ${quai.commentaire}</div>
              <div class="text-gray-600">Par: ${quai.commentaire_auteur || 'Inconnu'}</div>
              <div class="text-gray-500">${formatDate(quai.updated_at)}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `
  }).join('')
}

function getStatusColor(statut) {
  switch (statut) {
    case 'disponible': return 'bg-green-100 border-2 border-green-400'
    case 'en_cours': return 'bg-yellow-100 border-2 border-yellow-400'
    case 'indisponible': return 'bg-red-100 border-2 border-red-400'
    default: return 'bg-gray-100 border-2 border-gray-400'
  }
}

function getStatusIcon(statut) {
  switch (statut) {
    case 'disponible': return '✅'
    case 'en_cours': return '⏱️'
    case 'indisponible': return '🚫'
    default: return '❓'
  }
}

function getStatusLabel(statut) {
  switch (statut) {
    case 'disponible': return 'Disponible'
    case 'en_cours': return 'En cours'
    case 'indisponible': return 'Indisponible'
    default: return 'Inconnu'
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function updateStats() {
  const disponibles = quais.filter(q => q.statut === 'disponible').length
  const enCours = quais.filter(q => q.statut === 'en_cours').length
  const indisponibles = quais.filter(q => q.statut === 'indisponible').length
  
  const dispStat = document.getElementById('stat-quais-disponibles')
  const coursStat = document.getElementById('stat-quais-en-cours')
  const indispStat = document.getElementById('stat-quais-indisponibles')
  
  if (dispStat) dispStat.textContent = disponibles
  if (coursStat) coursStat.textContent = enCours
  if (indispStat) indispStat.textContent = indisponibles
}

// ===== GESTION DES TIMERS =====

function startTimers() {
  // Arrêter tous les timers existants
  Object.values(timerIntervals).forEach(interval => clearInterval(interval))
  timerIntervals = {}
  
  // Démarrer les timers pour les quais "en_cours"
  document.querySelectorAll('.timer-display').forEach(timerEl => {
    const startTimeStr = timerEl.dataset.start
    
    // Validation stricte : timer_start doit être défini et non vide
    if (!startTimeStr || startTimeStr === 'null' || startTimeStr === 'undefined') {
      console.warn('Timer ignoré : pas de timer_start valide')
      timerEl.textContent = '00:00:00' // Afficher 00:00:00 par défaut
      return
    }
    
    // Parser la date de manière robuste avec validation stricte
    let startTime
    try {
      // Si c'est un timestamp numérique
      if (!isNaN(startTimeStr) && startTimeStr.length > 10) {
        startTime = new Date(parseInt(startTimeStr))
      } else {
        // Si c'est une chaîne de date ISO ou SQLite datetime
        // Format SQLite: "2026-03-04 12:34:56"
        // Le remplacer par format ISO: "2026-03-04T12:34:56Z"
        const isoStr = startTimeStr.trim().replace(' ', 'T') + 'Z'
        startTime = new Date(isoStr)
      }
      
      // Validation stricte : la date doit être valide
      if (isNaN(startTime.getTime())) {
        console.error('❌ Date invalide:', startTimeStr)
        timerEl.textContent = '00:00:00'
        return
      }
      
      // Validation stricte : la date ne doit pas être dans le futur (tolérance 10s)
      const now = new Date()
      if (startTime.getTime() > now.getTime() + 10000) {
        console.error('❌ Date dans le futur:', startTimeStr)
        timerEl.textContent = '00:00:00'
        return
      }
      
    } catch (e) {
      console.error('❌ Erreur parsing date:', startTimeStr, e)
      timerEl.textContent = '00:00:00'
      return
    }
    
    console.log('✅ Timer démarré pour:', startTimeStr, '→', startTime.toISOString())
    
    const updateTimer = () => {
      try {
        const now = new Date()
        const diff = Math.floor((now - startTime) / 1000) // Différence en secondes
        
        // Validation : la différence ne peut pas être négative
        if (diff < 0) {
          console.error('❌ Différence négative détectée, timer réinitialisé')
          timerEl.textContent = '00:00:00'
          clearInterval(timerIntervals[startTimeStr])
          delete timerIntervals[startTimeStr]
          return
        }
        
        // Calcul des heures, minutes, secondes avec validation
        const hours = Math.floor(diff / 3600)
        const minutes = Math.floor((diff % 3600) / 60)
        const seconds = diff % 60
        
        // Vérification anti-NaN : tous les chiffres doivent être des nombres valides
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
          console.error('❌ NaN détecté dans le calcul du timer')
          timerEl.textContent = '00:00:00'
          clearInterval(timerIntervals[startTimeStr])
          delete timerIntervals[startTimeStr]
          return
        }
        
        // Affichage sécurisé avec padding
        timerEl.textContent = 
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      } catch (e) {
        console.error('❌ Erreur dans updateTimer:', e)
        timerEl.textContent = '00:00:00'
        clearInterval(timerIntervals[startTimeStr])
        delete timerIntervals[startTimeStr]
      }
    }
    
    updateTimer() // Mise à jour immédiate
    const interval = setInterval(updateTimer, 1000)
    timerIntervals[startTimeStr] = interval
  })
  
  console.log(`✅ ${Object.keys(timerIntervals).length} timer(s) actif(s)`)
}

// ===== MODALE DE CHANGEMENT DE STATUT =====

function openQuaiModal(quaiNumero) {
  currentQuaiNumero = quaiNumero
  const quai = quais.find(q => q.quai_numero === quaiNumero)
  
  if (!quai) return
  
  const modal = document.createElement('div')
  modal.id = 'quai-modal'
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
  modal.onclick = (e) => {
    if (e.target === modal) closeQuaiModal()
  }
  
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Quai ${quaiNumero}</h2>
        <button onclick="closeQuaiModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Statut actuel</label>
        <div class="p-3 rounded-lg ${getStatusColor(quai.statut)}">
          <span class="text-lg">${getStatusIcon(quai.statut)}</span>
          <span class="ml-2 font-semibold text-gray-800">${getStatusLabel(quai.statut)}</span>
        </div>
      </div>
      
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-3">Nouveau statut</label>
        <div class="space-y-2">
          <button onclick="selectStatus('disponible')" 
                  class="status-option w-full p-3 rounded-lg border-2 hover:shadow-lg transition-all ${quai.statut === 'disponible' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}">
            <span class="text-xl">✅</span>
            <span class="ml-2 font-semibold text-gray-800">Disponible</span>
          </button>
          
          <button onclick="selectStatus('en_cours')" 
                  class="status-option w-full p-3 rounded-lg border-2 hover:shadow-lg transition-all ${quai.statut === 'en_cours' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white'}">
            <span class="text-xl">⏱️</span>
            <span class="ml-2 font-semibold text-gray-800">En cours d'utilisation</span>
          </button>
          
          <button onclick="selectStatus('indisponible')" 
                  class="status-option w-full p-3 rounded-lg border-2 hover:shadow-lg transition-all ${quai.statut === 'indisponible' ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}">
            <span class="text-xl">🚫</span>
            <span class="ml-2 font-semibold text-gray-800">Indisponible</span>
          </button>
        </div>
      </div>
      
      <div id="commentaire-section" class="mb-6 hidden">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Commentaire <span class="text-red-500">*</span>
        </label>
        <textarea id="commentaire-input" 
                  class="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:outline-none"
                  rows="3"
                  placeholder="Ex: Haillon cassé, Porte endommagée..."></textarea>
        
        <label class="block text-sm font-semibold text-gray-700 mb-2 mt-3">
          Votre nom <span class="text-red-500">*</span>
        </label>
        <input type="text" id="auteur-input" 
               class="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:outline-none"
               placeholder="Votre nom">
      </div>
      
      <div id="error-message" class="mb-4 hidden">
        <div class="bg-red-100 border-l-4 border-red-500 p-3 rounded">
          <p class="text-red-700 text-sm font-semibold" id="error-text"></p>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button onclick="closeQuaiModal()" 
                class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
          Annuler
        </button>
        <button onclick="saveQuaiStatus()" 
                class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all">
          Valider
        </button>
      </div>
    </div>
  `
  
  document.body.appendChild(modal)
}

function closeQuaiModal() {
  const modal = document.getElementById('quai-modal')
  if (modal) modal.remove()
  currentQuaiNumero = null
}

function selectStatus(statut) {
  // Retirer la sélection des autres boutons
  document.querySelectorAll('.status-option').forEach(btn => {
    btn.classList.remove('border-green-500', 'bg-green-50', 'border-yellow-500', 'bg-yellow-50', 'border-red-500', 'bg-red-50')
    btn.classList.add('border-gray-300', 'bg-white')
  })
  
  // Sélectionner le bouton cliqué
  const button = event.currentTarget
  button.classList.remove('border-gray-300', 'bg-white')
  
  if (statut === 'disponible') {
    button.classList.add('border-green-500', 'bg-green-50')
  } else if (statut === 'en_cours') {
    button.classList.add('border-yellow-500', 'bg-yellow-50')
  } else if (statut === 'indisponible') {
    button.classList.add('border-red-500', 'bg-red-50')
  }
  
  // Afficher/masquer la section commentaire
  const commentSection = document.getElementById('commentaire-section')
  if (statut === 'indisponible') {
    commentSection.classList.remove('hidden')
  } else {
    commentSection.classList.add('hidden')
  }
  
  // Stocker le statut sélectionné
  button.dataset.selectedStatus = statut
}

async function saveQuaiStatus() {
  // Récupérer le statut sélectionné
  const selectedButton = document.querySelector('.status-option[data-selected-status]')
  
  if (!selectedButton) {
    showError('Veuillez sélectionner un statut')
    return
  }
  
  const statut = selectedButton.dataset.selectedStatus
  const commentaire = document.getElementById('commentaire-input')?.value.trim()
  const auteur = document.getElementById('auteur-input')?.value.trim()
  
  // Validation pour statut "indisponible"
  if (statut === 'indisponible') {
    if (!commentaire) {
      showError('Le commentaire est obligatoire pour un quai indisponible')
      return
    }
    if (!auteur) {
      showError('Votre nom est obligatoire')
      return
    }
  }
  
  try {
    const response = await fetch(`/api/quais/${currentQuaiNumero}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        statut,
        commentaire: statut === 'indisponible' ? commentaire : null,
        commentaire_auteur: statut === 'indisponible' ? auteur : null
      })
    })
    
    const data = await response.json()
    
    if (!data.success) {
      showError(data.error || 'Erreur lors de la mise à jour')
      return
    }
    
    closeQuaiModal()
    loadQuais() // Recharger les données
  } catch (error) {
    console.error('Erreur sauvegarde:', error)
    showError('Erreur de connexion au serveur')
  }
}

function showError(message) {
  const errorDiv = document.getElementById('error-message')
  const errorText = document.getElementById('error-text')
  
  if (errorDiv && errorText) {
    errorText.textContent = message
    errorDiv.classList.remove('hidden')
    
    setTimeout(() => {
      errorDiv.classList.add('hidden')
    }, 5000)
  }
}

// ===== INITIALISATION =====

// Charger les quais au démarrage
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadQuais()
    // Rafraîchir toutes les 30 secondes
    setInterval(loadQuais, 30000)
  })
} else {
  loadQuais()
  setInterval(loadQuais, 30000)
}
