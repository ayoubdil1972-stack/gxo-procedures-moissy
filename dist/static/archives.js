// Archives - Gestion des données archivées v3.13.0
// Page: /archives?v=2

let currentTab = 'kpi';
let currentSubTab = 'total'; // Pour improductivité: total, controleurs, agents
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
  const now = new Date();
  document.getElementById('filter-year').value = now.getFullYear().toString();
  document.getElementById('filter-month').value = String(now.getMonth() + 1).padStart(2, '0');
}

// Calculer les semaines du mois avec format dates
function chargerSemaines() {
  const year = parseInt(document.getElementById('filter-year').value);
  const month = document.getElementById('filter-month').value;
  
  if (!month) {
    document.getElementById('filter-week').innerHTML = '<option value="">Toutes les semaines</option>';
    return;
  }
  
  const monthInt = parseInt(month) - 1;
  const firstDay = new Date(year, monthInt, 1);
  const lastDay = new Date(year, monthInt + 1, 0);
  
  // Calculer toutes les semaines du mois
  const weeks = [];
  let currentDate = new Date(firstDay);
  
  while (currentDate <= lastDay) {
    // Trouver le lundi de cette semaine
    const monday = new Date(currentDate);
    const day = monday.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    monday.setDate(monday.getDate() + diff);
    
    // Trouver le dimanche
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    // Vérifier si cette semaine touche le mois en cours
    if (monday <= lastDay && sunday >= firstDay) {
      const weekNumber = getWeekNumber(monday);
      const weekData = {
        num: weekNumber,
        start: new Date(monday),
        end: new Date(sunday)
      };
      
      // Éviter les doublons
      if (!weeks.find(w => w.num === weekNumber)) {
        weeks.push(weekData);
      }
    }
    
    // Passer à la semaine suivante
    currentDate.setDate(currentDate.getDate() + 7);
  }
  
  // Trier par numéro de semaine
  weeks.sort((a, b) => a.num - b.num);
  
  // Générer les options
  let html = '<option value="">Toutes les semaines</option>';
  weeks.forEach(week => {
    const startDate = formatShortDate(week.start);
    const endDate = formatShortDate(week.end);
    html += `<option value="${week.num}">Semaine ${startDate} - ${endDate}</option>`;
  });
  
  document.getElementById('filter-week').innerHTML = html;
}

// Format date court (DD/MM)
function formatShortDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

// Obtenir le numéro de semaine ISO 8601
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Changer d'onglet principal
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

