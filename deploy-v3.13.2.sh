#!/bin/bash
export CLOUDFLARE_API_TOKEN="cfat_sD7lArABTnlV7Bo8awhAZWR8lB0HSdH4VYvnsIfg58fd0e2d"
export CLOUDFLARE_ACCOUNT_ID="8b193b1c61a45eb50fb2dab89cf8bfe5"

echo "🚀 Déploiement v3.13.2 - Améliorations Visuelles Archives"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd /home/user/webapp
npx wrangler pages deploy dist --project-name gxomoissyprocedures --branch main --commit-message "v3.13.2 - Archives: improductivités section verte, retrait durée déchargement écarts" --commit-hash v3.13.2

echo ""
echo "✅ Commande de déploiement exécutée"
echo "📍 URL: https://gxomoissyprocedures.pages.dev"
