#!/bin/bash

echo "🔍 Configuration du repository GitHub..."

# Demander l'URL du repository
echo ""
echo "📝 Quelle est l'URL de votre repository GitHub ?"
echo "Format: https://github.com/USERNAME/REPO.git"
echo ""
read -p "URL du repository: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Erreur : URL vide"
    exit 1
fi

# Configurer le remote
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

echo "✅ Remote configuré : $REPO_URL"
echo ""

# Vérifier les modifications
echo "📊 État du repository :"
git status

echo ""
echo "🚀 Push vers GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ✅ ✅ CODE POUSSÉ AVEC SUCCÈS ! ✅ ✅ ✅"
    echo ""
    echo "📱 Le déploiement GitHub Actions va démarrer automatiquement !"
    echo ""
    echo "🔗 Allez voir les logs ici :"
    echo "   ${REPO_URL%.git}/actions"
    echo ""
    echo "⏱️  Durée estimée : 5-7 minutes"
    echo ""
    echo "🌐 URL finale : https://gxo-procedures-moissy.pages.dev"
else
    echo ""
    echo "❌ Erreur lors du push"
    echo ""
    echo "💡 SOLUTION : Configurez les secrets GitHub d'abord :"
    echo "   1. Allez sur ${REPO_URL%.git}/settings/secrets/actions"
    echo "   2. Ajoutez CLOUDFLARE_API_TOKEN"
    echo "   3. Ajoutez CLOUDFLARE_ACCOUNT_ID"
    echo "   4. Relancez ce script"
fi
