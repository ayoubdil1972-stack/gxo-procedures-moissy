-- Migration 0015: Ajouter fin_dechargement à la contrainte CHECK
-- Date: 2026-03-10
-- Description: Permet au statut fin_dechargement de fonctionner en production

-- Étape 1: Supprimer table temporaire si elle existe
DROP TABLE IF EXISTS quai_status_new;

-- Étape 2: Créer nouvelle table avec contrainte CHECK étendue
CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible',
  timer_start TEXT,
  timer_duration INTEGER,
  timer_fin_timestamp TEXT,
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
  CHECK(statut IN (
    'disponible',
    'en_cours',
    'indisponible',
    'fin_dechargement',
    'en_controle',
    'fin_controle'
  ))
);

-- Étape 3: Copier toutes les données existantes
INSERT INTO quai_status_new (
  id, quai_numero, statut, timer_start, timer_duration, timer_fin_timestamp,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
)
SELECT 
  id, quai_numero, statut, timer_start, timer_duration, timer_fin_timestamp,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;

-- Étape 4: Supprimer l'ancienne table
DROP TABLE quai_status;

-- Étape 5: Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- Étape 6: Recréer l'index unique
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);

-- Étape 7: Vérifier le nombre de quais (doit retourner 45)
SELECT COUNT(*) AS total_quais FROM quai_status;

-- Étape 8: Vérifier les statuts disponibles
SELECT DISTINCT statut FROM quai_status;
