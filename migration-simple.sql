-- Script SQL simplifié pour ajouter le statut 'fin_dechargement'
-- À exécuter via le dashboard Cloudflare D1

-- Étape 1: Créer une nouvelle table avec la contrainte corrigée
CREATE TABLE IF NOT EXISTS quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible', 'en_cours', 'indisponible', 'fin_dechargement')),
  timer_start DATETIME,
  timer_duration INTEGER,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Étape 2: Copier les données existantes
INSERT INTO quai_status_new (id, quai_numero, statut, timer_start, timer_duration, commentaire, commentaire_auteur, created_at, updated_at)
SELECT id, quai_numero, statut, timer_start, timer_duration, commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;

-- Étape 3: Supprimer l'ancienne table
DROP TABLE quai_status;

-- Étape 4: Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- Étape 5: Recréer l'index
CREATE UNIQUE INDEX IF NOT EXISTS idx_quai_numero ON quai_status(quai_numero);

-- Étape 6: Vérifier la structure
SELECT sql FROM sqlite_master WHERE name='quai_status';
