import pages from '@hono/vite-cloudflare-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    pages()
  ],
  // Copier les fichiers statiques vers dist/
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    outDir: 'dist'
  }
})
