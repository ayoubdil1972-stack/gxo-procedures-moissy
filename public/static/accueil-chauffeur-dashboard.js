// Tableau de Bord Chauffeurs en Temps Réel
// Page: /accueil-chauffeur
// Section: Dashboard des chauffeurs actifs

let updateInterval = null;
let chauffeursMessagesLus = new Set(); // Cache des chauffeurs dont tous les messages ont été lus

// Charger les chauffeurs actifs
async function chargerChauffeursActifs() {
  try {
    const response = await fetch('/api/chauffeur/liste');
    const data = await response.json();
    
    if (data.success && data.chauffeurs) {
      afficherDashboardChauffeurs(data.chauffeurs);
      mettreAJourStatsDashboard(data.chauffeurs);
    } else {
      afficherMessageVide();
    }
  } catch (error) {
    console.error('Erreur chargement chauffeurs:', error);
    afficherErreurDashboard();
  }
}

// Afficher le dashboard des chauffeurs
function afficherDashboardChauffeurs(chauffeurs) {
  const container = document.getElementById('dashboard-chauffeurs-grid');
  
  if (!container) return;
  
  if (chauffeurs.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fas fa-inbox text-5xl mb-3 opacity-30"></i>
        <p class="text-lg">Aucun chauffeur actif pour le moment</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = '';
  
  chauffeurs.forEach(chauffeur => {
    // Calculer progression
    const taches = [
      chauffeur.task_epi_porte,
      chauffeur.task_placement_quai,
      chauffeur.task_palette_change,
      chauffeur.task_accueil_notifie,
      chauffeur.task_clefs_remises
    ];
    const tachesCompletes = taches.filter(t => t === 1).length;
    const progression = Math.round((tachesCompletes / taches.length) * 100);
    
    // Calculer durée
    const arrival = new Date(chauffeur.arrival_time);
    const now = new Date();
    const dureeMinutes = Math.floor((now - arrival) / 60000);
    
    // Couleur selon progression
    let borderColor = 'border-red-500';
    let bgColor = 'bg-red-50';
    let textColor = 'text-red-600';
    if (progression >= 80) {
      borderColor = 'border-green-500';
      bgColor = 'bg-green-50';
      textColor = 'text-green-600';
    } else if (progression >= 40) {
      borderColor = 'border-orange-500';
      bgColor = 'bg-orange-50';
      textColor = 'text-orange-600';
    }
    
    const card = document.createElement('div');
    card.className = `bg-white rounded-xl shadow-lg border-l-4 ${borderColor} p-6 transition-all hover:shadow-2xl transform hover:scale-102`;
    
    card.innerHTML = `
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            ${chauffeur.pseudo.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-gray-900 text-lg">${chauffeur.pseudo}</h3>
              ${chauffeur.online_status ? `
                <span class="flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  En ligne
                </span>
              ` : `
                <span class="flex items-center gap-1 text-xs text-gray-400">
                  <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Hors ligne
                </span>
              `}
            </div>
            <p class="text-xs text-gray-500">${chauffeur.entreprise}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <i class="fas fa-warehouse mr-1"></i>
            ${chauffeur.numero_quai || '--'}
          </div>
        </div>
      </div>
      
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-500 flex items-center gap-1">
            <i class="fas fa-tasks"></i>
            <span>Avancement</span>
          </span>
          <span class="text-sm font-bold ${textColor}">${progression}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div class="h-full rounded-full transition-all duration-500 ${progression >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : progression >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-red-400 to-red-600'}" style="width: ${progression}%"></div>
        </div>
      </div>
      
      <div class="grid grid-cols-5 gap-2 mb-4">
        ${taches.map((done, i) => {
          const icons = ['🦺', '🚚', '📦', '🔔', '🔑'];
          return `
            <div class="text-center">
              <div class="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg transition-all ${done ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100 border-2 border-gray-300'}">
                ${icons[i]}
              </div>
              ${done ? '<div class="text-xs text-green-600 mt-1"><i class="fas fa-check"></i></div>' : '<div class="text-xs text-gray-400 mt-1">⏳</div>'}
            </div>
          `;
        }).join('')}
      </div>
      
      <div class="flex items-center justify-between text-xs pt-3 border-t">
        <div class="flex items-center text-gray-500">
          <i class="fas fa-clock mr-1.5"></i>
          <span>${dureeMinutes} min</span>
        </div>
        <div class="flex items-center ${bgColor} ${textColor} px-2.5 py-1 rounded-full text-xs font-semibold">
          ${progression === 100 ? '<i class="fas fa-check-circle mr-1.5"></i>Prêt' : progression > 0 ? '<i class="fas fa-hourglass-half mr-1.5"></i>En cours' : '<i class="fas fa-circle-notch mr-1.5"></i>Début'}
        </div>
      </div>
      
      <div class="mt-4 flex gap-2">
        <button 
          onclick="ouvrirChatAdmin(${chauffeur.id}, '${chauffeur.pseudo}')"
          class="relative flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          data-chauffeur-id="${chauffeur.id}"
        >
          <i class="fas fa-comments"></i>
          <span>Chat</span>
          <span class="notification-badge hidden absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">0</span>
        </button>
        <button 
          onclick="cloturerChauffeur(${chauffeur.id}, '${chauffeur.pseudo}', ${progression})"
          class="flex-1 ${progression === 100 ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          title="${progression === 100 ? 'Toutes les tâches sont complétées' : 'Clôturer même si les tâches ne sont pas terminées'}"
        >
          <i class="fas ${progression === 100 ? 'fa-check-double' : 'fa-sign-out-alt'}"></i>
          <span>Clôturer</span>
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Charger les compteurs de messages non lus pour chaque chauffeur
  chargerCompteursMessagesNonLus(chauffeurs);
}

// Charger les compteurs de messages non lus pour tous les chauffeurs
async function chargerCompteursMessagesNonLus(chauffeurs) {
  for (const chauffeur of chauffeurs) {
    // Ne pas mettre à jour le badge si le chat avec ce chauffeur est actuellement ouvert
    if (chatAdminChauffeurId === chauffeur.id) {
      continue; // Ignorer ce chauffeur, son badge est déjà géré par le chat ouvert
    }
    
    // Ne pas mettre à jour le badge si tous les messages ont été lus (cache)
    if (chauffeursMessagesLus.has(chauffeur.id)) {
      continue; // Messages déjà lus, badge déjà masqué
    }
    
    try {
      const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${chauffeur.id}`);
      const data = await response.json();
      
      if (data.success && data.messages) {
        // Compter les messages non lus de l'admin (envoyés par le chauffeur et non lus par l'admin)
        const nonLus = data.messages.filter(m => m.sender === 'chauffeur' && !m.read_by_admin).length;
        
        const button = document.querySelector(`button[data-chauffeur-id="${chauffeur.id}"]`);
        if (button) {
          const badge = button.querySelector('.notification-badge');
          if (badge) {
            if (nonLus > 0) {
              badge.textContent = nonLus;
              badge.classList.remove('hidden');
              // Retirer du cache car il y a de nouveaux messages
              chauffeursMessagesLus.delete(chauffeur.id);
            } else {
              // Aucun message non lu : masquer le badge et ajouter au cache
              badge.classList.add('hidden');
              badge.textContent = '0';
              chauffeursMessagesLus.add(chauffeur.id);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Erreur chargement messages chauffeur ${chauffeur.id}:`, error);
    }
  }
}

// Mettre à jour les statistiques
function mettreAJourStatsDashboard(chauffeurs) {
  const total = chauffeurs.length;
  const complets = chauffeurs.filter(c => {
    const taches = [c.task_epi_porte, c.task_placement_quai, c.task_palette_change, c.task_accueil_notifie, c.task_clefs_remises];
    return taches.every(t => t === 1);
  }).length;
  const enCours = total - complets;
  
  // Mettre à jour les compteurs
  const totalElement = document.getElementById('stat-total-chauffeurs');
  const completsElement = document.getElementById('stat-complets');
  const enCoursElement = document.getElementById('stat-en-cours');
  
  if (totalElement) totalElement.textContent = total;
  if (completsElement) completsElement.textContent = complets;
  if (enCoursElement) enCoursElement.textContent = enCours;
}

// Afficher message vide
function afficherMessageVide() {
  const container = document.getElementById('dashboard-chauffeurs-grid');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fas fa-inbox text-5xl mb-3 opacity-30"></i>
        <p class="text-lg">Aucun chauffeur actif</p>
        <p class="text-sm mt-2">Les chauffeurs apparaîtront ici dès leur inscription</p>
      </div>
    `;
  }
}

// Afficher erreur
function afficherErreurDashboard() {
  const container = document.getElementById('dashboard-chauffeurs-grid');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-red-500">
        <i class="fas fa-exclamation-triangle text-5xl mb-3 opacity-30"></i>
        <p class="text-lg">Erreur de chargement</p>
        <button onclick="chargerChauffeursActifs()" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          <i class="fas fa-sync-alt mr-2"></i>
          Réessayer
        </button>
      </div>
    `;
  }
}

// Actualisation automatique toutes les 5 secondes
function demarrerActualisationDashboard() {
  // Charger immédiatement
  chargerChauffeursActifs();
  
  // Puis actualiser toutes les 5 secondes
  updateInterval = setInterval(() => {
    chargerChauffeursActifs();
  }, 5000);
}

// Arrêter l'actualisation
function arreterActualisationDashboard() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si on est sur la page accueil-chauffeur
  if (document.getElementById('dashboard-chauffeurs-container')) {
    demarrerActualisationDashboard();
  }
});

// Nettoyer à la fermeture
window.addEventListener('beforeunload', () => {
  arreterActualisationDashboard();
});

// ===== FONCTIONS CHAT ADMIN ↔ CHAUFFEUR =====
// Variables globales pour le chat
let chatAdminChauffeurId = null;
let chatAdminPseudo = '';
let chatUpdateInterval = null;
let chatAdminLangueChauffeur = 'fr'; // Langue du chauffeur
let afficherTraduction = true; // Par défaut, afficher la traduction
let messagesTraductionState = {}; // État de traduction pour chaque message (message_id: true/false)

// Ouvrir le chat admin avec un chauffeur
window.ouvrirChatAdmin = function(chauffeurId, pseudo) {
  chatAdminChauffeurId = chauffeurId;
  chatAdminPseudo = pseudo;
  
  // Marquer immédiatement les messages comme lus et retirer le badge
  fetch('/api/chauffeur/chat/mark-read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chauffeur_id: chauffeurId, reader: 'admin' })
  }).then(() => {
    // Retirer le badge de notification sur la carte du chauffeur
    const badge = document.querySelector(`[data-chauffeur-id="${chauffeurId}"] .notification-badge`);
    if (badge) {
      badge.classList.add('hidden');
      badge.textContent = '0';
    }
    // Ajouter au cache : tous les messages ont été lus
    chauffeursMessagesLus.add(chauffeurId);
  }).catch(err => console.error('Erreur marquage lu:', err));
  
  // Créer le modal de chat s'il n'existe pas
  let modalChat = document.getElementById('modal-chat-admin');
  if (!modalChat) {
    modalChat = document.createElement('div');
    modalChat.id = 'modal-chat-admin';
    modalChat.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    modalChat.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col" style="max-height: 80vh;">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <i class="fas fa-comments"></i>
            </div>
            <div>
              <h3 class="font-bold text-lg">Chat avec <span id="chat-admin-pseudo"></span></h3>
              <p class="text-xs opacity-90 flex items-center gap-1">
                <span id="chauffeur-online-indicator" class="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span id="chauffeur-online-text">Vérification...</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Bouton bascule traduction/original -->
            <button 
              id="btn-toggle-traduction" 
              onclick="basculerTraduction()" 
              class="hover:bg-white hover:bg-opacity-20 rounded-full px-3 py-1 transition flex items-center gap-1 text-xs"
              title="Basculer entre traduction et texte original"
            >
              <i class="fas fa-language"></i>
              <span id="label-toggle-traduction">🇫🇷 FR</span>
            </button>
            <button onclick="fermerChatAdmin()" class="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <!-- Messages -->
        <div id="chat-admin-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style="max-height: 400px;">
          <div class="text-center text-gray-400 py-8">
            <i class="fas fa-comment-dots text-4xl mb-2"></i>
            <p>Conversation avec le chauffeur</p>
          </div>
        </div>
        
        <!-- Indicateur de frappe -->
        <div id="typing-indicator-admin" class="px-4 py-2 bg-gray-50 hidden">
          <div class="flex items-center gap-2 text-gray-500 text-sm">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
            <span id="typing-indicator-text">Le chauffeur écrit...</span>
          </div>
        </div>
        
        <!-- Input -->
        <div class="p-4 bg-white border-t rounded-b-2xl">
          <div class="flex gap-2">
            <input 
              type="text" 
              id="chat-admin-input" 
              placeholder="Votre message (sera traduit automatiquement)..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              oninput="notifierFrappeAdmin()"
            />
            <button onclick="envoyerMessageAdmin()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2" id="info-traduction-admin">
            <i class="fas fa-info-circle"></i> Vos messages seront traduits automatiquement en <span id="langue-chauffeur-display">français</span>
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(modalChat);
    
    // Enter pour envoyer
    document.getElementById('chat-admin-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') envoyerMessageAdmin();
    });
  }
  
  // Afficher le modal
  document.getElementById('chat-admin-pseudo').textContent = pseudo;
  modalChat.classList.remove('hidden');
  
  // Vérifier le statut en ligne du chauffeur
  verifierStatutEnLigneChauffeur(chauffeurId);
  
  // Charger les messages
  chargerMessagesAdmin();
  
  // Actualisation toutes les 2 secondes
  chatUpdateInterval = setInterval(() => {
    chargerMessagesAdmin();
    verifierStatutEnLigneChauffeur(chauffeurId); // Vérifier aussi le statut
  }, 2000);
};

// Fonction pour vérifier et afficher le statut en ligne du chauffeur
async function verifierStatutEnLigneChauffeur(chauffeurId) {
  try {
    const response = await fetch(`/api/chat/online-status?chauffeur_id=${chauffeurId}`);
    const data = await response.json();
    
    const indicator = document.getElementById('chauffeur-online-indicator');
    const text = document.getElementById('chauffeur-online-text');
    
    if (indicator && text) {
      if (data.online) {
        indicator.className = 'w-2 h-2 bg-green-400 rounded-full animate-pulse';
        text.textContent = 'En ligne';
      } else {
        indicator.className = 'w-2 h-2 bg-gray-400 rounded-full';
        if (data.seconds_ago) {
          const minutes = Math.floor(data.seconds_ago / 60);
          if (minutes < 1) {
            text.textContent = 'Actif il y a <1 min';
          } else if (minutes < 60) {
            text.textContent = `Actif il y a ${minutes} min`;
          } else {
            text.textContent = 'Hors ligne';
          }
        } else {
          text.textContent = 'Hors ligne';
        }
      }
    }
  } catch (error) {
    console.error('Erreur vérification statut:', error);
  }
}

// Fermer le chat admin
window.fermerChatAdmin = function() {
  // Marquer les messages comme lus lors de la fermeture
  if (chatAdminChauffeurId) {
    fetch('/api/chauffeur/chat/mark-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chauffeur_id: chatAdminChauffeurId, reader: 'admin' })
    }).then(() => {
      // Retirer le badge de notification
      const badge = document.querySelector(`[data-chauffeur-id="${chatAdminChauffeurId}"] .notification-badge`);
      if (badge) {
        badge.classList.add('hidden');
        badge.textContent = '0';
      }
      // Ajouter au cache : tous les messages ont été lus
      chauffeursMessagesLus.add(chatAdminChauffeurId);
    }).catch(err => console.error('Erreur marquage lu:', err));
  }
  
  document.getElementById('modal-chat-admin').classList.add('hidden');
  if (chatUpdateInterval) {
    clearInterval(chatUpdateInterval);
    chatUpdateInterval = null;
  }
  chatAdminChauffeurId = null;
  messagesTraductionState = {}; // Réinitialiser l'état des traductions
};

// Charger les messages du chat admin
async function chargerMessagesAdmin() {
  try {
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${chatAdminChauffeurId}`);
    const data = await response.json();
    
    if (data.success && data.messages) {
      // Mettre à jour le cache
      cachedMessages = data.messages;
      lastMessageTimestamp = data.messages.length > 0 ? data.messages[data.messages.length - 1].timestamp : null;
      
      chatAdminLangueChauffeur = data.chauffeur_langue || 'fr';
      afficherMessagesAdmin(data.messages);
      
      // Marquer les messages comme lus dès qu'ils sont affichés
      const messagesNonLus = data.messages.filter(m => m.sender === 'chauffeur' && !m.read_by_admin);
      if (messagesNonLus.length > 0) {
        fetch('/api/chauffeur/chat/mark-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chauffeur_id: chatAdminChauffeurId, reader: 'admin' })
        }).then(() => {
          // Retirer le badge immédiatement
          const badge = document.querySelector(`[data-chauffeur-id="${chatAdminChauffeurId}"] .notification-badge`);
          if (badge) {
            badge.classList.add('hidden');
            badge.textContent = '0';
          }
          // Ajouter au cache : tous les messages ont été lus
          chauffeursMessagesLus.add(chatAdminChauffeurId);
        }).catch(err => console.error('Erreur marquage lu:', err));
      } else {
        // Pas de nouveaux messages, mais s'assurer que le badge est masqué
        const badge = document.querySelector(`[data-chauffeur-id="${chatAdminChauffeurId}"] .notification-badge`);
        if (badge) {
          badge.classList.add('hidden');
          badge.textContent = '0';
        }
        chauffeursMessagesLus.add(chatAdminChauffeurId);
      }
      
      // Mettre à jour l'affichage de la langue
      const langueDisplay = document.getElementById('langue-chauffeur-display');
      if (langueDisplay) {
        const nomsLangues = {
          'fr': 'français',
          'en': 'anglais',
          'nl': 'néerlandais',
          'fi': 'finnois',
          'de': 'allemand',
          'it': 'italien',
          'pl': 'polonais',
          'pt': 'portugais',
          'bg': 'bulgare',
          'cs': 'tchèque',
          'da': 'danois',
          'hr': 'croate',
          'ro': 'roumain'
        };
        langueDisplay.textContent = nomsLangues[chatAdminLangueChauffeur] || chatAdminLangueChauffeur;
      }
    }
  } catch (error) {
    console.error('Erreur chargement messages admin:', error);
  }
}

// Afficher les messages du chat admin avec traduction
function afficherMessagesAdmin(messages) {
  const container = document.getElementById('chat-admin-messages');
  
  if (messages.length === 0) {
    container.innerHTML = `
      <div class="text-center text-gray-400 py-8">
        <i class="fas fa-comment-dots text-4xl mb-2"></i>
        <p>Aucun message pour le moment</p>
        <p class="text-sm mt-1">Commencez la conversation</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = messages.map(msg => {
    const isAdmin = msg.sender === 'admin';
    const messageId = msg.id;
    
    // Déterminer quel texte afficher pour ce message spécifique
    let texteAffiche = msg.message;
    let modeTraductionMessage = messagesTraductionState[messageId] !== undefined 
      ? messagesTraductionState[messageId] 
      : afficherTraduction;
    
    let afficherBoutonTraduction = false;
    let labelBouton = '';
    let badgeLangue = '';
    
    if (!isAdmin && msg.translated_fr) {
      // Message du chauffeur avec traduction disponible
      afficherBoutonTraduction = true;
      
      if (modeTraductionMessage) {
        // Afficher la traduction française
        texteAffiche = msg.translated_fr;
        labelBouton = 'Voir original';
        badgeLangue = '🇫🇷 Traduit';
      } else {
        // Afficher le texte original
        texteAffiche = msg.message;
        labelBouton = 'Traduire';
      }
    } else if (isAdmin && msg.translated_chauffeur && chatAdminLangueChauffeur !== 'fr') {
      // Message de l'admin avec traduction dans la langue du chauffeur disponible
      afficherBoutonTraduction = true;
      
      if (modeTraductionMessage) {
        // Afficher la traduction dans la langue du chauffeur
        texteAffiche = msg.translated_chauffeur;
        labelBouton = 'Voir français';
        const langueEmojis = {
          'en': '🇬🇧', 'nl': '🇳🇱', 'fi': '🇫🇮', 'de': '🇩🇪', 'it': '🇮🇹',
          'pl': '🇵🇱', 'pt': '🇵🇹', 'bg': '🇧🇬', 'cs': '🇨🇿', 'da': '🇩🇰',
          'hr': '🇭🇷', 'ro': '🇷🇴'
        };
        badgeLangue = `${langueEmojis[chatAdminLangueChauffeur] || '🌍'} Traduit`;
      } else {
        // Afficher le texte français original
        texteAffiche = msg.message;
        labelBouton = 'Traduire';
      }
    }
    
    return `
      <div class="flex ${isAdmin ? 'justify-end' : 'justify-start'} mb-3">
        <div class="max-w-md ${isAdmin ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-2 shadow-sm">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas ${isAdmin ? 'fa-user-shield' : 'fa-truck'} text-xs"></i>
            <span class="text-xs font-semibold ${isAdmin ? 'text-blue-100' : 'text-gray-600'}">
              ${isAdmin ? 'Admin GXO' : chatAdminPseudo}
            </span>
            ${badgeLangue && modeTraductionMessage ? `<span class="text-xs ${isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-blue-100 text-blue-800'} px-2 py-0.5 rounded-full">${badgeLangue}</span>` : ''}
          </div>
          <p class="text-sm mb-2">${texteAffiche}</p>
          <div class="flex items-center justify-between gap-2">
            <p class="text-xs ${isAdmin ? 'text-blue-200' : 'text-gray-400'}">
              ${new Date(msg.timestamp).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
            </p>
            <div class="flex items-center gap-2">
              ${afficherBoutonTraduction ? `
                <button 
                  onclick="basculerTraductionMessage(${messageId})" 
                  class="text-xs ${isAdmin ? 'text-blue-100 hover:text-white' : 'text-blue-600 hover:text-blue-800'} flex items-center gap-1 transition-colors"
                  title="Basculer entre traduction et original"
                >
                  <i class="fas fa-language"></i>
                  <span>${labelBouton}</span>
                </button>
              ` : ''}
              ${isAdmin ? `
                <span class="text-xs ${isAdmin ? 'text-blue-200' : 'text-gray-400'}" title="${msg.read_by_chauffeur ? 'Lu' : msg.delivered_at ? 'Envoyé' : 'En attente'}">
                  ${msg.read_by_chauffeur ? '✓✓' : msg.delivered_at ? '✓' : '○'}
                </span>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Scroll vers le bas
  container.scrollTop = container.scrollHeight;
}

// Cache des messages pour éviter les appels API inutiles
let cachedMessages = [];
let lastMessageTimestamp = null;

// Basculer entre traduction et texte original pour un message spécifique
window.basculerTraductionMessage = function(messageId) {
  // Inverser l'état de traduction pour ce message
  if (messagesTraductionState[messageId] === undefined) {
    messagesTraductionState[messageId] = !afficherTraduction;
  } else {
    messagesTraductionState[messageId] = !messagesTraductionState[messageId];
  }
  
  // Mise à jour optimisée : réafficher les messages depuis le cache
  if (cachedMessages.length > 0) {
    afficherMessagesAdmin(cachedMessages);
  }
};

// Basculer entre traduction et texte original (mode global)
window.basculerTraduction = function() {
  afficherTraduction = !afficherTraduction;
  
  // Réinitialiser l'état individuel des messages pour suivre le mode global
  messagesTraductionState = {};
  
  // Mettre à jour le label du bouton
  const label = document.getElementById('label-toggle-traduction');
  if (label) {
    if (afficherTraduction) {
      label.innerHTML = '🇫🇷 FR';
    } else {
      // Afficher le drapeau de la langue du chauffeur
      const drapeaux = {
        'fr': '🇫🇷 FR',
        'en': '🇬🇧 EN',
        'nl': '🇳🇱 NL',
        'fi': '🇫🇮 FI',
        'de': '🇩🇪 DE',
        'it': '🇮🇹 IT',
        'pl': '🇵🇱 PL',
        'pt': '🇵🇹 PT',
        'bg': '🇧🇬 BG',
        'cs': '🇨🇿 CZ',
        'da': '🇩🇰 DK',
        'hr': '🇭🇷 HR',
        'ro': '🇷🇴 RO'
      };
      label.innerHTML = drapeaux[chatAdminLangueChauffeur] || '🌍 Original';
    }
  }
  
  // Mise à jour optimisée : réafficher depuis le cache
  if (cachedMessages.length > 0) {
    afficherMessagesAdmin(cachedMessages);
  }
};

// Variables pour le typing indicator
let typingTimeout = null;
let lastTypingNotification = 0;

// Notifier que l'admin est en train d'écrire (avec debouncing)
window.notifierFrappeAdmin = function() {
  const now = Date.now();
  
  // Envoyer max 1 notification toutes les 2 secondes
  if (now - lastTypingNotification < 2000) return;
  
  lastTypingNotification = now;
  
  // Envoyer la notification au serveur (à implémenter si besoin)
  // Pour l'instant, on simule localement
  
  // Clear le timeout précédent
  if (typingTimeout) clearTimeout(typingTimeout);
  
  // Masquer l'indicateur après 3 secondes sans frappe
  typingTimeout = setTimeout(() => {
    // L'utilisateur a arrêté de taper
  }, 3000);
};

// Afficher l'indicateur de frappe du chauffeur
function afficherTypingIndicator() {
  const indicator = document.getElementById('typing-indicator-admin');
  if (indicator) {
    indicator.classList.remove('hidden');
    indicator.classList.add('animate-fade-in');
  }
}

// Masquer l'indicateur de frappe du chauffeur
function masquerTypingIndicator() {
  const indicator = document.getElementById('typing-indicator-admin');
  if (indicator) {
    indicator.classList.add('hidden');
    indicator.classList.remove('animate-fade-in');
  }
}

// Envoyer un message admin avec affichage optimiste
async function envoyerMessageAdmin() {
  const input = document.getElementById('chat-admin-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Désactiver le bouton pendant l'envoi
  const btnEnvoyer = document.querySelector('#modal-chat-admin button[onclick*="envoyerMessageAdmin"]');
  if (btnEnvoyer) btnEnvoyer.disabled = true;
  
  // Affichage optimiste : ajouter le message immédiatement
  const tempMessage = {
    id: 'temp-' + Date.now(),
    sender: 'admin',
    message: message,
    timestamp: new Date().toISOString(),
    translated_chauffeur: '⏳ Traduction...',
    sending: true
  };
  
  cachedMessages.push(tempMessage);
  afficherMessagesAdmin(cachedMessages);
  input.value = '';
  
  try {
    const response = await fetch('/api/admin/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chauffeur_id: chatAdminChauffeurId,
        message: message
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Recharger pour obtenir le vrai message avec ID et traduction complète
      await chargerMessagesAdmin();
    } else {
      // Retirer le message temporaire en cas d'erreur
      cachedMessages = cachedMessages.filter(m => m.id !== tempMessage.id);
      afficherMessagesAdmin(cachedMessages);
      alert('Erreur lors de l\'envoi du message');
    }
  } catch (error) {
    console.error('Erreur envoi message admin:', error);
    // Retirer le message temporaire
    cachedMessages = cachedMessages.filter(m => m.id !== tempMessage.id);
    afficherMessagesAdmin(cachedMessages);
    alert('Erreur lors de l\'envoi du message');
  } finally {
    // Réactiver le bouton
    if (btnEnvoyer) btnEnvoyer.disabled = false;
  }
}

// ===== FONCTION CLÔTURE CHAUFFEUR =====

window.cloturerChauffeur = async function(chauffeurId, pseudo, progression = 100) {
  // Créer le modal de confirmation s'il n'existe pas
  let modalCloture = document.getElementById('modal-cloture-confirmation');
  if (!modalCloture) {
    modalCloture = document.createElement('div');
    modalCloture.id = 'modal-cloture-confirmation';
    modalCloture.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    document.body.appendChild(modalCloture);
  }
  
  // Définir le contenu selon la progression
  const isComplete = progression === 100;
  const bgColor = isComplete ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600';
  const icon = isComplete ? 'fa-check-double' : 'fa-exclamation-triangle';
  const iconBg = isComplete ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600';
  const titre = isComplete ? '✅ Clôturer le départ' : '⚠️ Clôture forcée';
  
  modalCloture.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-scale-in">
      <!-- Header -->
      <div class="bg-gradient-to-r ${bgColor} text-white p-6">
        <div class="flex items-center justify-between mb-3">
          <div class="w-14 h-14 ${iconBg} rounded-full flex items-center justify-center">
            <i class="fas ${icon} text-2xl"></i>
          </div>
          <button onclick="fermerModalCloture()" class="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <h3 class="font-bold text-2xl">${titre}</h3>
        <p class="text-sm opacity-90 mt-1">${pseudo}</p>
      </div>
      
      <!-- Contenu -->
      <div class="p-6">
        ${isComplete ? `
          <div class="space-y-4">
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div class="flex items-start">
                <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-green-800">Toutes les tâches sont complétées</p>
                  <p class="text-sm text-green-600 mt-1">Le chauffeur a terminé les 5 étapes de déchargement.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-700 text-sm">
                <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                Le chauffeur sera marqué comme <strong>terminé</strong> et retiré de la liste des chauffeurs actifs.
              </p>
            </div>
          </div>
        ` : `
          <div class="space-y-4">
            <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div class="flex items-start">
                <i class="fas fa-exclamation-triangle text-orange-500 text-xl mr-3 mt-1"></i>
                <div>
                  <p class="font-semibold text-orange-800">Tâches incomplètes (${progression}%)</p>
                  <p class="text-sm text-orange-600 mt-1">Le chauffeur n'a pas terminé toutes les étapes de déchargement.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p class="text-yellow-800 text-sm font-semibold mb-2">
                <i class="fas fa-question-circle mr-2"></i>
                Voulez-vous vraiment clôturer maintenant ?
              </p>
              <ul class="text-xs text-yellow-700 space-y-1 ml-6">
                <li>• Le chauffeur sera retiré de la liste</li>
                <li>• Les tâches non terminées resteront incomplètes</li>
                <li>• Cette action ne peut pas être annulée</li>
              </ul>
            </div>
          </div>
        `}
      </div>
      
      <!-- Actions -->
      <div class="bg-gray-50 px-6 py-4 flex gap-3">
        <button 
          onclick="fermerModalCloture()" 
          class="flex-1 bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg border border-gray-300"
        >
          <i class="fas fa-times mr-2"></i>
          Annuler
        </button>
        <button 
          onclick="confirmerCloture(${chauffeurId}, '${pseudo}', ${progression})" 
          class="flex-1 bg-gradient-to-r ${bgColor} hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <i class="fas ${isComplete ? 'fa-check' : 'fa-exclamation-circle'} mr-2"></i>
          ${isComplete ? 'Confirmer' : 'Clôturer quand même'}
        </button>
      </div>
    </div>
  `;
  
  // Afficher le modal avec animation
  modalCloture.classList.remove('hidden');
  setTimeout(() => {
    modalCloture.querySelector('.animate-scale-in').style.animation = 'scaleIn 0.3s ease-out';
  }, 10);
}

// Fermer le modal de clôture
window.fermerModalCloture = function() {
  const modal = document.getElementById('modal-cloture-confirmation');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Confirmer la clôture
window.confirmerCloture = async function(chauffeurId, pseudo, progression) {
  // Fermer le modal
  fermerModalCloture();
  
  try {
    const response = await fetch('/api/admin/cloturer-chauffeur', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chauffeur_id: chauffeurId })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Animation de succès avec couleur selon progression
      const bgColor = progression === 100 ? 'bg-green-500' : 'bg-orange-500';
      const toast = document.createElement('div');
      toast.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in-right flex items-center space-x-3`;
      toast.innerHTML = `
        <i class="fas fa-check-circle text-2xl"></i>
        <div>
          <div class="font-bold">Départ clôturé</div>
          <div class="text-sm opacity-90">${pseudo} a été retiré de la liste ${progression < 100 ? '(tâches incomplètes)' : ''}</div>
        </div>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('animate-slide-out-right');
        setTimeout(() => toast.remove(), 500);
      }, 3000);
      
      // Recharger la liste
      chargerChauffeursActifs();
    } else {
      alert('Erreur lors de la clôture: ' + (data.error || 'Erreur inconnue'));
    }
  } catch (error) {
    console.error('Erreur clôture chauffeur:', error);
    alert('Erreur lors de la clôture du chauffeur');
  }
};

// Style CSS pour l'animation
const style = document.createElement('style');
style.textContent = `
  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);
