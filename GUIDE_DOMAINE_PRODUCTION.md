# 🌐 GUIDE : Configuration des domaines de production

## ✅ Situation actuelle

Le projet **gxo-procedures-moissyfinal** est déployé avec succès sur Cloudflare Pages !

---

## 🔍 Trouver l'URL de production

### Méthode 1 : Dans le Dashboard Cloudflare

1. Allez sur https://dash.cloudflare.com/pages
2. Cliquez sur `gxo-procedures-moissyfinal`
3. L'URL principale est affichée en haut, format :
   ```
   https://gxo-procedures-moissyfinal.pages.dev
   ```
   OU
   ```
   https://[random-id].gxo-procedures-moissyfinal.pages.dev
   ```

### Méthode 2 : Dans l'onglet Deployments

1. Cloudflare Pages → `gxo-procedures-moissyfinal`
2. Onglet **Deployments**
3. Cliquez sur le déploiement **SUCCESS** le plus récent
4. Vous verrez l'URL de production, exemple :
   ```
   https://abc123def.gxo-procedures-moissyfinal.pages.dev
   ```

---

## 🎯 Options pour les domaines

### Option A : Utiliser le nouveau domaine Cloudflare (SIMPLE)

**URL automatique** :
```
https://gxo-procedures-moissyfinal.pages.dev
```

**Avantages** :
- ✅ Déjà configuré
- ✅ HTTPS automatique
- ✅ Aucune configuration DNS nécessaire
- ✅ Fonctionne immédiatement

**Inconvénients** :
- ❌ Nouveau domaine (pas les anciens)
- ❌ Les anciens liens ne fonctionneront plus

---

### Option B : Configurer les anciens domaines (RECOMMANDÉ)

**Pour pointer les anciens domaines vers le nouveau projet :**

#### 1. Domaine personnalisé : `gxo-procedures-moissy.pages.org`

Si vous possédez ce domaine :

1. **Dans Cloudflare Pages** → `gxo-procedures-moissyfinal`
2. **Custom domains** → **Set up a custom domain**
3. Entrez : `gxo-procedures-moissy.pages.org`
4. Cloudflare configurera automatiquement le DNS

#### 2. Alias Cloudflare : `gxo-moissy-v2.pages.dev`

**Important** : `gxo-moissy-v2.pages.dev` est un autre projet Cloudflare Pages.

**Pour le rediriger** :

**Option 1 : Supprimer l'ancien projet et recréer avec le même nom**
1. Supprimez le projet `gxo-moissy-v2`
2. Dans `gxo-procedures-moissyfinal`, allez dans **Settings**
3. **Rename project** → changez en `gxo-moissy-v2`
4. L'URL deviendra `https://gxo-moissy-v2.pages.dev`

**Option 2 : Garder les deux et rediriger l'ancien**
1. Gardez `gxo-procedures-moissyfinal` (nouveau, correct)
2. Dans l'ancien projet `gxo-moissy-v2` :
   - Ajoutez un Worker de redirection (plus complexe)
   - OU désactivez-le et utilisez uniquement le nouveau

---

### Option C : Renommer le projet (PROPRE)

**Pour avoir l'URL finale que vous voulez :**

1. **Dans Cloudflare Pages** → `gxo-procedures-moissyfinal`
2. **Settings** → **General**
3. **Project name** → **Rename**
4. Entrez le nom souhaité, par exemple :
   - `gxo-procedures-moissy` (simple)
   - `gxo-moissy-v3` (nouvelle version)
   - `gxo-production` (explicite)

5. L'URL devient automatiquement :
   ```
   https://[nouveau-nom].pages.dev
   ```

---

## 🎯 RECOMMANDATION

### Solution la plus simple (5 minutes)

1. **Renommez** le projet `gxo-procedures-moissyfinal` en `gxo-moissy-final`
   - URL : `https://gxo-moissy-final.pages.dev`

2. **Configurez un domaine personnalisé** (si vous en avez un) :
   - Settings → Custom domains → Add domain
   - Exemple : `procedures.votre-entreprise.com`

3. **Communiquez la nouvelle URL** à vos utilisateurs

---

### Solution complète (15 minutes)

1. **Supprimez les anciens projets** :
   - `gxo-moissy-v2` (ancien, avec cache)
   - `gxo-procedures-moissy` (si existe)
   - `gxo-production-2026` (test)

2. **Renommez** `gxo-procedures-moissyfinal` en `gxo-procedures-moissy`
   - URL finale : `https://gxo-procedures-moissy.pages.dev`

3. **Conservez l'historique** : tous vos anciens commits restent dans GitHub

4. **Configurez un domaine personnalisé** (optionnel) :
   - `procedures.votre-domaine.com`

---

## 📋 Checklist de vérification

Après configuration, vérifiez ces URLs (remplacez par votre URL réelle) :

**Pages SANS checklist** (0 bouton) :
```
https://[votre-projet].pages.dev/controleur
https://[votre-projet].pages.dev/agent-quai
https://[votre-projet].pages.dev/administrateur
https://[votre-projet].pages.dev/accueil-chauffeur
```

**Page AVEC checklist** (1 bouton) :
```
https://[votre-projet].pages.dev/reception
```

---

## 🆘 Besoin d'aide ?

**Dites-moi quelle option vous préférez :**

A. **Garder le nouveau nom** `gxo-procedures-moissyfinal.pages.dev`
B. **Renommer en** `gxo-procedures-moissy.pages.dev` ou `gxo-moissy-v3.pages.dev`
C. **Configurer un domaine personnalisé** (lequel ?)

Je vous guiderai étape par étape ! 🚀

---

**Date** : 2 mars 2026 10:20 UTC  
**Status** : Projet déployé ✅, configuration domaine à finaliser
