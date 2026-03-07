-- Migration: Ajouter colonnes informations contrôle
-- Date: 2026-03-07
-- Description: Ajoute les colonnes pour stocker les infos complètes du contrôle

-- Ajouter les colonnes pour les informations de contrôle
ALTER TABLE quai_status ADD COLUMN controle_debut_timestamp TEXT;
ALTER TABLE quai_status ADD COLUMN controle_fournisseur TEXT;
ALTER TABLE quai_status ADD COLUMN controle_id_chauffeur TEXT;

-- Vérifier que tout est correct
SELECT 
    quai_numero,
    statut,
    timer_duration,
    timer_controle_duration,
    controleur_nom,
    controle_debut_timestamp,
    controle_fournisseur,
    controle_id_chauffeur
FROM quai_status
WHERE statut IN ('en_controle', 'fin_controle')
LIMIT 5;

-- Compter le nombre de quais
SELECT COUNT(*) as total_quais FROM quai_status;
