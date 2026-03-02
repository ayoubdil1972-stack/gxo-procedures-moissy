# 🔄 ÉTAPES : Renommer le projet pour récupérer gxo-moissy-v2.pages.dev

## 🎯 Objectif

Renommer `gxo-procedures-moissyfinal` en `gxo-moissy-v2` pour récupérer l'ancienne URL.

---

## 📋 ÉTAPES À SUIVRE (5 minutes)

### Étape 1 : Supprimer l'ancien projet gxo-moissy-v2

1. **Allez sur** https://dash.cloudflare.com/pages
2. **Trouvez** le projet `gxo-moissy-v2` (l'ancien avec le cache)
3. **Cliquez** sur le projet
4. **Cliquez** sur **Settings** (menu de gauche)
5. **Scrollez** jusqu'à **Danger zone** (tout en bas)
6. **Cliquez** sur **Delete project**
7. **Tapez** le nom du projet : `gxo-moissy-v2`
8. **Confirmez** la suppression

⏳ **Attendez 30 secondes** (pour que Cloudflare libère le nom)

---

### Étape 2 : Renommer le nouveau projet

1. **Restez sur** https://dash.cloudflare.com/pages
2. **Cliquez** sur le projet `gxo-procedures-moissyfinal` (le nouveau, correct)
3. **Cliquez** sur **Settings** (menu de gauche)
4. **Section "General"** en haut
5. **Trouvez** "Project name"
6. **Cliquez** sur **"Rename project"** ou **"Edit"**
7. **Remplacez** `gxo-procedures-moissyfinal` par :
   ```
   gxo-moissy-v2
   ```
8. **Cliquez** sur **"Save"** ou **"Rename"**

⏳ **Cloudflare va redéployer automatiquement** (1-2 minutes)

---

### Étape 3 : Vérifier le nouveau déploiement

**Attendez 2-3 minutes**, puis ouvrez en **navigation privée** :

#### ✅ Pages SANS checklist (0 bouton attendu) :
```
https://gxo-moissy-v2.pages.dev/controleur
https://gxo-moissy-v2.pages.dev/agent-quai
https://gxo-moissy-v2.pages.dev/administrateur
https://gxo-moissy-v2.pages.dev/accueil-chauffeur
```

#### ✅ Page AVEC checklist (1 bouton attendu) :
```
https://gxo-moissy-v2.pages.dev/reception
```

---

### Étape 4 : Configurer la base de données D1 (si nécessaire)

Si votre application utilise la base de données :

1. **Projet** `gxo-moissy-v2` → **Settings** → **Functions**
2. **Scrollez** jusqu'à **D1 database bindings**
3. **Cliquez** sur **Add binding**
4. **Configurez** :
   ```
   Variable name:  DB
   D1 database:    gxo-chauffeurs-db
   ```
5. **Save**
6. Le site se redéploie automatiquement

---

## 🎯 Résultat final

Après ces étapes, vous aurez :

✅ **URL principale** : https://gxo-moissy-v2.pages.dev  
✅ **Code correct** : 0 checklist sur 4 pages, 1 sur réception  
✅ **Cache réinitialisé** : Pas de cache de l'ancienne version  
✅ **Build size** : 245.72 kB  
✅ **Toutes les fonctionnalités** : Chat, dashboard, base de données, etc.  

---

## ⚠️ IMPORTANT

**Avant de supprimer l'ancien projet** :

Si `gxo-moissy-v2` utilise un domaine personnalisé (ex: `procedures.votre-domaine.com`) :

1. **Notez** le nom du domaine
2. **Après le renommage**, ajoutez-le au nouveau projet :
   - Settings → Custom domains → Add domain

---

## 🆘 En cas de problème

### Problème 1 : Le nom gxo-moissy-v2 est déjà pris

**Solution** : Attendez 1-2 minutes après la suppression, puis réessayez.

### Problème 2 : Le déploiement échoue après renommage

**Solution** : 
1. Vérifiez que le Build command est `npm run build`
2. Vérifiez que le Deploy command est `echo "OK"` ou `true`
3. Retry deployment

### Problème 3 : La base de données ne fonctionne pas

**Solution** : Ajoutez le binding D1 (Étape 4 ci-dessus)

---

## 📊 Timeline complète

```
09:00 - Suppression checklist buttons (4 pages)
09:10 - Build local validé (245.72 kB)
09:15 - Commits et push GitHub
09:20 - Création projet gxo-procedures-moissyfinal
09:25 - Déploiement SUCCESS ✅
10:20 - Suppression ancien projet gxo-moissy-v2
10:21 - Renommage → gxo-moissy-v2
10:23 - Redéploiement automatique
10:25 - Vérification production ✅
```

---

**Date** : 2 mars 2026 10:25 UTC  
**Status** : Prêt pour renommage  
**Commit** : 89a402c  
**Build size** : 245.72 kB

---

## 🚀 COMMENCEZ MAINTENANT

Suivez les 4 étapes ci-dessus dans l'ordre.  
Dites-moi quand vous avez terminé pour que je vérifie ! ✅
