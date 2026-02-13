import { getTranslation } from '../translations-data'

export function ChauffeurConsignesPage({ lang }: { lang: string }) {
  const t = getTranslation(lang);
  
  return (
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GXO Logistics - {t.titre}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
        {/* Header fixe */}
        <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
          <div class="container mx-auto">
            <div class="flex items-center justify-between mb-2">
              <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10 md:h-12" />
              <div class="text-white font-bold text-base md:text-lg">{t.header}</div>
            </div>
            <div class="text-center">
              <h1 class="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
                <i class="fas fa-clipboard-list"></i>
                <span>{t.titre}</span>
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
              <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t.bienvenue}</h2>
              <p class="text-gray-600 text-lg">{t.sousTitre}</p>
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
                  <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">{t.titreSecurite}</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <i class="fas fa-vest text-red-600 text-xl mt-1"></i>
                      <span class="text-gray-700 text-base md:text-lg leading-relaxed">
                        {lang === 'fr' && <>Le port du <strong class="text-red-600">gilet</strong> et des <strong class="text-red-600">chaussures de sécurité</strong> est <strong class="text-red-600">obligatoire sur tout le site</strong>.</>}
                        {lang === 'nl' && <>Het dragen van een <strong class="text-red-600">veiligheidsvest</strong> en <strong class="text-red-600">veiligheidsschoenen</strong> is <strong class="text-red-600">verplicht op het hele terrein</strong>.</>}
                        {lang === 'de' && <>Das Tragen einer <strong class="text-red-600">Sicherheitsweste</strong> und von <strong class="text-red-600">Sicherheitsschuhen</strong> ist <strong class="text-red-600">auf dem gesamten Gelände obligatorisch</strong>.</>}
                        {lang === 'it' && <>Indossare <strong class="text-red-600">giubbotto</strong> e <strong class="text-red-600">scarpe di sicurezza</strong> è <strong class="text-red-600">obbligatorio in tutto il sito</strong>.</>}
                        {lang === 'bg' && <>Носенето на <strong class="text-red-600">светлоотразителна жилетка</strong> и <strong class="text-red-600">защитни обувки</strong> е <strong class="text-red-600">задължително на целия обект</strong>.</>}
                        {lang === 'cs' && <>Nošení <strong class="text-red-600">reflexní vesty</strong> a <strong class="text-red-600">bezpečnostní obuvi</strong> je <strong class="text-red-600">povinné na celém místě</strong>.</>}
                        {lang === 'da' && <>Brug af <strong class="text-red-600">sikkerhedsvest</strong> og <strong class="text-red-600">sikkerhedssko</strong> er <strong class="text-red-600">obligatorisk på hele området</strong>.</>}
                        {lang === 'fi' && <><strong class="text-red-600">Turvaliivin</strong> ja <strong class="text-red-600">turvakenkien</strong> käyttö on <strong class="text-red-600">pakollista koko alueella</strong>.</>}
                        {lang === 'hr' && <>Nošenje <strong class="text-red-600">sigurnosnog prsluka</strong> i <strong class="text-red-600">sigurnosne obuće</strong> je <strong class="text-red-600">obvezno na cijelom području</strong>.</>}
                        {lang === 'pl' && <>Noszenie <strong class="text-red-600">kamizelki odblaskowej</strong> i <strong class="text-red-600">obuwia ochronnego</strong> jest <strong class="text-red-600">obowiązkowe na całym terenie</strong>.</>}
                        {lang === 'pt' && <>O uso de <strong class="text-red-600">colete</strong> e <strong class="text-red-600">calçado de segurança</strong> é <strong class="text-red-600">obrigatório em todo o local</strong>.</>}
                        {lang === 'ro' && <>Purtarea <strong class="text-red-600">vestei</strong> și a <strong class="text-red-600">încălțămintei de siguranță</strong> este <strong class="text-red-600">obligatorie pe tot situl</strong>.</>}
                      </span>
                    </li>
                    <li class="flex items-start gap-3">
                      <i class="fas fa-smoking-ban text-red-600 text-xl mt-1"></i>
                      <span class="text-gray-700 text-base md:text-lg leading-relaxed">
                        {lang === 'fr' && <>Il est <strong class="text-red-600">strictement interdit de fumer</strong> sur le site.</>}
                        {lang === 'nl' && <>Het is <strong class="text-red-600">strikt verboden te roken</strong> op het terrein.</>}
                        {lang === 'de' && <>Das Rauchen ist <strong class="text-red-600">auf dem Gelände streng verboten</strong>.</>}
                        {lang === 'it' && <>È <strong class="text-red-600">severamente vietato fumare</strong> sul sito.</>}
                        {lang === 'bg' && <><strong class="text-red-600">Строго забранено е пушенето</strong> на обекта.</>}
                        {lang === 'cs' && <><strong class="text-red-600">Přísně zakázáno kouřit</strong> na místě.</>}
                        {lang === 'da' && <>Det er <strong class="text-red-600">strengt forbudt at ryge</strong> på området.</>}
                        {lang === 'fi' && <><strong class="text-red-600">Tupakointi on ehdottomasti kielletty</strong> alueella.</>}
                        {lang === 'hr' && <><strong class="text-red-600">Strogo je zabranjeno pušenje</strong> na području.</>}
                        {lang === 'pl' && <><strong class="text-red-600">Palenie jest surowo zabronione</strong> na terenie.</>}
                        {lang === 'pt' && <>É <strong class="text-red-600">estritamente proibido fumar</strong> no local.</>}
                        {lang === 'ro' && <>Este <strong class="text-red-600">strict interzis să fumați</strong> pe sit.</>}
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
                  <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">{t.titreAccueil}</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <i class="fas fa-pallet text-blue-600 text-xl mt-1"></i>
                      <span class="text-gray-700 text-base md:text-lg leading-relaxed">
                        {lang === 'fr' && <>Indiquer si un <strong>changement de palette</strong> est nécessaire.</>}
                        {lang === 'nl' && <>Aangeven of een <strong>palletwissel</strong> nodig is.</>}
                        {lang === 'de' && <>Geben Sie an, ob ein <strong>Palettenwechsel</strong> erforderlich ist.</>}
                        {lang === 'it' && <>Indicare se è necessario un <strong>cambio di pallet</strong>.</>}
                        {lang === 'bg' && <>Посочете дали е необходима <strong>смяна на палет</strong>.</>}
                        {lang === 'cs' && <>Uveďte, zda je nutná <strong>výměna palety</strong>.</>}
                        {lang === 'da' && <>Angiv om en <strong>palleudskiftning</strong> er nødvendig.</>}
                        {lang === 'fi' && <>Ilmoita, onko <strong>lavanvaihto</strong> tarpeen.</>}
                        {lang === 'hr' && <>Navedite je li potrebna <strong>zamjena palete</strong>.</>}
                        {lang === 'pl' && <>Wskaż, czy konieczna jest <strong>wymiana palety</strong>.</>}
                        {lang === 'pt' && <>Indicar se é necessária a <strong>troca de paletes</strong>.</>}
                        {lang === 'ro' && <>Indicați dacă este necesară o <strong>schimbare de paleți</strong>.</>}
                      </span>
                    </li>
                    <li class="flex items-start gap-3">
                      <i class="fas fa-truck-loading text-blue-600 text-xl mt-1"></i>
                      <span class="text-gray-700 text-base md:text-lg leading-relaxed">
                        {lang === 'fr' && <>Indiquer si votre camion dispose d'un <strong>hayon élévateur</strong>.</>}
                        {lang === 'nl' && <>Aangeven of uw vrachtwagen een <strong>laadklep</strong> heeft.</>}
                        {lang === 'de' && <>Geben Sie an, ob Ihr LKW mit einer <strong>Ladebordwand</strong> ausgestattet ist.</>}
                        {lang === 'it' && <>Indicare se il camion dispone di <strong>sponda montacarichi</strong>.</>}
                        {lang === 'bg' && <>Посочете дали вашият камион разполага с <strong>хидравлична рампа</strong>.</>}
                        {lang === 'cs' && <>Uveďte, zda má váš nákladní automobil <strong>čelní nakladač</strong>.</>}
                        {lang === 'da' && <>Angiv om din lastbil har en <strong>læssebro</strong>.</>}
                        {lang === 'fi' && <>Ilmoita, onko kuorma-autossasi <strong>nosturi</strong>.</>}
                        {lang === 'hr' && <>Navedite ima li vaš kamion <strong>dizalicu</strong>.</>}
                        {lang === 'pl' && <>Wskaż, czy Twoja ciężarówka ma <strong>windę załadunkową</strong>.</>}
                        {lang === 'pt' && <>Indicar se o seu caminhão possui <strong>elevador traseiro</strong>.</>}
                        {lang === 'ro' && <>Indicați dacă camionul dvs. are un <strong>elevator de ridicare</strong>.</>}
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
                  <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">{t.titreQuai}</h3>
                  <p class="text-gray-700 text-base md:text-lg leading-relaxed">
                    {lang === 'fr' && <>Dès que vous êtes <strong>placé à quai</strong>, vous devez <strong class="text-green-600">remettre vos clés</strong> à l'agent de quai.</>}
                    {lang === 'nl' && <>Zodra u <strong>aan het dok staat</strong>, moet u <strong class="text-green-600">uw sleutels inleveren</strong> bij de dok-agent.</>}
                    {lang === 'de' && <>Sobald Sie <strong>am Dock</strong> platziert sind, müssen Sie <strong class="text-green-600">Ihre Schlüssel</strong> beim Dock-Mitarbeiter abgeben.</>}
                    {lang === 'it' && <>Non appena siete <strong>posizionati alla banchina</strong>, dovete <strong class="text-green-600">consegnare le chiavi</strong> all'agente della banchina.</>}
                    {lang === 'bg' && <>Веднага щом бъдете <strong>поставени на платформата</strong>, трябва да <strong class="text-green-600">предадете ключовете си</strong> на служителя на платформата.</>}
                    {lang === 'cs' && <>Jakmile budete <strong>umístěni u rampy</strong>, musíte <strong class="text-green-600">odevzdat klíče</strong> pracovníkovi rampy.</>}
                    {lang === 'da' && <>Så snart du er <strong>placeret ved kajen</strong>, skal du <strong class="text-green-600">aflevere dine nøgler</strong> til kaimedarbejderen.</>}
                    {lang === 'fi' && <>Heti kun olet <strong>sijoitettu laiturille</strong>, sinun on <strong class="text-green-600">luovutettava avaimesi</strong> laiturin työntekijälle.</>}
                    {lang === 'hr' && <>Čim budete <strong>smješteni na gatanje</strong>, morate <strong class="text-green-600">predati ključeve</strong> agentu gatanja.</>}
                    {lang === 'pl' && <>Jak tylko zostaniesz <strong>ustawiony przy rampie</strong>, musisz <strong class="text-green-600">oddać klucze</strong> pracownikowi rampy.</>}
                    {lang === 'pt' && <>Assim que estiver <strong>colocado no cais</strong>, deve <strong class="text-green-600">entregar as chaves</strong> ao agente do cais.</>}
                    {lang === 'ro' && <>De îndată ce sunteți <strong>plasat la cheu</strong>, trebuie să <strong class="text-green-600">predați cheile</strong> agentului de cheu.</>}
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
                <h4 class="text-lg md:text-xl font-bold text-gray-800">{t.titreImportant}</h4>
              </div>
              <p class="text-gray-700 text-base md:text-lg leading-relaxed">
                {lang === 'fr' && <>Le respect de ces consignes est essentiel pour la <strong>sécurité de tous</strong> sur le site.</>}
                {lang === 'nl' && <>Het naleven van deze voorschriften is essentieel voor de <strong>veiligheid van iedereen</strong> op het terrein.</>}
                {lang === 'de' && <>Die Einhaltung dieser Anweisungen ist für die <strong>Sicherheit aller</strong> auf dem Gelände unerlässlich.</>}
                {lang === 'it' && <>Il rispetto di queste istruzioni è essenziale per la <strong>sicurezza di tutti</strong> sul sito.</>}
                {lang === 'bg' && <>Спазването на тези инструкции е от съществено значение за <strong>безопасността на всички</strong> на обекта.</>}
                {lang === 'cs' && <>Dodržování těchto pokynů je nezbytné pro <strong>bezpečnost všech</strong> na místě.</>}
                {lang === 'da' && <>Overholdelse af disse instruktioner er essentiel for <strong>alles sikkerhed</strong> på området.</>}
                {lang === 'fi' && <>Näiden ohjeiden noudattaminen on välttämätöntä <strong>kaikkien turvallisuudelle</strong> alueella.</>}
                {lang === 'hr' && <>Poštivanje ovih uputa je bitno za <strong>sigurnost svih</strong> na području.</>}
                {lang === 'pl' && <>Przestrzeganie tych instrukcji jest niezbędne dla <strong>bezpieczeństwa wszystkich</strong> na terenie.</>}
                {lang === 'pt' && <>O respeito por estas instruções é essencial para a <strong>segurança de todos</strong> no local.</>}
                {lang === 'ro' && <>Respectarea acestor instrucțiuni este esențială pentru <strong>siguranța tuturor</strong> pe sit.</>}
              </p>
            </div>

            {/* Bouton continuer */}
            <div class="text-center">
              <a 
                href={`/chauffeur/inscription?lang=${lang}`}
                class="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
              >
                <i class="fas fa-check-circle text-2xl"></i>
                <span>{t.btnContinuer}</span>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
