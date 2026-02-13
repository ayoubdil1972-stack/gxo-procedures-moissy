# 🔧 DÉSACTIVER WORKERS BUILDS - CLOUDFLARE

## ❌ ERREUR ACTUELLE

```
Workers Builds: gxo-procedures-moissy
Build ID: 63c326a9-c2c8-444f-8f6d-9cb0dd6ead11
Script: gxo-procedures-moissy
```

Cette erreur vient du fait que Cloudflare essaie d'utiliser **Workers Builds** (un système de build automatique) qui n'est pas nécessaire pour votre projet.

---

## 🎯 SOLUTION : DÉSACTIVER WORKERS BUILDS

### Méthode 1 : Via Cloudflare Dashboard (RECOMMANDÉ)

#### ÉTAPE 1 : Accéder aux paramètres

**URL directe** :
```
https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy/settings/builds-deployments
```

#### ÉTAPE 2 : Désactiver le build automatique

Dans la section **"Builds & deployments"**, vous allez voir plusieurs options :

##### Option A : Désactiver "Production branch"
```
Production branch: [main ▼]  →  changez en  [None ▼]
```
**Comment faire** :
1. Cliquez sur le dropdown à côté de "Production branch"
2. Sélectionnez **"None"** ou **"Disable"**
3. Cliquez sur **"Save"**

##### Option B : Supprimer la configuration de build
```
Build configuration
  Build command: npm run build
  Build output directory: /dist
  Root directory: (not set)
```
**Comment faire** :
1. Cliquez sur **"Edit configuration"**
2. **Supprimez** le contenu de "Build command"
3. **Supprimez** le contenu de "Build output directory"
4. Cliquez sur **"Save"**

##### Option C : Désactiver "Automatic git deployments"
```
Automatic git deployments: [Enabled ✓]  →  [Disabled]
```
**Comment faire** :
1. Trouvez la section "Automatic git deployments"
2. Cliquez sur le toggle pour **désactiver**
3. Confirmez

---

### Méthode 2 : Via Wrangler CLI (ALTERNATIVE)

Si vous ne trouvez pas les paramètres dans le dashboard, vous pouvez aussi modifier le fichier `wrangler.jsonc` :

```bash
cd /home/user/webapp
```

#### Modifier wrangler.jsonc pour désactiver le build automatique

Ajoutez cette ligne dans `wrangler.jsonc` :

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "gxo-procedures-moissy",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  
  // 🔥 AJOUTEZ CETTE LIGNE pour désactiver le build automatique
  "no_bundle": true
}
```

---

## 🔍 OÙ TROUVER "BUILDS & DEPLOYMENTS" ?

### Navigation pas à pas :

1. **Allez sur** : https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5

2. **Dans le menu de gauche**, cliquez sur :
   ```
   Workers & Pages
   ```

3. **Trouvez votre projet** :
   ```
   gxo-procedures-moissy
   ```
   Cliquez dessus.

4. **Onglet "Settings"** (en haut) :
   ```
   Overview | Deployments | Analytics | Settings | ...
                                                   ↑
                                            CLIQUEZ ICI
   ```

5. **Scrollez jusqu'à** :
   ```
   Builds & deployments
   ```

6. **Vous verrez** :
   ```
   Production branch: main
   Preview branches: All branches
   Build configuration: [Edit]
   ```

7. **Changez "Production branch"** :
   ```
   Production branch: [None] ← Sélectionnez "None"
   ```

8. **Cliquez sur "Save"**

---

## ✅ VÉRIFICATION

Après avoir désactivé le build automatique, vous devriez voir :

```
Production branch: None
```

OU

```
Build configuration: Not configured
```

OU

```
Automatic git deployments: Disabled
```

**✅ C'est bon !** Cloudflare ne tentera plus de rebuilder automatiquement.

---

## 🚀 DÉPLOYER UNIQUEMENT VIA GITHUB ACTIONS

Maintenant que le build automatique Cloudflare est désactivé, **tout se fait via GitHub Actions** :

### Workflow actuel :

```
1. Vous faites un push sur GitHub
   ↓
2. GitHub Actions détecte le push
   ↓
3. GitHub Actions exécute :
   - npm ci (install dependencies)
   - npm run build (build le projet)
   - npx wrangler pages deploy dist (upload vers Cloudflare)
   ↓
4. Cloudflare reçoit les fichiers buildés
   ↓
5. Site en ligne ! ✅
```

**Cloudflare ne rebuild RIEN** → il reçoit juste les fichiers déjà buildés.

---

## 🔄 RELANCER LE DÉPLOIEMENT

Maintenant que c'est désactivé, relancez le workflow GitHub :

### URL :
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions
```

