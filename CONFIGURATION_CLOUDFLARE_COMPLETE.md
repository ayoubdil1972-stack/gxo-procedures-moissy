# 🔐 CONFIGURATION VARIABLES & SECRETS CLOUDFLARE

## ✅ BONNE NOUVELLE !

Votre site **GXO Procedures Moissy** n'a besoin **que d'une seule configuration** :

**Base de données D1** (déjà créée : `gxo-chauffeurs-db`)

---

## 🎯 CONFIGURATION REQUISE

### **1️⃣ LIAISON D1 DATABASE (OBLIGATOIRE)**

C'est la **SEULE** configuration nécessaire pour que votre site fonctionne.

---

## 📋 **GUIDE COMPLET : CONFIGURER D1 SUR CLOUDFLARE**

### **Étape 1 : Aller dans les Settings**

1. Allez sur **https://dash.cloudflare.com/**
2. Connectez-vous
3. Cliquez sur **Workers & Pages** (menu gauche)
4. Cliquez sur **gxo-procedures-moissy**
5. Cliquez sur l'onglet **Settings** (en haut)

---

### **Étape 2 : Configurer Functions**

1. Descendez jusqu'à la section **Functions**
2. Vous verrez plusieurs sous-sections :
   - **Compatibility date**
   - **Compatibility flags**
   - **Environment variables**
   - **D1 database bindings** ⬅️ **C'EST ICI !**
   - **KV namespace bindings**
   - **R2 bucket bindings**

---

### **Étape 3 : Ajouter la liaison D1**

1. Dans **D1 database bindings**, cliquez sur **Add binding**
2. Une fenêtre s'ouvre avec deux champs :

**Champ 1 : Variable name**
```
DB
```
*(Tapez exactement "DB" en majuscules)*

**Champ 2 : D1 database**
- Cliquez sur le menu déroulant
- Sélectionnez : **gxo-chauffeurs-db**

3. Cliquez sur **Save** (en bas de la fenêtre)

---

### **Étape 4 : Vérifier la configuration**

Après avoir cliqué sur Save, vous devriez voir :

```
D1 database bindings

┌──────────────────────────────────────┐
│ Variable name: DB                    │
│ D1 database: gxo-chauffeurs-db      │
│ [Edit]  [Remove]                     │
└──────────────────────────────────────┘
```

**✅ Configuration terminée !**

---

## 🚫 **CE QUE VOUS N'AVEZ PAS BESOIN DE CONFIGURER**

Votre site n'utilise **AUCUN** de ces éléments :

- ❌ **Environment variables** (variables d'environnement)
- ❌ **Secrets** (clés API tierces)
- ❌ **KV namespace** (stockage clé-valeur)
- ❌ **R2 bucket** (stockage de fichiers)
- ❌ **Service bindings** (liaisons de services)
- ❌ **Analytics Engine** (analytics)

**Ignorez toutes ces sections !**

---

## ⚠️ **IMPORTANT : Compatibility flags**

Vérifiez aussi que cette option est activée :

1. Toujours dans **Settings** → **Functions**
2. Cherchez la section **Compatibility flags**
3. Vérifiez qu'il y a : `nodejs_compat`
4. Si ce n'est pas là, cliquez sur **Add flag**
5. Tapez : `nodejs_compat`
6. Cliquez **Save**

---

## 🔄 **APRÈS LA CONFIGURATION**

Une fois D1 configuré :

1. **Retournez à l'onglet Deployments**
2. **Créez un nouveau déploiement** (comme expliqué dans le guide précédent)
3. Uploadez les fichiers du dossier `dist/`
4. **Le site fonctionnera maintenant !**

---

## 📱 **TEST APRÈS CONFIGURATION**

Une fois déployé avec D1 configuré :

**Page d'accueil :**
```
https://gxo-moissy-v2.pages.dev/
```

**Login admin :**
```
https://gxo-moissy-v2.pages.dev/login
```

**Vidéo néerlandaise (iPhone 12) :**
```
https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=nl
```

---

## 🎯 **RÉCAPITULATIF : CE QU'IL FAUT CONFIGURER**

| Configuration | Requis ? | Valeur |
|---------------|----------|--------|
| **D1 database binding** | ✅ OUI | Variable: `DB`, Database: `gxo-chauffeurs-db` |
| **Compatibility flag** | ✅ OUI | `nodejs_compat` |
| Environment variables | ❌ NON | (aucune) |
| Secrets | ❌ NON | (aucun) |
| KV namespace | ❌ NON | (aucun) |
| R2 bucket | ❌ NON | (aucun) |

---

## 💡 **POURQUOI SEULEMENT D1 ?**

Votre application :
- ✅ Stocke les données des chauffeurs dans **D1 Database**
- ✅ N'utilise **aucune API tierce** (pas de clés API à configurer)
- ✅ Les vidéos sont **hébergées localement** (pas de CDN externe)
- ✅ Pas de stockage KV ou R2 nécessaire

**Résultat : Configuration ultra-simple !**

---

## 🆘 **SI VOUS NE VOYEZ PAS "gxo-chauffeurs-db" DANS LE MENU**

Cela signifie que la base de données n'existe pas encore sur Cloudflare.

**Solution :**

1. Ouvrez le Terminal sur votre Mac
2. Exécutez :
```bash
export CLOUDFLARE_API_TOKEN=HK_pNlJGydwizPqgMCaXIQa9hxETtkNUDm5VF-K-
wrangler d1 list
```

3. Si vous ne voyez pas `gxo-chauffeurs-db`, créez-la :
```bash
wrangler d1 create gxo-chauffeurs-db
```

4. Copiez le `database_id` qui s'affiche
5. Retournez dans Cloudflare Dashboard
6. Maintenant, `gxo-chauffeurs-db` apparaîtra dans le menu

---

## ✅ **CHECKLIST FINALE**

Avant de déployer, vérifiez :

- [ ] D1 database binding configuré (`DB` = `gxo-chauffeurs-db`)
- [ ] Compatibility flag `nodejs_compat` activé
- [ ] Aucune autre variable/secret nécessaire
- [ ] Prêt à uploader les fichiers de `dist/`

---

**Une fois D1 configuré, suivez le guide de déploiement pour uploader les fichiers !**
