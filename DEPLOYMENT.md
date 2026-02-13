# 🚀 Guide de Déploiement - GXO Procédures Moissy

## 📋 Prérequis

- [x] Node.js 18+ installé
- [x] Compte Cloudflare (gratuit)
- [x] Compte GitHub (optionnel mais recommandé)

---

## 🔧 ÉTAPE 1 : Configuration Cloudflare

### 1.1 Créer un compte Cloudflare
1. Aller sur https://dash.cloudflare.com/sign-up
2. Créer un compte gratuit

### 1.2 Obtenir un API Token
1. Aller dans **My Profile** → **API Tokens**
2. Cliquer sur **Create Token**
3. Utiliser le template **Edit Cloudflare Workers**
4. Permissions recommandées :
   - Account - Cloudflare Pages - Edit
   - Account - D1 - Edit
   - Zone - Workers Scripts - Edit
5. Copier le token généré

### 1.3 Configurer Wrangler
```bash
# Méthode 1 : Variable d'environnement
export CLOUDFLARE_API_TOKEN="votre_token_ici"

# Méthode 2 : Wrangler login
npx wrangler login
```

---

## 🗄️ ÉTAPE 2 : Configuration Base de Données D1

### 2.1 Créer la base de données
```bash
cd /home/user/webapp

# Créer la base D1
npx wrangler d1 create gxo-chauffeurs-db
```

**Important** : Copiez le `database_id` retourné et mettez-le dans `wrangler.jsonc`:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "gxo-chauffeurs-db",
    "database_id": "COLLEZ_VOTRE_DATABASE_ID_ICI"
  }
]
```

### 2.2 Appliquer les migrations (LOCAL)
```bash
# Appliquer le schéma en local
npx wrangler d1 migrations apply gxo-chauffeurs-db --local

# Insérer des données de test
npx wrangler d1 execute gxo-chauffeurs-db --local --file=./seed.sql

# Vérifier
npx wrangler d1 execute gxo-chauffeurs-db --local --command="SELECT * FROM chauffeurs"
```

### 2.3 Appliquer en PRODUCTION
```bash
# Appliquer les migrations en production
npx wrangler d1 migrations apply gxo-chauffeurs-db

# Optionnel : Insérer les données de test en production
npx wrangler d1 execute gxo-chauffeurs-db --file=./seed.sql
```

---

## 📦 ÉTAPE 3 : Build et Test Local

### 3.1 Build le projet
```bash
npm run build
```

### 3.2 Test local avec PM2
```bash
# Nettoyer le port
fuser -k 3000/tcp 2>/dev/null || true

# Lancer avec PM2
pm2 start ecosystem.config.cjs

# Vérifier
curl http://localhost:3000
pm2 logs --nostream
```

### 3.3 Test local avec Wrangler (optionnel)
```bash
# Test avec Wrangler Pages Dev
npx wrangler pages dev dist --d1=gxo-chauffeurs-db --local --port 3000
```

---

## 🌐 ÉTAPE 4 : Déploiement Cloudflare Pages

### 4.1 Créer le projet Cloudflare Pages
```bash
npx wrangler pages project create gxo-procedures-moissy \
  --production-branch main \
  --compatibility-date 2026-02-03
```

### 4.2 Déployer
```bash
# Build
npm run build

# Déployer
npx wrangler pages deploy dist --project-name gxo-procedures-moissy
```

**Vous obtiendrez 2 URLs** :
- Production : `https://gxo-moissy-v2.pages.dev`
- Branch : `https://[branch].gxo-moissy-v2.pages.dev`

### 4.3 Lier la base de données au projet Pages
```bash
npx wrangler pages deployment create --project-name gxo-procedures-moissy \
  --branch main \
  --d1-database DB=gxo-chauffeurs-db
```

---

## 📱 ÉTAPE 5 : Génération QR Code

### 5.1 URL pour le QR Code
```
https://gxo-moissy-v2.pages.dev/qrcode-chauffeur
```

### 5.2 Générer le QR Code

