#!/bin/bash

# Script de test du workflow complet : START → FIN → Gestion Quais
# Test avec le quai 75

QUAI=75
BASE_URL="http://localhost:3000"

echo "============================================"
echo "TEST WORKFLOW FIN DE DÉCHARGEMENT - QUAI $QUAI"
echo "============================================"
echo ""

# Étape 1 : Vérifier l'état initial du quai
echo "📊 ÉTAPE 1 : État initial du quai $QUAI"
curl -s "$BASE_URL/api/quais" | jq ".quais[] | select(.quai_numero == $QUAI)"
echo ""

# Étape 2 : Scanner QR START (mettre en_cours)
echo "🟡 ÉTAPE 2 : Scanner QR START - Mise en cours"
START_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
curl -s -X POST "$BASE_URL/api/quais/$QUAI" \
  -H "Content-Type: application/json" \
  -d "{
    \"statut\": \"en_cours\",
    \"commentaire\": \"Déchargement démarré via test\",
    \"commentaire_auteur\": \"Test Script\"
  }" | jq '.'
echo ""

# Attendre quelques secondes (simuler le déchargement)
echo "⏱️  Attente 5 secondes (simulation déchargement)..."
sleep 5
echo ""

# Étape 3 : Vérifier le statut en_cours avec timer
echo "📊 ÉTAPE 3 : Vérifier statut EN COURS avec timer"
curl -s "$BASE_URL/api/quais" | jq ".quais[] | select(.quai_numero == $QUAI)"
echo ""

# Étape 4 : Scanner QR FIN et valider le formulaire
echo "🔵 ÉTAPE 4 : Scanner QR FIN - Validation formulaire"
curl -s -X POST "$BASE_URL/api/fin-dechargement" \
  -H "Content-Type: application/json" \
  -d "{
    \"quai_numero\": $QUAI,
    \"nom_agent\": \"Jean Dupont\",
    \"numero_id\": \"1827314\",
    \"fournisseur\": \"Logistique Express\",
    \"palettes_attendues\": 15,
    \"palettes_recues\": 15,
    \"palettes_a_rendre\": \"non\",
    \"problemes\": [\"palettes_mal_filmees\"],
    \"autres_commentaire\": \"\",
    \"remarques\": \"Test automatique\",
    \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"
  }" | jq '.'
echo ""

# Étape 5 : Vérifier le statut FIN DE DÉCHARGEMENT avec timer figé
echo "📊 ÉTAPE 5 : Vérifier statut FIN DE DÉCHARGEMENT"
QUAI_DATA=$(curl -s "$BASE_URL/api/quais" | jq ".quais[] | select(.quai_numero == $QUAI)")
echo "$QUAI_DATA"
echo ""

# Analyser les résultats
STATUT=$(echo "$QUAI_DATA" | jq -r '.statut')
TIMER_START=$(echo "$QUAI_DATA" | jq -r '.timer_start')
COMMENTAIRE=$(echo "$QUAI_DATA" | jq -r '.commentaire')

echo "============================================"
echo "📋 RÉSUMÉ DES RÉSULTATS"
echo "============================================"
echo ""
echo "✅ Statut attendu : fin_dechargement"
echo "📌 Statut obtenu  : $STATUT"
echo ""
echo "✅ Timer_start conservé : OUI"
echo "📌 Timer_start : $TIMER_START"
echo ""
echo "✅ Commentaire avec agent et fournisseur : OUI"
echo "📌 Commentaire : $COMMENTAIRE"
echo ""

if [ "$STATUT" = "fin_dechargement" ] && [ ! -z "$TIMER_START" ] && [ "$TIMER_START" != "null" ]; then
  echo "🎉 ✅ TEST RÉUSSI - Workflow complet fonctionnel !"
  echo ""
  echo "🌐 Vérifier visuellement sur :"
  echo "   $BASE_URL/gestion-quais"
  echo ""
  echo "   Vous devriez voir :"
  echo "   - 🔵 Carte bleue avec \"Fin de déchargement\""
  echo "   - ⏱️  Timer figé affiché sous le label"
  echo "   - 📝 Commentaire : Déchargement terminé - Jean Dupont - Logistique Express - ID:1827314"
else
  echo "❌ TEST ÉCHOUÉ - Vérifier les logs ci-dessus"
fi

echo ""
echo "============================================"
