#!/bin/bash
# Test workflow complet : Timer figé au moment du passage "En cours" → "Fin de déchargement"
# =====================================================================================

echo "🧪 TEST WORKFLOW TIMER FIGÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

QUAI=75

# 1. Mettre le quai en "disponible" pour recommencer
echo "1️⃣  Réinitialisation : Quai $QUAI → Disponible"
curl -s -X POST http://localhost:3000/api/quais/$QUAI \
  -H "Content-Type: application/json" \
  -d '{"statut":"disponible"}' | jq -r '.message // .error'
echo ""

sleep 2

# 2. Scanner QR START → Passage en "en_cours" + démarrage timer
echo "2️⃣  Scan QR START : Quai $QUAI → En cours (timer démarre)"
curl -s "http://localhost:3000/scan-dechargement?quai=$QUAI" > /dev/null
echo "✅ Timer démarré"
echo ""

# Vérifier le statut et timer_start
echo "📊 État actuel du quai $QUAI :"
QUAI_DATA=$(curl -s http://localhost:3000/api/quais | jq ".quais[] | select(.quai_numero == $QUAI)")
echo "$QUAI_DATA" | jq '{quai_numero, statut, timer_start, timer_duration, commentaire}'
echo ""

# 3. Attendre 10 secondes (simuler le déchargement)
echo "⏳ Attente de 10 secondes (simulation du déchargement)..."
for i in {10..1}; do
  echo -n "$i... "
  sleep 1
done
echo "✅"
echo ""

# 4. Scanner QR FIN → Remplir formulaire → Passage en "fin_dechargement"
echo "3️⃣  Scan QR FIN : Remplissage du formulaire de fin de déchargement"
curl -s -X POST http://localhost:3000/api/fin-dechargement \
  -H "Content-Type: application/json" \
  -d "{
    \"quai_numero\": $QUAI,
    \"nom_agent\": \"Jean Dupont\",
    \"numero_id\": \"TEST123\",
    \"fournisseur\": \"Transport Express\",
    \"palettes_attendues\": 33,
    \"palettes_recues\": 33,
    \"palettes_a_rendre\": \"Aucune\",
    \"problemes\": [],
    \"autres_commentaire\": \"Test workflow timer figé\"
  }" | jq -r '.message // .error'
echo ""

sleep 2

# 5. Vérifier le résultat final
echo "4️⃣  RÉSULTAT FINAL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
FINAL_DATA=$(curl -s http://localhost:3000/api/quais | jq ".quais[] | select(.quai_numero == $QUAI)")
echo "$FINAL_DATA" | jq '.'
echo ""

# Extraire les valeurs importantes
STATUT=$(echo "$FINAL_DATA" | jq -r '.statut')
TIMER_DURATION=$(echo "$FINAL_DATA" | jq -r '.timer_duration')
COMMENTAIRE=$(echo "$FINAL_DATA" | jq -r '.commentaire')

echo "📋 Résumé :"
echo "   Statut        : $STATUT"
echo "   Timer durée   : $TIMER_DURATION secondes"
echo "   Commentaire   : $COMMENTAIRE"
echo ""

# Calculer le temps formaté
if [ "$TIMER_DURATION" != "null" ] && [ "$TIMER_DURATION" -gt 0 ]; then
  HOURS=$((TIMER_DURATION / 3600))
  MINUTES=$(((TIMER_DURATION % 3600) / 60))
  SECONDS=$((TIMER_DURATION % 60))
  FORMATTED_TIME=$(printf "%02d:%02d:%02d" $HOURS $MINUTES $SECONDS)
  echo "   Timer affiché : $FORMATTED_TIME (FIGÉ)"
  echo ""
fi

# Vérification
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$STATUT" = "fin_dechargement" ]; then
  echo "✅ TEST RÉUSSI : Quai en statut 'fin_dechargement'"
  if [ "$TIMER_DURATION" != "null" ] && [ "$TIMER_DURATION" -ge 10 ]; then
    echo "✅ Timer figé : $TIMER_DURATION secondes (≥10 secondes attendues)"
    echo "✅ Sur l'interface web, le timer s'affichera : $FORMATTED_TIME"
  else
    echo "⚠️  Timer duration manquant ou incorrect : $TIMER_DURATION"
  fi
else
  echo "❌ TEST ÉCHOUÉ : Statut attendu 'fin_dechargement', obtenu '$STATUT'"
fi
echo ""

echo "🌐 Vérifiez visuellement sur :"
echo "   http://localhost:3000/accueil-chauffeur"
echo "   → Onglet 'Gestion des Quais'"
echo "   → Cherchez le Quai $QUAI"
echo "   → Vous devez voir une carte BLEUE avec le timer figé : $FORMATTED_TIME"
echo ""
