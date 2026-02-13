import { getWorkflowTranslation } from '../translations-workflow';

interface Props {
  lang: string;
  chauffeurId: string;
}

export function ChauffeurTachesPage({ lang, chauffeurId }: Props) {
  const t = getWorkflowTranslation(lang);
  
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.tachesTitre} - GXO Logistics</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @keyframes pulse-green {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .pulse-green { animation: pulse-green 2s ease-in-out infinite; }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <!-- Header -->
  <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10">
      <div class="text-white font-bold text-lg">${t.tachesTitre}</div>
      <button id="btn-support" class="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
        <i class="fas fa-life-ring mr-2"></i>
        ${t.support}
      </button>
    </div>
  </div>

  <!-- Conteneur principal -->
  <div class="container mx-auto p-4 max-w-4xl">
    <!-- Section Infos Chauffeur -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] rounded-full flex items-center justify-center">
          <i class="fas fa-user text-white text-2xl"></i>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800" id="chauffeur-nom">${t.chargement}...</h2>
          <p class="text-gray-600" id="chauffeur-entreprise"></p>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">${t.statut}</div>
          <div class="flex items-center gap-2 text-green-600 font-bold">
            <span class="w-3 h-3 bg-green-500 rounded-full pulse-green"></span>
            En ligne
          </div>
        </div>
      </div>
    </div>

    <!-- Section Tâches en cours -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <i class="fas fa-tasks text-[#FF5A1A]"></i>
        ${t.tachesEnCours}
      </h3>
      <div id="taches-container" class="space-y-4">
        <!-- Chargement -->
        <div class="text-center py-8 text-gray-500">
          <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p>${t.chargement}...</p>
        </div>
      </div>
    </div>

    <!-- Section Tâches terminées -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <i class="fas fa-check-circle text-green-600"></i>
        ${t.tachesTerminees}
      </h3>
      <div id="taches-terminees-container" class="space-y-4">
        <div class="text-center py-4 text-gray-500">
          <p>${t.aucuneTache}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Support -->
  <div id="modal-support" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col">
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 rounded-t-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <i class="fas fa-life-ring"></i>
            ${t.support}
          </h3>
          <button id="btn-close-modal" class="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>
      
      <div id="messages-container" class="flex-1 p-4 overflow-y-auto space-y-3 min-h-[300px]">
        <!-- Messages seront affichés ici -->
        <div class="text-center py-8 text-gray-500">
          <i class="fas fa-comments text-4xl mb-3 text-gray-300"></i>
          <p>${t.aucunMessage}</p>
        </div>
      </div>
      
      <div class="p-4 border-t">
        <form id="form-message" class="flex gap-2">
          <input 
            type="text" 
            id="message-input" 
            placeholder="${t.taper}"
            class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none"
          />
          <button 
            type="submit"
            class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="bg-gray-900 text-gray-400 text-center p-4 text-sm mt-6">
    <p>© 2026 GXO Logistics</p>
  </div>

  <script>
    const lang = '${lang}';
    const chauffeurId = '${chauffeurId}';
    const t = ${JSON.stringify(t)};
    let updateInterval;

    // Charger les données du chauffeur
    async function loadChauffeurInfo() {
      try {
        const response = await fetch(\`/api/chauffeurs/\${chauffeurId}\`);
        const data = await response.json();
        
        if (response.ok) {
          document.getElementById('chauffeur-nom').textContent = data.nom;
          document.getElementById('chauffeur-entreprise').textContent = data.entreprise;
        }
      } catch (error) {
        console.error('Erreur chargement chauffeur:', error);
      }
    }

    // Charger les tâches
    async function loadTaches() {
      try {
        const response = await fetch(\`/api/chauffeurs/\${chauffeurId}/taches\`);
        const data = await response.json();
        
        if (response.ok) {
          renderTaches(data.taches_en_cours, data.taches_terminees);
        }
      } catch (error) {
        console.error('Erreur chargement tâches:', error);
      }
    }

    // Afficher les tâches
    function renderTaches(enCours, terminees) {
      const containerEnCours = document.getElementById('taches-container');
      const containerTerminees = document.getElementById('taches-terminees-container');
      
      // Tâches en cours
      if (enCours && enCours.length > 0) {
        containerEnCours.innerHTML = enCours.map(tache => \`
          <div class="border-2 border-blue-200 bg-blue-50 rounded-xl p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h4 class="text-xl font-bold text-gray-800 mb-2">
                  <i class="fas fa-\${tache.type === 'chargement' ? 'arrow-up' : 'arrow-down'} text-blue-600 mr-2"></i>
                  \${tache.type === 'chargement' ? t.chargement : t.dechargement}
                </h4>
                <div class="space-y-2 text-gray-700">
                  <p><i class="fas fa-warehouse mr-2 text-blue-600"></i>\${t.quaiNumero} <strong>\${tache.quai}</strong></p>
                  <p><i class="fas fa-door-open mr-2 text-blue-600"></i>\${t.porte} <strong>\${tache.porte || '-'}</strong></p>
                  <p><i class="fas fa-clock mr-2 text-blue-600"></i>\${t.heureDebut}: <strong>\${tache.heure_debut || '-'}</strong></p>
                </div>
              </div>
              <span class="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">
                \${t.enCours}
              </span>
            </div>
            <button 
              onclick="completerTache(\${tache.id})"
              class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              <i class="fas fa-check-circle mr-2"></i>
              \${t.marquerComplete}
            </button>
          </div>
        \`).join('');
      } else {
        containerEnCours.innerHTML = \`
          <div class="text-center py-8 text-gray-500">
            <i class="fas fa-clipboard-check text-4xl mb-3 text-gray-300"></i>
            <p>\${t.aucuneTache}</p>
          </div>
        \`;
      }
      
      // Tâches terminées
      if (terminees && terminees.length > 0) {
        containerTerminees.innerHTML = terminees.map(tache => \`
          <div class="border-2 border-green-200 bg-green-50 rounded-xl p-6 opacity-75">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="text-lg font-bold text-gray-800 mb-2">
                  <i class="fas fa-\${tache.type === 'chargement' ? 'arrow-up' : 'arrow-down'} text-green-600 mr-2"></i>
                  \${tache.type === 'chargement' ? t.chargement : t.dechargement}
                </h4>
                <div class="space-y-1 text-sm text-gray-600">
                  <p><i class="fas fa-warehouse mr-2"></i>\${t.quaiNumero} \${tache.quai}</p>
                  <p><i class="fas fa-check mr-2"></i>\${t.heureFin}: \${tache.heure_fin || '-'}</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-green-600 text-white font-bold rounded-lg text-sm">
                <i class="fas fa-check mr-1"></i>
                \${t.termine}
              </span>
            </div>
          </div>
        \`).join('');
      } else {
        containerTerminees.innerHTML = \`
          <div class="text-center py-4 text-gray-500">
            <p>\${t.aucuneTache}</p>
          </div>
        \`;
      }
    }

    // Compléter une tâche
    async function completerTache(tacheId) {
      try {
        const response = await fetch(\`/api/taches/\${tacheId}/completer\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          // Recharger les tâches
          await loadTaches();
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }

    // Support / Messages
    const modalSupport = document.getElementById('modal-support');
    const btnSupport = document.getElementById('btn-support');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const formMessage = document.getElementById('form-message');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');

    btnSupport.addEventListener('click', () => {
      modalSupport.classList.remove('hidden');
      loadMessages();
    });

    btnCloseModal.addEventListener('click', () => {
      modalSupport.classList.add('hidden');
    });

    formMessage.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      
      if (message) {
        try {
          const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chauffeur_id: chauffeurId,
              message: message,
              expediteur: 'chauffeur'
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
        const response = await fetch(\`/api/chauffeurs/\${chauffeurId}/messages\`);
        const data = await response.json();
        
        if (response.ok && data.messages && data.messages.length > 0) {
          messagesContainer.innerHTML = data.messages.map(msg => \`
            <div class="flex \${msg.expediteur === 'chauffeur' ? 'justify-end' : 'justify-start'}">
              <div class="\${msg.expediteur === 'chauffeur' ? 'bg-[#FF5A1A] text-white' : 'bg-gray-100 text-gray-800'} rounded-xl px-4 py-3 max-w-[80%]">
                <p>\${msg.message}</p>
                <div class="text-xs mt-1 opacity-75">
                  \${new Date(msg.date_envoi).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}
                  \${msg.expediteur === 'chauffeur' && msg.vu ? \` • <i class="fas fa-check-double"></i>\` : ''}
                </div>
              </div>
            </div>
          \`).join('');
          
          // Scroll vers le bas
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
          messagesContainer.innerHTML = \`
            <div class="text-center py-8 text-gray-500">
              <i class="fas fa-comments text-4xl mb-3 text-gray-300"></i>
              <p>\${t.aucunMessage}</p>
            </div>
          \`;
        }
      } catch (error) {
        console.error('Erreur chargement messages:', error);
      }
    }

    // Initialisation
    loadChauffeurInfo();
    loadTaches();
    
    // Mise à jour automatique toutes les 5 secondes
    updateInterval = setInterval(() => {
      loadTaches();
      if (!modalSupport.classList.contains('hidden')) {
        loadMessages();
      }
    }, 5000);

    // Make completerTache global
    window.completerTache = completerTache;
  </script>
</body>
</html>`;
}
