// Template HTML pour les pages de tâches multilingues
// Génère le HTML complet avec traductions intégrées

interface TachesTranslations {
  pageTitle: string;
  welcome: string;
  yourProgress: string;
  dock: string;
  completed: string;
  timeElapsed: string;
  minutes: string;
  congratulations: string;
  allTasksCompleted: string;
  agentWillCome: string;
  supportGXO: string;
  online: string;
  adminTyping: string;
  writeMessage: string;
  startConversation: string;
}

const translations: Record<string, TachesTranslations> = {
  fr: {
    pageTitle: 'Mes Tâches',
    welcome: 'Bienvenue',
    yourProgress: 'Votre Progression',
    dock: 'Quai',
    completed: 'Complétée',
    timeElapsed: 'Temps écoulé',
    minutes: 'min',
    congratulations: 'Félicitations !',
    allTasksCompleted: 'Toutes les tâches sont terminées',
    agentWillCome: 'Un agent va venir vous voir pour le déchargement',
    supportGXO: 'Support GXO',
    online: 'En ligne',
    adminTyping: "L'admin écrit...",
    writeMessage: 'Écrivez votre message...',
    startConversation: 'Commencez une conversation'
  },
  it: {
    pageTitle: 'I Miei Compiti',
    welcome: 'Benvenuto',
    yourProgress: 'I Tuoi Progressi',
    dock: 'Banchina',
    completed: 'Completata',
    timeElapsed: 'Tempo trascorso',
    minutes: 'min',
    congratulations: 'Congratulazioni!',
    allTasksCompleted: 'Tutti i compiti sono completati',
    agentWillCome: "Un agente verrà a trovarti per lo scarico",
    supportGXO: 'Supporto GXO',
    online: 'Online',
    adminTyping: "L'admin sta scrivendo...",
    writeMessage: 'Scrivi il tuo messaggio...',
    startConversation: 'Inizia una conversazione'
  },
  nl: {
    pageTitle: 'Mijn Taken',
    welcome: 'Welkom',
    yourProgress: 'Uw Voortgang',
    dock: 'Kade',
    completed: 'Voltooid',
    timeElapsed: 'Verstreken tijd',
    minutes: 'min',
    congratulations: 'Gefeliciteerd!',
    allTasksCompleted: 'Alle taken zijn voltooid',
    agentWillCome: 'Een medewerker komt naar u toe voor het lossen',
    supportGXO: 'GXO Ondersteuning',
    online: 'Online',
    adminTyping: 'De admin typt...',
    writeMessage: 'Schrijf uw bericht...',
    startConversation: 'Begin een gesprek'
  },
  de: {
    pageTitle: 'Meine Aufgaben',
    welcome: 'Willkommen',
    yourProgress: 'Ihr Fortschritt',
    dock: 'Kai',
    completed: 'Abgeschlossen',
    timeElapsed: 'Verstrichene Zeit',
    minutes: 'Min',
    congratulations: 'Glückwunsch!',
    allTasksCompleted: 'Alle Aufgaben sind abgeschlossen',
    agentWillCome: 'Ein Mitarbeiter wird zum Entladen zu Ihnen kommen',
    supportGXO: 'GXO Support',
    online: 'Online',
    adminTyping: 'Der Admin tippt...',
    writeMessage: 'Schreiben Sie Ihre Nachricht...',
    startConversation: 'Starten Sie ein Gespräch'
  },
  pl: {
    pageTitle: 'Moje Zadania',
    welcome: 'Witamy',
    yourProgress: 'Twoje Postępy',
    dock: 'Nabrzeże',
    completed: 'Ukończone',
    timeElapsed: 'Upłynął czas',
    minutes: 'min',
    congratulations: 'Gratulacje!',
    allTasksCompleted: 'Wszystkie zadania zostały ukończone',
    agentWillCome: 'Agent przyjdzie do Ciebie w celu rozładunku',
    supportGXO: 'Wsparcie GXO',
    online: 'Online',
    adminTyping: 'Admin pisze...',
    writeMessage: 'Napisz swoją wiadomość...',
    startConversation: 'Rozpocznij rozmowę'
  },
  pt: {
    pageTitle: 'Minhas Tarefas',
    welcome: 'Bem-vindo',
    yourProgress: 'Seu Progresso',
    dock: 'Cais',
    completed: 'Concluída',
    timeElapsed: 'Tempo decorrido',
    minutes: 'min',
    congratulations: 'Parabéns!',
    allTasksCompleted: 'Todas as tarefas estão concluídas',
    agentWillCome: 'Um agente virá até você para o descarregamento',
    supportGXO: 'Suporte GXO',
    online: 'Online',
    adminTyping: 'O admin está digitando...',
    writeMessage: 'Escreva sua mensagem...',
    startConversation: 'Inicie uma conversa'
  },
  ro: {
    pageTitle: 'Sarcinile Mele',
    welcome: 'Bine ați venit',
    yourProgress: 'Progresul Dvs',
    dock: 'Doc',
    completed: 'Finalizat',
    timeElapsed: 'Timp scurs',
    minutes: 'min',
    congratulations: 'Felicitări!',
    allTasksCompleted: 'Toate sarcinile sunt finalizate',
    agentWillCome: 'Un agent va veni la dumneavoastră pentru descărcare',
    supportGXO: 'Suport GXO',
    online: 'Online',
    adminTyping: 'Adminul scrie...',
    writeMessage: 'Scrieți mesajul dvs...',
    startConversation: 'Începeți o conversație'
  },
  bg: {
    pageTitle: 'Моите Задачи',
    welcome: 'Добре дошли',
    yourProgress: 'Вашият Напредък',
    dock: 'Док',
    completed: 'Завършено',
    timeElapsed: 'Изминало време',
    minutes: 'мин',
    congratulations: 'Поздравления!',
    allTasksCompleted: 'Всички задачи са завършени',
    agentWillCome: 'Агент ще дойде при вас за разтоварване',
    supportGXO: 'Поддръжка GXO',
    online: 'Онлайн',
    adminTyping: 'Администраторът пише...',
    writeMessage: 'Напишете съобщението си...',
    startConversation: 'Започнете разговор'
  },
  cs: {
    pageTitle: 'Moje Úkoly',
    welcome: 'Vítejte',
    yourProgress: 'Váš Pokrok',
    dock: 'Dok',
    completed: 'Dokončeno',
    timeElapsed: 'Uplynulý čas',
    minutes: 'min',
    congratulations: 'Gratulujeme!',
    allTasksCompleted: 'Všechny úkoly jsou dokončeny',
    agentWillCome: 'Agent k vám přijde na vykládku',
    supportGXO: 'Podpora GXO',
    online: 'Online',
    adminTyping: 'Admin píše...',
    writeMessage: 'Napište svou zprávu...',
    startConversation: 'Zahajte konverzaci'
  },
  da: {
    pageTitle: 'Mine Opgaver',
    welcome: 'Velkommen',
    yourProgress: 'Din Fremskridt',
    dock: 'Kaj',
    completed: 'Afsluttet',
    timeElapsed: 'Forløbet tid',
    minutes: 'min',
    congratulations: 'Tillykke!',
    allTasksCompleted: 'Alle opgaver er afsluttet',
    agentWillCome: 'En agent vil komme til dig for aflæsning',
    supportGXO: 'GXO Support',
    online: 'Online',
    adminTyping: 'Admin skriver...',
    writeMessage: 'Skriv din besked...',
    startConversation: 'Start en samtale'
  },
  fi: {
    pageTitle: 'Omat Tehtäväni',
    welcome: 'Tervetuloa',
    yourProgress: 'Edistymisesi',
    dock: 'Laituri',
    completed: 'Valmis',
    timeElapsed: 'Kulunut aika',
    minutes: 'min',
    congratulations: 'Onnittelut!',
    allTasksCompleted: 'Kaikki tehtävät on suoritettu',
    agentWillCome: 'Agentti tulee luoksesi purkamista varten',
    supportGXO: 'GXO Tuki',
    online: 'Online',
    adminTyping: 'Ylläpitäjä kirjoittaa...',
    writeMessage: 'Kirjoita viestisi...',
    startConversation: 'Aloita keskustelu'
  },
  hr: {
    pageTitle: 'Moji Zadaci',
    welcome: 'Dobrodošli',
    yourProgress: 'Vaš Napredak',
    dock: 'Pristanište',
    completed: 'Završeno',
    timeElapsed: 'Proteklo vrijeme',
    minutes: 'min',
    congratulations: 'Čestitamo!',
    allTasksCompleted: 'Svi zadaci su završeni',
    agentWillCome: 'Agent će doći k vama radi istovar',
    supportGXO: 'GXO Podrška',
    online: 'Online',
    adminTyping: 'Admin piše...',
    writeMessage: 'Napišite svoju poruku...',
    startConversation: 'Započnite razgovor'
  },
  en: {
    pageTitle: 'My Tasks',
    welcome: 'Welcome',
    yourProgress: 'Your Progress',
    dock: 'Dock',
    completed: 'Completed',
    timeElapsed: 'Elapsed time',
    minutes: 'min',
    congratulations: 'Congratulations!',
    allTasksCompleted: 'All tasks are completed',
    agentWillCome: 'An agent will come to you for unloading',
    supportGXO: 'GXO Support',
    online: 'Online',
    adminTyping: 'Admin is typing...',
    writeMessage: 'Write your message...',
    startConversation: 'Start a conversation'
  }
};

