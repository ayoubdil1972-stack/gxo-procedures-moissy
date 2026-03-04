// Gestion des quais - Version 2.3.1 avec zones
// Gère les 45 quais réels GXO Moissy avec organisation par zones

let quais = []
let currentQuaiNumero = null
let timerIntervals = {} // Stocke les intervalles des timers

// Définition des zones
const ZONES = {
  'zone-1-10': { range: [1, 10], label: 'Zone A', color: 'blue' },
  'zone-32-38': { range: [32, 38], label: 'Zone B', color: 'purple' },
  'zone-45-49': { range: [45, 49], label: 'Zone C', color: 'orange' },
  'zone-60-69': { range: [60, 69], label: 'Zone D', color: 'teal' },
  'zone-75-87': { range: [75, 87], label: 'Zone E', color: 'pink' },
  'zone-99-103': { range: [99, 103], label: 'Zone F', color: 'indigo' }
}

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
    renderQuaisByZones()
    updateStats()
    startTimers()
  } catch (error) {
    console.error('Erreur chargement quais:', error)
  }
}

function renderQuaisByZones() {
  // Afficher les quais par zone
  for (const [zoneId, zone] of Object.entries(ZONES)) {
    const zoneElement = document.getElementById(`quais-${zoneId}`)
    if (!zoneElement) continue
    
    const zoneQuais = quais.filter(q => {
      const num = q.quai_numero
      return num >= zone.range[0] && num <= zone.range[1]
    })
    
    if (zoneQuais.length === 0) {
      zoneElement.innerHTML = `
        <div class="col-span-full text-center py-6 text-gray-400">
          <i class="fas fa-inbox text-3xl mb-2"></i>
          <p class="text-sm">Aucun quai dans cette zone</p>
        </div>
      `
      continue
    }
    
    zoneElement.innerHTML = zoneQuais.map(quai => renderQuaiCard(quai)).join('')
  }
}

function renderQuaiCard(quai) {
  const bgColor = getStatusColor(quai.statut)
  const icon = getStatusIcon(quai.statut)
  const iconBg = getStatusIconBg(quai.statut)
  
  // Validation stricte : n'afficher le timer que si timer_start est valide
  const hasValidTimer = quai.statut === 'en_cours' && 
                        quai.timer_start && 
                        quai.timer_start !== 'null' && 
                        quai.timer_start !== 'undefined' &&
                        quai.timer_start.trim() !== ''
  
  const timerDisplay = hasValidTimer
    ? `<div class="timer-display text-xl font-mono font-bold text-gray-900 mt-3 bg-white rounded-lg px-4 py-2 shadow-md border-2 border-gray-300" data-start="${quai.timer_start}">00:00:00</div>`
    : ''
  
  return `
    <div class="quai-card ${bgColor} rounded-xl shadow-md hover:shadow-xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 min-h-[200px] flex flex-col justify-center"
         onclick="openQuaiModal(${quai.quai_numero})"
         data-quai="${quai.quai_numero}">
      <div class="text-center">
        <!-- Icône de statut avec badge -->
        <div class="flex justify-center mb-4">
          <div class="${iconBg} rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <span class="text-4xl">${icon}</span>
          </div>
        </div>
        
        <!-- Numéro du quai -->
        <div class="font-extrabold text-gray-800 text-2xl mb-2">
          Quai ${quai.quai_numero}
        </div>
        
        <!-- Statut -->
        <div class="text-sm font-bold uppercase tracking-wide ${getStatusTextColor(quai.statut)} mb-2">
          ${getStatusLabel(quai.statut)}
        </div>
        
        <!-- Timer -->
        ${timerDisplay}
        
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
            <div class="text-gray-500 flex items-center space-x-1 mt-1">
              <i class="fas fa-clock text-xs"></i>
              <span>${formatDate(quai.updated_at)}</span>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `
}

