// Admin Dashboard Chauffeurs - Suivi temps réel
// Page: /admin/chauffeurs-dashboard

let selectedChauffeurId = null;
let updateInterval = null;

// Charger la liste des chauffeurs
async function chargerChauffeurs() {
  try {
    const response = await fetch('/api/chauffeur/liste');
    const data = await response.json();
    
    if (data.success && data.chauffeurs) {
      afficherChauffeurs(data.chauffeurs);
      mettreAJourStatistiques(data.chauffeurs);
    } else {
      afficherErreur('Aucun chauffeur actif');
    }
  } catch (error) {
    console.error('Erreur chargement chauffeurs:', error);
    afficherErreur('Erreur de chargement');
  }
}

// Afficher les chauffeurs dans le tableau
function afficherChauffeurs(chauffeurs) {
  const tbody = document.getElementById('table-chauffeurs');
  
  if (chauffeurs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
          <i class="fas fa-inbox text-5xl mb-3 opacity-30"></i>
          <p>Aucun chauffeur actif</p>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = '';
  
  chauffeurs.forEach(chauffeur => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50 transition';
    
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
    
    // Couleur progression
    let progressColor = 'bg-red-500';
    if (progression >= 80) progressColor = 'bg-green-500';
    else if (progression >= 40) progressColor = 'bg-orange-500';
    
    tr.innerHTML = `
      <td class="px-6 py-4">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            ${chauffeur.pseudo.substring(0, 2).toUpperCase()}
          </div>
          <div class="ml-4">
            <div class="text-sm font-bold text-gray-900">${chauffeur.pseudo}</div>
            <div class="text-xs text-gray-500">${chauffeur.entreprise}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <i class="fas fa-warehouse mr-1"></i>
          ${chauffeur.numero_quai || '--'}
        </span>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center space-x-2">
          <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div class="${progressColor} h-full transition-all" style="width: ${progression}%"></div>
          </div>
          <span class="text-sm font-bold text-gray-700">${progression}%</span>
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="flex space-x-1">
          ${taches.map((done, i) => `
            <div class="w-6 h-6 rounded-full flex items-center justify-center ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}">
              <i class="fas fa-${done ? 'check' : 'circle'} text-xs"></i>
            </div>
          `).join('')}
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center text-sm text-gray-600">
          <i class="fas fa-clock mr-1"></i>
          ${dureeMinutes} min
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="flex space-x-2">
          <button 
            onclick="ouvrirChat(${chauffeur.id}, '${chauffeur.pseudo}', '${chauffeur.numero_quai}', '${chauffeur.entreprise}')"
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition text-sm"
          >
            <i class="fas fa-comment"></i>
          </button>
          <button 
            onclick="afficherDetails(${chauffeur.id})"
            class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition text-sm"
          >
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}

// Mettre à jour les statistiques
function mettreAJourStatistiques(chauffeurs) {
  const complets = chauffeurs.filter(c => c.progression_percent === 100).length;
  const enCours = chauffeurs.filter(c => c.progression_percent > 0 && c.progression_percent < 100).length;
  const nouveaux = chauffeurs.filter(c => c.progression_percent === 0).length;
  
  document.getElementById('count-actifs').textContent = chauffeurs.length;
  document.getElementById('stat-completes').textContent = complets;
  document.getElementById('stat-en-cours').textContent = enCours;
  document.getElementById('stat-nouveaux').textContent = nouveaux;
}

// Afficher erreur
function afficherErreur(message) {
  const tbody = document.getElementById('table-chauffeurs');
  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="px-6 py-12 text-center text-red-500">
        <i class="fas fa-exclamation-triangle text-5xl mb-3 opacity-30"></i>
        <p>${message}</p>
        <button onclick="chargerChauffeurs()" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
          Réessayer
        </button>
      </td>
    </tr>
  `;
}

// Ouvrir le chat avec un chauffeur
function ouvrirChat(id, nom, quai, entreprise) {
  selectedChauffeurId = id;
  document.getElementById('chat-chauffeur-nom').textContent = nom;
  document.getElementById('chat-chauffeur-quai').textContent = quai;
  document.getElementById('chat-chauffeur-entreprise').textContent = entreprise;
  document.getElementById('modal-chat').classList.remove('hidden');
  
  chargerMessagesAdmin();
}

// Fermer le chat
document.getElementById('btn-fermer-chat').addEventListener('click', () => {
  document.getElementById('modal-chat').classList.add('hidden');
  selectedChauffeurId = null;
});

// Charger les messages
async function chargerMessagesAdmin() {
  try {
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${selectedChauffeurId}`);
    const data = await response.json();
    
    const container = document.getElementById('chat-messages');
    
    if (data.success && data.messages && data.messages.length > 0) {
      container.innerHTML = '';
      
      data.messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`;
        
        div.innerHTML = `
          <div class="max-w-sm ${msg.sender === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'} rounded-2xl px-5 py-3 shadow-lg">
            <div class="flex items-start space-x-2">
              <i class="fas fa-${msg.sender === 'admin' ? 'user-shield' : 'truck'} mt-1"></i>
              <div class="flex-1">
                <p class="text-sm">${msg.message}</p>
                <p class="text-xs opacity-75 mt-1">${new Date(msg.timestamp).toLocaleString('fr-FR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</p>
              </div>
            </div>
          </div>
        `;
        
        container.appendChild(div);
      });
      
      // Scroll vers le bas
      container.scrollTop = container.scrollHeight;
      
      // Marquer comme lu par admin
      await fetch('/api/chauffeur/chat/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chauffeur_id: selectedChauffeurId, reader: 'admin' })
      });
      
    } else {
      container.innerHTML = `
        <div class="text-center text-gray-500 py-12">
          <i class="fas fa-comments text-5xl mb-3 opacity-30"></i>
          <p>Aucun message</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur chargement messages:', error);
  }
}

// Envoyer un message
document.getElementById('btn-envoyer-admin-message').addEventListener('click', envoyerMessageAdmin);
document.getElementById('input-admin-message').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') envoyerMessageAdmin();
});

async function envoyerMessageAdmin() {
  const input = document.getElementById('input-admin-message');
  const message = input.value.trim();
  
  if (!message || !selectedChauffeurId) return;
  
  try {
    const response = await fetch('/api/admin/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chauffeur_id: selectedChauffeurId, message, sender: 'admin' })
    });
    
    const data = await response.json();
    
    if (data.success) {
      input.value = '';
      await chargerMessagesAdmin();
    }
  } catch (error) {
    console.error('Erreur envoi message:', error);
  }
}

// Afficher détails d'un chauffeur (modal ou page séparée)
function afficherDetails(id) {
  window.location.href = `/admin/chauffeur/${id}`;
}

// Notifications temps réel
async function chargerNotifications() {
  try {
    const response = await fetch('/api/notifications/non-lues');
    const data = await response.json();
    
    if (data.success && data.notifications && data.notifications.length > 0) {
      const container = document.getElementById('notifications-live');
      container.innerHTML = '';
      
      data.notifications.slice(0, 3).forEach(notif => {
        const div = document.createElement('div');
        div.className = 'bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg shadow mb-3 animate-pulse';
        
        div.innerHTML = `
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <i class="fas fa-bell text-orange-500 text-xl"></i>
              <div>
                <p class="font-bold text-gray-800">${notif.titre}</p>
                <p class="text-sm text-gray-600">${notif.message}</p>
                <p class="text-xs text-gray-500 mt-1">${new Date(notif.timestamp).toLocaleTimeString('fr-FR')}</p>
              </div>
            </div>
            <button onclick="marquerLu(${notif.id})" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
        
        container.appendChild(div);
      });
      
      document.getElementById('stat-messages').textContent = data.notifications.length;
    }
  } catch (error) {
    console.error('Erreur chargement notifications:', error);
  }
}

async function marquerLu(id) {
  try {
    await fetch('/api/notification/mark-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notification_id: id })
    });
    
    await chargerNotifications();
  } catch (error) {
    console.error('Erreur marquage lu:', error);
  }
}

// Actualisation automatique toutes les 5 secondes
function demarrerActualisationAuto() {
  updateInterval = setInterval(() => {
    chargerChauffeurs();
    chargerNotifications();
    
    // Actualiser le chat s'il est ouvert
    if (selectedChauffeurId) {
      chargerMessagesAdmin();
    }
  }, 5000); // 5 secondes
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  chargerChauffeurs();
  chargerNotifications();
  demarrerActualisationAuto();
});

// Nettoyer l'intervalle
window.addEventListener('beforeunload', () => {
  if (updateInterval) clearInterval(updateInterval);
});
