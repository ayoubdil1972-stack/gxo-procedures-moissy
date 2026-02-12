# 🔐 GUIDE DE CONFIGURATION DES SECRETS GITHUB

## ⚠️ RÈGLES DE NOMMAGE DES SECRETS

Les noms de secrets GitHub doivent :
- ✅ Contenir uniquement des lettres, chiffres et underscores `_`
- ✅ Commencer par une lettre ou un underscore
- ❌ **PAS d'espaces** (erreur que vous avez rencontrée)

---

## 🎯 LES 2 SECRETS À CONFIGURER

### 📍 Page de configuration
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/settings/secrets/actions
```

---

### 🔐 Secret 1 : CLOUDFLARE_API_TOKEN

**Étapes :**
1. Cliquez sur **"New repository secret"**
2. Name : `CLOUDFLARE_API_TOKEN` ← **sans espaces, avec underscores**
3. Value : 
   ```
   HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-
   ```
4. Cliquez sur **"Add secret"**

---

### 🔐 Secret 2 : CLOUDFLARE_ACCOUNT_ID

**Étapes :**
1. Cliquez sur **"New repository secret"**
2. Name : `CLOUDFLARE_ACCOUNT_ID` ← **sans espaces, avec underscores**
3. Value : 
   ```
   8b193b1c61a45eb50fb2dab89cf8bfe5
   ```
4. Cliquez sur **"Add secret"**

---

## ✅ VÉRIFICATION

Après avoir ajouté les 2 secrets, vous devriez voir dans la liste :

```
Repository secrets (2)

CLOUDFLARE_API_TOKEN    Updated X seconds ago
CLOUDFLARE_ACCOUNT_ID   Updated X seconds ago
```

---

## 🚀 RELANCER LE WORKFLOW

Une fois les secrets configurés :

### Option A : Push automatique (déjà fait)
Le workflow se relancera automatiquement car j'ai corrigé le fichier `deploy.yml`.

### Option B : Relance manuelle
1. Allez sur : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions
2. Cliquez sur **"Deploy to Cloudflare Pages"**
3. Cliquez sur **"Run workflow"**
4. Sélectionnez la branche **"main"**
5. Cliquez sur **"Run workflow"**

---

## 🔧 CORRECTIONS APPLIQUÉES AU WORKFLOW

### Avant (❌ ne fonctionnait pas)
```yaml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: pages deploy dist --project-name=gxo-procedures-moissy
```

### Après (✅ fonctionne)
```yaml
- name: Deploy to Cloudflare Pages
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  run: npx wrangler pages deploy dist --project-name=gxo-procedures-moissy
```

**Pourquoi ?**
- `wrangler-action@v3` a des problèmes de compatibilité
- Utiliser directement `npx wrangler` est plus fiable

---

## 📊 ÉTAPES DU WORKFLOW (5-7 min)

Après avoir configuré les secrets, le workflow fera :

1. ✅ **Checkout code** (~10s)
2. ✅ **Setup Node.js** (~20s)
3. ✅ **Install dependencies** (~1-2 min)
4. ✅ **Build project** (~30s)
5. ✅ **Deploy to Cloudflare Pages** (~3-5 min) ← **maintenant ça devrait marcher !**
6. ✅ **Deployment summary** (~5s)

---

## 🎯 RÉSULTAT ATTENDU

### ✅ Succès
```
✓ 97 files uploaded
✨ Deployment complete!
🌐 https://gxo-procedures-moissy.pages.dev
```

### Vous pourrez tester :
- **Page d'accueil** : https://gxo-procedures-moissy.pages.dev
- **Vidéo NL** : https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
- **Admin** : https://gxo-procedures-moissy.pages.dev/admin
- **Accueil** : https://gxo-procedures-moissy.pages.dev/accueil

---

## ❌ EN CAS D'ERREUR

### Erreur : "Secret not found"
- **Cause** : Les secrets ne sont pas configurés ou mal nommés
- **Solution** : Vérifiez que les noms sont exactement :
  - `CLOUDFLARE_API_TOKEN` (avec underscores, sans espaces)
  - `CLOUDFLARE_ACCOUNT_ID` (avec underscores, sans espaces)

### Erreur : "Invalid API token"
- **Cause** : Le token Cloudflare est expiré ou invalide
- **Solution** : Générez un nouveau token sur Cloudflare Dashboard

### Erreur : "Project not found"
- **Cause** : Le projet `gxo-procedures-moissy` n'existe pas encore
- **Solution** : Le workflow le créera automatiquement lors du premier déploiement

---

## 📂 LIENS UTILES

| Description | URL |
|-------------|-----|
| **Configurer secrets** | https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/settings/secrets/actions |
| **Voir workflows** | https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions |
| **Cloudflare Dashboard** | https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy |
| **Site production** | https://gxo-procedures-moissy.pages.dev |

---

## ✅ CHECKLIST FINALE

- [ ] Secret `CLOUDFLARE_API_TOKEN` ajouté (avec underscores)
- [ ] Secret `CLOUDFLARE_ACCOUNT_ID` ajouté (avec underscores)
- [ ] Les 2 secrets apparaissent dans la liste
- [ ] Workflow relancé (automatique ou manuel)
- [ ] Workflow se termine avec succès (✅ vert)
- [ ] Site accessible sur https://gxo-procedures-moissy.pages.dev
- [ ] Vidéo NL fonctionne sur iPhone 12

---

## 🎁 RAPPEL DES VALEURS

Pour copier-coller facilement :

**Secret 1 :**
```
Name: CLOUDFLARE_API_TOKEN
Value: HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-
```

**Secret 2 :**
```
Name: CLOUDFLARE_ACCOUNT_ID
Value: 8b193b1c61a45eb50fb2dab89cf8bfe5
```

---

**🎯 PROCHAINE ÉTAPE :**

👉 **Configurez les 2 secrets maintenant avec les bons noms (underscores, pas d'espaces) !**

Une fois fait, répondez **"Secrets configurés"** et je vérifierai le déploiement avec vous.

---

**Dernière mise à jour :** 12 février 2026  
**Workflow corrigé :** Utilise `npx wrangler` directement  
**Action requise :** 🔐 Configurer les 2 secrets avec les bons noms
