# 📸 GUIDE AVEC CAPTURES D'ÉCRAN - DÉSACTIVER WORKERS BUILDS

## 🎯 OBJECTIF
Désactiver **Workers Builds** sur Cloudflare pour éviter l'erreur :
```
Build ID: 63c326a9-c2c8-444f-8f6d-9cb0dd6ead11
Script: gxo-procedures-moissy
```

---

## 📋 NAVIGATION ÉTAPE PAR ÉTAPE

### 🔹 ÉTAPE 1 : OUVRIR CLOUDFLARE DASHBOARD

**URL** : https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5

**Ce que vous verrez** :
```
┌─────────────────────────────────────────────┐
│ Cloudflare Dashboard                   [👤] │
├─────────────────────────────────────────────┤
│ 🔍 Search...                                │
│                                             │
│ 📊 Account Home                             │
│ 🌐 Websites                                 │
│ 🔧 Workers & Pages              ← CLIQUEZ   │
│ 📧 Email                                    │
│ 🔐 Access                                   │
│ ...                                         │
└─────────────────────────────────────────────┘
```

**Action** : Cliquez sur **"Workers & Pages"** dans le menu de gauche.

---

### 🔹 ÉTAPE 2 : SÉLECTIONNER VOTRE PROJET

**Ce que vous verrez** :
```
┌─────────────────────────────────────────────┐
│ Workers & Pages                             │
├─────────────────────────────────────────────┤
│                                             │
│ All projects  Workers  Pages                │
│                                             │
│ ┌──────────────────────────┐                │
│ │ gxo-procedures-moissy    │ ← CLIQUEZ      │
│ │ Type: Pages              │                │
│ │ Last deployed: 2 min ago │                │
│ └──────────────────────────┘                │
│                                             │
└─────────────────────────────────────────────┘
```

**Action** : Cliquez sur **"gxo-procedures-moissy"**.

---

### 🔹 ÉTAPE 3 : OUVRIR LES PARAMÈTRES

**Ce que vous verrez** :
```
┌─────────────────────────────────────────────┐
│ gxo-procedures-moissy                       │
├─────────────────────────────────────────────┤
│ Overview  Deployments  Analytics  Settings  │
│                                    ↑        │
│                               CLIQUEZ ICI   │
└─────────────────────────────────────────────┘
```

**Action** : Cliquez sur l'onglet **"Settings"** (icône ⚙️).

---

### 🔹 ÉTAPE 4 : TROUVER "BUILDS & DEPLOYMENTS"

**Ce que vous verrez en scrollant** :
```
┌─────────────────────────────────────────────┐
│ Settings                                    │
├─────────────────────────────────────────────┤
│                                             │
│ General                                     │
│ ├─ Project name                             │
│ ├─ Production domain                        │
│ └─ ...                                      │
│                                             │
│ Builds & deployments        ← SCROLLEZ ICI  │
│ ├─ Production branch                        │
│ ├─ Preview branches                         │
│ ├─ Build configuration                      │
│ └─ ...                                      │
│                                             │
│ Environment variables                       │
│ └─ ...                                      │
│                                             │
└─────────────────────────────────────────────┘
```

**Action** : Scrollez jusqu'à la section **"Builds & deployments"**.

---

### 🔹 ÉTAPE 5 : DÉSACTIVER "PRODUCTION BRANCH"

**Ce que vous verrez** :
```
┌─────────────────────────────────────────────┐
│ Builds & deployments                        │
├─────────────────────────────────────────────┤
│                                             │
│ Production branch                           │
│ ┌─────────────────────┐                     │
│ │ main            ▼   │  ← CLIQUEZ         │
│ └─────────────────────┘                     │
│                                             │
│ Options du dropdown :                       │
│ ┌─────────────────────┐                     │
│ │ main                │                     │
│ │ None            ✓   │  ← SÉLECTIONNEZ    │
│ │ Disable             │                     │
│ └─────────────────────┘                     │
│                                             │
│ [Save]  [Cancel]        ← CLIQUEZ SAVE      │
│                                             │
└─────────────────────────────────────────────┘
```

