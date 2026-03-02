# 🌐 GUIDE : Rattacher la version 34974601 aux domaines principaux

## 🎯 Objectif

Faire en sorte que les domaines suivants affichent la version `34974601.gxo-procedures-moissy.pages.dev` :
- `gxo-procedures-moissy.pages.dev` (domaine principal Cloudflare)
- `httpsgxo-procedures-moissypages.org` (domaine personnalisé)

---

## 📋 Étape 1 : Promouvoir le déploiement 34974601

### Sur Cloudflare Dashboard

1. **Allez sur** https://dash.cloudflare.com/pages
2. **Cliquez** sur le projet `gxo-procedures-moissy`
3. **Cliquez** sur l'onglet **Deployments**
4. **Trouvez** le déploiement `34974601` dans la liste
5. **Cliquez** sur les 3 points `...` à droite du déploiement
6. **Sélectionnez** "Promote to production" ou "Set as production deployment"
7. **Confirmez** l'action

**Résultat** : Le déploiement `34974601` devient la version production sur `gxo-procedures-moissy.pages.dev`

---

## 🔄 Étape 2 : Vérifier le changement

### Test du domaine principal

Ouvrez en **navigation privée** (Ctrl+Shift+N) :
```
https://gxo-procedures-moissy.pages.dev
```

**Vérification** :
- Regardez dans le code source (Ctrl+U)
- Cherchez "Vidéo tutoriel" → devrait être présent sur 4 pages
- Vérifiez que c'est bien la version que vous voulez

---

## 🌐 Étape 3 : Configurer le domaine personnalisé

### Option A : Correction du domaine (si erreur de frappe)

**Vous avez mentionné** : `httpsgxo-procedures-moissypages.org`

**Ceci semble être une erreur de frappe.** Le format correct devrait être :
- `gxo-procedures-moissy.org` (sans "https" au début)
- OU `procedures-moissy.votre-domaine.com`

**Question** : Possédez-vous réellement un domaine personnalisé ?
- Oui → Lequel exactement ?
- Non → Utilisez uniquement `gxo-procedures-moissy.pages.dev`

---

### Option B : Configuration du domaine personnalisé (si vous en avez un)

**Si vous possédez `gxo-procedures-moissy.org`** :

1. **Dashboard** → Projet `gxo-procedures-moissy` → **Custom domains**
2. **Cliquez** sur "Set up a custom domain"
3. **Entrez** : `gxo-procedures-moissy.org`
4. **Cliquez** "Continue"
5. Cloudflare affiche les enregistrements DNS à configurer :
   ```
   Type: CNAME
   Name: gxo-procedures-moissy.org
   Value: gxo-procedures-moissy.pages.dev
   ```
6. **Allez** dans votre registrar (où vous avez acheté le domaine)
7. **Ajoutez** l'enregistrement CNAME
8. **Retournez** sur Cloudflare et cliquez "Verify"
9. ⏳ **Attendez** 5-10 minutes pour la propagation DNS

**Résultat** : `https://gxo-procedures-moissy.org` affichera le même contenu que `gxo-procedures-moissy.pages.dev`

---

## 📊 Comparaison des URLs

### Avant

| URL | Type | Version |
|-----|------|---------|
| `34974601.gxo-procedures-moissy.pages.dev` | Déploiement spécifique | Version avec "Vidéo tutoriel" |
| `gxo-procedures-moissy.pages.dev` | Production | Ancienne version |

### Après (Promote to production)

| URL | Type | Version |
|-----|------|---------|
| `gxo-procedures-moissy.pages.dev` | Production | ✅ Version avec "Vidéo tutoriel" (34974601) |
| `34974601.gxo-procedures-moissy.pages.dev` | Archive | Même contenu (reste accessible) |
| `gxo-procedures-moissy.org` (si configuré) | Domaine personnalisé | ✅ Version avec "Vidéo tutoriel" |

---

