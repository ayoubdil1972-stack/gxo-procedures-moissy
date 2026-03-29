#!/bin/bash
source .env.deploy

echo "🔍 Test des permissions du token Cloudflare"
echo "==========================================="
echo ""

# Test 1: Vérifier le token
echo "1️⃣  Vérification du token..."
TOKEN_INFO=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")

echo "$TOKEN_INFO" | jq -r '.success, .result.status // "error"'
echo ""

# Test 2: Lister les projets Pages
echo "2️⃣  Test: Lister les projets Pages..."
PROJECTS=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")

echo "$PROJECTS" | jq -r '.success, .errors[]?.message // "OK"'
echo ""

# Test 3: Obtenir les détails du projet
echo "3️⃣  Test: Détails du projet gxomoissyprocedures..."
PROJECT=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/gxomoissyprocedures" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")

echo "$PROJECT" | jq -r '.success, .errors[]?.message // "OK"'
echo ""

# Test 4: Lister les déploiements
echo "4️⃣  Test: Lister les déploiements..."
DEPLOYMENTS=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/gxomoissyprocedures/deployments" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN")

echo "$DEPLOYMENTS" | jq -r '.success, .errors[]?.message // "OK"'
echo ""

echo "✅ Tests terminés"
