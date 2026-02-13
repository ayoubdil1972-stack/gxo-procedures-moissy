#!/bin/bash

# Script d'upload des vidéos vers Cloudflare R2
# Usage: ./scripts/upload_videos_to_r2.sh

set -e

BUCKET_NAME="gxo-videos"
VIDEO_SOURCE="../gxo-video-assets/videos"

echo "🚀 Upload des vidéos vers Cloudflare R2"
echo "📦 Bucket: $BUCKET_NAME"
echo "📁 Source: $VIDEO_SOURCE"
echo ""

# Vérifier que le dossier source existe
if [ ! -d "$VIDEO_SOURCE" ]; then
    echo "❌ Erreur: Le dossier $VIDEO_SOURCE n'existe pas"
    echo "💡 Clonez d'abord: git clone https://github.com/ayoubdil1972-stack/gxo-video-assets.git ../gxo-video-assets"
    exit 1
fi

# Compter les vidéos
VIDEO_COUNT=$(ls -1 "$VIDEO_SOURCE"/*.mp4 2>/dev/null | wc -l)
echo "📹 Vidéos trouvées: $VIDEO_COUNT"
echo ""

if [ "$VIDEO_COUNT" -eq 0 ]; then
    echo "❌ Aucune vidéo trouvée dans $VIDEO_SOURCE"
    exit 1
fi

# Upload chaque vidéo
UPLOADED=0
FAILED=0

for video in "$VIDEO_SOURCE"/*.mp4; do
    filename=$(basename "$video")
    filesize=$(du -h "$video" | cut -f1)
    
    echo "📤 Upload: $filename ($filesize)..."
    
    if npx wrangler r2 object put "$BUCKET_NAME/$filename" \
        --file="$video" \
        --content-type="video/mp4" \
        --cache-control="public, max-age=31536000" 2>&1; then
        echo "   ✅ $filename uploadé avec succès"
        ((UPLOADED++))
    else
        echo "   ❌ Échec upload $filename"
        ((FAILED++))
    fi
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Résumé:"
echo "   ✅ Uploadés: $UPLOADED"
echo "   ❌ Échecs: $FAILED"
echo "   📦 Total: $VIDEO_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAILED" -eq 0 ]; then
    echo ""
    echo "🎉 Tous les fichiers ont été uploadés avec succès!"
    echo ""
    echo "📝 Prochaines étapes:"
    echo "   1. Activer l'accès public R2 dans le dashboard Cloudflare"
    echo "   2. Obtenir l'URL publique du bucket (https://pub-XXXXX.r2.dev)"
    echo "   3. Mettre à jour le code avec cette URL"
    exit 0
else
    echo ""
    echo "⚠️  Certains fichiers n'ont pas pu être uploadés"
    exit 1
fi
