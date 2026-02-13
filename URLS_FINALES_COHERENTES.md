# 📱 URLs Finales et Cohérentes - GXO Procedures Moissy

**Date:** 13 février 2026  
**Version:** v12.2.0  
**Statut:** ✅ Toutes les URLs sont fonctionnelles et cohérentes

---

## 🌐 Site Principal - Cloudflare Pages

**Base URL:** https://gxo-procedures-moissy.pages.dev

### 🚚 Workflow Chauffeur Externe (12 langues)

#### 1️⃣ Point d'entrée QR Code
```
https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
```
- Page d'accueil avec logo GXO et bouton "Démarrer"
- Redirige vers la sélection de langue

#### 2️⃣ Sélection de langue
```
https://gxo-procedures-moissy.pages.dev/chauffeur/langue
```
- 12 langues disponibles avec drapeaux :
  - 🇫🇷 Français (fr)
  - 🇳🇱 Nederlands (nl)
  - 🇩🇪 Deutsch (de)
  - 🇫🇮 Suomi (fi)
  - 🇩🇰 Dansk (da)
  - 🇨🇿 Čeština (cs)
  - 🇧🇬 Български (bg)
  - 🇵🇱 Polski (pl)
  - 🇷🇴 Română (ro)
  - 🇮🇹 Italiano (it)
  - 🇵🇹 Português (pt)
  - 🇭🇷 Hrvatski (hr)

#### 3️⃣ Vidéo d'instructions (par langue)
```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=fr
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=de
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=fi
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=da
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=cs
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=bg
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=pl
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=ro
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=it
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=pt
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=hr
```
- **✅ CORRIGÉ:** Support Range Requests pour iOS Safari
- Vidéo obligatoire (pas de skip)
- Détection mobile/desktop
- Plein écran disponible
- Progress bar en temps réel

#### 4️⃣ Inscription chauffeur
```
https://gxo-procedures-moissy.pages.dev/chauffeur/inscription
```
- **✅ CORRIGÉ:** Set status='in_progress' pour apparaître dans dashboard
- Formulaire : Pseudo, Entreprise, Numéro de quai
- Langue et video_completed automatiques

#### 5️⃣ Tâches de sécurité (5 étapes)
```
https://gxo-procedures-moissy.pages.dev/chauffeur/taches?id=12
```
- 5 tâches obligatoires :
  1. ✅ EPI porté
  2. ✅ Placement au quai
  3. ✅ Échange de palette
  4. ✅ Accueil notifié
  5. ✅ Clés remises
- Chaque validation enregistrée en temps réel

#### 6️⃣ Dashboard chauffeur
```
https://gxo-procedures-moissy.pages.dev/accueil-chauffeur
```
- Vue temps réel des chauffeurs actifs
- **✅ CORRIGÉ:** Affiche les chauffeurs avec status='in_progress'
- Progression des tâches (0-100%)
- Temps écoulé depuis l'arrivée
- Couleurs : Rouge (<40%), Orange (40-79%), Vert (≥80%)

---

## 📹 Vidéos - GitHub CDN

**Repository:** https://github.com/ayoubdil1972-stack/gxo-video-assets  
**Base URL:** https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/

### URLs des vidéos (5 MB chacune)
```
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-fr.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-nl.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-de.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-fi.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-da.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-cs.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-bg.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-pl.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-ro.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-it.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-pt.mp4
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-hr.mp4
```

**✅ Caractéristiques:**
- Support HTTP Range Requests (iOS compatible)
- Cache public 1 an
- Format MP4 H.264
- Total: 61 MB (12 vidéos × ~5 MB)

---

## 🔧 API Endpoints

### Vidéos (Proxy avec Range Request)
```
/api/video/:langue
```
- **✅ CORRIGÉ:** Stream avec support HTTP 206 Partial Content
- Forward Range headers vers GitHub CDN
- CORS activé
- Cache 1 an

### Chauffeurs
```
POST /api/chauffeur/inscription
GET  /api/chauffeur/liste
POST /api/chauffeur/valider-tache
GET  /api/chauffeur/progression
```

---

## 📦 Repositories GitHub

