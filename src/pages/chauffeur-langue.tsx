export function ChauffeurLanguePage() {
  const langues = [
    { code: 'fr', nom: 'Français 🎥', drapeau: '🇫🇷' },
    { code: 'nl', nom: 'Nederlands', drapeau: '🇳🇱' },
    { code: 'fi', nom: 'Suomi', drapeau: '🇫🇮' },
    { code: 'de', nom: 'Deutsch', drapeau: '🇩🇪' },
    { code: 'it', nom: 'Italiano', drapeau: '🇮🇹' },
    { code: 'pl', nom: 'Polski', drapeau: '🇵🇱' },
    { code: 'pt', nom: 'Português', drapeau: '🇵🇹' },
    { code: 'bg', nom: 'Български', drapeau: '🇧🇬' },
    { code: 'cs', nom: 'Čeština', drapeau: '🇨🇿' },
    { code: 'da', nom: 'Dansk', drapeau: '🇩🇰' },
    { code: 'hr', nom: 'Hrvatski', drapeau: '🇭🇷' },
    { code: 'ro', nom: 'Română', drapeau: '🇷🇴' }
  ];

  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-3xl">
        {/* Header */}
        <div class="text-center mb-6 md:mb-8">
          <img src="/static/gxo-logo-official.svg" alt="GXO Logistics" class="h-12 md:h-16 mx-auto mb-4" />
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Bienvenue / Welcome / Tervetuloa / Welkom
          </h1>
          <p class="text-sm md:text-base text-gray-600">
            Sélectionnez votre langue / Select your language / Valitse kielesi / Kies uw taal
          </p>
        </div>

        {/* Sélection de langue - Optimisée mobile */}
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {langues.map((langue) => (
            <a
              href={`/chauffeur/video?lang=${langue.code}`}
              class="group block bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 rounded-xl p-4 md:p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-[#FF5A1A] active:scale-95"
            >
              <div class="text-4xl md:text-6xl mb-2 md:mb-3">{langue.drapeau}</div>
              <h3 class="text-base md:text-xl font-bold text-gray-800 mb-1">{langue.nom}</h3>
              <div class="text-[#FF5A1A] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fas fa-arrow-right"></i>
              </div>
            </a>
          ))}
        </div>

        {/* Footer avec instructions visuelles */}
        <div class="mt-6 md:mt-8 bg-blue-50 rounded-lg p-3 md:p-4">
          <div class="flex items-center justify-center text-gray-700 text-sm md:text-base">
            <i class="fas fa-hand-pointer text-xl md:text-2xl text-blue-500 mr-2 md:mr-3"></i>
            <span>
              Cliquez sur votre langue / Click on your language / Valitse kielesi / Kies uw taal
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
