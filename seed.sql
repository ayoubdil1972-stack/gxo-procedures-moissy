-- Données de test pour chauffeurs
INSERT OR IGNORE INTO chauffeurs (nom, prenom, email, telephone, langue, video_completed, tasks_completed, statut) VALUES
  ('Dupont', 'Jean', 'jean.dupont@example.com', '+33612345678', 'fr', 1, '["task1","task2","task3","task4","task5"]', 'valide'),
  ('Vermeulen', 'Pieter', 'pieter.vermeulen@example.com', '+31612345678', 'nl', 1, '["task1","task2","task3"]', 'en_attente'),
  ('Korhonen', 'Mika', 'mika.korhonen@example.com', '+358401234567', 'fi', 1, '["task1","task2"]', 'en_attente'),
  ('Schmidt', 'Hans', 'hans.schmidt@example.com', '+49151234567', 'de', 1, '["task1","task2","task3","task4","task5"]', 'valide'),
  ('Rossi', 'Marco', 'marco.rossi@example.com', '+393331234567', 'it', 1, '["task1"]', 'refuse');

-- Logs de test
INSERT OR IGNORE INTO logs_inscriptions (chauffeur_id, action, details) VALUES
  (1, 'inscription', 'Inscription via QR code - Langue: FR'),
  (1, 'validation', 'Validé par RH le 2026-02-11'),
  (2, 'inscription', 'Inscription via QR code - Langue: NL'),
  (3, 'inscription', 'Inscription via QR code - Langue: FI'),
  (4, 'inscription', 'Inscription via QR code - Langue: DE'),
  (4, 'validation', 'Validé par RH le 2026-02-11'),
  (5, 'inscription', 'Inscription via QR code - Langue: IT'),
  (5, 'refus', 'Documents incomplets');

-- Statistiques de test
INSERT OR IGNORE INTO statistiques (date, langue, total_visites, total_videos_vues, total_inscriptions) VALUES
  ('2026-02-10', 'fr', 45, 38, 15),
  ('2026-02-10', 'nl', 22, 18, 8),
  ('2026-02-10', 'fi', 12, 10, 5),
  ('2026-02-10', 'de', 30, 25, 12),
  ('2026-02-10', 'it', 18, 15, 7),
  ('2026-02-11', 'fr', 12, 10, 3),
  ('2026-02-11', 'nl', 8, 7, 2),
  ('2026-02-11', 'fi', 5, 4, 1);
