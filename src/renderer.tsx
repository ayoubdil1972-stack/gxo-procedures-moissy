import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GXO Logistics - Intranet Moissy</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --gxo-blue: #00205B;
            --gxo-orange: #FF6B35;
            --gxo-dark: #1a1a1a;
            --gxo-light: #f5f5f5;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          }
          .gxo-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .gxo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 61, 165, 0.2);
          }
          .gxo-btn {
            transition: all 0.2s ease;
          }
          .gxo-btn:hover {
            transform: scale(1.05);
          }
          .checklist-item {
            transition: all 0.3s ease;
          }
          .checklist-item.checked {
            opacity: 0.6;
            text-decoration: line-through;
          }
          @media print {
            .no-print { display: none !important; }
          }
          
          /* Animations pour notifications */
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fade-out {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          .animate-fade-out {
            animation: fade-out 0.3s ease-out;
          }
          
          /* Styles pour les étoiles */
          .star-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
          }
          .star-btn:hover {
            filter: brightness(1.2);
          }
          
          /* Animations pour le logo de connexion */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-shimmer {
            animation: shimmer 3s ease-in-out infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          /* Animations pour la scène logistique de connexion */
          @keyframes truck-bounce {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes box-slide {
            0% {
              transform: translateX(0) translateY(0);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(30px) translateY(-10px);
              opacity: 0;
            }
          }
          
          @keyframes forklift-move {
            0%, 100% {
              transform: translateX(0) translateY(-50%);
            }
            50% {
              transform: translateX(15px) translateY(-50%);
            }
          }
          
          @keyframes worker-wave {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(15deg);
            }
            75% {
              transform: rotate(-15deg);
            }
          }
          
          @keyframes check-pop {
            0%, 100% {
              transform: scale(1);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
            }
            90% {
              opacity: 1;
            }
          }
          
          @keyframes arrow-flow {
            0%, 100% {
              opacity: 0.3;
              transform: translateX(0);
            }
            50% {
              opacity: 1;
              transform: translateX(10px);
            }
          }
          
          .animate-truck-bounce {
            animation: truck-bounce 2s ease-in-out infinite;
          }
          
          .animate-box-slide {
            animation: box-slide 2s ease-in-out infinite;
          }
          
          .animate-forklift-move {
            animation: forklift-move 4s ease-in-out infinite;
          }
          
          .animate-worker-wave {
            animation: worker-wave 1.5s ease-in-out infinite;
          }
          
          .animate-check-pop {
            animation: check-pop 3s ease-in-out infinite;
          }
          
          .animate-check-1 {
            animation: fade-in 0.5s ease-out;
          }
          
          .animate-check-2 {
            animation: fade-in 0.5s ease-out 1s;
          }
          
          .animate-check-3 {
            animation: fade-in 0.5s ease-out 2s;
          }
          
          .animate-arrow-flow {
            animation: arrow-flow 2s ease-in-out infinite;
          }
          
          /* Titre de navigation - Desktop */
          nav .text-lg {
            font-size: 1.125rem;
            line-height: 1.4;
            font-weight: 700;
            letter-spacing: 0.3px;
          }
          nav .text-xs {
            font-size: 0.75rem;
            opacity: 0.9;
            font-weight: 400;
          }
          
          /* Mode Mobile Simulator */
          /* Mode Mobile - Optimisé pour petits écrans */
          body.mobile-mode {
            max-width: 430px;
            margin: 0 auto;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
            font-size: 15px;
            line-height: 1.6;
          }
          body.mobile-mode .container {
            max-width: 100%;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          /* Navigation mobile compacte */
          body.mobile-mode nav {
            border-radius: 0;
          }
          body.mobile-mode nav #nav-container {
            flex-direction: column;
            padding: 0.75rem;
            gap: 0.75rem;
            align-items: center;
          }
          
          /* Logo et titre centrés en mobile */
          body.mobile-mode nav #nav-container > a {
            width: 100%;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode nav #nav-container > a .flex {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          body.mobile-mode nav img {
            height: 40px;
            margin: 0 auto;
          }
          body.mobile-mode nav .border-l {
            border-left: none;
            padding-left: 0;
            text-align: center;
            width: 100%;
          }
          
          /* Titre en mobile - Plus lisible */
          body.mobile-mode nav .text-lg {
            font-size: 1.1rem;
            line-height: 1.3;
          }
          body.mobile-mode nav .text-xs {
            font-size: 0.85rem;
            margin-top: 0.125rem;
          }
          
          /* Menu de navigation mobile */
          body.mobile-mode nav #nav-links {
            flex-direction: column;
            width: 100%;
            margin-top: 0;
            gap: 0;
            align-items: stretch;
          }
          body.mobile-mode nav #nav-links a {
            width: 100%;
            text-align: left;
            padding: 0.875rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            min-height: 48px;
          }
          body.mobile-mode nav #nav-links a:last-child {
            border-bottom: none;
          }
          body.mobile-mode nav #nav-links a i {
            margin-right: 0.75rem;
            width: 24px;
            text-align: center;
            font-size: 1.1rem;
          }
          body.mobile-mode nav #nav-links a span {
            font-size: 1rem;
          }
          
          /* Typographie mobile */
          body.mobile-mode h1 {
            font-size: 1.75rem;
            line-height: 1.3;
            margin-bottom: 1rem;
          }
          body.mobile-mode h2 {
            font-size: 1.4rem;
            line-height: 1.3;
            margin-bottom: 0.875rem;
          }
          body.mobile-mode h3 {
            font-size: 1.15rem;
            line-height: 1.3;
            margin-bottom: 0.75rem;
          }
          
          /* Cartes mobile */
          body.mobile-mode .gxo-card,
          body.mobile-mode .bg-white.rounded-lg.shadow-md {
            padding: 1rem;
            margin-bottom: 0.875rem;
          }
          
          /* Alignement des éléments dans les cartes */
          body.mobile-mode .gxo-card > *,
          body.mobile-mode .bg-white > * {
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: left;
          }
          
          /* Flex items en mobile - tout aligner à gauche */
          body.mobile-mode .flex {
            align-items: flex-start;
          }
          body.mobile-mode .flex.items-center {
            align-items: center;
          }
          
          /* Corriger les marges négatives */
          body.mobile-mode [class*="-mx-"],
          body.mobile-mode [class*="mx-"] {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          /* Corriger les paddings négatifs */
          body.mobile-mode [class*="-px-"] {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          /* Boutons mobile */
          body.mobile-mode button,
          body.mobile-mode .gxo-btn {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            min-height: 44px;
          }
          
          /* Inputs mobile */
          body.mobile-mode input,
          body.mobile-mode textarea,
          body.mobile-mode select {
            font-size: 16px !important;
            padding: 0.75rem !important;
            min-height: 48px;
            width: 100%;
            box-sizing: border-box;
          }
          
          /* Groupes de formulaire mobile */
          body.mobile-mode .form-group,
          body.mobile-mode .input-group {
            margin-bottom: 1rem;
            width: 100%;
          }
          
          /* Labels mobile plus lisibles */
          body.mobile-mode label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
            font-weight: 500;
          }
          
          /* Grilles mobile - empilage vertical */
          body.mobile-mode .grid {
            grid-template-columns: 1fr !important;
            gap: 0.875rem;
          }
          
          /* Espacement mobile réduit */
          body.mobile-mode main {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          
          /* Tableaux mobile - scroll horizontal */
          body.mobile-mode table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
            font-size: 0.9rem;
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }
          body.mobile-mode table td,
          body.mobile-mode table th {
            padding: 0.5rem 0.75rem;
            min-width: 100px;
          }
          
          /* Listes mobile */
          body.mobile-mode ul,
          body.mobile-mode ol {
            padding-left: 1.25rem;
            margin-bottom: 1rem;
          }
          body.mobile-mode li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
          }
          
          /* Images mobile responsive */
          body.mobile-mode img {
            max-width: 100%;
            height: auto;
          }
          
          /* Header/Ruban page d'accueil - Mobile */
          body.mobile-mode .bg-gradient-to-r {
            padding: 1.5rem 1rem;
          }
          body.mobile-mode .bg-gradient-to-r .flex.items-center.justify-between {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
          }
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
            width: 100%;
          }
          
          /* Aligner les deux logos verticalement avec le compteur 70 */
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0;
          }
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 img {
            height: 3rem;
            order: 1;
            flex-shrink: 0;
          }
          body.mobile-mode .bg-gradient-to-r .flex.items-start.space-x-6 > div {
            order: 2;
            flex: 1;
            text-align: center;
            padding: 0 0.5rem;
          }
          
          body.mobile-mode .bg-gradient-to-r h1 {
            font-size: 1.75rem;
            text-align: center;
            line-height: 1.3;
            margin-bottom: 1rem;
          }
          body.mobile-mode .bg-gradient-to-r p {
            font-size: 1rem;
            text-align: center;
            margin-top: 0.5rem;
          }
          body.mobile-mode .bg-gradient-to-r .text-right {
            text-align: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          body.mobile-mode .bg-gradient-to-r .text-5xl {
            font-size: 3rem;
            order: 2;
          }
          body.mobile-mode .bg-gradient-to-r .text-sm {
            font-size: 0.875rem;
            order: 3;
          }
          
          /* Footer mobile compact */
          body.mobile-mode footer {
            font-size: 0.85rem;
            padding: 1rem 0.75rem;
          }
          
          /* Modals mobile plein écran */
          body.mobile-mode .fixed.inset-0 > div {
            max-width: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          
          /* Badges et tags mobile */
          body.mobile-mode .badge,
          body.mobile-mode .inline-flex.items-center {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
          }
          
          /* Icônes mobile légèrement plus grandes */
          body.mobile-mode i.fas,
          body.mobile-mode i.far {
            font-size: 1.1em;
          }
          
          /* Liens mobile avec zone tactile */
          body.mobile-mode a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
          
          /* PAGE CONTACTS - Mobile optimisé */
          body.mobile-mode #contacts-grid {
            grid-template-columns: 1fr !important;
          }
          body.mobile-mode .contact-card {
            padding: 1rem;
          }
          body.mobile-mode .contact-card h3 {
            font-size: 1.1rem;
          }
          body.mobile-mode .contact-info {
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode .contact-actions {
            flex-direction: column;
            width: 100%;
          }
          body.mobile-mode .contact-actions button {
            width: 100%;
          }
          
          /* PAGE BIBLIOTHÈQUE - Mobile optimisé */
          body.mobile-mode #documents-grid {
            grid-template-columns: 1fr !important;
          }
          body.mobile-mode .document-card {
            padding: 1rem;
          }
          body.mobile-mode .document-card h3 {
            font-size: 1rem;
            line-height: 1.3;
          }
          body.mobile-mode .document-actions {
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode .document-actions button {
            width: 100%;
          }
          
          /* Filtres mobile - Stack vertical */
          body.mobile-mode .filter-buttons,
          body.mobile-mode .service-filters {
            flex-direction: column !important;
            gap: 0.5rem;
          }
          body.mobile-mode .filter-buttons button {
            width: 100%;
            justify-content: center;
          }
          
          /* Barre de recherche mobile */
          body.mobile-mode .search-container {
            flex-direction: column;
            gap: 0.5rem;
          }
          body.mobile-mode .search-container input {
            width: 100%;
          }
          body.mobile-mode .search-container button {
            width: 100%;
          }
          
          /* Checklist mobile */
          body.mobile-mode .checklist-item {
            padding: 0.75rem;
            font-size: 0.95rem;
          }
          body.mobile-mode .checklist-item input[type="checkbox"] {
            width: 20px;
            height: 20px;
          }
          
          /* Arbre de décision mobile */
          body.mobile-mode .decision-tree-node {
            padding: 0.875rem;
            font-size: 0.95rem;
          }
          body.mobile-mode .decision-tree-option {
            padding: 0.75rem;
            margin: 0.5rem 0;
          }
          
          /* Bouton Toggle Desktop/Mobile */
          .viewport-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: linear-gradient(135deg, #00205B 0%, #003DA5 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 56px;
            height: 56px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 32, 91, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            position: relative;
          }
          .viewport-toggle:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 6px 20px rgba(0, 32, 91, 0.6);
          }
          .viewport-toggle:active {
            transform: scale(0.95);
          }
          
          /* Indicateur AUTO */
          .auto-indicator {
            position: absolute;
            bottom: -20px;
            right: 50%;
            transform: translateX(50%);
            background: #FF6B35;
            color: white;
            font-size: 8px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 10px;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 6px rgba(255, 107, 53, 0.4);
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          .auto-indicator.hidden {
            opacity: 0;
            pointer-events: none;
          }
          
          @media print {
            .viewport-toggle { display: none; }
          }
        ` }} />
      </head>
      <body class="bg-gray-50">
        <nav class="bg-[#00205B] text-white shadow-lg no-print" id="main-nav">
          <div class="container mx-auto px-4 py-3 flex items-center justify-between" id="nav-container">
            <a href="/" class="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img src="/static/gxo-logo.svg" alt="GXO Logistics" class="h-10" />
              <div class="border-l border-white/30 pl-3">
                <div class="text-lg font-bold">HUB Procédures Logistique</div>
                <div class="text-xs opacity-90">Moissy-Cramayel</div>
              </div>
            </a>
            <div class="flex items-center space-x-4" id="nav-links">
              <a href="/" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-home mr-2"></i><span>Accueil</span>
              </a>
              <a href="/bibliotheque" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-book mr-2"></i><span>Bibliothèque</span>
              </a>
              <a href="/contacts" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-address-book mr-2"></i><span>Contacts</span>
              </a>
              <a href="/anomalies" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-exclamation-triangle mr-2"></i><span>Anomalies</span>
              </a>
            </div>
          </div>
        </nav>
        
        <main class="container mx-auto px-4 py-8">
          {children}
        </main>
        
        {/* Modal Avis et Commentaires */}
        <div id="review-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 no-print">
          <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div class="bg-[#00205B] text-white p-6 rounded-t-lg">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold">Donner votre avis</h3>
                  <p class="text-sm opacity-75 mt-1" id="review-modal-title">Procédure</p>
                </div>
                <button onclick="closeReviewModal()" class="text-white hover:text-[#FF6B35] transition-colors text-2xl">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div class="p-6">
              {/* Formulaire d'avis */}
              <form id="review-form" onsubmit="submitReview(event)" class="mb-6">
                <input type="hidden" id="review-procedure-id" />
                
                {/* Note */}
                <div class="mb-6">
                  <label class="block text-gray-700 font-semibold mb-2">
                    <i class="fas fa-star text-yellow-500 mr-2"></i>
                    Votre note (optionnel)
                  </label>
                  <div id="rating-stars">
                    {/* Les étoiles seront générées par JavaScript */}
                  </div>
                </div>

                {/* Nom */}
                <div class="mb-4">
                  <label for="review-name" class="block text-gray-700 font-semibold mb-2">
                    <i class="fas fa-user mr-2"></i>
                    Votre nom (optionnel)
                  </label>
                  <input
                    type="text"
                    id="review-name"
                    placeholder="Anonyme"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#00205B] focus:outline-none"
                  />
                </div>

                {/* Commentaire */}
                <div class="mb-6">
                  <label for="review-comment" class="block text-gray-700 font-semibold mb-2">
                    <i class="fas fa-comment mr-2"></i>
                    Votre commentaire (optionnel)
                  </label>
                  <textarea
                    id="review-comment"
                    rows="4"
                    placeholder="Partagez votre expérience, des conseils, ou des suggestions d'amélioration..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#00205B] focus:outline-none resize-none"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">
                    Minimum 10 caractères recommandé
                  </p>
                </div>

                {/* Boutons */}
                <div class="flex gap-3">
                  <button
                    type="submit"
                    class="flex-1 bg-[#00205B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003DA5] transition-colors"
                  >
                    <i class="fas fa-paper-plane mr-2"></i>
                    Publier
                  </button>
                  <button
                    type="button"
                    onclick="closeReviewModal()"
                    class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>

              {/* Liste des avis */}
              <div class="border-t pt-6">
                <h4 class="text-xl font-bold text-gray-800 mb-4">
                  <i class="fas fa-comments mr-2"></i>
                  Avis de la communauté
                </h4>
                <div id="reviews-list">
                  {/* Les avis seront chargés par JavaScript */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer class="bg-gray-800 text-white py-6 mt-12 no-print">
          <div class="container mx-auto px-4 text-center">
            <p class="text-sm">© 2026 GXO Logistics - Site de Moissy-Cramayel</p>
            <p class="text-xs mt-2 opacity-75">Intranet des procédures logistiques</p>
          </div>
        </footer>
        
        {/* Bouton Toggle Desktop/Mobile */}
        <button 
          id="viewport-toggle" 
          class="viewport-toggle no-print" 
          onclick="toggleViewportMode()"
          title="Mode adaptatif automatique - Cliquez pour forcer un mode"
        >
          <i id="viewport-icon" class="fas fa-mobile-alt"></i>
          <span id="auto-indicator" class="auto-indicator">AUTO</span>
        </button>
        
        <script src="/static/auth.js"></script>
        <script src="/static/app.js"></script>
        <script src="/static/reviews.js"></script>
        <script src="/static/onboarding.js"></script>
        <script src="/static/decision-tree.js"></script>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
        ` }} />
      </body>
    </html>
  )
})
