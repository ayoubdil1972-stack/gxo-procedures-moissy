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
        ` }} />
      </head>
      <body class="bg-gray-50">
        <nav class="bg-[#00205B] text-white shadow-lg no-print">
          <div class="container mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img src="/static/gxo-logo.svg" alt="GXO Logistics" class="h-10" />
              <div class="border-l border-white/30 pl-3">
                <div class="text-sm font-semibold">Intranet Moissy-Cramayel</div>
              </div>
            </a>
            <div class="flex items-center space-x-4">
              <a href="/" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-home mr-2"></i>Accueil
              </a>
              <a href="/bibliotheque" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-book mr-2"></i>Bibliothèque
              </a>
              <a href="/contacts" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-address-book mr-2"></i>Contacts
              </a>
              <a href="/anomalies" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-exclamation-triangle mr-2"></i>Anomalies
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
