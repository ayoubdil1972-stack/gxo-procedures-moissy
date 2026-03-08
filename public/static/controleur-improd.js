// GXO Moissy - Contrôleur Improductivité
// Gestion des notifications d'improductivité

let improdState = {
  active: false,
  raison: null,
  startTime: null,
  timerInterval: null,
  controleurNom: ''
}

// Charger le nom sauvegardé
document.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('controleur_nom_improd')
  if (savedName) {
    document.getElementById('controleur-nom-improd').value = savedName
  }
  
  // Charger l'historique
  loadImprodHistorique()
})

// Switcher entre les onglets
function switchTabControleur(tab) {
  const improdBtn = document.getElementById('tab-improd-btn')
  const ecartBtn = document.getElementById('tab-ecart-btn')
  const improdContent = document.getElementById('tab-improd-content')
  const ecartContent = document.getElementById('tab-ecart-content')

  if (tab === 'improd') {
    // Activer onglet Improductivité
    improdBtn.classList.add('bg-green-50', 'border-green-500', 'text-green-700')
    improdBtn.classList.remove('border-transparent', 'text-gray-500')
    ecartBtn.classList.remove('bg-orange-50', 'border-orange-500', 'text-orange-700')
    ecartBtn.classList.add('border-transparent', 'text-gray-500')
    
    improdContent.classList.remove('hidden')
    ecartContent.classList.add('hidden')
  } else {
    // Activer onglet Écart
    ecartBtn.classList.add('bg-orange-50', 'border-orange-500', 'text-orange-700')
    ecartBtn.classList.remove('border-transparent', 'text-gray-500')
    improdBtn.classList.remove('bg-green-50', 'border-green-500', 'text-green-700')
    improdBtn.classList.add('border-transparent', 'text-gray-500')
    
    ecartContent.classList.remove('hidden')
    improdContent.classList.add('hidden')
  }
}

// Sélectionner une raison d'improductivité
function selectImprodRaison(raison) {
  // Retirer la sélection précédente
  document.querySelectorAll('.improd-option').forEach(btn => {
    btn.classList.remove('border-red-500', 'bg-red-50', 'border-orange-500', 'bg-orange-50', 
                          'border-blue-500', 'bg-blue-50', 'border-purple-500', 'bg-purple-50')
    btn.classList.add('border-gray-300')
  })

  // Ajouter la sélection à la nouvelle option
  const selectedBtn = document.querySelector(`[data-raison="${raison}"]`)
  selectedBtn.classList.remove('border-gray-300')
  
  switch(raison) {
    case 'etiquette':
      selectedBtn.classList.add('border-red-500', 'bg-red-50')
      break
    case 'reseau':
      selectedBtn.classList.add('border-orange-500', 'bg-orange-50')
      break
    case 'formation':
      selectedBtn.classList.add('border-blue-500', 'bg-blue-50')
      break
    case 'accident':
      selectedBtn.classList.add('border-purple-500', 'bg-purple-50')
      break
  }

  improdState.raison = raison
}

// Démarrer l'improductivité
function demarrerImprod() {
  const nom = document.getElementById('controleur-nom-improd').value.trim()
  
  if (!nom) {
    alert('⚠️ Veuillez entrer votre nom')
    return
  }
  
  if (!improdState.raison) {
    alert('⚠️ Veuillez sélectionner une raison d\'improductivité')
    return
  }

  // Sauvegarder le nom pour la prochaine fois
  localStorage.setItem('controleur_nom_improd', nom)
  improdState.controleurNom = nom

  // Démarrer le timer
  improdState.active = true
  improdState.startTime = new Date()

  // Afficher la section timer
  document.getElementById('improd-timer-section').classList.remove('hidden')
  document.getElementById('btn-demarrer-improd').classList.add('hidden')

  // Afficher la raison
  const raisonText = {
    'etiquette': '❌ Erreur étiquette palette',
    'reseau': '📶 Problème de réseau',
    'formation': '📚 Formation',
    'accident': '⚠️ Accident sur palette'
  }
  document.getElementById('improd-raison-display').textContent = raisonText[improdState.raison]

  // Si formation, afficher 07:00:00 directement (pas de timer)
  if (improdState.raison === 'formation') {
    document.getElementById('improd-timer-display').textContent = '07:00:00'
  } else {
    // Démarrer le timer pour les autres cas
    improdState.timerInterval = setInterval(updateImprodTimer, 1000)
    updateImprodTimer() // Mise à jour immédiate
  }
}

