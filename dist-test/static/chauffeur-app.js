// ===== CHAUFFEUR APP - Système de gestion chauffeurs étrangers =====
// Version 1.0 - GXO Logistics Moissy-Cramayel

let chauffeurId = null;
let tachesValidees = {
  epi: false,
  placement: false,
  palette: false,
  accueil: false,
  clefs: false
};

// ===== TRADUCTIONS =====
const translations = {
  fr: {
    titre_inscription: 'Inscription Chauffeur',
    label_pseudo: 'Pseudo / Nom',
    label_entreprise: 'Entreprise de transport',
    label_quai: 'Numéro de quai attribué',
    btn_submit: 'Valider et commencer',
    titre_progression: 'Progression',
    titre_epi: 'Port des EPI obligatoires',
    desc_epi: 'Casque, gilet de sécurité, chaussures de sécurité',
    titre_placement: 'Placement correct à quai',
    desc_placement: 'Camion positionné et calé',
    titre_palette: 'Échange de palettes',
    desc_palette: 'Palettes EPAL / EUR comptées',
    titre_accueil: 'Accueil notifié',
    desc_accueil: 'Signaler votre arrivée à l\'accueil',
    titre_clefs: 'Remise des clefs',
    desc_clefs: 'Remettre les clefs à l\'agent de quai',
    btn_valider: 'Valider',
    btn_valide: 'Validé ✓'
  },
  en: {
    titre_inscription: 'Driver Registration',
    label_pseudo: 'Name / Nickname',
    label_entreprise: 'Transport Company',
    label_quai: 'Assigned Dock Number',
    btn_submit: 'Validate and Start',
    titre_progression: 'Progress',
    titre_epi: 'Mandatory PPE Wearing',
    desc_epi: 'Helmet, safety vest, safety shoes',
    titre_placement: 'Correct Dock Positioning',
    desc_placement: 'Truck positioned and secured',
    titre_palette: 'Pallet Exchange',
    desc_palette: 'EPAL / EUR pallets counted',
    titre_accueil: 'Reception Notified',
    desc_accueil: 'Report your arrival to reception',
    titre_clefs: 'Key Handover',
    desc_clefs: 'Hand over keys to dock agent',
    btn_valider: 'Validate',
    btn_valide: 'Validated ✓'
  },
  es: {
    titre_inscription: 'Registro de Conductor',
    label_pseudo: 'Nombre / Apodo',
    label_entreprise: 'Empresa de Transporte',
    label_quai: 'Número de Muelle Asignado',
    btn_submit: 'Validar y Comenzar',
    titre_progression: 'Progreso',
    titre_epi: 'Uso Obligatorio de EPP',
    desc_epi: 'Casco, chaleco de seguridad, zapatos de seguridad',
    titre_placement: 'Posicionamiento Correcto en Muelle',
    desc_placement: 'Camión posicionado y asegurado',
    titre_palette: 'Intercambio de Paletas',
    desc_palette: 'Paletas EPAL / EUR contadas',
    titre_accueil: 'Recepción Notificada',
    desc_accueil: 'Informar su llegada a recepción',
    titre_clefs: 'Entrega de Llaves',
    desc_clefs: 'Entregar llaves al agente de muelle',
    btn_valider: 'Validar',
    btn_valide: 'Validado ✓'
  },
  pl: {
    titre_inscription: 'Rejestracja Kierowcy',
    label_pseudo: 'Imię / Pseudonim',
    label_entreprise: 'Firma Transportowa',
    label_quai: 'Przydzielony Numer Doku',
    btn_submit: 'Zatwierdź i Rozpocznij',
    titre_progression: 'Postęp',
    titre_epi: 'Obowiązkowe Noszenie ŚOI',
    desc_epi: 'Kask, kamizelka odblaskowa, buty ochronne',
    titre_placement: 'Prawidłowe Ustawienie przy Doku',
    desc_placement: 'Ciężarówka ustawiona i zabezpieczona',
    titre_palette: 'Wymiana Palet',
    desc_palette: 'Palety EPAL / EUR policzone',
    titre_accueil: 'Recepcja Powiadomiona',
    desc_accueil: 'Zgłoś przyjazd w recepcji',
    titre_clefs: 'Przekazanie Kluczy',
    desc_clefs: 'Przekaż klucze agentowi doku',
    btn_valider: 'Zatwierdź',
    btn_valide: 'Zatwierdzono ✓'
  },
  de: {
    titre_inscription: 'Fahrerregistrierung',
    label_pseudo: 'Name / Spitzname',
    label_entreprise: 'Transportunternehmen',
    label_quai: 'Zugewiesene Rampe',
    btn_submit: 'Bestätigen und Starten',
    titre_progression: 'Fortschritt',
    titre_epi: 'Obligatorisches Tragen von PSA',
    desc_epi: 'Helm, Sicherheitsweste, Sicherheitsschuhe',
    titre_placement: 'Korrekte Positionierung an der Rampe',
    desc_placement: 'LKW positioniert und gesichert',
    titre_palette: 'Palettenaustausch',
    desc_palette: 'EPAL / EUR Paletten gezählt',
    titre_accueil: 'Empfang Benachrichtigt',
    desc_accueil: 'Melden Sie Ihre Ankunft am Empfang',
    titre_clefs: 'Schlüsselübergabe',
    desc_clefs: 'Übergeben Sie die Schlüssel an den Rampenagenten',
    btn_valider: 'Bestätigen',
    btn_valide: 'Bestätigt ✓'
  },
  it: {
    titre_inscription: 'Registrazione Autista',
    label_pseudo: 'Nome / Nickname',
    label_entreprise: 'Azienda di Trasporto',
    label_quai: 'Numero di Banchina Assegnato',
    btn_submit: 'Convalida e Inizia',
    titre_progression: 'Progresso',
    titre_epi: 'Uso Obbligatorio DPI',
    desc_epi: 'Casco, gilet di sicurezza, scarpe di sicurezza',
    titre_placement: 'Posizionamento Corretto in Banchina',
    desc_placement: 'Camion posizionato e assicurato',
    titre_palette: 'Scambio Pallet',
    desc_palette: 'Pallet EPAL / EUR contati',
    titre_accueil: 'Ricevimento Notificato',
    desc_accueil: 'Segnala il tuo arrivo alla reception',
    titre_clefs: 'Consegna Chiavi',
    desc_clefs: 'Consegna le chiavi all\'agente della banchina',
    btn_valider: 'Convalida',
    btn_valide: 'Convalidato ✓'
  },
  bg: {
    titre_inscription: 'Регистрация на шофьор',
    label_pseudo: 'Име / Прякор',
    label_entreprise: 'Транспортна компания',
    label_quai: 'Номер на док',
    btn_submit: 'Потвърди и започни',
    titre_progression: 'Прогрес',
    titre_epi: 'Задължително носене на ЛПС',
    desc_epi: 'Каска, светлоотразителна жилетка, предпазни обувки',
    titre_placement: 'Правилно позициониране на док',
    desc_placement: 'Камион позициониран и осигурен',
    titre_palette: 'Обмяна на палети',
    desc_palette: 'Палети EPAL / EUR преброени',
    titre_accueil: 'Рецепция уведомена',
    desc_accueil: 'Съобщете пристигането си на рецепцията',
    titre_clefs: 'Предаване на ключове',
    desc_clefs: 'Предайте ключовете на агента на дока',
    btn_valider: 'Потвърди',
    btn_valide: 'Потвърдено ✓'
  }
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚚 Chauffeur App v1.0 chargée');
  
  // Récupérer la langue
  const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
  console.log('Langue sélectionnée:', langue);
  
  // Appliquer les traductions
  appliquerTraductions(langue);
  
  // Gestion du formulaire d'inscription
  const form = document.getElementById('form-inscription');
  if (form) {
    form.addEventListener('submit', handleInscription);
  }
  
  // Vérifier si déjà inscrit
  const inscriptionData = sessionStorage.getItem('chauffeur_inscription');
  if (inscriptionData) {
    const data = JSON.parse(inscriptionData);
    chauffeurId = data.id;
    afficherSectionTaches();
    chargerProgression();
  }
});

