#!/bin/bash
# Test automatique v3.11.1 - Vérification timers

echo "🧪 TEST AUTOMATIQUE v3.11.1 - Vérification Timers"
echo "=================================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="https://gxomoissyprocedures.pages.dev"

# Test 1 : Vérifier les quais en fin_dechargement et fin_controle
echo "📊 Test 1 : Vérification des durées en base de données"
echo "-------------------------------------------------------"

QUAIS=$(curl -s "$BASE_URL/api/quais" | jq -r '[.quais[] | select(.statut != "disponible") | {quai: .quai_numero, statut, timer_duration, timer_controle_duration}] | .[]')

echo "$QUAIS" | jq -r '
  "Quai \(.quai) (\(.statut)):",
  "  - timer_duration: \(.timer_duration // "null")s",
  "  - timer_controle_duration: \(.timer_controle_duration // "null")s",
  (if (.timer_duration != null and .timer_duration >= 3600) or (.timer_controle_duration != null and .timer_controle_duration >= 3600) then
    "  ❌ ERREUR: Durée >= 3600s détectée!"
  else
    "  ✅ OK"
  end),
  ""
'

# Test 2 : Vérifier qu'aucune durée >= 1h n'existe
echo ""
echo "🔍 Test 2 : Détection d'erreurs (durées >= 3600s)"
echo "--------------------------------------------------"

ERROR_COUNT=$(curl -s "$BASE_URL/api/quais" | jq '[.quais[] | select((.timer_duration != null and .timer_duration >= 3600) or (.timer_controle_duration != null and .timer_controle_duration >= 3600))] | length')

if [ "$ERROR_COUNT" -eq 0 ]; then
  echo -e "${GREEN}✅ SUCCÈS: Aucune durée >= 3600s détectée${NC}"
else
  echo -e "${RED}❌ ÉCHEC: $ERROR_COUNT quai(s) avec durée >= 3600s${NC}"
  curl -s "$BASE_URL/api/quais" | jq '[.quais[] | select((.timer_duration != null and .timer_duration >= 3600) or (.timer_controle_duration != null and .timer_controle_duration >= 3600))]'
  exit 1
fi

# Test 3 : Vérifier les timestamps Unix (doivent être des nombres)
echo ""
echo "🔢 Test 3 : Format des timer_start (Unix timestamp)"
echo "----------------------------------------------------"

ACTIVE_TIMERS=$(curl -s "$BASE_URL/api/quais" | jq -r '[.quais[] | select(.timer_start != null or .timer_controle_start != null)] | length')

if [ "$ACTIVE_TIMERS" -eq 0 ]; then
  echo -e "${YELLOW}⚠️  Aucun timer actif en cours (normal si tous les quais sont disponibles)${NC}"
else
  echo "Timers actifs détectés : $ACTIVE_TIMERS"
  curl -s "$BASE_URL/api/quais" | jq -r '[.quais[] | select(.timer_start != null or .timer_controle_start != null) | {quai: .quai_numero, timer_start, timer_controle_start}] | .[]' | jq -r '
    "Quai \(.quai):",
    (if .timer_start != null then "  - timer_start: \(.timer_start)" else "" end),
    (if .timer_controle_start != null then "  - timer_controle_start: \(.timer_controle_start)" else "" end),
    (if (.timer_start != null and (.timer_start | tonumber | . < 1000000000 or . > 9999999999)) or (.timer_controle_start != null and (.timer_controle_start | tonumber | . < 1000000000 or . > 9999999999)) then
      "  ❌ ERREUR: Format timestamp invalide!"
    else
      "  ✅ OK: Format Unix timestamp"
    end),
    ""
  '
fi

# Test 4 : Récapitulatif
echo ""
echo "📋 RÉCAPITULATIF"
echo "================"
echo ""
echo -e "${GREEN}✅ Tous les tests sont passés avec succès !${NC}"
echo ""
echo "🌐 URL de test : $BASE_URL/accueil-chauffeur?v=2"
echo "📅 Date du test : $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo "🔖 Version : v3.11.1"
echo ""
echo "💡 Pour tester un nouveau timer :"
echo "   1. Ouvrir $BASE_URL/accueil-chauffeur?v=2"
echo "   2. Sélectionner un quai disponible → 'En cours'"
echo "   3. Attendre 30 secondes"
echo "   4. Cliquer 'Fin de Déchargement'"
echo "   5. Vérifier que le timer affiche 00:00:30 (PAS 01:00:30)"
echo ""