function getStatusColor(statut) {
  switch (statut) {
    case 'disponible': return 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400'
    case 'en_cours': return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400'
    case 'indisponible': return 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400'
    default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400'
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

function getStatusIconBg(statut) {
  switch (statut) {
    case 'disponible': return 'bg-green-200'
    case 'en_cours': return 'bg-yellow-200'
    case 'indisponible': return 'bg-red-200'
    default: return 'bg-gray-200'
  }
}

function getStatusTextColor(statut) {
  switch (statut) {
    case 'disponible': return 'text-green-700'
    case 'en_cours': return 'text-yellow-700'
    case 'indisponible': return 'text-red-700'
    default: return 'text-gray-700'
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
  
  // Stats dans l'onglet
  const statDispoElement = document.getElementById('stat-quais-disponibles')
  const statEnCoursElement = document.getElementById('stat-quais-en-cours')
  const statIndispoElement = document.getElementById('stat-quais-indisponibles')
  
  if (statDispoElement) statDispoElement.textContent = disponibles
  if (statEnCoursElement) statEnCoursElement.textContent = enCours
  if (statIndispoElement) statIndispoElement.textContent = indisponibles
  
  // Stats dans le badge de l'onglet
  const tabBadge = document.getElementById('tab-stat-quais-disponibles')
  if (tabBadge) tabBadge.textContent = disponibles
}

// ===== GESTION DES TIMERS =====

function startTimers() {
  // Effacer tous les intervalles existants
  Object.values(timerIntervals).forEach(interval => clearInterval(interval))
  timerIntervals = {}
  
  // Démarrer les timers pour tous les quais "en_cours"
  const timerElements = document.querySelectorAll('.timer-display')
  
  timerElements.forEach(element => {
    const startTime = element.getAttribute('data-start')
    if (!startTime || startTime === 'null' || startTime === 'undefined') return
    
    // Parser le datetime SQLite (format: "2024-03-04 12:30:45")
    const start = new Date(startTime.replace(' ', 'T') + 'Z')
    
    if (isNaN(start.getTime())) {
      console.error('Invalid timer_start:', startTime)
      element.textContent = '00:00:00'
      return
    }
    
    // Fonction de mise à jour du timer
    const updateTimer = () => {
      const now = new Date()
      const diff = Math.floor((now - start) / 1000) // Différence en secondes
      
      if (diff < 0) {
        element.textContent = '00:00:00'
        return
      }
      
      const hours = Math.floor(diff / 3600)
      const minutes = Math.floor((diff % 3600) / 60)
      const seconds = diff % 60
      
      element.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
    
    // Mise à jour immédiate
    updateTimer()
    
    // Mise à jour toutes les secondes
    const interval = setInterval(updateTimer, 1000)
    
    // Stocker l'intervalle pour le nettoyer plus tard
    const quaiNumero = element.closest('.quai-card')?.getAttribute('data-quai')
    if (quaiNumero) {
      timerIntervals[quaiNumero] = interval
    }
  })
}

// ===== MODAL DE GESTION =====

function openQuaiModal(numero) {
  currentQuaiNumero = numero
  const quai = quais.find(q => q.quai_numero === numero)
  
  if (!quai) {
    console.error('Quai non trouvé:', numero)
    return
  }
  
  // Remplir le modal
  document.getElementById('modal-quai-numero').textContent = numero
  document.getElementById('modal-quai-statut').value = quai.statut
  document.getElementById('modal-quai-commentaire').value = quai.commentaire || ''
  
  // Afficher/masquer le champ commentaire
  toggleCommentaire()
  
  // Afficher le modal
  document.getElementById('modal-quai').classList.remove('hidden')
}

function closeQuaiModal() {
  document.getElementById('modal-quai').classList.add('hidden')
  currentQuaiNumero = null
}

function toggleCommentaire() {
  const statut = document.getElementById('modal-quai-statut').value
  const commentaireDiv = document.getElementById('commentaire-container')
  
  if (statut === 'indisponible') {
    commentaireDiv.classList.remove('hidden')
  } else {
    commentaireDiv.classList.add('hidden')
  }
}

async function saveQuaiStatus() {
  if (!currentQuaiNumero) return
  
  const statut = document.getElementById('modal-quai-statut').value
  const commentaire = document.getElementById('modal-quai-commentaire').value.trim()
  
  // Validation: commentaire obligatoire pour "indisponible"
  if (statut === 'indisponible' && !commentaire) {
    alert('⚠️ Un commentaire est obligatoire pour mettre un quai en "Indisponible"')
    return
  }
  
  try {
    const response = await fetch(`/api/quais/${currentQuaiNumero}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        statut, 
        commentaire: statut === 'indisponible' ? commentaire : null,
        commentaire_auteur: 'Admin' // TODO: Récupérer le nom de l'utilisateur connecté
      })
    })
    
    const data = await response.json()
    
    if (!data.success) {
      alert('❌ Erreur: ' + (data.error || 'Erreur inconnue'))
      return
    }
    
    // Fermer le modal
    closeQuaiModal()
    
    // Recharger les données
    await loadQuais()
    
    // Message de succès
    showSuccessMessage(`✅ Quai ${currentQuaiNumero} mis à jour: ${getStatusLabel(statut)}`)
    
  } catch (error) {
    console.error('Erreur sauvegarde:', error)
    alert('❌ Erreur lors de la sauvegarde')
  }
}

function showSuccessMessage(message) {
  // Créer un message toast
  const toast = document.createElement('div')
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in'
  toast.textContent = message
  document.body.appendChild(toast)
  
  // Supprimer après 3 secondes
  setTimeout(() => {
    toast.classList.add('animate-fade-out')
    setTimeout(() => toast.remove(), 500)
  }, 3000)
}

// ===== INITIALISATION =====

// Charger les quais au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadQuais()
    // Rafraîchir toutes les 30 secondes
    setInterval(loadQuais, 30000)
  })
} else {
  loadQuais()
  // Rafraîchir toutes les 30 secondes
  setInterval(loadQuais, 30000)
}

// Masquer le message d'erreur après 5 secondes
setTimeout(() => {
  const errorDiv = document.getElementById('error-message')
  if (errorDiv) errorDiv.classList.add('hidden')
}, 5000)
