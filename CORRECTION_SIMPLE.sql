-- ========================================
-- CORRECTION SIMPLE -1 HEURE
-- Version corrigée pour Cloudflare D1
-- ========================================

-- 1. Corriger timer_duration (durée déchargement)
UPDATE quai_status 
SET timer_duration = timer_duration - 3600,
    updated_at = datetime('now', 'localtime')
WHERE timer_duration >= 3600;

-- 2. Corriger timer_controle_duration (durée contrôle)
UPDATE quai_status 
SET timer_controle_duration = timer_controle_duration - 3600,
    updated_at = datetime('now', 'localtime')
WHERE timer_controle_duration >= 3600;

-- 3. Vérifier les corrections
SELECT 
  quai_numero,
  statut,
  timer_duration,
  timer_controle_duration,
  commentaire_auteur
FROM quai_status 
WHERE timer_duration IS NOT NULL 
   OR timer_controle_duration IS NOT NULL
ORDER BY quai_numero;
