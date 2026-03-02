# 🔧 INSTRUCTIONS CLOUDFLARE PAGES 2026 (Interface mise à jour)

## 🎯 Créer le projet gxo-procedures-v3

### 1️⃣ Aller sur le dashboard
https://dash.cloudflare.com/pages

### 2️⃣ Créer un nouveau projet
- Cliquez sur **"Create application"** ou **"Create a project"**
- Choisissez **"Pages"**
- Puis **"Connect to Git"**

### 3️⃣ Connecter GitHub
- Sélectionnez votre compte GitHub : `ayoubdil1972-stack`
- Choisissez le repository : **`gxo-procedures-moissy`**
- Cliquez sur **"Begin setup"**

### 4️⃣ Configuration du projet (nouvelle interface)

**Nom du projet** :
```
gxo-procedures-v3
```

**Production branch** :
```
main
```

**Build settings** :
Cloudflare détecte automatiquement le framework. Vous devez configurer :

#### Option A : Si vous voyez "Build command"
```
Build command: npm run build
Build output directory: dist
```

#### Option B : Si vous voyez "Framework preset"
```
Framework preset: None (ou Custom)
Build command: npm run build
Output directory: dist
```

#### Option C : Si l'interface est minimaliste
Cherchez une section **"Build settings"** ou **"Build configuration"** et entrez :
- **Build command** : `npm run build`
- **Output directory** ou **Build output directory** : `dist`

### 5️⃣ Variables d'environnement (optionnel)
Si vous voyez une section "Environment variables", ajoutez :
```
NODE_VERSION = 20
```

Sinon, vous pourrez l'ajouter après dans Settings → Environment variables.

### 6️⃣ ⚠️ IMPORTANT : Vérifier
Avant de cliquer sur "Save and Deploy", **assurez-vous** :
- ✅ Build command = `npm run build`
- ✅ Output directory = `dist`
- ❌ Aucune autre commande bizarre (pas de ligne `dist` toute seule)
- ❌ Pas de "Deploy command" ou "Post-build command"

### 7️⃣ Déployer
- Cliquez sur **"Save and Deploy"**
- Attendez 2-3 minutes

### 8️⃣ Si le build échoue avec "dist: not found"

**Solution** :
1. Allez dans le projet `gxo-procedures-v3`
2. Cliquez sur **"Settings"** (dans le menu de gauche)
3. Puis **"Builds & deployments"**
4. Cliquez sur **"Edit configuration"** ou **"Configure build settings"**
5. Vérifiez que :
   - **Build command** = `npm run build` (exactement)
   - **Build output directory** = `dist` (exactement)
   - Aucune autre ligne/commande
6. Sauvegardez
7. Retournez dans **"Deployments"**
8. Trouvez le dernier déploiement qui a échoué
9. Cliquez sur les trois points ⋮ → **"Retry deployment"**

---

## 🧪 Tests après déploiement

Une fois le déploiement réussi, testez ces URLs :

```
✅ https://gxo-procedures-v3.pages.dev/reception
✅ https://gxo-procedures-v3.pages.dev/controleur
✅ https://gxo-procedures-v3.pages.dev/agent-quai
✅ https://gxo-procedures-v3.pages.dev/administrateur
✅ https://gxo-procedures-v3.pages.dev/accueil-chauffeur
```

Sur chaque page, vous devriez voir :
- ✅ Bouton **"Checklist interactive"** (vert/jaune/violet/bleu)
- ✅ Modal qui s'ouvre avec cases à cocher
- ✅ Barre de progression dynamique (0% → 100%)
- ✅ Compteur d'étapes (X / Y)

---

## 🔄 Alternative : Copier les paramètres d'un projet existant

Si vous avez du mal à configurer, vous pouvez aussi :

1. Ouvrez le projet existant `gxo-moissy-v2` (ou `gxo-procedures-moissy`)
2. Allez dans **Settings → Builds & deployments**
3. Notez la configuration actuelle
4. Créez le nouveau projet `gxo-procedures-v3`
5. Copiez exactement la même configuration

**Configuration actuelle de gxo-moissy-v2** :
```
Build command: npm run build
Build output directory: dist
Root directory: (vide)
Node version: 20 (ou auto)
```

---

## 📸 Si vous avez besoin d'aide

Si l'interface est vraiment différente, vous pouvez :
1. Faire une capture d'écran de la page de configuration
2. Me la partager
3. Je vous guiderai étape par étape selon votre interface

---

## 🚨 En cas de problème

### Erreur : "dist: not found"
→ Voir section 8️⃣ ci-dessus

### Erreur : "Build command not found"
→ Vérifiez que `package.json` a bien le script `"build": "vite build"`

### Erreur : Token API
→ Ignorez, GitHub Actions se chargera du déploiement automatique après

### Le site est déployé mais les checklists ne s'affichent pas
→ Attendez 2-3 minutes pour la propagation
→ Videz le cache de votre navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
→ Testez avec `curl` : `curl -sL https://gxo-procedures-v3.pages.dev/controleur | grep "Checklist interactive"`

---

**Date** : 2026-03-02  
**Interface** : Cloudflare Pages 2026 (nouvelle version)

