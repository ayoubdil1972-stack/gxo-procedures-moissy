// ====================================================================
// MODULE DE SCAN CODE-BARRES POUR GESTION DES QUAIS GXO
// Version 1.0.0 - Compatible avec scanners HID (USB/Bluetooth)
// ====================================================================

// Configuration du mapping code-barres → numéro de quai
const BARCODE_MAPPING = {
  // Format: "CODE_BARRE": numéro_quai
  'D001': 1, 'D002': 2, 'D003': 3, 'D004': 4, 'D005': 5,
  'D006': 6, 'D007': 7, 'D008': 8, 'D009': 9, 'D010': 10,
  'D032': 32, 'D033': 33, 'D034': 34, 'D035': 35, 'D036': 36,
  'D037': 37, 'D038': 38,
  'D045': 45, 'D046': 46, 'D047': 47, 'D048': 48, 'D049': 49,
  'D060': 60, 'D061': 61, 'D062': 62, 'D067': 67, 'D068': 68, 'D069': 69,
  'D075': 75, 'D076': 76, 'D077': 77, 'D078': 78, 'D079': 79,
  'D081': 81, 'D082': 82, 'D083': 83, 'D084': 84, 'D085': 85,
  'D086': 86, 'D087': 87,
  'D099': 99, 'D100': 100, 'D101': 101, 'D102': 102, 'D103': 103
}

// État global du scanner
let scannerState = {
  isActive: false,
  lastScan: null,
  scanHistory: [],
  inputBuffer: '',
  lastInputTime: 0
}

// ====================================================================
// INITIALISATION DU SCANNER
// ====================================================================

/**
 * Initialise le système de scan de code-barres
 * À appeler au chargement de la page
 */
function initBarcodeScanner() {
  console.log('🔍 Initialisation du scanner code-barres...')
  
  // Créer l'input invisible pour capturer les scans
  createHiddenScanInput()
  
  // Activer les listeners
  attachScannerListeners()
  
  // Protéger les champs de saisie contre le vol de focus
  protectInputFields()
  
  // Afficher l'indicateur de scanner actif
  showScannerIndicator()
  
  scannerState.isActive = true
  console.log('✅ Scanner code-barres activé')
  console.log('📋 Mappings disponibles:', Object.keys(BARCODE_MAPPING).length, 'codes-barres')
}

/**
 * Protège tous les champs de saisie contre le vol de focus
 */
function protectInputFields() {
  console.log('🛡️ Protection des champs de saisie...')
  
  // Fonction pour protéger un champ
  function protectField(field) {
    if (field.id === 'barcode-scan-input') {
      return // Ne pas protéger l'input du scanner lui-même
    }
    
    // Empêcher la perte de focus quand on clique dedans
    field.addEventListener('focus', (e) => {
      console.log('🔒 Champ protégé a reçu le focus:', field.id || field.name || field.placeholder)
      e.stopPropagation()
    }, { capture: true })
    
    // Empêcher blur non désiré
    field.addEventListener('blur', (e) => {
      // Remettre le focus immédiatement si blur causé par le scanner
      const relatedTarget = e.relatedTarget
      if (relatedTarget && relatedTarget.id === 'barcode-scan-input') {
        console.log('⚠️ Blur causé par scanner, restauration du focus sur:', field.id || field.placeholder)
        e.preventDefault()
        setTimeout(() => field.focus(), 10)
      }
    }, { capture: true })
  }
  
  // Protéger tous les inputs et textareas existants
  setTimeout(() => {
    document.querySelectorAll('input:not(#barcode-scan-input), textarea').forEach(protectField)
    console.log('✅ Champs de saisie protégés')
  }, 500)
  
  // Observer les nouveaux champs ajoutés dynamiquement
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if ((node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') && node.id !== 'barcode-scan-input') {
          protectField(node)
        }
        // Chercher aussi dans les enfants
        if (node.querySelectorAll) {
          node.querySelectorAll('input:not(#barcode-scan-input), textarea').forEach(protectField)
        }
      })
    })
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