// Mettre à jour le timer
function updateImprodTimer() {
  if (!improdState.active || !improdState.startTime) return

  const now = new Date()
  const elapsed = Math.floor((now - improdState.startTime) / 1000) // secondes

  const hours = Math.floor(elapsed / 3600)
  const minutes = Math.floor((elapsed % 3600) / 60)
  const seconds = elapsed % 60

  const display = 
    String(hours).padStart(2, '0') + ':' + 
    String(minutes).padStart(2, '0') + ':' + 
    String(seconds).padStart(2, '0')

  document.getElementById('improd-timer-display').textContent = display
}

// Clôturer l'improductivité
async function cloturerImprod() {
  if (!improdState.active) return

  // Arrêter le timer
  if (improdState.timerInterval) {
    clearInterval(improdState.timerInterval)
    improdState.timerInterval = null
  }

  const endTime = new Date()
  let duree = ''

  if (improdState.raison === 'formation') {
    duree = '07:00:00'
  } else {
    duree = document.getElementById('improd-timer-display').textContent
  }

  const commentaire = document.getElementById('improd-commentaire').value.trim()

  // Préparer les données
  const data = {
    controleur_nom: improdState.controleurNom,
    raison: improdState.raison,
    duree: duree,
    commentaire: commentaire,
    date_debut: improdState.startTime.toISOString(),
    date_fin: endTime.toISOString()
  }

  try {
    // Envoyer au serveur
    const response = await fetch('/api/controleur/improd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result.success) {
      alert('✅ Improductivité enregistrée avec succès')
      
      // Réinitialiser le formulaire
      resetImprodForm()
      
      // Recharger l'historique
      loadImprodHistorique()
    } else {
      alert('❌ Erreur lors de l\'enregistrement : ' + (result.error || 'Erreur inconnue'))
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('❌ Erreur de connexion au serveur')
  }
}

// Réinitialiser le formulaire
function resetImprodForm() {
  improdState = {
    active: false,
    raison: null,
    startTime: null,
    timerInterval: null,
    controleurNom: improdState.controleurNom // Garder le nom
  }

  document.getElementById('improd-timer-section').classList.add('hidden')
  document.getElementById('btn-demarrer-improd').classList.remove('hidden')
  document.getElementById('improd-commentaire').value = ''
  document.getElementById('improd-timer-display').textContent = '00:00:00'

  // Retirer toutes les sélections
  document.querySelectorAll('.improd-option').forEach(btn => {
    btn.classList.remove('border-red-500', 'bg-red-50', 'border-orange-500', 'bg-orange-50', 
                          'border-blue-500', 'bg-blue-50', 'border-purple-500', 'bg-purple-50')
    btn.classList.add('border-gray-300')
  })
}

// Charger l'historique des improductivités
async function loadImprodHistorique() {
  try {
    const response = await fetch('/api/controleur/improd/historique')
    const result = await response.json()

    if (result.success && result.improds && result.improds.length > 0) {
      const container = document.getElementById('improd-historique')
      
      container.innerHTML = result.improds.map(improd => {
        const raisonLabel = {
          'etiquette': '❌ Erreur étiquette',
          'reseau': '📶 Problème réseau',
          'formation': '📚 Formation',
          'accident': '⚠️ Accident palette'
        }[improd.raison] || improd.raison

        const raisonColor = {
          'etiquette': 'border-red-500 bg-red-50',
          'reseau': 'border-orange-500 bg-orange-50',
          'formation': 'border-blue-500 bg-blue-50',
          'accident': 'border-purple-500 bg-purple-50'
        }[improd.raison] || 'border-gray-500 bg-gray-50'

        return `
          <div class="border-l-4 ${raisonColor} p-4 rounded">
            <div class="flex items-center justify-between mb-2">
              <div class="font-semibold text-gray-800">${raisonLabel}</div>
              <div class="text-2xl font-bold text-gray-800">${improd.duree}</div>
            </div>
            <div class="text-sm text-gray-600">
              <div><i class="fas fa-user mr-2"></i>${improd.controleur_nom}</div>
              <div><i class="fas fa-clock mr-2"></i>${formatDate(improd.created_at)}</div>
              ${improd.commentaire ? `<div class="mt-2 italic"><i class="fas fa-comment mr-2"></i>${improd.commentaire}</div>` : ''}
            </div>
          </div>
        `
      }).join('')
    }
  } catch (error) {
    console.error('Erreur chargement historique:', error)
  }
}

// Formater une date
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
