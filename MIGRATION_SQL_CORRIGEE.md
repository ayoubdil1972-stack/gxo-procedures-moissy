# 🔧 MIGRATION SQL CORRIGÉE - FIN DÉCHARGEMENT

**TOUTES LES COMMANDES SQL CORRIGÉES À EXÉCUTER DANS CLOUDFLARE D1 CONSOLE**

---

## ✅ COMMANDE 1 : Supprimer table temporaire (DÉJÀ EXÉCUTÉE - OK)
```sql
DROP TABLE IF EXISTS quai_status_new;
```

---

## ✅ COMMANDE 2 : Créer nouvelle table (DÉJÀ EXÉCUTÉE - OK)
```sql
CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible',
  timer_start TEXT,
  timer_duration INTEGER,
  timer_controle_start TEXT,
  timer_controle_duration INTEGER,
  controle_debut_timestamp TEXT,
  controle_fin_timestamp TEXT,
  controle_fournisseur TEXT,
  controle_id_chauffeur TEXT,
  controleur_nom TEXT,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle'))
);
```

---

## ⚠️ COMMANDE 3 : Copier les données (CORRIGÉE - SANS timer_fin_timestamp)
```sql
INSERT INTO quai_status_new (
  id, quai_numero, statut, 
  timer_start, timer_duration,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, 
  created_at, updated_at
)
SELECT 
  id, quai_numero, statut,
  timer_start, timer_duration,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur,
  created_at, updated_at
FROM quai_status;
```

---

## ✅ COMMANDE 4 : Supprimer ancienne table
```sql
DROP TABLE quai_status;
```

---

## ✅ COMMANDE 5 : Renommer nouvelle table
```sql
ALTER TABLE quai_status_new RENAME TO quai_status;
```

---

## ✅ COMMANDE 6 : Recréer index unique
```sql
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);
```

---

## ✅ COMMANDE 7 : Vérifier le nombre de quais (doit retourner 45)
```sql
SELECT COUNT(*) AS total_quais FROM quai_status;
```
**Résultat attendu :** `total_quais: 45`

---

## ✅ COMMANDE 8 : Vérifier les statuts disponibles
```sql
SELECT DISTINCT statut FROM quai_status;
```
**Résultat attendu :** Liste des statuts incluant "disponible", "en_cours", etc.

---

## 📋 ORDRE D'EXÉCUTION

1. ✅ Commande 1 (DROP) - OK
2. ✅ Commande 2 (CREATE) - OK
3. ⚠️ **COMMANDE 3 (INSERT) - UTILISEZ LA VERSION CORRIGÉE CI-DESSUS**
4. ✅ Commande 4 (DROP)
5. ✅ Commande 5 (RENAME)
6. ✅ Commande 6 (INDEX)
7. ✅ Commande 7 (COUNT)
8. ✅ Commande 8 (DISTINCT)

---

## 🎯 APRÈS LA MIGRATION

Une fois toutes les commandes exécutées :

1. **Vider le cache** : CTRL + SHIFT + R
2. **Tester** : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
3. **Mettre un quai en "Fin de déchargement"**
4. **Vérifier** : Quai BLEU avec timer figé visible

---

## ⚠️ DIFFÉRENCE PRINCIPALE

**L'ancienne commande 3 incluait :**
- `timer_fin_timestamp` ❌ (cette colonne n'existe pas dans votre base)

**La nouvelle commande 3 n'inclut QUE les colonnes existantes :**
- Sans `timer_fin_timestamp` ✅

---

## 📝 COPIER-COLLER RAPIDE

**Commande 3 corrigée (à copier-coller) :**
```sql
INSERT INTO quai_status_new (id, quai_numero, statut, timer_start, timer_duration, timer_controle_start, timer_controle_duration, controle_debut_timestamp, controle_fin_timestamp, controle_fournisseur, controle_id_chauffeur, controleur_nom, commentaire, commentaire_auteur, created_at, updated_at) SELECT id, quai_numero, statut, timer_start, timer_duration, timer_controle_start, timer_controle_duration, controle_debut_timestamp, controle_fin_timestamp, controle_fournisseur, controle_id_chauffeur, controleur_nom, commentaire, commentaire_auteur, created_at, updated_at FROM quai_status;
```

---

**Toutes les autres commandes (4-8) restent identiques et n'ont pas d'erreur !** ✅
