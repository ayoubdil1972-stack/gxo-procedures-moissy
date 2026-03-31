// Archives - Gestion des données archivées
// Page: /archives?v=2

let currentTab = 'kpi';
let currentFilters = {
  year: '2026',
  month: '03',
  week: '',
  day: ''
};

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  initializePage();
  chargerSemaines();
  appliquerFiltres();
});

// Initialiser la page
function initializePage() {
  // Définir la date actuelle
  const now = new Date();
  document.getElementById('filter-year').value = now.getFullYear().toString();
  document.getElementById('filter-month').value = String(now.getMonth() + 1).padStart(2, '0');
}

// Charger les semaines du mois sélectionné
function chargerSemaines() {
  const year = document.getElementById('filter-year').value;
  const month = document.getElementById('filter-month').value;
  
  if (!month) {
    document.getElementById('filter-week').innerHTML = '<option value="">Toutes les semaines</option>';
    return;
  }
  
  // Calculer les semaines du mois
  const firstDay = new Date(year, parseInt(month) - 1, 1);
  const lastDay = new Date(year, parseInt(month), 0);
  
  const weeksSet = new Set();
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const week = getWeekNumber(new Date(d));
    weeksSet.add(week);
  }
  
  const weeks = Array.from(weeksSet).sort((a, b) => a - b);
  
  let html = '<option value="">Toutes les semaines</option>';
  weeks.forEach(week => {
    html += `<option value="${week}">Semaine ${week}</option>`;
  });
  
  document.getElementById('filter-week').innerHTML = html;
}

// Obtenir le numéro de semaine
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Changer d'onglet
function switchTab(tab) {
  currentTab = tab;
  
  // Mettre à jour les boutons
  ['kpi', 'improd', 'ecarts'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    const content = document.getElementById(`content-${t}`);
    
    if (t === tab) {
      btn.classList.add('bg-blue-500', 'text-white');
      btn.classList.remove('hover:bg-gray-100');
      content.classList.remove('hidden');
    } else {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('hover:bg-gray-100');
      content.classList.add('hidden');
    }
  });
  
  // Recharger les données
  appliquerFiltres();
}

// Appliquer les filtres
async function appliquerFiltres() {
  currentFilters = {
    year: document.getElementById('filter-year').value,
    month: document.getElementById('filter-month').value,
    week: document.getElementById('filter-week').value,
    day: document.getElementById('filter-day').value
  };
  
  // Charger les données selon l'onglet actif
  if (currentTab === 'kpi') {
    await chargerKPI();
  } else if (currentTab === 'improd') {
    await chargerImproductivite();
  } else if (currentTab === 'ecarts') {
    await chargerEcarts();
  }
}

// Réinitialiser les filtres
function resetFiltres() {
  const now = new Date();
  document.getElementById('filter-year').value = now.getFullYear().toString();
  document.getElementById('filter-month').value = String(now.getMonth() + 1).padStart(2, '0');
  document.getElementById('filter-week').value = '';
  document.getElementById('filter-day').value = '';
  chargerSemaines();
  appliquerFiltres();
}

// Charger les KPI
async function chargerKPI() {
  try {
    // Construire les paramètres de date
    let dateParam = currentFilters.year;
    if (currentFilters.month) {
      dateParam += `-${currentFilters.month}`;
    }
    
    const response = await fetch(`/api/archives/kpi?date=${dateParam}&week=${currentFilters.week}&day=${currentFilters.day}`);
    const data = await response.json();
    
    if (data.success) {
      // Mettre à jour les stats
      document.getElementById('stat-total-camions').textContent = data.stats.total_camions || 0;
      document.getElementById('stat-dechargement').textContent = (data.stats.dechargement_minutes || 0) + ' min';
      document.getElementById('stat-controle').textContent = (data.stats.controle_minutes || 0) + ' min';
      
      // Afficher la liste
      renderListeKPI(data.quais || []);
    }
  } catch (error) {
    console.error('Erreur chargement KPI:', error);
    document.getElementById('liste-kpi').innerHTML = `
      <div class="text-center py-8 text-red-500">
        <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
        <p>Erreur de chargement des données</p>
      </div>
    `;
  }
}

