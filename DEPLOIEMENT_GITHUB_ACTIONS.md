# 🚀 DÉPLOIEMENT AUTOMATIQUE VIA GITHUB ACTIONS

## ✅ Configuration terminée dans le sandbox

Le workflow GitHub Actions est maintenant configuré dans `.github/workflows/deploy.yml`.

---

## 📝 PROCHAINES ÉTAPES (SUR VOTRE MAC)

### **1️⃣ Cloner le repository GitHub**

```bash
# Si vous ne l'avez pas encore cloné
git clone https://github.com/VOTRE-USERNAME/gxo-procedures-moissy.git
cd gxo-procedures-moissy

# OU si vous l'avez déjà cloné, mettez-le à jour
cd gxo-procedures-moissy
git pull origin main
```

---

### **2️⃣ Configurer les secrets GitHub**

**Vous devez ajouter 2 secrets dans votre repository GitHub :**

#### **A. Ouvrir les paramètres du repository**
1. Allez sur https://github.com/VOTRE-USERNAME/gxo-procedures-moissy
2. Cliquez sur **Settings** (⚙️ en haut à droite)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**

#### **B. Ajouter le premier secret : CLOUDFLARE_API_TOKEN**
- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** `HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-`
- Cliquez sur **Add secret**

#### **C. Ajouter le deuxième secret : CLOUDFLARE_ACCOUNT_ID**
- Cliquez à nouveau sur **New repository secret**
- **Name:** `CLOUDFLARE_ACCOUNT_ID`
- **Value:** `8b193b1c61a45eb50fb2dab89cf8bfe5`
- Cliquez sur **Add secret**

---

### **3️⃣ Vérifier que les secrets sont bien configurés**

Vous devriez voir dans **Settings** → **Secrets and variables** → **Actions** :
- ✅ `CLOUDFLARE_API_TOKEN`
- ✅ `CLOUDFLARE_ACCOUNT_ID`

---

### **4️⃣ Déclencher le déploiement**

**Option A : Push automatique (RECOMMANDÉ)**

Tout commit sur la branche `main` déclenchera automatiquement le déploiement :

```bash
cd gxo-procedures-moissy
git pull origin main  # Récupérer les dernières modifications
# Le workflow se déclenchera automatiquement
```

**Option B : Déclenchement manuel**

1. Allez sur https://github.com/VOTRE-USERNAME/gxo-procedures-moissy
2. Cliquez sur l'onglet **Actions**
3. Cliquez sur **Deploy to Cloudflare Pages** dans la liste de gauche
4. Cliquez sur **Run workflow** (bouton à droite)
5. Sélectionnez la branche `main`
6. Cliquez sur **Run workflow**

---

### **5️⃣ Suivre le déploiement en temps réel**

1. Allez dans l'onglet **Actions** de votre repository
2. Cliquez sur le workflow en cours (point jaune 🟡)
3. Vous verrez les logs en temps réel :
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build project
   - ✅ Deploy to Cloudflare Pages

**Durée estimée : 5-7 minutes**

---

### **6️⃣ Tester sur votre iPhone 12**

Une fois le déploiement terminé (✅ point vert), ouvrez sur votre iPhone :

```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=nl
```

**Résultat attendu :**
- ✅ Page noire avec logo GXO
- ✅ Bouton PLAY orange
- ✅ Vidéo démarre sans erreur
- ✅ Barre de progression fonctionne
- ✅ Bouton "Continuer" apparaît à la fin

---

## 🎯 DONNÉES À COPIER-COLLER

### **Secrets GitHub à ajouter :**

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

## ✅ AVANTAGES DE CETTE MÉTHODE

- 🚀 **Déploiement automatique** à chaque `git push`
- 🔄 **Pas besoin de Node.js** sur votre machine pour déployer
- 📱 **GitHub Actions gère tout** (build + upload vers Cloudflare)
- 🌐 **Aucune limitation réseau** (contrairement au sandbox)
- 📊 **Logs détaillés** de chaque déploiement

---

## 🆘 BESOIN D'AIDE ?

Si vous avez des questions ou des problèmes :
1. Montrez-moi les logs de GitHub Actions
2. Vérifiez que les secrets sont bien configurés
3. Assurez-vous d'avoir les permissions sur le repository

---

**Dernière mise à jour : 12 février 2025**
