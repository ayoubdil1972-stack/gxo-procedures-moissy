# 🎯 Migration R2 - Instructions Rapides

## 🚀 Démarrage Rapide (3 étapes)

### 1️⃣ Configurer l'API Cloudflare

**Via GenSpark (Recommandé):**
- Aller dans l'onglet **Deploy** (sidebar)
- Créer un token Cloudflare avec permissions **R2 → Edit**
- Entrer et sauvegarder le token

### 2️⃣ Exécuter le script automatique

```bash
cd /home/user/webapp
./scripts/setup_r2_complete.sh
```

**Ce script va:**
- ✅ Créer le bucket `gxo-videos`
- ✅ Uploader les 12 vidéos (61 MB)
- ✅ Configurer le cache et CORS
- ✅ Afficher les instructions pour l'accès public

### 3️⃣ Activer l'accès public + Finaliser

**Dans le dashboard Cloudflare:**
1. Ouvrir https://dash.cloudflare.com/
2. R2 → gxo-videos → Settings → Public Access → **Allow Access**
3. **Copier l'URL:** `https://pub-XXXXX.r2.dev`

**Relancer le script avec l'URL:**
```bash
./scripts/setup_r2_complete.sh https://pub-XXXXX.r2.dev
```

**Build et déployer:**
```bash
npm run build
git add -A
git commit -m "feat(video): Migrate to Cloudflare R2"
git push origin main
```

---

## 📁 Fichiers Créés

```
webapp/
├── src/config/r2.ts              # Configuration R2
├── scripts/
│   ├── setup_r2_complete.sh      # 🌟 Script automatique complet
│   ├── upload_videos_to_r2.sh    # Upload manuel si besoin
│   └── test_r2_videos.sh         # Tester les vidéos
├── cors-config.json              # Configuration CORS
├── GUIDE_MIGRATION_R2.md         # Guide détaillé complet
└── GUIDE_MIGRATION_R2_RAPIDE.md  # Ce fichier (guide rapide)
```

---

## 🧪 Tests

### Test local (après avoir l'URL R2)

```bash
# Tester toutes les vidéos
./scripts/test_r2_videos.sh https://pub-XXXXX.r2.dev

# Tester une vidéo manuellement
curl -I https://pub-XXXXX.r2.dev/instructions-fr.mp4
```

**Headers attendus:**
```
HTTP/2 200
content-type: video/mp4 ✅
accept-ranges: bytes ✅
cache-control: public, max-age=31536000 ✅
```

### Test production (après déploiement)

```bash
# Page vidéo
curl -I https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fr

# Sur iPhone Safari
# Ouvrir: https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fr
# Vérifier: Vidéo se lance sans erreur MIME type
```

---

## ❓ Problèmes Courants

### "Not authenticated"
```bash
# Vérifier l'auth
npx wrangler whoami

# Si échec → Configurer l'API dans Deploy tab
```

### "Bucket already exists"
```bash
# Supprimer et recréer
npx wrangler r2 bucket delete gxo-videos
npx wrangler r2 bucket create gxo-videos --jurisdiction eu
```

### "Access Denied" sur vidéos
- Dashboard → R2 → gxo-videos → Settings
- **Public Access → Allow Access** ✅

### Vidéos ne chargent pas sur la page
```bash
# Vérifier l'URL dans le code
cat src/config/r2.ts | grep BASE_URL

# Doit être: https://pub-XXXXX.r2.dev (votre vraie URL)
# Pas: https://pub-CHANGEME.r2.dev
```

---

## 📊 Avantages R2

| Avant (GitHub CDN) | Après (R2) |
|-------------------|-----------|
| ❌ `application/octet-stream` | ✅ `video/mp4` |
| ❌ Erreur iOS Safari | ✅ Fonctionne |
| 🟡 Cache 5 min | ✅ Cache 1 an |
| 🟡 Latence variable | 🚀 CDN Cloudflare |

---

## ✅ Checklist Rapide

- [ ] API Cloudflare configurée (Deploy tab)
- [ ] Script `setup_r2_complete.sh` exécuté
- [ ] Accès public R2 activé (Dashboard)
- [ ] URL R2 obtenue (`https://pub-XXXXX.r2.dev`)
- [ ] Script relancé avec URL
- [ ] Tests curl réussis (Content-Type: video/mp4)
- [ ] Code build sans erreur
- [ ] Git commit + push
- [ ] Déploiement GitHub Actions réussi
- [ ] Test iPhone Safari ✅

---

## 🆘 Besoin d'Aide ?

**Documentation complète:** `GUIDE_MIGRATION_R2.md`

**Support:**
- Problème technique → Consulter le guide complet
- URL R2 introuvable → Dashboard Cloudflare
- Erreurs de build → Vérifier `src/config/r2.ts`

---

**🎯 Temps estimé: 15-20 minutes**  
**💰 Coût: Gratuit (10 GB inclus dans R2)**  
**✅ Résultat: Vidéos fonctionnelles sur iOS Safari**
