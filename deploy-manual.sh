#!/bin/bash
# Script de déploiement manuel Cloudflare Pages

echo "🚀 Déploiement Manuel GXO Moissy v3.7.0"
echo "========================================"
echo ""

# 1. Vérifier qu'on est sur la branche main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Erreur: Vous n'êtes pas sur la branche main (branche actuelle: $BRANCH)"
    exit 1
fi
echo "✅ Branche: main"

# 2. Vérifier qu'il n'y a pas de modifications non commitées
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Il y a des modifications non commitées"
    git status
    exit 1
fi
echo "✅ Pas de modifications non commitées"

# 3. Récupérer le dernier commit
LAST_COMMIT=$(git log -1 --oneline)
echo "📝 Dernier commit: $LAST_COMMIT"
echo ""

# 4. Build du projet
echo "🔨 Build du projet..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi
echo "✅ Build réussi"
echo ""

# 5. Déploiement vers Cloudflare Pages
echo "☁️  Déploiement vers Cloudflare Pages..."
echo "   Projet: gxo-procedures-moissy"
echo "   Branche: main"
echo ""

# Vérifier si wrangler est installé
if ! command -v wrangler &> /dev/null; then
    echo "❌ Erreur: wrangler n'est pas installé"
    echo "   Installation: npm install -g wrangler"
    exit 1
fi

# Déployer
npx wrangler pages deploy dist --project-name=gxo-procedures-moissy --branch=main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Déploiement réussi!"
    echo ""
    echo "🔗 URLs de production:"
    echo "   https://gxomoissyprocedures.com"
    echo "   https://gxo-procedures-moissy.pages.dev"
    echo ""
    echo "⏱️  Le déploiement peut prendre 2-5 minutes pour se propager"
else
    echo ""
    echo "❌ Erreur lors du déploiement"
    echo ""
    echo "Solutions possibles:"
    echo "1. Vérifier que CLOUDFLARE_API_TOKEN est défini"
    echo "2. Se connecter: npx wrangler login"
    echo "3. Vérifier les permissions du token"
fi
