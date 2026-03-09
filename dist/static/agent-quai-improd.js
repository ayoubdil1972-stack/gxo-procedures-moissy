// GXO Moissy - Agent de Quai Improductivité
// Gestion des notifications d'improductivité pour les agents de quai

let improdStateQuai = {
  active: false,
  raison: null,
  startTime: null,
  timerInterval: null,
  agentNom: ''
}

// Charger le nom sauvegardé
document.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('agent_nom_improd')
  if (savedName) {
    document.getElementById('agent-nom-improd').value = savedName
  }
  
  // Charger l'historique improductivités
  loadImprodHistoriqueQuai()
})

// Switcher entre les onglets
function switchTabAgentQuai(tab) {
  const improdBtn = document.getElementById('tab-improd-quai-btn')
  const proceduresBtn = document.getElementById('tab-procedures-quai-btn')
  const improdContent = document.getElementById('tab-improd-quai-content')
  const proceduresContent = document.getElementById('tab-procedures-quai-content')

  if (tab === 'improd') {
    // Activer onglet Improductivité
    improdBtn.classList.add('bg-yellow-50', 'border-yellow-500', 'text-yellow-700')
    improdBtn.classList.remove('border-transparent', 'text-gray-500')
    proceduresBtn.classList.remove('bg-yellow-50', 'border-yellow-500', 'text-yellow-700')
    proceduresBtn.classList.add('border-transparent', 'text-gray-500')
    
    improdContent.classList.remove('hidden')
    proceduresContent.classList.add('hidden')
  } else {
    // Activer onglet Procédures
    proceduresBtn.classList.add('bg-yellow-50', 'border-yellow-500', 'text-yellow-700')
    proceduresBtn.classList.remove('border-transparent', 'text-gray-500')
    improdBtn.classList.remove('bg-yellow-50', 'border-yellow-500', 'text-yellow-700')
    improdBtn.classList.add('border-transparent', 'text-gray-500')
    
    proceduresContent.classList.remove('hidden')
    improdContent.classList.add('hidden')
  }
}

