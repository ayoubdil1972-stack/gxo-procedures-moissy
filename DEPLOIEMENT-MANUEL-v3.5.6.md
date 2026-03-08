# 🚀 DÉPLOIEMENT MANUEL v3.5.6

**⚠️ IMPORTANT** : Le push GitHub automatique a échoué. Voici les étapes pour déployer manuellement.

---

## 📦 Option 1 : Via Backup File (Recommandé)

### **1. Télécharger le backup**
```bash
# URL du backup complet (344 MB)
https://www.genspark.ai/api/files/s/iemF4Vr4
```

### **2. Extraire sur votre machine locale**
```bash
# Télécharger le fichier
wget https://www.genspark.ai/api/files/s/iemF4Vr4 -O gxo-moissy-v3.5.6.tar.gz

# Créer un dossier temporaire
mkdir -p ~/gxo-temp

# Extraire (préserve le chemin absolu /home/user/webapp)
tar -xzf gxo-moissy-v3.5.6.tar.gz -C ~/gxo-temp

# Le code sera dans: ~/gxo-temp/home/user/webapp/
cd ~/gxo-temp/home/user/webapp
```

### **3. Push vers GitHub**
```bash
cd ~/gxo-temp/home/user/webapp

# Vérifier le commit
git log -1

# Output attendu:
# commit dfd2bfa
# fix: Correction affichage horaires + séparation durées - v3.5.6

# Configurer vos identifiants GitHub
git config user.name "ayoubdil1972-stack"
git config user.email "votre-email@example.com"

# Push vers GitHub
git push origin main

# Si erreur "non-fast-forward", force push
git push -f origin main
```

---

## 📦 Option 2 : Via Git Patch

Si vous avez déjà le repo cloné localement :

### **1. Créer le patch depuis le backup**
```bash
# Extraire le backup
tar -xzf gxo-moissy-v3.5.6.tar.gz -C ~/gxo-temp

# Créer le patch des derniers commits
cd ~/gxo-temp/home/user/webapp
git format-patch -1 HEAD
# Génère: 0001-fix-Correction-affichage-horaires-séparation-durées.patch
```

### **2. Appliquer le patch sur votre repo local**
```bash
# Aller dans votre repo local existant
cd ~/path/to/your/gxo-procedures-moissy

# Appliquer le patch
git am ~/gxo-temp/home/user/webapp/0001-fix-*.patch

# Push
git push origin main
```

---

## 🗄️ Étape CRITIQUE : Appliquer Migration D1

**⚠️ À FAIRE AVANT LE DÉPLOIEMENT CLOUDFLARE**

### **1. Appliquer migration en production**
```bash
cd ~/gxo-temp/home/user/webapp

# Vérifier la migration
cat migrations/0017_add_fin_timestamps.sql

# Appliquer en production (REMOTE)
npx wrangler d1 migrations apply gxo-chauffeurs-db --remote
```

### **2. Vérifier que les colonnes existent**
```bash
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="
  SELECT 
    quai_numero,
    timer_fin_timestamp,
    controle_fin_timestamp
  FROM quai_status 
  LIMIT 1
"

# Output attendu:
# {
#   "quai_numero": 1,
#   "timer_fin_timestamp": null,
#   "controle_fin_timestamp": null
# }
```

### **3. Alternative : Migration manuelle**

Si `wrangler` ne fonctionne pas, via dashboard Cloudflare :

1. Aller sur https://dash.cloudflare.com
2. D1 Databases → `gxo-chauffeurs-db`
3. Console → Coller :
```sql
ALTER TABLE quai_status ADD COLUMN timer_fin_timestamp TEXT;
ALTER TABLE quai_status ADD COLUMN controle_fin_timestamp TEXT;
```
4. Exécuter

---

## 🌐 Déploiement Cloudflare Pages

### **Option A : Déploiement Automatique (GitHub)**

Si le push GitHub a réussi :

1. **Attendre 5-10 minutes**
   - Cloudflare Pages détecte automatiquement le nouveau commit
   - Build et déploiement automatiques

2. **Vérifier le déploiement**
   - https://dash.cloudflare.com → Pages → `gxo-procedures-moissy`
   - Status : "Building..." → "Success"

### **Option B : Déploiement Manuel (Wrangler)**

Si pas de GitHub ou déploiement urgent :

```bash
cd ~/gxo-temp/home/user/webapp

# Build local
npm run build

# Vérifier dist/
ls -lh dist/

# Output attendu:
# _worker.js (387 KB)
# _routes.json
# download-qr-*.html
# etc.

# Déployer manuellement
npx wrangler pages deploy dist --project-name gxo-procedures-moissy

# URL de production:
# https://gxomoissyprocedures.com
```

---

## ✅ Tests Post-Déploiement

### **Test 1 : API Quais**
```bash
# Vérifier que les nouvelles colonnes sont présentes
curl https://gxomoissyprocedures.com/api/quais | jq '.quais[0]'

# Doit contenir:
# "timer_fin_timestamp": null
# "controle_fin_timestamp": null
```

### **Test 2 : Workflow Complet**

1. **Scan Début Déchargement**
   ```
   https://gxomoissyprocedures.com/scan-dechargement?quai=75
   ```
   - Timer démarre

