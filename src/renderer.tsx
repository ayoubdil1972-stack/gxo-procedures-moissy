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
              <a href="/anomalies" class="hover:text-[#FF6B35] transition-colors">
                <i class="fas fa-exclamation-triangle mr-2"></i>Anomalies
              </a>
            </div>
          </div>
        </nav>
        
        <main class="container mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer class="bg-gray-800 text-white py-6 mt-12 no-print">
          <div class="container mx-auto px-4 text-center">
            <p class="text-sm">© 2026 GXO Logistics - Site de Moissy-Cramayel</p>
            <p class="text-xs mt-2 opacity-75">Intranet des procédures logistiques</p>
          </div>
        </footer>
        
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
