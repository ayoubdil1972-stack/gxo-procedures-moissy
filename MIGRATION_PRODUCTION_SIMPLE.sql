-- ===================================================================
-- MIGRATION CLOUDFLARE D1 - Ajout du statut "fin_dechargement"
-- ===================================================================
-- À EXÉCUTER UNE SEULE FOIS dans le Dashboard Cloudflare
-- Workers & Pages → D1 → gxo-chauffeurs-db → Console
-- ===================================================================

-- 1. Créer nouvelle table avec la contrainte CHECK mise à jour
DROP TABLE IF EXISTS quai_status_new;

CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement')),
  timer_start INTEGER,
  timer_duration INTEGER,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Copier les données existantes
INSERT INTO quai_status_new 
SELECT * FROM quai_status;

-- 3. Supprimer l'ancienne table
DROP TABLE quai_status;

-- 4. Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- 5. Recréer l'index unique
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);

-- 6. Vérifier que la migration a réussi
SELECT '✅ MIGRATION RÉUSSIE!' AS message, COUNT(*) AS nombre_quais FROM quai_status;

-- ===================================================================
-- IMPORTANT : Après cette migration, votre application web 
-- supportera automatiquement le statut bleu "Fin de déchargement"
-- avec timer figé !
-- ===================================================================
