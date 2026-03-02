# 🚀 SOLUTION : Configurer la branche de production sur Cloudflare Pages

## 🎯 Problème identifié

Le déploiement **064e8ba8** fonctionne sur l'URL preview :
```
✅ https://064e8ba8.gxo-procedures-moissy.pages.dev
```

**MAIS** il n'est PAS déployé sur le domaine principal :
```
❌ https://gxo-procedures-moissy.pages.dev
```

---

## 🔍 Cause du problème

**Cloudflare Pages n'a pas de branche de production configurée.**

Cloudflare crée des **preview deployments** pour chaque commit, mais ne les déploie PAS automatiquement en production si la branche de production n'est pas définie.

---

## ✅ SOLUTION : Configurer la branche de production sur Cloudflare

### 📋 Étapes à suivre (5 minutes)

1. **Allez sur Cloudflare Dashboard**
   - https://dash.cloudflare.com/pages

2. **Sélectionnez le projet**
   - Cliquez sur `gxo-procedures-moissy`

3. **Ouvrez les paramètres**
   - Cliquez sur **Settings** (en haut à droite)

4. **Section "Builds & deployments"**
   - Scrollez jusqu'à la section **"Build settings"**

5. **Configurez la branche de production**
   - **Production branch** : `main`
   - Si le champ est vide ou différent, changez-le pour `main`
   - Cliquez sur **Save**

6. **Vérifiez la connexion GitHub**
   - Section **"Source"**
   - Vérifiez :
     ```
     Source provider: GitHub
     Repository: ayoubdil1972-stack/gxo-procedures-moissy
     Branch: main
     ```

7. **Déclenchez un nouveau déploiement**
   - Retournez à l'onglet **Deployments**
   - Trouvez le déploiement **064e8ba8**
   - Cliquez sur les **3 points** (...) à droite
   - Sélectionnez **"Retry deployment"**
   - ⏳ Attendez 2-3 minutes

---

## 📊 Configuration attendue

### ✅ Configuration correcte

| Paramètre | Valeur |
|-----------|--------|
| **Production branch** | `main` |
| **Branch deployments** | `All branches` OU `None (production only)` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (vide) |
| **Environment variables** | `NODE_VERSION=20` |

### ✅ Comportement après configuration

**Chaque push sur `main`** :
1. ✅ Build automatique
2. ✅ Déploiement automatique sur domaine principal
3. ✅ URL preview également créée

**Chaque push sur autre branche** :
- ✅ Build automatique
- ❌ PAS de déploiement sur domaine principal
- ✅ URL preview uniquement

---

## 🔄 Alternative : Déployer manuellement depuis CLI

Si la configuration Dashboard ne fonctionne pas, vous pouvez déployer directement avec Wrangler :

### 1. Installer Wrangler localement
```bash
cd /home/user/webapp
npm install -D wrangler
```

### 2. Créer wrangler.jsonc
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "gxo-procedures-moissy",
  "compatibility_date": "2026-03-02",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "gxo-chauffeurs-db",
      "database_id": "votre-database-id"
    }
  ]
}
```

### 3. Déployer en production
```bash
npm run build
npx wrangler pages deploy dist --project-name gxo-procedures-moissy --branch main
```

**Résultat** : Déploiement immédiat sur `gxo-procedures-moissy.pages.dev`

---

## 📱 Vérification après configuration

### 1. Vérifier le Dashboard
- **Deployments** → Dernier déploiement
- **Branch** : Doit afficher `main` (pas `Preview`)
- **Status** : `Success` (vert)
- **Production** : Badge "Production" visible

### 2. Tester l'URL principale
**En navigation privée** :
```
https://gxo-procedures-moissy.pages.dev/controleur
```

**Résultat attendu** :
- ✅ Bouton bleu "🎬 Vidéo tutoriel" visible
- ✅ Toutes les modifications récentes présentes

### 3. Comparer les deux URLs
```bash
# URL preview (fonctionne déjà)
https://064e8ba8.gxo-procedures-moissy.pages.dev/controleur

# URL production (devrait être identique après config)
https://gxo-procedures-moissy.pages.dev/controleur
```

**Les deux devraient afficher exactement le même contenu !**

---

## 🎯 Résumé des actions

### ✅ Action 1 : Configuration Dashboard (RAPIDE - 5 min)
1. Dashboard → Projet `gxo-procedures-moissy` → **Settings**
2. **Builds & deployments** → Section "Build settings"
3. **Production branch** : `main`
4. **Save**
5. Deployments → Retry dernier déploiement

### ✅ Action 2 : Déploiement CLI (SI Action 1 échoue)
Je peux le faire immédiatement depuis cette conversation :
1. Créer `wrangler.jsonc`
2. Installer Wrangler
3. Build
4. Déployer avec `wrangler pages deploy`

---

## 🆘 Capture d'écran attendue

Après avoir configuré la branche de production, dans l'onglet **Deployments**, vous devriez voir :

```
┌─────────────────────────────────────────────────┐
│ Deployments                                     │
├─────────────────────────────────────────────────┤
│ ✅ 064e8ba8  Production  main  Success          │
│    2 Mar 2026 11:35 UTC                         │
│    [Retry] [View build log] [...]              │
└─────────────────────────────────────────────────┘
```

**Badge "Production"** = Le déploiement est sur le domaine principal !

---

## 📞 Quelle action préférez-vous ?

### Option A (RECOMMANDÉ - 5 min)
**Vous configurez via Dashboard**
- Je vous guide étape par étape
- Vous me confirmez quand c'est fait

### Option B (RAPIDE - 2 min)
**Je déploie via CLI maintenant**
- Je crée `wrangler.jsonc`
- Je lance `wrangler pages deploy`
- Déploiement immédiat sur domaine principal

---

**Date** : 2 mars 2026 11:45 UTC  
**Status** : 🔴 Branche de production non configurée  
**Déploiement preview** : ✅ https://064e8ba8.gxo-procedures-moissy.pages.dev  
**Déploiement production** : ❌ https://gxo-procedures-moissy.pages.dev (ancienne version)  
**Action requise** : Configurer branche `main` comme production
