#!/bin/bash
# Test workflow complet : Timer figé au moment du passage "En cours" → "Fin de déchargement"
# =====================================================================================

echo "🧪 TEST WORKFLOW TIMER FIGÉ - VERSION CORRIGÉE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

QUAI=75

# 1. Mettre le quai en "disponible" pour recommencer
echo "1️⃣  Réinitialisation : Quai $QUAI → Disponible"
curl -s -X POST http://localhost:3000/api/quais/$QUAI \
  -H "Content-Type: application/json" \
  -d '{"statut":"disponible","commentaire_auteur":"Test"}' | jq -r '.message // .error'
echo ""

sleep 1

# 2. Mettre le quai en "en_cours" → Démarrage du timer
echo "2️⃣  Passage en 'En cours' : Quai $QUAI (timer démarre)"
curl -s -X POST http://localhost:3000/api/quais/$QUAI \
  -H "Content-Type: application/json" \
  -d '{"statut":"en_cours","commentaire_auteur":"Test"}' | jq -r '.message // .error'
echo ""

sleep 1

# Vérifier le statut et timer_start
echo "📊 État actuel du quai $QUAI (En cours) :"
QUAI_DATA=$(curl -s http://localhost:3000/api/quais | jq ".quais[] | select(.quai_numero == $QUAI)")
echo "$QUAI_DATA" | jq '{quai_numero, statut, timer_start, timer_duration, commentaire}'
TIMER_START=$(echo "$QUAI_DATA" | jq -r '.timer_start')
echo ""
echo "✅ Timer démarré à : $TIMER_START"
echo ""

# 3. Attendre 10 secondes (simuler le déchargement)
echo "⏳ Attente de 10 secondes (simulation du déchargement)..."
for i in {10..1}; do
  echo -n "$i... "
  sleep 1
done
echo "✅"
echo ""

# 4. Enregistrer la fin de déchargement → Passage en "fin_dechargement"
echo "3️⃣  Enregistrement fin de déchargement (formulaire rempli)"
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
    echo ""
    echo "🎉 SUCCÈS COMPLET ! Le timer est correctement figé à $FORMATTED_TIME"
  else
    echo "⚠️  Timer duration manquant ou incorrect : $TIMER_DURATION"
    echo "   Attendu : ≥10 secondes"
  fi
else
  echo "❌ TEST ÉCHOUÉ : Statut attendu 'fin_dechargement', obtenu '$STATUT'"
fi
echo ""

echo "🌐 Vérifiez visuellement sur :"
echo "   http://localhost:3000/accueil-chauffeur"
echo "   → Onglet 'Gestion des Quais'"
echo "   → Cherchez le Quai $QUAI"
echo "   → Vous devez voir une carte BLEUE avec :"
echo "      • Label : 'Fin de déchargement'"
echo "      • Timer figé : $FORMATTED_TIME"
echo "      • Commentaire : Agent / Fournisseur / ID"
echo ""