**Actions** :
1. Cliquez sur le dropdown **"Production branch"**
2. Sélectionnez **"None"** ou **"Disable"**
3. Cliquez sur **"Save"**

---

### 🔹 ÉTAPE 6 : VÉRIFICATION

**Ce que vous devriez voir après avoir sauvegardé** :
```
┌─────────────────────────────────────────────┐
│ Builds & deployments                        │
├─────────────────────────────────────────────┤
│                                             │
│ Production branch: None          ← ✅ BON   │
│                                             │
│ Preview branches: Disabled                  │
│                                             │
│ Build configuration: Not configured         │
│                                             │
└─────────────────────────────────────────────┘
```

**✅ Parfait !** Cloudflare ne tentera plus de rebuilder automatiquement.

---

## 🚀 ALTERNATIVE : DÉSACTIVER VIA "BUILD CONFIGURATION"

Si vous ne voyez pas "Production branch", cherchez "Build configuration" :

### Ce que vous verrez :
```
┌─────────────────────────────────────────────┐
│ Build configuration                         │
├─────────────────────────────────────────────┤
│                                             │
│ Build command:                              │
│ ┌─────────────────────┐                     │
│ │ npm run build       │                     │
│ └─────────────────────┘                     │
│                                             │
│ Build output directory:                     │
│ ┌─────────────────────┐                     │
│ │ /dist               │                     │
│ └─────────────────────┘                     │
│                                             │
│ [Edit configuration]    ← CLIQUEZ           │
│                                             │
└─────────────────────────────────────────────┘
```

### Actions :
1. Cliquez sur **"Edit configuration"**
2. **Supprimez** le contenu de "Build command" (laissez vide)
3. **Supprimez** le contenu de "Build output directory" (laissez vide)
4. Cliquez sur **"Save"**

### Résultat :
```
┌─────────────────────────────────────────────┐
│ Build configuration                         │
├─────────────────────────────────────────────┤
│                                             │
│ No build configuration set       ← ✅ BON   │
│                                             │
│ [Configure]                                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔄 RELANCER LE WORKFLOW GITHUB

### URL : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions

**Ce que vous verrez** :
```
┌─────────────────────────────────────────────┐
│ Actions                                     │
├─────────────────────────────────────────────┤
│                                             │
│ All workflows  [Run workflow ▼] ← CLIQUEZ  │
│                                             │
│ Deploy to Cloudflare Pages                  │
│ ├─ chore: Bump version to 12.1.2            │
│ │  🔴 Failed                                │
│ └─ ...                                      │
│                                             │
└─────────────────────────────────────────────┘
```

### Popup qui apparaît :
```
┌─────────────────────────────────────────────┐
│ Run workflow                                │
├─────────────────────────────────────────────┤
│                                             │
│ Use workflow from:                          │
│ ┌─────────────────────┐                     │
│ │ Branch: main    ▼   │  ← VÉRIFIEZ        │
│ └─────────────────────┘                     │
│                                             │
│ [Cancel]  [Run workflow]   ← CLIQUEZ        │
│                                             │
└─────────────────────────────────────────────┘
```

### Actions :
1. Cliquez sur **"Run workflow"** (bouton vert)
2. Vérifiez que **"main"** est sélectionné
3. Cliquez sur **"Run workflow"** (confirmer)

---

## ⏱️ SURVEILLER LE DÉPLOIEMENT

**Ce que vous verrez** :

### Pendant le déploiement (5-7 minutes) :
```
┌─────────────────────────────────────────────┐
│ Deploy to Cloudflare Pages                  │
│ Run #42 - main                              │
├─────────────────────────────────────────────┤
│                                             │
│ 🟡 In progress...                           │
│                                             │
│ ✅ Checkout code                    (10s)   │
│ ✅ Setup Node.js                    (20s)   │
│ ✅ Install dependencies             (1m)    │
│ ✅ Build project                    (30s)   │
│ ✅ Verify secrets                   (5s)    │
│ 🟡 Deploy to Cloudflare Pages       (...)   │
│    Uploading... (93/93)                     │
│ ⏳ Deployment summary               (...)   │
│                                             │
└─────────────────────────────────────────────┘
```

### Après succès :
```
┌─────────────────────────────────────────────┐
│ Deploy to Cloudflare Pages                  │
│ Run #42 - main                              │
├─────────────────────────────────────────────┤
│                                             │
│ ✅ Success                          (5m)    │
│                                             │
│ ✅ Checkout code                    (10s)   │
│ ✅ Setup Node.js                    (20s)   │
│ ✅ Install dependencies             (1m)    │
│ ✅ Build project                    (30s)   │
│ ✅ Verify secrets                   (5s)    │
│ ✅ Deploy to Cloudflare Pages       (3m)    │
│    Success! Uploaded 93 files               │
│ ✅ Deployment summary               (5s)    │
│                                             │
│ 🌐 Production URL:                          │
│    https://gxo-moissy-v2.pages.dev  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🌐 TESTER LE SITE

