import { getTranslation } from '../translations-data'

export function ChauffeurConsignesPage({ lang }: { lang: string }) {
  const t = getTranslation(lang);
  
  // Génération HTML simple sans JSX complexe
  const html = `<!DOCTYPE html>
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
        <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10 md:h-12">
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
            <h3 class="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
              <i class="fas fa-exclamation-triangle"></i>
              ${t.titreSecurite}
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <i class="fas fa-vest text-red-600 mt-1 flex-shrink-0"></i>
                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneEPI}</span>
              </div>
              <div class="flex items-start gap-3">
                <i class="fas fa-ban text-red-600 mt-1 flex-shrink-0"></i>
                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneFumer}</span>
              </div>
            </div>
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
            <h3 class="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <i class="fas fa-door-open"></i>
              ${t.titreAccueil}
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <i class="fas fa-pallet text-blue-600 mt-1 flex-shrink-0"></i>
                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consignePalette}</span>
              </div>
              <div class="flex items-start gap-3">
                <i class="fas fa-truck-loading text-blue-600 mt-1 flex-shrink-0"></i>
                <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneHayon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Placement à quai -->
      <div class="mb-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <i class="fas fa-warehouse text-white text-xl"></i>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <i class="fas fa-truck"></i>
              ${t.titreQuai}
            </h3>
            <div class="flex items-start gap-3">
              <i class="fas fa-key text-green-600 mt-1 flex-shrink-0"></i>
              <span class="text-gray-700 text-base md:text-lg leading-relaxed">${t.consigneClefs}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Important -->
      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-400 rounded-lg p-6">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <i class="fas fa-info-circle text-orange-500 text-3xl"></i>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-orange-700 mb-2">${t.titreImportant}</h3>
            <p class="text-gray-700 text-base md:text-lg leading-relaxed">${t.messageImportant}</p>
          </div>
        </div>
      </div>

      <!-- Bouton Continuer -->
      <div class="mt-8 text-center">
        <a href="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FF5A1A] text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
          <i class="fas fa-check-circle"></i>
          ${t.btnContinuer}
        </a>
      </div>

    </div>
  </div>

  <!-- Footer -->
  <div class="bg-gray-900 text-gray-400 text-center p-4 text-sm">
    <p>© 2026 GXO Logistics - ${t.titreSecurite}</p>
  </div>
</body>
</html>`;

  return html;
}