### 1. Site principal (PUBLIC)
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy
```
- Code source Hono + Cloudflare Pages
- Migrations D1 Database
- GitHub Actions (auto-deploy)

### 2. Vidéos (PUBLIC)
```
https://github.com/ayoubdil1972-stack/gxo-video-assets
```
- 12 vidéos MP4 (61 MB total)
- Servi via GitHub CDN

---

## ✅ Corrections Appliquées

### 1. Vidéo mobile (13/02/2026)
**Problème:** HTTP 404 "No MIME type file"  
**Cause:** Cloudflare Pages limite 25 MB, vidéos 61 MB rejetées  
**Solution:**
- ✅ Hébergement sur GitHub public repo
- ✅ API proxy avec Range Request support (HTTP 206)
- ✅ Stream au lieu de charger en mémoire
- ✅ Forward Range headers client → GitHub
- ✅ Support iOS Safari

**Commit:** `051fef8` - "fix(video): Add Range Request support for mobile video playback"

### 2. Dashboard chauffeurs (13/02/2026)
**Problème:** Chauffeurs inscrits n'apparaissent pas dans `/accueil-chauffeur`  
**Cause:** Champ `status` non défini à l'inscription  
**Solution:**
- ✅ Définir explicitement `status='in_progress'` dans INSERT
- ✅ Assurer visibilité dans dashboard temps réel

**Commit:** `563f845` - "fix(chauffeur): Set status='in_progress' on registration"

---

## 🧪 Test Workflow Complet

### Sur iPhone 12 (recommandé)

1. **Scanner le QR Code** → https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
2. **Cliquer "Démarrer"** → Redirige vers `/chauffeur/langue`
3. **Sélectionner langue** (ex: Italien) → Redirige vers `/chauffeur/video?lang=it`
4. **Lancer la vidéo** → Bouton PLAY géant sur mobile
5. **Regarder en entier** → Progress bar 0-100%
6. **Cliquer "Continuer"** → Redirige vers `/chauffeur/inscription`
7. **Remplir formulaire** → Pseudo, Entreprise, Quai
8. **Valider** → Redirige vers `/chauffeur/taches?id=X`
9. **Compléter 5 tâches** → Validation une par une
10. **Voir dashboard** → https://gxo-procedures-moissy.pages.dev/accueil-chauffeur

### URLs de test direct
```bash
# Test vidéo Range Request
curl -I "https://gxo-procedures-moissy.pages.dev/api/video/bg" \
  --header "Range: bytes=0-1023"
# Réponse attendue: HTTP 206 Partial Content

# Test chauffeurs actifs
curl "https://gxo-procedures-moissy.pages.dev/api/chauffeur/liste"
# Réponse attendue: JSON avec chauffeurs status='in_progress'
```

---

## 📱 QR Code à générer

**URL d'entrée:**
```
https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
```

**Outil recommandé:** https://www.qr-code-generator.com/

**Impression suggérée:**
- Taille : A4 paysage
- Titre : "GXO Moissy - Procédures Chauffeurs"
- Sous-titre : "Scannez pour commencer"
- Langues : "12 langues disponibles"

---

## 🔄 Déploiement Automatique

**GitHub Actions:**
- Trigger: Push sur `main`
- Build: `npm run build`
- Deploy: Cloudflare Pages via `wrangler`
- Durée: ~2-3 minutes

**Vérification déploiement:**
```bash
curl -I https://gxo-procedures-moissy.pages.dev
# Date header = dernier déploiement
```

---

## 📋 Statut Technique

- ✅ Vidéos : Fonctionnelles sur mobile/desktop
- ✅ Range Requests : Support iOS Safari
- ✅ Dashboard : Affiche chauffeurs actifs
- ✅ 12 langues : Toutes opérationnelles
- ✅ Base D1 : Migrations appliquées
- ✅ GitHub Actions : Auto-deploy actif
- ✅ CORS : Activé pour API vidéos

---

**Document généré le:** 13 février 2026  
**Dernière mise à jour:** Après commits `051fef8` et `563f845`  
**Prêt pour production:** ✅ OUI
