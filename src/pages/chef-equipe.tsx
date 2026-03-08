export function ChefEquipePage() {
  return (
    <div>
      {/* Hero Section */}
      <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 rounded-full p-4">
              <i class="fas fa-users-cog text-4xl"></i>
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">Chef d'équipe / Responsable d'exploitation</h1>
              <p class="text-xl opacity-90">Gestion d'équipe et supervision des opérations</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-5xl font-bold">0</div>
            <div class="text-sm opacity-75">Procédures</div>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div class="bg-white rounded-lg shadow-lg p-12 text-center">
        <div class="mb-6">
          <i class="fas fa-hard-hat text-6xl text-indigo-500"></i>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          Section en construction
        </h2>
        <p class="text-gray-600 text-lg mb-6">
          Les procédures pour les Chefs d'équipe et Responsables d'exploitation seront bientôt disponibles.
        </p>
        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-6 text-left max-w-2xl mx-auto">
          <h3 class="text-lg font-bold text-indigo-800 mb-3">
            <i class="fas fa-info-circle mr-2"></i>
            Contenu à venir
          </h3>
          <ul class="text-gray-700 space-y-2">
            <li><i class="fas fa-check text-indigo-500 mr-2"></i>Gestion des équipes et planification</li>
            <li><i class="fas fa-check text-indigo-500 mr-2"></i>Supervision des opérations quotidiennes</li>
            <li><i class="fas fa-check text-indigo-500 mr-2"></i>Reporting et indicateurs de performance</li>
            <li><i class="fas fa-check text-indigo-500 mr-2"></i>Gestion des incidents et escalades</li>
            <li><i class="fas fa-check text-indigo-500 mr-2"></i>Coordination inter-services</li>
            <li><i class="fas fa-check text-indigo-500 mr-2"></i>Formation et développement des équipes</li>
          </ul>
        </div>
        <div class="mt-8">
          <a href="/" class="inline-block bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour à l'accueil
          </a>
        </div>
      </div>

      {/* Quick Access Section */}
      <div class="mt-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-bolt mr-3 text-yellow-500"></i>
          Accès rapide aux autres sections
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/gestion-quais" class="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow">
            <i class="fas fa-truck-loading text-orange-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Gestion des Quais</span>
          </a>
          
          <a href="/administrateur" class="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow">
            <i class="fas fa-user-tie text-purple-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Administrateur</span>
          </a>
          
          <a href="/anomalies" class="flex items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow">
            <i class="fas fa-exclamation-circle text-red-500 text-2xl mr-3"></i>
            <span class="font-semibold text-gray-800">Anomalies / FAQ</span>
          </a>
        </div>
      </div>
    </div>
  )
}
