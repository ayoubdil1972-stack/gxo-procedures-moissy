#!/bin/bash

echo "🎬 Upload des vidéos vers Cloudflare Pages..."

# Copier juste 3 vidéos pour commencer (NL, FR, EN)
cp dist/static/videos/instructions-nl.mp4 dist-no-videos/static/videos/
cp dist/static/videos/instructions-fr.mp4 dist-no-videos/static/videos/
cp dist/static/videos/instructions-fi.mp4 dist-no-videos/static/videos/

echo "✅ 3 vidéos copiées (NL, FR, FI)"
du -sh dist-no-videos

echo "🚀 Redéploiement avec les 3 premières vidéos..."
npx wrangler pages deploy dist-no-videos --project-name gxo-procedures-moissy --commit-dirty=true