// Sélectionner une raison d'improductivité
function selectImprodRaisonQuai(raison) {
  // Retirer la sélection précédente
  document.querySelectorAll('.improd-option-quai').forEach(btn => {
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

  // Enregistrer la raison et activer le bouton
  improdStateQuai.raison = raison
  document.getElementById('btn-demarrer-improd-quai').disabled = false
}

// Démarrer improductivité
function demarrerImprodQuai() {
  const nom = document.getElementById('agent-nom-improd').value.trim()
  
  if (!nom) {
    alert('⚠️ Veuillez entrer votre nom avant de démarrer')
    return
  }
  
  if (!improdStateQuai.raison) {
    alert('⚠️ Veuillez sélectionner une raison d\'improductivité')
    return
  }

  // Sauvegarder le nom pour la prochaine fois
  localStorage.setItem('agent_nom_improd', nom)
  
  // Démarrer le timer
  improdStateQuai.active = true
  improdStateQuai.agentNom = nom
  improdStateQuai.startTime = Date.now()
  
  // Afficher le timer et masquer le bouton démarrer
  document.getElementById('improd-timer-quai').classList.remove('hidden')
  document.getElementById('btn-demarrer-container-quai').classList.add('hidden')
  
  // Désactiver la sélection de raison
  document.querySelectorAll('.improd-option-quai').forEach(btn => {
    btn.disabled = true
    btn.classList.add('opacity-50', 'cursor-not-allowed')
  })
  
  // Lancer l'update du timer
  improdStateQuai.timerInterval = setInterval(updateImprodTimerQuai, 1000)
  updateImprodTimerQuai()
}

// Mettre à jour le timer
function updateImprodTimerQuai() {
  if (!improdStateQuai.active) return
  
  const elapsed = Date.now() - improdStateQuai.startTime
  const hours = Math.floor(elapsed / 3600000)
  const minutes = Math.floor((elapsed % 3600000) / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  
  const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  document.getElementById('timer-display-quai').textContent = display
}

// Clôturer improductivité
async function cloturerImprodQuai() {
  if (!improdStateQuai.active) return
  
  // Arrêter le timer
  clearInterval(improdStateQuai.timerInterval)
  
  const endTime = new Date()
  let duree = ''
  
  if (improdStateQuai.raison === 'formation') {
    duree = '07:00:00'
  } else {
    const elapsed = Math.floor((Date.now() - improdStateQuai.startTime) / 1000)
    const hours = Math.floor(elapsed / 3600)
    const minutes = Math.floor((elapsed % 3600) / 60)
    const seconds = elapsed % 60
    duree = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  
  // Préparer les données pour l'API improductivités
  const data = {
    utilisateur_nom: improdStateQuai.agentNom,
    role: 'agent_quai',
    raison: improdStateQuai.raison,
    duree: duree,
    commentaire: '',
    date_debut: new Date(improdStateQuai.startTime).toISOString(),
    date_fin: endTime.toISOString()
  }
  
  try {
    // Envoyer au serveur (nouvelle API improductivités)
    const response = await fetch('/api/improductivites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    const result = await response.json()
    
    if (result.success) {
      alert('✅ Improductivité enregistrée et transmise au chef d\'équipe')
      
      // Sauvegarder aussi dans localStorage pour l'historique local
      const historique = JSON.parse(localStorage.getItem('improd_historique_quai') || '[]')
      const raisons = {
        etiquette: 'Erreur étiquette palette',
        reseau: 'Problème de réseau',
        formation: 'Formation',
        accident: 'Accident sur palette'
      }
      
      historique.push({
        agent: improdStateQuai.agentNom,
        raison: raisons[improdStateQuai.raison],
        duree: duree,
        timestamp: endTime.toISOString(),
        date: new Date().toLocaleDateString('fr-FR'),
        heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      })
      
      localStorage.setItem('improd_historique_quai', JSON.stringify(historique))
      
      // Reset du formulaire
      resetImprodFormQuai()
      
      // Recharger l'historique
      loadImprodHistoriqueQuai()
    } else {
      alert('❌ Erreur lors de l\'enregistrement : ' + (result.error || 'Erreur inconnue'))
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('❌ Erreur de connexion au serveur')
  }
  
  improdStateQuai.active = false
}

// Reset du formulaire
function resetImprodFormQuai() {
  // Masquer le timer
  document.getElementById('improd-timer-quai').classList.add('hidden')
  document.getElementById('btn-demarrer-container-quai').classList.remove('hidden')
  
  // Réactiver les boutons
  document.querySelectorAll('.improd-option-quai').forEach(btn => {
    btn.disabled = false
    btn.classList.remove('opacity-50', 'cursor-not-allowed', 'border-red-500', 'bg-red-50', 
                           'border-orange-500', 'bg-orange-50', 'border-blue-500', 'bg-blue-50', 
                           'border-purple-500', 'bg-purple-50')
    btn.classList.add('border-gray-300')
  })
  
  // Désactiver le bouton démarrer
  document.getElementById('btn-demarrer-improd-quai').disabled = true
  
  // Reset state
  improdStateQuai.raison = null
  improdStateQuai.startTime = null
}

// Charger l'historique
function loadImprodHistoriqueQuai() {
  const container = document.getElementById('improd-historique-quai')
  const historique = JSON.parse(localStorage.getItem('improd_historique_quai') || '[]')
  
  // Filtrer pour aujourd'hui seulement
  const today = new Date().toLocaleDateString('fr-FR')
  const aujourdhui = historique.filter(h => h.date === today)
  
  if (aujourdhui.length === 0) {
    container.innerHTML = `
      <div class="text-center text-gray-500 py-12">
        <i class="fas fa-inbox text-4xl mb-2"></i>
        <p>Aucune improductivité enregistrée aujourd'hui</p>
      </div>
    `
    return
  }
  
  // Afficher l'historique (plus récent en premier)
  container.innerHTML = aujourdhui.reverse().map(item => {
    const colors = {
      'Erreur étiquette palette': 'red',
      'Problème de réseau': 'orange',
      'Formation': 'blue',
      'Accident sur palette': 'purple'
    }
    const color = colors[item.raison] || 'gray'
    
    return `
      <div class="bg-white border-l-4 border-${color}-500 rounded-lg p-4 shadow">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-2">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-800">
                ${item.raison}
              </span>
              <span class="text-gray-500 text-sm">${item.heure}</span>
            </div>
            <div class="text-sm text-gray-600">
              <i class="fas fa-user mr-2"></i>
              <span class="font-semibold">${item.agent}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-${color}-600">${item.duree}</div>
            <div class="text-xs text-gray-500">durée</div>
          </div>
        </div>
      </div>
    `
  }).join('')
}

// Exposer les fonctions au contexte global
window.switchTabAgentQuai = switchTabAgentQuai
window.selectImprodRaisonQuai = selectImprodRaisonQuai
window.demarrerImprodQuai = demarrerImprodQuai
window.cloturerImprodQuai = cloturerImprodQuai