**Option 1 : En ligne (Recommandé)**
1. Aller sur https://www.qr-code-generator.com/
2. Sélectionner "URL"
3. Coller : `https://gxo-moissy-v2.pages.dev/qrcode-chauffeur`
4. Personnaliser :
   - Taille : 1000x1000px minimum
   - Correction d'erreur : Level H (30%)
   - Couleur : Noir ou Orange GXO (#FF5A1A)
5. Télécharger en PNG haute résolution

**Option 2 : Avec API**
```bash
# Générer QR code via API
curl "https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://gxo-moissy-v2.pages.dev/qrcode-chauffeur&color=FF5A1A" \
  -o qrcode-gxo.png
```

**Option 3 : Avec npm**
```bash
# Installer
npm install -g qrcode

# Générer
qrcode -o qrcode-gxo.png -w 1000 "https://gxo-moissy-v2.pages.dev/qrcode-chauffeur"
```

---

## 🔐 ÉTAPE 6 : Configuration GitHub (Optionnel)

### 6.1 Créer un dépôt GitHub
1. Aller sur https://github.com/new
2. Nom : `gxo-procedures-moissy`
3. Visibilité : Private
4. Ne pas initialiser avec README

### 6.2 Pousser le code
```bash
cd /home/user/webapp

# Ajouter le remote
git remote add origin https://github.com/VOTRE_USERNAME/gxo-procedures-moissy.git

# Pousser
git push -u origin main
```

---

## ✅ ÉTAPE 7 : Tests de Validation

### 7.1 Tests Fonctionnels
```bash
# URL de base
BASE_URL="https://gxo-moissy-v2.pages.dev"

# Test 1 : Page d'accueil QR Code
curl -I "$BASE_URL/qrcode-chauffeur"

# Test 2 : Sélection de langue
curl -I "$BASE_URL/chauffeur/langue"

# Test 3 : Vidéo français
curl -I "$BASE_URL/chauffeur/consignes?lang=fr"

# Test 4 : Page d'inscription
curl -I "$BASE_URL/chauffeur/inscription"

# Test 5 : Vidéo française (fichier)
curl -I "$BASE_URL/static/videos/instructions-fr.mp4"
```

### 7.2 Tests Base de Données
```bash
# Test requête simple
npx wrangler d1 execute gxo-chauffeurs-db --command="SELECT COUNT(*) as total FROM chauffeurs"

# Test par langue
npx wrangler d1 execute gxo-chauffeurs-db --command="SELECT langue, COUNT(*) as total FROM chauffeurs GROUP BY langue"

# Test statistiques
npx wrangler d1 execute gxo-chauffeurs-db --command="SELECT * FROM statistiques ORDER BY date DESC LIMIT 10"
```

---

## 📊 ÉTAPE 8 : Monitoring (Optionnel)

### 8.1 Cloudflare Analytics
1. Aller dans **Workers & Pages**
2. Sélectionner `gxo-procedures-moissy`
3. Voir les **Analytics** :
   - Requêtes par jour
   - Temps de réponse
   - Erreurs

### 8.2 Logs en temps réel
```bash
# Voir les logs
npx wrangler tail --project-name gxo-procedures-moissy
```

---

## 🔄 Mises à Jour

### Déployer une mise à jour
```bash
# 1. Modifier le code
# 2. Commit
git add .
git commit -m "Description de la mise à jour"
git push

# 3. Build et déployer
npm run build
npx wrangler pages deploy dist --project-name gxo-procedures-moissy
```

---

## 🆘 Dépannage

### Problème : Database ID introuvable
**Solution** : Exécutez `npx wrangler d1 list` et copiez l'ID dans `wrangler.jsonc`

### Problème : Erreur 404 sur les vidéos
**Solution** : Vérifiez que `npm run build` a bien copié le dossier `public/` dans `dist/`

### Problème : "Unauthorized" lors du déploiement
**Solution** : Exécutez `npx wrangler login` ou configurez `CLOUDFLARE_API_TOKEN`

### Problème : Base de données vide en production
**Solution** : Exécutez `npx wrangler d1 migrations apply gxo-chauffeurs-db`

---

## 📞 Support

Pour toute question sur le déploiement, consultez :
- Documentation Cloudflare Pages : https://developers.cloudflare.com/pages/
- Documentation D1 : https://developers.cloudflare.com/d1/
- Documentation Wrangler : https://developers.cloudflare.com/workers/wrangler/

---

**Version** : 11.4  
**Date** : 11 février 2026  
**Auteur** : GXO Logistics Moissy
