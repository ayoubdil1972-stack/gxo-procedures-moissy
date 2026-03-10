# 🔧 CORRECTION DÉFINITIVE -1 HEURE AUTOMATIQUE

**Date** : 2026-03-10  
**Problème** : Les durées figées affichent +1 heure de trop  
**Solution** : SQL qui retire automatiquement 3600 secondes (1h)

---

## 📋 ÉTAPES DE CORRECTION

### ÉTAPE 1 : Accéder à la Console Cloudflare D1

1. Ouvrir : https://dash.cloudflare.com
2. Menu gauche : **Workers & Pages**
3. Onglet : **D1**
4. Sélectionner : **gxo-chauffeurs-db**
5. Cliquer sur : **Console**

---

### ÉTAPE 2 : Corriger les Données EXISTANTES

**Copier-coller ce SQL dans la console :**

```sql
-- 1. Corriger timer_duration (durée déchargement figé)
UPDATE quai_status 
SET timer_duration = CASE 
    WHEN timer_duration >= 3600 THEN timer_duration - 3600
    ELSE timer_duration
END,
updated_at = datetime('now', 'localtime')
WHERE timer_duration IS NOT NULL 
  AND timer_duration > 0;

-- 2. Corriger timer_controle_duration (durée contrôle figé)
UPDATE quai_status 
SET timer_controle_duration = CASE 
    WHEN timer_controle_duration >= 3600 THEN timer_controle_duration - 3600
    ELSE timer_controle_duration
END,
updated_at = datetime('now', 'localtime')
WHERE timer_controle_duration IS NOT NULL 
  AND timer_controle_duration > 0;
```

**Résultat attendu :**
```
✅ 2 rows updated (pour timer_duration)
✅ 1 rows updated (pour timer_controle_duration)
```

---

### ÉTAPE 3 : Vérifier la Correction

```sql
-- Afficher tous les quais avec durées corrigées
SELECT 
  quai_numero AS 'Quai',
  statut AS 'Statut',
  CASE 
    WHEN timer_duration IS NOT NULL THEN 
      printf('%02d:%02d:%02d', 
        timer_duration / 3600,
        (timer_duration % 3600) / 60,
        timer_duration % 60)
    ELSE '-'
  END AS 'Durée Déchargement',
  CASE 
    WHEN timer_controle_duration IS NOT NULL THEN 
      printf('%02d:%02d:%02d', 
        timer_controle_duration / 3600,
        (timer_controle_duration % 3600) / 60,
        timer_controle_duration % 60)
    ELSE '-'
  END AS 'Durée Contrôle',
  commentaire_auteur AS 'Agent',
  controleur_nom AS 'Contrôleur'
FROM quai_status 
WHERE timer_duration IS NOT NULL 
   OR timer_controle_duration IS NOT NULL
ORDER BY quai_numero;
```

**Exemple de résultat attendu :**

| Quai | Statut | Durée Déchargement | Durée Contrôle | Agent | Contrôleur |
|------|--------|-------------------|----------------|-------|------------|
| 1 | fin_dechargement | **00:00:18** | - | Ayoub | - |
| 2 | fin_dechargement | **00:00:34** | - | Ayoub | - |
| 1 | fin_controle | 00:00:18 | **00:00:24** | Ayoub | Asma |

**Avant correction :**
- Quai 1 : `01:00:18` ❌
- Quai 2 : `01:00:34` ❌

**Après correction :**
- Quai 1 : `00:00:18` ✅
- Quai 2 : `00:00:34` ✅

---

### ÉTAPE 4 (OPTIONNELLE) : Trigger Automatique

**⚠️ ATTENTION : Cloudflare D1 ne supporte PAS les triggers (limitations Edge SQL)**

Si vous voulez une correction automatique future, il faudra modifier le code backend pour soustraire 3600 secondes lors du calcul.

---

## 🧪 TEST APRÈS CORRECTION

### Test 1 : Quais Existants Corrigés

1. **Vider le cache** : Ctrl+Shift+R
2. **Ouvrir** : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
3. **Vérifier** :
   - Quai 1 doit afficher `00:00:18` au lieu de `01:00:18` ✅
   - Quai 2 doit afficher `00:00:34` au lieu de `01:00:34` ✅

### Test 2 : Nouveaux Quais

