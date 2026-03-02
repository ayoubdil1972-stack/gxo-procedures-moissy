// Système de gestion des avis et commentaires pour les procédures

// Structure de stockage local (localStorage)
const REVIEWS_KEY = 'gxo_procedure_reviews'

// Initialiser le système d'avis
function initReviewSystem() {
  // Charger les avis depuis localStorage
  const reviews = getReviews()
  console.log(`Système d'avis initialisé - ${Object.keys(reviews).length} procédures notées`)
  
  // Mettre à jour l'affichage de toutes les étoiles
  updateAllStarsDisplay()
}

// Mettre à jour l'affichage des étoiles pour toutes les procédures
function updateAllStarsDisplay() {
  document.querySelectorAll('[data-procedure-id]').forEach(element => {
    const procedureId = element.dataset.procedureId
    updateStarsDisplay(procedureId)
  })
}

// Mettre à jour l'affichage des étoiles pour une procédure
function updateStarsDisplay(procedureId) {
  const data = getProcedureReviews(procedureId)
  const starElement = document.querySelector(`[data-procedure-id="${procedureId}"]`)
  const badgeElement = document.querySelector(`[data-procedure-rating="${procedureId}"]`)
  
  if (starElement) {
    const rating = parseFloat(data.averageRating) || 0
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    let starsHTML = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += '⭐'
      } else if (i === fullStars + 1 && hasHalfStar) {
        starsHTML += '✨'
      } else {
        starsHTML += '☆'
      }
    }
    
    starElement.innerHTML = starsHTML
  }
  
  if (badgeElement) {
    if (data.totalRatings > 0) {
      badgeElement.textContent = `${data.averageRating} (${data.totalRatings} avis)`
    } else {
      badgeElement.textContent = 'Pas encore noté'
    }
  }
}

// Récupérer tous les avis
function getReviews() {
  const stored = localStorage.getItem(REVIEWS_KEY)
  return stored ? JSON.parse(stored) : {}
}

// Récupérer les avis d'une procédure spécifique
function getProcedureReviews(procedureId) {
  const reviews = getReviews()
  return reviews[procedureId] || {
    ratings: [],
    comments: [],
    averageRating: 0,
    totalRatings: 0
  }
}

// Sauvegarder les avis
function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

// Ajouter une note (1-5 étoiles)
function addRating(procedureId, rating, userName = 'Anonyme') {
  if (rating < 1 || rating > 5) {
    alert('La note doit être entre 1 et 5 étoiles')
    return
  }

  const reviews = getReviews()
  
  if (!reviews[procedureId]) {
    reviews[procedureId] = {
      ratings: [],
      comments: [],
      averageRating: 0,
      totalRatings: 0
    }
  }

  const newRating = {
    rating: rating,
    userName: userName,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('fr-FR')
  }

  reviews[procedureId].ratings.push(newRating)
  reviews[procedureId].totalRatings = reviews[procedureId].ratings.length
  
  // Calculer la moyenne
  const sum = reviews[procedureId].ratings.reduce((acc, r) => acc + r.rating, 0)
  reviews[procedureId].averageRating = (sum / reviews[procedureId].totalRatings).toFixed(1)

  saveReviews(reviews)
  
  // Mettre à jour l'affichage des étoiles
  updateStarsDisplay(procedureId)
  
  return reviews[procedureId]
}

// Ajouter un commentaire
function addComment(procedureId, commentText, userName = 'Anonyme', rating = null) {
  if (!commentText || commentText.trim().length === 0) {
    alert('Le commentaire ne peut pas être vide')
    return
  }

  const reviews = getReviews()
  
  if (!reviews[procedureId]) {
    reviews[procedureId] = {
      ratings: [],
      comments: [],
      averageRating: 0,
      totalRatings: 0
    }
  }

  const newComment = {
    text: commentText.trim(),
    userName: userName,
    rating: rating,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('fr-FR'),
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    likes: 0
  }

  reviews[procedureId].comments.unshift(newComment) // Ajouter au début
  
  // Si une note est fournie avec le commentaire
  if (rating) {
    const ratingData = addRating(procedureId, rating, userName)
    return ratingData
  }

  saveReviews(reviews)
  
  // Mettre à jour l'affichage des étoiles
  updateStarsDisplay(procedureId)
  
  return reviews[procedureId]
}

// Générer les étoiles HTML
function generateStarsHTML(rating, interactive = false, procedureId = '') {
  let html = '<div class="flex items-center gap-1">'
  
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating)
    const halfFilled = i === Math.ceil(rating) && rating % 1 !== 0
    
    if (interactive) {
      html += `
        <button 
          onclick="selectRating('${procedureId}', ${i})" 
          class="star-btn text-2xl transition-all hover:scale-125"
          data-rating="${i}"
        >
          ${filled ? '⭐' : (halfFilled ? '✨' : '☆')}
        </button>
      `
    } else {
      html += `<span class="text-xl">${filled ? '⭐' : (halfFilled ? '✨' : '☆')}</span>`
    }
  }
  
  html += '</div>'
  return html
}

// Sélectionner une note (pour le formulaire)
function selectRating(procedureId, rating) {
  // Mettre à jour l'affichage
  const container = document.querySelector(`#rating-${procedureId}`)
  if (container) {
    container.innerHTML = generateStarsHTML(rating, true, procedureId)
  }
  
  // Stocker la note temporairement
  const form = document.querySelector(`#review-form-${procedureId}`)
  if (form) {
    form.dataset.selectedRating = rating
  }
}