// ===== TRADUCTIONS =====
function appliquerTraductions(langue) {
  const t = translations[langue] || translations.fr;
  
  const elements = {
    'titre-inscription': 'titre_inscription',
    'label-pseudo': 'label_pseudo',
    'label-entreprise': 'label_entreprise',
    'label-quai': 'label_quai',
    'btn-submit': 'btn_submit',
    'titre-progression': 'titre_progression',
    'titre-epi': 'titre_epi',
    'desc-epi': 'desc_epi',
    'titre-placement': 'titre_placement',
    'desc-placement': 'desc_placement',
    'titre-palette': 'titre_palette',
    'desc-palette': 'desc_palette',
    'titre-accueil': 'titre_accueil',
    'desc-accueil': 'desc_accueil',
    'titre-clefs': 'titre_clefs',
    'desc-clefs': 'desc_clefs'
  };
  
  for (const [elementId, translationKey] of Object.entries(elements)) {
    const el = document.getElementById(elementId);
    if (el && t[translationKey]) {
      el.textContent = t[translationKey];
    }
  }
  
  // Afficher la langue dans le header
  const langueNoms = {
    'fr': '🇫🇷 Français',
    'en': '🇬🇧 English',
    'es': '🇪🇸 Español',
    'pl': '🇵🇱 Polski',
    'de': '🇩🇪 Deutsch',
    'it': '🇮🇹 Italiano',
    'bg': '🇧🇬 Български'
  };
  const headerEl = document.getElementById('langue-header');
  if (headerEl) {
    headerEl.textContent = langueNoms[langue] || langue;
  }
}

