export function NouveauPage() {
  return (
    <div>
      <div class="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-graduation-cap mr-3"></i>
              Nouvel Arrivant
            </h1>
            <p class="text-xl opacity-90">
              Parcours d'intégration et formations de base
            </p>
          </div>
          <a href="/" class="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      <div class="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-route mr-3 text-pink-500"></i>
          Bienvenue chez GXO Logistics !
        </h2>
        <p class="text-gray-700 text-lg mb-6">
          Ce guide vous accompagne dans vos premiers pas sur le site de Moissy-Cramayel. 
          Suivez les étapes ci-dessous pour découvrir votre environnement de travail.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500">
          <div class="flex items-start">
            <div class="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
              1
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Sécurité et EPI</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                  <span>Port du casque et chaussures de sécurité OBLIGATOIRE dans toutes les zones</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                  <span>Gilet haute visibilité à porter en permanence</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                  <span>Localiser les issues de secours et points de rassemblement</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                  <span>Connaître les numéros d'urgence : Secours (15), Sécurité interne (poste 999)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-start">
            <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
              2
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Comprendre le site</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-blue-500 mr-2 mt-1"></i>
                  <span><strong>Zone Réception :</strong> Quais 1-30, déchargement camions</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-blue-500 mr-2 mt-1"></i>
                  <span><strong>Zone Stockage :</strong> Allées A à Z, stockage palettes</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-blue-500 mr-2 mt-1"></i>
                  <span><strong>Zone Hazardous :</strong> Zone rouge, produits dangereux (accès restreint)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-blue-500 mr-2 mt-1"></i>
                  <span><strong>Zone Expédition :</strong> Quais 50-80, chargement camions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-start">
            <div class="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
              3
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Premiers gestes métiers</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <a href="/reception" class="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <i class="fas fa-truck text-blue-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Réception de base</span>
                </a>
                <a href="/cariste#mise-en-stock" class="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <i class="fas fa-warehouse text-green-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Mise en stock</span>
                </a>
                <a href="/cariste#relancer-tache" class="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <i class="fas fa-tasks text-purple-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Relancer une tâche</span>
                </a>
                <a href="/anomalies" class="flex items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <i class="fas fa-exclamation-circle text-red-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Signaler une anomalie</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div class="flex items-start">
            <div class="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
              4
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Utiliser les outils</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-mobile-alt text-orange-500 mr-2 mt-1"></i>
                  <span><strong>Terminal RF :</strong> Scanner codes-barres, confirmer actions</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-desktop text-orange-500 mr-2 mt-1"></i>
                  <span><strong>SAP / S4HANA :</strong> Système de gestion (formation requise)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-globe text-orange-500 mr-2 mt-1"></i>
                  <span><strong>Portail Action :</strong> Appointments et tracking</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-book text-orange-500 mr-2 mt-1"></i>
                  <span><strong>Cet intranet :</strong> Toutes les procédures en un clic !</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <div class="flex items-start">
            <div class="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
              5
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Qui contacter ?</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div class="p-3 bg-gray-50 rounded-lg">
                  <div class="font-semibold text-gray-800 mb-1">Chef d'équipe</div>
                  <div class="text-sm text-gray-600">Questions quotidiennes et support terrain</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                  <div class="font-semibold text-gray-800 mb-1">RH</div>
                  <div class="text-sm text-gray-600">Contrat, planning, congés</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                  <div class="font-semibold text-gray-800 mb-1">Sécurité</div>
                  <div class="text-sm text-gray-600">Incidents, EPI, formations sécurité</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                  <div class="font-semibold text-gray-800 mb-1">IT Support</div>
                  <div class="text-sm text-gray-600">Problèmes terminal, PC, accès systèmes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 text-center">
        <i class="fas fa-thumbs-up text-5xl mb-4"></i>
        <h2 class="text-2xl font-bold mb-3">Vous êtes prêt(e) !</h2>
        <p class="text-lg opacity-90 mb-6">
          N'hésitez pas à consulter cet intranet à tout moment pour retrouver une procédure.
        </p>
        <a href="/" class="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          <i class="fas fa-home mr-2"></i>Retour à l'accueil
        </a>
      </div>
    </div>
  )
}
