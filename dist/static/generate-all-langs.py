#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Traductions complètes pour toutes les langues
translations = {
    'bg': {'lang_code': 'bg', 'lang_attr': 'bg', 'lang_flag': '🇧🇬', 'lang_name': 'Български', 'title': 'Моите Задачи', 'support': 'GXO Поддръжка', 'tasks_title': 'Моите Задачи', 'driver': 'Шофьор', 'company': 'Компания', 'dock': 'Платформа', 'progress': 'Напредък', 'of_5': '% завършени от 5', 'congrats_title': '🎉 Поздравления!', 'congrats_msg': 'Всички задачи са завършени. Благодарим за професионализма!', 'chat_title': 'GXO Поддръжка', 'no_messages': 'Все още няма съобщения', 'placeholder': 'Напишете съобщението си...', 'send': 'Изпрати'},
    'cs': {'lang_code': 'cs', 'lang_attr': 'cs', 'lang_flag': '🇨🇿', 'lang_name': 'Čeština', 'title': 'Mé Úkoly', 'support': 'GXO Podpora', 'tasks_title': 'Mé Úkoly', 'driver': 'Řidič', 'company': 'Společnost', 'dock': 'Rampa', 'progress': 'Pokrok', 'of_5': '% dokončeno z 5', 'congrats_title': '🎉 Gratulujeme!', 'congrats_msg': 'Všechny úkoly jsou dokončeny. Děkujeme za vaši profesionalitu!', 'chat_title': 'GXO Podpora', 'no_messages': 'Zatím žádné zprávy', 'placeholder': 'Napište svou zprávu...', 'send': 'Odeslat'},
    'da': {'lang_code': 'da', 'lang_attr': 'da', 'lang_flag': '🇩🇰', 'lang_name': 'Dansk', 'title': 'Mine Opgaver', 'support': 'GXO Support', 'tasks_title': 'Mine Opgaver', 'driver': 'Chauffør', 'company': 'Firma', 'dock': 'Kaj', 'progress': 'Fremskridt', 'of_5': '% fuldført af 5', 'congrats_title': '🎉 Tillykke!', 'congrats_msg': 'Alle opgaver er fuldført. Tak for din professionalisme!', 'chat_title': 'GXO Support', 'no_messages': 'Ingen beskeder endnu', 'placeholder': 'Skriv din besked...', 'send': 'Send'},
    'fi': {'lang_code': 'fi', 'lang_attr': 'fi', 'lang_flag': '🇫🇮', 'lang_name': 'Suomi', 'title': 'Tehtäväni', 'support': 'GXO Tuki', 'tasks_title': 'Tehtäväni', 'driver': 'Kuljettaja', 'company': 'Yritys', 'dock': 'Laituri', 'progress': 'Edistyminen', 'of_5': '% valmistunut 5:stä', 'congrats_title': '🎉 Onnittelut!', 'congrats_msg': 'Kaikki tehtävät on suoritettu. Kiitos ammattimaisuudestasi!', 'chat_title': 'GXO Tuki', 'no_messages': 'Ei vielä viestejä', 'placeholder': 'Kirjoita viestisi...', 'send': 'Lähetä'},
    'hr': {'lang_code': 'hr', 'lang_attr': 'hr', 'lang_flag': '🇭🇷', 'lang_name': 'Hrvatski', 'title': 'Moji Zadaci', 'support': 'GXO Podrška', 'tasks_title': 'Moji Zadaci', 'driver': 'Vozač', 'company': 'Tvrtka', 'dock': 'Riva', 'progress': 'Napredak', 'of_5': '% dovršeno od 5', 'congrats_title': '🎉 Čestitamo!', 'congrats_msg': 'Svi zadaci su dovršeni. Hvala na vašoj profesionalnosti!', 'chat_title': 'GXO Podrška', 'no_messages': 'Još nema poruka', 'placeholder': 'Upišite svoju poruku...', 'send': 'Pošalji'},
    'pl': {'lang_code': 'pl', 'lang_attr': 'pl', 'lang_flag': '🇵🇱', 'lang_name': 'Polski', 'title': 'Moje Zadania', 'support': 'Wsparcie GXO', 'tasks_title': 'Moje Zadania', 'driver': 'Kierowca', 'company': 'Firma', 'dock': 'Dok', 'progress': 'Postęp', 'of_5': '% ukończono z 5', 'congrats_title': '🎉 Gratulacje!', 'congrats_msg': 'Wszystkie zadania są ukończone. Dziękujemy za profesjonalizm!', 'chat_title': 'Wsparcie GXO', 'no_messages': 'Brak wiadomości', 'placeholder': 'Wpisz swoją wiadomość...', 'send': 'Wyślij'},
    'pt': {'lang_code': 'pt', 'lang_attr': 'pt', 'lang_flag': '🇵🇹', 'lang_name': 'Português', 'title': 'Minhas Tarefas', 'support': 'Suporte GXO', 'tasks_title': 'Minhas Tarefas', 'driver': 'Motorista', 'company': 'Empresa', 'dock': 'Cais', 'progress': 'Progresso', 'of_5': '% concluídas de 5', 'congrats_title': '🎉 Parabéns!', 'congrats_msg': 'Todas as tarefas estão concluídas. Obrigado pelo profissionalismo!', 'chat_title': 'Suporte GXO', 'no_messages': 'Nenhuma mensagem ainda', 'placeholder': 'Digite sua mensagem...', 'send': 'Enviar'},
    'ro': {'lang_code': 'ro', 'lang_attr': 'ro', 'lang_flag': '🇷🇴', 'lang_name': 'Română', 'title': 'Sarcinile Mele', 'support': 'Suport GXO', 'tasks_title': 'Sarcinile Mele', 'driver': 'Șofer', 'company': 'Companie', 'dock': 'Chei', 'progress': 'Progres', 'of_5': '% finalizate din 5', 'congrats_title': '🎉 Felicitări!', 'congrats_msg': 'Toate sarcinile sunt finalizate. Vă mulțumim pentru profesionalism!', 'chat_title': 'Suport GXO', 'no_messages': 'Niciun mesaj deocamdată', 'placeholder': 'Tastați mesajul dumneavoastră...', 'send': 'Trimite'},
    'en': {'lang_code': 'en', 'lang_attr': 'en', 'lang_flag': '🇬🇧', 'lang_name': 'English', 'title': 'My Tasks', 'support': 'GXO Support', 'tasks_title': 'My Tasks', 'driver': 'Driver', 'company': 'Company', 'dock': 'Dock', 'progress': 'Progress', 'of_5': '% completed out of 5', 'congrats_title': '🎉 Congratulations!', 'congrats_msg': 'All tasks are completed. Thank you for your professionalism!', 'chat_title': 'GXO Support', 'no_messages': 'No messages yet', 'placeholder': 'Type your message...', 'send': 'Send'}
}

