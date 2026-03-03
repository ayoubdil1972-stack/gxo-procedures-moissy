-- Migration 0009: Gestion des quais (30 quais avec statut et timer)
-- Création de la table quai_status pour gérer l'état des quais

CREATE TABLE IF NOT EXISTS quai_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE CHECK(quai_numero >= 1 AND quai_numero <= 30),
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible', 'en_cours', 'indisponible')),
  timer_start INTEGER, -- Timestamp Unix en millisecondes (NULL si pas en cours)
  commentaire TEXT, -- Obligatoire si statut = 'indisponible'
  commentaire_auteur TEXT, -- Nom de la personne qui a commenté
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherche rapide par numéro de quai
CREATE INDEX IF NOT EXISTS idx_quai_numero ON quai_status(quai_numero);

-- Index pour recherche par statut
CREATE INDEX IF NOT EXISTS idx_quai_statut ON quai_status(statut);

-- Initialiser les 30 quais avec le statut "disponible"
INSERT OR IGNORE INTO quai_status (quai_numero, statut) VALUES
  (1, 'disponible'), (2, 'disponible'), (3, 'disponible'), (4, 'disponible'), (5, 'disponible'),
  (6, 'disponible'), (7, 'disponible'), (8, 'disponible'), (9, 'disponible'), (10, 'disponible'),
  (11, 'disponible'), (12, 'disponible'), (13, 'disponible'), (14, 'disponible'), (15, 'disponible'),
  (16, 'disponible'), (17, 'disponible'), (18, 'disponible'), (19, 'disponible'), (20, 'disponible'),
  (21, 'disponible'), (22, 'disponible'), (23, 'disponible'), (24, 'disponible'), (25, 'disponible'),
  (26, 'disponible'), (27, 'disponible'), (28, 'disponible'), (29, 'disponible'), (30, 'disponible');
