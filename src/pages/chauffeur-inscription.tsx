export function ChauffeurInscriptionPage() {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inscription - GXO Chauffeur</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="min-h-screen bg-gray-100">
        {/* Header */}
        <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
          <div class="container mx-auto flex items-center justify-between">
            <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10" />
            <div class="text-white font-bold">Inscription</div>
          </div>
        </div>

        {/* Conteneur principal */}
        <div class="container mx-auto p-4 max-w-lg">
          {/* Section Inscription */}
          <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
              <i class="fas fa-user-plus text-[#FF5A1A] mr-3"></i>
              Inscription Chauffeur
            </h2>

            <form id="form-inscription" class="space-y-6">
              {/* Pseudo */}
              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-user mr-2 text-[#FF5A1A]"></i>
                  Pseudo / Nom
                  <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="pseudo" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              {/* Entreprise */}
              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-building mr-2 text-[#FF5A1A]"></i>
                  Entreprise de transport
                  <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="entreprise" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"
                  placeholder="Ex: DHL Express"
                />
              </div>

              {/* Numéro de Quai */}
              <div>
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-warehouse mr-2 text-[#FF5A1A]"></i>
                  Numéro de quai attribué
                  <span class="text-red-500">*</span>
                </label>
                <select 
                  id="numero-quai" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"
                >
                  <option value="">-- Sélectionner --</option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                    <option value={`Q${num}`}>Quai {num}</option>
                  ))}
                </select>
              </div>

              {/* Bouton de soumission */}
              <button 
                type="submit"
                class="w-full bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white py-4 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                <i class="fas fa-check-circle mr-2"></i>
                Valider et Commencer
              </button>
            </form>

            <div class="mt-6 text-center text-sm text-gray-500">
              <i class="fas fa-info-circle mr-1"></i>
              Après validation, vous accéderez à vos tâches de déchargement
            </div>
          </div>
        </div>

        <script src="/static/chauffeur-inscription.js"></script>
      </body>
    </html>
  )
}
