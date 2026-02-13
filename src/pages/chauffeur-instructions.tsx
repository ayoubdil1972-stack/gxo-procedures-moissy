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
                      Le port du gilet et chaussures de sécurité est obligatoire.
                    </span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fas fa-smoking-ban text-red-600 text-xl mt-1"></i>
                    <span id="consigne-fumer" class="text-gray-700 text-base md:text-lg leading-relaxed">
                      Il est strictement interdit de fumer.
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
                      Changement de palette si nécessaire.
                    </span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fas fa-truck-loading text-blue-600 text-xl mt-1"></i>
                    <span id="consigne-hayon" class="text-gray-700 text-base md:text-lg leading-relaxed">
                      Hayon élévateur présent ?
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
                  Remettre les clés à l'agent de quai.
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
              Sécurité de tous essentielle.
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
              <span id="btn-continuer-text">J'ai lu et compris</span>
            </button>
          </div>
        </div>
      </div>

      {/* Script externe pour les traductions */}
      <script src="/static/consignes-translations.js"></script>
      
      {/* Script de gestion minimal */}
      <script dangerouslySetInnerHTML={{
        __html: `
          const urlParams = new URLSearchParams(window.location.search);
          const langue = urlParams.get('lang') || 'fr';
          sessionStorage.setItem('chauffeur_langue', langue);
          
          // Charger traductions depuis window.consignesTranslations (fichier externe)
          const t = window.consignesTranslations && window.consignesTranslations[langue] 
            ? window.consignesTranslations[langue] 
            : window.consignesTranslations['fr'];
          
          // Appliquer traductions
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
          
          window.handleContinue = function() {
            sessionStorage.setItem('instructions_lues', 'true');
            const chauffeurId = sessionStorage.getItem('chauffeur_id');
            if (chauffeurId) {
              window.location.href = '/chauffeur/taches?id=' + chauffeurId;
            } else {
              window.location.href = '/chauffeur/inscription';
            }
          };
          
          console.log('✅ Page consignes chargée - Langue:', langue);
        `
      }} />
    </div>
  )
}
