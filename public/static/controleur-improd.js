// GXO Moissy - Contrôleur Improductivité & Alertes
// Gestion des notifications d'improductivité et des alertes écart/non-conformité

// ===== TRADUCTIONS =====
const NON_CONFORMITES = {
  point_1: "1. Extérieur / Essieux (plombage camion)",
  point_2: "2. Côtés gauche et droit (déchirures, ...)",
  point_3: "3. Paroi avant (double fond, ...)",
  point_4: "4. Plancher (trappes, plancher amovible, ...)",
  point_5: "5. Plafond / Toit (déchirures, usures, ...)",
  point_6: "6. Portes intérieures / extérieures (herméticité, ...)",
  point_7: "7. Cales roues bien positionnées",
  point_8: "8. Nuisibles",
  point_9: "9. Corps étranger",
  point_10: "10. Propreté",
  point_11: "11. Odeur"
}

const PROBLEMES_RENCONTRES = {
  palettes_largeur: "Palettes chargées en largeur",
  palettes_instables: "Palettes instables / mal chargées",
  palettes_mal_dechargees: "Palettes mal déchargées",
  marchandises_dangereuses: "Marchandises dangereuses non chargées en fond de camion",
  palettes_mal_filmees: "Palettes mal filmées",
  mauvais_formulaire_tu: "Mauvais formulaire TU entrant",
  autres: "Autres"
}

const JOURS_SEMAINE = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche"
}

function traduireNonConformite(point) {
  return NON_CONFORMITES[point] || point
}

function traduireProbleme(probleme) {
  return PROBLEMES_RENCONTRES[probleme] || probleme
}

function traduireJour(jour) {
  return JOURS_SEMAINE[jour] || jour
}

let improdState = {
  active: false,
  raison: null,
  startTime: null,
  timerInterval: null,
  controleurNom: ''
}

let alertesState = {
  currentFilter: 'en_attente',
  currentAlerteId: null
}

// Charger le nom sauvegardé
document.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('controleur_nom_improd')
  if (savedName) {
    document.getElementById('controleur-nom-improd').value = savedName
    document.getElementById('modal-controleur-nom').value = savedName
  }
  
  // Charger l'historique improductivités
  loadImprodHistorique()
  
  // Charger les alertes et statistiques
  loadAlertes('en_attente')
  loadAlertesStats()
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

// ===== GESTION DES ALERTES ÉCART/NON-CONFORMITÉ =====

// État du système d'archives
let archivesState = {
  currentView: 'today', // 'today', 'week', 'archives'
  expandedDays: {} // Pour stocker les jours dépliés
}

// Basculer vers une vue d'archives
function switchArchiveView(view) {
  archivesState.currentView = view
  
  // Mettre à jour les boutons
  const btnToday = document.getElementById('btn-archives-today')
  const btnWeek = document.getElementById('btn-archives-week')
  const btnArchives = document.getElementById('btn-archives-all')
  
  // Reset styles
  ;[btnToday, btnWeek, btnArchives].forEach(btn => {
    btn.classList.remove('bg-blue-500', 'text-white')
    btn.classList.add('bg-white', 'text-gray-700')
  })
  
  // Activer le bouton sélectionné
  if (view === 'today') {
    btnToday.classList.remove('bg-white', 'text-gray-700')
    btnToday.classList.add('bg-blue-500', 'text-white')
  } else if (view === 'week') {
    btnWeek.classList.remove('bg-white', 'text-gray-700')
    btnWeek.classList.add('bg-blue-500', 'text-white')
  } else {
    btnArchives.classList.remove('bg-white', 'text-gray-700')
    btnArchives.classList.add('bg-blue-500', 'text-white')
  }
  
  // Charger les alertes pour la vue sélectionnée
  loadAlertes('traitee')
}

// Toggle accordéon jour
function toggleDayAccordion(day) {
  archivesState.expandedDays[day] = !archivesState.expandedDays[day]
  
  const content = document.getElementById(`day-${day}-content`)
  const icon = document.getElementById(`day-${day}-icon`)
  
  if (archivesState.expandedDays[day]) {
    content.classList.remove('hidden')
    icon.classList.remove('fa-chevron-down')
    icon.classList.add('fa-chevron-up')
  } else {
    content.classList.add('hidden')
    icon.classList.remove('fa-chevron-up')
    icon.classList.add('fa-chevron-down')
  }
}