// Render liste KPI
function renderListeKPI(quais) {
  const container = document.getElementById('liste-kpi');
  
  if (quais.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-inbox text-5xl mb-3 opacity-30"></i>
        <p class="text-lg">Aucun quai trouvé pour cette période</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = quais.map(quai => `
    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
            ${quai.quai_numero}
          </div>
          <div>
            <h4 class="font-bold text-gray-800 text-lg">Quai ${quai.quai_numero}</h4>
            <p class="text-sm text-gray-600">${new Date(quai.updated_at).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
        <div class="text-right">
          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            <i class="fas fa-check-circle mr-1"></i>
            Terminé
          </span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div class="text-xs text-gray-600">Déchargement</div>
          <div class="text-lg font-bold text-blue-700">
            <i class="fas fa-clock mr-1"></i>
            ${formatDuration(quai.timer_duration)}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Contrôle</div>
          <div class="text-lg font-bold text-purple-700">
            <i class="fas fa-clipboard-check mr-1"></i>
            ${formatDuration(quai.timer_controle_duration)}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Fournisseur</div>
          <div class="text-sm font-semibold text-gray-800">${quai.fournisseur || 'N/A'}</div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Contrôleur</div>
          <div class="text-sm font-semibold text-gray-800">${quai.controleur_nom || 'N/A'}</div>
        </div>
      </div>
      
      ${quai.commentaire ? `
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-sm text-gray-700">
            <i class="fas fa-comment mr-1 text-gray-400"></i>
            ${quai.commentaire}
          </p>
        </div>
      ` : ''}
    </div>
  `).join('');
}

// Charger les improductivités
async function chargerImproductivite() {
  try {
    let dateParam = currentFilters.year;
    if (currentFilters.month) {
      dateParam += `-${currentFilters.month}`;
    }
    
    const response = await fetch(`/api/archives/improd?date=${dateParam}&week=${currentFilters.week}&day=${currentFilters.day}`);
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('stat-total-improd').textContent = data.stats.total || 0;
      document.getElementById('stat-duree-improd').textContent = (data.stats.duree_totale || 0) + ' min';
      
      renderListeImprod(data.improductivites || []);
    }
  } catch (error) {
    console.error('Erreur chargement improductivité:', error);
    document.getElementById('liste-improd').innerHTML = `
      <div class="text-center py-8 text-red-500">
        <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
        <p>Erreur de chargement des données</p>
      </div>
    `;
  }
}

// Render liste improductivités
function renderListeImprod(improds) {
  const container = document.getElementById('liste-improd');
  
  if (improds.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-inbox text-5xl mb-3 opacity-30"></i>
        <p class="text-lg">Aucune improductivité pour cette période</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = improds.map(improd => `
    <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h4 class="font-bold text-gray-800 text-lg">${improd.type || 'Improductivité'}</h4>
          <p class="text-sm text-gray-600">
            <i class="fas fa-calendar mr-1"></i>
            ${new Date(improd.timestamp).toLocaleString('fr-FR')}
          </p>
        </div>
        <div class="text-right">
          <div class="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-sm font-semibold">
            <i class="fas fa-clock mr-1"></i>
            ${improd.duree || 0} min
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div class="text-xs text-gray-600">Équipe</div>
          <div class="text-sm font-semibold text-gray-800">${improd.equipe || 'N/A'}</div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Responsable</div>
          <div class="text-sm font-semibold text-gray-800">${improd.responsable || 'N/A'}</div>
        </div>
      </div>
      
      ${improd.description ? `
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-sm text-gray-700">
            <i class="fas fa-info-circle mr-1 text-gray-400"></i>
            ${improd.description}
          </p>
        </div>
      ` : ''}
      
      ${improd.consignes ? `
        <div class="mt-2 bg-yellow-50 border border-yellow-200 rounded p-3">
          <p class="text-sm font-semibold text-yellow-800">
            <i class="fas fa-sticky-note mr-1"></i>
            Consignes: ${improd.consignes}
          </p>
        </div>
      ` : ''}
    </div>
  `).join('');
}

// Charger les écarts
async function chargerEcarts() {
  try {
    let dateParam = currentFilters.year;
    if (currentFilters.month) {
      dateParam += `-${currentFilters.month}`;
    }
    
    const response = await fetch(`/api/archives/ecarts?date=${dateParam}&week=${currentFilters.week}&day=${currentFilters.day}`);
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('stat-total-ecarts').textContent = data.stats.total_ecarts || 0;
      document.getElementById('stat-non-conformites').textContent = data.stats.non_conformites || 0;
      document.getElementById('stat-alertes').textContent = data.stats.alertes_critiques || 0;
      
      renderListeEcarts(data.ecarts || []);
    }
  } catch (error) {
    console.error('Erreur chargement écarts:', error);
    document.getElementById('liste-ecarts').innerHTML = `
      <div class="text-center py-8 text-red-500">
        <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
        <p>Erreur de chargement des données</p>
      </div>
    `;
  }
}

