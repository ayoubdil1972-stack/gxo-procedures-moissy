#!/bin/bash
# Script de test automatique pour valider le fix timer +1h

echo "🧪 TEST AUTOMATIQUE - Fix Timer +1h v3.5.11"
echo "============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_URL="https://gxomoissyprocedures.com"
TEST_QUAI=101  # Quai de test (en dehors des 45 quais réels)

echo "📍 API URL: $API_URL"
echo "🚪 Quai de test: $TEST_QUAI"
echo ""

# Test 1: Vérifier que l'API répond
echo "📡 Test 1: Vérification de l'API..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/quais")
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✅ API répond (HTTP 200)${NC}"
else
    echo -e "${RED}❌ API ne répond pas (HTTP $STATUS)${NC}"
    exit 1
fi
echo ""

# Test 2: Trouver un quai disponible
echo "🔍 Test 2: Recherche d'un quai disponible..."
AVAILABLE_QUAI=$(curl -s "$API_URL/api/quais" | jq -r '.quais[] | select(.statut == "disponible") | .quai_numero' | head -1)
if [ -n "$AVAILABLE_QUAI" ]; then
    echo -e "${GREEN}✅ Quai disponible trouvé: $AVAILABLE_QUAI${NC}"
    TEST_QUAI=$AVAILABLE_QUAI
else
    echo -e "${YELLOW}⚠️  Aucun quai disponible, utilisation du quai par défaut${NC}"
fi
echo ""

# Test 3: Vérifier les dernières entrées créées
echo "📊 Test 3: Analyse des dernières entrées..."
echo "Entrées des 30 dernières minutes:"
curl -s "$API_URL/api/quais" | jq -r '.quais[] | select(.statut == "fin_dechargement" or .statut == "fin_controle") | select(.updated_at > "2026-03-08 13:30") | {quai_numero, statut, timer_duration, timer_controle_duration, updated_at}' | head -20

echo ""
echo "🔍 Analyse des timers:"
INCORRECT_COUNT=$(curl -s "$API_URL/api/quais" | jq '[.quais[] | select(.statut == "fin_dechargement" or .statut == "fin_controle") | select(.updated_at > "2026-03-08 14:00") | select(.timer_duration > 3600 or .timer_controle_duration > 3600)] | length')
CORRECT_COUNT=$(curl -s "$API_URL/api/quais" | jq '[.quais[] | select(.statut == "fin_dechargement" or .statut == "fin_controle") | select(.updated_at > "2026-03-08 14:00") | select(.timer_duration <= 3600 and .timer_controle_duration <= 3600)] | length')

echo "Après déploiement (14:00 UTC):"
echo -e "  ${GREEN}✅ Timers corrects (<3600s): $CORRECT_COUNT${NC}"
echo -e "  ${RED}❌ Timers incorrects (>3600s): $INCORRECT_COUNT${NC}"
echo ""

# Test 4: Vérification du code déployé
echo "🔍 Test 4: Vérification du worker déployé..."
echo "Tentative de détecter la version du worker..."
WORKER_CONTENT=$(curl -s "$API_URL/" | head -100)
if echo "$WORKER_CONTENT" | grep -q "v3.5.11\|v3.5.10"; then
    echo -e "${GREEN}✅ Version détectée dans le HTML${NC}"
else
    echo -e "${YELLOW}⚠️  Version non détectable dans le HTML${NC}"
fi
echo ""

# Test 5: Recommandations
echo "📋 Recommandations:"
echo ""
if [ "$INCORRECT_COUNT" -gt 0 ]; then
    echo -e "${RED}⚠️  DES TIMERS INCORRECTS SONT ENCORE PRÉSENTS${NC}"
    echo ""
    echo "Actions à faire:"
    echo "1. Vérifier que le déploiement Cloudflare est terminé"
    echo "2. Appliquer le script SQL de correction:"
    echo ""
    echo "   UPDATE quai_status"
    echo "   SET timer_duration = timer_duration - 3600"
    echo "   WHERE timer_duration > 3600;"
    echo ""
    echo "3. Vider le cache du navigateur (Ctrl+Shift+R)"
    echo "4. Tester avec un NOUVEAU cycle complet"
    echo ""
else
    echo -e "${GREEN}✅ AUCUN TIMER INCORRECT DÉTECTÉ${NC}"
    echo ""
    echo "Le fix semble fonctionner correctement !"
    echo ""
    echo "Pour valider complètement:"
    echo "1. Scanner un nouveau quai de déchargement"
    echo "2. Attendre quelques secondes"
    echo "3. Terminer le déchargement"
    echo "4. Vérifier que le timer affiche la durée exacte (ex: 00:00:30)"
    echo ""
fi

echo "============================================="
echo "🏁 Tests terminés"
echo ""
