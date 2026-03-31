#!/bin/bash
echo "🚀 Tentative de déploiement v3.11.42..."

# Méthode 1: Wrangler avec détection auto du token
echo "📡 Méthode 1: Wrangler détection auto..."
npx wrangler pages deploy dist --project-name gxomoissyprocedures 2>&1 | head -20

# Si échec, essayer sans variable d'environnement
if [ $? -ne 0 ]; then
  echo "📡 Méthode 2: Wrangler sans env var..."
  unset CLOUDFLARE_API_TOKEN
  unset CLOUDFLARE_ACCOUNT_ID
  npx wrangler pages deploy dist --project-name gxomoissyprocedures 2>&1 | head -20
fi

# Si échec, essayer login interactif
if [ $? -ne 0 ]; then
  echo "📡 Méthode 3: Wrangler login..."
  npx wrangler login 2>&1 | head -10
  npx wrangler pages deploy dist --project-name gxomoissyprocedures 2>&1 | head -20
fi

echo "✅ Tentatives terminées"
