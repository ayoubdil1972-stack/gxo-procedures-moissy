# 🚀 PUSH DEPUIS VOTRE MAC (SOLUTION FINALE)

## ⚠️ Le sandbox ne peut pas push les 71 MB de vidéos

Le push échoue avec "pack-objects died of signal 9" car le sandbox manque de mémoire pour uploader les vidéos.

---

## ✅ SOLUTION : Push depuis votre Mac

### **📥 Étape 1 : Télécharger l'archive complète**

🔗 **[CLIQUEZ ICI POUR TÉLÉCHARGER (350 MB)](https://www.genspark.ai/api/files/s/eFS3qlrU)**

Sauvegardez sur votre Mac : `~/Downloads/gxo-procedures-moissy-v12.1.35-github-actions.tar.gz`

---

### **📂 Étape 2 : Extraire l'archive**

**Ouvrez le Terminal (Cmd + Espace → "Terminal") :**

```bash
# Naviguer vers Downloads
cd ~/Downloads

# Extraire l'archive
tar -xzf gxo-procedures-moissy-v12.1.35-github-actions.tar.gz

# Aller dans le projet
cd home/user/webapp
```

---

### **🔐 Étape 3 : Configurer Git**

```bash
# Configurer le remote GitHub (déjà fait dans l'archive)
git remote -v

# Vous devriez voir :
# origin  https://github.com/ayoubdil1972-stack/gxo-procedures-moissy.git (fetch)
# origin  https://github.com/ayoubdil1972-stack/gxo-procedures-moissy.git (push)
```

---

### **🚀 Étape 4 : Push vers GitHub**

```bash
# Push (Git demandera vos credentials)
git push -u origin main
```

**Git vous demandera :**
- **Username :** `ayoubdil1972-stack`
- **Password :** `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`

**⏱️ Durée : 2-5 minutes** (upload des vidéos)

---

### **✅ Étape 5 : Vérifier le push**

Une fois terminé, vous verrez :

```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 71.50 MiB | 5.23 MiB/s, done.
Total 150 (delta 45), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (45/45), done.
To https://github.com/ayoubdil1972-stack/gxo-procedures-moissy.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Code poussé avec succès !**

---

### **🔧 Étape 6 : Configurer les secrets GitHub**

1. Allez sur **https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/settings/secrets/actions**
2. Cliquez sur **New repository secret** (2 fois)

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

### **▶️ Étape 7 : Lancer le déploiement**

1. Allez sur **https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/actions**
2. Cliquez sur **Deploy to Cloudflare Pages** (menu gauche)
3. Cliquez sur **Run workflow** (bouton vert à droite)
4. Sélectionnez **Branch: main**
5. Cliquez sur **Run workflow**

**⏱️ Durée : 5-7 minutes**

Vous verrez en temps réel :
- 🟡 Workflow en cours
- ✅ Checkout code
- ✅ Setup Node.js
- ✅ Install dependencies
- ✅ Build project
- ✅ Deploy to Cloudflare Pages
- ✅ Deployment complete!

---

### **📱 Étape 8 : Tester sur iPhone 12**

Une fois le workflow terminé (✅ point vert), ouvrez sur votre iPhone 12 :

```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=nl
```

**✅ Résultat attendu :**
- Page noire avec logo GXO
- Bouton PLAY orange
- **Vidéo démarre sans erreur "Impossible de lire la vidéo"**
- Barre de progression fonctionne
- Bouton "Doorgaan" apparaît à la fin

---

## 🎯 COMMANDES COMPLÈTES (COPIER-COLLER)

```bash
# Dans Terminal Mac
cd ~/Downloads
tar -xzf gxo-procedures-moissy-v12.1.35-github-actions.tar.gz
cd home/user/webapp
git push -u origin main
```

**Credentials :**
- Username: `ayoubdil1972-stack`
- Password: `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`

---

## 📊 RÉCAPITULATIF

| Étape | Action | Durée |
|-------|--------|-------|
| 1 | Télécharger archive | 2-5 min |
| 2 | Extraire | 30 sec |
| 3 | Vérifier Git | 10 sec |
| 4 | Push vers GitHub | 2-5 min |
| 5 | Vérifier push | 10 sec |
| 6 | Configurer secrets | 2 min |
| 7 | Lancer workflow | 5-7 min |
| 8 | Tester iPhone | 1 min |
| **TOTAL** | | **15-20 min** |

---

## 🆘 PROBLÈMES COURANTS

### **"git push" demande username/password en boucle**
**Solution :** 
```bash
git config credential.helper store
git push -u origin main
```
Entrez une fois : username + token

### **"fatal: Authentication failed"**
**Solution :** Vérifiez que le token est correct :
```
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
```

### **"Permission denied"**
**Solution :** Vérifiez que le token a les permissions `repo` et `workflow`

---

## 💬 QUESTIONS ?

Si vous avez des problèmes, dites-moi à quelle étape vous êtes bloqué !

---

**Dernière mise à jour : 12 février 2025**
