const fs = require('fs');
const path = require('path');

// Import traductions depuis le fichier TypeScript
const translationsData = `{
  "fr": {"header":"🇫🇷 Français","titre":"Consignes","bienvenue":"Bonjour","sousTitre":"Bienvenue sur notre site","titreSecurite":"Consignes de sécurité obligatoires","consigneEPI":"Le port du <strong>gilet</strong> et des <strong>chaussures de sécurité</strong> est <strong class='text-red-600'>obligatoire sur tout le site</strong>.","consigneFumer":"Il est <strong class='text-red-600'>strictement interdit de fumer</strong> sur le site.","titreAccueil":"À l'accueil chauffeur","consignePalette":"Indiquer si un <strong>changement de palette</strong> est nécessaire.","consigneHayon":"Indiquer si votre camion dispose d'un <strong>hayon élévateur</strong>.","titreQuai":"Placement à quai","consigneClefs":"Dès que vous êtes <strong>placé à quai</strong>, vous devez <strong class='text-green-600'>remettre vos clés</strong> à l'agent de quai.","titreImportant":"Important","messageImportant":"Le respect de ces consignes est essentiel pour la <strong>sécurité de tous</strong> sur le site.","btnContinuer":"J'ai lu et compris les consignes"},
  "nl": {"header":"🇳🇱 Nederlands","titre":"Voorschriften","bienvenue":"Hallo","sousTitre":"Welkom op onze site","titreSecurite":"Verplichte veiligheidsvoorschriften","consigneEPI":"Het dragen van een <strong>veiligheidsvest</strong> en <strong>veiligheidsschoenen</strong> is <strong class='text-red-600'>verplicht op het hele terrein</strong>.","consigneFumer":"Het is <strong class='text-red-600'>strikt verboden te roken</strong> op het terrein.","titreAccueil":"Bij de chauffeurs receptie","consignePalette":"Aangeven of een <strong>palletwissel</strong> nodig is.","consigneHayon":"Aangeven of uw vrachtwagen een <strong>laadklep</strong> heeft.","titreQuai":"Positie aan het dok","consigneClefs":"Zodra u <strong>aan het dok staat</strong>, moet u <strong class='text-green-600'>uw sleutels inleveren</strong> bij de dok-agent.","titreImportant":"Belangrijk","messageImportant":"Het naleven van deze voorschriften is essentieel voor de <strong>veiligheid van iedereen</strong> op het terrein.","btnContinuer":"Ik heb de instructies gelezen en begrepen"},
  "de": {"header":"🇩🇪 Deutsch","titre":"Anweisungen","bienvenue":"Hallo","sousTitre":"Willkommen auf unserer Website","titreSecurite":"Verpflichtende Sicherheitsanweisungen","consigneEPI":"Das Tragen einer <strong>Sicherheitsweste</strong> und von <strong>Sicherheitsschuhen</strong> ist <strong class='text-red-600'>auf dem gesamten Gelände obligatorisch</strong>.","consigneFumer":"Das Rauchen ist <strong class='text-red-600'>auf dem Gelände streng verboten</strong>.","titreAccueil":"Am Fahrerempfang","consignePalette":"Geben Sie an, ob ein <strong>Palettenwechsel</strong> erforderlich ist.","consigneHayon":"Geben Sie an, ob Ihr LKW mit einer <strong>Ladebordwand</strong> ausgestattet ist.","titreQuai":"Platzierung am Ladedock","consigneClefs":"Sobald Sie <strong>am Dock</strong> platziert sind, müssen Sie <strong class='text-green-600'>Ihre Schlüssel</strong> beim Dock-Mitarbeiter abgeben.","titreImportant":"Wichtig","messageImportant":"Die Einhaltung dieser Anweisungen ist für die <strong>Sicherheit aller</strong> auf dem Gelände unerlässlich.","btnContinuer":"Ich habe die Anweisungen gelesen und verstanden"},
  "it": {"header":"🇮🇹 Italiano","titre":"Istruzioni","bienvenue":"Ciao","sousTitre":"Benvenuto sul nostro sito","titreSecurite":"Istruzioni di sicurezza obbligatorie","consigneEPI":"Indossare <strong>giubbotto</strong> e <strong>scarpe di sicurezza</strong> è <strong class='text-red-600'>obbligatorio in tutto il sito</strong>.","consigneFumer":"È <strong class='text-red-600'>severamente vietato fumare</strong> sul sito.","titreAccueil":"All'accoglienza autisti","consignePalette":"Indicare se è necessario un <strong>cambio di pallet</strong>.","consigneHayon":"Indicare se il camion dispone di <strong>sponda montacarichi</strong>.","titreQuai":"Posizionamento alla banchina","consigneClefs":"Non appena siete <strong>posizionati alla banchina</strong>, dovete <strong class='text-green-600'>consegnare le chiavi</strong> all'agente della banchina.","titreImportant":"Importante","messageImportant":"Il rispetto di queste istruzioni è essenziale per la <strong>sicurezza di tutti</strong> sul sito.","btnContinuer":"Ho letto e compreso le istruzioni"},
  "bg": {"header":"🇧🇬 Български","titre":"Инструкции","bienvenue":"Здравей","sousTitre":"Добре дошли на нашия сайт","titreSecurite":"Задължителни инструкции за безопасност","consigneEPI":"Носенето на <strong>светлоотразителна жилетка</strong> и <strong>защитни обувки</strong> е <strong class='text-red-600'>задължително на целия обект</strong>.","consigneFumer":"<strong class='text-red-600'>Строго забранено е пушенето</strong> на обекта.","titreAccueil":"На рецепция за шофьори","consignePalette":"Посочете дали е необходима <strong>смяна на палет</strong>.","consigneHayon":"Посочете дали вашият камион разполага с <strong>хидравлична рампа</strong>.","titreQuai":"Поставяне на платформата","consigneClefs":"Веднага щом бъдете <strong>поставени на платформата</strong>, трябва да <strong class='text-green-600'>предадете ключовете си</strong> на служителя на платформата.","titreImportant":"Важно","messageImportant":"Спазването на тези инструкции е от съществено значение за <strong>безопасността на всички</strong> на обекта.","btnContinuer":"Прочетох и разбрах инструкциите"},
  "cs": {"header":"🇨🇿 Čeština","titre":"Pokyny","bienvenue":"Ahoj","sousTitre":"Vítejte na našich stránkách","titreSecurite":"Povinné bezpečnostní pokyny","consigneEPI":"Nošení <strong>reflexní vesty</strong> a <strong>bezpečnostní obuvi</strong> je <strong class='text-red-600'>povinné na celém místě</strong>.","consigneFumer":"<strong class='text-red-600'>Přísně zakázáno kouřit</strong> na místě.","titreAccueil":"Na recepci řidičů","consignePalette":"Uveďte, zda je nutná <strong>výměna palety</strong>.","consigneHayon":"Uveďte, zda má váš nákladní automobil <strong>čelní nakladač</strong>.","titreQuai":"Umístění u rampy","consigneClefs":"Jakmile budete <strong>umístěni u rampy</strong>, musíte <strong class='text-green-600'>odevzdat klíče</strong> pracovníkovi rampy.","titreImportant":"Důležité","messageImportant":"Dodržování těchto pokynů je nezbytné pro <strong>bezpečnost všech</strong> na místě.","btnContinuer":"Přečetl jsem a porozuměl jsem pokynům"},
  "da": {"header":"🇩🇰 Dansk","titre":"Instruktioner","bienvenue":"Hej","sousTitre":"Velkommen til vores hjemmeside","titreSecurite":"Obligatoriske sikkerhedsinstruktioner","consigneEPI":"Brug af <strong>sikkerhedsvest</strong> og <strong>sikkerhedssko</strong> er <strong class='text-red-600'>obligatorisk på hele området</strong>.","consigneFumer":"Det er <strong class='text-red-600'>strengt forbudt at ryge</strong> på området.","titreAccueil":"Ved chaufførreceptionen","consignePalette":"Angiv om en <strong>palleudskiftning</strong> er nødvendig.","consigneHayon":"Angiv om din lastbil har en <strong>læssebro</strong>.","titreQuai":"Placering ved kajen","consigneClefs":"Så snart du er <strong>placeret ved kajen</strong>, skal du <strong class='text-green-600'>aflevere dine nøgler</strong> til kaimedarbejderen.","titreImportant":"Vigtigt","messageImportant":"Overholdelse af disse instruktioner er essentiel for <strong>alles sikkerhed</strong> på området.","btnContinuer":"Jeg har læst og forstået instruktionerne"},
  "fi": {"header":"🇫🇮 Suomi","titre":"Ohjeet","bienvenue":"Hei","sousTitre":"Tervetuloa sivustomme","titreSecurite":"Pakolliset turvallisuusohjeet","consigneEPI":"<strong>Turvaliivin</strong> ja <strong>turvakenkien</strong> käyttö on <strong class='text-red-600'>pakollista koko alueella</strong>.","consigneFumer":"<strong class='text-red-600'>Tupakointi on ehdottomasti kielletty</strong> alueella.","titreAccueil":"Kuljettajan vastaanotossa","consignePalette":"Ilmoita, onko <strong>lavanvaihto</strong> tarpeen.","consigneHayon":"Ilmoita, onko kuorma-autossasi <strong>nosturi</strong>.","titreQuai":"Sijoittaminen laiturille","consigneClefs":"Heti kun olet <strong>sijoitettu laiturille</strong>, sinun on <strong class='text-green-600'>luovutettava avaimesi</strong> laiturin työntekijälle.","titreImportant":"Tärkeää","messageImportant":"Näiden ohjeiden noudattaminen on välttämätöntä <strong>kaikkien turvallisuudelle</strong> alueella.","btnContinuer":"Olen lukenut ja ymmärtänyt ohjeet"},
  "hr": {"header":"🇭🇷 Hrvatski","titre":"Upute","bienvenue":"Bok","sousTitre":"Dobrodošli na našu stranicu","titreSecurite":"Obvezne sigurnosne upute","consigneEPI":"Nošenje <strong>sigurnosnog prsluka</strong> i <strong>sigurnosne obuće</strong> je <strong class='text-red-600'>obvezno na cijelom području</strong>.","consigneFumer":"<strong class='text-red-600'>Strogo je zabranjeno pušenje</strong> na području.","titreAccueil":"Na recepciji vozača","consignePalette":"Navedite je li potrebna <strong>zamjena palete</strong>.","consigneHayon":"Navedite ima li vaš kamion <strong>dizalicu</strong>.","titreQuai":"Smještaj na gatanje","consigneClefs":"Čim budete <strong>smješteni na gatanje</strong>, morate <strong class='text-green-600'>predati ključeve</strong> agentu gatanja.","titreImportant":"Važno","messageImportant":"Poštivanje ovih uputa je bitno za <strong>sigurnost svih</strong> na području.","btnContinuer":"Pročitao sam i razumio upute"},
  "pl": {"header":"🇵🇱 Polski","titre":"Instrukcje","bienvenue":"Cześć","sousTitre":"Witamy na naszej stronie","titreSecurite":"Obowiązkowe instrukcje bezpieczeństwa","consigneEPI":"Noszenie <strong>kamizelki odblaskowej</strong> i <strong>obuwia ochronnego</strong> jest <strong class='text-red-600'>obowiązkowe na całym terenie</strong>.","consigneFumer":"<strong class='text-red-600'>Palenie jest surowo zabronione</strong> na terenie.","titreAccueil":"W recepcji kierowców","consignePalette":"Wskaż, czy konieczna jest <strong>wymiana palety</strong>.","consigneHayon":"Wskaż, czy Twoja ciężarówka ma <strong>windę załadunkową</strong>.","titreQuai":"Ustawienie przy rampie","consigneClefs":"Jak tylko zostaniesz <strong>ustawiony przy rampie</strong>, musisz <strong class='text-green-600'>oddać klucze</strong> pracownikowi rampy.","titreImportant":"Ważne","messageImportant":"Przestrzeganie tych instrukcji jest niezbędne dla <strong>bezpieczeństwa wszystkich</strong> na terenie.","btnContinuer":"Przeczytałem i zrozumiałem instrukcje"},
  "pt": {"header":"🇵🇹 Português","titre":"Instruções","bienvenue":"Olá","sousTitre":"Bem-vindo ao nosso site","titreSecurite":"Instruções de segurança obrigatórias","consigneEPI":"O uso de <strong>colete</strong> e <strong>calçado de segurança</strong> é <strong class='text-red-600'>obrigatório em todo o local</strong>.","consigneFumer":"É <strong class='text-red-600'>estritamente proibido fumar</strong> no local.","titreAccueil":"Na recepção de motoristas","consignePalette":"Indicar se é necessária a <strong>troca de paletes</strong>.","consigneHayon":"Indicar se o seu caminhão possui <strong>elevador traseiro</strong>.","titreQuai":"Colocação no cais","consigneClefs":"Assim que estiver <strong>colocado no cais</strong>, deve <strong class='text-green-600'>entregar as chaves</strong> ao agente do cais.","titreImportant":"Importante","messageImportant":"O respeito por estas instruções é essencial para a <strong>segurança de todos</strong> no local.","btnContinuer":"Li e compreendi as instruções"},
  "ro": {"header":"🇷🇴 Română","titre":"Instrucțiuni","bienvenue":"Bună","sousTitre":"Bine ați venit pe site-ul nostru","titreSecurite":"Instrucțiuni de siguranță obligatorii","consigneEPI":"Purtarea <strong>vestei</strong> și a <strong>încălțămintei de siguranță</strong> este <strong class='text-red-600'>obligatorie pe tot situl</strong>.","consigneFumer":"Este <strong class='text-red-600'>strict interzis să fumați</strong> pe sit.","titreAccueil":"La recepția șoferilor","consignePalette":"Indicați dacă este necesară o <strong>schimbare de paleți</strong>.","consigneHayon":"Indicați dacă camionul dvs. are un <strong>elevator de ridicare</strong>.","titreQuai":"Plasarea la cheu","consigneClefs":"De îndată ce sunteți <strong>plasat la cheu</strong>, trebuie să <strong class='text-green-600'>predați cheile</strong> agentului de cheu.","titreImportant":"Important","messageImportant":"Respectarea acestor instrucțiuni este esențială pentru <strong>siguranța tuturor</strong> pe sit.","btnContinuer":"Am citit și înțeles instrucțiunile"}
}`;

