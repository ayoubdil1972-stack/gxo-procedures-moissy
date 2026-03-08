-- Migration 0018: TRIGGER AUTOMATIQUE pour corriger les timers +3600s
-- Ce trigger s'exécute AUTOMATIQUEMENT après chaque INSERT/UPDATE
-- Plus besoin d'exécuter manuellement le SQL !

-- DROP des anciens triggers si ils existent
DROP TRIGGER IF EXISTS auto_fix_timer_duration_insert;
DROP TRIGGER IF EXISTS auto_fix_timer_duration_update;
DROP TRIGGER IF EXISTS auto_fix_timer_controle_insert;
DROP TRIGGER IF EXISTS auto_fix_timer_controle_update;

-- TRIGGER 1: Corriger timer_duration après INSERT
CREATE TRIGGER auto_fix_timer_duration_insert
AFTER INSERT ON quai_status
FOR EACH ROW
WHEN NEW.timer_duration > 3600
BEGIN
  UPDATE quai_status
  SET timer_duration = timer_duration - 3600
  WHERE quai_numero = NEW.quai_numero
    AND timer_duration > 3600;
END;

-- TRIGGER 2: Corriger timer_duration après UPDATE
CREATE TRIGGER auto_fix_timer_duration_update
AFTER UPDATE ON quai_status
FOR EACH ROW
WHEN NEW.timer_duration > 3600
BEGIN
  UPDATE quai_status
  SET timer_duration = timer_duration - 3600
  WHERE quai_numero = NEW.quai_numero
    AND timer_duration > 3600;
END;

-- TRIGGER 3: Corriger timer_controle_duration après INSERT
CREATE TRIGGER auto_fix_timer_controle_insert
AFTER INSERT ON quai_status
FOR EACH ROW
WHEN NEW.timer_controle_duration > 3600
BEGIN
  UPDATE quai_status
  SET timer_controle_duration = timer_controle_duration - 3600
  WHERE quai_numero = NEW.quai_numero
    AND timer_controle_duration > 3600;
END;

-- TRIGGER 4: Corriger timer_controle_duration après UPDATE
CREATE TRIGGER auto_fix_timer_controle_update
AFTER UPDATE ON quai_status
FOR EACH ROW
WHEN NEW.timer_controle_duration > 3600
BEGIN
  UPDATE quai_status
  SET timer_controle_duration = timer_controle_duration - 3600
  WHERE quai_numero = NEW.quai_numero
    AND timer_controle_duration > 3600;
END;

-- Corriger les données existantes une dernière fois
UPDATE quai_status
SET timer_duration = timer_duration - 3600
WHERE timer_duration > 3600;

UPDATE quai_status
SET timer_controle_duration = timer_controle_duration - 3600
WHERE timer_controle_duration > 3600;
