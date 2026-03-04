# 🔧 Guide de Dépannage - Quais Ne S'affichent Pas en Production

## 📊 Diagnostic Actuel

**✅ CE QUI FONCTIONNE :**
- API `/api/quais` renvoie bien 30 quais ✓
- Scripts JavaScript sont inclus ✓
- Élément `#quais-grid` existe dans le HTML ✓
- Code backend utilise `datetime('now')` pour les timers ✓

**❌ PROBLÈME IDENTIFIÉ :**
- Les quais ne s'affichent pas dans l'interface
- Anciens timestamps numériques dans la base D1 production (ex: `1772605409550`)
- Cache navigateur/Cloudflare peut servir ancienne version

---

## 🚀 Solution en 3 Étapes

### **Étape 1 : Nettoyer la Base de Données D1 Production**

1. Ouvrez : https://dash.cloudflare.com
2. Allez à : **Storage & Databases → D1 → gxo-chauffeurs-db**
3. Cliquez sur l'onglet **Console**
4. Copiez-collez ce SQL :

```sql
UPDATE quai_status 
SET statut = 'disponible', 
    timer_start = NULL, 
    commentaire = NULL, 
    commentaire_auteur = NULL,
    updated_at = datetime('now')
WHERE 1=1;
```

5. Cliquez **Execute**
6. Vérifiez le résultat avec :

```sql
SELECT COUNT(*) as total, 
       COUNT(CASE WHEN timer_start IS NOT NULL THEN 1 END) as with_timer
FROM quai_status;
```

**Résultat attendu** : `total = 30`, `with_timer = 0`

---

### **Étape 2 : Forcer un Nouveau Déploiement Cloudflare**

**Option A : Auto-deploy (GitHub connecté)**
1. Le push Git `68fde8d` va déclencher un déploiement automatique
2. Attendez 1-2 minutes
3. Vérifiez dans **Cloudflare Pages → gxo-procedures-moissy → Deployments**

**Option B : Déploiement Manuel**
1. Ouvrez : https://dash.cloudflare.com
2. Allez à : **Workers & Pages → gxo-procedures-moissy → Deployments**
3. Cliquez **Create deployment**
4. Sélectionnez la branche **main**
5. Cliquez **Save and Deploy**

**Confirmation** : Attendez le statut **Success ✓** avec commit `68fde8d`

---

### **Étape 3 : Vider le Cache et Tester**

#### **3A. Vider le Cache Cloudflare (IMPORTANT)**

1. Dashboard Cloudflare → **Caching → Configuration**
2. Cliquez **Purge Cache** → **Purge Everything**
3. Confirmez

#### **3B. Vider le Cache Navigateur**

**Chrome / Edge / Brave :**
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

**Firefox :**
- `Ctrl + F5` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

**Safari :**
- `Cmd + Option + R`

#### **3C. Mode Navigation Privée (Recommandé)**

1. Ouvrez une fenêtre privée/incognito
2. Allez sur : https://gxomoissyprocedures.com/accueil-chauffeur
3. Cliquez sur l'onglet **"Gestion des Quais"**

---

## ✅ Tests de Validation

### **Test 1 : Affichage Initial**
- [ ] Les 30 quais s'affichent en grille 6×5
- [ ] Tous les quais sont verts (Disponibles)
- [ ] Statistiques affichent : **Disponible: 30 | En cours: 0 | Indisponible: 0**

### **Test 2 : Timer Démarre Correctement**
- [ ] Cliquez sur **Quai 5** → Statut **"En cours"** → **Enregistrer**
- [ ] Le quai devient jaune 🟡
- [ ] Un timer apparaît : **00:00:00**
- [ ] Le timer commence à défiler : **00:00:01**, **00:00:02**, etc.

### **Test 3 : Timer Se Réinitialise**
- [ ] Cliquez sur **Quai 5** → Statut **"Disponible"** → **Enregistrer**
- [ ] Le quai devient vert 🟢
- [ ] Le timer **disparaît**

