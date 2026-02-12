# 🔐 TOKEN GITHUB REQUIS POUR LE PUSH

## ⚠️ Authentification nécessaire

Pour pousser le code vers GitHub, j'ai besoin d'un **Personal Access Token (PAT)**.

---

## 📝 COMMENT CRÉER UN TOKEN GITHUB

### **Étape 1 : Créer le token**

1. Allez sur **https://github.com/settings/tokens/new**
2. **Note:** `GXO Procedures Deploy`
3. **Expiration:** Choisissez `90 days` ou `No expiration`
4. **Permissions requises :**
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Action workflows)
5. Cliquez sur **Generate token**
6. **⚠️ COPIEZ LE TOKEN IMMÉDIATEMENT** (vous ne pourrez plus le revoir)

Le token ressemble à : `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🚀 DEUX OPTIONS

### **OPTION A : Push depuis le sandbox (avec votre token)**

**Envoyez-moi le token et je push immédiatement :**

```
Token: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Ce qui se passera :**
1. Je configure l'authentification
2. Je push le code vers GitHub
3. GitHub Actions démarre automatiquement
4. Déploiement sur Cloudflare Pages (5-7 min)
5. Site en ligne !

---

### **OPTION B : Push depuis votre Mac (PLUS SIMPLE)**

**Commandes à exécuter sur votre Mac :**

```bash
# 1. Télécharger l'archive
# Téléchargez depuis : https://www.genspark.ai/api/files/s/eFS3qlrU

# 2. Extraire
tar -xzf gxo-procedures-moissy-v12.1.35-github-actions.tar.gz
cd home/user/webapp

# 3. Configurer le remote
git remote add origin https://github.com/ayoubdil1972-stack/gxo-procedures-moissy.git

# 4. Push (Git va demander vos identifiants)
git push -u origin main
```

**Git vous demandera :**
- Username: `ayoubdil1972-stack`
- Password: `ghp_xxxxxxxxxxxx` (votre token)

---

## 🎯 QUELLE OPTION PRÉFÉREZ-VOUS ?

**Option A :** Envoyez-moi votre token → Je push depuis le sandbox

**Option B :** Vous pushez depuis votre Mac (guide ci-dessus)

---

## ⚠️ APRÈS LE PUSH : Configurer les secrets GitHub

**IMPORTANT :** Une fois le code poussé, vous devez ajouter 2 secrets pour que le déploiement fonctionne :

1. Allez sur `https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/settings/secrets/actions`
2. Ajoutez ces 2 secrets :

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

3. Allez dans **Actions** → **Deploy to Cloudflare Pages** → **Run workflow**

---

## 📱 RÉSULTAT FINAL

Après le déploiement, testez sur votre iPhone 12 :

```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
```

---

**Quelle option choisissez-vous ? (A ou B)**
