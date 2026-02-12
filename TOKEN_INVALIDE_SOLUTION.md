# ⚠️ PROBLÈME DE TOKEN CLOUDFLARE

## ❌ ERREUR DÉTECTÉE

```
Authentication error [code: 10000]
```

**Cause :** Le token `BC6s_N8glc8s2VQLZPblr_nOQuSiWhCTxlWDQyOJ` n'a pas les bonnes permissions ou est invalide.

---

## 🔑 SOLUTION : CRÉER UN NOUVEAU TOKEN CLOUDFLARE

### 1️⃣ Allez sur Cloudflare Dashboard
```
https://dash.cloudflare.com/profile/api-tokens
```

### 2️⃣ Cliquez sur "Create Token"

### 3️⃣ Utilisez le template "Edit Cloudflare Workers"
Ou créez un token personnalisé avec ces permissions :

**Permissions requises :**
- Account → Cloudflare Pages → **Edit**
- Account → Account Settings → **Read**

**Account Resources:**
- Include → Specific account → `Ayoubdil1972@gmail.com's Account`

**Zone Resources:**
- Include → All zones (ou laissez vide)

### 4️⃣ Créez le token et copiez-le

Vous obtiendrez un token comme :
```
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔄 METTRE À JOUR LE SECRET GITHUB

### 1️⃣ Allez sur :
```
https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/settings/secrets/actions
```

### 2️⃣ Cliquez sur `CLOUDFLARE_API_TOKEN`

### 3️⃣ Cliquez sur "Update secret"

### 4️⃣ Remplacez par le NOUVEAU token

### 5️⃣ Cliquez sur "Update secret"

---

## 🚀 RELANCER LE WORKFLOW

Une fois le nouveau token configuré :

### Option A : Push automatique
Je vais pousser un petit changement pour déclencher le workflow.

### Option B : Relance manuelle
1. Allez sur : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions
2. Cliquez sur "Deploy to Cloudflare Pages"
3. Cliquez sur "Run workflow"
4. Sélectionnez "main"
5. Cliquez sur "Run workflow"

---

## 📋 ÉTAPES DÉTAILLÉES POUR CRÉER LE TOKEN

### Sur https://dash.cloudflare.com/profile/api-tokens

1. **Cliquez sur "Create Token"**

2. **Scrollez jusqu'à "Custom token"**

3. **Token Name :** `GXO Pages Deploy`

4. **Permissions :**
   ```
   Account → Cloudflare Pages → Edit
   Account → Account Settings → Read
   ```

5. **Account Resources :**
   ```
   Include → Specific account → Ayoubdil1972@gmail.com's Account
   ```

6. **Zone Resources :**
   ```
   Include → All zones (ou laissez par défaut)
   ```

7. **Client IP Address Filtering :** (laissez vide)

8. **TTL :** Start Date: Today, End Date: 90 days (ou Never)

9. **Cliquez sur "Continue to summary"**

10. **Cliquez sur "Create Token"**

11. **COPIEZ LE TOKEN** (vous ne le verrez qu'une fois)

---

## 🎯 ALTERNATIVE : UTILISER L'URL SANDBOX

En attendant que vous créiez le nouveau token, votre site est **déjà en ligne** sur le sandbox :

### URL actuelle (fonctionne) :
```
https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai
```

### Test vidéo NL :
```
https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai/chauffeur/video?lang=nl
```

---

## ✅ CHECKLIST

- [ ] Créer un nouveau token Cloudflare avec les bonnes permissions
- [ ] Copier le nouveau token
- [ ] Mettre à jour le secret GitHub `CLOUDFLARE_API_TOKEN`
- [ ] Relancer le workflow GitHub Actions
- [ ] Vérifier que le déploiement réussit

---

## 💡 POURQUOI LE TOKEN EST INVALIDE ?

Raisons possibles :
1. **Permissions insuffisantes** - Le token n'a pas la permission "Cloudflare Pages → Edit"
2. **Token révoqué** - Le token a été supprimé dans Cloudflare
3. **Account ID incorrect** - Le token n'a pas accès à ce compte
4. **Token expiré** - Le token était temporaire

---

## 🎯 PROCHAINES ÉTAPES

### Option A : Créer le nouveau token maintenant
1. Allez sur https://dash.cloudflare.com/profile/api-tokens
2. Créez le token avec les permissions ci-dessus
3. Copiez-le
4. Répondez avec "Nouveau token : xxxxxxxxxx"
5. Je mettrai à jour le secret et relancerai le déploiement

### Option B : Utiliser le site sandbox en attendant
Le site fonctionne déjà sur :
```
https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai
```

Testez-le sur votre iPhone 12 et créez le token Cloudflare plus tard.

---

**🔑 Quelle option choisissez-vous ?**

**A** : Je crée le nouveau token maintenant  
**B** : J'utilise le site sandbox et je ferai le token plus tard

---

**Dernière mise à jour :** 12 février 2026  
**Statut :** ⚠️ Token invalide - nouveau token requis  
**Site sandbox :** ✅ Fonctionne (à utiliser en attendant)
