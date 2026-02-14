import pages from '@hono/vite-cloudflare-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    pages({
      // Configuration pour _routes.json
      // Exclure les fichiers HTML statiques du Worker
      exclude: [
        '/*.html',
        '/consignes/*',
        '/static/*'
      ]
    })
  ],
  // Copier les fichiers statiques vers dist/
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    outDir: 'dist'
  }
})
