#!/bin/bash
# Script de build pour Cloudflare Pages

echo "🔧 Building with Vite..."
npm run build:real

echo ""
echo "🔄 Copying static HTML files from public/ to dist/"

# Copier les fichiers HTML statiques
cp -v public/*.html dist/ 2>/dev/null || true

# Copier les dossiers static, chauffeur, consignes
cp -rv public/static/* dist/static/ 2>/dev/null || true
cp -rv public/chauffeur/* dist/chauffeur/ 2>/dev/null || true
cp -rv public/consignes/* dist/consignes/ 2>/dev/null || true

echo ""
echo "✅ Files ready for deployment:"
ls -lh dist/ | head -10
echo ""
echo "✅ Build completed successfully"
exit 0
