# 🚀 Guide de Déploiement Manuel sur Cloudflare Pages

## ⚠️ Problème Actuel

Le déploiement via `wrangler` depuis le sandbox prend beaucoup de temps (100 MB à uploader).

## ✅ Solution : Déploiement Manuel via Dashboard Cloudflare

### 📋 Étape 1 : Télécharger l'Archive du Projet

**Archive déjà créée** : https://www.genspark.ai/api/files/s/33iKXgt6

**OU créer une nouvelle archive** :
```bash
cd /home/user/webapp
tar -czf gxo-production.tar.gz dist/
```

---

### 📋 Étape 2 : Déployer via le Dashboard Cloudflare

1. **Aller sur** : https://dash.cloudflare.com/

2. **Se connecter** avec votre compte (`ayoubdil1972@gmail.com`)

3. **Menu de gauche** → Cliquer sur **"Workers & Pages"**

4. **Trouver** le projet : **"gxo-procedures-moissy"**

5. **Cliquer** sur le projet

6. **Onglet** : **"Deployments"**

7. **Cliquer** sur : **"Create deployment"** (ou **"Direct Upload"**)

8. **Uploader** le dossier `dist/` :
   - Option A : Glisser-déposer tout le contenu du dossier `dist/`
   - Option B : Cliquer sur "Select folder" et choisir `/dist`

9. **Cliquer** sur : **"Save and Deploy"**

10. **Attendre** 2-5 minutes (barre de progression visible)

---

### 📋 Étape 3 : Lier la Base de Données D1

1. Toujours dans le projet **"gxo-procedures-moissy"**

2. **Onglet** : **"Settings"**

3. **Section** : **"Bindings"**

4. **Cliquer** sur : **"Add binding"**

5. **Type** : Sélectionner **"D1 Database"**

6. **Variable name** : `DB` (exactement comme dans le code)

7. **D1 Database** : Sélectionner **"gxo-chauffeurs-db"**

8. **Cliquer** sur : **"Save"**

9. **IMPORTANT** : Redéployer pour que les changements prennent effet
   - Retourner dans **"Deployments"**
   - Cliquer sur **"Retry deployment"** OU créer un nouveau déploiement

---

### 📋 Étape 4 : Vérifier le Déploiement

**URLs à tester** :

1. **Page d'accueil QR Code** :
   ```
   https://gxo-moissy-v2.pages.dev/qrcode-chauffeur
   ```

2. **Sélection de langue** :
   ```
   https://gxo-moissy-v2.pages.dev/chauffeur/langue
   ```

3. **Consignes (exemple Français)** :
   ```
   https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fr
   ```

4. **Vidéo statique** :
   ```
   https://gxo-moissy-v2.pages.dev/static/videos/instructions-fr.mp4
   ```

5. **Test API (si configuré)** :
   ```
   https://gxo-moissy-v2.pages.dev/api/chauffeurs
   ```

**Test avec curl** :
```bash
curl -I https://gxo-moissy-v2.pages.dev/qrcode-chauffeur
# Attendu: HTTP/2 200
```

---

### 📋 Étape 5 : Vérifier la Base de Données

```bash
export CLOUDFLARE_API_TOKEN="GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h"

# Lister les chauffeurs
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="SELECT * FROM chauffeurs"

# Compter les chauffeurs
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="SELECT COUNT(*) as total FROM chauffeurs"
```

---

## 🎯 Alternative : Déploiement avec GitHub

Si vous préférez utiliser GitHub pour le déploiement automatique :

### 1. Pousser le code sur GitHub

```bash
cd /home/user/webapp

# Ajouter tous les fichiers
git add .
git commit -m "v11.6 - Production ready avec DB D1"

# Créer le dépôt sur GitHub (via https://github.com/new)
# Nom: gxo-procedures-moissy
# Visibilité: Private

# Pousser
git remote add origin https://github.com/VOTRE_USERNAME/gxo-procedures-moissy.git
git push -u origin main
```

### 2. Connecter GitHub à Cloudflare Pages

1. **Dashboard Cloudflare** → **Workers & Pages**

2. **Cliquer** sur **"gxo-procedures-moissy"**

3. **Settings** → **"Builds & deployments"**

4. **Section** : **"Source"**

5. **Cliquer** : **"Connect to Git"**

6. **Autoriser** Cloudflare à accéder à votre GitHub

7. **Sélectionner** le dépôt : **"gxo-procedures-moissy"**

8. **Configuration Build** :
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Root directory** : `/` (racine)
   - **Environment variables** : (laisser vide pour l'instant)

9. **Cliquer** : **"Save and Deploy"**

**Avantage** : Chaque `git push` déclenchera automatiquement un déploiement ! 🚀

---

## 📊 Résumé des Informations

### Compte Cloudflare
- **Email** : `ayoubdil1972@gmail.com`
- **Account ID** : `8b193b1c61a45eb50fb2dab89cf8bfe5`
- **API Token** : `GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h`

### Projet Cloudflare Pages
- **Nom** : `gxo-procedures-moissy`
- **URL Production** : `https://gxo-moissy-v2.pages.dev`
- **Branch** : `main`

### Base de Données D1
- **Nom** : `gxo-chauffeurs-db`
- **ID** : `28637bef-a644-4661-8cca-829f84058875`
- **Région** : `ENAM` (Europe/North America)
- **Binding** : `DB`

### Tables Créées
- ✅ `chauffeurs` (5 chauffeurs de test)
- ✅ `logs_inscriptions`
- ✅ `statistiques`

---

## 🆘 Dépannage

### Problème : Site inaccessible (HTTP 522)
**Solution** : Le déploiement n'est pas terminé. Attendez 2-5 minutes et réessayez.

### Problème : Vidéos ne chargent pas
**Solution** : Vérifiez que le dossier `dist/static/videos/` contient bien les 12 vidéos.

```bash
ls -lh /home/user/webapp/dist/static/videos/
```

### Problème : Base de données non accessible
**Solution** : Vérifiez le binding dans Settings → Bindings (doit être `DB` = `gxo-chauffeurs-db`).

### Problème : Erreur 404 sur les pages
**Solution** : Vérifiez que `_routes.json` et `_worker.js` sont bien dans `dist/`.

```bash
ls -la /home/user/webapp/dist/_*
```

---

## ✅ Checklist Finale

- [ ] ✅ Archive téléchargée OU dossier dist/ prêt
- [ ] ✅ Déploiement via Dashboard Cloudflare réussi
- [ ] ✅ Base de données D1 liée (Binding `DB`)
- [ ] ✅ URL principale accessible : `/qrcode-chauffeur`
- [ ] ✅ Sélection de langue fonctionne : `/chauffeur/langue`
- [ ] ✅ Vidéos jouent : `/chauffeur/consignes?lang=fr`
- [ ] ✅ Vidéos statiques accessibles : `/static/videos/instructions-fr.mp4`
- [ ] ✅ Base de données interrogeable (5 chauffeurs de test)

---

## 🎉 Prochaine Étape : QR Code

Une fois le site accessible, créez le QR Code :

1. **URL** : `https://gxo-moissy-v2.pages.dev/qrcode-chauffeur`

2. **Générateur en ligne** : https://www.qr-code-generator.com/

3. **Paramètres** :
   - Taille : 1000x1000px
   - Format : PNG
   - Correction d'erreur : Level H (30%)

4. **Télécharger** et **Imprimer** sur A4

---

**Dernière mise à jour** : 11 février 2026
**Version** : 11.6 - Production Ready
