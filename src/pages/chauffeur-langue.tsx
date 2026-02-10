export function ChauffeurLanguePage() {
  const langues = [
    { code: 'fr', nom: 'Français', drapeau: '🇫🇷' },
    { code: 'en', nom: 'English', drapeau: '🇬🇧' },
    { code: 'es', nom: 'Español', drapeau: '🇪🇸' },
    { code: 'pl', nom: 'Polski', drapeau: '🇵🇱' },
    { code: 'de', nom: 'Deutsch', drapeau: '🇩🇪' },
    { code: 'it', nom: 'Italiano', drapeau: '🇮🇹' }
  ];

  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div class="text-center mb-8">
          <img src="/static/gxo-logo-official.svg" alt="GXO Logistics" class="h-16 mx-auto mb-4" />
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Bienvenue / Welcome
          </h1>
          <p class="text-gray-600">
            Sélectionnez votre langue / Select your language
          </p>
        </div>

        {/* Sélection de langue */}
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {langues.map((langue) => (
            <a
              href={`/chauffeur/video?lang=${langue.code}`}
              class="group block bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-[#FF5A1A]"
            >
              <div class="text-6xl mb-3">{langue.drapeau}</div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">{langue.nom}</h3>
              <div class="text-[#FF5A1A] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fas fa-arrow-right"></i>
              </div>
            </a>
          ))}
        </div>

        {/* Footer avec instructions visuelles */}
        <div class="mt-8 bg-blue-50 rounded-lg p-4">
          <div class="flex items-center justify-center text-gray-700">
            <i class="fas fa-hand-pointer text-2xl text-blue-500 mr-3"></i>
            <span class="text-sm">
              Cliquez sur votre langue / Click on your language
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
