# 🚀 GUIDE : Déploiement sur gxo-procedures-moissy.pages.dev

## ✅ Modifications terminées

**4 pages modifiées** :
- `/controleur` - Bouton "Vidéo tutoriel" ajouté
- `/agent-quai` - Bouton "Vidéo tutoriel" ajouté
- `/administrateur` - Bouton "Vidéo tutoriel" ajouté
- `/accueil-chauffeur` - Bouton "Vidéo tutoriel" ajouté

**1 page inchangée** :
- `/reception` - Checklist interactive conservée

**Build** : 247.39 kB (+1.67 kB)  
**Commit** : d8a8c57  
**GitHub** : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy

---

## 🎯 Configuration Cloudflare Pages

### Option 1 : Projet existe déjà (gxo-procedures-moissy)

**Si le projet `gxo-procedures-moissy` existe sur Cloudflare** :

1. **Allez sur** https://dash.cloudflare.com/pages
2. **Cliquez** sur `gxo-procedures-moissy`
3. **Onglet Deployments** → **Retry deployment** (ou attendez le déploiement automatique)
4. ⏳ **Attendez 2-3 minutes**
5. ✅ **Testez** les URLs

---

### Option 2 : Créer le projet (si n'existe pas)

**Si le projet `gxo-procedures-moissy` n'existe PAS** :

#### Étape 1 : Créer le projet

1. **Allez sur** https://dash.cloudflare.com/pages
2. **Cliquez** sur **"Create a project"**
3. **Connect to Git** → Sélectionnez `gxo-procedures-moissy`
4. **Configuration** :
   ```
   Project name:           gxo-procedures-moissy
   Production branch:      main
   Framework preset:       None
   Build command:          npm run build
   Build output directory: dist
   Deploy command:         echo "OK"
   Root Path:              (laissez vide)
   ```
5. **Environment variables** :
   ```
   NODE_VERSION = 20
   ```
6. **Save and Deploy**
7. ⏳ **Attendez 3-4 minutes**

#### Étape 2 : Configurer la base de données D1

1. **Projet** `gxo-procedures-moissy` → **Settings** → **Functions**
2. **D1 database bindings** → **Add binding**
3. **Configurez** :
   ```
   Variable name:  DB
   D1 database:    gxo-chauffeurs-db
   ```
4. **Save** (redéploiement automatique)

---

## 🌐 Domaines à configurer

### Domaine principal : gxo-procedures-moissy.pages.dev

**URL automatique après déploiement** :
```
https://gxo-procedures-moissy.pages.dev
```

**Aucune action nécessaire** - Ce domaine est créé automatiquement.

---

### Domaine personnalisé : httpsgxo-procedures-moissypages.org

**⚠️ IMPORTANT** : Vous avez mentionné `httpsgxo-procedures-moissypages.org`, ce qui semble être une erreur de frappe.

**Options possibles** :

#### Option A : Vous possédez `gxo-procedures-moissy.org`

1. **Dashboard** → `gxo-procedures-moissy` → **Custom domains**
2. **Set up a custom domain**
3. **Entrez** : `gxo-procedures-moissy.org`
4. Cloudflare configure automatiquement le DNS
5. **Résultat** : `https://gxo-procedures-moissy.org`

#### Option B : Vous possédez un autre domaine

Si vous avez un autre domaine (ex: `procedures.votre-entreprise.com`) :

1. **Dashboard** → `gxo-procedures-moissy` → **Custom domains**
2. **Set up a custom domain**
3. **Entrez** : `procedures.votre-entreprise.com`
4. Cloudflare configure automatiquement le DNS

#### Option C : Vous n'avez pas de domaine personnalisé

Utilisez simplement :
```
https://gxo-procedures-moissy.pages.dev
```

---

## 🔄 Déploiement automatique depuis GitHub

**Configuration actuelle** :

✅ **GitHub repository** : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy  
✅ **Branche principale** : `main`  
✅ **Dernier commit** : `d8a8c57`

**Fonctionnement** :

Cloudflare Pages est **automatiquement connecté** à votre repository GitHub :
- ✅ Chaque `git push` sur `main` déclenche un déploiement automatique
- ✅ Vous recevez une notification (Success/Failed)
- ✅ Le site est mis à jour en 2-3 minutes

**Vous n'avez RIEN à faire manuellement** après le `git push` ! 🎉

---

## 📋 Checklist de vérification

Après déploiement, vérifiez ces URLs en **navigation privée** :

### ✅ Pages AVEC bouton "Vidéo tutoriel"
```
https://gxo-procedures-moissy.pages.dev/controleur
https://gxo-procedures-moissy.pages.dev/agent-quai
https://gxo-procedures-moissy.pages.dev/administrateur
https://gxo-procedures-moissy.pages.dev/accueil-chauffeur
```

**Résultat attendu** : Bouton bleu "Vidéo tutoriel" visible sur chaque procédure

### ✅ Page AVEC checklist interactive (inchangée)
```
https://gxo-procedures-moissy.pages.dev/reception
```

**Résultat attendu** : Bouton "Checklist interactive" présent et fonctionnel

---

## 🆘 Si le déploiement échoue

### Vérification 1 : Build command

**Dashboard** → `gxo-procedures-moissy` → **Settings** → **Builds & deployments**

Vérifiez :
```
Build command:  npm run build
Deploy command: echo "OK"  (ou true)
```

### Vérification 2 : Environment variables

**Settings** → **Environment variables**

Vérifiez :
```
NODE_VERSION = 20
```

### Vérification 3 : Deployment logs

**Deployments** → Cliquez sur le déploiement **Failed**

Lisez les logs d'erreur et partagez-les moi si besoin.

---

## 📊 État actuel du projet

| Élément | Valeur |
|---------|--------|
| **Repository** | gxo-procedures-moissy |
| **GitHub URL** | https://github.com/ayoubdil1972-stack/gxo-procedures-moissy |
| **Branche** | main |
| **Dernier commit** | d8a8c57 |
| **Build size** | 247.39 kB |
| **Modifications** | Boutons "Vidéo tutoriel" sur 4 pages |
| **Date** | 2 mars 2026 11:00 UTC |

---

## 🎉 URLs finales attendues

**URL principale** :
```
https://gxo-procedures-moissy.pages.dev
```

**URLs des pages modifiées** :
```
https://gxo-procedures-moissy.pages.dev/controleur         (Vidéo tutoriel ✅)
https://gxo-procedures-moissy.pages.dev/agent-quai         (Vidéo tutoriel ✅)
https://gxo-procedures-moissy.pages.dev/administrateur     (Vidéo tutoriel ✅)
https://gxo-procedures-moissy.pages.dev/accueil-chauffeur  (Vidéo tutoriel ✅)
https://gxo-procedures-moissy.pages.dev/reception          (Checklist interactive ✅)
```

---

**Date** : 2 mars 2026 11:00 UTC  
**Status** : Code prêt, déploiement Cloudflare à vérifier  
**Commit** : d8a8c57