// Render liste écarts
function renderListeEcarts(ecarts) {
  const container = document.getElementById('liste-ecarts');
  
  if (ecarts.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-inbox text-5xl mb-3 opacity-30"></i>
        <p class="text-lg">Aucun écart pour cette période</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = ecarts.map(ecart => {
    const isAlerte = ecart.alerte_creee === 1;
    const borderColor = isAlerte ? 'border-red-500' : 'border-yellow-500';
    const bgColor = isAlerte ? 'from-red-50 to-pink-50' : 'from-yellow-50 to-orange-50';
    
    return `
      <div class="bg-gradient-to-r ${bgColor} rounded-lg p-6 border-l-4 ${borderColor}">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="font-bold text-gray-800 text-lg">
              ${isAlerte ? '<i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>' : '<i class="fas fa-info-circle text-yellow-500 mr-2"></i>'}
              Quai ${ecart.quai_numero}
            </h4>
            <p class="text-sm text-gray-600">
              <i class="fas fa-calendar mr-1"></i>
              ${new Date(ecart.timestamp).toLocaleString('fr-FR')}
            </p>
          </div>
          <div class="text-right">
            <span class="bg-${isAlerte ? 'red' : 'yellow'}-100 text-${isAlerte ? 'red' : 'yellow'}-700 px-3 py-1 rounded-full text-sm font-semibold">
              ${isAlerte ? 'Alerte' : 'Écart'}
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          <div>
            <div class="text-xs text-gray-600">Agent</div>
            <div class="text-sm font-semibold text-gray-800">${ecart.agent_nom || 'N/A'}</div>
          </div>
          <div>
            <div class="text-xs text-gray-600">Fournisseur</div>
            <div class="text-sm font-semibold text-gray-800">${ecart.fournisseur || 'N/A'}</div>
          </div>
          <div>
            <div class="text-xs text-gray-600">ID Chauffeur</div>
            <div class="text-sm font-semibold text-gray-800">${ecart.chauffeur_id || 'N/A'}</div>
          </div>
          <div>
            <div class="text-xs text-gray-600">Palettes</div>
            <div class="text-sm font-semibold ${ecart.palettes_recues !== ecart.palettes_attendues ? 'text-red-600' : 'text-green-600'}">
              ${ecart.palettes_recues || 0} / ${ecart.palettes_attendues || 0}
            </div>
          </div>
        </div>
        
        ${ecart.problemes ? `
          <div class="mt-3 pt-3 border-t border-gray-200">
            <p class="text-sm font-semibold text-gray-700 mb-2">
              <i class="fas fa-list-ul mr-1"></i>
              Problèmes détectés:
            </p>
            <div class="text-sm text-gray-700 space-y-1">
              ${JSON.parse(ecart.problemes || '[]').map(p => `
                <div class="flex items-start">
                  <i class="fas fa-exclamation-circle text-red-500 mr-2 mt-1"></i>
                  <span>${p}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Formater une durée en secondes vers HH:MM:SS
function formatDuration(seconds) {
  if (!seconds) return '00:00:00';
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Exporter les fonctions pour usage global
window.switchTab = switchTab;
window.appliquerFiltres = appliquerFiltres;
window.resetFiltres = resetFiltres;