### **Test 4 : Nouveau Cycle**
- [ ] Cliquez à nouveau sur **Quai 5** → **"En cours"**
- [ ] Le timer **repart de 00:00:00** (PAS de reprise de l'ancien temps)

### **Test 5 : Persistance Après Refresh**
- [ ] Rafraîchissez la page (`F5`)
- [ ] Le quai 5 reste jaune 🟡
- [ ] Le timer continue de défiler (temps persisté)

---

## 🐛 Dépannage Avancé

### **Problème : Les quais ne s'affichent toujours pas**

#### **1. Vérifier la Console JavaScript**

1. Sur la page https://gxomoissyprocedures.com/accueil-chauffeur
2. Appuyez sur `F12` (DevTools)
3. Allez dans l'onglet **Console**
4. Cherchez des erreurs rouges

**Erreurs possibles :**
- `Failed to fetch` → Problème réseau ou CORS
- `quais-grid not found` → L'élément n'existe pas (problème HTML)
- `Unexpected token` → Erreur JavaScript

#### **2. Vérifier l'API Directement**

Ouvrez dans votre navigateur :
```
https://gxomoissyprocedures.com/api/quais
```

**Résultat attendu :**
```json
{
  "success": true,
  "quais": [
    {
      "id": 1,
      "quai_numero": 1,
      "statut": "disponible",
      "timer_start": null,
      "commentaire": null,
      "commentaire_auteur": null,
      "updated_at": "2026-03-04 ...",
      "created_at": "2026-03-04 ..."
    },
    ...
  ]
}
```

**Si `timer_start` contient un nombre** (ex: `1772605409550`) :
→ Répétez l'**Étape 1** (nettoyage SQL)

#### **3. Vérifier le Déploiement**

1. Dashboard Cloudflare → **Workers & Pages → gxo-procedures-moissy**
2. Vérifiez le **dernier déploiement** :
   - Commit : `68fde8d` ou plus récent
   - Statut : **Success ✓**
   - Date : Aujourd'hui (4 mars 2026)

Si le commit est ancien (`ef852f8a` ou `91b69fa7`) :
→ Répétez l'**Étape 2** (nouveau déploiement)

---

## 📋 Checklist Finale

- [ ] **Étape 1** : SQL exécuté → `COUNT(*) = 30`, `with_timer = 0`
- [ ] **Étape 2** : Déploiement Success avec commit `68fde8d`
- [ ] **Étape 3A** : Cache Cloudflare purgé
- [ ] **Étape 3B** : Cache navigateur vidé (`Ctrl+Shift+R`)
- [ ] **Test 1** : 30 quais verts affichés
- [ ] **Test 2** : Timer démarre à 00:00:00
- [ ] **Test 3** : Timer disparaît en mode Disponible
- [ ] **Test 4** : Timer repart de 00:00:00
- [ ] **Test 5** : Timer persiste après F5

---

## 📞 Support

Si le problème persiste après ces 3 étapes :

1. **Vérifiez la console JavaScript** (F12) et notez les erreurs
2. **Testez l'API** directement : https://gxomoissyprocedures.com/api/quais
3. **Vérifiez le commit déployé** dans Cloudflare Pages
4. **Testez en navigation privée** pour éliminer le cache local

---

## 📦 Fichiers de Référence

- **SQL de nettoyage** : `SQL_NETTOYAGE_PRODUCTION.sql`
- **Commit du fix** : `68fde8d`
- **Branche** : `main`
- **Version** : `v2.3.0-quais-timer-fix`

---

## 🎯 Résumé Ultra-Rapide

```bash
# 1. Nettoyage D1 (Console Cloudflare)
UPDATE quai_status SET statut='disponible', timer_start=NULL WHERE 1=1;

# 2. Nouveau déploiement (Auto ou Manuel)
# → Commit 68fde8d déjà poussé sur GitHub

# 3. Vider les caches
# → Cloudflare : Purge Everything
# → Navigateur : Ctrl+Shift+R
# → Tester en navigation privée

# 4. Tester l'interface
# → https://gxomoissyprocedures.com/accueil-chauffeur
# → Onglet "Gestion des Quais"
# → Vérifier les 30 quais verts
```

---

**Dernière mise à jour** : 4 mars 2026
**Commit** : `68fde8d`
**Status** : ✅ Prêt pour production
