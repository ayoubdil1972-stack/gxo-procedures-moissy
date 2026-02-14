export const SIMPLE_TASKS_HTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GXO - Driver Tasks</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    .progress-bar { transition: width 0.5s ease-in-out; }
    .task-card { 
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .task-card:hover { 
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .task-completed {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    .task-pending {
      background: white;
      border: 2px solid #e5e7eb;
    }
    .checkbox-animation {
      animation: checkPulse 0.3s ease-in-out;
    }
    @keyframes checkPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
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
          <div class="text-xs opacity-90">👋</div>
          <div class="font-bold text-lg" id="chauffeur-pseudo">Driver #<span id="driver-id">--</span></div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="bg-white/20 rounded-full px-3 py-2 flex items-center space-x-2">
          <span class="text-xl">📍</span>
          <span class="font-bold" id="dock-number">--</span>
        </div>
        <button id="btn-chat" class="relative bg-white/20 hover:bg-white/30 rounded-full p-3 transition">
          <i class="fas fa-comments text-xl"></i>
          <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Progress Bar -->
  <div class="max-w-4xl mx-auto p-4">
    <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-orange-500">
      <div class="flex items-center justify-between mb-4">
        <div class="text-center flex-1">
          <div class="text-5xl mb-2">⏱️</div>
          <div class="text-sm text-gray-600" id="time-elapsed">0 min</div>
        </div>
        <div class="text-center flex-1">
          <div class="text-6xl font-bold text-orange-600" id="progress-percent">0%</div>
          <div class="text-xs text-gray-500">Progress</div>
        </div>
        <div class="text-center flex-1">
          <div class="text-5xl mb-2">✅</div>
          <div class="text-sm font-bold text-gray-800"><span id="tasks-completed">0</span>/5</div>
        </div>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div id="progress-bar" class="progress-bar bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full" style="width: 0%"></div>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="space-y-4" id="tasks-list">
      <!-- Task 1: Safety Equipment -->
      <div class="task-card task-pending rounded-2xl shadow-lg p-6 flex items-center justify-between" data-task="epi">
        <div class="flex items-center space-x-4">
          <div class="text-5xl">🦺</div>
          <div class="text-4xl">👷</div>
          <div class="text-4xl">👟</div>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="task-checkbox w-8 h-8 rounded-lg border-3 border-orange-500 cursor-pointer" data-task="epi">
        </div>
      </div>

      <!-- Task 2: Dock Placement -->
      <div class="task-card task-pending rounded-2xl shadow-lg p-6 flex items-center justify-between" data-task="dock">
        <div class="flex items-center space-x-4">
          <div class="text-5xl">🚛</div>
          <div class="text-4xl">➡️</div>
          <div class="text-4xl">🏭</div>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="task-checkbox w-8 h-8 rounded-lg border-3 border-orange-500 cursor-pointer" data-task="dock">
        </div>
      </div>

      <!-- Task 3: Pallet Exchange -->
      <div class="task-card task-pending rounded-2xl shadow-lg p-6 flex items-center justify-between" data-task="pallet">
        <div class="flex items-center space-x-4">
          <div class="text-5xl">📦</div>
          <div class="text-4xl">🔄</div>
          <div class="text-4xl">✅</div>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="task-checkbox w-8 h-8 rounded-lg border-3 border-orange-500 cursor-pointer" data-task="pallet">
        </div>
      </div>

      <!-- Task 4: Reception Notification -->
      <div class="task-card task-pending rounded-2xl shadow-lg p-6 flex items-center justify-between" data-task="reception">
        <div class="flex items-center space-x-4">
          <div class="text-5xl">👤</div>
          <div class="text-4xl">📢</div>
          <div class="text-4xl">✅</div>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="task-checkbox w-8 h-8 rounded-lg border-3 border-orange-500 cursor-pointer" data-task="reception">
        </div>
      </div>

      <!-- Task 5: Keys Delivery -->
      <div class="task-card task-pending rounded-2xl shadow-lg p-6 flex items-center justify-between" data-task="keys">
        <div class="flex items-center space-x-4">
          <div class="text-5xl">🔑</div>
          <div class="text-4xl">➡️</div>
          <div class="text-4xl">👤</div>
        </div>
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="task-checkbox w-8 h-8 rounded-lg border-3 border-orange-500 cursor-pointer" data-task="keys">
        </div>
      </div>
    </div>

    <!-- Completion Message -->
    <div id="completion-message" class="hidden bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white mt-6 fade-in">
      <div class="text-8xl mb-4">🎉</div>
      <div class="text-6xl mb-4">✅</div>
      <div class="text-4xl font-bold mb-4">100%</div>
      <div class="text-5xl">👍</div>
    </div>
  </div>

  <!-- Chat Modal -->
  <div id="chat-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
    <div class="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col" style="max-height: 90vh">
      <!-- Chat Header -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between sm:rounded-t-2xl rounded-t-2xl">
        <div class="flex items-center space-x-3">
          <i class="fas fa-headset text-2xl"></i>
          <div>
            <div class="font-bold text-lg">💬 Support</div>
            <div class="text-xs opacity-90 flex items-center gap-1">
              <span id="admin-online-indicator" class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span id="admin-online-text">Online</span>
            </div>
          </div>
        </div>
        <button id="btn-close-chat" class="hover:bg-white/20 rounded-full p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Chat Messages -->
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3" style="max-height: 60vh">
        <div class="text-center text-gray-500 text-sm py-8">
          <i class="fas fa-comments text-4xl mb-2 opacity-30"></i>
          <p>💬</p>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div id="typing-indicator" class="px-4 py-2 bg-gray-100 hidden border-t">
        <div class="flex items-center gap-2 text-gray-600 text-sm">
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
          <span>✍️</span>
        </div>
      </div>

      <!-- Message Input -->
      <div class="border-t p-4 bg-gray-50 sm:rounded-b-2xl rounded-b-2xl">
        <div class="flex space-x-2">
          <input type="text" id="message-input" placeholder="💬..." class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" oninput="notifyTyping()">
          <button id="btn-send-message" class="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-bold transition-all shadow-md hover:shadow-lg">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Get driver ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const driverId = urlParams.get('id') || 'XX';
    document.getElementById('driver-id').textContent = driverId;

    // Tasks state
    const tasksState = {
      epi: false,
      dock: false,
      pallet: false,
      reception: false,
      keys: false
    };

    let startTime = Date.now();
    let lastHeartbeat = Date.now();

    // Load state from API
    async function loadDriverState() {
      try {
        const response = await fetch(\`/api/chauffeur/progression?id=\${driverId}\`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.chauffeur) {
            document.getElementById('chauffeur-pseudo').innerHTML = \`Driver #<span id="driver-id">\${driverId}</span>\`;
            document.getElementById('dock-number').textContent = data.chauffeur.numero_quai || '--';
            
            // Update tasks
            if (data.chauffeur.task_epi_porte) tasksState.epi = true;
            if (data.chauffeur.task_placement_quai) tasksState.dock = true;
            if (data.chauffeur.task_palette_change) tasksState.pallet = true;
            if (data.chauffeur.task_accueil_notifie) tasksState.reception = true;
            if (data.chauffeur.task_clefs_remises) tasksState.keys = true;
            
            updateUI();
          }
        }
      } catch (error) {
        console.error('Error loading state:', error);
      }
    }

    // Update progress
    function updateUI() {
      const completed = Object.values(tasksState).filter(v => v).length;
      const progress = (completed / 5) * 100;
      
      document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
      document.getElementById('progress-bar').style.width = progress + '%';
      document.getElementById('tasks-completed').textContent = completed;
      
      // Update checkboxes and cards
      Object.keys(tasksState).forEach(task => {
        const checkbox = document.querySelector(\`input[data-task="\${task}"]\`);
        const card = document.querySelector(\`.task-card[data-task="\${task}"]\`);
        
        if (checkbox) checkbox.checked = tasksState[task];
        if (card) {
          if (tasksState[task]) {
            card.classList.remove('task-pending');
            card.classList.add('task-completed');
          } else {
            card.classList.remove('task-completed');
            card.classList.add('task-pending');
          }
        }
      });
      
      // Show completion message
      if (completed === 5) {
        document.getElementById('completion-message').classList.remove('hidden');
      } else {
        document.getElementById('completion-message').classList.add('hidden');
      }
    }

    // Save task to API
    async function saveTask(taskName, value) {
      const taskMap = {
        epi: 'task_epi_porte',
        dock: 'task_placement_quai',
        pallet: 'task_palette_change',
        reception: 'task_accueil_notifie',
        keys: 'task_clefs_remises'
      };
      
      try {
        await fetch('/api/chauffeur/taches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chauffeur_id: driverId,
            task_name: taskMap[taskName],
            completed: value
          })
        });
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }

    // Handle checkbox changes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const task = e.target.dataset.task;
        tasksState[task] = e.target.checked;
        
        // Animation
        e.target.classList.add('checkbox-animation');
        setTimeout(() => e.target.classList.remove('checkbox-animation'), 300);
        
        updateUI();
        saveTask(task, e.target.checked);
      });
    });

    // Time elapsed
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 60000);
      document.getElementById('time-elapsed').textContent = elapsed + ' min';
    }, 1000);

    // Chat functionality
    const chatModal = document.getElementById('chat-modal');
    const btnChat = document.getElementById('btn-chat');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const messageInput = document.getElementById('message-input');
    const btnSendMessage = document.getElementById('btn-send-message');
    const chatMessages = document.getElementById('chat-messages');
    let lastMessageId = 0;

    btnChat.addEventListener('click', () => {
      chatModal.classList.remove('hidden');
      loadMessages();
    });

    btnCloseChat.addEventListener('click', () => {
      chatModal.classList.add('hidden');
    });

    // Send message
    async function sendMessage() {
      const message = messageInput.value.trim();
      if (!message) return;

      try {
        await fetch('/api/chauffeur/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chauffeur_id: driverId,
            message: message
          })
        });
        
        messageInput.value = '';
        loadMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

    btnSendMessage.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    // Load messages
    async function loadMessages() {
      try {
        const response = await fetch(\`/api/chauffeur/chat?id=\${driverId}&viewer=chauffeur&since_id=\${lastMessageId}\`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.messages.length > 0) {
            data.messages.forEach(msg => {
              if (msg.id > lastMessageId) {
                addMessageToUI(msg);
                lastMessageId = msg.id;
              }
            });
            updateUnreadBadge(data.unread_count);
          }
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }

    function addMessageToUI(msg) {
      const messageDiv = document.createElement('div');
      messageDiv.className = \`flex \${msg.sender === 'chauffeur' ? 'justify-end' : 'justify-start'}\`;
      
      messageDiv.innerHTML = \`
        <div class="\${msg.sender === 'chauffeur' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl px-4 py-2 max-w-xs">
          <div class="text-sm">\${msg.message}</div>
          <div class="text-xs opacity-70 mt-1">\${new Date(msg.created_at).toLocaleTimeString()}</div>
        </div>
      \`;
      
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateUnreadBadge(count) {
      const badge = document.getElementById('chat-badge');
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Notify typing
    function notifyTyping() {
      fetch('/api/chat/typing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chauffeur_id: driverId,
          sender: 'chauffeur'
        })
      });
    }

    // Heartbeat
    async function sendHeartbeat() {
      try {
        await fetch('/api/chat/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chauffeur_id: driverId
          })
        });
        lastHeartbeat = Date.now();
      } catch (error) {
        console.error('Heartbeat error:', error);
      }
    }

    // Auto-refresh
    setInterval(() => {
      loadDriverState();
      if (!chatModal.classList.contains('hidden')) {
        loadMessages();
      }
    }, 5000);

    setInterval(sendHeartbeat, 5000);

    // Initial load
    loadDriverState();
    sendHeartbeat();
  </script>
</body>
</html>
`;
