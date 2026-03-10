-- ========================================
-- CORRECTION AUTOMATIQUE -1 HEURE
-- Retire 3600 secondes de TOUS les timers figés
-- Pour les 45 quais actifs
-- ========================================

-- 1. Corriger timer_duration (durée déchargement figé)
--    Soustrait 3600 secondes (1 heure) de toutes les durées
UPDATE quai_status 
SET timer_duration = CASE 
    WHEN timer_duration >= 3600 THEN timer_duration - 3600
    ELSE timer_duration
END,
updated_at = datetime('now', 'localtime')
WHERE timer_duration IS NOT NULL 
  AND timer_duration > 0;

-- 2. Corriger timer_controle_duration (durée contrôle figé)
--    Soustrait 3600 secondes (1 heure) de toutes les durées
UPDATE quai_status 
SET timer_controle_duration = CASE 
    WHEN timer_controle_duration >= 3600 THEN timer_controle_duration - 3600
    ELSE timer_controle_duration
END,
updated_at = datetime('now', 'localtime')
WHERE timer_controle_duration IS NOT NULL 
  AND timer_controle_duration > 0;

-- 3. VÉRIFICATION : Afficher tous les quais avec durées corrigées
SELECT 
  quai_numero AS 'Quai',
  statut AS 'Statut',
  CASE 
    WHEN timer_duration IS NOT NULL THEN 
      printf('%02d:%02d:%02d', 
        timer_duration / 3600,
        (timer_duration % 3600) / 60,
        timer_duration % 60)
    ELSE '-'
  END AS 'Durée Déchargement',
  CASE 
    WHEN timer_controle_duration IS NOT NULL THEN 
      printf('%02d:%02d:%02d', 
        timer_controle_duration / 3600,
        (timer_controle_duration % 3600) / 60,
        timer_controle_duration % 60)
    ELSE '-'
  END AS 'Durée Contrôle',
  commentaire_auteur AS 'Agent',
  controleur_nom AS 'Contrôleur'
FROM quai_status 
WHERE timer_duration IS NOT NULL 
   OR timer_controle_duration IS NOT NULL
ORDER BY quai_numero;

-- 4. STATISTIQUES : Nombre de quais corrigés
SELECT 
  COUNT(*) AS 'Total quais avec durées',
  SUM(CASE WHEN timer_duration IS NOT NULL THEN 1 ELSE 0 END) AS 'Avec déchargement',
  SUM(CASE WHEN timer_controle_duration IS NOT NULL THEN 1 ELSE 0 END) AS 'Avec contrôle',
  SUM(CASE WHEN statut = 'fin_dechargement' THEN 1 ELSE 0 END) AS 'En fin déchargement',
  SUM(CASE WHEN statut = 'fin_controle' THEN 1 ELSE 0 END) AS 'En fin contrôle'
FROM quai_status 
WHERE timer_duration IS NOT NULL 
   OR timer_controle_duration IS NOT NULL;
