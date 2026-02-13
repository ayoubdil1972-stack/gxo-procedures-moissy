# DIAGNOSTIC COMPLET - Error 1101 Cloudflare Pages

## Résumé du Problème
- **Symptôme**: Error 1101 en production sur https://gxo-procedures-moissy.pages.dev/chauffeur/consignes
- **Environnement**: Fonctionne parfaitement en local (sandbox), crash uniquement sur Cloudflare Pages
- **Durée**: Persistant depuis plusieurs déploiements

## Solutions Tentées

### ✅ 1. Suppression Route Vidéo (499f356)
- **Problème identifié**: Route `/api/video/:langue` chargeait 3 MB en mémoire
- **Action**: Supprimé route inutilisée
- **Résultat**: Bundle réduit de 240→239.88 KB
- **Status**: Toujours Error 1101

### ✅ 2. Configuration _routes.json (531552a)
- **Problème identifié**: Worker n'incluait pas /static/* dans les routes
- **Action**: Créé `public/_routes.json` avec `exclude: []`
- **Résultat**: Tous les fichiers passent par le Worker
- **Status**: Toujours Error 1101

### ✅ 3. Traductions Embarquées dans Worker (8d805dc)
- **Problème identifié**: Fichiers JSON retournent 404 (Cloudflare ne déploie pas dist/static/)
- **Action**: Créé `src/translations-data.ts` avec toutes les traductions
- **Implémentation**:
  - API `/api/translations/:langue` retourne JSON depuis mémoire
  - 12 langues embarquées (fr, nl, de, it, bg, cs, da, fi, hr, pl, pt, ro)
  - Bundle 252.57 KB (+13 KB)
- **Tests locaux**: ✅ Toutes langues OK
- **Production**: ❌ Error 1101

## Analyses Techniques

### Tests de Validation Locaux (100% OK)
```bash
✅ curl http://localhost:3000/chauffeur/consignes?lang=ro → HTTP 200
✅ curl http://localhost:3000/api/translations/ro → JSON complet
✅ Toutes les 12 langues fonctionnent
✅ Page charge correctement
```

### Tests Production (100% FAIL)
```bash
❌ curl https://gxo-procedures-moissy.pages.dev/chauffeur/consignes?lang=ro → HTTP 500
❌ curl https://gxo-procedures-moissy.pages.dev/api/translations/ro → error code: 1101
❌ Toutes les routes /chauffeur/consignes crashent
```

### Autres Routes Production (OK)
```bash
✅ curl https://gxo-procedures-moissy.pages.dev/ → HTTP 200 (homepage OK)
✅ curl https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur → HTTP 200 (QR OK)
```

## Cause Probable du 1101

**Error 1101 = Worker Crash** (Cloudflare CPU/Memory exception)

Causes possibles:
1. **Timeout CPU** (10ms gratuit, 30ms paid) - Script trop lent
2. **Out of Memory** (128 MB gratuit) - Données trop grandes
3. **Exception non capturée** - Bug dans le code TypeScript
4. **Incompatibilité Cloudflare Runtime** - Code fonctionne en Node mais pas dans V8 Workers

## Différences Sandbox vs Production

| Aspect | Sandbox (Wrangler Dev) | Production (Cloudflare Pages) |
|--------|------------------------|------------------------------|
| Runtime | Node.js compatible | V8 Isolate (limité) |
| Mémoire | ~512 MB | 128 MB (gratuit) |
| CPU Timeout | Illimité | 10ms (gratuit) |
| Fichiers Static | dist/ complet | Seulement _worker.js |
| Node APIs | Disponibles | NON disponibles |

## Hypothèses à Vérifier

### 1. Page chauffeur-instructions.tsx trop complexe
- 195 lignes de JSX
- Inline script avec `dangerouslySetInnerHTML`
- Peut causer timeout à la compilation

### 2. Traductions embarquées trop grandes
- 252.57 KB bundle
- 12×1.2 KB = ~15 KB de JSON parsé à chaque requête
- Peut exploser la mémoire si multiplié par requêtes simultanées

### 3. Script inline côté client mal formé
- 50 lignes de JavaScript dans `<script dangerouslySetInnerHTML>`
- Peut contenir caractères spéciaux qui cassent le Worker

### 4. simpleRenderer incompatible
- Utilise `simpleRenderer` pour cette route
- Peut avoir bug avec Cloudflare Pages

## Prochaines Actions Recommandées

### Option A: Simplifier drastiquement la page
1. Supprimer tout le script inline
2. Faire SSR complet (pas de JavaScript côté client)
3. Utiliser paramètre URL pour la langue uniquement
4. Générer HTML statique directement

### Option B: Utiliser Cloudflare KV pour traductions
1. Créer namespace KV: `wrangler kv:namespace create translations`
2. Stocker chaque langue: `wrangler kv:key put --namespace-id=XXX fr '{"bienvenue":"Bonjour",...}'`
3. Fetch depuis KV au lieu de mémoire
4. KV est optimisé pour Workers

### Option C: Pré-rendre les 12 pages statiques
1. Générer 12 fichiers HTML statiques (un par langue)
2. `/chauffeur/consignes-fr.html`, `/chauffeur/consignes-nl.html`, etc.
3. Redirection `/chauffeur/consignes?lang=ro` → `/chauffeur/consignes-ro.html`
4. Pas de Worker, 100% statique

### Option D: Utiliser Pages Functions au lieu de Worker
1. Créer `functions/api/translations/[langue].ts`
2. Cloudflare Pages Functions (pas Workers)
3. Plus de temps CPU, meilleure compatibilité

## Recommandation Finale

**OPTION C: Pré-render statique**
- Plus simple
- Plus rapide (pas de Worker)
- 0 risque de crash
- Compatible Cloudflare Pages natif
- 12 fichiers HTML × 10 KB = 120 KB total

Génération:
```bash
# Script Node.js qui génère 12 fichiers HTML statiques
node scripts/generate-consignes-pages.js
# Output: public/chauffeur/consignes-fr.html, consignes-nl.html, etc.
```

## Fichiers Impliqués
- src/index.tsx (routeur principal)
- src/pages/chauffeur-instructions.tsx (page problématique)
- src/translations-data.ts (traductions embarquées)
- src/simple-renderer.tsx (renderer utilisé)
- wrangler.jsonc (config Cloudflare)
- dist/_worker.js (252.57 KB)

## Commits Git
- `499f356`: Suppression route vidéo
- `531552a`: Configuration _routes.json
- `8d805dc`: Traductions embarquées

## Conclusion

Le crash Error 1101 est probablement causé par:
1. **Script inline complexe** dans chauffeur-instructions.tsx
2. **Timeout CPU** lors du parsing/rendering de la page
3. **Incompatibilité V8 Worker** avec le code actuel

**Solution immédiate**: Simplifier drastiquement la page ou passer au pré-render statique.
