#!/usr/bin/env python3
# -*- coding: utf-8 -*-

translations_data = {
    'fr': {'tasks': {'task_epi_porte': {'titre': 'EPI Porté', 'description': 'Gilet et chaussures de sécurité obligatoires'}, 'task_placement_quai': {'titre': 'Placement à Quai', 'description': 'Véhicule correctement positionné'}, 'task_palette_change': {'titre': 'Échange de Palettes', 'description': 'Palette changée si nécessaire'}, 'task_accueil_notifie': {'titre': 'Accueil Notifié', 'description': 'Informations transmises à l\'accueil'}, 'task_clefs_remises': {'titre': 'Clés Remises', 'description': 'Clés confiées à l\'agent de quai'}}, 'buttons': {'validate': 'Valider', 'validated': 'Validé', 'send': 'Envoyer', 'close': 'Fermer'}, 'chat': {'title': 'Support GXO', 'placeholder': 'Tapez votre message...', 'noMessages': 'Aucun message pour le moment', 'you': 'Vous', 'admin': 'Support'}},
    'it': {'tasks': {'task_epi_porte': {'titre': 'DPI Indossati', 'description': 'Giubbotto e scarpe di sicurezza obbligatori'}, 'task_placement_quai': {'titre': 'Posizionamento alla Banchina', 'description': 'Veicolo correttamente posizionato'}, 'task_palette_change': {'titre': 'Scambio di Pallet', 'description': 'Pallet scambiato se necessario'}, 'task_accueil_notifie': {'titre': 'Accoglienza Notificata', 'description': 'Informazioni trasmesse alla reception'}, 'task_clefs_remises': {'titre': 'Chiavi Consegnate', 'description': 'Chiavi affidate all\'agente della banchina'}}, 'buttons': {'validate': 'Convalida', 'validated': 'Convalidato', 'send': 'Invia', 'close': 'Chiudi'}, 'chat': {'title': 'Supporto GXO', 'placeholder': 'Scrivi il tuo messaggio...', 'noMessages': 'Nessun messaggio per ora', 'you': 'Tu', 'admin': 'Supporto'}},
    'nl': {'tasks': {'task_epi_porte': {'titre': 'PBM Gedragen', 'description': 'Vest en veiligheidsschoenen verplicht'}, 'task_placement_quai': {'titre': 'Plaatsing aan Kade', 'description': 'Voertuig correct gepositioneerd'}, 'task_palette_change': {'titre': 'Palletuitwisseling', 'description': 'Pallet gewisseld indien nodig'}, 'task_accueil_notifie': {'titre': 'Receptie Gemeld', 'description': 'Informatie doorgegeven aan receptie'}, 'task_clefs_remises': {'titre': 'Sleutels Ingeleverd', 'description': 'Sleutels toevertrouwd aan kadeagent'}}, 'buttons': {'validate': 'Valideren', 'validated': 'Gevalideerd', 'send': 'Verzenden', 'close': 'Sluiten'}, 'chat': {'title': 'GXO Ondersteuning', 'placeholder': 'Typ uw bericht...', 'noMessages': 'Nog geen berichten', 'you': 'U', 'admin': 'Ondersteuning'}},
    'de': {'tasks': {'task_epi_porte': {'titre': 'PSA Getragen', 'description': 'Weste und Sicherheitsschuhe obligatorisch'}, 'task_placement_quai': {'titre': 'Positionierung am Dock', 'description': 'Fahrzeug korrekt positioniert'}, 'task_palette_change': {'titre': 'Palettentausch', 'description': 'Palette bei Bedarf getauscht'}, 'task_accueil_notifie': {'titre': 'Empfang Benachrichtigt', 'description': 'Informationen an Empfang übermittelt'}, 'task_clefs_remises': {'titre': 'Schlüssel Übergeben', 'description': 'Schlüssel an Dock-Mitarbeiter übergeben'}}, 'buttons': {'validate': 'Bestätigen', 'validated': 'Bestätigt', 'send': 'Senden', 'close': 'Schließen'}, 'chat': {'title': 'GXO Support', 'placeholder': 'Geben Sie Ihre Nachricht ein...', 'noMessages': 'Noch keine Nachrichten', 'you': 'Sie', 'admin': 'Support'}},
    'bg': {'tasks': {'task_epi_porte': {'titre': 'Носени ЛПС', 'description': 'Жилетка и защитни обувки задължителни'}, 'task_placement_quai': {'titre': 'Поставяне на Платформа', 'description': 'Превозно средство правилно позиционирано'}, 'task_palette_change': {'titre': 'Смяна на Палети', 'description': 'Палет сменен при необходимост'}, 'task_accueil_notifie': {'titre': 'Рецепция Уведомена', 'description': 'Информация предадена на рецепция'}, 'task_clefs_remises': {'titre': 'Ключове Предадени', 'description': 'Ключове предадени на служител на платформата'}}, 'buttons': {'validate': 'Потвърди', 'validated': 'Потвърдено', 'send': 'Изпрати', 'close': 'Затвори'}, 'chat': {'title': 'GXO Поддръжка', 'placeholder': 'Напишете съобщението си...', 'noMessages': 'Все още няма съобщения', 'you': 'Вие', 'admin': 'Поддръжка'}},
    'cs': {'tasks': {'task_epi_porte': {'titre': 'OOPP Nasazené', 'description': 'Vesta a bezpečnostní obuv povinné'}, 'task_placement_quai': {'titre': 'Umístění u Rampy', 'description': 'Vozidlo správně umístěno'}, 'task_palette_change': {'titre': 'Výměna Palet', 'description': 'Paleta vyměněna v případě potřeby'}, 'task_accueil_notifie': {'titre': 'Recepce Informována', 'description': 'Informace předány recepci'}, 'task_clefs_remises': {'titre': 'Klíče Odevzdány', 'description': 'Klíče svěřeny pracovníkovi rampy'}}, 'buttons': {'validate': 'Potvrdit', 'validated': 'Potvrzeno', 'send': 'Odeslat', 'close': 'Zavřít'}, 'chat': {'title': 'GXO Podpora', 'placeholder': 'Napište svou zprávu...', 'noMessages': 'Zatím žádné zprávy', 'you': 'Vy', 'admin': 'Podpora'}},
    'da': {'tasks': {'task_epi_porte': {'titre': 'PPE Båret', 'description': 'Vest og sikkerhedssko obligatorisk'}, 'task_placement_quai': {'titre': 'Placering ved Kaj', 'description': 'Køretøj korrekt placeret'}, 'task_palette_change': {'titre': 'Palleudveksling', 'description': 'Palle udskiftet om nødvendigt'}, 'task_accueil_notifie': {'titre': 'Reception Underrettet', 'description': 'Information overført til reception'}, 'task_clefs_remises': {'titre': 'Nøgler Afleveret', 'description': 'Nøgler betroet til kajagent'}}, 'buttons': {'validate': 'Validere', 'validated': 'Valideret', 'send': 'Send', 'close': 'Luk'}, 'chat': {'title': 'GXO Support', 'placeholder': 'Skriv din besked...', 'noMessages': 'Ingen beskeder endnu', 'you': 'Du', 'admin': 'Support'}},
    'fi': {'tasks': {'task_epi_porte': {'titre': 'HVV Puettu', 'description': 'Liivi ja turvakengät pakollisia'}, 'task_placement_quai': {'titre': 'Sijoitus Laiturille', 'description': 'Ajoneuvo oikein sijoitettu'}, 'task_palette_change': {'titre': 'Lavasiirto', 'description': 'Lava vaihdettu tarvittaessa'}, 'task_accueil_notifie': {'titre': 'Vastaanotto Ilmoitettu', 'description': 'Tiedot välitetty vastaanotolle'}, 'task_clefs_remises': {'titre': 'Avaimet Luovutettu', 'description': 'Avaimet uskottu laituriagentille'}}, 'buttons': {'validate': 'Vahvista', 'validated': 'Vahvistettu', 'send': 'Lähetä', 'close': 'Sulje'}, 'chat': {'title': 'GXO Tuki', 'placeholder': 'Kirjoita viestisi...', 'noMessages': 'Ei vielä viestejä', 'you': 'Sinä', 'admin': 'Tuki'}},
    'hr': {'tasks': {'task_epi_porte': {'titre': 'OZO Nošeno', 'description': 'Prsluk i zaštitne cipele obavezni'}, 'task_placement_quai': {'titre': 'Postavljanje na Rivu', 'description': 'Vozilo pravilno pozicionirano'}, 'task_palette_change': {'titre': 'Zamjena Paleta', 'description': 'Paleta zamijenjena ako je potrebno'}, 'task_accueil_notifie': {'titre': 'Recepcija Obaviještena', 'description': 'Informacije proslijeđene recepciji'}, 'task_clefs_remises': {'titre': 'Ključevi Predani', 'description': 'Ključevi povjereni agentu rive'}}, 'buttons': {'validate': 'Potvrditi', 'validated': 'Potvrđeno', 'send': 'Pošalji', 'close': 'Zatvori'}, 'chat': {'title': 'GXO Podrška', 'placeholder': 'Upišite svoju poruku...', 'noMessages': 'Još nema poruka', 'you': 'Vi', 'admin': 'Podrška'}},
    'pl': {'tasks': {'task_epi_porte': {'titre': 'ŚOI Noszony', 'description': 'Kamizelka i obuwie ochronne obowiązkowe'}, 'task_placement_quai': {'titre': 'Ustawienie przy Doku', 'description': 'Pojazd prawidłowo ustawiony'}, 'task_palette_change': {'titre': 'Wymiana Palet', 'description': 'Paleta wymieniona w razie potrzeby'}, 'task_accueil_notifie': {'titre': 'Recepcja Powiadomiona', 'description': 'Informacje przekazane recepcji'}, 'task_clefs_remises': {'titre': 'Klucze Oddane', 'description': 'Klucze powierzone agentowi doku'}}, 'buttons': {'validate': 'Zatwierdź', 'validated': 'Zatwierdzone', 'send': 'Wyślij', 'close': 'Zamknij'}, 'chat': {'title': 'Wsparcie GXO', 'placeholder': 'Wpisz swoją wiadomość...', 'noMessages': 'Brak wiadomości', 'you': 'Ty', 'admin': 'Wsparcie'}},
    'pt': {'tasks': {'task_epi_porte': {'titre': 'EPI Usado', 'description': 'Colete e sapatos de segurança obrigatórios'}, 'task_placement_quai': {'titre': 'Posicionamento no Cais', 'description': 'Veículo corretamente posicionado'}, 'task_palette_change': {'titre': 'Troca de Paletes', 'description': 'Palete trocada se necessário'}, 'task_accueil_notifie': {'titre': 'Recepção Notificada', 'description': 'Informações transmitidas à recepção'}, 'task_clefs_remises': {'titre': 'Chaves Entregues', 'description': 'Chaves confiadas ao agente do cais'}}, 'buttons': {'validate': 'Validar', 'validated': 'Validado', 'send': 'Enviar', 'close': 'Fechar'}, 'chat': {'title': 'Suporte GXO', 'placeholder': 'Digite sua mensagem...', 'noMessages': 'Nenhuma mensagem ainda', 'you': 'Você', 'admin': 'Suporte'}},
    'ro': {'tasks': {'task_epi_porte': {'titre': 'EIP Purtat', 'description': 'Vestă și încălțăminte de protecție obligatorii'}, 'task_placement_quai': {'titre': 'Poziționare la Chei', 'description': 'Vehicul corect poziționat'}, 'task_palette_change': {'titre': 'Schimb de Paleți', 'description': 'Palet schimbat dacă este necesar'}, 'task_accueil_notifie': {'titre': 'Recepție Notificată', 'description': 'Informații transmise la recepție'}, 'task_clefs_remises': {'titre': 'Chei Predate', 'description': 'Chei încredințate agentului de chei'}}, 'buttons': {'validate': 'Validează', 'validated': 'Validat', 'send': 'Trimite', 'close': 'Închide'}, 'chat': {'title': 'Suport GXO', 'placeholder': 'Tastați mesajul dumneavoastră...', 'noMessages': 'Niciun mesaj deocamdată', 'you': 'Dumneavoastră', 'admin': 'Suport'}},
    'en': {'tasks': {'task_epi_porte': {'titre': 'PPE Worn', 'description': 'Vest and safety shoes mandatory'}, 'task_placement_quai': {'titre': 'Dock Placement', 'description': 'Vehicle correctly positioned'}, 'task_palette_change': {'titre': 'Pallet Exchange', 'description': 'Pallet changed if necessary'}, 'task_accueil_notifie': {'titre': 'Reception Notified', 'description': 'Information transmitted to reception'}, 'task_clefs_remises': {'titre': 'Keys Handed Over', 'description': 'Keys entrusted to dock agent'}}, 'buttons': {'validate': 'Validate', 'validated': 'Validated', 'send': 'Send', 'close': 'Close'}, 'chat': {'title': 'GXO Support', 'placeholder': 'Type your message...', 'noMessages': 'No messages yet', 'you': 'You', 'admin': 'Support'}}
}

