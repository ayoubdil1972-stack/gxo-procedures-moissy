#!/bin/bash
# Script de déploiement manuel Cloudflare Pages

echo "🚀 Déploiement Manuel - GXO Moissy v2"
echo "===================================="
echo ""

# Vérifier que dist/ existe
if [ ! -d "dist" ]; then
  echo "❌ Erreur : Le dossier dist/ n'existe pas"
  echo "Exécutez d'abord : npm run build"
  exit 1
fi

# Vérifier les fichiers critiques
echo "📂 Vérification des fichiers..."
if [ -d "dist/taches" ]; then
  echo "✅ Dossier dist/taches/ trouvé"
  TACHES_COUNT=$(ls dist/taches/*.html 2>/dev/null | wc -l)
  echo "   → $TACHES_COUNT fichiers HTML trouvés"
else
  echo "❌ Erreur : dist/taches/ manquant"
  exit 1
fi

if [ -f "dist/_routes.json" ]; then
  echo "✅ Configuration dist/_routes.json trouvée"
else
  echo "❌ Erreur : dist/_routes.json manquant"
  exit 1
fi

if [ -f "dist/_worker.js" ]; then
  echo "✅ Worker dist/_worker.js trouvé"
else
  echo "❌ Erreur : dist/_worker.js manquant"
  exit 1
fi

echo ""
echo "📦 Contenu de dist/taches/ :"
ls -1 dist/taches/*.html | sed 's/dist\//   → /'

echo ""
echo "🔧 Configuration _routes.json :"
cat dist/_routes.json | sed 's/^/   /'

echo ""
echo "✅ Tous les fichiers sont prêts pour le déploiement"
echo ""
echo "📋 ÉTAPES SUIVANTES :"
echo ""
echo "1️⃣  Aller sur le Deploy Tab dans GenSpark"
echo "2️⃣  Configurer votre Cloudflare API Key"
echo "3️⃣  Revenir ici et exécuter :"
echo ""
echo "    npx wrangler pages deploy dist --project-name gxo-moissy-v2"
echo ""
echo "Ou bien :"
echo ""
echo "🌐 DÉPLOIEMENT VIA DASHBOARD CLOUDFLARE :"
echo ""
echo "1. Aller sur https://dash.cloudflare.com"
echo "2. Workers & Pages → gxo-moissy-v2"
echo "3. Onglet 'Settings'"
echo "4. Section 'Build configuration'"
echo "5. Vérifier que 'Build output directory' = 'dist'"
echo "6. Forcer un redéploiement en créant un commit vide :"
echo ""
echo "   git commit --allow-empty -m 'chore: trigger redeployment'"
echo "   git push origin main"
echo ""
echo "⏱️  Le déploiement prendra 2-3 minutes"
echo ""
