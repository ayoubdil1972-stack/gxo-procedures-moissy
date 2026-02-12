import { jsxRenderer } from 'hono/jsx-renderer'

// Renderer simple SANS menu de navigation (pour pages chauffeur)
export const simpleRenderer = jsxRenderer(({ children }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GXO Logistics - Chauffeur</title>
        <script dangerouslySetInnerHTML={{ __html: `
          const originalWarn = console.warn;
          console.warn = function(...args) {
            if (args[0] && args[0].includes && args[0].includes('cdn.tailwindcss.com')) return;
            originalWarn.apply(console, args);
          };
        ` }} />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-black">
        {children}
      </body>
    </html>
  )
})
