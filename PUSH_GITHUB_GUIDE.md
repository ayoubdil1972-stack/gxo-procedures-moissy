# 🚀 PUSH VERS GITHUB ET DÉPLOIEMENT AUTOMATIQUE

## ❓ Quelle est l'URL de votre repository GitHub ?

Pour que je puisse pousser le code et déclencher le déploiement automatique, j'ai besoin de l'URL de votre repository GitHub.

---

## 📝 FORMAT ATTENDU

```
https://github.com/VOTRE-USERNAME/NOM-DU-REPO.git
```

**Exemples :**
- `https://github.com/ayoubdil/gxo-procedures-moissy.git`
- `https://github.com/moncompte/mon-projet.git`

---

## 🔍 COMMENT TROUVER L'URL ?

### **Option 1 : Repository existant**

1. Allez sur **https://github.com** et connectez-vous
2. Cliquez sur votre repository (ex: `gxo-procedures-moissy`)
3. Cliquez sur le bouton vert **Code**
4. Copiez l'URL HTTPS (ex: `https://github.com/USERNAME/REPO.git`)
5. Envoyez-moi cette URL

### **Option 2 : Créer un nouveau repository**

1. Allez sur **https://github.com/new**
2. **Repository name:** `gxo-procedures-moissy`
3. **Description:** "Système de procédures GXO Moissy avec instructions vidéo multilingues"
4. Sélectionnez **Private** ou **Public** (votre choix)
5. **NE COCHEZ PAS** "Add a README file"
6. Cliquez sur **Create repository**
7. Copiez l'URL qui s'affiche (ex: `https://github.com/USERNAME/gxo-procedures-moissy.git`)
8. Envoyez-moi cette URL

---

## 🚀 CE QUI VA SE PASSER ENSUITE

Dès que vous me donnez l'URL, je vais :

1. ✅ Configurer le remote GitHub
2. ✅ Pousser tout le code (y compris le workflow GitHub Actions)
3. ✅ GitHub Actions va détecter le push automatiquement
4. ✅ Le déploiement vers Cloudflare Pages va démarrer
5. ✅ Votre site sera en ligne en 5-7 minutes

**Vous verrez les logs en temps réel sur :**
```
https://github.com/VOTRE-USERNAME/VOTRE-REPO/actions
```

---

## ⚠️ IMPORTANT : Secrets GitHub

**AVANT que le déploiement fonctionne**, vous devez ajouter 2 secrets dans GitHub :

1. Allez sur `https://github.com/VOTRE-USERNAME/VOTRE-REPO/settings/secrets/actions`
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

---

## 📱 TEST FINAL

Une fois le déploiement terminé (✅ dans GitHub Actions), testez sur votre iPhone 12 :

```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
```

---

## 💬 RÉPONDEZ-MOI AVEC

**Format simple :**
```
URL: https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
```

**OU si vous avez besoin d'aide pour créer le repository, dites-moi juste :**
```
Aide-moi à créer le repository
```

---

**Dernière mise à jour : 12 février 2025**