template = '''<!DOCTYPE html>
<html lang="{lang_attr}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GXO Logistics - {title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>.progress-bar {{ transition: width 0.5s ease-in-out; }}</style>
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
  <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
    <div class="container mx-auto">
      <div class="flex items-center justify-between mb-2">
        <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10 md:h-12">
        <button id="btn-support" class="relative bg-white text-[#FF5A1A] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
          <i class="fas fa-comments"></i><span>{support}</span>
          <span id="badge-messages" class="hidden absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">0</span>
        </button>
      </div>
      <div class="text-center">
        <h1 class="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
          <i class="fas fa-tasks"></i><span>{tasks_title}</span>
        </h1>
      </div>
    </div>
  </div>
  <div class="flex-1 p-4 md:p-6">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div><h2 class="text-2xl font-bold text-gray-800" id="chauffeur-pseudo">{driver}</h2>
          <p class="text-gray-600" id="chauffeur-entreprise">{company}</p></div>
          <div class="text-right"><div class="text-sm text-gray-500">{dock}</div>
          <div class="text-3xl font-bold text-[#FF5A1A]" id="chauffeur-quai">--</div></div>
        </div>
        <div class="mb-2">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">{progress}</span>
            <span class="font-bold text-[#FF5A1A]"><span id="progression-percent">0</span>{of_5}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div id="barre-progression" class="progress-bar bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] h-full rounded-full" style="width: 0%"></div>
          </div>
        </div>
      </div>
      <div id="liste-taches" class="space-y-4">
        <div class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
      <div id="message-complet" class="hidden mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-center text-white">
        <i class="fas fa-trophy text-6xl mb-4"></i>
        <h3 class="text-2xl font-bold mb-2">{congrats_title}</h3>
        <p class="text-lg">{congrats_msg}</p>
      </div>
    </div>
  </div>
  <div id="modal-chat" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 rounded-t-xl flex items-center justify-between">
        <h3 class="text-xl font-bold text-white flex items-center gap-2"><i class="fas fa-comments"></i>{chat_title}</h3>
        <button id="btn-fermer-chat" class="text-white hover:text-gray-200 transition-colors"><i class="fas fa-times text-2xl"></i></button>
      </div>
      <div id="messages-container" class="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3" style="max-height: 400px;">
        <p class="text-center text-gray-500 text-sm">{no_messages}</p>
      </div>
      <div class="p-4 bg-white border-t">
        <form id="form-message" class="flex gap-2">
          <input type="text" id="input-message" placeholder="{placeholder}" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A1A]" required>
          <button type="submit" class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
            <i class="fas fa-paper-plane mr-2"></i>{send}
          </button>
        </form>
      </div>
    </div>
  </div>
  <script src="/static/chauffeur-taches-static.js"></script>
</body>
</html>'''

for lang, data in translations.items():
    content = template.format(**data)
    filename = f'taches/{lang}.html'
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'✓ Créé {filename}')

print(f'\n✅ {len(translations)} fichiers HTML créés avec succès!')