/**
 * Crée un input caché pour capturer les scans du scanner HID
 * IMPORTANT : Ne plus forcer le focus automatiquement pour permettre la saisie dans d'autres champs
 */
function createHiddenScanInput() {
  // Vérifier si l'input existe déjà
  let scanInput = document.getElementById('barcode-scan-input')
  
  if (!scanInput) {
    scanInput = document.createElement('input')
    scanInput.id = 'barcode-scan-input'
    scanInput.type = 'text'
    scanInput.className = 'fixed opacity-0 pointer-events-none'
    scanInput.style.cssText = 'position: fixed; top: -9999px; left: -9999px;'
    scanInput.autocomplete = 'off'
    scanInput.placeholder = 'Scan'
    document.body.appendChild(scanInput)
  }
  
  // NE PLUS forcer le focus automatiquement
  // L'input sera focusé uniquement via le listener click ci-dessous
  
  // Le listener click a été déplacé dans attachScannerListeners()
}

/**
 * Attache les listeners pour détecter les scans
 */
function attachScannerListeners() {
  const scanInput = document.getElementById('barcode-scan-input')
  
  if (!scanInput) {
    console.error('❌ Input de scan non trouvé')
    return
  }
  
  // Listener principal : détection de la touche Enter (fin de scan)
  scanInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const scannedValue = scanInput.value.trim().toUpperCase()
      
      if (scannedValue) {
        console.log('📷 Code-barres scanné:', scannedValue)
        handleBarcodeScan(scannedValue)
      }
      
      // Reset l'input
      scanInput.value = ''
      scanInput.focus()
    }
  })
  
  // Listener secondaire : détection de scan rapide (vs saisie manuelle)
  scanInput.addEventListener('input', (e) => {
    const currentTime = Date.now()
    const timeDiff = currentTime - scannerState.lastInputTime
    
    // Si l'input est très rapide (< 50ms entre caractères), c'est probablement un scan
    if (timeDiff < 50 && scanInput.value.length > 1) {
      scannerState.inputBuffer = scanInput.value
    }
    
    scannerState.lastInputTime = currentTime
  })
  
  // Listener global : maintenir le focus sur l'input (DÉSACTIVÉ pour permettre la saisie dans d'autres champs)
  // Ce listener est commenté pour éviter que le scanner HID ne vole le focus
  // des autres champs de saisie (commentaire, recherche, etc.)
  
  // document.addEventListener('keydown', (e) => {
  //   // Ignorer si on tape dans un autre input/textarea
  //   if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
  //     if (e.target.id !== 'barcode-scan-input') {
  //       return
  //     }
  //   }
  //   
  //   // Rediriger les touches vers l'input de scan
  //   if (scannerState.isActive && e.target.id !== 'barcode-scan-input') {
  //     scanInput.focus()
  //   }
  // })
  
  // À la place, on focus uniquement l'input de scan au clic sur la page
  // (mais pas quand on clique sur un autre input/textarea)
  document.addEventListener('click', (e) => {
    // Liste complète des éléments interactifs à ignorer
    const interactiveElements = ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'A', 'LABEL']
    
    // Ne pas récupérer le focus si on clique sur un élément interactif
    if (interactiveElements.includes(e.target.tagName)) {
      console.log('🛑 Clic sur élément interactif, pas de focus scanner:', e.target.tagName)
      return
    }
    
    // Vérifier aussi les parents (pour les clics à l'intérieur d'un élément)
    let parent = e.target.parentElement
    while (parent) {
      if (interactiveElements.includes(parent.tagName)) {
        console.log('🛑 Clic dans élément interactif (parent), pas de focus scanner:', parent.tagName)
        return
      }
      parent = parent.parentElement
    }
    
    // Sinon, focus sur l'input de scan pour permettre le scan HID
    if (scannerState.isActive && scanInput) {
      console.log('✅ Focus sur scanner HID (clic zone vide)')
      scanInput.focus()
    }
  })
}

// ====================================================================
// TRAITEMENT DU SCAN
// ====================================================================

/**
 * Traite un code-barres scanné
 * @param {string} barcode - Code-barres scanné (ex: "D075")
 */
