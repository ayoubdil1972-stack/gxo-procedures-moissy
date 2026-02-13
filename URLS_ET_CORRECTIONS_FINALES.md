# ✅ URLS FINALES - Système Chauffeur GXO Moissy

## 🌐 SITE PRODUCTION (Cloudflare Pages)

**Base URL**: https://gxo-moissy-v2.pages.dev/

**Repository**: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy (PUBLIC)

---

## 📱 WORKFLOW COMPLET CHAUFFEUR

### 1️⃣ QR Code - Point d'entrée
```
https://gxo-moissy-v2.pages.dev/qrcode-chauffeur
```
- Page d'accueil avec explication du processus
- Bouton "Démarrer la Procédure"

### 2️⃣ Sélection Langue
```
https://gxo-moissy-v2.pages.dev/chauffeur/langue
```
- 12 langues disponibles: NL, FR, DE, IT, FI, DA, CS, BG, PL, RO, PT, HR
- Grandes cartes avec drapeaux

### 3️⃣ Vidéo Instructions
```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang={LANGUE}
```

**Exemples**:
- Italien: `?lang=it`
- Néerlandais: `?lang=nl`
- Français: `?lang=fr`
- Allemand: `?lang=de`

**✅ CORRECTION APPLIQUÉE**: 
- Retiré `crossorigin="anonymous"` qui bloquait les vidéos sur iOS
- Changé `preload="metadata"` en `preload="auto"`
- Les vidéos devraient maintenant fonctionner sur iPhone

### 4️⃣ Inscription
```
https://gxo-moissy-v2.pages.dev/chauffeur/inscription
```
- Formulaire: pseudo, entreprise, numéro de quai
- Génère un ID chauffeur unique

### 5️⃣ Tâches de Sécurité
```
https://gxo-moissy-v2.pages.dev/chauffeur/taches?id={ID}
```
- 5 tâches à valider
- Exemple: `?id=12`

### 6️⃣ Dashboard Accueil Chauffeur
```
https://gxo-moissy-v2.pages.dev/accueil-chauffeur
```
- Récapitulatif et félicitations
- Liste des chauffeurs actifs en temps réel
- 4 procédures principales

---

## 🔗 FLUX DE NAVIGATION

```
QR Code
  ↓ [Démarrer]
Langue (sélection parmi 12)
  ↓ [Choisir langue]
Consignes (?lang=it par exemple)
  ↓ [Regarder vidéo complète]
Inscription
  ↓ [Remplir formulaire]
Tâches (?id=généré)
  ↓ [Valider 5 tâches]
Dashboard Accueil
  ✅ [Procédure terminée]
```

---

## 🎬 VIDÉOS (GitHub CDN)

**Repository vidéos**: https://github.com/ayoubdil1972-stack/gxo-video-assets (PUBLIC)

**Base URL**: 
```
https://raw.githubusercontent.com/ayoubdil1972-stack/gxo-video-assets/main/videos/instructions-{langue}.mp4
```

**Exemples**:
- Italien: `.../instructions-it.mp4` (5.1 MB)
- Néerlandais: `.../instructions-nl.mp4` (5.0 MB)
- Français: `.../instructions-fr.mp4` (5.2 MB)

**Total**: 12 vidéos, 61 MB

---

## 🔧 CORRECTIONS APPLIQUÉES

### 1. ✅ Vidéo Mobile
**Problème**: Les vidéos ne fonctionnaient pas sur iPhone
**Solution**: 
- Retiré `crossorigin="anonymous"` qui bloque le chargement depuis GitHub CDN
- Changé `preload="metadata"` en `preload="auto"` pour chargement optimisé

### 2. 🔄 Chauffeurs Actifs
**Problème**: Les chauffeurs inscrits ne s'affichent pas dans `/accueil-chauffeur`
**Cause possible**: Base de données D1 pas synchronisée ou vide
**Solution à vérifier**: 
- S'assurer que les chauffeurs sont bien insérés dans la base D1
- API `/api/chauffeur/liste` doit retourner les chauffeurs
- Vérifier que la base D1 est configurée en production

### 3. ✅ URLs Cohérentes
**Toutes les URLs utilisent maintenant**: `https://gxo-moissy-v2.pages.dev/`

---

## 📦 REPOSITORIES

| Repository | Visibilité | URL |
|------------|------------|-----|
| gxo-procedures-moissy | 🌍 PUBLIC | https://github.com/ayoubdil1972-stack/gxo-procedures-moissy |
| gxo-video-assets | 🌍 PUBLIC | https://github.com/ayoubdil1972-stack/gxo-video-assets |

---

## 🎯 QR CODE À GÉNÉRER

Pour déploiement physique, générer un QR code avec:
```
https://gxo-moissy-v2.pages.dev/qrcode-chauffeur
```

**Outil**: https://www.qr-code-generator.com/

---

## 📱 TESTS À EFFECTUER SUR IPHONE

### Test 1: Workflow Complet
1. Scanner le QR code ou ouvrir: `https://gxo-moissy-v2.pages.dev/qrcode-chauffeur`
2. Cliquer "Démarrer"
3. Sélectionner "Italiano"
4. **TESTER LA VIDÉO** (doit fonctionner maintenant)
5. Remplir l'inscription
6. Valider les 5 tâches
7. Voir le dashboard

### Test 2: Vidéo Directe
Ouvrir directement:
```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=it
```
- Vérifier que la vidéo se charge
- Cliquer sur "▶ Lancer la vidéo"
- Vérifier la lecture avec son
- Tester le plein écran

---

## 🔍 DIAGNOSTIC BASE DE DONNÉES

Pour vérifier pourquoi les chauffeurs ne s'affichent pas:

### Option 1: Vérifier localement
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM chauffeur_arrivals LIMIT 10"
```

### Option 2: Vérifier en production
```bash
npx wrangler d1 execute webapp-production --command="SELECT * FROM chauffeur_arrivals LIMIT 10"
```

### Option 3: Tester l'API
```bash
curl https://gxo-moissy-v2.pages.dev/api/chauffeur/liste
```

---

## ✅ CHECKLIST FINALE

- [x] Repository principal rendu PUBLIC
- [x] Vidéos hébergées sur GitHub CDN (public)
- [x] URLs Cloudflare Pages cohérentes
- [x] Correction vidéo mobile appliquée (`crossorigin` retiré)
- [x] Build et déploiement effectués
- [ ] **À TESTER**: Vidéo sur iPhone 12
- [ ] **À VÉRIFIER**: Chauffeurs actifs s'affichent dans dashboard

---

## 📞 SUPPORT

- **Issues**: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/issues
- **Site**: https://gxo-moissy-v2.pages.dev/

---

**Dernière mise à jour**: 12 février 2026  
**Version**: 12.1.3  
**Status**: ✅ Déployé avec corrections mobile
