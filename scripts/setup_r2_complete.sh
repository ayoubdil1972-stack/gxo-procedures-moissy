#!/bin/bash

# Script de configuration complète Cloudflare R2
# Usage: ./scripts/setup_r2_complete.sh [R2_PUBLIC_URL]

set -e

BUCKET_NAME="gxo-videos"
VIDEO_SOURCE="../gxo-video-assets/videos"

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   🚀 Configuration Cloudflare R2 - Vidéos GXO Moissy    ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Fonction pour afficher les étapes
step() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 ÉTAPE $1: $2"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Étape 1: Vérifier Wrangler
step "1" "Vérification Wrangler CLI"
if command -v wrangler &> /dev/null; then
    WRANGLER_VERSION=$(npx wrangler --version 2>&1 | head -1)
    echo "✅ Wrangler installé: $WRANGLER_VERSION"
else
    echo "❌ Wrangler non trouvé"
    exit 1
fi

# Vérifier l'authentification
if npx wrangler whoami &> /dev/null; then
    WRANGLER_USER=$(npx wrangler whoami 2>&1 | grep "associated with" | cut -d"'" -f2)
    echo "✅ Authentifié: $WRANGLER_USER"
else
    echo "❌ Non authentifié. Configurez d'abord votre API key Cloudflare."
    echo "   1. Aller dans Deploy tab"
    echo "   2. Créer un token avec permissions R2 → Edit"
    echo "   3. Sauvegarder le token"
    exit 1
fi

# Étape 2: Créer le bucket
step "2" "Création du bucket R2"
if npx wrangler r2 bucket list 2>&1 | grep -q "$BUCKET_NAME"; then
    echo "⚠️  Bucket $BUCKET_NAME existe déjà"
    read -p "Voulez-vous le recréer ? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Suppression de l'ancien bucket..."
        npx wrangler r2 bucket delete "$BUCKET_NAME" --force || true
        echo "📦 Création du nouveau bucket..."
        npx wrangler r2 bucket create "$BUCKET_NAME" --jurisdiction eu
    fi
else
    echo "📦 Création du bucket $BUCKET_NAME..."
    npx wrangler r2 bucket create "$BUCKET_NAME" --jurisdiction eu
    echo "✅ Bucket créé avec succès"
fi

# Étape 3: Vérifier les vidéos sources
step "3" "Vérification des vidéos sources"
if [ ! -d "$VIDEO_SOURCE" ]; then
    echo "❌ Dossier $VIDEO_SOURCE introuvable"
    echo "📥 Clonage du repository..."
    cd /home/user
    if [ -d "gxo-video-assets" ]; then
        echo "🔄 Repository existe, mise à jour..."
        cd gxo-video-assets
        git pull
        cd ..
    else
        git clone https://github.com/ayoubdil1972-stack/gxo-video-assets.git
    fi
    cd /home/user/webapp
fi

VIDEO_COUNT=$(ls -1 "$VIDEO_SOURCE"/*.mp4 2>/dev/null | wc -l)
echo "✅ Vidéos trouvées: $VIDEO_COUNT"

if [ "$VIDEO_COUNT" -ne 12 ]; then
    echo "⚠️  Nombre de vidéos incorrect (attendu: 12, trouvé: $VIDEO_COUNT)"
fi

# Étape 4: Upload des vidéos
step "4" "Upload des vidéos vers R2"
echo "📤 Upload en cours..."
UPLOADED=0
FAILED=0

for video in "$VIDEO_SOURCE"/*.mp4; do
    filename=$(basename "$video")
    filesize=$(du -h "$video" | cut -f1)
    
    printf "   📹 %-30s %s ... " "$filename" "$filesize"
    
    if npx wrangler r2 object put "$BUCKET_NAME/$filename" \
        --file="$video" \
        --content-type="video/mp4" \
        --cache-control="public, max-age=31536000" &> /dev/null; then
        echo "✅"
        ((UPLOADED++))
    else
        echo "❌"
        ((FAILED++))
    fi
done

echo ""
echo "📊 Upload terminé: $UPLOADED réussis, $FAILED échecs"

if [ "$FAILED" -gt 0 ]; then
    echo "⚠️  Certains uploads ont échoué. Vérifiez les permissions."
    exit 1
fi

# Étape 5: Configurer CORS
step "5" "Configuration CORS"
if [ -f "cors-config.json" ]; then
    echo "📝 Application de la configuration CORS..."
    if npx wrangler r2 bucket cors put "$BUCKET_NAME" --config cors-config.json &> /dev/null; then
        echo "✅ CORS configuré avec succès"
    else
        echo "⚠️  Échec configuration CORS (peut nécessiter configuration manuelle)"
    fi
else
    echo "⚠️  Fichier cors-config.json introuvable, CORS non configuré"
fi

# Étape 6: Instructions accès public
step "6" "Activation de l'accès public"
echo "⚠️  Cette étape doit être faite manuellement dans le dashboard Cloudflare:"
echo ""
echo "   1. Ouvrir: https://dash.cloudflare.com/"
echo "   2. Navigation: R2 → $BUCKET_NAME → Settings"
echo "   3. Section 'Public Access' → Cliquer 'Allow Access'"
echo "   4. Copier l'URL publique: https://pub-XXXXX.r2.dev"
echo ""

# Vérifier si URL fournie en paramètre
if [ -n "$1" ]; then
    R2_URL="$1"
    step "7" "Test des vidéos R2"
    echo "🧪 Test de l'URL fournie: $R2_URL"
    
    # Tester une vidéo
    TEST_URL="$R2_URL/instructions-fr.mp4"
    echo "📹 Test: $TEST_URL"
    
    response=$(curl -s -I "$TEST_URL" 2>&1)
    http_code=$(echo "$response" | grep -E "^HTTP" | tail -1 | awk '{print $2}')
    
    if [ "$http_code" = "200" ]; then
        echo "✅ Vidéo accessible (HTTP $http_code)"
        
        # Mettre à jour le fichier de config
        step "8" "Mise à jour de la configuration"
        echo "📝 Mise à jour de src/config/r2.ts..."
        
        sed -i "s|BASE_URL:.*|BASE_URL: process.env.R2_PUBLIC_URL || '$R2_URL',|g" src/config/r2.ts
        
        echo "✅ Configuration mise à jour"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🎉 CONFIGURATION TERMINÉE AVEC SUCCÈS !"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📋 Prochaines étapes:"
        echo "   1. npm run build"
        echo "   2. git add -A && git commit -m 'feat: Migrate to R2'"
        echo "   3. git push origin main"
        echo "   4. Tester sur iPhone: https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=fr"
    else
        echo "❌ Vidéo non accessible (HTTP $http_code)"
        echo "   Vérifiez que l'accès public est activé"
    fi
else
    echo "💡 Une fois l'URL obtenue, relancez ce script avec:"
    echo "   ./scripts/setup_r2_complete.sh https://pub-XXXXX.r2.dev"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 Documentation complète: GUIDE_MIGRATION_R2.md"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
