#!/bin/bash

echo "🔍 Vérification du build avant déploiement..."
echo ""

# Vérifier que dist existe
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist/ n'existe pas. Exécutez 'npm run build' d'abord."
    exit 1
fi

# Vérifier que les fichiers taches existent
echo "📁 Vérification des fichiers /taches/*.html..."
TACHES_COUNT=$(find dist/taches -name "*.html" 2>/dev/null | wc -l)
if [ "$TACHES_COUNT" -lt 13 ]; then
    echo "❌ Seulement $TACHES_COUNT fichiers HTML trouvés dans dist/taches/ (attendu: 13)"
    echo "   Fichiers présents:"
    ls -1 dist/taches/*.html 2>/dev/null || echo "   Aucun"
    exit 1
fi
echo "✅ $TACHES_COUNT fichiers HTML trouvés dans dist/taches/"

# Vérifier que les fichiers consignes existent
echo "📁 Vérification des fichiers /consignes/*.html..."
CONSIGNES_COUNT=$(find dist/consignes -name "*.html" 2>/dev/null | wc -l)
if [ "$CONSIGNES_COUNT" -lt 13 ]; then
    echo "❌ Seulement $CONSIGNES_COUNT fichiers HTML trouvés dans dist/consignes/"
    exit 1
fi
echo "✅ $CONSIGNES_COUNT fichiers HTML trouvés dans dist/consignes/"

# Vérifier _routes.json
echo "📁 Vérification de _routes.json..."
if [ ! -f "dist/_routes.json" ]; then
    echo "❌ dist/_routes.json n'existe pas"
    exit 1
fi

# Vérifier que _routes.json contient bien les exclusions
if ! grep -q '"/taches/\*"' dist/_routes.json; then
    echo "❌ dist/_routes.json ne contient pas l'exclusion /taches/*"
    cat dist/_routes.json
    exit 1
fi
echo "✅ _routes.json correct"

# Vérifier le Worker
echo "📁 Vérification du Worker..."
if [ ! -f "dist/_worker.js" ]; then
    echo "❌ dist/_worker.js n'existe pas"
    exit 1
fi
echo "✅ Worker présent"

echo ""
echo "✅ Tous les fichiers sont prêts pour le déploiement!"
echo ""
echo "📋 Résumé:"
echo "   - Fichiers taches: $TACHES_COUNT"
echo "   - Fichiers consignes: $CONSIGNES_COUNT"
echo "   - _routes.json: ✓"
echo "   - Worker: ✓"
echo ""

# Liste des fichiers taches
echo "📄 Fichiers taches disponibles:"
ls -1 dist/taches/*.html | xargs -n 1 basename

echo ""
read -p "🚀 Voulez-vous déployer maintenant? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Déploiement en cours..."
    npx wrangler pages deploy dist --project-name=gxo-procedures-moissy --commit-dirty=true
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Déploiement réussi!"
        echo ""
        echo "🧪 URLs de test:"
        echo "   Italien: https://gxo-procedures-moissy.pages.dev/chauffeur/taches?id=11&lang=it"
        echo "   Néerlandais: https://gxo-procedures-moissy.pages.dev/chauffeur/taches?id=11&lang=nl"
        echo "   Allemand: https://gxo-procedures-moissy.pages.dev/chauffeur/taches?id=11&lang=de"
        echo ""
        echo "⏳ Attendez 2-3 minutes pour que le cache se rafraîchisse..."
    else
        echo "❌ Erreur lors du déploiement"
        exit 1
    fi
else
    echo "❌ Déploiement annulé"
fi
