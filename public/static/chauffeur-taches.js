// Récupérer l'ID du chauffeur depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const chauffeurId = urlParams.get('id');

if (!chauffeurId) {
  window.location.href = '/chauffeur/langue';
}

// Configuration des 5 tâches
const TACHES = [
  {
    id: 'task_epi_porte',
    titre: 'EPI Porté',
    description: 'Gilet et chaussures de sécurité obligatoires',
    icon: 'vest',
    couleur: 'blue'
  },
  {
    id: 'task_placement_quai',
    titre: 'Placement à Quai',
    description: 'Véhicule correctement positionné',
    icon: 'truck-loading',
    couleur: 'purple'
  },
  {
    id: 'task_palette_change',
    titre: 'Échange de Palettes',
    description: 'Palette changée si nécessaire',
    icon: 'pallet',
    couleur: 'yellow'
  },
  {
    id: 'task_accueil_notifie',
    titre: 'Accueil Notifié',
    description: 'Informations transmises à l\'accueil',
    icon: 'bell',
    couleur: 'green'
  },
  {
    id: 'task_clefs_remises',
    titre: 'Clés Remises',
    description: 'Clés confiées à l\'agent de quai',
    icon: 'key',
    couleur: 'red'
  }
];

let chauffeurData = null;
let updateInterval = null;

// Charger les données du chauffeur
async function loadChauffeurInfo() {
  try {
    const response = await fetch(`/api/chauffeur/progression?id=${chauffeurId}`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      chauffeurData = data;
      
      // Mettre à jour les infos du header
      document.getElementById('chauffeur-pseudo').textContent = data.pseudo || 'Chauffeur';
      document.getElementById('chauffeur-entreprise').textContent = data.entreprise || '';
      document.getElementById('chauffeur-quai').textContent = data.numero_quai || '--';
      
      // Calculer la progression
      const progression = calculerProgression(data);
      document.getElementById('progression-percent').textContent = progression + '%';
      document.getElementById('barre-progression').style.width = progression + '%';
      
      // Afficher les tâches
      renderTaches(data);
      
      // Vérifier si tout est complété
      if (progression === 100) {
        document.getElementById('message-complet').classList.remove('hidden');
      }
    }
  } catch (error) {
    console.error('Erreur chargement chauffeur:', error);
  }
}

// Calculer la progression (nombre de tâches complétées / 5 * 100)
function calculerProgression(data) {
  let completed = 0;
  TACHES.forEach(tache => {
    if (data[tache.id] === 1 || data[tache.id] === true) {
      completed++;
    }
  });
  return Math.round((completed / TACHES.length) * 100);
}

// Afficher les tâches
function renderTaches(data) {
  const container = document.getElementById('liste-taches');
  
  container.innerHTML = TACHES.map(tache => {
    const isCompleted = data[tache.id] === 1 || data[tache.id] === true;
    const couleurClass = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-yellow-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600'
    }[tache.couleur];
    
    const borderClass = {
      blue: 'border-blue-200',
      purple: 'border-purple-200',
      yellow: 'border-yellow-200',
      green: 'border-green-200',
      red: 'border-red-200'
    }[tache.couleur];
    
    return `
      <div class="bg-white rounded-xl shadow-lg p-6 border-2 ${isCompleted ? 'border-green-500 opacity-75' : borderClass}">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4 flex-1">
            <div class="w-12 h-12 bg-gradient-to-r ${couleurClass} rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-${tache.icon} text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <h4 class="text-xl font-bold text-gray-800 mb-1">${tache.titre}</h4>
              <p class="text-gray-600 text-sm">${tache.description}</p>
            </div>
          </div>
          ${isCompleted ? `
            <div class="bg-green-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
              <i class="fas fa-check"></i>
              Validé
            </div>
          ` : `
            <button 
              onclick="validerTache('${tache.id}')"
              class="bg-gradient-to-r ${couleurClass} text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <i class="fas fa-check-circle"></i>
              Valider
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Valider une tâche
async function validerTache(taskId) {
  try {
    const response = await fetch('/api/chauffeur/valider-tache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chauffeur_id: chauffeurId,
        tache: taskId
      })
    });
    
    if (response.ok) {
      // Recharger les données
      await loadChauffeurInfo();
    }
  } catch (error) {
    console.error('Erreur validation tâche:', error);
  }
}

// Chat / Messages
const modalChat = document.getElementById('modal-chat');
const btnChat = document.getElementById('btn-chat');
const btnFermerChat = document.getElementById('btn-fermer-chat');
const formMessage = document.getElementById('form-message');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');
const chatBadge = document.getElementById('chat-badge');

btnChat.addEventListener('click', () => {
  modalChat.classList.remove('hidden');
  loadMessages();
});

btnFermerChat.addEventListener('click', () => {
  modalChat.classList.add('hidden');
});

formMessage.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  
  if (message) {
    try {
      const response = await fetch('/api/chauffeur/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chauffeur_id: chauffeurId,
          message: message
        })
      });
      
      if (response.ok) {
        messageInput.value = '';
        await loadMessages();
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
    }
  }
});

async function loadMessages() {
  try {
    const response = await fetch(`/api/chauffeur/chat?id=${chauffeurId}&viewer=chauffeur`);
    const data = await response.json();
    
    if (response.ok && data.success && data.messages) {
      // Compter les messages non lus de l'admin
      const unreadCount = data.messages.filter(m => m.sender === 'admin' && m.read === 0).length;
      
      if (unreadCount > 0) {
        chatBadge.textContent = unreadCount;
        chatBadge.classList.remove('hidden');
      } else {
        chatBadge.classList.add('hidden');
      }
      
      // Afficher les messages
      if (data.messages.length > 0) {
        messagesContainer.innerHTML = data.messages.map(msg => `
          <div class="flex ${msg.sender === 'chauffeur' ? 'justify-end' : 'justify-start'}">
            <div class="${msg.sender === 'chauffeur' ? 'bg-[#FF5A1A] text-white' : 'bg-gray-100 text-gray-800'} rounded-xl px-4 py-3 max-w-[80%]">
              <p>${msg.message}</p>
              <div class="text-xs mt-1 opacity-75">
                ${new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        `).join('');
        
        // Marquer les messages comme lus
        if (unreadCount > 0) {
          await fetch('/api/chauffeur/chat/mark-read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chauffeur_id: chauffeurId })
          });
        }
        
        // Scroll vers le bas
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } else {
        messagesContainer.innerHTML = `
          <div class="text-center py-8 text-gray-500">
            <i class="fas fa-comments text-4xl mb-3 text-gray-300"></i>
            <p>Aucun message</p>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error('Erreur chargement messages:', error);
  }
}

// Heartbeat pour indiquer que le chauffeur est en ligne
async function sendHeartbeat() {
  try {
    await fetch('/api/chat/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chauffeur_id: chauffeurId,
        page_url: window.location.href
      })
    });
  } catch (error) {
    console.error('Erreur heartbeat:', error);
  }
}

// Initialisation
loadChauffeurInfo();

// Envoyer heartbeat immédiatement
sendHeartbeat();

// Mise à jour automatique toutes les 5 secondes
updateInterval = setInterval(() => {
  loadChauffeurInfo();
  if (!modalChat.classList.contains('hidden')) {
    loadMessages();
  }
  // Envoyer heartbeat pour indiquer que le chauffeur est toujours en ligne
  sendHeartbeat();
}, 5000);

// Make validerTache global
window.validerTache = validerTache;
