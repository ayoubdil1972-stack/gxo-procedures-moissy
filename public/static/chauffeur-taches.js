// Chauffeur Tâches - Gestion des tâches de déchargement
// Page: /chauffeur/taches

let chauffeurId = null;
let startTime = null;
let intervalTimer = null;
let intervalProgression = null;
let currentLangue = 'fr';

// Traductions pour toutes les langues
const translations = {
  fr: {
    flag: '🇫🇷',
    name: 'Français',
    taches: [
      { titre: '🦺 EPI Porté', description: 'Casque, gilet, chaussures de sécurité' },
      { titre: '🚚 Placement au Quai', description: 'Garer le camion et mettre les cales' },
      { titre: '📦 Échange Palettes', description: 'Compter et échanger les palettes' },
      { titre: '🔔 Accueil Notifié', description: 'Signaler votre présence' },
      { titre: '🔑 Remise Clés', description: 'Remettre les clés à l\'agent' }
    ],
    progression: 'Votre Progression',
    quai: 'Quai',
    completee: 'Complétée',
    tempsEcoule: 'Temps écoulé',
    valider: 'Valider',
    completA: 'Complété à',
    felicitations: 'Félicitations !',
    toutesTerminees: 'Toutes les tâches sont terminées',
    agentVaComing: 'Un agent va venir vous voir pour le déchargement',
    supportGXO: 'Support GXO',
    enLigne: 'En ligne',
    commencerConversation: 'Commencez une conversation',
    ecrivezMessage: 'Écrivez votre message...'
  },
  nl: {
    flag: '🇳🇱',
    name: 'Nederlands',
    taches: [
      { titre: '🦺 PBM Gedragen', description: 'Helm, vest, veiligheidsschoenen' },
      { titre: '🚚 Plaatsing bij Dok', description: 'Parkeer de vrachtwagen en plaats de wiggen' },
      { titre: '📦 Palletruil', description: 'Tel en ruil de pallets' },
      { titre: '🔔 Receptie op de Hoogte', description: 'Meld uw aanwezigheid' },
      { titre: '🔑 Sleutels Overhandigen', description: 'Geef de sleutels aan de agent' }
    ],
    progression: 'Uw Voortgang',
    quai: 'Dok',
    completee: 'Voltooid',
    tempsEcoule: 'Verstreken tijd',
    valider: 'Bevestigen',
    completA: 'Voltooid om',
    felicitations: 'Gefeliciteerd!',
    toutesTerminees: 'Alle taken zijn voltooid',
    agentVaComing: 'Een agent komt naar u toe voor het lossen',
    supportGXO: 'GXO Ondersteuning',
    enLigne: 'Online',
    commencerConversation: 'Begin een gesprek',
    ecrivezMessage: 'Schrijf uw bericht...'
  },
  fi: {
    flag: '🇫🇮',
    name: 'Suomi',
    taches: [
      { titre: '🦺 Suojavarusteet Päällä', description: 'Kypärä, liivi, turvakengät' },
      { titre: '🚚 Sijoittaminen Laiturille', description: 'Pysäköi kuorma-auto ja aseta kiilat' },
      { titre: '📦 Lavavaihto', description: 'Laske ja vaihda lavat' },
      { titre: '🔔 Vastaanotto Ilmoitettu', description: 'Ilmoita läsnäolosi' },
      { titre: '🔑 Avainten Luovutus', description: 'Anna avaimet agentille' }
    ],
    progression: 'Edistymisesi',
    quai: 'Laituri',
    completee: 'Valmis',
    tempsEcoule: 'Kulunut aika',
    valider: 'Vahvista',
    completA: 'Valmis klo',
    felicitations: 'Onnittelut!',
    toutesTerminees: 'Kaikki tehtävät on suoritettu',
    agentVaComing: 'Agentti tulee luoksesi purkamista varten',
    supportGXO: 'GXO Tuki',
    enLigne: 'Online',
    commencerConversation: 'Aloita keskustelu',
    ecrivezMessage: 'Kirjoita viestisi...'
  },
  de: {
    flag: '🇩🇪',
    name: 'Deutsch',
    taches: [
      { titre: '🦺 PSA Getragen', description: 'Helm, Weste, Sicherheitsschuhe' },
      { titre: '🚚 Platzierung am Dock', description: 'LKW parken und Keile setzen' },
      { titre: '📦 Palettenaustausch', description: 'Paletten zählen und austauschen' },
      { titre: '🔔 Empfang Benachrichtigt', description: 'Melden Sie Ihre Anwesenheit' },
      { titre: '🔑 Schlüsselübergabe', description: 'Schlüssel an Agent übergeben' }
    ],
    progression: 'Ihr Fortschritt',
    quai: 'Dock',
    completee: 'Abgeschlossen',
    tempsEcoule: 'Verstrichene Zeit',
    valider: 'Bestätigen',
    completA: 'Abgeschlossen um',
    felicitations: 'Glückwunsch!',
    toutesTerminees: 'Alle Aufgaben sind erledigt',
    agentVaComing: 'Ein Agent wird zum Entladen zu Ihnen kommen',
    supportGXO: 'GXO Support',
    enLigne: 'Online',
    commencerConversation: 'Gespräch beginnen',
    ecrivezMessage: 'Schreiben Sie Ihre Nachricht...'
  },
  it: {
    flag: '🇮🇹',
    name: 'Italiano',
    taches: [
      { titre: '🦺 DPI Indossati', description: 'Casco, giubbotto, scarpe di sicurezza' },
      { titre: '🚚 Posizionamento alla Banchina', description: 'Parcheggiare il camion e mettere i cunei' },
      { titre: '📦 Scambio Pallet', description: 'Contare e scambiare i pallet' },
      { titre: '🔔 Accoglienza Notificata', description: 'Segnalare la tua presenza' },
      { titre: '🔑 Consegna Chiavi', description: 'Consegnare le chiavi all\'agente' }
    ],
    progression: 'Il Tuo Progresso',
    quai: 'Banchina',
    completee: 'Completato',
    tempsEcoule: 'Tempo trascorso',
    valider: 'Convalidare',
    completA: 'Completato alle',
    felicitations: 'Congratulazioni!',
    toutesTerminees: 'Tutti i compiti sono completati',
    agentVaComing: 'Un agente verrà da te per lo scarico',
    supportGXO: 'Supporto GXO',
    enLigne: 'Online',
    commencerConversation: 'Inizia una conversazione',
    ecrivezMessage: 'Scrivi il tuo messaggio...'
  },
  pl: {
    flag: '🇵🇱',
    name: 'Polski',
    taches: [
      { titre: '🦺 ŚOI Założone', description: 'Kask, kamizelka, buty ochronne' },
      { titre: '🚚 Ustawienie przy Doku', description: 'Zaparkuj ciężarówkę i ustaw kliny' },
      { titre: '📦 Wymiana Palet', description: 'Policzyć i wymienić palety' },
      { titre: '🔔 Recepcja Powiadomiona', description: 'Zgłoś swoją obecność' },
      { titre: '🔑 Przekazanie Kluczy', description: 'Przekaż klucze agentowi' }
    ],
    progression: 'Twój Postęp',
    quai: 'Dok',
    completee: 'Ukończone',
    tempsEcoule: 'Upłynął czas',
    valider: 'Potwierdź',
    completA: 'Ukończono o',
    felicitations: 'Gratulacje!',
    toutesTerminees: 'Wszystkie zadania są ukończone',
    agentVaComing: 'Agent przyjdzie do Ciebie w celu rozładunku',
    supportGXO: 'Wsparcie GXO',
    enLigne: 'Online',
    commencerConversation: 'Rozpocznij rozmowę',
    ecrivezMessage: 'Napisz swoją wiadomość...'
  },
  pt: {
    flag: '🇵🇹',
    name: 'Português',
    taches: [
      { titre: '🦺 EPI Vestido', description: 'Capacete, colete, sapatos de segurança' },
      { titre: '🚚 Posicionamento no Cais', description: 'Estacionar o caminhão e colocar os calços' },
      { titre: '📦 Troca de Paletes', description: 'Contar e trocar as paletes' },
      { titre: '🔔 Recepção Notificada', description: 'Informar sua presença' },
      { titre: '🔑 Entrega das Chaves', description: 'Entregar as chaves ao agente' }
    ],
    progression: 'Seu Progresso',
    quai: 'Cais',
    completee: 'Concluído',
    tempsEcoule: 'Tempo decorrido',
    valider: 'Validar',
    completA: 'Concluído às',
    felicitations: 'Parabéns!',
    toutesTerminees: 'Todas as tarefas estão concluídas',
    agentVaComing: 'Um agente virá até você para a descarga',
    supportGXO: 'Suporte GXO',
    enLigne: 'Online',
    commencerConversation: 'Comece uma conversa',
    ecrivezMessage: 'Escreva sua mensagem...'
  },
  bg: {
    flag: '🇧🇬',
    name: 'Български',
    taches: [
      { titre: '🦺 ЛПС Носени', description: 'Каска, жилетка, защитни обувки' },
      { titre: '🚚 Позициониране на Кея', description: 'Паркирайте камиона и поставете клиновете' },
      { titre: '📦 Замяна на Палети', description: 'Преброете и сменете палетите' },
      { titre: '🔔 Рецепция Уведомена', description: 'Съобщете за присъствието си' },
      { titre: '🔑 Предаване на Ключове', description: 'Предайте ключовете на агента' }
    ],
    progression: 'Вашият Прогрес',
    quai: 'Кей',
    completee: 'Завършено',
    tempsEcoule: 'Изминало време',
    valider: 'Потвърди',
    completA: 'Завършено в',
    felicitations: 'Поздравления!',
    toutesTerminees: 'Всички задачи са завършени',
    agentVaComing: 'Агент ще дойде при вас за разтоварване',
    supportGXO: 'Поддръжка GXO',
    enLigne: 'Онлайн',
    commencerConversation: 'Започнете разговор',
    ecrivezMessage: 'Напишете съобщението си...'
  },
  cs: {
    flag: '🇨🇿',
    name: 'Čeština',
    taches: [
      { titre: '🦺 OOPP Nasazeny', description: 'Helma, vesta, bezpečnostní obuv' },
      { titre: '🚚 Umístění u Rampy', description: 'Zaparkujte nákladní auto a nasaďte klíny' },
      { titre: '📦 Výměna Palet', description: 'Spočítejte a vyměňte palety' },
      { titre: '🔔 Recepce Informována', description: 'Nahlaste svou přítomnost' },
      { titre: '🔑 Předání Klíčů', description: 'Předejte klíče agentovi' }
    ],
    progression: 'Váš Pokrok',
    quai: 'Rampa',
    completee: 'Dokončeno',
    tempsEcoule: 'Uplynulý čas',
    valider: 'Potvrdit',
    completA: 'Dokončeno v',
    felicitations: 'Gratulujeme!',
    toutesTerminees: 'Všechny úkoly jsou dokončeny',
    agentVaComing: 'Agent k vám přijde pro vykládku',
    supportGXO: 'Podpora GXO',
    enLigne: 'Online',
    commencerConversation: 'Začít konverzaci',
    ecrivezMessage: 'Napište svou zprávu...'
  },
  da: {
    flag: '🇩🇰',
    name: 'Dansk',
    taches: [
      { titre: '🦺 Værnemidler Påført', description: 'Hjelm, vest, sikkerhedssko' },
      { titre: '🚚 Placering ved Kaj', description: 'Parker lastbilen og sæt kileskoene' },
      { titre: '📦 Palleudveksling', description: 'Tæl og udveksl pallerne' },
      { titre: '🔔 Reception Underrettet', description: 'Anmeld din tilstedeværelse' },
      { titre: '🔑 Nøglelevering', description: 'Aflever nøglerne til agenten' }
    ],
    progression: 'Din Fremgang',
    quai: 'Kaj',
    completee: 'Færdig',
    tempsEcoule: 'Forløbet tid',
    valider: 'Bekræft',
    completA: 'Færdig kl',
    felicitations: 'Tillykke!',
    toutesTerminees: 'Alle opgaver er færdige',
    agentVaComing: 'En agent kommer til dig for aflæsning',
    supportGXO: 'GXO Support',
    enLigne: 'Online',
    commencerConversation: 'Start en samtale',
    ecrivezMessage: 'Skriv din besked...'
  },
  hr: {
    flag: '🇭🇷',
    name: 'Hrvatski',
    taches: [
      { titre: '🦺 ZOO Nošeno', description: 'Kaciga, prsluk, zaštitne cipele' },
      { titre: '🚚 Postavljanje na Pristaništu', description: 'Parkirajte kamion i stavite klinove' },
      { titre: '📦 Zamjena Paleta', description: 'Prebrojite i zamijenite palete' },
      { titre: '🔔 Recepcija Obavještena', description: 'Prijavite svoju prisutnost' },
      { titre: '🔑 Predaja Ključeva', description: 'Predajte ključeve agentu' }
    ],
    progression: 'Vaš Napredak',
    quai: 'Pristanište',
    completee: 'Završeno',
    tempsEcoule: 'Proteklo vrijeme',
    valider: 'Potvrdite',
    completA: 'Završeno u',
    felicitations: 'Čestitamo!',
    toutesTerminees: 'Svi zadaci su završeni',
    agentVaComing: 'Agent će doći k vama za istovar',
    supportGXO: 'GXO Podrška',
    enLigne: 'Online',
    commencerConversation: 'Započnite razgovor',
    ecrivezMessage: 'Napišite svoju poruku...'
  },
  ro: {
    flag: '🇷🇴',
    name: 'Română',
    taches: [
      { titre: '🦺 EIP Purtat', description: 'Cască, vestă, încălțăminte de protecție' },
      { titre: '🚚 Poziționare la Doc', description: 'Parcați camionul și puneți pene' },
      { titre: '📦 Schimb de Paleți', description: 'Numărați și schimbați paleții' },
      { titre: '🔔 Recepție Notificată', description: 'Anunțați prezența dvs.' },
      { titre: '🔑 Predare Chei', description: 'Predați cheile agentului' }
    ],
    progression: 'Progresul Dvs.',
    quai: 'Doc',
    completee: 'Finalizat',
    tempsEcoule: 'Timp trecut',
    valider: 'Validează',
    completA: 'Finalizat la',
    felicitations: 'Felicitări!',
    toutesTerminees: 'Toate sarcinile sunt finalizate',
    agentVaComing: 'Un agent va veni la dvs. pentru descărcare',
    supportGXO: 'Suport GXO',
    enLigne: 'Online',
    commencerConversation: 'Începeți o conversație',
    ecrivezMessage: 'Scrieți mesajul dvs...'
  }
};

