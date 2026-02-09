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
          Pour vous guider au mieux, merci de sélectionner votre situation :
        </p>
        
        {/* Questionnaire interactif */}
        <div id="onboarding-questionnaire" class="space-y-4">
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-clipboard-question mr-2 text-pink-500"></i>
              Quelle est votre situation ?
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onclick="showOnboardingPath('nouveau')" 
                class="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
              >
                <i class="fas fa-user-plus text-2xl mb-2"></i>
                <div class="font-bold">Nouvelle intégration</div>
                <div class="text-sm opacity-90">Premier jour dans l'entreprise</div>
              </button>
              
              <button 
                onclick="showOnboardingPath('changement-poste')" 
                class="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
              >
                <i class="fas fa-exchange-alt text-2xl mb-2"></i>
                <div class="font-bold">Changement de poste</div>
                <div class="text-sm opacity-90">Mutation interne vers un nouveau métier</div>
              </button>
              
              <button 
                onclick="showOnboardingPath('changement-site')" 
                class="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
              >
                <i class="fas fa-building text-2xl mb-2"></i>
                <div class="font-bold">Changement de site</div>
                <div class="text-sm opacity-90">Transfert depuis un autre site GXO</div>
              </button>
              
              <button 
                onclick="showOnboardingPath('retour-conge')" 
                class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
              >
                <i class="fas fa-calendar-check text-2xl mb-2"></i>
                <div class="font-bold">Retour après absence</div>
                <div class="text-sm opacity-90">Retour après congé longue durée ou arrêt</div>
              </button>
              
              <button 
                onclick="showOnboardingPath('interim')" 
                class="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
              >
                <i class="fas fa-clock text-2xl mb-2"></i>
                <div class="font-bold">Intérimaire / CDD</div>
                <div class="text-sm opacity-90">Mission temporaire sur le site</div>
              </button>
              
              <button 
                onclick="showOnboardingPath('formation')" 
                class="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
              >
                <i class="fas fa-graduation-cap text-2xl mb-2"></i>
                <div class="font-bold">Formation / Montée en compétence</div>
                <div class="text-sm opacity-90">Apprentissage d'un nouveau processus</div>
              </button>
            </div>
          </div>
          
          {/* Résultats du questionnaire */}
          <div id="onboarding-result" class="hidden bg-white rounded-lg p-6 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">
                <i class="fas fa-route mr-2 text-pink-500"></i>
                Votre parcours personnalisé
              </h3>
              <button onclick="resetOnboarding()" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-redo mr-1"></i>Modifier ma situation
              </button>
            </div>
            <div id="onboarding-content"></div>
          </div>
          
          {/* Étape 1 : Sélection du métier */}
          <div id="metier-selection-step" class="hidden bg-white rounded-lg p-6 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">
                <i class="fas fa-briefcase mr-2 text-pink-500"></i>
                Étape 1 : Quel est votre métier ?
              </h3>
              <button onclick="resetOnboarding()" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-redo mr-1"></i>Recommencer
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button onclick="selectMetier('reception')" class="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-orange-200">
                <i class="fas fa-truck-loading text-orange-500 text-2xl mb-2"></i>
                <div class="font-bold text-gray-800">Réception</div>
                <div class="text-sm text-gray-600">Déchargement et contrôle</div>
              </button>
              
              <button onclick="selectMetier('agent-quai')" class="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-yellow-200">
                <i class="fas fa-hard-hat text-yellow-500 text-2xl mb-2"></i>
                <div class="font-bold text-gray-800">Agent de Quai</div>
                <div class="text-sm text-gray-600">Opérations de quai</div>
              </button>
              
              <button onclick="selectMetier('controleur')" class="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-green-200">
                <i class="fas fa-clipboard-check text-green-500 text-2xl mb-2"></i>
                <div class="font-bold text-gray-800">Contrôleur</div>
                <div class="text-sm text-gray-600">Contrôle qualité</div>
              </button>
              
              <button onclick="selectMetier('administrateur')" class="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-purple-200">
                <i class="fas fa-user-tie text-purple-500 text-2xl mb-2"></i>
                <div class="font-bold text-gray-800">Administrateur</div>
                <div class="text-sm text-gray-600">Gestion administrative</div>
              </button>
              
              <button onclick="selectMetier('accueil-chauffeur')" class="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-blue-200">
                <i class="fas fa-truck text-blue-500 text-2xl mb-2"></i>
                <div class="font-bold text-gray-800">Accueil Chauffeur</div>
                <div class="text-sm text-gray-600">Arrivée et livraison</div>
              </button>
              
              <button onclick="selectMetier('autre')" class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border-2 border-gray-200">
                <i class="fas fa-ellipsis-h text-gray-500 text-2xl mb-2"></i>
                <div class="font-bold text-gray-800">Autre métier</div>
                <div class="text-sm text-gray-600">Support, maintenance...</div>
              </button>
            </div>
          </div>
          
          {/* Étape 2 : Sélection de la formation */}
          <div id="formation-selection-step" class="hidden bg-white rounded-lg p-6 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">
                <i class="fas fa-graduation-cap mr-2 text-pink-500"></i>
                Étape 2 : Quelle formation souhaitez-vous ?
              </h3>
              <button onclick="backToMetierSelection()" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-arrow-left mr-1"></i>Retour
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onclick="selectFormation('initiale')" class="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-left">
                <i class="fas fa-book-open text-2xl mb-2"></i>
                <div class="font-bold">Formation initiale</div>
                <div class="text-sm opacity-90">Apprendre les bases du métier</div>
              </button>
              
              <button onclick="selectFormation('perfectionnement')" class="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-left">
                <i class="fas fa-chart-line text-2xl mb-2"></i>
                <div class="font-bold">Perfectionnement</div>
                <div class="text-sm opacity-90">Approfondir mes compétences</div>
              </button>
              
              <button onclick="selectFormation('recyclage')" class="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-left">
                <i class="fas fa-sync-alt text-2xl mb-2"></i>
                <div class="font-bold">Recyclage</div>
                <div class="text-sm opacity-90">Mise à jour des procédures</div>
              </button>
              
              <button onclick="selectFormation('caces')" class="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all text-left">
                <i class="fas fa-forklift text-2xl mb-2"></i>
                <div class="font-bold">CACES / Habilitations</div>
                <div class="text-sm opacity-90">Certifications réglementaires</div>
              </button>
              
              <button onclick="selectFormation('securite')" class="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all text-left">
                <i class="fas fa-shield-alt text-2xl mb-2"></i>
                <div class="font-bold">Sécurité</div>
                <div class="text-sm opacity-90">EPI, gestes et postures, incendie</div>
              </button>
              
              <button onclick="selectFormation('systeme')" class="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-left">
                <i class="fas fa-desktop text-2xl mb-2"></i>
                <div class="font-bold">Systèmes informatiques</div>
                <div class="text-sm opacity-90">SAP, WMS, terminal RF</div>
              </button>
            </div>
          </div>
          
          {/* Résultat final */}
          <div id="final-result" class="hidden bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">
                <i class="fas fa-check-circle mr-2 text-green-500"></i>
                Votre parcours de formation personnalisé
              </h3>
              <button onclick="resetOnboarding()" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-redo mr-1"></i>Recommencer
              </button>
            </div>
            <div id="final-content" class="space-y-4"></div>
          </div>
        </div>
      </div>

      {/* Section métier - affichée après sélection */}
      <div id="metier-selection" class="hidden mb-8">
        <div class="bg-white rounded-lg p-6 shadow-md">
          <h3 class="text-lg font-bold text-gray-800 mb-4">
            <i class="fas fa-briefcase mr-2 text-pink-500"></i>
            Quel est votre métier ?
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onclick="showMetierPath('reception')" class="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors border-2 border-orange-200">
              <i class="fas fa-truck-loading text-orange-500 text-xl mb-2"></i>
              <div class="font-bold text-gray-800">Réception</div>
              <div class="text-sm text-gray-600">Déchargement et contrôle</div>
            </button>
            
            <button onclick="showMetierPath('agent-quai')" class="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors border-2 border-yellow-200">
              <i class="fas fa-hard-hat text-yellow-500 text-xl mb-2"></i>
              <div class="font-bold text-gray-800">Agent de Quai</div>
              <div class="text-sm text-gray-600">Opérations quai</div>
            </button>
            
            <button onclick="showMetierPath('controleur')" class="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors border-2 border-green-200">
              <i class="fas fa-clipboard-check text-green-500 text-xl mb-2"></i>
              <div class="font-bold text-gray-800">Contrôleur</div>
              <div class="text-sm text-gray-600">Contrôle qualité</div>
            </button>
            
            <button onclick="showMetierPath('administrateur')" class="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors border-2 border-purple-200">
              <i class="fas fa-user-tie text-purple-500 text-xl mb-2"></i>
              <div class="font-bold text-gray-800">Administrateur</div>
              <div class="text-sm text-gray-600">Support et coordination</div>
            </button>
            
            <button onclick="showMetierPath('accueil-chauffeur')" class="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors border-2 border-blue-200">
              <i class="fas fa-truck text-blue-500 text-xl mb-2"></i>
              <div class="font-bold text-gray-800">Accueil Chauffeur</div>
              <div class="text-sm text-gray-600">Arrivée et livraison</div>
            </button>
            
            <button onclick="showMetierPath('chef')" class="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors border-2 border-indigo-200">
              <i class="fas fa-user-cog text-indigo-600 text-xl mb-2"></i>
              <div class="font-bold text-gray-800">Chef d'équipe</div>
              <div class="text-sm text-gray-600">Management terrain</div>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu standard (toujours visible) */}

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

        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div class="flex items-start">
            <div class="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
              2
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Comprendre le site</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-2 mt-1"></i>
                  <span><strong>Zone Réception :</strong> Quais 1-30, déchargement camions</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-2 mt-1"></i>
                  <span><strong>Zone Stockage :</strong> Allées A à Z, stockage palettes</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-2 mt-1"></i>
                  <span><strong>Zone Hazardous :</strong> Zone rouge, produits dangereux (accès restreint)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-2 mt-1"></i>
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
                <a href="/agent-quai" class="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <i class="fas fa-hard-hat text-yellow-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Agent de Quai</span>
                </a>
                <a href="/controleur" class="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <i class="fas fa-clipboard-check text-green-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Contrôleur</span>
                </a>
                <a href="/administrateur" class="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <i class="fas fa-user-tie text-purple-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Administrateur</span>
                </a>
                <a href="/accueil-chauffeur" class="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <i class="fas fa-truck text-blue-500 text-xl mr-3"></i>
                  <span class="font-semibold text-gray-700">Accueil Chauffeur</span>
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
