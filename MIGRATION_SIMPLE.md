# 🚀 MIGRATION FINALE - COPIER-COLLER CES 8 COMMANDES

**Ouvrir :** https://dash.cloudflare.com → Workers & Pages → D1 → **gxo-chauffeurs-db** → **Console**

**Copier-coller CHAQUE commande UNE PAR UNE :**

---

## Commande 1
```sql
DROP TABLE IF EXISTS quai_status_new;
```

---

## Commande 2
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

## Commande 3
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

## Commande 4
```sql
DROP TABLE quai_status;
```

---

## Commande 5
```sql
ALTER TABLE quai_status_new RENAME TO quai_status;
```

---

## Commande 6
```sql
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);
```

---

## Commande 7 (Vérification - doit retourner 45)
```sql
SELECT COUNT(*) AS total_quais FROM quai_status;
```

---

## Commande 8 (Vérification des statuts)
```sql
SELECT DISTINCT statut FROM quai_status;
```

---

## ✅ APRÈS LA MIGRATION

1. **Vider le cache** : CTRL + SHIFT + R
2. **Ouvrir** : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
3. **Tester** : Mettre un quai en "Fin de déchargement"
4. **Vérifier** : Quai BLEU avec timer figé visible

**Les quais en "Fin de déchargement" seront maintenant BLEUS avec timers figés ! 🎉**