// Récupérer l'ID du chauffeur et la langue
function getChauffeurId() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || sessionStorage.getItem('chauffeur_id');
  
  if (!id) {
    alert('❌ Session invalide. Veuillez vous réinscrire.');
    window.location.href = '/chauffeur/inscription';
    return null;
  }
  
  sessionStorage.setItem('chauffeur_id', id);
  
  // Récupérer la langue
  currentLangue = sessionStorage.getItem('chauffeur_langue') || 'fr';
  
  return id;
}

// Mettre à jour l'indicateur de langue en haut à droite
function updateLangueIndicator() {
  const lang = translations[currentLangue];
  if (lang) {
    const indicator = document.getElementById('langue-indicator');
    if (indicator) {
      indicator.innerHTML = `
        <span class="text-2xl mr-2">${lang.flag}</span>
        <span class="font-bold">${lang.name.substring(0, 2).toUpperCase()}</span>
      `;
    }
  }
}

// Charger les informations du chauffeur
async function chargerInfosChauffeur() {
  try {
    const response = await fetch(`/api/chauffeur/progression?id=${chauffeurId}`);
    const data = await response.json();
    
    if (data.success) {
      const lang = translations[currentLangue];
      document.getElementById('chauffeur-pseudo').textContent = data.pseudo || 'Chauffeur';
      document.getElementById('info-quai').textContent = data.numero_quai || '--';
      startTime = new Date(data.arrival_time);
      
      return data;
    }
  } catch (error) {
    console.error('Erreur chargement infos:', error);
  }
}