### Test principal :
```
https://gxo-moissy-v2.pages.dev
```

### Test vidéo (iPhone 12) :
```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=nl
```

**Ce que vous devriez voir sur iPhone 12** :
```
┌──────────────────────────┐
│  🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧  │ ← Bande orange
│                          │
│      [Logo GXO]          │ ← Logo centré
│                          │
│ Nederlandse instructies  │ ← Label
│                          │
│    ┌────────────┐        │
│    │  ▶ PLAY   │        │ ← Bouton orange
│    └────────────┘        │
│                          │
│  ▓▓▓▓▓▓░░░░░░░░ 45%      │ ← Barre de progression
│                          │
│    [Doorgaan →]          │ ← Bouton à la fin
│                          │
└──────────────────────────┘
```

---

## 🔍 OÙ TROUVER CHAQUE ÉLÉMENT - RÉCAPITULATIF

### Sur Cloudflare :
```
Dashboard
  └── Workers & Pages
      └── gxo-procedures-moissy
          └── Settings
              └── Builds & deployments
                  └── Production branch: None ← MODIFIER ICI
```

### Sur GitHub :
```
Repository
  └── Actions
      └── Run workflow ← CLIQUER ICI
```

---

## ✅ CHECKLIST VISUELLE

Cochez au fur et à mesure :

- [ ] ✅ Ouvert Cloudflare Dashboard
- [ ] ✅ Cliqué sur "Workers & Pages"
- [ ] ✅ Sélectionné "gxo-procedures-moissy"
- [ ] ✅ Cliqué sur "Settings"
- [ ] ✅ Trouvé "Builds & deployments"
- [ ] ✅ Changé "Production branch" en "None"
- [ ] ✅ Cliqué sur "Save"
- [ ] ✅ Vérifié que c'est bien désactivé
- [ ] ✅ Ouvert GitHub Actions
- [ ] ✅ Cliqué sur "Run workflow"
- [ ] ✅ Attendu 5-7 minutes
- [ ] ✅ Workflow terminé avec succès ✅
- [ ] ✅ Ouvert https://gxo-moissy-v2.pages.dev
- [ ] ✅ Testé la vidéo sur iPhone 12
- [ ] 🎉 **SUCCÈS !**

---

## 🎯 RÉSUMÉ ULTRA-SIMPLE

### 3 CLICS SUR CLOUDFLARE :
1. Settings → Builds & deployments
2. Production branch → None
3. Save

### 2 CLICS SUR GITHUB :
1. Actions → Run workflow
2. Run workflow (confirmer)

### ATTENDRE 5-7 MINUTES

### TESTER LE SITE ✅

---

## 🆘 BESOIN D'AIDE ?

**Si vous êtes bloqué, répondez avec** :

- **"Je ne vois pas Workers & Pages"**
- **"Je ne vois pas Production branch"**
- **"Le workflow a échoué"**
- **"Le site ne se charge pas"**
- **"La vidéo ne marche pas"**

Je vous guiderai étape par étape avec plus de détails ! 🚀

---

**Dernière mise à jour** : 12 février 2026  
**Build ID** : 63c326a9-c2c8-444f-8f6d-9cb0dd6ead11  
**Solution** : Désactiver Production branch → None
