export function QRCodeChauffeurPage() {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-3 md:p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md">
        {/* Header avec logo GXO */}
        <div class="text-center mb-6 md:mb-8">
          <img src="/static/gxo-logo-official.svg" alt="GXO Logistics" class="h-16 md:h-20 mx-auto mb-3 md:mb-4" />
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-truck text-[#FF5A1A] mr-2"></i>
            Accès Chauffeur
          </h1>
          <p class="text-sm md:text-base text-gray-600">
            Scannez le QR Code pour accéder au système
          </p>
        </div>

        {/* QR Code */}
        <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 md:p-8 mb-4 md:mb-6 text-center">
          <div class="bg-white inline-block p-3 md:p-4 rounded-lg shadow-md">
            <div id="qrcode-container"></div>
          </div>
          <p class="text-gray-700 font-semibold mt-3 md:mt-4 text-xs md:text-sm">
            🇫🇷 🇬🇧 🇪🇸 🇵🇱 🇩🇪 🇮🇹 🇧🇬
          </p>
          <p class="text-gray-600 text-xs mt-2">
            Système multilingue disponible
          </p>
        </div>

        {/* Instructions */}
        <div class="bg-blue-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <h3 class="font-bold text-gray-800 mb-2 flex items-center text-sm md:text-base">
            <i class="fas fa-info-circle text-blue-500 mr-2"></i>
            Instructions
          </h3>
          <ol class="text-xs md:text-sm text-gray-700 space-y-2">
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">1</span>
              <span>Ouvrez l'appareil photo de votre smartphone</span>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">2</span>
              <span>Pointez vers le QR Code ci-dessus</span>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">3</span>
              <span>Suivez les instructions à l'écran</span>
            </li>
          </ol>
        </div>

        {/* Lien direct pour mobile */}
        <div class="text-center">
          <p class="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">Ou cliquez directement :</p>
          <a 
            href="/chauffeur/langue" 
            class="inline-block bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-sm md:text-base active:scale-95"
          >
            <i class="fas fa-mobile-alt mr-2"></i>
            Accéder au système
          </a>
        </div>

        {/* Footer */}
        <div class="mt-6 md:mt-8 text-center text-gray-500 text-xs">
          <p>GXO Logistics Moissy-Cramayel</p>
          <p class="mt-1">Système d'accueil chauffeurs</p>
        </div>
      </div>

      {/* Script QR Code */}
      <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('qrcode-container');
            if (container && typeof QRCode !== 'undefined') {
              // URL pointant directement vers la sélection de langue
              const url = window.location.origin + '/chauffeur/langue';
              
              new QRCode(container, {
                text: url,
                width: 200,
                height: 200,
                colorDark: '#FF5A1A',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              });
            }
          });
        `
      }} />
    </div>
  )
}
