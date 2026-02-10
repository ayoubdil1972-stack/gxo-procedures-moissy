-- Table pour les arrivées de chauffeurs
CREATE TABLE IF NOT EXISTS chauffeur_arrivals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pseudo TEXT NOT NULL,
  entreprise TEXT NOT NULL,
  numero_quai TEXT NOT NULL,
  langue TEXT NOT NULL,
  video_completed BOOLEAN DEFAULT 0,
  arrival_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'in_progress',
  
  -- Tâches de validation
  task_epi_porte BOOLEAN DEFAULT 0,
  task_placement_quai BOOLEAN DEFAULT 0,
  task_palette_change BOOLEAN DEFAULT 0,
  task_accueil_notifie BOOLEAN DEFAULT 0,
  task_clefs_remises BOOLEAN DEFAULT 0,
  
  -- Timestamps des tâches
  task_epi_time DATETIME,
  task_placement_time DATETIME,
  task_palette_time DATETIME,
  task_accueil_time DATETIME,
  task_clefs_time DATETIME,
  
  -- Statut final
  completed BOOLEAN DEFAULT 0,
  completion_time DATETIME
);

-- Table pour le chat en temps réel
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL,
  sender TEXT NOT NULL, -- 'chauffeur' ou 'admin'
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT 0,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_chauffeur_status ON chauffeur_arrivals(status);
CREATE INDEX IF NOT EXISTS idx_chauffeur_arrival ON chauffeur_arrivals(arrival_time);
CREATE INDEX IF NOT EXISTS idx_chat_chauffeur ON chat_messages(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_chat_timestamp ON chat_messages(timestamp);
