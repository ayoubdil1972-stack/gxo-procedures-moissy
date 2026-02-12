# 🚀 DÉPLOIEMENT GXO PROCEDURES MOISSY

## ⚠️ IMPORTANT : Le sandbox ne peut pas uploader les vidéos (71 MB)

Le déploiement doit être effectué **depuis votre machine locale**.

---

## 📋 PRÉREQUIS

- Node.js installé (version 16+)
- NPM installé
- Git installé (optionnel)

---

## 🎯 MÉTHODE 1 : Déploiement depuis votre machine (RECOMMANDÉ)

### **Étape 1 : Récupérer le projet**

**Option A : Si le projet est sur GitHub**
```bash
git clone https://github.com/VOTRE-USERNAME/gxo-procedures-moissy.git
cd gxo-procedures-moissy
```

**Option B : Télécharger depuis le sandbox**
1. Créez une archive du projet dans le sandbox
2. Téléchargez-la sur votre machine
3. Extrayez l'archive
4. Ouvrez un terminal dans le dossier

### **Étape 2 : Installer les dépendances**
```bash
npm install
```

### **Étape 3 : Lancer le script de déploiement**
```bash
./deploy.sh
```

**OU manuellement :**
```bash
# 1. Configurer le token
export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-

# 2. Vérifier l'authentification
npx wrangler whoami

# 3. Build
npm run build

# 4. Déployer
npx wrangler pages deploy dist --project-name gxo-procedures-moissy
```

### **Étape 4 : Vérifier le déploiement**

URL de production : **https://gxo-procedures-moissy.pages.dev**

---

## 🌐 URLS DU PROJET

| Environnement | URL |
|---------------|-----|
| **Production** | https://gxo-procedures-moissy.pages.dev |
| **Sandbox (dev)** | https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai |
| **Dashboard Cloudflare** | https://dash.cloudflare.com/profile/api-tokens |

---

## 📱 TESTER LES VIDÉOS SUR MOBILE

Après le déploiement, testez sur votre iPhone 12 :

**URL de test vidéo néerlandaise :**
```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
```

**Ce qui devrait se passer :**
1. Page noire avec bande orange en haut ✅
2. Logo GXO + "🇳🇱 Nederlands" ✅
3. Gros bouton PLAY orange ✅
4. Clic → Vidéo démarre immédiatement ✅

**Si la vidéo ne démarre pas :**
- Vérifiez votre connexion Internet
- Essayez avec Safari au lieu de Chrome
- Rechargez la page (F5)

---

## 🔧 COMMANDES UTILES

```bash
# Redéployer après modifications
npm run build
npx wrangler pages deploy dist --project-name gxo-procedures-moissy

# Vérifier l'authentification
npx wrangler whoami

# Lister les projets
npx wrangler pages project list

# Voir les logs
npx wrangler pages deployment list --project-name gxo-procedures-moissy
```

---

## ❓ PROBLÈMES COURANTS

### **1. "Error: Not authenticated"**
**Solution :** Réexécutez `export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-`

### **2. "Project not found"**
**Solution :** Le projet existe déjà. Utilisez juste `npx wrangler pages deploy dist --project-name gxo-procedures-moissy`

### **3. Le déploiement se bloque**
**Solution :** 
- Vérifiez votre connexion Internet
- Essayez depuis une autre connexion
- Réduisez la taille des vidéos

---

## 📞 SUPPORT

Si vous rencontrez des problèmes, vérifiez :
1. Que Node.js est installé : `node --version`
2. Que NPM est installé : `npm --version`
3. Que le token est valide : `npx wrangler whoami`

---

**Dernière mise à jour : 12 février 2025**
