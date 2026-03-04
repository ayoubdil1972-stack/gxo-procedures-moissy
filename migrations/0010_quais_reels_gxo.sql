-- Migration 0010: Mise à jour des numéros de quais réels GXO (45 quais)
-- Remplacement des numéros 1-30 par les vrais numéros de quais GXO Moissy

-- Supprimer les anciens quais (1-30)
DELETE FROM quai_status;

-- Insérer les 45 quais réels GXO dans l'ordre croissant
-- Quais 1 à 10 (10 quais)
INSERT OR IGNORE INTO quai_status (quai_numero, statut) VALUES
  (1, 'disponible'), (2, 'disponible'), (3, 'disponible'), (4, 'disponible'), (5, 'disponible'),
  (6, 'disponible'), (7, 'disponible'), (8, 'disponible'), (9, 'disponible'), (10, 'disponible'),
  
  -- Quais 32 à 38 (7 quais)
  (32, 'disponible'), (33, 'disponible'), (34, 'disponible'), (35, 'disponible'), (36, 'disponible'),
  (37, 'disponible'), (38, 'disponible'),
  
  -- Quais 45 à 49 (5 quais)
  (45, 'disponible'), (46, 'disponible'), (47, 'disponible'), (48, 'disponible'), (49, 'disponible'),
  
  -- Quais 60 à 62 (3 quais)
  (60, 'disponible'), (61, 'disponible'), (62, 'disponible'),
  
  -- Quais 67 à 69 (3 quais)
  (67, 'disponible'), (68, 'disponible'), (69, 'disponible'),
  
  -- Quais 75 à 79 (5 quais)
  (75, 'disponible'), (76, 'disponible'), (77, 'disponible'), (78, 'disponible'), (79, 'disponible'),
  
  -- Quais 81 à 87 (7 quais)
  (81, 'disponible'), (82, 'disponible'), (83, 'disponible'), (84, 'disponible'), (85, 'disponible'),
  (86, 'disponible'), (87, 'disponible'),
  
  -- Quais 99 à 103 (5 quais)
  (99, 'disponible'), (100, 'disponible'), (101, 'disponible'), (102, 'disponible'), (103, 'disponible');

-- Mettre à jour la contrainte CHECK pour accepter les nouveaux numéros
-- Note: SQLite ne permet pas de modifier une contrainte CHECK existante
-- Il faut recréer la table

-- Créer une nouvelle table temporaire avec la bonne contrainte
CREATE TABLE IF NOT EXISTS quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible', 'en_cours', 'indisponible')),
  timer_start TEXT, -- Format SQLite datetime (YYYY-MM-DD HH:MM:SS)
  commentaire TEXT,
  commentaire_auteur TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Copier les données
INSERT INTO quai_status_new (quai_numero, statut, timer_start, commentaire, commentaire_auteur, updated_at, created_at)
SELECT quai_numero, statut, timer_start, commentaire, commentaire_auteur, updated_at, created_at
FROM quai_status;

-- Supprimer l'ancienne table
DROP TABLE quai_status;

-- Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- Recréer les index
CREATE INDEX IF NOT EXISTS idx_quai_numero ON quai_status(quai_numero);
CREATE INDEX IF NOT EXISTS idx_quai_statut ON quai_status(statut);
