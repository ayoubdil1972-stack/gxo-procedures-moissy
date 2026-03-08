-- Migration 0016: Ajouter colonne pour les points de vérification
-- Date: 2026-03-08

-- Ajouter une colonne JSON pour stocker les 11 points de contrôle
ALTER TABLE quai_status ADD COLUMN verification_points TEXT;

-- Note: SQLite utilise TEXT pour stocker JSON
-- Format: {"point_1":"conforme","point_2":"non_conforme",...}