## 🔍 Vérification complète

### Checklist après promotion

Ouvrez en **navigation privée** :

**✅ Domaine principal** :
```
https://gxo-procedures-moissy.pages.dev/controleur
```
**Résultat attendu** : Bouton "Vidéo tutoriel" visible

**✅ Domaine spécifique (reste accessible)** :
```
https://34974601.gxo-procedures-moissy.pages.dev/controleur
```
**Résultat attendu** : Même contenu qu'au-dessus

**✅ Domaine personnalisé (si configuré)** :
```
https://gxo-procedures-moissy.org/controleur
```
**Résultat attendu** : Même contenu qu'au-dessus

---

## ⚠️ Important à savoir

### Les déploiements spécifiques

Chaque déploiement Cloudflare Pages a :
1. **Une URL spécifique** : `34974601.gxo-procedures-moissy.pages.dev`
   - Reste toujours accessible (archive)
   - Utile pour tests, preview, rollback

2. **Le domaine principal** : `gxo-procedures-moissy.pages.dev`
   - Pointe vers le déploiement marqué "Production"
   - Change quand vous promouvez un autre déploiement

### Promouvoir = changer la production

Quand vous faites "Promote to production" sur le déploiement `34974601` :
- Le domaine `gxo-procedures-moissy.pages.dev` affiche maintenant cette version
- L'ancienne version production devient un déploiement archivé
- Tous les domaines personnalisés suivent automatiquement

---

## 🆘 Si vous ne trouvez pas "Promote to production"

### Alternative : Redéployer depuis GitHub

1. **Vérifiez** que le dernier commit sur GitHub est celui que vous voulez
2. **Dashboard** → Projet `gxo-procedures-moissy` → **Deployments**
3. **Cliquez** sur "Retry deployment" sur le dernier
4. OU faites un nouveau `git push` (petit changement) pour forcer un redéploiement

### Alternative : Rollback

Si le déploiement `34974601` est plus ancien :
1. **Deployments** → Trouvez `34974601`
2. **Cliquez** sur "Rollback to this deployment"
3. Confirmez

---

## 📝 À propos de "httpsgxo-procedures-moissypages.org"

**⚠️ Ce domaine semble incorrect**

Format invalide : `httpsgxo-procedures-moissypages.org`

**Formats corrects possibles** :
- `gxo-procedures-moissy.org`
- `procedures.moissy.org`
- `procedures-gxo.org`

**Question pour vous** :
1. Possédez-vous réellement un domaine personnalisé ?
2. Si oui, quel est le nom EXACT du domaine ?
3. Si non, utilisez uniquement `gxo-procedures-moissy.pages.dev`

---

## 🎯 Résumé des actions

### À faire maintenant

1. **Dashboard Cloudflare** → Pages → `gxo-procedures-moissy`
2. **Deployments** → Trouvez `34974601`
3. **3 points** → "Promote to production"
4. **Testez** `https://gxo-procedures-moissy.pages.dev` en navigation privée

### Si vous avez un domaine personnalisé

5. **Custom domains** → Add domain
6. Configurez les DNS
7. Attendez propagation (5-10 min)
8. Testez le domaine personnalisé

---

## ✅ Résultat final attendu

**Tous ces domaines afficheront la même version** :
- ✅ `gxo-procedures-moissy.pages.dev` → Version 34974601
- ✅ `34974601.gxo-procedures-moissy.pages.dev` → Version 34974601 (archive)
- ✅ `votre-domaine.org` → Version 34974601 (si configuré)

**Sur toutes les pages** :
- ✅ Bouton "Vidéo tutoriel" sur /controleur, /agent-quai, /administrateur, /accueil-chauffeur
- ✅ Checklist interactive sur /reception

---

**Date** : 2 mars 2026 11:20 UTC  
**Action requise** : Promouvoir le déploiement 34974601 en production  
**Dashboard** : https://dash.cloudflare.com/pages
