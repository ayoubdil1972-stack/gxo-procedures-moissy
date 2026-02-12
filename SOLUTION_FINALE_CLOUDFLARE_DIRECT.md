# 🎯 SOLUTION FINALE : Déploiement manuel via Cloudflare Dashboard

## ✅ Ce qui est prêt

J'ai créé une archive **dist-deploy.zip (69 MB)** qui contient tout le code compilé + les 12 vidéos.

---

## 📋 ÉTAPES ULTRA-SIMPLES (10 minutes)

### **Étape 1 : Télécharger le ZIP depuis le sandbox**

Le fichier est ici dans le sandbox : `/home/user/webapp/dist-deploy.zip`

**Comment le télécharger :**
1. Dans le sandbox, dans le panneau de gauche, cliquez sur **Files**
2. Naviguez vers `/home/user/webapp/`
3. Cliquez droit sur `dist-deploy.zip` → **Download**
4. Sauvegardez sur votre Mac

---

### **Étape 2 : Extraire le ZIP**

Sur votre Mac :
```bash
cd ~/Downloads
unzip dist-deploy.zip
```

Vous aurez un dossier `dist/` avec tout dedans.

---

### **Étape 3 : Déployer via Cloudflare Dashboard**

#### **Option A : Wrangler CLI (Terminal Mac)**

```bash
cd ~/Downloads

# Installer wrangler globalement (si pas déjà fait)
npm install -g wrangler

# Se connecter à Cloudflare
export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-

# Déployer
wrangler pages deploy dist --project-name gxo-procedures-moissy
```

⏱️ Durée : 3-5 minutes

#### **Option B : Interface Web Cloudflare (Drag & Drop)**

1. Allez sur **https://dash.cloudflare.com/**
2. Connectez-vous avec votre compte
3. Cliquez sur **Workers & Pages**
4. Cliquez sur **Create application** → **Pages**
5. Sélectionnez **Upload assets**
6. **Nom du projet :** `gxo-procedures-moissy`
7. **Production branch :** `main`
8. Glissez-déposez le dossier **dist/** (PAS le ZIP, le dossier extrait)
9. Cliquez sur **Deploy site**

⏱️ Durée : 2-3 minutes

---

### **Étape 4 : Tester sur iPhone 12**

Une fois le déploiement terminé, vous recevrez une URL :

```
https://gxo-procedures-moissy.pages.dev
```

Testez la vidéo néerlandaise sur votre iPhone 12 :

```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
```

**✅ Résultat attendu :**
- Page noire avec logo GXO
- Bouton PLAY orange
- **Vidéo démarre sans erreur**
- Barre de progression fonctionne
- Bouton "Doorgaan" apparaît à la fin

---

## 🎯 RÉCAPITULATIF

| Étape | Action | Durée |
|-------|--------|-------|
| 1 | Télécharger dist-deploy.zip | 1-2 min |
| 2 | Extraire le ZIP | 30 sec |
| 3 | Déployer via Cloudflare | 3-5 min |
| 4 | Tester sur iPhone | 1 min |
| **TOTAL** | | **5-10 min** |

---

## 💡 QUELLE OPTION PRÉFÉREZ-VOUS ?

**Option A (Terminal Mac) :**
- Plus rapide
- Reproductible
- Ligne de commande

**Option B (Interface Web) :**
- Plus visuel
- Pas besoin d'installer wrangler
- Drag & drop

---

## 🔧 DONNÉES UTILES

**Token Cloudflare :**
```
HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-
```

**Account ID :**
```
8b193b1c61a45eb50fb2dab89cf8bfe5
```

**Nom du projet :**
```
gxo-procedures-moissy
```

---

**Quelle option voulez-vous utiliser ? (A ou B)**
