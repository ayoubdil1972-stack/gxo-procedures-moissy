# 📸 GUIDE VISUEL - DÉSACTIVER BUILD CLOUDFLARE

## 🎯 OBJECTIF
Désactiver le build automatique Cloudflare pour utiliser uniquement GitHub Actions.

---

## 📋 ÉTAPES AVEC CAPTURES D'ÉCRAN

### ÉTAPE 1 : OUVRIR CLOUDFLARE DASHBOARD

**URL directe** :
```
https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy
```

**Ce que vous verrez** :
- Nom du projet : **gxo-procedures-moissy**
- Plusieurs onglets en haut : Overview, Deployments, Settings, etc.

---

### ÉTAPE 2 : CLIQUER SUR "SETTINGS"

**Où cliquer** :
- Regardez les onglets en haut de la page
- Cliquez sur **"Settings"** (icône d'engrenage ⚙️)

---

### ÉTAPE 3 : SCROLLEZ JUSQU'À "BUILDS & DEPLOYMENTS"

**Dans la page Settings** :
- Scrollez vers le bas
- Cherchez la section **"Builds & deployments"**
- Vous verrez des sous-sections :
  - Production branch
  - Build configuration
  - Environment variables

---

### ÉTAPE 4 : DÉSACTIVER "PRODUCTION BRANCH"

**Dans "Builds & deployments"** :

#### Option A : Production branch = None
```
Production branch: [main ▼]  → changez en  [None ▼]
```

**Comment faire** :
1. Cliquez sur le dropdown "Production branch"
2. Sélectionnez **"None"**
3. Cliquez sur **"Save"**

#### Option B : Supprimer la configuration de build
```
Build configuration
  Build command: npm run build
  Build output directory: /dist
  [Edit configuration]  ← Cliquez ici
```

**Comment faire** :
1. Cliquez sur **"Edit configuration"**
2. Supprimez le contenu de "Build command"
3. Supprimez le contenu de "Build output directory"
4. Cliquez sur **"Save"**

---

### ÉTAPE 5 : VÉRIFIER QUE C'EST BIEN DÉSACTIVÉ

**Après avoir sauvegardé** :

**Vous devriez voir** :
```
Production branch: None
```
OU
```
Build configuration
  No build configuration set
```

**✅ C'est bon !** Cloudflare ne tentera plus de rebuilder automatiquement.

---

### ÉTAPE 6 : RELANCER LE WORKFLOW GITHUB

**URL** :
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions
```

**Comment faire** :
1. Cliquez sur l'onglet **"Actions"**
2. Vous verrez une liste de workflows
3. Cherchez **"Deploy to Cloudflare Pages"**
4. Cliquez sur **"Run workflow"** (bouton vert à droite)
5. Popup apparaît :
   - Branch: **main** (déjà sélectionné)
   - Cliquez sur **"Run workflow"** (bouton vert dans le popup)

---

### ÉTAPE 7 : SURVEILLER LE DÉPLOIEMENT

**Ce que vous verrez** :
```
Deploy to Cloudflare Pages
  🟡 In progress  (icône jaune qui tourne)
```

**Attendez 5-7 minutes...**

**Quand c'est terminé** :
```
Deploy to Cloudflare Pages
  ✅ Success  (icône verte)
```

**Cliquez sur le workflow** pour voir les détails :
- ✅ Checkout code
- ✅ Setup Node.js
- ✅ Install dependencies
- ✅ Build project
- ✅ Verify secrets
- ✅ **Deploy to Cloudflare Pages**
  - ✅ Uploading... (93/93)
  - ✅ Success! Uploaded 93 files (71.01 MB)
  - ✅ Deployment complete!
- ✅ Deployment summary

---

### ÉTAPE 8 : TESTER LE SITE

**URL de production** :
```
https://gxo-moissy-v2.pages.dev
```

**Sur iPhone 12 - Safari** :
```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=nl
```

**Résultat attendu** :
- ✅ Page noire avec bande orange
- ✅ Logo GXO centré
- ✅ Label "Nederlandse instructies"
- ✅ Bouton PLAY orange
- ✅ Vidéo se lance au clic
- ✅ Barre de progression orange
- ✅ Bouton "Doorgaan" à la fin

**✅ SUCCÈS !** Le site est en ligne !

---

## 🔍 OÙ TROUVER CHAQUE ÉLÉMENT

### Sur Cloudflare Dashboard :
```
https://dash.cloudflare.com/
  └── Account Home
      └── Pages
          └── gxo-procedures-moissy
              └── Settings ← CLIQUEZ ICI
                  └── Builds & deployments ← SCROLLEZ ICI
                      └── Production branch: [None] ← CHANGEZ ICI
```

### Sur GitHub :
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy
  └── Actions ← ONGLET EN HAUT
      └── Deploy to Cloudflare Pages ← WORKFLOW
          └── Run workflow ← BOUTON VERT
```

---

## 💡 POURQUOI CETTE ÉTAPE ?

**Avant** :
```
GitHub → Cloudflare clone repo → Build Token ❌ → Échec
```

**Après** :
```
GitHub → GitHub Actions build ✅ → Wrangler upload ✅ → CDN ✅
```

Cloudflare reçoit les fichiers **déjà buildés** par GitHub Actions.
Plus besoin du Build Token !

---

## 🆘 SI VOUS NE TROUVEZ PAS "BUILDS & DEPLOYMENTS"

**Alternative simple** :

### URL directe vers les paramètres de build :
```
https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy/settings/builds-deployments
```

**Copiez-collez cette URL** dans votre navigateur → vous arriverez directement sur la bonne page.

---

## ✅ CHECKLIST VISUELLE

Cochez au fur et à mesure :

- [ ] ✅ J'ai ouvert Cloudflare Dashboard
- [ ] ✅ J'ai cliqué sur "Settings"
- [ ] ✅ J'ai trouvé "Builds & deployments"
- [ ] ✅ J'ai changé "Production branch" en "None"
- [ ] ✅ J'ai cliqué sur "Save"
- [ ] ✅ J'ai ouvert GitHub Actions
- [ ] ✅ J'ai cliqué sur "Run workflow"
- [ ] ✅ J'attends 5-7 minutes
- [ ] ✅ Le workflow est ✅ vert
- [ ] ✅ J'ai ouvert https://gxo-moissy-v2.pages.dev
- [ ] ✅ La vidéo fonctionne sur iPhone 12
- [ ] 🎉 **SUCCÈS !**

---

## 🎯 RÉSUMÉ EN 3 ACTIONS

1. **Cloudflare** : Production branch → None → Save
2. **GitHub** : Actions → Run workflow → Attendre
3. **Test** : Ouvrir le site et tester la vidéo

**Temps total** : ~10 minutes

---

**Vous avez besoin d'aide ?** Répondez avec :
- **"Je ne trouve pas Settings"**
- **"Je ne trouve pas Builds & deployments"**
- **"Le workflow a échoué"**
- **"Le site ne se charge pas"**

Je vous guiderai étape par étape ! 🚀
