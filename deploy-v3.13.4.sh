#!/bin/bash
export CLOUDFLARE_API_TOKEN="cfat_sD7lArABTnlV7Bo8awhAZWR8lB0HSdH4VYvnsIfg58fd0e2d"
export CLOUDFLARE_ACCOUNT_ID="8b193b1c61a45eb50fb2dab89cf8bfe5"

echo "🚀 Déploiement v3.13.4 - Fix Cache: Semaines Filtres Tous Mois"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd /home/user/webapp
npx wrangler pages deploy dist --project-name gxomoissyprocedures --branch main --commit-message "v3.13.4 - Fix: Force cache refresh pour filtres semaines automatiques" --commit-hash v3.13.4

echo ""
echo "✅ Commande de déploiement exécutée"
echo "📍 URL de production: https://gxomoissyprocedures.pages.dev"
echo "📍 URL du dernier commit: https://gxomoissyprocedures.pages.dev (après propagation)"
echo ""
echo "⚠️  Note: Si les semaines ne s'affichent toujours pas après 2-3 minutes,"
echo "    videz le cache de votre navigateur (Ctrl+Maj+R ou Cmd+Maj+R)"
