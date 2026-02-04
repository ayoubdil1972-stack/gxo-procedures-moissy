export function LoginPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-[#00205B] via-[#003DA5] to-[#0052CC] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Login Card */}
      <div class="relative z-10 w-full max-w-md">
        {/* Error message container */}
        <div id="error-message" class="hidden mb-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-shake">
          <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-3 text-xl"></i>
            <span id="error-text"></span>
          </div>
        </div>

        {/* Login form */}
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with animated logistics scene */}
          <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] p-20 flex items-center justify-center relative overflow-hidden min-h-[320px]">
            {/* Animated logistics scene */}
            <div class="absolute inset-0 opacity-30">
              {/* Manutentionnaire sur chariot (centre-gauche) */}
              <div class="absolute left-1/4 top-1/2 -translate-y-1/2 animate-forklift-move">
                <i class="fas fa-forklift text-5xl text-white/70"></i>
              </div>
              
              {/* Tablette avec cases à cocher (droite) */}
              <div class="absolute right-12 top-1/2 -translate-y-1/2">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <i class="fas fa-tablet-alt text-4xl text-white/70 mb-2"></i>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 animate-check-1">
                      <i class="fas fa-check-square text-green-400 text-xl animate-check-pop"></i>
                      <div class="h-1 w-12 bg-white/40 rounded"></div>
                    </div>
                    <div class="flex items-center gap-2 animate-check-2">
                      <i class="fas fa-check-square text-green-400 text-xl animate-check-pop" style="animation-delay: 1s;"></i>
                      <div class="h-1 w-12 bg-white/40 rounded"></div>
                    </div>
                    <div class="flex items-center gap-2 animate-check-3">
                      <i class="fas fa-check-square text-green-400 text-xl animate-check-pop" style="animation-delay: 2s;"></i>
                      <div class="h-1 w-12 bg-white/40 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Logo GXO au centre (par-dessus la scène) */}
            <div class="relative z-10 group">
              <img 
                src="/static/gxo-logo.svg" 
                alt="GXO Logistics" 
                class="h-28 w-auto mx-auto transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-125 group-hover:drop-shadow-2xl animate-float cursor-pointer" 
              />
              
              {/* Circular glow effect on hover */}
              <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full blur-2xl transition-all duration-700 -z-10 group-hover:scale-150"></div>
            </div>
          </div>

          {/* Form content */}
          <div class="p-8">
            <form id="login-form" class="space-y-6">
              {/* Identifiant */}
              <div>
                <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-user mr-2 text-[#00205B]"></i>
                  Identifiant GXO
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  autocomplete="username"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00205B] focus:outline-none transition-colors"
                  placeholder="Votre identifiant"
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-lock mr-2 text-[#00205B]"></i>
                  Mot de passe
                </label>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autocomplete="current-password"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00205B] focus:outline-none transition-colors pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onclick="togglePassword()"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00205B] transition-colors"
                  >
                    <i id="password-icon" class="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  class="w-4 h-4 text-[#00205B] border-gray-300 rounded focus:ring-[#00205B]"
                />
                <label for="remember" class="ml-2 text-sm text-gray-600">
                  Se souvenir de moi
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <i class="fas fa-sign-in-alt mr-2"></i>
                Se connecter
              </button>
            </form>

            {/* Security info */}
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-start text-xs text-gray-500">
                <i class="fas fa-shield-alt mr-2 mt-1 text-green-600"></i>
                <div>
                  <p class="font-semibold text-gray-700 mb-1">Connexion sécurisée</p>
                  <p>Vos identifiants sont protégés par cryptage. Cette plateforme est réservée aux employés GXO autorisés.</p>
                </div>
              </div>
            </div>

            {/* Help link */}
            <div class="mt-4 text-center">
              <a href="#" onclick="showHelp(); return false;" class="text-sm text-[#00205B] hover:underline">
                <i class="fas fa-question-circle mr-1"></i>
                Besoin d'aide pour vous connecter ?
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="text-center mt-6 text-white/60 text-sm">
          <p>© 2026 GXO Logistics - Tous droits réservés</p>
          <p class="mt-1">Plateforme interne confidentielle</p>
        </div>
      </div>
    </div>
  )
}