// Charger les tâches avec traductions
async function chargerTaches() {
  try {
    const data = await chargerInfosChauffeur();
    const container = document.getElementById('liste-taches');
    const lang = translations[currentLangue];
    
    const taches = [
      { 
        id: 'epi', 
        titre: lang.taches[0].titre,
        description: lang.taches[0].description,
        completed: data.task_epi_porte,
        time: data.task_epi_porte_time
      },
      { 
        id: 'placement', 
        titre: lang.taches[1].titre,
        description: lang.taches[1].description,
        completed: data.task_placement_quai,
        time: data.task_placement_quai_time
      },
      { 
        id: 'palette', 
        titre: lang.taches[2].titre,
        description: lang.taches[2].description,
        completed: data.task_palette_change,
        time: data.task_palette_change_time
      },
      { 
        id: 'accueil', 
        titre: lang.taches[3].titre,
        description: lang.taches[3].description,
        completed: data.task_accueil_notifie,
        time: data.task_accueil_notifie_time
      },
      { 
        id: 'clefs', 
        titre: lang.taches[4].titre,
        description: lang.taches[4].description,
        completed: data.task_clefs_remises,
        time: data.task_clefs_remises_time
      }
    ];
    
    container.innerHTML = '';
    
    taches.forEach((tache, index) => {
      const div = document.createElement('div');
      div.className = `bg-white rounded-xl shadow-lg p-5 border-l-4 transition-all transform ${
        tache.completed 
          ? 'border-green-500 opacity-75 scale-95' 
          : 'border-orange-500 hover:shadow-2xl hover:scale-102'
      }`;
      div.id = `tache-${tache.id}`;
      
      div.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <span class="text-3xl font-bold text-gray-400">${index + 1}</span>
              <h3 class="text-xl font-bold text-gray-800">${tache.titre}</h3>
            </div>
            <p class="text-gray-600 text-sm ml-12">${tache.description}</p>
            ${tache.completed && tache.time ? `
              <div class="text-xs text-green-600 ml-12 mt-2 flex items-center">
                <i class="fas fa-check-circle mr-1 animate-pulse"></i>
                ${lang.completA} ${new Date(tache.time).toLocaleTimeString(currentLangue === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            ` : ''}
          </div>
          
          ${tache.completed ? `
            <div class="bg-green-100 rounded-full p-4 animate-bounce-once">
              <i class="fas fa-check text-green-600 text-3xl"></i>
            </div>
          ` : `
            <button 
              onclick="validerTache('${tache.id}')" 
              class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-full transition transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl"
            >
              <i class="fas fa-check mr-2"></i>
              ${lang.valider}
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
      const messageComplet = document.getElementById('message-complet');
      messageComplet.classList.remove('hidden');
      messageComplet.innerHTML = `
        <i class="fas fa-check-circle text-6xl mb-4 animate-bounce"></i>
        <h3 class="text-3xl font-bold mb-2">${lang.felicitations}</h3>
        <p class="text-lg mb-4">${lang.toutesTerminees}</p>
        <p class="text-sm opacity-90">${lang.agentVaComing}</p>
      `;
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
  }
}

// Valider une tâche avec animation
async function validerTache(tache) {
  try {
    const tacheElement = document.getElementById(`tache-${tache}`);
    
    // Animation de chargement
    tacheElement.classList.add('animate-pulse');
    
    const response = await fetch('/api/chauffeur/valider-tache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chauffeur_id: chauffeurId, tache })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Animation de succès spectaculaire
      tacheElement.classList.remove('animate-pulse');
      tacheElement.classList.add('animate-success');
      
      // Confettis animation
      createConfetti(tacheElement);
      
      // Son de succès (optionnel)
      playSuccessSound();
      
      // Notification toast
      showSuccessToast();
      
      // Recharger les tâches après 800ms
      setTimeout(async () => {
        await chargerTaches();
      }, 800);
      
    } else {
      tacheElement.classList.remove('animate-pulse');
      alert('❌ Erreur lors de la validation');
    }
  } catch (error) {
    console.error('Erreur validation:', error);
    alert('❌ Erreur réseau');
  }
}

// Animation de confettis
function createConfetti(element) {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.backgroundColor = ['#FF5A1A', '#10B981', '#3B82F6', '#F59E0B'][Math.floor(Math.random() * 4)];
    element.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 1000);
  }
}

// Son de succès
function playSuccessSound() {
  // Créer un son simple avec Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Toast de succès
function showSuccessToast() {
  const lang = translations[currentLangue];
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in-right flex items-center space-x-3';
  toast.innerHTML = `
    <i class="fas fa-check-circle text-2xl"></i>
    <span class="font-bold text-lg">${lang.valider} ✓</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('animate-slide-out-right');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// Timer
function startTimer() {
  updateTimer();
  intervalTimer = setInterval(updateTimer, 60000);
}

function updateTimer() {
  if (!startTime) return;
  const lang = translations[currentLangue];
  const now = new Date();
  const diff = Math.floor((now - startTime) / 60000);
  document.getElementById('temps-ecoule').textContent = `${diff} min`;
}

function stopTimer() {
  if (intervalTimer) clearInterval(intervalTimer);
}

// Chat
document.getElementById('btn-chat').addEventListener('click', () => {
  document.getElementById('modal-chat').classList.remove('hidden');
  chargerMessages();
});

document.getElementById('btn-fermer-chat').addEventListener('click', () => {
  document.getElementById('modal-chat').classList.add('hidden');
});

async function chargerMessages() {
  const lang = translations[currentLangue];
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
            <p class="text-xs opacity-75 mt-1">${new Date(msg.timestamp).toLocaleTimeString(currentLangue === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        `;
        
        container.appendChild(div);
      });
      
      container.scrollTop = container.scrollHeight;
      
      await fetch('/api/chauffeur/chat/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chauffeur_id: chauffeurId, reader: 'chauffeur' })
      });
      
    } else {
      container.innerHTML = `
        <div class="text-center text-gray-500 text-sm py-8">
          <i class="fas fa-comments text-4xl mb-2 opacity-30"></i>
          <p>${lang.commencerConversation}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur chargement messages:', error);
  }
}

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

// Actualisation automatique
function demarrerActualisationAuto() {
  intervalProgression = setInterval(async () => {
    await chargerTaches();
    
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
  }, 10000);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  chauffeurId = getChauffeurId();
  
  if (chauffeurId) {
    updateLangueIndicator();
    chargerTaches();
    startTimer();
    demarrerActualisationAuto();
  }
});

window.addEventListener('beforeunload', () => {
  stopTimer();
  if (intervalProgression) clearInterval(intervalProgression);
});

// Styles CSS pour les animations (à ajouter dans un style tag)
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce-once {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  @keyframes success {
    0% { transform: scale(1); }
    50% { transform: scale(1.05) rotate(2deg); }
    100% { transform: scale(1); }
  }
  
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slide-out-right {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .animate-bounce-once {
    animation: bounce-once 0.6s ease-in-out;
  }
  
  .animate-success {
    animation: success 0.6s ease-in-out;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
  }
  
  .animate-slide-out-right {
    animation: slide-out-right 0.3s ease-in;
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    animation: confetti-fall 1s ease-out forwards;
  }
  
  @keyframes confetti-fall {
    to {
      transform: translateY(100px) rotate(360deg);
      opacity: 0;
    }
  }
  
  .hover\:scale-102:hover {
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);
