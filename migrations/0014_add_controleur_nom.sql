-- Migration: Ajouter colonne controleur_nom
-- Date: 2026-03-07
-- Description: Ajoute le nom du contrôleur pour le statut "fin_controle"

-- Ajouter la colonne pour le nom du contrôleur
ALTER TABLE quai_status ADD COLUMN controleur_nom TEXT;

-- Vérifier que tout est correct
SELECT 
    quai_numero,
    statut,
    timer_duration,
    timer_controle_duration,
    controleur_nom,
    updated_at
FROM quai_status
WHERE statut = 'fin_controle'
LIMIT 5;

-- Compter le nombre de quais
SELECT COUNT(*) as total_quais FROM quai_status;
