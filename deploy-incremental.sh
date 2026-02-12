#!/bin/bash

echo "🚀 Déploiement progressif des vidéos..."

# Priorités: NL (néerlandais), FR, FI (finnois)
VIDEOS=("nl" "fr" "fi" "de" "it" "pl" "bg" "cs" "da" "hr" "pt" "ro")

for lang in "${VIDEOS[@]}"; do
    echo "📹 Ajout de la vidéo $lang..."
    cp "dist/static/videos/instructions-$lang.mp4" "dist-no-videos/static/videos/" 2>/dev/null || echo "⚠️ Vidéo $lang non trouvée"
    
    echo "🌐 Déploiement..."
    timeout 60 npx wrangler pages deploy dist-no-videos --project-name gxo-procedures-moissy --commit-dirty=true 2>&1 | tail -5
    
    if [ $? -eq 0 ]; then
        echo "✅ Vidéo $lang déployée"
    else
        echo "⏸️  Timeout pour $lang, on continue..."
    fi
    
    sleep 2
done

echo "🎉 Déploiement terminé !"
