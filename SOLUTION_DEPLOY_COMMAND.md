# 🔧 SOLUTION : Désactiver le Deploy Command dans Cloudflare Pages

## ❌ Problème actuel

Cloudflare Pages exécute automatiquement :
```bash
npx wrangler deploy
```

Mais notre projet est un **Cloudflare Pages pur** (pas Workers), donc cette commande échoue.

---

## ✅ SOLUTION : Modifier les paramètres du projet

### Étape 1 : Accéder aux paramètres
1. Allez sur https://dash.cloudflare.com/pages
2. Cliquez sur votre projet `gxo-production-2026`
3. Cliquez sur **Settings** (dans le menu de gauche)
4. Scrollez jusqu'à **Builds & deployments**

---

### Étape 2 : Modifier la configuration de build

Cliquez sur **"Edit configuration"** (ou "Configure Production deployments")

#### ✅ Configuration correcte :

```
Framework preset:       None
Build command:          npm run build
Build output directory: dist
Root Path (optional):   (laissez vide)
```

#### ⚠️ CRITIQUE : Deploy command

**Il y a 2 cas possibles :**

**Cas 1 : Le champ "Deploy command" est visible**
- **Supprimez complètement le contenu**
- Laissez le champ **totalement vide**
- Ne mettez PAS `npx wrangler deploy`
- Ne mettez PAS `echo "skip"`
- **RIEN DU TOUT**

**Cas 2 : Le champ n'est pas visible**
- Cherchez une section **"Advanced"** ou **"Custom deployment"**
- Si vous trouvez un toggle/switch pour "Custom deploy command", **désactivez-le**
- Si un champ apparaît avec `npx wrangler deploy`, **supprimez-le**

---

### Étape 3 : Variables d'environnement

Assurez-vous d'avoir :
```
Variable name:  NODE_VERSION
Value:          20
```

---

### Étape 4 : Sauvegarder et redéployer

1. Cliquez **"Save"**
2. Retournez à l'onglet **"Deployments"**
3. Cliquez **"Retry deployment"** sur le dernier échec
4. ⏳ Attendez 2-3 minutes

---

## 🎯 Résultat attendu

Le build devrait maintenant :
1. ✅ Installer les dépendances (`npm clean-install`)
2. ✅ Exécuter `npm run build`
3. ✅ Générer `dist/_worker.js` (245.72 kB)
4. ✅ **Déployer automatiquement** (sans exécuter `wrangler deploy`)
5. ✅ Site disponible sur `https://gxo-production-2026.pages.dev`

---

## 🔍 Vérification finale

Ouvrez en navigation privée :

**Pages SANS checklist (0 bouton attendu)** :
```
https://gxo-production-2026.pages.dev/controleur
https://gxo-production-2026.pages.dev/agent-quai
https://gxo-production-2026.pages.dev/administrateur
https://gxo-production-2026.pages.dev/accueil-chauffeur
```

**Page AVEC checklist interactive (1 bouton attendu)** :
```
https://gxo-production-2026.pages.dev/reception
```

---

## 🆘 Si le problème persiste

### Alternative 1 : Utiliser l'ancienne méthode de déploiement

Dans les paramètres du projet :
1. Allez dans **Settings** → **Builds & deployments**
2. Cherchez **"Build system version"** ou similar
3. Si disponible, sélectionnez **"v1"** au lieu de **"v2"**
4. Sauvegardez et redéployez

### Alternative 2 : Créer un nouveau projet via GitHub Auto Deploy

1. **Supprimez** le projet actuel
2. Dans Cloudflare Pages, cliquez **"Create a project"**
3. Sélectionnez **"Connect to Git"**
4. Choisissez votre repository `gxo-procedures-moissy`
5. **IMPORTANT** : Cochez l'option **"Begin setup"** ou **"Custom configuration"**
6. Configurez :
   ```
   Build command:          npm run build
   Build output directory: dist
   ```
7. **NE COCHEZ PAS** l'option "Add custom deploy command"
8. Ajoutez la variable `NODE_VERSION=20`
9. Cliquez **"Save and Deploy"**

---

## 📝 Explication technique

**Pourquoi ce problème ?**
- Cloudflare Pages détecte automatiquement certains frameworks
- Si un fichier `wrangler.toml` existait avant (même supprimé), le système peut garder une "mémoire"
- La solution est de **créer un projet complètement neuf** OU **modifier explicitement les paramètres**

**Notre projet :**
- Type : **Cloudflare Pages** (pas Workers)
- Build : Vite génère `dist/_worker.js`
- Déploiement : Cloudflare Pages déploie automatiquement `dist/` après le build
- **Aucune commande manuelle nécessaire**

---

## ✅ Checklist de vérification

Avant de retry le deployment, vérifiez :
- [ ] Build command = `npm run build`
- [ ] Build output directory = `dist`
- [ ] Deploy command = **VIDE** (ou inexistant)
- [ ] NODE_VERSION = `20`
- [ ] Pas d'options avancées cochées
- [ ] Pas de fichier `wrangler.toml` dans le code source (vérifié : ✅)

---

**Date** : 2 mars 2026 10:05 UTC  
**Commit** : eba7ed4  
**Build size** : 245.72 kB  
**Status** : Code prêt, configuration Cloudflare à corriger