async function handleBarcodeScan(barcode) {
  console.log('🔄 Traitement du scan:', barcode)
  console.log('📍 URL actuelle:', window.location.href)
  console.log('📋 Mapping disponible:', Object.keys(BARCODE_MAPPING).length, 'codes')
  
  // Vérifier si le code-barres est dans le mapping
  const quaiNumero = BARCODE_MAPPING[barcode]
  
  if (!quaiNumero) {
    console.warn('⚠️ Code-barres non reconnu:', barcode)
    console.warn('💡 Codes valides:', Object.keys(BARCODE_MAPPING).slice(0, 10).join(', '), '...')
    showScanError(`Code-barres non reconnu: ${barcode}`)
    playScanErrorSound()
    alert(`❌ Code-barres non reconnu: ${barcode}\n\nCodes valides: D001-D010, D032-D038, D045-D049, etc.`)
    return
  }
  
  console.log('✅ Quai identifié:', quaiNumero)
  console.log('⏱️ Démarrage de la séquence de scan...')
  
  // Ajouter à l'historique
  addToScanHistory(barcode, quaiNumero)
  
  // Mettre à jour le compteur de scans
  updateScanCounter()
  
  // Afficher notification de scan
  showScanNotification(barcode, quaiNumero)
  
  // Jouer un son de confirmation
  playScanSuccessSound()
  
  // Démarrer le timer du quai (CRITIQUE)
  console.log('🎯 Appel de startQuaiTimer pour quai', quaiNumero)
  await startQuaiTimer(quaiNumero)
  
  // Envoyer à l'API backend
  await sendScanToAPI(barcode, quaiNumero)
  
  // Mettre à jour l'affichage
  highlightQuai(quaiNumero)
  
  // Scroll vers le quai
  scrollToQuai(quaiNumero)
  
  console.log('✅ Séquence de scan terminée pour', barcode, '→ Quai', quaiNumero)
}

/**
 * Démarre le timer d'un quai
 * @param {number} quaiNumero - Numéro du quai
 */