### Étapes :
1. Cliquez sur **"Actions"**
2. Cliquez sur **"Deploy to Cloudflare Pages"**
3. Cliquez sur **"Run workflow"** (bouton vert)
4. Sélectionnez la branche **`main`**
5. Cliquez sur **"Run workflow"** (confirmer)

⏱️ **Attendez 5-7 minutes**...

### Résultat attendu :

```
✅ Checkout code
✅ Setup Node.js 20.x
✅ Install dependencies
✅ Build project
✅ Verify secrets
✅ Deploy to Cloudflare Pages
   - Uploading... (93/93)
   - Success! Uploaded 93 files (71.01 MB)
   - Deployment complete!
✅ Deployment summary
```

---

## 🌐 TESTER LE SITE

### URL de production :
```
https://gxo-moissy-v2.pages.dev
```

### Test vidéo (iPhone 12) :
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

---

## 🆘 SI VOUS NE TROUVEZ PAS LES PARAMÈTRES

### Alternative 1 : Recherche dans Cloudflare Dashboard

**Utilisez la barre de recherche** en haut du dashboard :
- Tapez : `builds`
- Cliquez sur le résultat "Builds & deployments"

### Alternative 2 : URL directe

**Copiez-collez cette URL** dans votre navigateur :
```
https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy/settings/builds-deployments
```

Vous arriverez **directement** sur la page des paramètres de build.

### Alternative 3 : Contact support Cloudflare

Si vraiment vous ne trouvez pas, vous pouvez :
1. Ouvrir le chat support Cloudflare (icône en bas à droite)
2. Demander : "How do I disable automatic builds for my Pages project?"

---

## 💡 POURQUOI WORKERS BUILDS ÉCHOUE ?

**Workers Builds** est un système qui :
1. Clone votre repo GitHub
2. Installe les dépendances
3. Build le projet
4. Déploie

**Problème** : Il nécessite un "Build Token" qui a été supprimé/révoqué.

**Solution** : Désactiver Workers Builds et utiliser GitHub Actions à la place.

**Avantages de GitHub Actions** :
- ✅ Vous contrôlez tout le processus
- ✅ Vous voyez les logs en détail
- ✅ Vous pouvez tester avant de déployer
- ✅ Pas besoin de Build Token
- ✅ Plus rapide et plus fiable

---

## 📊 COMPARAISON

| Méthode | Build | Token requis | Status |
|---------|-------|--------------|--------|
| **Workers Builds** | ❌ Échoue | Build Token (invalide) | ❌ Désactiver |
| **GitHub Actions** | ✅ Fonctionne | API Token (valide) | ✅ Utiliser |

---

## ✅ CHECKLIST

- [ ] Ouvrir Cloudflare Dashboard
- [ ] Aller sur "Settings" → "Builds & deployments"
- [ ] Désactiver "Production branch" (mettre "None")
- [ ] OU supprimer "Build configuration"
- [ ] OU désactiver "Automatic git deployments"
- [ ] Sauvegarder
- [ ] Ouvrir GitHub Actions
- [ ] Relancer le workflow "Deploy to Cloudflare Pages"
- [ ] Attendre 5-7 minutes
- [ ] Vérifier que le workflow est ✅ vert
- [ ] Tester https://gxo-moissy-v2.pages.dev
- [ ] Tester la vidéo sur iPhone 12
- [ ] 🎉 **SUCCÈS !**

---

## 🎯 RÉSUMÉ EN 3 ÉTAPES

### 1. CLOUDFLARE
```
Settings → Builds & deployments → Production branch: None → Save
```

### 2. GITHUB
```
Actions → Run workflow → main → Run workflow
```

### 3. TEST
```
https://gxo-moissy-v2.pages.dev
```

**Temps total** : ~10 minutes

---

## 🔗 LIENS UTILES

| Action | URL |
|--------|-----|
| **Cloudflare Settings** | https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy/settings/builds-deployments |
| **GitHub Actions** | https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions |
| **Site sandbox** | https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai |
| **Documentation Cloudflare Pages** | https://developers.cloudflare.com/pages/ |

---

## 🎯 PROCHAINE ÉTAPE

**Répondez avec** :

- **"A"** : J'ai désactivé le build, je relance le workflow
- **"B"** : Je ne trouve pas où désactiver
- **"C"** : J'ai fait mais ça ne marche toujours pas

Je suis là pour vous aider ! 🚀

---

**Dernière mise à jour** : 12 février 2026  
**Erreur** : Workers Builds échec (Build ID: 63c326a9)  
**Solution** : Désactiver le build automatique Cloudflare  
**Méthode** : GitHub Actions uniquement
