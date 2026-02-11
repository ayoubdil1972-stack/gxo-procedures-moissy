// Tableau de Bord Chauffeurs en Temps Réel
// Page: /accueil-chauffeur
// Section: Dashboard des chauffeurs actifs

let updateInterval = null;

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
            <h3 class="font-bold text-gray-900 text-lg">${chauffeur.pseudo}</h3>
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
      
      {/* Barre de progression */}
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-700">Progression</span>
          <span class="text-sm font-bold ${textColor}">${progression}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div class="h-full rounded-full transition-all duration-500 ${progression >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : progression >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-red-400 to-red-600'}" style="width: ${progression}%"></div>
        </div>
      </div>
      
      {/* Tâches avec icônes */}
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
      
      {/* Info temps et actions */}
      <div class="flex items-center justify-between text-xs text-gray-600 pt-3 border-t">
        <div class="flex items-center">
          <i class="fas fa-clock mr-1"></i>
          ${dureeMinutes} min
        </div>
        <div class="flex items-center ${bgColor} ${textColor} px-2 py-1 rounded-full font-semibold">
          ${progression === 100 ? '<i class="fas fa-check-circle mr-1"></i>Prêt' : progression > 0 ? '<i class="fas fa-hourglass-half mr-1"></i>En cours' : '<i class="fas fa-circle-notch mr-1"></i>Début'}
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div class="mt-4 flex gap-2">
        <button 
          onclick="ouvrirChatAdmin(${chauffeur.id}, '${chauffeur.pseudo}')"
          class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <i class="fas fa-comments"></i>
          <span>Chat</span>
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

let chatAdminChauffeurId = null;
let chatAdminPseudo = '';
let chatUpdateInterval = null;

// Ouvrir le chat admin avec un chauffeur
window.ouvrirChatAdmin = function(chauffeurId, pseudo) {
  chatAdminChauffeurId = chauffeurId;
  chatAdminPseudo = pseudo;
  
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
              <p class="text-xs opacity-90">Support GXO - Admin</p>
            </div>
          </div>
          <button onclick="fermerChatAdmin()" class="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <!-- Messages -->
        <div id="chat-admin-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style="max-height: 400px;">
          <div class="text-center text-gray-400 py-8">
            <i class="fas fa-comment-dots text-4xl mb-2"></i>
            <p>Conversation avec le chauffeur</p>
          </div>
        </div>
        
        <!-- Input -->
        <div class="p-4 bg-white border-t rounded-b-2xl">
          <div class="flex gap-2">
            <input 
              type="text" 
              id="chat-admin-input" 
              placeholder="Votre message..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onclick="envoyerMessageAdmin()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
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
  
  // Charger les messages
  chargerMessagesAdmin();
  
  // Actualisation toutes les 2 secondes
  chatUpdateInterval = setInterval(chargerMessagesAdmin, 2000);
};

// Fermer le chat admin
window.fermerChatAdmin = function() {
  document.getElementById('modal-chat-admin').classList.add('hidden');
  if (chatUpdateInterval) {
    clearInterval(chatUpdateInterval);
    chatUpdateInterval = null;
  }
  chatAdminChauffeurId = null;
};

// Charger les messages du chat admin
async function chargerMessagesAdmin() {
  try {
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${chatAdminChauffeurId}`);
    const data = await response.json();
    
    if (data.success && data.messages) {
      afficherMessagesAdmin(data.messages);
    }
  } catch (error) {
    console.error('Erreur chargement messages admin:', error);
  }
}

// Afficher les messages du chat admin
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
    return `
      <div class="flex ${isAdmin ? 'justify-end' : 'justify-start'}">
        <div class="max-w-xs ${isAdmin ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-2 shadow-sm">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas ${isAdmin ? 'fa-user-shield' : 'fa-truck'} text-xs"></i>
            <span class="text-xs font-semibold ${isAdmin ? 'text-blue-100' : 'text-gray-600'}">
              ${isAdmin ? 'Admin GXO' : chatAdminPseudo}
            </span>
          </div>
          <p class="text-sm">${msg.message}</p>
          <p class="text-xs ${isAdmin ? 'text-blue-200' : 'text-gray-400'} mt-1">
            ${new Date(msg.timestamp).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
          </p>
        </div>
      </div>
    `;
  }).join('');
  
  // Scroll vers le bas
  container.scrollTop = container.scrollHeight;
}

// Envoyer un message admin
async function envoyerMessageAdmin() {
  const input = document.getElementById('chat-admin-input');
  const message = input.value.trim();
  
  if (!message) return;
  
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
      input.value = '';
      chargerMessagesAdmin();
    }
  } catch (error) {
    console.error('Erreur envoi message admin:', error);
    alert('Erreur lors de l\'envoi du message');
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