async function startQuaiTimer(quaiNumero) {
  console.log('⏱️ Démarrage du timer pour Quai', quaiNumero)
  console.log('🌐 URL API:', `/api/quais/${quaiNumero}`)
  
  try {
    // Utiliser l'API existante pour mettre le quai en "en_cours"
    console.log('📤 Envoi de la requête POST...')
    const response = await fetch(`/api/quais/${quaiNumero}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        statut: 'en_cours',
        commentaire: null,
        commentaire_auteur: 'Scanner Code-Barres'
      })
    })
    
    console.log('📥 Réponse reçue, status:', response.status)
    const data = await response.json()
    console.log('📊 Données reçues:', data)
    
    if (data.success) {
      console.log('✅ Timer démarré pour Quai', quaiNumero)
      console.log('📊 Données retournées:', data.quai)
      console.log('⏰ Timer start:', data.quai?.timer_start)
      
      // Afficher un message de confirmation
      alert(`✅ SUCCÈS !\n\nQuai ${quaiNumero} activé\nTimer démarré: ${data.quai?.timer_start || 'maintenant'}\n\nLe quai devrait passer en JAUNE dans quelques secondes...`)
      
      // FORCER le rechargement avec un délai pour laisser le temps à la DB
      setTimeout(async () => {
        console.log('🔄 Début du rechargement des quais...')
        if (typeof loadQuais === 'function') {
          console.log('🔄 Rechargement des quais...')
          await loadQuais()
          console.log('✅ Quais rechargés')
        } else {
          console.error('❌ loadQuais n\'existe pas - tentative de rechargement de la page')
          alert('⚠️ La fonction loadQuais n\'existe pas.\n\nLa page va se recharger pour afficher le changement...')
          // Alternative : recharger toute la page
          window.location.reload()
        }
      }, 500) // Augmenté à 500ms pour plus de sécurité
    } else {
      console.error('❌ Erreur démarrage timer:', data.error)
      showScanError(`Erreur: ${data.error}`)
      alert(`❌ ERREUR !\n\nImpossible de démarrer le timer du Quai ${quaiNumero}\n\nErreur: ${data.error}`)
    }
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du timer:', error)
    console.error('🔍 Détails:', error.message, error.stack)
    showScanError('Erreur de connexion au serveur')
    alert(`❌ ERREUR RÉSEAU !\n\nImpossible de contacter le serveur\n\nErreur: ${error.message}\n\nVérifiez votre connexion internet.`)
  }
}

/**
 * Envoie le scan à l'API backend
 * @param {string} barcode - Code-barres scanné
 * @param {number} quaiNumero - Numéro du quai
 */
async function sendScanToAPI(barcode, quaiNumero) {
  try {
    const response = await fetch('/api/quai/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barcode: barcode,
        quai: quaiNumero,
        action: 'start_timer',
        timestamp: new Date().toISOString()
      })
    })
    
    // Optionnel : l'API peut retourner des infos supplémentaires
    if (response.ok) {
      const data = await response.json()
      console.log('📤 Scan envoyé à l\'API:', data)
    }
  } catch (error) {
    console.warn('⚠️ Erreur envoi API (non bloquant):', error)
  }
}

// ====================================================================
// INTERFACE UTILISATEUR
// ====================================================================

/**
 * Affiche l'indicateur de scanner actif
 */
function showScannerIndicator() {
  // Créer l'indicateur s'il n'existe pas
  let indicator = document.getElementById('scanner-indicator')
  
  if (!indicator) {
    indicator = document.createElement('div')
    indicator.id = 'scanner-indicator'
    indicator.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3'
    indicator.innerHTML = `
      <div class="animate-pulse">
        <i class="fas fa-barcode text-2xl"></i>
      </div>
      <div>
        <div class="font-bold text-sm">Scanner Actif</div>
        <div class="text-xs opacity-75">Prêt à scanner</div>
      </div>
    `
    document.body.appendChild(indicator)
  }
}

/**
 * Affiche une notification de scan réussi
 * @param {string} barcode - Code-barres scanné
 * @param {number} quaiNumero - Numéro du quai
 */
function showScanNotification(barcode, quaiNumero) {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in'
  notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <i class="fas fa-check-circle text-3xl"></i>
      <div>
        <div class="font-bold text-lg">Scan réussi !</div>
        <div class="text-sm opacity-90">Quai ${quaiNumero} activé</div>
        <div class="text-xs opacity-75 mt-1">Code: ${barcode}</div>
      </div>
    </div>
  `
  document.body.appendChild(notification)
  
  // Retirer après 3 secondes
  setTimeout(() => {
    notification.classList.add('animate-fade-out')
    setTimeout(() => notification.remove(), 500)
  }, 3000)
}

/**
 * Affiche une erreur de scan
 * @param {string} message - Message d'erreur
 */
function showScanError(message) {
  const errorNotif = document.createElement('div')
  errorNotif.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in'
  errorNotif.innerHTML = `
    <div class="flex items-center space-x-3">
      <i class="fas fa-exclamation-triangle text-3xl"></i>
      <div>
        <div class="font-bold text-lg">Erreur de scan</div>
        <div class="text-sm opacity-90">${message}</div>
      </div>
    </div>
  `
  document.body.appendChild(errorNotif)
  
  setTimeout(() => {
    errorNotif.classList.add('animate-fade-out')
    setTimeout(() => errorNotif.remove(), 500)
  }, 4000)
}

/**
 * Met en surbrillance un quai après scan
 * @param {number} quaiNumero - Numéro du quai
 */
function highlightQuai(quaiNumero) {
  const quaiCard = document.querySelector(`[data-quai="${quaiNumero}"]`)
  
  if (quaiCard) {
    // Ajouter classe de surbrillance temporaire
    quaiCard.classList.add('ring-4', 'ring-green-400', 'scale-110')
    
    // Retirer après 2 secondes
    setTimeout(() => {
      quaiCard.classList.remove('ring-4', 'ring-green-400', 'scale-110')
    }, 2000)
  }
}

/**
 * Scroll vers un quai
 * @param {number} quaiNumero - Numéro du quai
 */
function scrollToQuai(quaiNumero) {
  const quaiCard = document.querySelector(`[data-quai="${quaiNumero}"]`)
  
  if (quaiCard) {
    quaiCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// ====================================================================
// SONS DE FEEDBACK
// ====================================================================

/**
 * Joue un son de scan réussi
 */
function playScanSuccessSound() {
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTUIGWm98OScTgwOUrDj7rRgHAU7k9n0wX0pBSh+zPLaizsIHW7A7+OZUB0BPZjc8b12KQUngc7x2Ik1CBlpu+nnnUwMEFOw4+61YhwGOpLZ88V9JgUofM3y2os5CBxuvO/mnlAeAj2Z3PK9dykFKYHO8duJNQgZabvq559MEA5Rr+Ppt2IcBjuS2fPGfSYFJ3vM8tqLOQgcbrzu559REA1Ur+Pvu2QdBz2Y3fS+dygFJ3/M8dqLOQgbbrzu6J5PEA1Ur+Lru2QdBjuR2fPGfSYEKIHO8tuJNQgaaLvq5p5PDw5Ur+Lru2QdBjuS2fPGfSYEKH/M8duJNQgabbrp5p5PDw5Tr+Lqu2QdBjqR2fPGfSYEJ3/M8duJNQgabbrp5p5PDw5Tr+Lqu2QdBjqR2fPGfSYEJ3/M8duJNQgabbrp5p5PDw5Tr+Lqu2QdBjqR2fPGfSYEJ3/M8duJNQgabbrp5p5PDw5Tr+Lqu2QdBjqR2fPGfSYEJ3/M8duJNQgabbrp5p5PDw5Tr+Lqu2QdBjqR2fPGfSYEJ3/M8duJNQgabbrp5p5PDw5Tr+Lqu2QdBjqR2fPGfSYEJ3/M8duJNQgabbrp5p5PDw5T')
    audio.volume = 0.3
    audio.play().catch(() => {}) // Ignorer les erreurs de lecture
  } catch (error) {
    // Son désactivé si erreur
  }
}

/**
 * Joue un son d'erreur
 */
function playScanErrorSound() {
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/')
    audio.volume = 0.2
    audio.play().catch(() => {})
  } catch (error) {
    // Son désactivé si erreur
  }
}

// ====================================================================
// HISTORIQUE DES SCANS
// ====================================================================

/**
 * Ajoute un scan à l'historique
 * @param {string} barcode - Code-barres scanné
 * @param {number} quaiNumero - Numéro du quai
 */
function addToScanHistory(barcode, quaiNumero) {
  const scan = {
    barcode: barcode,
    quai: quaiNumero,
    timestamp: new Date().toISOString(),
    timestampFormatted: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
  }
  
  scannerState.scanHistory.unshift(scan)
  scannerState.lastScan = scan
  
  // Garder seulement les 50 derniers scans
  if (scannerState.scanHistory.length > 50) {
    scannerState.scanHistory = scannerState.scanHistory.slice(0, 50)
  }
  
  // Mettre à jour l'affichage de l'historique si disponible
  updateScanHistoryDisplay()
  
  // Sauvegarder dans le localStorage
  try {
    localStorage.setItem('gxo_scan_history', JSON.stringify(scannerState.scanHistory))
  } catch (error) {
    console.warn('⚠️ Impossible de sauvegarder l\'historique')
  }
}

/**
 * Met à jour l'affichage de l'historique
 */
function updateScanHistoryDisplay() {
  const historyContainer = document.getElementById('scan-history-list')
  
  if (!historyContainer) return
  
  if (scannerState.scanHistory.length === 0) {
    historyContainer.innerHTML = `
      <div class="text-center text-gray-400 py-8">
        <i class="fas fa-inbox text-4xl mb-2"></i>
        <p class="text-sm">Aucun scan enregistré</p>
      </div>
    `
    return
  }
  
  historyContainer.innerHTML = scannerState.scanHistory
    .slice(0, 10) // Afficher seulement les 10 derniers
    .map(scan => `
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div class="flex items-center space-x-3">
          <i class="fas fa-barcode text-blue-500"></i>
          <div>
            <div class="font-semibold text-sm">Quai ${scan.quai}</div>
            <div class="text-xs text-gray-500">${scan.barcode}</div>
          </div>
        </div>
        <div class="text-xs text-gray-400">
          ${scan.timestampFormatted}
        </div>
      </div>
    `)
    .join('')
}

/**
 * Met à jour le compteur de scans
 */
function updateScanCounter() {
  const counterElement = document.getElementById('scan-counter')
  if (counterElement) {
    counterElement.textContent = scannerState.scanHistory.length
  }
}

/**
 * Charge l'historique depuis le localStorage
 */
function loadScanHistory() {
  try {
    const saved = localStorage.getItem('gxo_scan_history')
    if (saved) {
      scannerState.scanHistory = JSON.parse(saved)
      console.log('📜 Historique chargé:', scannerState.scanHistory.length, 'scans')
      updateScanHistoryDisplay()
      updateScanCounter()
    }
  } catch (error) {
    console.warn('⚠️ Impossible de charger l\'historique')
  }
}

/**
 * Charge l'historique des scans depuis l'API
 */
async function loadScanHistoryFromAPI() {
  try {
    const response = await fetch('/api/quai/scans?limit=50')
    const data = await response.json()
    
    if (data.success && data.scans) {
      // Convertir les scans API en format local
      scannerState.scanHistory = data.scans.map(scan => ({
        barcode: scan.barcode,
        quai: scan.quai_numero,
        timestamp: scan.scan_timestamp,
        timestampFormatted: new Date(scan.scan_timestamp).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
      }))
      
      updateScanHistoryDisplay()
      updateScanCounter()
      console.log('📜 Historique API chargé:', scannerState.scanHistory.length, 'scans')
    }
  } catch (error) {
    console.warn('⚠️ Impossible de charger l\'historique depuis l\'API')
    // Fallback sur localStorage
    loadScanHistory()
  }
}

// ====================================================================
// UTILITAIRES
// ====================================================================

/**
 * Active le scanner
 */
function enableScanner() {
  scannerState.isActive = true
  const scanInput = document.getElementById('barcode-scan-input')
  if (scanInput) scanInput.focus()
  console.log('✅ Scanner activé')
}

/**
 * Désactive le scanner
 */
function disableScanner() {
  scannerState.isActive = false
  const scanInput = document.getElementById('barcode-scan-input')
  if (scanInput) scanInput.blur()
  console.log('⏸️ Scanner désactivé')
}

/**
 * Affiche l'état du scanner
 */
function getScannerStatus() {
  return {
    isActive: scannerState.isActive,
    lastScan: scannerState.lastScan,
    totalScans: scannerState.scanHistory.length,
    mappingsCount: Object.keys(BARCODE_MAPPING).length
  }
}

/**
 * Ajoute de nouveaux mappings de code-barres
 * @param {Object} newMappings - Nouveaux mappings à ajouter
 */
function addBarcodeMappings(newMappings) {
  Object.assign(BARCODE_MAPPING, newMappings)
  console.log('➕ Nouveaux mappings ajoutés:', Object.keys(newMappings).length)
  console.log('📋 Total mappings:', Object.keys(BARCODE_MAPPING).length)
}

// ====================================================================
// EXPORT DES FONCTIONS PUBLIQUES
// ====================================================================

// Rendre les fonctions accessibles globalement
window.initBarcodeScanner = initBarcodeScanner
window.enableScanner = enableScanner
window.disableScanner = disableScanner
window.getScannerStatus = getScannerStatus
window.addBarcodeMappings = addBarcodeMappings
window.loadScanHistory = loadScanHistoryFromAPI

// ====================================================================
// INITIALISATION AUTOMATIQUE
// ====================================================================

// Initialiser le scanner au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadScanHistoryFromAPI()
    initBarcodeScanner()
  })
} else {
  loadScanHistoryFromAPI()
  initBarcodeScanner()
}

console.log('📦 Module barcode-scanner.js chargé - Version 1.0.0')
