#!/bin/bash

# Script de test des vidéos R2
# Usage: ./scripts/test_r2_videos.sh <R2_PUBLIC_URL>

set -e

if [ -z "$1" ]; then
    echo "❌ Usage: $0 <R2_PUBLIC_URL>"
    echo "Exemple: $0 https://pub-abc123.r2.dev"
    exit 1
fi

R2_URL="$1"
echo "🧪 Test des vidéos Cloudflare R2"
echo "🔗 URL de base: $R2_URL"
echo ""

# Liste des langues
LANGUES=("fr" "nl" "de" "fi" "da" "cs" "bg" "pl" "ro" "it" "pt" "hr")

SUCCESS=0
FAILED=0

for lang in "${LANGUES[@]}"; do
    video_url="$R2_URL/instructions-$lang.mp4"
    echo "📹 Test: instructions-$lang.mp4"
    
    # Test avec curl
    response=$(curl -s -I "$video_url" 2>&1)
    http_code=$(echo "$response" | grep -E "^HTTP" | tail -1 | awk '{print $2}')
    content_type=$(echo "$response" | grep -i "content-type:" | head -1 | cut -d' ' -f2- | tr -d '\r')
    accept_ranges=$(echo "$response" | grep -i "accept-ranges:" | head -1 | cut -d' ' -f2- | tr -d '\r')
    content_length=$(echo "$response" | grep -i "content-length:" | head -1 | cut -d' ' -f2- | tr -d '\r')
    
    if [ "$http_code" = "200" ]; then
        echo "   ✅ HTTP $http_code"
        echo "   📄 Content-Type: $content_type"
        echo "   📊 Accept-Ranges: $accept_ranges"
        echo "   💾 Size: $content_length bytes"
        
        # Vérifier le MIME type
        if [[ "$content_type" == *"video/mp4"* ]]; then
            echo "   ✅ MIME type correct (video/mp4)"
        else
            echo "   ⚠️  MIME type incorrect: $content_type"
        fi
        
        # Vérifier Range support
        if [[ "$accept_ranges" == *"bytes"* ]]; then
            echo "   ✅ Range Requests supportés"
        else
            echo "   ⚠️  Range Requests non supportés"
        fi
        
        ((SUCCESS++))
    else
        echo "   ❌ HTTP $http_code - Vidéo non accessible"
        ((FAILED++))
    fi
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Résumé des tests:"
echo "   ✅ Réussis: $SUCCESS / ${#LANGUES[@]}"
echo "   ❌ Échecs: $FAILED / ${#LANGUES[@]}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAILED" -eq 0 ]; then
    echo ""
    echo "🎉 Tous les tests ont réussi!"
    echo "✅ Les vidéos sont prêtes pour la production"
    exit 0
else
    echo ""
    echo "⚠️  Certaines vidéos ont échoué aux tests"
    exit 1
fi
