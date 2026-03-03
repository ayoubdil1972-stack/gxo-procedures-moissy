#!/bin/bash
# Script de test de la clé API Google Cloud Translation

echo "🔍 Test de la clé API Google Cloud Translation"
echo "================================================"
echo ""

# Demander la clé API
read -p "Entrez votre clé API Google Cloud Translation: " API_KEY
echo ""

# Texte de test en italien
TEST_TEXT="Ho bisogno di aiuto"
echo "📝 Texte de test (italien): $TEST_TEXT"
echo ""

# Appel API
echo "🌐 Appel de l'API Google Cloud Translation..."
RESPONSE=$(curl -s "https://translation.googleapis.com/language/translate/v2?key=${API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"q\": \"$TEST_TEXT\",
    \"target\": \"fr\"
  }")

echo ""
echo "📦 Réponse API:"
echo "$RESPONSE" | jq '.'

# Extraire la traduction
TRANSLATION=$(echo "$RESPONSE" | jq -r '.data.translations[0].translatedText // empty')
DETECTED_LANG=$(echo "$RESPONSE" | jq -r '.data.translations[0].detectedSourceLanguage // empty')
ERROR=$(echo "$RESPONSE" | jq -r '.error.message // empty')

echo ""
echo "================================================"

if [ -n "$ERROR" ]; then
  echo "❌ ERREUR: $ERROR"
  echo ""
  echo "Causes possibles:"
  echo "- Clé API invalide"
  echo "- API Cloud Translation non activée"
  echo "- Restrictions API incorrectes"
  echo ""
  echo "Solution:"
  echo "1. Vérifier la clé sur: https://console.cloud.google.com/apis/credentials"
  echo "2. Activer l'API: https://console.cloud.google.com/apis/library/translate.googleapis.com"
  exit 1
fi

if [ -n "$TRANSLATION" ]; then
  echo "✅ SUCCÈS!"
  echo ""
  echo "Langue détectée: $DETECTED_LANG (italien)"
  echo "Traduction: $TRANSLATION"
  echo ""
  echo "✅ La clé API fonctionne correctement!"
  echo ""
  echo "Prochaine étape:"
  echo "Ajouter la clé dans Cloudflare Pages:"
  echo "  Variable: GOOGLE_TRANSLATE_API_KEY"
  echo "  Value: $API_KEY"
  echo ""
  echo "Dashboard: https://dash.cloudflare.com → Pages → gxo-procedures-moissy → Settings → Environment variables"
else
  echo "❌ Réponse inattendue de l'API"
  echo ""
  echo "Réponse complète ci-dessus"
  exit 1
fi
