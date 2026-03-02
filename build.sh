#!/bin/bash
# Script de build vide pour Cloudflare Pages
# dist/ est déjà commité sur GitHub, pas besoin de rebuild

echo "✅ Skipping build - dist/ is already committed to GitHub"
echo "✅ Files ready for deployment:"
ls -lh dist/ | head -10
echo ""
echo "✅ Build completed successfully (no-op)"
exit 0
