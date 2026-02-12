# 🔧 CORRECTION : BUILD TOKEN INVALIDE

## ❌ ERREUR DÉTECTÉE

```
Failed: The build token selected for this build has been deleted or rolled 
and cannot be used for this build.
```

**Build ID :** bf227320-274e-4202-b323-c93948078d8f  
**Script :** gxo-procedures-moissy

---

## 🎯 CAUSE DU PROBLÈME

Cloudflare Pages essaie d'utiliser un "Build Token" qui a été :
- Supprimé
- Révoqué
- Expiré

Ce token est différent du token API que vous avez mis dans GitHub.

---

## ✅ SOLUTION : DÉSACTIVER LE BUILD AUTOMATIQUE CLOUDFLARE

Puisque nous utilisons **GitHub Actions** pour builder et déployer, nous n'avons **pas besoin** du build automatique de Cloudflare.

### Étapes pour corriger :

#### 1️⃣ Allez sur Cloudflare Dashboard
```
https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy
```

#### 2️⃣ Cliquez sur "Settings"

#### 3️⃣ Scrollez jusqu'à "Build configuration"

#### 4️⃣ Désactivez "Automatic deployments"
OU
Supprimez la configuration de build (Build command, Build output directory)

---

## 🔄 ALTERNATIVE : DÉPLOYER UNIQUEMENT VIA GITHUB ACTIONS

Notre workflow GitHub Actions fait déjà tout :
1. ✅ Build le projet (npm run build)
2. ✅ Deploy vers Cloudflare (wrangler pages deploy)

**Cloudflare n'a pas besoin de rebuilder !**

---

## 📋 ÉTAPES DÉTAILLÉES

### Sur Cloudflare Dashboard :

1. **Allez sur** : https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy

2. **Cliquez sur "Settings"** (onglet en haut)

3. **Section "Builds & deployments"**

4. **Trouvez "Build configuration"**

5. **Deux options** :

   **Option A : Désactiver complètement**
   - Cliquez sur "Edit configuration"
   - Supprimez tout (Build command, Output directory)
   - Sauvegardez

   **Option B : Désactiver les builds automatiques**
   - Trouvez "Production branch"
   - Désactivez ou changez pour "None"

---

## 🚀 WORKFLOW ACTUEL (QUI FONCTIONNE)

Notre déploiement via GitHub Actions :

```
GitHub push → GitHub Actions → Build → Wrangler → Cloudflare Pages
```

**Cloudflare reçoit déjà les fichiers buildés**, pas besoin de rebuilder !

---

## ✅ VÉRIFICATION

Après avoir désactivé le build Cloudflare :

### 1️⃣ Relancez le workflow GitHub
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions
```

Cliquez sur "Run workflow" sur le dernier workflow.

### 2️⃣ Vérifiez qu'il se termine avec succès
```
✅ Deploy to Cloudflare Pages
✅ Deployment summary
```

### 3️⃣ Testez le site
```
https://gxo-procedures-moissy.pages.dev
```

---

## 🎯 SI VOUS NE TROUVEZ PAS LES PARAMÈTRES

### Alternative : Déployer directement via Wrangler

Le déploiement GitHub Actions devrait quand même fonctionner car il upload directement les fichiers sans passer par le système de build de Cloudflare.

**Relancez simplement le workflow :**
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions
```

Cliquez sur "Deploy to Cloudflare Pages" → "Run workflow" → "Run workflow"

---

## 📊 COMPARAISON DES MÉTHODES

| Méthode | Build | Deploy | Status |
|---------|-------|--------|--------|
| **GitHub Actions** | ✅ npm run build | ✅ wrangler deploy | ✅ **RECOMMANDÉ** |
| **Cloudflare Auto** | ❌ Token invalide | ❌ Échoue | ❌ À désactiver |

---

## 🔗 LIENS IMPORTANTS

| Action | URL |
|--------|-----|
| **Cloudflare Settings** | https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy/settings |
| **GitHub Actions** | https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions |
| **Site sandbox** | https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai |

---

## 🎯 PROCHAINES ÉTAPES

### Option A : Désactiver le build Cloudflare (recommandé)
1. Allez sur Cloudflare Settings
2. Désactivez "Build configuration"
3. Relancez le workflow GitHub
4. Testez le site

### Option B : Relancer le workflow directement
1. Allez sur GitHub Actions
2. Cliquez sur "Run workflow"
3. Le déploiement devrait fonctionner malgré l'erreur de build

---

## 💡 POURQUOI CETTE ERREUR ?

Cloudflare Pages propose deux façons de déployer :

1. **Build + Deploy automatique** (connecté à Git)
   - Cloudflare clone le repo
   - Cloudflare build le projet
   - Cloudflare deploy
   - ❌ Nécessite un "Build Token" valide

2. **Deploy uniquement** (via Wrangler/CLI)
   - Vous buildez localement ou via CI/CD
   - Vous uploadez les fichiers buildés
   - ✅ Nécessite seulement un API Token

**Nous utilisons la méthode 2**, donc le Build Token n'est pas nécessaire.

---

## ✅ CHECKLIST

- [ ] Aller sur Cloudflare Settings
- [ ] Désactiver "Build configuration" ou "Automatic deployments"
- [ ] Relancer le workflow GitHub Actions
- [ ] Vérifier que le déploiement réussit
- [ ] Tester https://gxo-procedures-moissy.pages.dev

---

**🎯 Quelle option choisissez-vous ?**

**A** : Je vais désactiver le build Cloudflare  
**B** : Je relance juste le workflow GitHub Actions  
**C** : J'ai besoin d'aide pour trouver les paramètres

---

**Dernière mise à jour :** 12 février 2026  
**Erreur :** Build Token invalide  
**Solution :** Désactiver build Cloudflare (utiliser GitHub Actions uniquement)
