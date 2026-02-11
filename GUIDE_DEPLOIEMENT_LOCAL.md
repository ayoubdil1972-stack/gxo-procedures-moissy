# 🚀 Guide : Déployer depuis VOTRE Ordinateur (Rapide)

## Étape 1 : Télécharger l'Archive (2 min)

1. **Télécharger** : https://www.genspark.ai/api/files/s/hdyLupcQ
2. **Extraire** l'archive sur votre ordinateur
3. **Naviguer** vers le dossier : `webapp/`

---

## Étape 2 : Installer Node.js (si pas déjà fait)

**Télécharger** : https://nodejs.org/en/download/
- Version : LTS (Long Term Support)
- Système : Windows / Mac / Linux

**Vérifier l'installation** :
```bash
node --version  # Doit afficher v18.x ou supérieur
npm --version   # Doit afficher 9.x ou supérieur
```

---

## Étape 3 : Installer Wrangler (2 min)

```bash
# Dans le dossier webapp/
npm install
```

---

## Étape 4 : Configurer le Token Cloudflare (1 min)

**Méthode A : Variable d'environnement** (recommandé)

**Windows (PowerShell)** :
```powershell
$env:CLOUDFLARE_API_TOKEN="GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h"
```

**Mac/Linux (Terminal)** :
```bash
export CLOUDFLARE_API_TOKEN="GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h"
```

**Méthode B : Login interactif** (plus simple)
```bash
npx wrangler login
```
→ Ouvre le navigateur → Se connecter → Autoriser

---

## Étape 5 : Déployer (5 min) 🚀

```bash
# Dans le dossier webapp/
npm run build
npx wrangler pages deploy dist --project-name gxo-procedures-moissy --branch main
```

**Résultat attendu** :
```
✨ Deployment complete!
🌐 Production: https://gxo-procedures-moissy.pages.dev
```

---

## Étape 6 : Lier la Base de Données (2 min)

**Via Dashboard Cloudflare** :
1. https://dash.cloudflare.com/
2. Workers & Pages → gxo-procedures-moissy
3. Settings → Bindings → Add binding
4. Type: D1 Database
5. Variable name: `DB`
6. Database: `gxo-chauffeurs-db`
7. Save
8. **Retry deployment** (important !)

---

## Étape 7 : Tester (1 min)

```bash
# Test du site
curl -I https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
# Attendu: HTTP/2 200

# Test de la base de données
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="SELECT COUNT(*) FROM chauffeurs"
# Attendu: total: 5
```

**Ouvrir dans le navigateur** :
- https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur

---

## ✅ Temps Total : 15 minutes

| Étape | Temps |
|-------|-------|
| Télécharger + Extraire | 2 min |
| Installer Node.js (si besoin) | 5 min |
| Installer dépendances | 2 min |
| Configurer token | 1 min |
| Déployer | 5 min |
| Lier DB + Test | 2 min |
| **TOTAL** | **15 min** |

---

## 🔄 Modifications Futures (Comment mettre à jour)

### Modifier le Code

1. **Éditer** les fichiers dans `src/` :
   - `src/pages/chauffeur-video.tsx` → Modifier la page vidéo
   - `src/pages/chauffeur-langue.tsx` → Modifier les langues
   - `public/static/app.js` → Modifier le JavaScript frontend

2. **Build** :
   ```bash
   npm run build
   ```

3. **Déployer** :
   ```bash
   npx wrangler pages deploy dist --project-name gxo-procedures-moissy
   ```

**Temps** : 2-3 minutes par modification

---

### Modifier la Base de Données

**Ajouter un chauffeur** :
```bash
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="
INSERT INTO chauffeurs (nom, prenom, email, telephone, langue, statut) 
VALUES ('Nouveau', 'Chauffeur', 'test@example.com', '+33612345678', 'fr', 'en_attente')
"
```

**Modifier un statut** :
```bash
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="
UPDATE chauffeurs SET statut='valide' WHERE email='test@example.com'
"
```

**Lister les chauffeurs** :
```bash
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="
SELECT nom, prenom, langue, statut, date_inscription FROM chauffeurs ORDER BY date_inscription DESC
"
```

**Temps** : Instantané (en temps réel)

---

## 🔐 Sécurité du Token

**Important** : Le token `GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h` permet de :
- ✅ Déployer sur Cloudflare Pages
- ✅ Gérer la base de données D1
- ✅ Voir les analytics

**Ne partagez JAMAIS ce token publiquement** (GitHub, email, etc.)

**Pour révoquer/créer un nouveau token** :
1. https://dash.cloudflare.com/profile/api-tokens
2. Trouver le token
3. Edit → Roll token (change le token)

---

## 📞 Support

**Dashboard Cloudflare** : https://dash.cloudflare.com/
**Documentation Wrangler** : https://developers.cloudflare.com/workers/wrangler/
**Documentation D1** : https://developers.cloudflare.com/d1/

---

**Dernière mise à jour** : 11 février 2026
