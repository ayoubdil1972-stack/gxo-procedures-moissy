#!/bin/bash

echo "🚀 DÉPLOIEMENT AUTOMATIQUE v3.5.8"
echo "=================================="
echo ""

# Vérifier que dist/ existe
if [ ! -d "dist" ]; then
  echo "❌ Erreur: dossier dist/ introuvable"
  echo "Exécutez 'npm run build' d'abord"
  exit 1
fi

echo "📦 Fichiers à déployer:"
ls -lh dist/ | head -10

echo ""
echo "🔄 Déploiement vers Cloudflare Pages..."
echo "Projet: gxo-procedures-moissy"
echo "Branche: main"
echo ""

# Déployer avec wrangler
npx wrangler pages deploy dist \
  --project-name gxo-procedures-moissy \
  --branch main \
  --commit-message "v3.5.8 - Fix heure déchargement (utilise updated_at)" \
  --commit-hash "c101ba1"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ DÉPLOIEMENT RÉUSSI !"
  echo ""
  echo "🌐 URLs de production:"
  echo "   https://gxomoissyprocedures.com"
  echo "   https://gxo-procedures-moissy.pages.dev"
  echo ""
  echo "⏱️  Attendre 2-3 minutes pour la propagation"
  echo ""
  echo "🧪 Pour tester:"
  echo "   1. Vider le cache: Ctrl+Shift+R"
  echo "   2. Scanner 'Fin déchargement' quai 75"
  echo "   3. Vérifier l'heure affichée"
else
  echo ""
  echo "❌ ERREUR DÉPLOIEMENT"
  echo "Vérifiez votre configuration Cloudflare"
  exit 1
fi
