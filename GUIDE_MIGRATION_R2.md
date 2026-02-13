# 🚀 Guide Complet Migration Cloudflare R2

**Date:** 13 février 2026  
**Objectif:** Migrer les vidéos de GitHub CDN vers Cloudflare R2 pour résoudre le problème MIME type sur iOS Safari

---

## 📋 Prérequis

- [x] Compte Cloudflare avec accès R2
- [x] Wrangler CLI installé (`npx wrangler --version`)
- [ ] **Clé API Cloudflare configurée** ← **ÉTAPE ACTUELLE**
- [ ] Repository gxo-video-assets cloné localement

---

## 🔑 ÉTAPE 1: Configurer la Clé API Cloudflare

### Option A: Via l'Interface GenSpark (Recommandé)

1. **Aller dans l'onglet Deploy** (dans la sidebar)
2. **Créer un token API Cloudflare:**
   - Se connecter à https://dash.cloudflare.com/profile/api-tokens
   - Cliquer "Create Token"
   - Utiliser le template "Edit Cloudflare Workers"
   - **Permissions requises:**
     - Account → Cloudflare Pages → Edit
     - Account → Account Settings → Read
     - Account → R2 → Edit ✅ **IMPORTANT POUR R2**
   - Copier le token généré
3. **Entrer le token dans GenSpark** et sauvegarder

### Option B: Configuration Manuelle

```bash
# Créer le fichier de configuration
mkdir -p ~/.wrangler
echo "YOUR_CLOUDFLARE_API_TOKEN" > ~/.wrangler/config/default.toml

# Ou définir la variable d'environnement
export CLOUDFLARE_API_TOKEN="YOUR_TOKEN_HERE"
```

### Vérifier la configuration

```bash
npx wrangler whoami
```

**Sortie attendue:**
```
👋 You are logged in with an API Token, associated with the email 'your@email.com'
```

---

## 📦 ÉTAPE 2: Créer le Bucket R2

```bash
cd /home/user/webapp

# Créer le bucket R2 (juridiction EU pour RGPD)
npx wrangler r2 bucket create gxo-videos --jurisdiction eu
```

**Sortie attendue:**
```
✅ Created bucket gxo-videos with jurisdiction eu
```

### Vérifier la création

```bash
npx wrangler r2 bucket list
```

---

## 📹 ÉTAPE 3: Cloner le Repository des Vidéos

```bash
cd /home/user

# Cloner si pas déjà fait
if [ ! -d "gxo-video-assets" ]; then
    git clone https://github.com/ayoubdil1972-stack/gxo-video-assets.git
fi

# Vérifier les vidéos
ls -lh gxo-video-assets/videos/
```

**Attendu: 12 fichiers MP4 (~5 MB chacun)**

---

## 📤 ÉTAPE 4: Uploader les Vidéos vers R2

### Option A: Script Automatique (Recommandé)

```bash
cd /home/user/webapp

# Exécuter le script d'upload
./scripts/upload_videos_to_r2.sh
```

### Option B: Upload Manuel (Une vidéo)

```bash
# Exemple pour une vidéo
npx wrangler r2 object put gxo-videos/instructions-fr.mp4 \
  --file=/home/user/gxo-video-assets/videos/instructions-fr.mp4 \
  --content-type="video/mp4" \
  --cache-control="public, max-age=31536000"
```

### Vérifier les uploads

```bash
npx wrangler r2 object list gxo-videos
```

**Attendu: Liste de 12 fichiers instructions-*.mp4**

---

## 🌐 ÉTAPE 5: Activer l'Accès Public R2

### Via Dashboard Cloudflare

1. **Aller sur:** https://dash.cloudflare.com/
2. **Navigation:** R2 → gxo-videos → Settings
3. **Section "Public Access":**
   - Cliquer "Allow Access"
   - **Copier l'URL publique:** `https://pub-XXXXXXXXXXXXX.r2.dev`
4. **Configurer les CORS (optionnel mais recommandé):**
   - Sous "CORS Policy"
   - Ajouter:
     ```json
     [
       {
         "AllowedOrigins": ["https://gxo-moissy-v2.pages.dev"],
         "AllowedMethods": ["GET", "HEAD"],
         "AllowedHeaders": ["*"],
         "MaxAgeSeconds": 3600
       }
     ]
     ```

### Via CLI (Alternative)

```bash
# Créer un domaine personnalisé (optionnel)
npx wrangler r2 bucket domain add gxo-videos videos.gxo-moissy-v2.pages.dev
```

### 🔗 Obtenir l'URL Publique

**Format:** `https://pub-XXXXXXXXXXXXX.r2.dev`

**Exemple:**
- `https://pub-abc123def456.r2.dev/instructions-fr.mp4`

**⚠️ IMPORTANT:** Notez bien cette URL, vous en aurez besoin pour la prochaine étape !

---

## 🧪 ÉTAPE 6: Tester les Vidéos R2

```bash
cd /home/user/webapp

# Remplacer par votre vraie URL R2
./scripts/test_r2_videos.sh https://pub-XXXXXXXXXXXXX.r2.dev
```

**Vérifications attendues:**
- ✅ HTTP 200 pour toutes les vidéos
- ✅ Content-Type: `video/mp4` (PAS `application/octet-stream`)
- ✅ Accept-Ranges: `bytes`
- ✅ Taille ~5 MB pour chaque vidéo

### Test Manuel d'une Vidéo

```bash
# Remplacer par votre URL R2
curl -I https://pub-XXXXXXXXXXXXX.r2.dev/instructions-fr.mp4
```

