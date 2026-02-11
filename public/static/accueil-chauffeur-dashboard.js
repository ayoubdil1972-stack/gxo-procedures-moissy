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
      
      {/* Info temps */}
      <div class="flex items-center justify-between text-xs text-gray-600 pt-3 border-t">
        <div class="flex items-center">
          <i class="fas fa-clock mr-1"></i>
          ${dureeMinutes} min
        </div>
        <div class="flex items-center ${bgColor} ${textColor} px-2 py-1 rounded-full font-semibold">
          ${progression === 100 ? '<i class="fas fa-check-circle mr-1"></i>Prêt' : progression > 0 ? '<i class="fas fa-hourglass-half mr-1"></i>En cours' : '<i class="fas fa-circle-notch mr-1"></i>Début'}
        </div>
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

// Style CSS pour l'animation
const style = document.createElement('style');
style.textContent = `
  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);
