-- Migration: Ajouter timestamps de fin pour déchargement et contrôle
-- Date: 2026-03-08
-- Description: Ajoute les colonnes pour stocker l'heure exacte de fin de déchargement et fin de contrôle

-- Ajouter le timestamp de fin de déchargement
ALTER TABLE quai_status ADD COLUMN timer_fin_timestamp TEXT;

-- Ajouter le timestamp de fin de contrôle
ALTER TABLE quai_status ADD COLUMN controle_fin_timestamp TEXT;

-- Vérifier que les colonnes ont été ajoutées
SELECT 
    quai_numero,
    statut,
    timer_duration,
    timer_fin_timestamp,
    timer_controle_duration,
    controle_fin_timestamp,
    controleur_nom
FROM quai_status
WHERE statut IN ('fin_dechargement', 'en_controle', 'fin_controle')
LIMIT 5;
