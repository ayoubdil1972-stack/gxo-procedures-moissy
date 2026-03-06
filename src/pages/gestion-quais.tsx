// Page de gestion des quais
export function GestionQuaisPage() {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gestion des Quais - GXO Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <style>{`
          .slide-container {
            display: flex;
            width: 200%;
            transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
          }
          .slide-view {
            width: 50%;
            min-height: 100vh;
          }
          .slide-left {
            transform: translateX(0);
          }
          .slide-right {
            transform: translateX(-50%);
          }
          .quai-card {
            transition: all 0.3s ease;
          }
          .quai-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          .timer-display {
            font-family: 'Courier New', monospace;
            font-size: 1.5rem;
            font-weight: bold;
          }
        `}</style>
      </head>
      <body class="bg-gray-100">
        {/* Container principal avec système de glissement */}
        <div class="slide-container slide-left" id="slide-container">
          
          {/* VUE 1: Chauffeurs Actifs (existante) */}
          <div class="slide-view" id="view-chauffeurs">
            <div class="min-h-screen bg-gray-100 p-6">
              <div class="max-w-7xl mx-auto">
                {/* Header avec bouton de navigation */}
                <div class="flex items-center justify-between mb-6">
                  <h1 class="text-3xl font-bold text-gray-800">
                    <i class="fas fa-users mr-2"></i>
                    Chauffeurs Actifs
                  </h1>
                  <button 
                    onclick="switchToQuais()" 
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                  >
                    <span>Gestion des Quais</span>
                    <i class="fas fa-arrow-right"></i>
                  </button>
                </div>
                
                {/* Contenu chauffeurs actifs (chargé dynamiquement) */}
                <div id="chauffeurs-content" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="text-center py-12 col-span-full">
                    <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-500">Chargement des chauffeurs actifs...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* VUE 2: Gestion des Quais (nouvelle) */}
          <div class="slide-view" id="view-quais">
            <div class="min-h-screen bg-gray-100 p-6">
              <div class="max-w-7xl mx-auto">
                {/* Header avec bouton de navigation */}
                <div class="flex items-center justify-between mb-6">
                  <button 
                    onclick="switchToChauffeurs()" 
                    class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                  >
                    <i class="fas fa-arrow-left"></i>
                    <span>Chauffeurs Actifs</span>
                  </button>
                  <h1 class="text-3xl font-bold text-gray-800">
                    <i class="fas fa-warehouse mr-2"></i>
                    Gestion des Quais
                  </h1>
                  <div class="w-48"></div> {/* Spacer pour centrer le titre */}
                </div>
                
                {/* Légende des statuts */}
                <div class="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-center gap-6">
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-700">Disponible</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-700">En cours d'utilisation</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-700">Fin de déchargement</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-700">Indisponible</span>
                  </div>
                </div>
                
                {/* Grille des quais (6 lignes × 5 colonnes = 30 quais) */}
                <div id="quais-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {/* Chargé dynamiquement par JavaScript */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modale pour changer le statut d'un quai */}
        <div id="modal-quai" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800" id="modal-title">Quai #</h2>
              <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <form id="form-quai-status" class="space-y-4">
              {/* Statut */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select id="input-statut" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="disponible">🟢 Disponible</option>
                  <option value="en_cours">🟡 En cours d'utilisation</option>
                  <option value="indisponible">🔴 Indisponible</option>
                </select>
              </div>
              
              {/* Commentaire (visible seulement si indisponible) */}
              <div id="section-commentaire" class="hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Raison de l'indisponibilité <span class="text-red-500">*</span>
                </label>
                <textarea 
                  id="input-commentaire" 
                  rows="3" 
                  placeholder="Ex: Haillon cassé, porte endommagée..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              {/* Auteur du commentaire */}
              <div id="section-auteur" class="hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Votre nom <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="input-auteur" 
                  placeholder="Ex: Jean Dupont"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Boutons */}
              <div class="flex gap-3 pt-4">
                <button type="button" onclick="closeModal()" class="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors">
                  Annuler
                </button>
                <button type="submit" class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <script src="/static/gestion-quais.js"></script>
      </body>
    </html>
  )
}
