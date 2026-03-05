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
  
  // DEBUG - Logs détaillés pour les quais scannés
  if (quai.statut === 'en_cours' || quai.timer_start) {
    console.log(`🐛 Debug Quai ${quai.quai_numero}:`, {
      statut: quai.statut,
      timer_start: quai.timer_start,
      timer_start_type: typeof quai.timer_start,
      timer_start_length: quai.timer_start ? quai.timer_start.length : 0
    })
  }
  
  // Validation stricte : n'afficher le timer que si timer_start est valide
  const hasValidTimer = quai.statut === 'en_cours' && 
                        quai.timer_start && 
                        quai.timer_start !== 'null' && 
                        quai.timer_start !== 'undefined' &&
                        quai.timer_start.trim() !== ''
  
  // DEBUG - Afficher le résultat de la validation
  if (quai.statut === 'en_cours' || quai.timer_start) {
    console.log(`  → hasValidTimer: ${hasValidTimer}`)
  }
  
  const timerDisplay = hasValidTimer
    ? `<div class="timer-display text-base font-mono font-bold text-gray-800 mt-2 bg-white/80 rounded-lg px-3 py-1" data-start="${quai.timer_start}">00:00:00</div>`
    : ''
  
  return `
    <div class="quai-card ${bgColor} rounded-xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-200 hover:scale-105"
         onclick="openQuaiModal(${quai.quai_numero})"
         data-quai="${quai.quai_numero}">
      <div class="text-center">
        <!-- Icône de statut avec badge -->
        <div class="flex justify-center mb-3">
          <div class="${iconBg} rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <span class="text-3xl">${icon}</span>
          </div>
        </div>
        
        <!-- Numéro du quai -->
        <div class="font-extrabold text-gray-800 text-2xl mb-1">
          Quai ${quai.quai_numero}
        </div>
        
        <!-- Statut -->
        <div class="text-sm font-bold uppercase tracking-wide ${getStatusTextColor(quai.statut)} mb-1">
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
  console.log('🔵 openQuaiModal appelé avec numero:', numero)
  currentQuaiNumero = numero
  const quai = quais.find(q => q.quai_numero === numero)
  
  if (!quai) {
    console.error('❌ Quai non trouvé:', numero)
    return
  }
  
  console.log('✅ Quai trouvé:', quai)
  
  // Remplir le modal
  const modalNumero = document.getElementById('modal-quai-numero')
  if (modalNumero) {
    modalNumero.textContent = numero
    console.log('✅ Numéro du modal mis à jour:', numero)
  } else {
    console.error('❌ Element modal-quai-numero non trouvé')
  }
  
  // Réinitialiser le champ commentaire
  const commentaireSection = document.getElementById('commentaire-section')
  const commentaireInput = document.getElementById('quai-commentaire')
  
  if (commentaireSection && commentaireInput) {
    commentaireSection.classList.add('hidden')
    commentaireInput.value = quai.commentaire || ''
    console.log('✅ Commentaire réinitialisé')
  }
  
  // Afficher le modal
  const modal = document.getElementById('modal-quai')
  if (modal) {
    modal.classList.remove('hidden')
    console.log('✅ Modal affiché')
  } else {
    console.error('❌ Element modal-quai non trouvé dans le DOM')
    console.log('DOM disponible:', document.body.innerHTML.substring(0, 500))
  }
}

function closeQuaiModal() {
  const modal = document.getElementById('modal-quai')
  if (modal) {
    modal.classList.add('hidden')
  }
  currentQuaiNumero = null
  
  // Réinitialiser le champ commentaire
  const commentaireSection = document.getElementById('commentaire-section')
  const commentaireInput = document.getElementById('quai-commentaire')
  
  if (commentaireSection) {
    commentaireSection.classList.add('hidden')
  }
  if (commentaireInput) {
    commentaireInput.value = ''
  }
}

// Rendre les fonctions globalement accessibles
window.openQuaiModal = openQuaiModal
window.closeQuaiModal = closeQuaiModal

function toggleCommentaire() {
  const commentaireSection = document.getElementById('commentaire-section')
  if (commentaireSection) {
    commentaireSection.classList.toggle('hidden')
  }
}

// Rendre toggleCommentaire globalement accessible
window.toggleCommentaire = toggleCommentaire

async function setQuaiStatus(statut) {
  if (!currentQuaiNumero) {
    console.error('Aucun quai sélectionné')
    return
  }
  
  // Si indisponible, afficher le champ commentaire
  if (statut === 'indisponible') {
    const commentaireSection = document.getElementById('commentaire-section')
    if (commentaireSection && commentaireSection.classList.contains('hidden')) {
      commentaireSection.classList.remove('hidden')
      return // Ne pas sauvegarder, attendre que l'utilisateur remplisse le commentaire
    }
    
    // Vérifier que le commentaire est rempli
    const commentaire = document.getElementById('quai-commentaire')?.value.trim()
    if (!commentaire) {
      alert('⚠️ Un commentaire est obligatoire pour mettre un quai en "Indisponible"')
      return
    }
  }
  
  // Sauvegarder le statut
  await saveQuaiStatusWithStatut(statut)
}

// Rendre setQuaiStatus globalement accessible
window.setQuaiStatus = setQuaiStatus

async function saveQuaiStatusWithStatut(statut) {
  if (!currentQuaiNumero) return
  
  const commentaire = statut === 'indisponible' 
    ? document.getElementById('quai-commentaire').value.trim()
    : null
  
  try {
    const response = await fetch(`/api/quais/${currentQuaiNumero}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        statut, 
        commentaire,
        commentaire_auteur: 'Admin' // TODO: Récupérer le nom de l'utilisateur connecté
      })
    })
    
    const data = await response.json()
    
    if (!data.success) {
      alert('❌ Erreur: ' + (data.error || 'Erreur inconnue'))
      return
    }
    
    // Afficher un message de succès
    showSuccessMessage(`✅ Quai ${currentQuaiNumero} mis à jour avec succès !`)
    
    // Fermer le modal
    closeQuaiModal()
    
    // Réinitialiser le champ commentaire
    document.getElementById('quai-commentaire').value = ''
    document.getElementById('commentaire-section').classList.add('hidden')
    
    // Recharger les données
    await loadQuais()
  } catch (error) {
    console.error('Erreur lors de la mise à jour du quai:', error)
    alert('❌ Erreur lors de la mise à jour du quai')
  }
}

function showSuccessMessage(message) {
  // Créer un élément toast
  const toast = document.createElement('div')
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-3 animate-slide-in'
  toast.innerHTML = `
    <i class="fas fa-check-circle text-2xl"></i>
    <span class="font-semibold">${message}</span>
  `
  document.body.appendChild(toast)
  
  // Supprimer après 3 secondes
  setTimeout(() => {
    toast.remove()
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
// Version 2.5.0 - ZONES ERGONOMIQUES - 2026-03-04_12:07:12_UTC
// Version 2.5.1 - MODAL DEBUG FORCE - 2026-03-04_12:14:32_UTC
