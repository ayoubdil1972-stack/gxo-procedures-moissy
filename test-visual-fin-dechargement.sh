#!/bin/bash

# Script pour tester visuellement l'affichage du statut "Fin de déchargement"

echo "🔵 VÉRIFICATION VISUELLE - Statut Fin de Déchargement"
echo "======================================================="
echo ""

# 1. Vérifier l'API
echo "📊 1. État du quai 75 dans l'API:"
curl -s http://localhost:3000/api/quais | jq '.quais[] | select(.quai_numero == 75) | {quai_numero, statut, timer_start, commentaire}'
echo ""

# 2. Vérifier que la légende contient bien le statut bleu
echo "📋 2. Légende des statuts (doit contenir 'Fin de déchargement'):"
curl -s http://localhost:3000/gestion-quais | grep -o "Fin de déchargement" | head -1
echo ""

# 3. Vérifier les couleurs définies dans le JS
echo "🎨 3. Couleurs des statuts dans le code:"
curl -s http://localhost:3000/static/gestion-quais.js | grep -A 4 "statusColors = {"
echo ""

# 4. Vérifier les icônes
echo "🎭 4. Icônes des statuts:"
curl -s http://localhost:3000/static/gestion-quais.js | grep -A 4 "statusIcons = {"
echo ""

# 5. Vérifier les labels
echo "📝 5. Labels des statuts:"
curl -s http://localhost:3000/static/gestion-quais.js | grep -A 4 "statusLabels = {"
echo ""

echo "======================================================="
echo "✅ Si tout est correct, vous devriez voir sur:"
echo "   http://localhost:3000/gestion-quais"
echo ""
echo "   Une carte BLEUE pour le quai 75 avec:"
echo "   - 🔵 Fond bleu (bg-blue-500)"
echo "   - 📋 Icône clipboard-check"
echo "   - 📝 Label 'Fin de déchargement'"
echo "   - ⏱️  Timer figé sous le label"
echo "   - 💬 Commentaire en bas"
echo ""
echo "⚠️  Si la carte n'est PAS bleue, c'est que la migration"
echo "   SQL n'a pas été appliquée en production."
echo ""
echo "🔧 Solution: Appliquer fix-constraint-production.sql"
echo "======================================================="