// Fonction pour grouper les alertes par jour
function groupAlertesByDay(alertes) {
  const groups = {
    today: [],
    thisWeek: { lundi: [], mardi: [], mercredi: [], jeudi: [], vendredi: [], samedi: [], dimanche: [] },
    older: []
  }
  
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Début de la semaine (lundi)
  const dayOfWeek = now.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Adjust when today is Sunday
  const monday = new Date(today)
  monday.setDate(today.getDate() + diff)
  
  alertes.forEach(alerte => {
    const alerteDate = new Date(alerte.traite_le || alerte.created_at)
    const alerteDayStart = new Date(alerteDate.getFullYear(), alerteDate.getMonth(), alerteDate.getDate())
    
    // Vérifier si c'est aujourd'hui
    if (alerteDayStart.getTime() === today.getTime()) {
      groups.today.push(alerte)
    }
    // Vérifier si c'est cette semaine
    else if (alerteDayStart >= monday && alerteDayStart < today) {
      const dayName = alerteDate.toLocaleDateString('fr-FR', { weekday: 'long' })
      if (dayName === 'lundi') groups.thisWeek.lundi.push(alerte)
      else if (dayName === 'mardi') groups.thisWeek.mardi.push(alerte)
      else if (dayName === 'mercredi') groups.thisWeek.mercredi.push(alerte)
      else if (dayName === 'jeudi') groups.thisWeek.jeudi.push(alerte)
      else if (dayName === 'vendredi') groups.thisWeek.vendredi.push(alerte)
      else if (dayName === 'samedi') groups.thisWeek.samedi.push(alerte)
      else if (dayName === 'dimanche') groups.thisWeek.dimanche.push(alerte)
    }
    // Plus ancien
    else {
      groups.older.push(alerte)
    }
  })
  
  return groups
}

