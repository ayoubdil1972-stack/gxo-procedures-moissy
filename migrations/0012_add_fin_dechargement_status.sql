-- Migration 0012: Ajouter statut 'fin_dechargement' à la contrainte CHECK
-- Date: 2026-03-06

-- SQLite ne permet pas de modifier une contrainte CHECK directement
-- On doit recréer la table avec la nouvelle contrainte

-- 1. Créer une nouvelle table avec la contrainte mise à jour
CREATE TABLE IF NOT EXISTS quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible', 'en_cours', 'indisponible', 'fin_dechargement')),
  timer_start DATETIME,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Copier les données existantes
INSERT INTO quai_status_new (id, quai_numero, statut, timer_start, commentaire, commentaire_auteur, created_at, updated_at)
SELECT id, quai_numero, statut, timer_start, commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;

-- 3. Supprimer l'ancienne table
DROP TABLE quai_status;

-- 4. Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- 5. Recréer l'index sur quai_numero
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);