// Changer de sous-onglet improductivité
function switchImprodTab(subTab) {
  currentSubTab = subTab;
  
  // Mettre à jour les boutons
  ['total', 'controleurs', 'agents'].forEach(t => {
    const btn = document.getElementById(`improd-tab-${t}`);
    if (btn) {
      if (t === subTab) {
        btn.classList.add('bg-orange-500', 'text-white');
        btn.classList.remove('bg-gray-200', 'text-gray-700');
      } else {
        btn.classList.remove('bg-orange-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      }
    }
  });
  
  // Recharger les données
  chargerImproductivite();
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

// Charger les KPI (sans décalage +2h)
async function chargerKPI() {
  try {
    let dateParam = currentFilters.year;
    if (currentFilters.month) {
      dateParam += `-${currentFilters.month}`;
    }
    
    const response = await fetch(`/api/archives/kpi?date=${dateParam}&week=${currentFilters.week}&day=${currentFilters.day}`);
    const data = await response.json();
    
    if (data.success) {
      // Mettre à jour les stats (les durées sont déjà correctes du backend)
      document.getElementById('stat-total-camions').textContent = data.stats.total_camions || 0;
      document.getElementById('stat-dechargement').textContent = Math.abs(data.stats.dechargement_minutes || 0) + ' min';
      document.getElementById('stat-controle').textContent = Math.abs(data.stats.controle_minutes || 0) + ' min';
      
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

// Render liste KPI (affichage des durées correctes)
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
  
  container.innerHTML = quais.map(quai => {
    // Calcul des durées en minutes (les secondes viennent déjà du serveur sans décalage)
    const dureeDecharge = quai.timer_duration ? Math.floor(quai.timer_duration / 60) : 0;
    const dureeControle = quai.timer_controle_duration ? Math.floor(quai.timer_controle_duration / 60) : 0;
    
    return `
    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
            ${quai.quai_numero}
          </div>
          <div>
            <h4 class="font-bold text-gray-800 text-lg">Quai ${quai.quai_numero}</h4>
            <p class="text-sm text-gray-600">${new Date(quai.controle_fin_timestamp || quai.updated_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
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
            <i class="fas fa-truck-loading mr-1"></i>
            ${dureeDecharge} min
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Contrôle</div>
          <div class="text-lg font-bold text-purple-700">
            <i class="fas fa-clipboard-check mr-1"></i>
            ${dureeControle} min
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Fournisseur</div>
          <div class="text-sm font-semibold text-gray-800">${quai.controle_fournisseur || 'N/A'}</div>
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
            <strong>Commentaire :</strong> ${quai.commentaire}
          </p>
        </div>
      ` : ''}
    </div>
  `}).join('');
}

// Charger les improductivités (avec distinction contrôleurs/agents)
async function chargerImproductivite() {
  try {
    let dateParam = currentFilters.year;
    if (currentFilters.month) {
      dateParam += `-${currentFilters.month}`;
    }
    
    // Charger depuis l'API improductivités chef d'équipe
    const response = await fetch(`/api/improductivites?date=${dateParam}&week=${currentFilters.week}&day=${currentFilters.day}`);
    const data = await response.json();
    
    if (data.success) {
      const improds = data.improductivites || [];
      
      // Filtrer selon le sous-onglet
      let filteredImprods = improds;
      if (currentSubTab === 'controleurs') {
        filteredImprods = improds.filter(i => i.role === 'controleur');
      } else if (currentSubTab === 'agents') {
        filteredImprods = improds.filter(i => i.role === 'agent_quai');
      }
      
      // Séparer en traité/non-traité
      const traites = filteredImprods.filter(i => i.statut === 'valide' || i.statut === 'traite');
      const enAttente = filteredImprods.filter(i => i.statut === 'en_transmission' || i.statut === 'en_attente');
      
      // Calculer les stats
      const totalDuree = filteredImprods.reduce((sum, i) => {
        const duree = parseDuree(i.duree);
        return sum + duree;
      }, 0);
      
      // Mettre à jour les stats
      document.getElementById('stat-total-improd').textContent = filteredImprods.length;
      document.getElementById('stat-traites-improd').textContent = traites.length;
      document.getElementById('stat-attente-improd').textContent = enAttente.length;
      document.getElementById('stat-duree-improd').textContent = formatDureeMinutes(totalDuree);
      
      renderListeImprod(filteredImprods);
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

// Parser durée format HH:MM:SS en minutes
function parseDuree(duree) {
  if (!duree) return 0;
  const parts = duree.split(':');
  if (parts.length !== 3) return 0;
  const hours = parseInt(parts[0]) || 0;
  const minutes = parseInt(parts[1]) || 0;
  const seconds = parseInt(parts[2]) || 0;
  return (hours * 60) + minutes + Math.floor(seconds / 60);
}

// Formater durée en minutes
function formatDureeMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins} min`;
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
  
  // Séparer en traité/non-traité
  const traites = improds.filter(i => i.statut === 'valide' || i.statut === 'traite');
  const enAttente = improds.filter(i => i.statut === 'en_transmission' || i.statut === 'en_attente');
  
  let html = '';
  
  // Section traités
  if (traites.length > 0) {
    html += `
      <div class="mb-6">
        <h4 class="text-lg font-bold text-green-700 mb-3">
          <i class="fas fa-check-circle mr-2"></i>
          Improductivités Traitées (${traites.length})
        </h4>
        ${traites.map(improd => renderImprodCard(improd, true)).join('')}
      </div>
    `;
  }
  
  // Section en attente
  if (enAttente.length > 0) {
    html += `
      <div>
        <h4 class="text-lg font-bold text-orange-700 mb-3">
          <i class="fas fa-clock mr-2"></i>
          En Transmission (${enAttente.length})
        </h4>
        ${enAttente.map(improd => renderImprodCard(improd, false)).join('')}
      </div>
    `;
  }
  
  container.innerHTML = html;
}

// Render carte improductivité
function renderImprodCard(improd, traite) {
  const borderColor = traite ? 'border-green-500' : 'border-orange-500';
  const bgColor = traite ? 'from-green-50 to-blue-50' : 'from-orange-50 to-red-50';
  const roleLabel = improd.role === 'controleur' ? 'Contrôleur' : 'Agent de Quai';
  const roleIcon = improd.role === 'controleur' ? 'clipboard-check' : 'dolly';
  
  return `
    <div class="bg-gradient-to-r ${bgColor} rounded-lg p-6 border-l-4 ${borderColor} mb-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h5 class="font-bold text-gray-800 text-lg">
            <i class="fas fa-${roleIcon} mr-2 text-gray-600"></i>
            ${improd.utilisateur_nom}
          </h5>
          <p class="text-sm text-gray-600">
            <span class="bg-gray-200 px-2 py-1 rounded text-xs font-semibold">${roleLabel}</span>
            <span class="ml-2">${new Date(improd.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </p>
        </div>
        <div class="text-right">
          <div class="bg-${traite ? 'green' : 'orange'}-100 text-${traite ? 'green' : 'orange'}-700 px-3 py-2 rounded-lg text-sm font-semibold">
            <i class="fas fa-clock mr-1"></i>
            ${improd.duree}
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div class="text-xs text-gray-600">Raison</div>
          <div class="text-sm font-semibold text-gray-800">${getRaisonLabel(improd.raison)}</div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Statut</div>
          <div class="text-sm font-semibold text-gray-800">
            ${traite ? '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Traité</span>' : '<span class="text-orange-600"><i class="fas fa-clock mr-1"></i>En transmission</span>'}
          </div>
        </div>
      </div>
      
      ${improd.commentaire ? `
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-sm text-gray-700">
            <i class="fas fa-comment mr-1 text-gray-400"></i>
            <strong>Commentaire :</strong> ${improd.commentaire}
          </p>
        </div>
      ` : ''}
      
      ${improd.validation_commentaire ? `
        <div class="mt-2 bg-blue-50 rounded p-3">
          <p class="text-sm text-blue-800">
            <i class="fas fa-user-check mr-1"></i>
            <strong>Validation CE :</strong> ${improd.validation_commentaire}
          </p>
        </div>
      ` : ''}
    </div>
  `;
}

// Obtenir le label de raison
function getRaisonLabel(raison) {
  const labels = {
    'reseau': 'Réseau / Informatique',
    'etiquette': 'Étiquettes manquantes',
    'attente_chariot': 'Attente chariot',
    'formation': 'Formation',
    'reunion': 'Réunion',
    'accident': 'Accident / Incident',
    'autre': 'Autre'
  };
  return labels[raison] || raison;
}

// Charger les écarts (avec tous les détails)
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

// Render liste écarts (format complet comme contrôleur)
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
    const nonConformites = parseJSON(ecart.non_conformites) || [];
    const verificationPoints = parseJSON(ecart.verification_points) || {};
    const pointsNonConformes = Object.entries(verificationPoints).filter(([k, v]) => v === 'non_conforme');
    
    const traite = ecart.statut === 'traitee';
    const borderColor = traite ? 'border-green-500' : 'border-red-500';
    const bgColor = traite ? 'from-green-50 to-blue-50' : 'from-red-50 to-orange-50';
    
    return `
    <div class="bg-gradient-to-r ${bgColor} rounded-lg p-6 border-l-4 ${borderColor}">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="bg-${traite ? 'green' : 'red'}-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
            ${ecart.quai_numero}
          </div>
          <div>
            <h4 class="font-bold text-gray-800 text-lg">Quai ${ecart.quai_numero} - ${ecart.numero_id}</h4>
            <p class="text-sm text-gray-600">
              <i class="fas fa-calendar mr-1"></i>
              ${new Date(ecart.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <div class="text-right">
          <span class="bg-${traite ? 'green' : 'red'}-100 text-${traite ? 'green' : 'red'}-700 px-3 py-1 rounded-full text-sm font-semibold">
            <i class="fas fa-${traite ? 'check-circle' : 'exclamation-triangle'} mr-1"></i>
            ${traite ? 'Traité' : 'En attente'}
          </span>
        </div>
      </div>
      
      <!-- Informations générales -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div class="text-xs text-gray-600">Fournisseur</div>
          <div class="text-sm font-semibold text-gray-800">${ecart.fournisseur}</div>
        </div>
        <div>
          <div class="text-xs text-gray-600">Durée déchargement</div>
          <div class="text-sm font-semibold text-blue-700">
            ${ecart.duree_dechargement_secondes ? Math.floor(ecart.duree_dechargement_secondes / 60) + ' min' : 'N/A'}
          </div>
        </div>
        ${ecart.traite_par ? `
        <div>
          <div class="text-xs text-gray-600">Traité par</div>
          <div class="text-sm font-semibold text-green-700">${ecart.traite_par}</div>
        </div>
        ` : ''}
      </div>
      
      <!-- Écart de palettes -->
      <div class="bg-yellow-50 rounded-lg p-4 mb-4">
        <h5 class="font-bold text-yellow-800 mb-2">
          <i class="fas fa-pallet mr-2"></i>
          Écart de palettes
        </h5>
        <p class="text-sm text-gray-700">
          <strong>Attendues:</strong> ${ecart.ecart_palettes_attendues} | 
          <strong>Reçues:</strong> ${ecart.ecart_palettes_recues}
        </p>
      </div>
      
      <!-- Problèmes rencontrés -->
      ${nonConformites.length > 0 ? `
      <div class="bg-orange-50 rounded-lg p-4 mb-4">
        <h5 class="font-bold text-orange-800 mb-2">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          Problèmes rencontrés (${nonConformites.length})
        </h5>
        <ul class="list-disc list-inside space-y-1">
          ${nonConformites.map(p => `
            <li class="text-sm text-gray-700">${getProblemeLabel(p)}</li>
          `).join('')}
        </ul>
      </div>
      ` : ''}
      
      <!-- Points de contrôle non-conformes -->
      ${pointsNonConformes.length > 0 ? `
      <div class="bg-red-50 rounded-lg p-4 mb-4">
        <h5 class="font-bold text-red-800 mb-2">
          <i class="fas fa-times-circle mr-2"></i>
          Points de contrôle non-conformes (${pointsNonConformes.length})
        </h5>
        <ol class="list-decimal list-inside space-y-1">
          ${pointsNonConformes.map(([key, val]) => {
            const num = parseInt(key.replace('point_', ''));
            return `<li class="text-sm text-gray-700">${getPointControleLabel(num)}</li>`;
          }).join('')}
        </ol>
      </div>
      ` : ''}
      
      <!-- Commentaire chef d'équipe -->
      ${ecart.consignes ? `
      <div class="mt-4 pt-4 border-t border-gray-300 bg-blue-50 rounded p-3">
        <p class="text-sm text-blue-800">
          <i class="fas fa-user-tie mr-1"></i>
          <strong>Commentaire Chef d'Équipe :</strong> ${ecart.consignes}
        </p>
      </div>
      ` : ''}
    </div>
  `}).join('');
}

// Parser JSON sécurisé
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// Labels des problèmes
function getProblemeLabel(code) {
  const labels = {
    'palettes_largeur': 'Palettes chargées en largeur',
    'palettes_instables': 'Palettes instables / mal chargées',
    'palettes_mal_dechargees': 'Palettes mal déchargées',
    'marchandises_dangereuses': 'Marchandises dangereuses non chargées en fond de camion',
    'palettes_mal_filmees': 'Palettes mal filmées',
    'mauvais_formulaire_tu': 'Mauvais formulaire TU'
  };
  return labels[code] || code;
}

// Labels des points de contrôle
function getPointControleLabel(num) {
  const labels = {
    1: 'Extérieur / Essieux (plombage camion)',
    2: 'Côtés gauche et droit (déchirures, ...)',
    3: 'Paroi avant (double fond, ...)',
    4: 'Plancher (trappes, plancher amovible, ...)',
    5: 'Plafond / Toit (déchirures, usures, ...)',
    6: 'Portes intérieures / extérieures (herméticité, ...)',
    7: 'Cales roues bien positionnées',
    8: 'Nuisibles',
    9: 'Corps étranger',
    10: 'Propreté',
    11: 'Autre'
  };
  return labels[num] || `Point ${num}`;
}