const translations = JSON.parse(translationsData);

function generateHTML(lang, t) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GXO Logistics - ${t.titre}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <!-- Header fixe -->
    <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
        <div class="container mx-auto">
            <div class="flex items-center justify-between mb-2">
                <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10 md:h-12" />
                <div class="text-white font-bold text-base md:text-lg">${t.header}</div>
            </div>
            <div class="text-center">
                <h1 class="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
                    <i class="fas fa-clipboard-list"></i>
                    <span>${t.titre}</span>
                </h1>
            </div>
        </div>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 flex items-center justify-center p-4 md:p-6">
        <div class="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 md:p-8">
            
            <!-- Message de bienvenue -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] rounded-full mb-4">
                    <i class="fas fa-hand-wave text-white text-3xl"></i>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">${t.bienvenue}</h2>
                <p class="text-gray-600 text-lg">${t.sousTitre}</p>
            </div>

            <!-- Section 1: Consignes de sécurité -->
            <div class="mb-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-shield-alt text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">${t.titreSecurite}</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3">
                                <i class="fas fa-vest text-red-600 text-xl mt-1"></i>
                                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneEPI}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-smoking-ban text-red-600 text-xl mt-1"></i>
                                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneFumer}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Section 2: À l'accueil chauffeur -->
            <div class="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-clipboard-check text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">${t.titreAccueil}</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3">
                                <i class="fas fa-pallet text-blue-600 text-xl mt-1"></i>
                                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consignePalette}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-truck-loading text-blue-600 text-xl mt-1"></i>
                                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneHayon}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Section 3: Placement à quai -->
            <div class="mb-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-key text-white text-xl"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">${t.titreQuai}</h3>
                        <p class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneClefs}</p>
                    </div>
                </div>
            </div>

            <!-- Ligne de séparation -->
            <div class="border-t-2 border-gray-200 my-8"></div>

            <!-- Message important -->
            <div class="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mb-8">
                <div class="flex items-center gap-3 mb-3">
                    <i class="fas fa-info-circle text-orange-500 text-2xl"></i>
                    <h4 class="text-lg md:text-xl font-bold text-gray-800">${t.titreImportant}</h4>
                </div>
                <p class="text-gray-700 text-base md:text-lg leading-relaxed">${t.messageImportant}</p>
            </div>

            <!-- Bouton continuer -->
            <div class="text-center">
                <a 
                    href="/chauffeur/inscription"
                    onclick="sessionStorage.setItem('chauffeur_langue', '${lang}'); sessionStorage.setItem('instructions_lues', 'true');"
                    class="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
                >
                    <i class="fas fa-check-circle text-2xl"></i>
                    <span>${t.btnContinuer}</span>
                </a>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// Générer les 12 pages HTML statiques
const outputDir = path.join(__dirname, 'public', 'chauffeur');

for (const [lang, t] of Object.entries(translations)) {
  const html = generateHTML(lang, t);
  const filename = path.join(outputDir, `consignes-${lang}.html`);
  fs.writeFileSync(filename, html, 'utf-8');
  console.log(`✅ Généré: ${filename}`);
}

console.log('\n✨ Génération terminée! 12 fichiers HTML créés dans public/chauffeur/');
