-- Test 1 : Créer une ligne avec datetime()
INSERT INTO test_timer (timer_start) VALUES (datetime('now', 'localtime'));

-- Test 2 : Afficher la valeur stockée
SELECT timer_start FROM test_timer ORDER BY id DESC LIMIT 1;

-- Test 3 : Calculer la durée avec unixepoch()
SELECT 
  timer_start,
  unixepoch('now', 'localtime') as now_unix,
  unixepoch(timer_start) as start_unix,
  unixepoch('now', 'localtime') - unixepoch(timer_start) as duration_seconds
FROM test_timer 
ORDER BY id DESC LIMIT 1;