2. **Scan Fin Déchargement**
   ```
   https://gxomoissyprocedures.com/scan-fin-dechargement?quai=75
   ```
   - Remplir formulaire
   - Valider

3. **Vérifier Interface**
   ```
   https://gxomoissyprocedures.com/accueil-chauffeur
   ```
   - Aller dans "Gestion des Quais"
   - Quai 75 : Statut "Fin de déchargement"
   - Rubrique blanche "📋 Déchargement terminé"
   - **VÉRIFIER** : Affiche `à XXhYY` (ex: `à 14h30`)
   - **PAS** : Format durée `HH:MM:SS`

4. **Scan Début Contrôle**
   ```
   https://gxomoissyprocedures.com/scan-controle?quai=75
   ```

5. **Scan Fin Contrôle**
   ```
   https://gxomoissyprocedures.com/scan-fin-controle?quai=75
   ```

6. **Vérifier Interface**
   - Quai 75 : Statut "Fin de contrôle"
   - Rubrique violette "📝 Contrôle terminé"
   - **VÉRIFIER** : Durée = UNIQUEMENT temps du contrôle
   - **PAS** : Addition avec temps de déchargement

### **Test 3 : Console Browser**

1. Ouvrir DevTools (F12)
2. Console → Vérifier aucune erreur JavaScript
3. Network → Vérifier requêtes API retournent les nouvelles colonnes

---

## 🆘 Troubleshooting

### **Problème 1 : Migration D1 échoue**

```bash
# Erreur: "Column already exists"
# Solution: La colonne existe déjà, ignorer l'erreur

# Vérifier manuellement
npx wrangler d1 execute gxo-chauffeurs-db --remote --command="
  PRAGMA table_info(quai_status)
"

# Chercher dans l'output:
# timer_fin_timestamp | TEXT
# controle_fin_timestamp | TEXT
```

### **Problème 2 : Affichage "Non disponible"**

**Cause** : Anciens quais n'ont pas les nouveaux timestamps

**Solution** :
1. Scanner un nouveau QR "Fin déchargement"
2. Les nouveaux quais auront les timestamps corrects
3. Anciens quais peuvent afficher "Non disponible" (normal)

### **Problème 3 : Push GitHub échoue**

```bash
# Erreur: Authentication failed
# Solution 1: Utiliser token personnel

# Créer un token: https://github.com/settings/tokens
# New token (classic) → repo (full control)

# Utiliser le token dans l'URL
git remote set-url origin https://USERNAME:TOKEN@github.com/ayoubdil1972-stack/gxo-procedures-moissy.git
git push origin main

# Solution 2: Via SSH
git remote set-url origin git@github.com:ayoubdil1972-stack/gxo-procedures-moissy.git
git push origin main
```

---

## 📊 Récapitulatif

### **Fichiers à déployer (depuis backup)**

| Fichier | Taille | Description |
|---------|--------|-------------|
| `src/index.tsx` | ~100 KB | Backend avec timestamps de fin |
| `public/static/accueil-chauffeur-quais.js` | ~30 KB | Frontend avec formatTimeOnly() |
| `dist/_worker.js` | 387 KB | Backend compilé |
| `dist/static/accueil-chauffeur-quais.js` | ~30 KB | Frontend compilé |
| `migrations/0017_add_fin_timestamps.sql` | <1 KB | Migration D1 |

### **Commandes essentielles**

```bash
# 1. Extraire backup
tar -xzf gxo-moissy-v3.5.6.tar.gz -C ~/gxo-temp

# 2. Aller dans le dossier
cd ~/gxo-temp/home/user/webapp

# 3. Push GitHub
git push origin main

# 4. Appliquer migration D1
npx wrangler d1 migrations apply gxo-chauffeurs-db --remote

# 5. Déployer (si automatique ne marche pas)
npx wrangler pages deploy dist --project-name gxo-procedures-moissy
```

---

## 🎯 Checklist Déploiement

- [ ] Télécharger backup https://www.genspark.ai/api/files/s/iemF4Vr4
- [ ] Extraire le backup
- [ ] Vérifier commit `dfd2bfa` présent
- [ ] Push vers GitHub (ou déploiement manuel wrangler)
- [ ] ⚠️ **CRITIQUE** : Appliquer migration D1 `0017_add_fin_timestamps.sql`
- [ ] Vérifier colonnes existent dans D1
- [ ] Attendre déploiement Cloudflare Pages (5-10 min)
- [ ] Tester API `/api/quais` retourne nouvelles colonnes
- [ ] Tester workflow complet (scan début → fin → contrôle)
- [ ] Vérifier affichage "à XXhYY" dans interface
- [ ] Vérifier durée contrôle séparée du déchargement
- [ ] Vérifier console browser sans erreurs

---

## 🔗 Liens Utiles

- **Backup** : https://www.genspark.ai/api/files/s/iemF4Vr4
- **GitHub** : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy
- **Production** : https://gxomoissyprocedures.com
- **Cloudflare Dashboard** : https://dash.cloudflare.com
- **Documentation** : `/home/user/webapp/CORRECTIONS-v3.5.6-HORAIRES-DUREES.md`

---

**✅ Le code est prêt ! Il suffit de déployer en suivant ces étapes. 🚀**