export function generateTachesHTML(lang: string, chauffeurId: string): string {
  const t = translations[lang] || translations.fr;
  const langCode = lang || 'fr';
  
  return `<!DOCTYPE html>
<html lang="${langCode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GXO Logistics - ${t.pageTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    .progress-bar { transition: width 0.5s ease-in-out; }
    .fade-in { animation: fadeIn 0.3s ease-in; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  </style>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
  <!-- Header -->
  <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg sticky top-0 z-50">
    <div class="flex items-center justify-between max-w-4xl mx-auto">
      <div class="flex items-center space-x-3">
        <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-8">
        <div>
          <div class="text-xs opacity-90">${t.welcome}</div>
          <div class="font-bold text-lg" id="chauffeur-pseudo">Chauffeur</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div id="langue-indicator" class="bg-white/20 rounded-full px-3 py-2 flex items-center space-x-2">
          <span class="text-2xl">🌐</span>
          <span class="font-bold">${langCode.toUpperCase()}</span>
        </div>
        <button id="btn-chat" class="relative bg-white/20 hover:bg-white/30 rounded-full p-3 transition">
          <i class="fas fa-comments text-xl"></i>
          <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto p-4 pb-24">
    <!-- Progress Card -->
    <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-orange-500">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">${t.yourProgress}</h2>
          <p class="text-gray-600 text-sm">${t.dock} <span id="info-quai" class="font-bold text-orange-600">--</span></p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold text-orange-600" id="progression-percent">0%</div>
          <div class="text-xs text-gray-500">${t.completed}</div>
        </div>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div id="barre-progression" class="progress-bar bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full" style="width: 0%"></div>
      </div>
      <div class="mt-4 flex items-center text-sm text-gray-600">
        <i class="fas fa-clock mr-2"></i>
        <span>${t.timeElapsed}: <span id="temps-ecoule" class="font-bold">0 ${t.minutes}</span></span>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="space-y-4" id="liste-taches">
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    </div>

    <!-- Completion Message -->
    <div id="message-complet" class="hidden bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white">
      <i class="fas fa-check-circle text-6xl mb-4"></i>
      <h3 class="text-3xl font-bold mb-2">${t.congratulations}</h3>
      <p class="text-lg mb-4">${t.allTasksCompleted}</p>
      <p class="text-sm opacity-90">${t.agentWillCome}</p>
    </div>
  </div>

  <!-- Chat Modal -->
  <div id="modal-chat" class="hidden fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
    <div class="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col" style="max-height: 90vh">
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between sm:rounded-t-2xl rounded-t-2xl">
        <div class="flex items-center space-x-3">
          <i class="fas fa-headset text-2xl"></i>
          <div>
            <div class="font-bold text-lg">${t.supportGXO}</div>
            <div class="text-xs opacity-90 flex items-center gap-1">
              <span id="admin-online-indicator" class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span id="admin-online-text">${t.online}</span>
            </div>
          </div>
        </div>
        <button id="btn-fermer-chat" class="hover:bg-white/20 rounded-full p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3" style="max-height: 60vh">
        <div class="text-center text-gray-500 text-sm py-8">
          <i class="fas fa-comments text-4xl mb-2 opacity-30"></i>
          <p>${t.startConversation}</p>
        </div>
      </div>
      <div id="typing-indicator-chauffeur" class="px-4 py-2 bg-gray-100 hidden border-t">
        <div class="flex items-center gap-2 text-gray-600 text-sm">
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
          <span id="typing-indicator-chauffeur-text">${t.adminTyping}</span>
        </div>
      </div>
      <div class="border-t p-4 bg-gray-50 sm:rounded-b-2xl rounded-b-2xl">
        <div class="flex space-x-2">
          <input type="text" id="input-message" placeholder="${t.writeMessage}" class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" oninput="notifierFrappeChauffeur()">
          <button id="btn-envoyer-message" class="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-bold transition-all shadow-md hover:shadow-lg">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script src="/static/chauffeur-taches-static.js"></script>
</body>
</html>`;
}
