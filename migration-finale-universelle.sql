-- 🔧 SQL UNIVERSEL - FONCTIONNE AVEC OU SANS timer_duration
-- Copier-coller TOUT ce bloc dans Cloudflare Dashboard D1 Console

-- Étape 1: Nettoyage (supprimer si existe)
DROP TABLE IF EXISTS quai_status_new;

-- Étape 2: Créer nouvelle table AVEC timer_duration (au cas où)
CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible', 'en_cours', 'indisponible', 'fin_dechargement')),
  timer_start INTEGER,
  timer_duration INTEGER,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Étape 3: Copier les données (toutes les colonnes de l'ancienne table)
INSERT INTO quai_status_new 
SELECT * FROM quai_status;

-- Étape 4: Supprimer l'ancienne table
DROP TABLE quai_status;

-- Étape 5: Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- Étape 6: Recréer l'index unique
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);

-- Étape 7: Test - Mettre le quai 75 en "fin_dechargement" pour vérifier
UPDATE quai_status 
SET statut = 'fin_dechargement',
    commentaire = '✅ Migration réussie - Test',
    timer_start = CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER)
WHERE quai_numero = 75;

-- Étape 8: Afficher le résultat
SELECT '✅ MIGRATION RÉUSSIE!' as message, 
       quai_numero, 
       statut, 
       commentaire 
FROM quai_status 
WHERE quai_numero = 75;