**Headers attendus:**
```
HTTP/2 200
content-type: video/mp4 ✅
accept-ranges: bytes ✅
cache-control: public, max-age=31536000 ✅
content-length: 5200000 ✅
```

---

## 💻 ÉTAPE 7: Mettre à Jour le Code

### A. Créer le fichier de configuration R2

```typescript
// src/config/r2.ts
export const R2_CONFIG = {
  BASE_URL: 'https://pub-XXXXXXXXXXXXX.r2.dev', // ⚠️ Remplacer par votre URL
  CACHE_MAX_AGE: 31536000, // 1 an
};

export function getVideoUrl(langue: string): string {
  return `${R2_CONFIG.BASE_URL}/instructions-${langue}.mp4`;
}
```

### B. Mettre à jour chauffeur-video.tsx

Le code sera mis à jour automatiquement dans la prochaine étape.

---

## 🔧 ÉTAPE 8: Appliquer les Modifications

**⚠️ ATTENDEZ:** Une fois que vous aurez votre URL R2 publique, donnez-la moi et je mettrai à jour automatiquement tout le code nécessaire.

**Ce que je vais modifier:**
1. `src/config/r2.ts` (nouveau fichier)
2. `src/pages/chauffeur-video.tsx` (URLs vidéos)
3. Documentation (README, etc.)

---

## 🚀 ÉTAPE 9: Build, Test et Deploy

```bash
cd /home/user/webapp

# Build
npm run build

# Test local
pm2 restart gxo-procedures-moissy
curl http://localhost:3000/chauffeur/consignes?lang=fr

# Commit et push
git add -A
git commit -m "feat(video): Migrate to Cloudflare R2 for iOS Safari compatibility"
git push origin main

# Attendre le déploiement GitHub Actions (~2-3 min)
sleep 120

# Tester en production
curl -I https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fr
```

---

## 📱 ÉTAPE 10: Test Final sur iPhone

1. **Ouvrir Safari mobile** → https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fr
2. **Vérifier:**
   - ✅ Page charge sans erreur
   - ✅ Bouton PLAY apparaît
   - ✅ Vidéo démarre avec son
   - ✅ Controls iOS fonctionnent
   - ✅ Plein écran disponible
   - ✅ PAS d'erreur "No MIME type"

---

## 🔍 Dépannage

### Problème: "Bucket already exists"

```bash
# Lister les buckets existants
npx wrangler r2 bucket list

# Supprimer l'ancien (si nécessaire)
npx wrangler r2 bucket delete gxo-videos

# Recréer
npx wrangler r2 bucket create gxo-videos --jurisdiction eu
```

### Problème: "Access Denied" lors de l'upload

```bash
# Vérifier les permissions du token
npx wrangler whoami

# Régénérer un token avec permissions R2 → Edit
```

### Problème: URL publique introuvable

- Dashboard Cloudflare → R2 → gxo-videos → Settings → Public Access
- Si "Allow Access" n'est pas activé, le cliquer
- L'URL apparaît sous "Public R2.dev Bucket URL"

### Problème: Vidéos ne chargent pas (CORS)

```bash
# Configurer CORS via wrangler
npx wrangler r2 bucket cors put gxo-videos --config cors-config.json
```

**cors-config.json:**
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3600
    }
  ]
}
```

---

## 📊 Avantages R2 vs GitHub CDN

| Critère | GitHub CDN | Cloudflare R2 |
|---------|------------|---------------|
| **Content-Type** | ❌ application/octet-stream | ✅ video/mp4 |
| **Range Requests** | ✅ Oui | ✅ Oui |
| **CORS** | ✅ Oui | ✅ Configurable |
| **Coût** | 💚 Gratuit | 💚 Gratuit (10 GB) |
| **Latence** | 🟡 Variable | 🚀 Rapide (CDN CF) |
| **Cache** | 🟡 5 min | ✅ Configurable (1 an) |
| **iOS Safari** | ❌ Problème MIME | ✅ Fonctionne |

---

## ✅ Checklist Complète

- [ ] Clé API Cloudflare configurée
- [ ] Bucket `gxo-videos` créé
- [ ] Repository vidéos cloné
- [ ] 12 vidéos uploadées vers R2
- [ ] Accès public R2 activé
- [ ] URL publique R2 obtenue
- [ ] Tests curl réussis (Content-Type: video/mp4)
- [ ] Code mis à jour avec URL R2
- [ ] Build local réussi
- [ ] Déployé en production
- [ ] Test iPhone Safari réussi

---

## 🎯 Prochaine Action POUR VOUS

**➡️ Configurez votre clé API Cloudflare (Étape 1)**

1. Ouvrir l'onglet **Deploy**
2. Créer un token avec permissions **R2 → Edit**
3. Sauvegarder le token dans GenSpark

**Une fois fait, dites-moi "API configurée" et je lancerai automatiquement les étapes 2-6 pour vous !**

---

**Questions fréquentes:**

**Q: R2 est-il vraiment gratuit ?**  
R: Oui, jusqu'à 10 GB de stockage et 10 millions de requêtes/mois (largement suffisant pour 12 vidéos × 5 MB)

**Q: Puis-je utiliser un domaine personnalisé ?**  
R: Oui, via `wrangler r2 bucket domain add` ou dans le dashboard

**Q: Les vidéos sont-elles sécurisées ?**  
R: Oui, accès HTTPS uniquement, CORS configurable, et vous pouvez ajouter un CDN avec authentification

**Q: Combien de temps prend la migration ?**  
R: ~15-20 minutes pour tout le processus (upload + configuration + déploiement)
