-- SQL AUTOMATIQUE pour corriger TOUTES les entrées (anciennes + nouvelles)
-- À exécuter CHAQUE FOIS que vous voyez +1h

-- 1️⃣ Corriger TOUTES les entrées timer_duration > 3600
UPDATE quai_status
SET timer_duration = timer_duration - 3600
WHERE timer_duration > 3600
  AND (statut = 'fin_dechargement' OR statut = 'fin_controle' OR statut = 'disponible' OR statut = 'en_cours' OR statut = 'en_controle');

-- 2️⃣ Corriger TOUTES les entrées timer_controle_duration > 3600
UPDATE quai_status
SET timer_controle_duration = timer_controle_duration - 3600
WHERE timer_controle_duration > 3600
  AND (statut = 'fin_dechargement' OR statut = 'fin_controle' OR statut = 'disponible' OR statut = 'en_cours' OR statut = 'en_controle');

-- 3️⃣ Vérifier les corrections
SELECT 
  quai_numero,
  statut,
  timer_duration,
  timer_controle_duration,
  updated_at,
  CASE 
    WHEN timer_duration > 3600 THEN '❌ ENCORE INCORRECT'
    WHEN timer_controle_duration > 3600 THEN '❌ ENCORE INCORRECT'
    ELSE '✅ CORRECT'
  END as resultat
FROM quai_status
WHERE statut IN ('fin_dechargement', 'fin_controle', 'en_cours', 'en_controle')
ORDER BY updated_at DESC
LIMIT 20;

-- 4️⃣ Statistiques
SELECT 
  COUNT(*) as total_quais,
  SUM(CASE WHEN timer_duration > 3600 THEN 1 ELSE 0 END) as timer_duration_incorrects,
  SUM(CASE WHEN timer_controle_duration > 3600 THEN 1 ELSE 0 END) as timer_controle_incorrects,
  SUM(CASE WHEN timer_duration <= 3600 AND timer_controle_duration <= 3600 THEN 1 ELSE 0 END) as corrects
FROM quai_status
WHERE statut IN ('fin_dechargement', 'fin_controle');
