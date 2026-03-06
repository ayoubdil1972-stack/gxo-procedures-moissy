// Gestion des quais - Interface visuelle avec système de glissement
// Gère les 30 quais avec statuts, timer, et commentaires

let quais = []
let currentQuaiNumero = null
let timerIntervals = {} // Stocke les intervalles des timers

// ===== SYSTÈME DE GLISSEMENT ENTRE VUES =====

function switchToQuais() {
  const container = document.getElementById('slide-container')
  container.classList.remove('slide-left')
  container.classList.add('slide-right')
  // Charger les quais quand on arrive sur la vue
  loadQuais()
}

function switchToChauffeurs() {
  const container = document.getElementById('slide-container')
  container.classList.remove('slide-right')
  container.classList.add('slide-left')
  // Charger les chauffeurs quand on revient
  loadChauffeurs()
}

// ===== CHARGEMENT DES DONNÉES =====

async function loadChauffeurs() {
  try {
    const response = await fetch('/api/admin/chauffeurs-actifs')
    const data = await response.json()
    
    const container = document.getElementById('chauffeurs-content')
    
    if (!data.success || data.chauffeurs.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12">
          <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">Aucun chauffeur actif pour le moment</p>
        </div>
      `
      return
    }
    
    container.innerHTML = data.chauffeurs.map(chauffeur => `
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-bold text-gray-800">${chauffeur.pseudo}</h3>
            <p class="text-sm text-gray-500">Quai ${chauffeur.quai_assigne}</p>
          </div>
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            <i class="fas fa-circle text-green-500 mr-1"></i>Actif
          </span>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-truck text-gray-400"></i>
            <span>${chauffeur.plaque_camion || 'Non renseigné'}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-globe text-gray-400"></i>
            <span>${getLangueName(chauffeur.langue)}</span>
          </div>
        </div>
      </div>
    `).join('')
  } catch (error) {
    console.error('Erreur chargement chauffeurs:', error)
  }
}

function getLangueName(code) {
  const names = {
    fr: 'Français', it: 'Italien', nl: 'Néerlandais', de: 'Allemand',
    bg: 'Bulgare', cs: 'Tchèque', da: 'Danois', fi: 'Finnois',
    hr: 'Croate', pl: 'Polonais', pt: 'Portugais', ro: 'Roumain', en: 'Anglais'
  }
  return names[code] || code
}

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
    
    // Démarrer les timers pour les quais en cours
    quais.forEach(quai => {
      if (quai.statut === 'en_cours' && quai.timer_start) {
        startTimer(quai.quai_numero, quai.timer_start)
      }
      // Afficher le timer figé pour les quais en fin de déchargement
      if (quai.statut === 'fin_dechargement' && quai.timer_duration) {
        displayFrozenTimer(quai.quai_numero, quai.timer_duration)
      }
    })
  } catch (error) {
    console.error('Erreur chargement quais:', error)
  }
}

// ===== AFFICHAGE DE LA GRILLE DES QUAIS =====

function renderQuais() {
  const grid = document.getElementById('quais-grid')
  
  grid.innerHTML = quais.map(quai => {
    const statusColors = {
      'disponible': 'bg-green-500',
      'en_cours': 'bg-yellow-500',
      'fin_dechargement': 'bg-blue-500',
      'indisponible': 'bg-red-500'
    }
    
    const statusIcons = {
      'disponible': 'fa-check-circle',
      'en_cours': 'fa-clock',
      'fin_dechargement': 'fa-clipboard-check',
      'indisponible': 'fa-exclamation-triangle'
    }
    
    const statusLabels = {
      'disponible': 'Disponible',
      'en_cours': 'En cours',
      'fin_dechargement': 'Fin de déchargement',
      'indisponible': 'Indisponible'
    }
    
    return `
      <div 
        onclick="openModal(${quai.quai_numero})" 
        class="quai-card ${statusColors[quai.statut]} rounded-lg shadow-lg p-6 cursor-pointer text-white"
      >
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">Quai ${quai.quai_numero}</div>
          <div class="flex items-center justify-center gap-2 mb-3">
            <i class="fas ${statusIcons[quai.statut]}"></i>
            <span class="text-sm font-medium">${statusLabels[quai.statut]}</span>
          </div>
          
          ${quai.statut === 'en_cours' ? `
            <div class="timer-display bg-black bg-opacity-30 rounded-lg py-2 px-3 mt-2" id="timer-${quai.quai_numero}">
              00:00:00
            </div>
          ` : ''}
          
          ${quai.statut === 'fin_dechargement' && quai.timer_duration ? `
            <div class="text-xs mb-2 opacity-90">Timer figé:</div>
            <div class="timer-display bg-black bg-opacity-30 rounded-lg py-2 px-3 mt-1" id="timer-${quai.quai_numero}">
              00:00:00
            </div>
          ` : ''}
          
          ${quai.statut === 'indisponible' ? `
            <div class="mt-2 text-xs opacity-90">
              <i class="fas fa-info-circle mr-1"></i>
              Cliquer pour détails
            </div>
          ` : ''}
          
          ${quai.statut === 'fin_dechargement' && quai.commentaire ? `
            <div class="mt-2 text-xs opacity-90">
              <i class="fas fa-info-circle mr-1"></i>
              ${quai.commentaire}
            </div>
          ` : ''}
        </div>
      </div>
    `
  }).join('')
}

// ===== GESTION DU TIMER =====

function startTimer(quaiNumero, timerStart) {
  // Arrêter timer existant si présent
  if (timerIntervals[quaiNumero]) {
    clearInterval(timerIntervals[quaiNumero])
  }
  
  const timerElement = document.getElementById(`timer-${quaiNumero}`)
  if (!timerElement) return
  
  timerIntervals[quaiNumero] = setInterval(() => {
    const elapsed = Date.now() - timerStart
    const hours = Math.floor(elapsed / 3600000)
    const minutes = Math.floor((elapsed % 3600000) / 60000)
    const seconds = Math.floor((elapsed % 60000) / 1000)
    
    timerElement.textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, 1000)
}

function stopTimer(quaiNumero) {
  if (timerIntervals[quaiNumero]) {
    clearInterval(timerIntervals[quaiNumero])
    delete timerIntervals[quaiNumero]
  }
}

// Afficher le timer figé pour les quais en fin de déchargement
function displayFrozenTimer(quaiNumero, timerDuration) {
  const timerElement = document.getElementById(`timer-${quaiNumero}`)
  if (!timerElement) return
  
  // timerDuration est déjà en secondes, pas besoin de calculer
  const elapsed = timerDuration * 1000 // Convertir en millisecondes pour la compatibilité
  const hours = Math.floor(elapsed / 3600000)
  const minutes = Math.floor((elapsed % 3600000) / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  
  timerElement.textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// ===== GESTION DE LA MODALE =====

function openModal(quaiNumero) {
  currentQuaiNumero = quaiNumero
  const quai = quais.find(q => q.quai_numero === quaiNumero)
  
  if (!quai) return
  
  // Mettre à jour le titre
  document.getElementById('modal-title').textContent = `Quai ${quaiNumero}`
  
  // Mettre à jour le statut actuel
  document.getElementById('input-statut').value = quai.statut
  
  // Afficher/masquer sections selon le statut
  toggleCommentaireSection(quai.statut)
  
  // Pré-remplir le commentaire si indisponible
  if (quai.statut === 'indisponible') {
    document.getElementById('input-commentaire').value = quai.commentaire || ''
    document.getElementById('input-auteur').value = quai.commentaire_auteur || ''
  }
  
  // Afficher la modale
  document.getElementById('modal-quai').classList.remove('hidden')
  document.getElementById('modal-quai').classList.add('flex')
}

function closeModal() {
  document.getElementById('modal-quai').classList.add('hidden')
  document.getElementById('modal-quai').classList.remove('flex')
  
  // Réinitialiser le formulaire
  document.getElementById('form-quai-status').reset()
  currentQuaiNumero = null
}

function toggleCommentaireSection(statut) {
  const sectionCommentaire = document.getElementById('section-commentaire')
  const sectionAuteur = document.getElementById('section-auteur')
  
  if (statut === 'indisponible') {
    sectionCommentaire.classList.remove('hidden')
    sectionAuteur.classList.remove('hidden')
  } else {
    sectionCommentaire.classList.add('hidden')
    sectionAuteur.classList.add('hidden')
  }
}

// Écouter le changement de statut dans la modale
document.getElementById('input-statut').addEventListener('change', (e) => {
  toggleCommentaireSection(e.target.value)
})

// ===== SOUMISSION DU FORMULAIRE =====

document.getElementById('form-quai-status').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  if (!currentQuaiNumero) return
  
  const statut = document.getElementById('input-statut').value
  const commentaire = document.getElementById('input-commentaire').value.trim()
  const commentaire_auteur = document.getElementById('input-auteur').value.trim()
  
  // Validation
  if (statut === 'indisponible') {
    if (!commentaire) {
      alert('Veuillez indiquer la raison de l\'indisponibilité')
      return
    }
    if (!commentaire_auteur) {
      alert('Veuillez indiquer votre nom')
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
        commentaire_auteur: statut === 'indisponible' ? commentaire_auteur : null
      })
    })
    
    const data = await response.json()
    
    if (!data.success) {
      alert('Erreur: ' + data.error)
      return
    }
    
    // Fermer la modale
    closeModal()
    
    // Recharger les quais
    await loadQuais()
    
    // Afficher notification de succès
    showNotification(`Quai ${currentQuaiNumero} mis à jour avec succès`)
  } catch (error) {
    console.error('Erreur mise à jour quai:', error)
    alert('Erreur lors de la mise à jour du quai')
  }
})

function showNotification(message) {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2'
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// ===== INITIALISATION =====

// Charger les chauffeurs au démarrage (vue par défaut)
loadChauffeurs()

// Rafraîchir les données toutes les 30 secondes
setInterval(() => {
  const container = document.getElementById('slide-container')
  if (container.classList.contains('slide-right')) {
    loadQuais() // Si on est sur la vue quais
  } else {
    loadChauffeurs() // Si on est sur la vue chauffeurs
  }
}, 30000)