import json
js_obj = json.dumps(translations_data, ensure_ascii=False, indent=2)

with open('chauffeur-taches-static.js', 'w', encoding='utf-8') as f:
    f.write(f'''// Script universel pour la page des tâches chauffeur (HTML statique)
const taskTranslations = {js_obj};

// Récupérer ID chauffeur et langue depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const chauffeurId = urlParams.get('id');
const lang = urlParams.get('lang') || 'fr';

if (!chauffeurId) {{
  window.location.href = '/chauffeur/langue';
}}

const t = taskTranslations[lang] || taskTranslations['fr'];

// Configuration des 5 tâches
const TACHES = [
  {{ id: 'task_epi_porte', titre: t.tasks.task_epi_porte.titre, description: t.tasks.task_epi_porte.description, icon: 'vest', couleur: 'blue' }},
  {{ id: 'task_placement_quai', titre: t.tasks.task_placement_quai.titre, description: t.tasks.task_placement_quai.description, icon: 'truck-loading', couleur: 'purple' }},
  {{ id: 'task_palette_change', titre: t.tasks.task_palette_change.titre, description: t.tasks.task_palette_change.description, icon: 'pallet', couleur: 'yellow' }},
  {{ id: 'task_accueil_notifie', titre: t.tasks.task_accueil_notifie.titre, description: t.tasks.task_accueil_notifie.description, icon: 'bell', couleur: 'green' }},
  {{ id: 'task_clefs_remises', titre: t.tasks.task_clefs_remises.titre, description: t.tasks.task_clefs_remises.description, icon: 'key', couleur: 'red' }}
];

let chauffeurData = null;
let updateInterval = null;

// Charger données chauffeur
async function loadChauffeurInfo() {{
  try {{
    const response = await fetch(`/api/chauffeur/progression?id=${{chauffeurId}}`);
    const data = await response.json();
    
    if (response.ok && data.success) {{
      chauffeurData = data;
      document.getElementById('chauffeur-pseudo').textContent = data.pseudo || 'Chauffeur';
      document.getElementById('chauffeur-entreprise').textContent = data.entreprise || '';
      document.getElementById('chauffeur-quai').textContent = data.numero_quai || '--';
      
      const progression = calculerProgression(data);
      document.getElementById('progression-percent').textContent = progression;
      document.getElementById('barre-progression').style.width = progression + '%';
      
      renderTaches(data);
      
      if (progression === 100) {{
        document.getElementById('message-complet').classList.remove('hidden');
      }}
    }}
  }} catch (error) {{
    console.error('Erreur chargement chauffeur:', error);
  }}
}}

// Calculer progression
function calculerProgression(data) {{
  let completed = 0;
  TACHES.forEach(tache => {{
    if (data[tache.id] === 1 || data[tache.id] === true) {{
      completed++;
    }}
  }});
  return Math.round((completed / TACHES.length) * 100);
}}

// Afficher tâches
function renderTaches(data) {{
  const container = document.getElementById('liste-taches');
  
  container.innerHTML = TACHES.map(tache => {{
    const isCompleted = data[tache.id] === 1 || data[tache.id] === true;
    const couleurClass = {{
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-yellow-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600'
    }}[tache.couleur];
    
    const borderClass = {{
      blue: 'border-blue-200',
      purple: 'border-purple-200',
      yellow: 'border-yellow-200',
      green: 'border-green-200',
      red: 'border-red-200'
    }}[tache.couleur];
    
    return `
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 ${{borderClass}}">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 flex-1">
            <div class="w-16 h-16 bg-gradient-to-br ${{couleurClass}} rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-${{tache.icon}} text-white text-2xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-1">${{tache.titre}}</h3>
              <p class="text-gray-600 text-sm">${{tache.description}}</p>
            </div>
          </div>
          ${{isCompleted ? 
            `<div class="bg-green-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
              <i class="fas fa-check-circle"></i>
              ${{t.buttons.validated}}
            </div>` :
            `<button onclick="validerTache('${{tache.id}}')" class="bg-gradient-to-r ${{couleurClass}} text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2">
              <i class="fas fa-check"></i>
              ${{t.buttons.validate}}
            </button>`
          }}
        </div>
      </div>
    `;
  }}).join('');
}}

// Valider tâche
async function validerTache(tacheId) {{
  try {{
    const response = await fetch('/api/chauffeur/valider-tache', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({{ chauffeur_id: parseInt(chauffeurId), task_id: tacheId }})
    }});
    
    if (response.ok) {{
      loadChauffeurInfo();
    }}
  }} catch (error) {{
    console.error('Erreur validation:', error);
  }}
}}

// Chat Support
document.getElementById('btn-support').addEventListener('click', () => {{
  document.getElementById('modal-chat').classList.remove('hidden');
  loadMessages();
}});

document.getElementById('btn-fermer-chat').addEventListener('click', () => {{
  document.getElementById('modal-chat').classList.add('hidden');
}});

document.getElementById('form-message').addEventListener('submit', async (e) => {{
  e.preventDefault();
  const input = document.getElementById('input-message');
  const message = input.value.trim();
  
  if (!message) return;
  
  try {{
    await fetch('/api/chauffeur/chat/send', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({{ chauffeur_id: parseInt(chauffeurId), message, lang }})
    }});
    input.value = '';
    loadMessages();
  }} catch (error) {{
    console.error('Erreur envoi message:', error);
  }}
}});

// Charger messages
async function loadMessages() {{
  try {{
    const response = await fetch(`/api/chauffeur/chat?chauffeur_id=${{chauffeurId}}&lang=${{lang}}`);
    const data = await response.json();
    
    if (response.ok && data.messages) {{
      const container = document.getElementById('messages-container');
      const unreadCount = data.messages.filter(m => m.auteur === 'admin' && m.lu === 0).length;
      
      const badge = document.getElementById('badge-messages');
      if (unreadCount > 0) {{
        badge.textContent = unreadCount;
        badge.classList.remove('hidden');
      }} else {{
        badge.classList.add('hidden');
      }}
      
      container.innerHTML = data.messages.map(m => {{
        const isAdmin = m.auteur === 'admin';
        return `
          <div class="flex ${{isAdmin ? 'justify-start' : 'justify-end'}}">
            <div class="${{isAdmin ? 'bg-gray-200 text-gray-800' : 'bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white'}} px-4 py-2 rounded-lg max-w-xs">
              <div class="text-xs ${{isAdmin ? 'text-gray-500' : 'text-white opacity-75'}} mb-1">${{isAdmin ? t.chat.admin : t.chat.you}}</div>
              <div>${{m.texte}}</div>
            </div>
          </div>
        `;
      }}).join('');
      
      container.scrollTop = container.scrollHeight;
      
      if (unreadCount > 0) {{
        await fetch('/api/chauffeur/chat/mark-read', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify({{ chauffeur_id: parseInt(chauffeurId) }})
        }});
      }}
    }}
  }} catch (error) {{
    console.error('Erreur chargement messages:', error);
  }}
}}

// Heartbeat
async function sendHeartbeat() {{
  try {{
    await fetch('/api/chat/heartbeat', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({{ chauffeur_id: parseInt(chauffeurId), page_url: window.location.href }})
    }});
  }} catch (error) {{
    console.error('Erreur heartbeat:', error);
  }}
}}

// Démarrage
loadChauffeurInfo();
sendHeartbeat();

setInterval(loadChauffeurInfo, 5000);
setInterval(sendHeartbeat, 5000);

// Auto-refresh chat si modal ouvert
setInterval(() => {{
  if (!document.getElementById('modal-chat').classList.contains('hidden')) {{
    loadMessages();
  }}
}}, 2000);
''')

print('✅ Fichier JS créé avec toutes les traductions!')
