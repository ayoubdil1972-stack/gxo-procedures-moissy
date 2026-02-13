export function ChauffeurInstructionsPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Header fixe */}
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
        <div class="container mx-auto">
          <div class="flex items-center justify-between mb-2">
            <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10 md:h-12" />
            <div class="text-white font-bold text-base md:text-lg" id="langue-selectionnee"></div>
          </div>
          <div class="text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <i class="fas fa-clipboard-list"></i>
              <span id="titre-instructions">Consignes</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div class="flex-1 flex items-center justify-center p-4 md:p-6">
        <div class="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 md:p-8">
          
          {/* Message de bienvenue */}
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] rounded-full mb-4">
              <i class="fas fa-hand-wave text-white text-3xl"></i>
            </div>
            <h2 id="bienvenue" class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Bonjour</h2>
            <p id="sous-titre" class="text-gray-600 text-lg">Bienvenue sur notre site</p>
          </div>

          {/* Section 1: Consignes de sécurité */}
          <div class="mb-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-shield-alt text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h3 id="titre-securite" class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Consignes de sécurité obligatoires
                </h3>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <i class="fas fa-vest text-red-600 text-xl mt-1"></i>
                    <span id="consigne-epi" class="text-gray-700 text-base md:text-lg leading-relaxed">
                      Le port du <strong>gilet de sécurité</strong> et des <strong>chaussures de sécurité</strong> est <strong class="text-red-600">obligatoire</strong> sur l'ensemble du site.
                    </span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fas fa-smoking-ban text-red-600 text-xl mt-1"></i>
                    <span id="consigne-fumer" class="text-gray-700 text-base md:text-lg leading-relaxed">
                      Il est <strong class="text-red-600">strictement interdit de fumer</strong> sur le site.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: À l'accueil chauffeur */}
          <div class="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-clipboard-check text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h3 id="titre-accueil" class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  À l'accueil chauffeur
                </h3>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <i class="fas fa-pallet text-blue-600 text-xl mt-1"></i>
                    <span id="consigne-palette" class="text-gray-700 text-base md:text-lg leading-relaxed">
                      Indiquez si un <strong>changement de palette</strong> est nécessaire.
                    </span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fas fa-truck-loading text-blue-600 text-xl mt-1"></i>
                    <span id="consigne-hayon" class="text-gray-700 text-base md:text-lg leading-relaxed">
                      Précisez si votre camion est équipé d'un <strong>hayon élévateur</strong>.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Placement à quai */}
          <div class="mb-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-key text-white text-xl"></i>
                </div>
              </div>
              <div class="flex-1">
                <h3 id="titre-quai" class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Placement à quai
                </h3>
                <p id="consigne-clefs" class="text-gray-700 text-base md:text-lg leading-relaxed">
                  Dès que vous êtes <strong>placé à quai</strong>, vous devez <strong class="text-green-600">remettre vos clés</strong> à l'agent de quai.
                </p>
              </div>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div class="border-t-2 border-gray-200 my-8"></div>

          {/* Message important */}
          <div class="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-info-circle text-orange-500 text-2xl"></i>
              <h4 id="titre-important" class="text-lg md:text-xl font-bold text-gray-800">Important</h4>
            </div>
            <p id="message-important" class="text-gray-700 text-base md:text-lg leading-relaxed">
              Le respect de ces consignes est essentiel pour assurer la <strong>sécurité de tous</strong> sur le site.
            </p>
          </div>

          {/* Bouton continuer */}
          <div class="text-center">
            <button 
              id="btn-continuer"
              onclick="handleContinue()"
              class="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <i class="fas fa-check-circle text-2xl"></i>
              <span id="btn-continuer-text">J'ai lu et compris les consignes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Script de gestion */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Récupérer la langue depuis l'URL
          const urlParams = new URLSearchParams(window.location.search);
          const langue = urlParams.get('lang') || 'fr';
          
          // Stocker la langue pour la suite
          sessionStorage.setItem('chauffeur_langue', langue);
          
          // Traductions complètes pour 12 langues
          const translations = {
            fr: {
              header: '🇫🇷 Français',
              titre: 'Consignes',
              bienvenue: 'Bonjour',
              sousTitre: 'Bienvenue sur notre site',
              titreSecurite: 'Consignes de sécurité obligatoires',
              consigneEPI: 'Le port du <strong>gilet de sécurité</strong> et des <strong>chaussures de sécurité</strong> est <strong class="text-red-600">obligatoire</strong> sur l\\'ensemble du site.',
              consigneFumer: 'Il est <strong class="text-red-600">strictement interdit de fumer</strong> sur le site.',
              titreAccueil: 'À l\\'accueil chauffeur',
              consignePalette: 'Indiquez si un <strong>changement de palette</strong> est nécessaire.',
              consigneHayon: 'Précisez si votre camion est équipé d\\'un <strong>hayon élévateur</strong>.',
              titreQuai: 'Placement à quai',
              consigneClefs: 'Dès que vous êtes <strong>placé à quai</strong>, vous devez <strong class="text-green-600">remettre vos clés</strong> à l\\'agent de quai.',
              titreImportant: 'Important',
              messageImportant: 'Le respect de ces consignes est essentiel pour assurer la <strong>sécurité de tous</strong> sur le site.',
              btnContinuer: 'J\\'ai lu et compris les consignes'
            },
            nl: {
              header: '🇳🇱 Nederlands',
              titre: 'Instructies',
              bienvenue: 'Hallo',
              sousTitre: 'Welkom op onze site',
              titreSecurite: 'Verplichte veiligheidsinstructies',
              consigneEPI: 'Het dragen van een <strong>veiligheidsvest</strong> en <strong>veiligheidsschoenen</strong> is <strong class="text-red-600">verplicht</strong> op het hele terrein.',
              consigneFumer: 'Het is <strong class="text-red-600">strikt verboden om te roken</strong> op het terrein.',
              titreAccueil: 'Bij de chauffeursontvangst',
              consignePalette: 'Geef aan of een <strong>palletwissel</strong> noodzakelijk is.',
              consigneHayon: 'Geef aan of uw vrachtwagen is uitgerust met een <strong>laadklep</strong>.',
              titreQuai: 'Plaatsing aan het laadperron',
              consigneClefs: 'Zodra u <strong>aan het perron</strong> bent geplaatst, moet u <strong class="text-green-600">uw sleutels inleveren</strong> bij de perronmedewerker.',
              titreImportant: 'Belangrijk',
              messageImportant: 'Het naleven van deze instructies is essentieel voor de <strong>veiligheid van iedereen</strong> op het terrein.',
              btnContinuer: 'Ik heb de instructies gelezen en begrepen'
            },
            de: {
              header: '🇩🇪 Deutsch',
              titre: 'Anweisungen',
              bienvenue: 'Hallo',
              sousTitre: 'Willkommen auf unserer Website',
              titreSecurite: 'Verpflichtende Sicherheitsanweisungen',
              consigneEPI: 'Das Tragen einer <strong>Sicherheitsweste</strong> und von <strong>Sicherheitsschuhen</strong> ist <strong class="text-red-600">auf dem gesamten Gelände obligatorisch</strong>.',
              consigneFumer: 'Das Rauchen ist <strong class="text-red-600">auf dem Gelände streng verboten</strong>.',
              titreAccueil: 'Am Fahrerempfang',
              consignePalette: 'Geben Sie an, ob ein <strong>Palettenwechsel</strong> erforderlich ist.',
              consigneHayon: 'Geben Sie an, ob Ihr LKW mit einer <strong>Ladebordwand</strong> ausgestattet ist.',
              titreQuai: 'Platzierung am Ladedock',
              consigneClefs: 'Sobald Sie <strong>am Dock</strong> platziert sind, müssen Sie <strong class="text-green-600">Ihre Schlüssel</strong> beim Dock-Mitarbeiter abgeben.',
              titreImportant: 'Wichtig',
              messageImportant: 'Die Einhaltung dieser Anweisungen ist für die <strong>Sicherheit aller</strong> auf dem Gelände unerlässlich.',
              btnContinuer: 'Ich habe die Anweisungen gelesen und verstanden'
            },
            it: {
              header: '🇮🇹 Italiano',
              titre: 'Istruzioni',
              bienvenue: 'Buongiorno',
              sousTitre: 'Benvenuto sul nostro sito',
              titreSecurite: 'Norme di sicurezza obbligatorie',
              consigneEPI: 'L\\'uso del <strong>giubbotto di sicurezza</strong> e delle <strong>scarpe antinfortunistiche</strong> è <strong class="text-red-600">obbligatorio</strong> su tutto il sito.',
              consigneFumer: 'È <strong class="text-red-600">severamente vietato fumare</strong> sul sito.',
              titreAccueil: 'All\\'accoglienza autisti',
              consignePalette: 'Indicare se è necessario un <strong>cambio pallet</strong>.',
              consigneHayon: 'Specificare se il camion è dotato di <strong>sponda idraulica</strong>.',
              titreQuai: 'Posizionamento in banchina',
              consigneClefs: 'Appena siete <strong>posizionati in banchina</strong>, dovete <strong class="text-green-600">consegnare le chiavi</strong> all\\'addetto alla banchina.',
              titreImportant: 'Importante',
              messageImportant: 'Il rispetto di queste istruzioni è essenziale per garantire la <strong>sicurezza di tutti</strong> sul sito.',
              btnContinuer: 'Ho letto e compreso le istruzioni'
            },
            bg: {
              header: '🇧🇬 Български',
              titre: 'Инструкции',
              bienvenue: 'Здравейте',
              sousTitre: 'Добре дошли на нашия сайт',
              titreSecurite: 'Задължителни правила за безопасност',
              consigneEPI: 'Носенето на <strong>предпазна жилетка</strong> и <strong>предпазни обувки</strong> е <strong class="text-red-600">задължително</strong> на целия обект.',
              consigneFumer: '<strong class="text-red-600">Строго е забранено да се пуши</strong> на обекта.',
              titreAccueil: 'На рецепция за шофьори',
              consignePalette: 'Посочете дали е необходима <strong>смяна на палет</strong>.',
              consigneHayon: 'Уточнете дали камионът е оборудван с <strong>хидравличен мост</strong>.',
              titreQuai: 'Поставяне на платформа',
              consigneClefs: 'Веднага след като сте <strong>поставени на платформата</strong>, трябва да <strong class="text-green-600">предадете ключовете си</strong> на служителя на платформата.',
              titreImportant: 'Важно',
              messageImportant: 'Спазването на тези инструкции е от съществено значение за осигуряване на <strong>безопасността на всички</strong> на обекта.',
              btnContinuer: 'Прочетох и разбрах инструкциите'
            },
            cs: {
              header: '🇨🇿 Čeština',
              titre: 'Pokyny',
              bienvenue: 'Dobrý den',
              sousTitre: 'Vítejte na našich stránkách',
              titreSecurite: 'Povinné bezpečnostní pokyny',
              consigneEPI: 'Nošení <strong>bezpečnostní vesty</strong> a <strong>bezpečnostní obuvi</strong> je <strong class="text-red-600">povinné</strong> na celém místě.',
              consigneFumer: 'Je <strong class="text-red-600">přísně zakázáno kouřit</strong> na místě.',
              titreAccueil: 'U řidičské recepce',
              consignePalette: 'Uveďte, zda je nutná <strong>výměna palety</strong>.',
              consigneHayon: 'Upřesněte, zda je váš nákladní vůz vybaven <strong>hydraulickým čelem</strong>.',
              titreQuai: 'Umístění u rampy',
              consigneClefs: 'Jakmile jste <strong>umístěni u rampy</strong>, musíte <strong class="text-green-600">odevzdat klíče</strong> pracovníkovi rampy.',
              titreImportant: 'Důležité',
              messageImportant: 'Dodržování těchto pokynů je nezbytné pro zajištění <strong>bezpečnosti všech</strong> na místě.',
              btnContinuer: 'Přečetl jsem si a pochopil pokyny'
            },
            da: {
              header: '🇩🇰 Dansk',
              titre: 'Instruktioner',
              bienvenue: 'Hej',
              sousTitre: 'Velkommen til vores websted',
              titreSecurite: 'Obligatoriske sikkerhedsinstruktioner',
              consigneEPI: 'Det er <strong class="text-red-600">obligatorisk</strong> at bære <strong>sikkerhedsvest</strong> og <strong>sikkerhedssko</strong> på hele området.',
              consigneFumer: 'Det er <strong class="text-red-600">strengt forbudt at ryge</strong> på området.',
              titreAccueil: 'Ved chauffør-receptionen',
              consignePalette: 'Angiv, om et <strong>palleskift</strong> er nødvendigt.',
              consigneHayon: 'Angiv, om din lastbil er udstyret med en <strong>læssebagsmæk</strong>.',
              titreQuai: 'Placering ved læsserampe',
              consigneClefs: 'Så snart du er <strong>placeret ved rampen</strong>, skal du <strong class="text-green-600">aflevere dine nøgler</strong> til rampemedarbejderen.',
              titreImportant: 'Vigtigt',
              messageImportant: 'Overholdelse af disse instruktioner er afgørende for at sikre <strong>alles sikkerhed</strong> på området.',
              btnContinuer: 'Jeg har læst og forstået instruktionerne'
            },
            fi: {
              header: '🇫🇮 Suomi',
              titre: 'Ohjeet',
              bienvenue: 'Terve',
              sousTitre: 'Tervetuloa sivustollemme',
              titreSecurite: 'Pakolliset turvaohjeet',
              consigneEPI: '<strong>Turvaliivi</strong> ja <strong>turvakengät</strong> ovat <strong class="text-red-600">pakollisia</strong> koko alueella.',
              consigneFumer: '<strong class="text-red-600">Tupakointi on ehdottomasti kielletty</strong> alueella.',
              titreAccueil: 'Kuljettajan vastaanotossa',
              consignePalette: 'Ilmoita, jos <strong>lavavaihto</strong> on tarpeen.',
              consigneHayon: 'Täsmennä, onko kuorma-autossasi <strong>taka-alaslaitaliivi</strong>.',
              titreQuai: 'Sijoitus lastauslaiturille',
              consigneClefs: 'Heti kun sinut on <strong>sijoitettu laiturille</strong>, sinun on <strong class="text-green-600">luovutettava avaimesi</strong> laiturityöntekijälle.',
              titreImportant: 'Tärkeää',
              messageImportant: 'Näiden ohjeiden noudattaminen on välttämätöntä <strong>kaikkien turvallisuuden</strong> varmistamiseksi alueella.',
              btnContinuer: 'Olen lukenut ja ymmärtänyt ohjeet'
            },
            hr: {
              header: '🇭🇷 Hrvatski',
              titre: 'Upute',
              bienvenue: 'Bok',
              sousTitre: 'Dobrodošli na našu stranicu',
              titreSecurite: 'Obvezne sigurnosne upute',
              consigneEPI: 'Nošenje <strong>sigurnosnog prsluka</strong> i <strong>sigurnosne obuće</strong> je <strong class="text-red-600">obvezno</strong> na cijelom prostoru.',
              consigneFumer: '<strong class="text-red-600">Strogo je zabranjeno pušiti</strong> na prostoru.',
              titreAccueil: 'Na recepciji za vozače',
              consignePalette: 'Navedite je li potrebna <strong>zamjena palete</strong>.',
              consigneHayon: 'Navedite je li vaš kamion opremljen <strong>hidrauličnom rampom</strong>.',
              titreQuai: 'Postavljanje na rampu',
              consigneClefs: 'Čim ste <strong>postavljeni na rampu</strong>, morate <strong class="text-green-600">predati ključeve</strong> zaposleniku na rampi.',
              titreImportant: 'Važno',
              messageImportant: 'Poštivanje ovih uputa je bitno za osiguranje <strong>sigurnosti svih</strong> na prostoru.',
              btnContinuer: 'Pročitao sam i razumio upute'
            },
            pl: {
              header: '🇵🇱 Polski',
              titre: 'Instrukcje',
              bienvenue: 'Dzień dobry',
              sousTitre: 'Witamy na naszej stronie',
              titreSecurite: 'Obowiązkowe instrukcje bezpieczeństwa',
              consigneEPI: 'Noszenie <strong>kamizelki odblaskowej</strong> i <strong>obuwia ochronnego</strong> jest <strong class="text-red-600">obowiązkowe</strong> na całym terenie.',
              consigneFumer: '<strong class="text-red-600">Palenie jest surowo zabronione</strong> na terenie.',
              titreAccueil: 'W recepcji kierowców',
              consignePalette: 'Wskaż, czy konieczna jest <strong>wymiana palety</strong>.',
              consigneHayon: 'Określ, czy ciężarówka jest wyposażona w <strong>windę załadunkową</strong>.',
              titreQuai: 'Ustawienie przy rampie',
              consigneClefs: 'Jak tylko zostaniesz <strong>ustawiony przy rampie</strong>, musisz <strong class="text-green-600">oddać klucze</strong> pracownikowi rampy.',
              titreImportant: 'Ważne',
              messageImportant: 'Przestrzeganie tych instrukcji jest niezbędne dla zapewnienia <strong>bezpieczeństwa wszystkich</strong> na terenie.',
              btnContinuer: 'Przeczytałem i zrozumiałem instrukcje'
            },
            pt: {
              header: '🇵🇹 Português',
              titre: 'Instruções',
              bienvenue: 'Olá',
              sousTitre: 'Bem-vindo ao nosso site',
              titreSecurite: 'Instruções de segurança obrigatórias',
              consigneEPI: 'O uso de <strong>colete de segurança</strong> e <strong>calçado de segurança</strong> é <strong class="text-red-600">obrigatório</strong> em todo o local.',
              consigneFumer: 'É <strong class="text-red-600">estritamente proibido fumar</strong> no local.',
              titreAccueil: 'Na receção de motoristas',
              consignePalette: 'Indique se é necessária uma <strong>troca de palete</strong>.',
              consigneHayon: 'Especifique se o seu camião está equipado com <strong>plataforma elevatória</strong>.',
              titreQuai: 'Colocação no cais',
              consigneClefs: 'Assim que estiver <strong>colocado no cais</strong>, deve <strong class="text-green-600">entregar as suas chaves</strong> ao agente do cais.',
              titreImportant: 'Importante',
              messageImportant: 'O cumprimento destas instruções é essencial para garantir a <strong>segurança de todos</strong> no local.',
              btnContinuer: 'Li e compreendi as instruções'
            },
            ro: {
              header: '🇷🇴 Română',
              titre: 'Instrucțiuni',
              bienvenue: 'Bună ziua',
              sousTitre: 'Bun venit pe site-ul nostru',
              titreSecurite: 'Instrucțiuni de securitate obligatorii',
              consigneEPI: 'Purtarea <strong>vestei reflectorizante</strong> și a <strong>încălțămintei de protecție</strong> este <strong class="text-red-600">obligatorie</strong> pe tot amplasamentul.',
              consigneFumer: 'Este <strong class="text-red-600">strict interzis să fumați</strong> pe amplasament.',
              titreAccueil: 'La recepția șoferilor',
              consignePalette: 'Indicați dacă este necesară o <strong>schimbare de paleți</strong>.',
              consigneHayon: 'Precizați dacă camionul este echipat cu <strong>platformă hidraulică</strong>.',
              titreQuai: 'Plasarea la rampa de încărcare',
              consigneClefs: 'Imediat ce sunteți <strong>plasat la rampă</strong>, trebuie să <strong class="text-green-600">predați cheile</strong> agentului de la rampă.',
              titreImportant: 'Important',
              messageImportant: 'Respectarea acestor instrucțiuni este esențială pentru asigurarea <strong>securității tuturor</strong> pe amplasament.',
              btnContinuer: 'Am citit și am înțeles instrucțiunile'
            }
          };
          
          // Appliquer les traductions
          const t = translations[langue] || translations.fr;
          
          document.getElementById('langue-selectionnee').textContent = t.header;
          document.getElementById('titre-instructions').textContent = t.titre;
          document.getElementById('bienvenue').textContent = t.bienvenue;
          document.getElementById('sous-titre').textContent = t.sousTitre;
          document.getElementById('titre-securite').textContent = t.titreSecurite;
          document.getElementById('consigne-epi').innerHTML = t.consigneEPI;
          document.getElementById('consigne-fumer').innerHTML = t.consigneFumer;
          document.getElementById('titre-accueil').textContent = t.titreAccueil;
          document.getElementById('consigne-palette').innerHTML = t.consignePalette;
          document.getElementById('consigne-hayon').innerHTML = t.consigneHayon;
          document.getElementById('titre-quai').textContent = t.titreQuai;
          document.getElementById('consigne-clefs').innerHTML = t.consigneClefs;
          document.getElementById('titre-important').textContent = t.titreImportant;
          document.getElementById('message-important').innerHTML = t.messageImportant;
          document.getElementById('btn-continuer-text').textContent = t.btnContinuer;
          
          // Fonction pour gérer le clic sur "Continuer"
          window.handleContinue = function() {
            // Marquer les instructions comme lues
            sessionStorage.setItem('instructions_lues', 'true');
            
            // Vérifier si le chauffeur est déjà inscrit
            const chauffeurId = sessionStorage.getItem('chauffeur_id');
            
            if (chauffeurId) {
              // Chauffeur déjà inscrit → Rediriger vers ses tâches
              console.log('✅ Chauffeur inscrit, redirection vers tâches:', chauffeurId);
              window.location.href = '/chauffeur/taches?id=' + chauffeurId;
            } else {
              // Nouveau chauffeur → Rediriger vers l'inscription
              console.log('✅ Nouveau chauffeur, redirection vers inscription');
              window.location.href = '/chauffeur/inscription';
            }
          };
          
          console.log('✅ Page consignes chargée - Langue:', langue);
        `
      }} />
    </div>
  )
}
