-- ===================================================================
-- MIGRATION CLOUDFLARE D1 - Version CORRIGÉE
-- ===================================================================
-- COPIER-COLLER COMMANDE PAR COMMANDE dans le Dashboard Cloudflare
-- Workers & Pages → D1 → gxo-chauffeurs-db → Console
-- ===================================================================

-- COMMANDE 1: Supprimer l'ancienne table temporaire si elle existe
DROP TABLE IF EXISTS quai_status_new;

-- COMMANDE 2: Créer la nouvelle table avec le statut fin_dechargement
CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible',
  timer_start INTEGER,
  timer_duration INTEGER,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement'))
);

-- COMMANDE 3: Copier toutes les données existantes
INSERT INTO quai_status_new (id, quai_numero, statut, timer_start, timer_duration, commentaire, commentaire_auteur, created_at, updated_at)
SELECT id, quai_numero, statut, timer_start, timer_duration, commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;

-- COMMANDE 4: Supprimer l'ancienne table
DROP TABLE quai_status;

-- COMMANDE 5: Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- COMMANDE 6: Recréer l'index unique
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);

-- COMMANDE 7: Vérifier le résultat
SELECT COUNT(*) AS total_quais FROM quai_status;

-- ===================================================================
-- RÉSULTAT ATTENDU: total_quais = 45
-- ===================================================================
