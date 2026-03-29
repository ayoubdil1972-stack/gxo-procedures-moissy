#!/bin/bash
set -e

# Configuration
source /home/user/webapp/.env.deploy
PROJECT_NAME="gxomoissyprocedures"
DIST_DIR="/home/user/webapp/dist"

echo "🚀 Déploiement Direct v3.11.31 vers Cloudflare Pages"
echo "=================================================="
echo ""

# 1. Créer un manifest des fichiers
echo "📦 Création du manifest..."
cd "$DIST_DIR"

# Compter les fichiers
FILE_COUNT=$(find . -type f | wc -l)
echo "   Fichiers à déployer: $FILE_COUNT"

# Créer le manifest JSON
MANIFEST='{'
FIRST=true
while IFS= read -r -d '' file; do
    # Enlever le "./" du début
    path="${file#./}"
    
    # Calculer le hash
    hash=$(sha256sum "$file" | cut -d' ' -f1)
    
    if [ "$FIRST" = true ]; then
        FIRST=false
    else
        MANIFEST+=','
    fi
    
    MANIFEST+="\"/$path\":\"$hash\""
done < <(find . -type f -print0 | head -z -n 10)

MANIFEST+='}'

echo "   Manifest créé (10 premiers fichiers pour test)"

# 2. Créer le déploiement via API
echo ""
echo "🔄 Création du déploiement sur Cloudflare..."

DEPLOY_RESPONSE=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"branch\": \"main\",
    \"manifest\": $MANIFEST
  }")

SUCCESS=$(echo "$DEPLOY_RESPONSE" | jq -r '.success')

if [ "$SUCCESS" = "true" ]; then
    DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | jq -r '.result.id')
    DEPLOY_URL=$(echo "$DEPLOY_RESPONSE" | jq -r '.result.url')
    
    echo "✅ Déploiement créé avec succès!"
    echo "   ID: $DEPLOY_ID"
    echo "   URL: $DEPLOY_URL"
    echo ""
    echo "🔼 Upload des fichiers en cours..."
    echo "   (Cette étape nécessite l'upload individuel de chaque fichier)"
    echo ""
    echo "⚠️  Note: L'upload complet nécessite un script plus complexe."
    echo "   Utilisez plutôt: npx wrangler pages deploy dist --project-name gxomoissyprocedures"
else
    echo "❌ Erreur lors de la création du déploiement:"
    echo "$DEPLOY_RESPONSE" | jq -r '.errors[]?.message'
fi
