#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        DÉPLOIEMENT GXO PROCEDURES MOISSY - CLOUDFLARE         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Configuration du token
export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-

echo "✅ Token Cloudflare configuré"
echo ""

# Vérification de l'authentification
echo "🔍 Vérification de l'authentification..."
npx wrangler whoami
echo ""

# Build du projet
echo "🔨 Build du projet..."
npm run build
echo ""

# Déploiement
echo "🚀 Déploiement sur Cloudflare Pages..."
npx wrangler pages deploy dist --project-name gxo-procedures-moissy --branch main

echo ""
echo "✅ Déploiement terminé !"
echo "🌐 URL de production : https://gxo-procedures-moissy.pages.dev"
