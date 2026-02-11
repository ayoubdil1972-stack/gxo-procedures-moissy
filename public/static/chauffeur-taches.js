// Chauffeur Tâches - Gestion des tâches de déchargement
// Page: /chauffeur/taches

let chauffeurId = null;
let startTime = null;
let intervalTimer = null;
let intervalProgression = null;

// Récupérer l'ID du chauffeur depuis l'URL ou sessionStorage
function getChauffeurId() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || sessionStorage.getItem('chauffeur_id');
  
  if (!id) {
    alert('❌ Session invalide. Veuillez vous réinscrire.');
    window.location.href = '/chauffeur/inscription';
    return null;
  }
  
  sessionStorage.setItem('chauffeur_id', id);
  return id;
}

// Charger les informations du chauffeur
async function chargerInfosChauffeur() {
  try {
    const response = await fetch(`/api/chauffeur/progression?id=${chauffeurId}`);
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('chauffeur-pseudo').textContent = data.pseudo || 'Chauffeur';
      document.getElementById('info-quai').textContent = data.numero_quai || '--';
      startTime = new Date(data.arrival_time);
      
      return data;
    }
  } catch (error) {
    console.error('Erreur chargement infos:', error);
  }
}

// Charger les tâches
async function chargerTaches() {
  try {
    const data = await chargerInfosChauffeur();
    const container = document.getElementById('liste-taches');
    
    const taches = [
      { 
        id: 'epi', 
        titre: '🦺 EPI Porté', 
        description: 'Casque, gilet, chaussures de sécurité',
        completed: data.task_epi_porte,
        time: data.task_epi_porte_time
      },
      { 
        id: 'placement', 
        titre: '🚚 Placement au Quai', 
        description: 'Garer au quai ' + (data.numero_quai || '--'),
        completed: data.task_placement_quai,
        time: data.task_placement_quai_time
      },
      { 
        id: 'palette', 
        titre: '📦 Échange Palettes', 
        description: 'Compter et échanger les palettes',
        completed: data.task_palette_change,
        time: data.task_palette_change_time
      },
      { 
        id: 'accueil', 
        titre: '🔔 Accueil Notifié', 
        description: 'Signaler votre présence',
        completed: data.task_accueil_notifie,
        time: data.task_accueil_notifie_time
      },
      { 
        id: 'clefs', 
        titre: '🔑 Remise Clés', 
        description: 'Remettre les clés à l\'agent',
        completed: data.task_clefs_remises,
        time: data.task_clefs_remises_time
      }
    ];
    
    container.innerHTML = '';
    
    taches.forEach((tache, index) => {
      const div = document.createElement('div');
      div.className = `bg-white rounded-xl shadow-lg p-5 border-l-4 transition-all ${
        tache.completed 
          ? 'border-green-500 opacity-75' 
          : 'border-orange-500 hover:shadow-xl'
      }`;
      
      div.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <span class="text-2xl">${index + 1}</span>
              <h3 class="text-xl font-bold text-gray-800">${tache.titre}</h3>
            </div>
            <p class="text-gray-600 text-sm ml-9">${tache.description}</p>
            ${tache.completed && tache.time ? `
              <div class="text-xs text-green-600 ml-9 mt-2">
                <i class="fas fa-check-circle mr-1"></i>
                Complété à ${new Date(tache.time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            ` : ''}
          </div>
          
          ${tache.completed ? `
            <div class="bg-green-100 rounded-full p-4">
              <i class="fas fa-check text-green-600 text-2xl"></i>
            </div>
          ` : `
            <button 
              onclick="validerTache('${tache.id}')" 
              class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition transform hover:scale-105 active:scale-95"
            >
              <i class="fas fa-check mr-2"></i>
              Valider
            </button>
          `}
        </div>
      `;
      
      container.appendChild(div);
    });
    
    // Calculer la progression
    const totalTaches = taches.length;
    const tachesCompletes = taches.filter(t => t.completed).length;
    const progression = Math.round((tachesCompletes / totalTaches) * 100);
    
    document.getElementById('progression-percent').textContent = progression + '%';
    document.getElementById('barre-progression').style.width = progression + '%';
    
    // Afficher message de félicitations si tout est complété
    if (progression === 100) {
      document.getElementById('message-complet').classList.remove('hidden');
      stopTimer();
      
      // Notifier l'admin
      await fetch('/api/chauffeur/notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chauffeur_id: chauffeurId,
          type: 'all_tasks_complete',
          titre: 'Chauffeur Prêt',
          message: `${data.pseudo} a terminé toutes les tâches au quai ${data.numero_quai}`
        })
      });
    }
    
  } catch (error) {
    console.error('Erreur chargement tâches:', error);
    document.getElementById('liste-taches').innerHTML = `
      <div class="text-center text-red-500 py-8">
        <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
        <p>Erreur de chargement des tâches</p>
        <button onclick="chargerTaches()" class="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full">
          Réessayer
        </button>
      </div>
    `;
  }
}

// Valider une tâche
async function validerTache(tache) {
  try {
    const response = await fetch('/api/chauffeur/valider-tache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chauffeur_id: chauffeurId, tache })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Animation de succès
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-bounce';
      notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Tâche validée !';
      document.body.appendChild(notification);
      
      setTimeout(() => notification.remove(), 2000);
      
      // Recharger les tâches
      await chargerTaches();
    } else {
      alert('❌ Erreur lors de la validation');
    }
  } catch (error) {
    console.error('Erreur validation:', error);
    alert('❌ Erreur réseau');
  }
}

// Timer
function startTimer() {
  updateTimer();
  intervalTimer = setInterval(updateTimer, 60000); // Mise à jour chaque minute
}

function updateTimer() {
  if (!startTime) return;
  
  const now = new Date();
  const diff = Math.floor((now - startTime) / 60000); // Différence en minutes
  
  document.getElementById('temps-ecoule').textContent = `${diff} min`;
}

function stopTimer() {
  if (intervalTimer) {
    clearInterval(intervalTimer);
  }
}

// Chat - Ouvrir/Fermer
document.getElementById('btn-chat').addEventListener('click', () => {
  document.getElementById('modal-chat').classList.remove('hidden');
  chargerMessages();
});

document.getElementById('btn-fermer-chat').addEventListener('click', () => {
  document.getElementById('modal-chat').classList.add('hidden');
});

// Chat - Charger messages
async function chargerMessages() {
  try {
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${chauffeurId}`);
    const data = await response.json();
    
    const container = document.getElementById('chat-messages');
    
    if (data.success && data.messages && data.messages.length > 0) {
      container.innerHTML = '';
      
      data.messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `flex ${msg.sender === 'chauffeur' ? 'justify-end' : 'justify-start'}`;
        
        div.innerHTML = `
          <div class="max-w-xs ${msg.sender === 'chauffeur' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl px-4 py-3 shadow">
            <p class="text-sm">${msg.message}</p>
            <p class="text-xs opacity-75 mt-1">${new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        `;
        
        container.appendChild(div);
      });
      
      // Scroll vers le bas
      container.scrollTop = container.scrollHeight;
      
      // Marquer comme lu par le chauffeur
      await fetch('/api/chauffeur/chat/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chauffeur_id: chauffeurId, reader: 'chauffeur' })
      });
      
    } else {
      container.innerHTML = `
        <div class="text-center text-gray-500 text-sm py-8">
          <i class="fas fa-comments text-4xl mb-2 opacity-30"></i>
          <p>Aucun message</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur chargement messages:', error);
  }
}

// Chat - Envoyer message
document.getElementById('btn-envoyer-message').addEventListener('click', envoyerMessage);
document.getElementById('input-message').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') envoyerMessage();
});

async function envoyerMessage() {
  const input = document.getElementById('input-message');
  const message = input.value.trim();
  
  if (!message) return;
  
  try {
    const response = await fetch('/api/chauffeur/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chauffeur_id: chauffeurId, message })
    });
    
    const data = await response.json();
    
    if (data.success) {
      input.value = '';
      await chargerMessages();
    }
  } catch (error) {
    console.error('Erreur envoi message:', error);
  }
}

// Actualisation automatique de la progression toutes les 10 secondes
function demarrerActualisationAuto() {
  intervalProgression = setInterval(async () => {
    await chargerTaches();
    
    // Vérifier nouveaux messages
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${chauffeurId}`);
    const data = await response.json();
    
    if (data.success && data.messages) {
      const nonLus = data.messages.filter(m => m.sender === 'admin' && !m.read_by_chauffeur).length;
      const badge = document.getElementById('chat-badge');
      
      if (nonLus > 0) {
        badge.textContent = nonLus;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  }, 10000); // Toutes les 10 secondes
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  chauffeurId = getChauffeurId();
  
  if (chauffeurId) {
    chargerTaches();
    startTimer();
    demarrerActualisationAuto();
  }
});

// Nettoyer les intervalles au départ de la page
window.addEventListener('beforeunload', () => {
  stopTimer();
  if (intervalProgression) clearInterval(intervalProgression);
});