// Afficher le modal d'avis
function showReviewModal(procedureId, procedureTitle) {
  const modal = document.getElementById('review-modal')
  if (!modal) return

  // Mettre à jour le titre
  document.getElementById('review-modal-title').textContent = procedureTitle
  document.getElementById('review-procedure-id').value = procedureId

  // Réinitialiser le formulaire
  document.getElementById('review-form').reset()
  document.getElementById('rating-stars').innerHTML = generateStarsHTML(0, true, 'modal')
  document.getElementById('review-form').dataset.selectedRating = '0'

  // Charger les avis existants
  loadProcedureReviews(procedureId)

  // Afficher le modal
  modal.classList.remove('hidden')
  modal.classList.add('flex')
}

// Fermer le modal
function closeReviewModal() {
  const modal = document.getElementById('review-modal')
  if (modal) {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
  }
}

// Soumettre un avis
function submitReview(event) {
  event.preventDefault()
  
  const form = event.target
  const procedureId = document.getElementById('review-procedure-id').value
  const rating = parseInt(form.dataset.selectedRating || '0')
  const commentText = document.getElementById('review-comment').value
  const userName = document.getElementById('review-name').value || 'Anonyme'

  if (rating === 0 && !commentText) {
    alert('Veuillez donner une note ou laisser un commentaire')
    return
  }

  // Ajouter l'avis
  if (commentText) {
    addComment(procedureId, commentText, userName, rating > 0 ? rating : null)
  } else if (rating > 0) {
    addRating(procedureId, rating, userName)
  }

  // Recharger les avis
  loadProcedureReviews(procedureId)

  // Réinitialiser le formulaire
  form.reset()
  form.dataset.selectedRating = '0'
  document.getElementById('rating-stars').innerHTML = generateStarsHTML(0, true, 'modal')

  // Afficher un message de confirmation
  showNotification('Merci pour votre avis !', 'success')

  // Mettre à jour l'affichage de la procédure
  updateProcedureRatingDisplay(procedureId)
}

// Charger et afficher les avis d'une procédure
function loadProcedureReviews(procedureId) {
  const data = getProcedureReviews(procedureId)
  const container = document.getElementById('reviews-list')
  
  if (!container) return

  // Afficher les statistiques
  const statsHTML = `
    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-3xl font-bold text-[#00205B]">${data.averageRating || '-'}</div>
          <div class="text-sm text-gray-600">${data.totalRatings} note(s)</div>
        </div>
        <div>
          ${generateStarsHTML(parseFloat(data.averageRating) || 0, false)}
        </div>
      </div>
    </div>
  `

  // Afficher les commentaires
  let commentsHTML = '<div class="space-y-4">'
  
  if (data.comments.length === 0) {
    commentsHTML += `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-comment text-4xl mb-2"></i>
        <p>Aucun commentaire pour le moment</p>
        <p class="text-sm">Soyez le premier à donner votre avis !</p>
      </div>
    `
  } else {
    data.comments.forEach((comment, index) => {
      commentsHTML += `
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 bg-[#00205B] text-white rounded-full flex items-center justify-center font-bold">
                ${comment.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div class="font-semibold text-gray-800">${comment.userName}</div>
                <div class="text-xs text-gray-500">${comment.date} à ${comment.time}</div>
              </div>
            </div>
            ${comment.rating ? generateStarsHTML(comment.rating, false) : ''}
          </div>
          <p class="text-gray-700 mt-2">${comment.text}</p>
          <div class="mt-3 flex items-center gap-4 text-sm">
            <button 
              onclick="likeComment('${procedureId}', ${index})" 
              class="text-gray-500 hover:text-[#00205B] transition-colors"
            >
              <i class="far fa-thumbs-up mr-1"></i>
              Utile (${comment.likes || 0})
            </button>
          </div>
        </div>
      `
    })
  }
  
  commentsHTML += '</div>'

  container.innerHTML = statsHTML + commentsHTML
}

// Aimer un commentaire
function likeComment(procedureId, commentIndex) {
  const reviews = getReviews()
  if (reviews[procedureId] && reviews[procedureId].comments[commentIndex]) {
    reviews[procedureId].comments[commentIndex].likes = (reviews[procedureId].comments[commentIndex].likes || 0) + 1
    saveReviews(reviews)
    loadProcedureReviews(procedureId)
    showNotification('Merci pour votre feedback !', 'info')
  }
}

// Mettre à jour l'affichage de la note sur la carte procédure
function updateProcedureRatingDisplay(procedureId) {
  const data = getProcedureReviews(procedureId)
  const badge = document.querySelector(`[data-procedure-rating="${procedureId}"]`)
  
  if (badge && data.totalRatings > 0) {
    badge.innerHTML = `
      <div class="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
        <span>⭐ ${data.averageRating}</span>
        <span class="text-gray-600">(${data.totalRatings})</span>
      </div>
    `
    badge.classList.remove('hidden')
  }
}

// Afficher une notification
function showNotification(message, type = 'success') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }

  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`
  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    </div>
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add('animate-fade-out')
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Initialiser les notes au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  initReviewSystem()

  // Mettre à jour l'affichage des notes pour toutes les procédures
  document.querySelectorAll('[data-procedure-rating]').forEach(badge => {
    const procedureId = badge.dataset.procedureRating
    updateProcedureRatingDisplay(procedureId)
  })
})

// Fermer le modal en cliquant en dehors
document.addEventListener('click', (e) => {
  const modal = document.getElementById('review-modal')
  if (e.target === modal) {
    closeReviewModal()
  }
})

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeReviewModal()
  }
})