// ===== INSCRIPTION =====
async function handleInscription(e) {
  e.preventDefault();
  
  const pseudo = document.getElementById('input-pseudo').value;
  const entreprise = document.getElementById('input-entreprise').value;
  const numeroQuai = document.getElementById('input-quai').value;
  const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
  
  console.log('📝 Inscription:', { pseudo, entreprise, numeroQuai, langue });
  
  try {
    // Envoyer au serveur
    const response = await fetch('/api/chauffeur/inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pseudo,
        entreprise,
        numero_quai: numeroQuai,
        langue,
        video_completed: sessionStorage.getItem('video_completed') === 'true'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      chauffeurId = data.id;
      
      // Sauvegarder en session
      sessionStorage.setItem('chauffeur_inscription', JSON.stringify({
        id: data.id,
        pseudo,
        entreprise,
        numero_quai: numeroQuai,
        langue
      }));
      
      // Afficher la section des tâches
      afficherSectionTaches();
    } else {
      alert('Erreur lors de l\'inscription: ' + data.error);
    }
  } catch (error) {
    console.error('Erreur inscription:', error);
    alert('Erreur de connexion au serveur');
  }
}

// ===== AFFICHAGE SECTION TÂCHES =====
function afficherSectionTaches() {
  document.getElementById('section-inscription').classList.add('hidden');
  document.getElementById('section-taches').classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ===== VALIDATION DES TÂCHES =====
window.validerTache = async function(tache) {
  if (tachesValidees[tache]) {
    console.log('Tâche déjà validée:', tache);
    return;
  }
  
  console.log('✅ Validation tâche:', tache);
  
  try {
    // Envoyer au serveur
    const response = await fetch('/api/chauffeur/valider-tache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chauffeur_id: chauffeurId,
        tache: tache
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      tachesValidees[tache] = true;
      
      // Mettre à jour l'UI
      const btn = document.getElementById(`btn-${tache}`);
      const icon = document.getElementById(`icon-${tache}`);
      const btnText = document.getElementById(`btn-${tache}-text`);
      
      btn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
      btn.classList.add('bg-green-500', 'cursor-not-allowed');
      btn.disabled = true;
      
      icon.classList.remove('bg-gray-200');
      icon.classList.add('bg-green-500');
      icon.querySelector('i').classList.remove('text-gray-400');
      icon.querySelector('i').classList.add('text-white');
      
      const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
      const t = translations[langue] || translations.fr;
      btnText.textContent = t.btn_valide || 'Validé ✓';
      
      // Mettre à jour la progression
      mettreAJourProgression();
      
      // Vérifier si toutes les tâches sont validées
      if (Object.values(tachesValidees).every(v => v)) {
        console.log('🎉 Toutes les tâches validées !');
        setTimeout(() => {
          alert('Félicitations ! Toutes les tâches sont terminées. Vous pouvez maintenant décharger votre camion.');
        }, 500);
      }
    }
  } catch (error) {
    console.error('Erreur validation tâche:', error);
    alert('Erreur de connexion au serveur');
  }
};

// ===== PROGRESSION =====
function mettreAJourProgression() {
  const total = Object.keys(tachesValidees).length;
  const validees = Object.values(tachesValidees).filter(v => v).length;
  const pourcentage = Math.round((validees / total) * 100);
  
  const progressBar = document.getElementById('progress-global');
  progressBar.style.width = pourcentage + '%';
  progressBar.textContent = pourcentage + '%';
  
  console.log(`Progression: ${validees}/${total} (${pourcentage}%)`);
}

async function chargerProgression() {
  try {
    const response = await fetch(`/api/chauffeur/progression?id=${chauffeurId}`);
    const data = await response.json();
    
    if (data.success) {
      tachesValidees = {
        epi: data.task_epi_porte,
        placement: data.task_placement_quai,
        palette: data.task_palette_change,
        accueil: data.task_accueil_notifie,
        clefs: data.task_clefs_remises
      };
      
      // Mettre à jour l'UI pour chaque tâche
      for (const [tache, valide] of Object.entries(tachesValidees)) {
        if (valide) {
          const btn = document.getElementById(`btn-${tache}`);
          const icon = document.getElementById(`icon-${tache}`);
          const btnText = document.getElementById(`btn-${tache}-text`);
          
          if (btn) {
            btn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
            btn.classList.add('bg-green-500', 'cursor-not-allowed');
            btn.disabled = true;
          }
          
          if (icon) {
            icon.classList.remove('bg-gray-200');
            icon.classList.add('bg-green-500');
            icon.querySelector('i').classList.remove('text-gray-400');
            icon.querySelector('i').classList.add('text-white');
          }
          
          if (btnText) {
            const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
            const t = translations[langue] || translations.fr;
            btnText.textContent = t.btn_valide || 'Validé ✓';
          }
        }
      }
      
      mettreAJourProgression();
    }
  } catch (error) {
    console.error('Erreur chargement progression:', error);
  }
}

// ===== CHAT =====
window.toggleChat = function() {
  const chatModal = document.getElementById('chat-modal');
  chatModal.classList.toggle('hidden');
  
  if (!chatModal.classList.contains('hidden')) {
    chargerMessages();
  }
};

window.envoyerMessage = async function() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  console.log('💬 Envoi message:', message);
  
  try {
    const response = await fetch('/api/chauffeur/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chauffeur_id: chauffeurId,
        message: message
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      input.value = '';
      ajouterMessageUI(message, 'chauffeur');
    }
  } catch (error) {
    console.error('Erreur envoi message:', error);
  }
};

function ajouterMessageUI(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const isDriver = sender === 'chauffeur';
  
  const messageEl = document.createElement('div');
  messageEl.className = `mb-3 ${isDriver ? 'text-right' : 'text-left'}`;
  messageEl.innerHTML = `
    <div class="inline-block max-w-[70%] ${isDriver ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg px-4 py-2">
      <p class="text-sm">${escapeHtml(message)}</p>
      <p class="text-xs opacity-75 mt-1">${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  `;
  
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function chargerMessages() {
  try {
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${chauffeurId}`);
    const data = await response.json();
    
    if (data.success) {
      const chatMessages = document.getElementById('chat-messages');
      chatMessages.innerHTML = '';
      
      data.messages.forEach(msg => {
        ajouterMessageUI(msg.message, msg.sender);
      });
    }
  } catch (error) {
    console.error('Erreur chargement messages:', error);
  }
}

// ===== UTILITAIRES =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Polling pour les nouveaux messages
setInterval(() => {
  if (chauffeurId && !document.getElementById('chat-modal').classList.contains('hidden')) {
    chargerMessages();
  }
}, 5000);

console.log('✅ Chauffeur App initialisée');
