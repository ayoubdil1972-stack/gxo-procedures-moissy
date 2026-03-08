-- Script SQL pour corriger les timer_duration et timer_controle_duration incorrects
-- Problème : Les anciennes entrées ont +3600 secondes (1 heure) à cause du bug +Z

-- Afficher les entrées avec problème (>3600 secondes = plus d'1h)
SELECT 
  quai_numero,
  statut,
  timer_duration,
  timer_controle_duration,
  CASE 
    WHEN timer_duration > 3600 THEN timer_duration - 3600
    ELSE timer_duration
  END as timer_duration_corrigé,
  CASE 
    WHEN timer_controle_duration > 3600 THEN timer_controle_duration - 3600
    ELSE timer_controle_duration
  END as timer_controle_duration_corrigé
FROM quai_status
WHERE (timer_duration > 3600 OR timer_controle_duration > 3600)
  AND (statut = 'fin_dechargement' OR statut = 'fin_controle');

-- Corriger timer_duration (retirer 3600 secondes si >3600)
UPDATE quai_status
SET timer_duration = timer_duration - 3600
WHERE timer_duration > 3600
  AND (statut = 'fin_dechargement' OR statut = 'fin_controle');

-- Corriger timer_controle_duration (retirer 3600 secondes si >3600)
UPDATE quai_status
SET timer_controle_duration = timer_controle_duration - 3600
WHERE timer_controle_duration > 3600
  AND (statut = 'fin_dechargement' OR statut = 'fin_controle');

-- Vérifier les corrections
SELECT 
  quai_numero,
  statut,
  timer_duration,
  timer_controle_duration
FROM quai_status
WHERE (statut = 'fin_dechargement' OR statut = 'fin_controle')
ORDER BY quai_numero;
