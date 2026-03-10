-- ========================================
-- TRIGGER AUTOMATIQUE : CORRECTION -1H
-- Retire automatiquement 3600 secondes (1h)
-- à chaque UPDATE de timer_duration ou timer_controle_duration
-- ========================================

-- SUPPRIMER LES ANCIENS TRIGGERS (si existants)
DROP TRIGGER IF EXISTS fix_timer_duration_auto;
DROP TRIGGER IF EXISTS fix_timer_controle_duration_auto;

-- TRIGGER 1 : Corriger timer_duration automatiquement
CREATE TRIGGER fix_timer_duration_auto
AFTER UPDATE OF timer_duration ON quai_status
FOR EACH ROW
WHEN NEW.timer_duration IS NOT NULL 
  AND NEW.timer_duration >= 3600
  AND NEW.timer_start IS NULL
  AND NEW.statut IN ('fin_dechargement', 'en_controle', 'fin_controle')
BEGIN
  -- Soustraire 3600 secondes si durée >= 1h
  UPDATE quai_status 
  SET timer_duration = NEW.timer_duration - 3600
  WHERE id = NEW.id;
END;

-- TRIGGER 2 : Corriger timer_controle_duration automatiquement
CREATE TRIGGER fix_timer_controle_duration_auto
AFTER UPDATE OF timer_controle_duration ON quai_status
FOR EACH ROW
WHEN NEW.timer_controle_duration IS NOT NULL 
  AND NEW.timer_controle_duration >= 3600
  AND NEW.timer_controle_start IS NULL
  AND NEW.statut = 'fin_controle'
BEGIN
  -- Soustraire 3600 secondes si durée >= 1h
  UPDATE quai_status 
  SET timer_controle_duration = NEW.timer_controle_duration - 3600
  WHERE id = NEW.id;
END;

-- VÉRIFICATION : Liste des triggers actifs
SELECT name, sql FROM sqlite_master 
WHERE type = 'trigger' 
  AND name LIKE 'fix_%'
ORDER BY name;
