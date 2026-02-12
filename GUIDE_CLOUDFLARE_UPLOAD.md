# 🚨 DIAGNOSTIC : Pourquoi le site affiche 404

## ❌ PROBLÈME IDENTIFIÉ

**Tous les fichiers retournent 404** → Les fichiers n'ont PAS été uploadés correctement.

### Causes possibles :

1. ❌ **Vous avez uploadé le fichier `.tar.gz` au lieu du dossier `dist/`**
2. ❌ **Vous avez uploadé le mauvais dossier**
3. ❌ **L'upload a été interrompu**

---

## ✅ SOLUTION : Upload correct du dossier dist

### **ÉTAPE PAR ÉTAPE (TRÈS IMPORTANT)**

#### **1️⃣ Sur votre Mac, extraire correctement :**

```bash
cd ~/Downloads

# Vérifier que dist.tar.gz existe
ls -lh dist.tar.gz

# Supprimer l'ancien dossier dist si existe
rm -rf dist/

# Extraire
tar -xzf dist.tar.gz

# VÉRIFIER la structure
ls -la dist/
```

**Vous DEVEZ voir :**
```
dist/
├── _routes.json
├── _worker.js
├── _headers
├── static/
│   ├── videos/
│   │   ├── instructions-nl.mp4
│   │   ├── instructions-fr.mp4
│   │   └── ... (12 vidéos)
│   ├── gxo-logo.png
│   └── ...
└── test-questionnaire.html
```

---

#### **2️⃣ Via Cloudflare Dashboard :**

1. Allez sur **https://dash.cloudflare.com/**
2. **Workers & Pages** → **gxo-procedures-moissy**
3. **Deployments** → **Create deployment**
4. Cliquez sur **Upload assets**

---

#### **3️⃣ UPLOAD CORRECT (ATTENTION) :**

**⚠️ NE PAS UPLOADER :**
- ❌ Le fichier `dist.tar.gz`
- ❌ Le dossier parent contenant `dist/`
- ❌ Un ZIP

**✅ UPLOADER :**
- ✅ Le **CONTENU du dossier `dist/`** (pas le dossier lui-même)

**Comment faire :**

**Option A : Glisser le contenu**
1. Ouvrez Finder → `~/Downloads/dist/`
2. **Sélectionnez TOUS les fichiers DANS dist/** (Cmd+A)
3. Glissez-les dans la zone Cloudflare

**Option B : Via wrangler (PLUS SÛR)**
```bash
cd ~/Downloads
export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-
wrangler pages deploy dist --project-name gxo-procedures-moissy
```

---

#### **4️⃣ VÉRIFICATION de l'upload :**

Pendant l'upload, vous DEVEZ voir :
```
Uploading... (1/97)
Uploading... (50/97)
Uploading... (97/97) ✅
```

**Si vous voyez :**
- `Uploading... (0/1)` → ❌ Mauvais fichier uploadé
- `Uploading... (3/3)` → ❌ Pas assez de fichiers

---

#### **5️⃣ APRÈS l'upload :**

Cloudflare va afficher :
```
✨ Deployment complete!
🌐 https://XXXXXXXX.gxo-procedures-moissy.pages.dev
```

Testez IMMÉDIATEMENT :
```bash
# Tester un fichier statique
curl -I https://XXXXXXXX.gxo-procedures-moissy.pages.dev/static/gxo-logo.png

# Doit retourner : HTTP/2 200 ✅
```

---

## 🎯 CHECKLIST AVANT D'UPLOADER

- [ ] J'ai extrait `dist.tar.gz` avec `tar -xzf`
- [ ] J'ai vérifié que `dist/_worker.js` existe
- [ ] J'ai vérifié que `dist/static/videos/*.mp4` existent (12 vidéos)
- [ ] Je vais uploader le **CONTENU de dist/**, PAS le dossier dist lui-même
- [ ] J'ai configuré la liaison D1 dans Settings → Functions

---

## 💬 SI VOUS AVEZ UN DOUTE

**Utilisez wrangler en ligne de commande (Option B ci-dessus)**

C'est plus sûr car wrangler :
- ✅ Vérifie la structure automatiquement
- ✅ Upload tous les fichiers correctement
- ✅ Affiche les erreurs clairement

---

## 📱 EN ATTENDANT

Utilisez la version sandbox qui fonctionne parfaitement :

```
https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai/chauffeur/video?lang=nl
```

---

**Réessayez l'upload avec ces instructions et dites-moi combien de fichiers ont été uploadés !**
