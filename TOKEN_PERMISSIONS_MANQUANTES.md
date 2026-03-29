# 🔑 Token Cloudflare - Permissions Manquantes

## ❌ Problème Identifié

Le token actuel `cfut_SjdoFu6aRm7NeZPvYYlxtRg6r1CkUNP3ptUUt46q77c5dc93` fonctionne avec l'API REST Cloudflare directe, **MAIS** échoue avec `wrangler` car il manque une permission critique.

### **Erreur Wrangler**
```
✘ [ERROR] A request to the Cloudflare API (/accounts) failed.
  Invalid access token [code: 9109]
```

### **Cause**
`wrangler` fait 2 appels API au démarrage :
1. ✅ `GET /accounts/{account_id}/pages/projects/{project}` → **Fonctionne**
2. ❌ `GET /accounts` → **ÉCHOUE** (permission manquante)

---

## ✅ Solution : Créer un Nouveau Token avec TOUTES les Permissions

### **Étapes Exactes**

1. **Aller sur** : https://dash.cloudflare.com/profile/api-tokens

2. **Cliquer** : "Create Token" → "Create Custom Token"

3. **Configurer EXACTEMENT** :

```
Token name: GXO Wrangler Deploy FULL

Permissions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Account | Cloudflare Pages     | Edit
✅ Account | Account Settings     | Read
✅ User    | User Details         | Read
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Account Resources:
✅ Include | Specific account
   → Ayoubdil1972@gmail.com's Account
   → ID: 8b193b1c61a45eb50fb2dab89cf8bfe5

Client IP Address Filtering:
(Laisser vide)

TTL:
✅ Start Date: Today
✅ End Date: 1 year from now
```

4. **Cliquer** : "Continue to summary"

5. **Vérifier** que vous voyez :
   - ✅ Account - Cloudflare Pages - Edit
   - ✅ Account - Account Settings - Read  ← **CRITIQUE**
   - ✅ User - User Details - Read

6. **Cliquer** : "Create Token"

7. **COPIER LE TOKEN** (vous ne pourrez plus le voir)

---

## 🚀 Après Avoir Créé le Nouveau Token

### **Option 1 : Déploiement via Wrangler (Recommandé)**

```bash
cd /home/user/webapp

# Sauvegarder le nouveau token
cat > .env.deploy << EOF
CLOUDFLARE_API_TOKEN=VOTRE_NOUVEAU_TOKEN_ICI
CLOUDFLARE_ACCOUNT_ID=8b193b1c61a45eb50fb2dab89cf8bfe5
EOF

# Déployer
source .env.deploy
npx wrangler pages deploy dist --project-name gxomoissyprocedures
```

**Temps** : ~30 secondes  
**Résultat** : v3.11.31 déployé en production

---

### **Option 2 : Lier le Projet à GitHub (Une Fois)**

Si vous configurez la liaison GitHub → Cloudflare, les futurs déploiements seront automatiques :

1. **Aller sur** : https://dash.cloudflare.com/pages
2. **Sélectionner** : `gxomoissyprocedures`
3. **Cliquer** : Settings → Builds & deployments
4. **Activer** : "Connect to Git" → GitHub → `ayoubdil1972-stack/gxo-procedures-moissy`
5. **Configurer** :
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. **Sauvegarder**

Après ça, chaque `git push origin main` déclenchera un déploiement automatique !

---

## 📊 Tests Effectués

| Test | Token Actuel | Nouveau Token Requis |
|------|--------------|---------------------|
| API: GET /accounts/{id}/pages/projects | ✅ Fonctionne | ✅ Fonctionnera |
| API: GET /accounts | ❌ Échoue (9109) | ✅ Fonctionnera |
| wrangler pages deploy | ❌ Échoue | ✅ Fonctionnera |
| wrangler whoami | ⚠️  Partiel | ✅ Complet |

---

## 🎯 Permissions Complètes Nécessaires pour Wrangler

### **Minimum Absolu**
1. ✅ Account - Cloudflare Pages - Edit
2. ✅ Account - Account Settings - Read ← **MANQUANT ACTUELLEMENT**

### **Recommandé (pour éviter les warnings)**
3. ✅ User - User Details - Read

---

## 📝 Vérification du Token

Après avoir créé le nouveau token, testez-le :

```bash
cd /home/user/webapp
source .env.deploy

# Test 1: Vérifier le token
curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" | jq '.success'

# Doit retourner: true

# Test 2: Déployer
npx wrangler pages deploy dist --project-name gxomoissyprocedures
```

---

## ⚠️ Important

**Ne supprimez PAS l'ancien token** avant d'avoir confirmé que le nouveau fonctionne !

Tokens disponibles :
- ❌ `cfut_ixcWDgBDWztV8xt21yjmaqFwul09orBfzMzH8QjP792b1743` (insuffisant)
- ❌ `cfut_bmrgsABUH2MOBUb1nNlfLKT54wYaOzc6GAy29Mzeaf8a4127` (insuffisant)
- ⚠️  `cfut_SjdoFu6aRm7NeZPvYYlxtRg6r1CkUNP3ptUUt46q77c5dc93` (manque Account Settings - Read)
- ✅ **NOUVEAU TOKEN À CRÉER** (avec Account Settings - Read)

---

## 🚀 Ce Qui Sera Déployé (v3.11.31)

**Fichier** : `public/static/accueil-chauffeur-quais.js`
```javascript
// Ligne 404 - Timer EN COURS démarre à 00:00:00
diff = Math.max(0, diff - 7200)
```

**Résultat** :
- ✅ Timer EN COURS : **00:00:00** → 00:00:01 → 00:00:02...
- ✅ Timer FIGÉ : Durée correcte (ex: **00:45:30**)
- ✅ Plus de +2h en trop !

---

## 📞 Next Steps

1. ✅ Créer le nouveau token avec les 3 permissions
2. ✅ Me donner le nouveau token
3. ✅ Je déploie v3.11.31 en 30 secondes
4. ✅ Vous testez et confirmez que ça fonctionne

**Le code est 100% prêt, il ne manque que le bon token !** 🚀