1. Mettre un quai "En cours" (🟡)
2. Attendre **15 secondes** exactement
3. Terminer le déchargement
4. **Vérifier** : Timer affiche `00:00:15` ✅ (CORRECT dès le début)

---

## 📊 STATISTIQUES APRÈS CORRECTION

```sql
-- Nombre de quais corrigés
SELECT 
  COUNT(*) AS 'Total quais avec durées',
  SUM(CASE WHEN timer_duration IS NOT NULL THEN 1 ELSE 0 END) AS 'Avec déchargement',
  SUM(CASE WHEN timer_controle_duration IS NOT NULL THEN 1 ELSE 0 END) AS 'Avec contrôle',
  SUM(CASE WHEN statut = 'fin_dechargement' THEN 1 ELSE 0 END) AS 'En fin déchargement',
  SUM(CASE WHEN statut = 'fin_controle' THEN 1 ELSE 0 END) AS 'En fin contrôle'
FROM quai_status 
WHERE timer_duration IS NOT NULL 
   OR timer_controle_duration IS NOT NULL;
```

---

## 🔄 SI LE PROBLÈME REVIENT

### Solution Définitive : Modifier le Code Backend

Le problème vient du calcul dans `src/index.tsx`. Si après correction SQL le bug revient sur les nouveaux quais, il faut modifier le code :

**Option 1 : Soustraire 3600s lors du calcul (ligne ~3088)**
```typescript
timerDuration = Math.floor((endTime - startTime) / 1000) - 3600
```

**Option 2 : Corriger getParisTime() pour retourner format correct**
```typescript
function getParisTime(): string {
  return new Date().toLocaleString('sv-SE', { 
    timeZone: 'Europe/Paris',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).replace(',', '').replace('T', ' ')
}
```

---

## 📂 FICHIERS SQL CRÉÉS

1. **CORRECTION_AUTO_MOINS_1H.sql**
   - Corrige toutes les durées existantes (-3600s)
   - Avec vérification et statistiques

2. **TRIGGER_AUTO_CORRECTION.sql** (NON UTILISABLE sur D1)
   - Trigger automatique (Cloudflare D1 ne supporte pas)
   - Gardé pour référence future

---

## ✅ RÉCAPITULATIF

| Action | Statut | Résultat |
|--------|--------|----------|
| Code v3.7.3 restauré | ✅ Fait | Nouveaux quais OK |
| Correction SQL -3600s | ⏳ À faire | Anciens quais OK |
| Vider cache navigateur | ⏳ À faire | Affichage OK |

---

## 🆘 EN CAS DE PROBLÈME

### Si la correction SQL ne fonctionne pas

**Option 1 : Remettre tous les quais à zéro**
```sql
UPDATE quai_status 
SET statut = 'disponible',
    timer_start = NULL,
    timer_duration = NULL,
    timer_fin_timestamp = NULL,
    timer_controle_start = NULL,
    timer_controle_duration = NULL,
    controle_debut_timestamp = NULL,
    controle_fin_timestamp = NULL,
    commentaire = NULL,
    updated_at = datetime('now', 'localtime');
```

**Option 2 : Modifier le code pour soustraire 3600s automatiquement**

Je peux créer une version modifiée du code qui soustrait automatiquement 3600 secondes lors du calcul.

---

## 🔗 COMMANDES RAPIDES

**Copier-coller dans Console D1 (dans l'ordre) :**

```sql
-- 1. Corriger déchargement
UPDATE quai_status SET timer_duration = CASE WHEN timer_duration >= 3600 THEN timer_duration - 3600 ELSE timer_duration END WHERE timer_duration IS NOT NULL AND timer_duration > 0;

-- 2. Corriger contrôle
UPDATE quai_status SET timer_controle_duration = CASE WHEN timer_controle_duration >= 3600 THEN timer_controle_duration - 3600 ELSE timer_controle_duration END WHERE timer_controle_duration IS NOT NULL AND timer_controle_duration > 0;

-- 3. Vérifier
SELECT quai_numero, statut, timer_duration, timer_controle_duration FROM quai_status WHERE timer_duration IS NOT NULL OR timer_controle_duration IS NOT NULL ORDER BY quai_numero;
```

---

✅ **Après exécution du SQL : Vider le cache (Ctrl+Shift+R) et vérifier l'affichage**