// Générer le HTML d'une carte d'alerte (utilisé pour toutes les alertes)
function generateAlerteCard(alerte, statut = 'traitee') {
  // Parser les données JSON
  const problemesData = JSON.parse(alerte.non_conformites || '[]')
  const ecart = alerte.ecart_palettes_attendues !== alerte.ecart_palettes_recues
  
  // Séparer les problèmes et les non-conformités
  const problemes = []
  const nonConformites = []
  
  problemesData.forEach(item => {
    if (item.startsWith('point_')) {
      // C'est une non-conformité (point_1 à point_11) - LEGACY
      nonConformites.push(item)
    } else {
      // C'est un problème rencontré (palettes_largeur, etc.)
      problemes.push(item)
    }
  })
  
  // Parser les points de vérification (nouveau champ)
  const verificationPoints = JSON.parse(alerte.verification_points || '{}')
  const pointsNonConformes = []
  
  // Extraire les points marqués comme "non_conforme"
  Object.keys(verificationPoints).forEach(pointKey => {
    if (verificationPoints[pointKey] === 'non_conforme') {
      pointsNonConformes.push(pointKey)
    }
  })
  
  return `
    <div class="border-l-4 ${statut === 'en_attente' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'} p-6 rounded-lg shadow mb-4">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Quai ${alerte.quai_numero}
            </span>
            ${statut === 'en_attente' ? 
              '<span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold"><i class="fas fa-exclamation-triangle mr-1"></i>EN ATTENTE</span>' :
              '<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"><i class="fas fa-check mr-1"></i>TRAITÉE</span>'
            }
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span class="font-semibold text-gray-700">ID:</span>
              <span class="text-gray-600">${alerte.numero_id}</span>
            </div>
            <div>
              <span class="font-semibold text-gray-700">Fournisseur:</span>
              <span class="text-gray-600">${alerte.fournisseur}</span>
            </div>
            <div>
              <span class="font-semibold text-gray-700">Premier scan:</span>
              <span class="text-gray-600">${formatDate(alerte.heure_premier_scan)}</span>
            </div>
            <div>
              <span class="font-semibold text-gray-700">Fin déchargement:</span>
              <span class="text-gray-600">${formatDate(alerte.heure_fin_dechargement)}</span>
            </div>
          </div>

          ${ecart ? `
            <div class="bg-red-100 border border-red-300 rounded p-3 mb-3">
              <div class="font-semibold text-red-800 mb-1">
                <i class="fas fa-exclamation-circle mr-2"></i>
                Écart de palettes
              </div>
              <div class="text-sm text-red-700">
                Attendues: <strong>${alerte.ecart_palettes_attendues}</strong> | 
                Reçues: <strong>${alerte.ecart_palettes_recues}</strong>
              </div>
            </div>
          ` : ''}

          ${problemes.length > 0 ? `
            <div class="bg-yellow-100 border border-yellow-400 rounded p-3 mb-3">
              <div class="font-semibold text-yellow-900 mb-2">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Problèmes rencontrés (${problemes.length})
              </div>
              <ul class="text-sm text-yellow-800 space-y-1">
                ${problemes.map(pb => `<li><i class="fas fa-chevron-right mr-2"></i>${traduireProbleme(pb)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${pointsNonConformes.length > 0 ? `
            <div class="bg-red-100 border border-red-400 rounded p-3 mb-3">
              <div class="font-semibold text-red-900 mb-2">
                <i class="fas fa-times-circle mr-2"></i>
                Points de contrôle non-conformes (${pointsNonConformes.length})
              </div>
              <ul class="text-sm text-red-800 space-y-1">
                ${pointsNonConformes.map(point => `<li><i class="fas fa-times text-red-600 mr-2"></i>${traduireNonConformite(point)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${nonConformites.length > 0 ? `
            <div class="bg-orange-100 border border-orange-300 rounded p-3 mb-3">
              <div class="font-semibold text-orange-800 mb-2">
                <i class="fas fa-times-circle mr-2"></i>
                Non-conformités détectées (${nonConformites.length})
              </div>
              <ul class="text-sm text-orange-700 space-y-1">
                ${nonConformites.map(nc => `<li><i class="fas fa-ban mr-2"></i>${traduireNonConformite(nc)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${statut === 'traitee' && alerte.consignes ? `
            <div class="bg-green-100 border border-green-300 rounded p-3">
              <div class="font-semibold text-green-800 mb-1">
                <i class="fas fa-clipboard-check mr-2"></i>
                Consignes - ${alerte.traite_par}
              </div>
              <div class="text-sm text-green-700">${alerte.consignes}</div>
              <div class="text-xs text-green-600 mt-1">Traité le ${formatDate(alerte.traite_le)}</div>
            </div>
          ` : ''}
        </div>

        ${statut === 'en_attente' ? `
          <button 
            class="ml-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg font-semibold"
            onclick="ouvrirModalTraitement(${alerte.id})"
          >
            <i class="fas fa-edit mr-2"></i>
            Traiter
          </button>
        ` : ''}
      </div>
    </div>
  `
}

// Afficher les archives avec accordéon par jour
function renderArchives(alertes) {
  const container = document.getElementById('alertes-container')
  const groups = groupAlertesByDay(alertes)
  
  let html = `
    <!-- Boutons de navigation archives -->
    <div class="mb-6 flex space-x-4 bg-white p-4 rounded-lg shadow">
      <button 
        id="btn-archives-today"
        class="px-6 py-2 rounded-lg font-semibold transition-all ${archivesState.currentView === 'today' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}"
        onclick="switchArchiveView('today')"
      >
        <i class="fas fa-calendar-day mr-2"></i>
        Aujourd'hui (${groups.today.length})
      </button>
      <button 
        id="btn-archives-week"
        class="px-6 py-2 rounded-lg font-semibold transition-all ${archivesState.currentView === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}"
        onclick="switchArchiveView('week')"
      >
        <i class="fas fa-calendar-week mr-2"></i>
        Cette semaine
      </button>
      <button 
        id="btn-archives-all"
        class="px-6 py-2 rounded-lg font-semibold transition-all ${archivesState.currentView === 'archives' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}"
        onclick="switchArchiveView('archives')"
      >
        <i class="fas fa-archive mr-2"></i>
        Archives (${groups.older.length})
      </button>
    </div>
  `
  
  // Vue Aujourd'hui
  if (archivesState.currentView === 'today') {
    if (groups.today.length === 0) {
      html += `
        <div class="text-center text-gray-500 py-12">
          <i class="fas fa-calendar-day text-5xl mb-3"></i>
          <p class="text-lg">Aucune alerte traitée aujourd'hui</p>
        </div>
      `
    } else {
      html += `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-calendar-day mr-2 text-blue-500"></i>
            Alertes traitées aujourd'hui (${groups.today.length})
          </h3>
          ${groups.today.map(a => generateAlerteCard(a)).join('')}
        </div>
      `
    }
  }
  
  // Vue Cette semaine (Accordéon par jour)
  else if (archivesState.currentView === 'week') {
    const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
    const jourLabels = {
      lundi: 'Lundi',
      mardi: 'Mardi',
      mercredi: 'Mercredi',
      jeudi: 'Jeudi',
      vendredi: 'Vendredi',
      samedi: 'Samedi',
      dimanche: 'Dimanche'
    }
    const jourIcons = {
      lundi: 'fa-calendar',
      mardi: 'fa-calendar',
      mercredi: 'fa-calendar',
      jeudi: 'fa-calendar',
      vendredi: 'fa-calendar',
      samedi: 'fa-calendar',
      dimanche: 'fa-calendar'
    }
    
    const totalSemaine = jours.reduce((sum, jour) => sum + groups.thisWeek[jour].length, 0)
    
    if (totalSemaine === 0) {
      html += `
        <div class="text-center text-gray-500 py-12">
          <i class="fas fa-calendar-week text-5xl mb-3"></i>
          <p class="text-lg">Aucune alerte traitée cette semaine</p>
        </div>
      `
    } else {
      html += `<div class="space-y-3">`
      
      jours.forEach(jour => {
        const alertesJour = groups.thisWeek[jour]
        if (alertesJour.length > 0) {
          const isExpanded = archivesState.expandedDays[jour] || false
          
          html += `
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <!-- En-tête accordéon -->
              <button 
                class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onclick="toggleDayAccordion('${jour}')"
              >
                <div class="flex items-center space-x-3">
                  <i class="fas ${jourIcons[jour]} text-blue-500"></i>
                  <span class="font-bold text-gray-800 text-lg">${jourLabels[jour]}</span>
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ${alertesJour.length} alerte${alertesJour.length > 1 ? 's' : ''}
                  </span>
                </div>
                <i id="day-${jour}-icon" class="fas fa-chevron-${isExpanded ? 'up' : 'down'} text-gray-500"></i>
              </button>
              
              <!-- Contenu accordéon -->
              <div id="day-${jour}-content" class="${isExpanded ? '' : 'hidden'} p-4 bg-gray-50 space-y-4">
                ${alertesJour.map(a => generateAlerteCard(a)).join('')}
              </div>
            </div>
          `
        }
      })
      
      html += `</div>`
    }
  }
  
  // Vue Archives (plus ancien)
  else {
    if (groups.older.length === 0) {
      html += `
        <div class="text-center text-gray-500 py-12">
          <i class="fas fa-archive text-5xl mb-3"></i>
          <p class="text-lg">Aucune archive disponible</p>
        </div>
      `
    } else {
      html += `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-archive mr-2 text-gray-600"></i>
            Archives (${groups.older.length})
          </h3>
          ${groups.older.map(a => generateAlerteCard(a)).join('')}
        </div>
      `
    }
  }
  
  container.innerHTML = html
}

// Charger les statistiques des alertes
async function loadAlertesStats() {
  try {
    const response = await fetch('/api/controleur/alertes/stats')
    const result = await response.json()
    
    if (result.success && result.stats) {
      document.getElementById('stat-en-attente').textContent = result.stats.en_attente
      document.getElementById('stat-traitees').textContent = result.stats.traitees_aujourd_hui
      document.getElementById('stat-semaine').textContent = result.stats.traitees_semaine
      
      console.log('📊 Statistiques chargées:', result.stats)
    }
  } catch (error) {
    console.error('❌ Erreur chargement statistiques:', error)
  }
}

// Charger les alertes avec système d'archives
async function loadAlertes(statut = 'en_attente') {
  try {
    alertesState.currentFilter = statut
    const container = document.getElementById('alertes-container')
    
    // Recharger les statistiques depuis l'API
    loadAlertesStats()
    
    // Si alertes en attente
    if (statut === 'en_attente') {
      const response = await fetch(`/api/controleur/alertes?statut=en_attente`)
      const result = await response.json()

      if (result.success) {
        const alertes = result.alertes || []
        
        if (alertes.length === 0) {
          container.innerHTML = `
            <div class="text-center text-gray-500 py-12">
              <i class="fas fa-inbox text-5xl mb-3"></i>
              <p class="text-lg">Aucune alerte en attente</p>
            </div>
          `
          return
        }

        // Pour les alertes en attente, utiliser generateAlerteCard
        container.innerHTML = alertes.map(alerte => generateAlerteCard(alerte, 'en_attente')).join('')
      }
    }
    
    // Si alertes traitées - Afficher "Cette semaine" avec accordéon 7 jours
    else if (statut === 'traitee') {
      const response = await fetch(`/api/controleur/alertes/semaine`)
      const result = await response.json()

      if (result.success) {
        const alertes = result.alertes || []
        const semaine = result.semaine || {}
        
        // Grouper par jour de la semaine
        const jourMap = {
          0: 'dimanche',
          1: 'lundi',
          2: 'mardi',
          3: 'mercredi',
          4: 'jeudi',
          5: 'vendredi',
          6: 'samedi'
        }
        
        const jourLabels = {
          lundi: 'Lundi',
          mardi: 'Mardi',
          mercredi: 'Mercredi',
          jeudi: 'Jeudi',
          vendredi: 'Vendredi',
          samedi: 'Samedi',
          dimanche: 'Dimanche'
        }
        
        const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
        const alertesParJour = {}
        
        // Initialiser tous les jours à vide
        jours.forEach(jour => {
          alertesParJour[jour] = []
        })
        
        // Grouper les alertes par jour
        alertes.forEach(alerte => {
          const jourNom = jourMap[alerte.jour_semaine_numero]
          if (jourNom) {
            alertesParJour[jourNom].push(alerte)
          }
        })
        
        // Afficher titre de la semaine + accordéon
        let html = `
          <div class="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <div class="flex items-center">
              <i class="fas fa-calendar-week text-2xl text-blue-500 mr-3"></i>
              <div>
                <h3 class="text-xl font-bold text-gray-800">${semaine.titre || 'Cette semaine'}</h3>
                <p class="text-sm text-gray-600">Alertes traitées cette semaine</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
        `
        
        // Créer un accordéon pour chaque jour
        jours.forEach(jour => {
          const alertesJour = alertesParJour[jour]
          const count = alertesJour.length
          const isExpanded = archivesState.expandedDays[jour] || false
          
          html += `
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <!-- En-tête accordéon -->
              <button 
                class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onclick="toggleDayAccordion('${jour}')"
              >
                <div class="flex items-center space-x-3">
                  <i class="fas fa-calendar text-blue-500"></i>
                  <span class="font-bold text-gray-800 text-lg">${jourLabels[jour]}</span>
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ${count}
                  </span>
                </div>
                <i id="day-${jour}-icon" class="fas fa-chevron-${isExpanded ? 'up' : 'down'} text-gray-500"></i>
              </button>
              
              <!-- Contenu accordéon -->
              <div id="day-${jour}-content" class="${isExpanded ? '' : 'hidden'} p-4 bg-gray-50 space-y-4">
                ${count === 0 ? '<p class="text-gray-500 text-center py-4">Aucune alerte ce jour</p>' : alertesJour.map(a => generateAlerteCard(a, 'traitee')).join('')}
              </div>
            </div>
          `
        })
        
        html += `</div>`
        
        container.innerHTML = html
      }
    }
  } catch (error) {
    console.error('Erreur chargement alertes:', error)
  }
}

// Filtrer les alertes
function filtrerAlertes(statut) {
  // Mettre à jour les boutons
  const btnAttente = document.getElementById('btn-filtre-attente')
  const btnTraitees = document.getElementById('btn-filtre-traitees')
  
  if (statut === 'en_attente') {
    btnAttente.classList.add('bg-orange-500', 'text-white')
    btnAttente.classList.remove('bg-gray-200', 'text-gray-700')
    btnTraitees.classList.remove('bg-orange-500', 'text-white')
    btnTraitees.classList.add('bg-gray-200', 'text-gray-700')
  } else {
    btnTraitees.classList.add('bg-orange-500', 'text-white')
    btnTraitees.classList.remove('bg-gray-200', 'text-gray-700')
    btnAttente.classList.remove('bg-orange-500', 'text-white')
    btnAttente.classList.add('bg-gray-200', 'text-gray-700')
  }
  
  loadAlertes(statut)
}

// Ouvrir modal de traitement
async function ouvrirModalTraitement(alerteId) {
  try {
    // Charger les détails de l'alerte
    const response = await fetch(`/api/controleur/alertes?statut=en_attente`)
    const result = await response.json()
    
    if (result.success) {
      const alerte = result.alertes.find(a => a.id === alerteId)
      if (!alerte) {
        alert('❌ Alerte introuvable')
        return
      }
      
      alertesState.currentAlerteId = alerteId
      
      // Remplir le modal
      document.getElementById('modal-alerte-titre').textContent = `Quai ${alerte.quai_numero} - ${alerte.fournisseur}`
      
      const nonConformites = JSON.parse(alerte.non_conformites || '[]')
      const ecart = alerte.ecart_palettes_attendues !== alerte.ecart_palettes_recues
      
      const detailsHtml = `
        <div class="bg-gray-50 border border-gray-200 rounded p-4 space-y-2">
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><strong>Quai:</strong> ${alerte.quai_numero}</div>
            <div><strong>ID:</strong> ${alerte.numero_id}</div>
            <div><strong>Fournisseur:</strong> ${alerte.fournisseur}</div>
            <div><strong>Premier scan:</strong> ${formatDate(alerte.heure_premier_scan)}</div>
            <div><strong>Fin déchargement:</strong> ${formatDate(alerte.heure_fin_dechargement)}</div>
          </div>
          
          ${ecart ? `
            <div class="bg-red-50 border border-red-200 rounded p-3 mt-3">
              <div class="font-semibold text-red-800 text-sm mb-1">Écart de palettes</div>
              <div class="text-sm text-red-700">
                Attendues: <strong>${alerte.ecart_palettes_attendues}</strong> | 
                Reçues: <strong>${alerte.ecart_palettes_recues}</strong>
              </div>
            </div>
          ` : ''}
          
          ${nonConformites.length > 0 ? `
            <div class="bg-orange-50 border border-orange-200 rounded p-3 mt-3">
              <div class="font-semibold text-orange-800 text-sm mb-2">Non-conformités (${nonConformites.length})</div>
              <ul class="text-sm text-orange-700 space-y-1">
                ${nonConformites.map(pb => `<li>• ${pb}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `
      
      document.getElementById('modal-alerte-details').innerHTML = detailsHtml
      document.getElementById('modal-consignes').value = ''
      
      // Afficher le modal
      document.getElementById('modal-traiter-alerte').classList.remove('hidden')
    }
  } catch (error) {
    console.error('Erreur ouverture modal:', error)
    alert('❌ Erreur lors du chargement de l\'alerte')
  }
}

// Fermer modal
function fermerModalAlerte() {
  document.getElementById('modal-traiter-alerte').classList.add('hidden')
  alertesState.currentAlerteId = null
}

// Valider traitement alerte
async function validerTraitementAlerte() {
  const nom = document.getElementById('modal-controleur-nom').value.trim()
  const consignes = document.getElementById('modal-consignes').value.trim()
  
  if (!nom) {
    alert('⚠️ Veuillez entrer votre nom')
    return
  }
  
  if (!consignes) {
    alert('⚠️ Veuillez saisir les consignes')
    return
  }
  
  if (!alertesState.currentAlerteId) {
    alert('❌ Erreur: Aucune alerte sélectionnée')
    return
  }
  
  try {
    // Sauvegarder le nom pour la prochaine fois
    localStorage.setItem('controleur_nom_improd', nom)
    
    const response = await fetch(`/api/controleur/alertes/${alertesState.currentAlerteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        traite_par: nom,
        consignes: consignes
      })
    })
    
    const result = await response.json()
    
    if (result.success) {
      alert('✅ Alerte traitée avec succès')
      fermerModalAlerte()
      loadAlertes(alertesState.currentFilter)
      loadAlertesStats() // Recharger les statistiques
    } else {
      alert('❌ Erreur: ' + (result.error || 'Erreur inconnue'))
    }
  } catch (error) {
    console.error('Erreur traitement alerte:', error)
    alert('❌ Erreur de connexion au serveur')
  }
}

// ===== EXPOSER LES FONCTIONS AU CONTEXTE GLOBAL POUR onclick =====
window.switchTabControleur = switchTabControleur
window.selectImprodRaison = selectImprodRaison
window.demarrerImprod = demarrerImprod
window.cloturerImprod = cloturerImprod
window.filtrerAlertes = filtrerAlertes
window.ouvrirModalTraitement = ouvrirModalTraitement
window.fermerModalAlerte = fermerModalAlerte
window.validerTraitementAlerte = validerTraitementAlerte
window.switchArchiveView = switchArchiveView
window.toggleDayAccordion = toggleDayAccordion
