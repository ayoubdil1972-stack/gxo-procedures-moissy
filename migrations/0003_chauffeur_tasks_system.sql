-- Migration 0003: Système de gestion des tâches chauffeurs
-- Créé le: 2026-02-11
-- Description: Tables pour gérer les tâches de déchargement et communication

-- Table des étapes de déchargement (template)
CREATE TABLE IF NOT EXISTS etapes_dechargement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ordre INTEGER NOT NULL,
  titre TEXT NOT NULL,
  description TEXT,
  icone TEXT DEFAULT '📦',
  duree_estimee INTEGER DEFAULT 5, -- en minutes
  obligatoire BOOLEAN DEFAULT 1,
  active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des arrivées chauffeurs (améliorée)
CREATE TABLE IF NOT EXISTS chauffeur_arrivals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pseudo TEXT NOT NULL,
  entreprise TEXT NOT NULL,
  numero_quai TEXT,
  langue TEXT NOT NULL,
  video_completed BOOLEAN DEFAULT 0,
  
  -- Statut global
  status TEXT DEFAULT 'in_progress', -- in_progress, completed, cancelled
  arrival_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  completion_time DATETIME,
  
  -- Tâches de déchargement
  task_epi_porte BOOLEAN DEFAULT 0,
  task_epi_porte_time DATETIME,
  
  task_placement_quai BOOLEAN DEFAULT 0,
  task_placement_quai_time DATETIME,
  
  task_palette_change BOOLEAN DEFAULT 0,
  task_palette_change_time DATETIME,
  
  task_accueil_notifie BOOLEAN DEFAULT 0,
  task_accueil_notifie_time DATETIME,
  
  task_clefs_remises BOOLEAN DEFAULT 0,
  task_clefs_remises_time DATETIME,
  
  -- Progression
  progression_percent INTEGER DEFAULT 0,
  
  -- Métadonnées
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages de chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL,
  sender TEXT NOT NULL, -- 'chauffeur' ou 'admin'
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- text, voice, file
  read_by_admin BOOLEAN DEFAULT 0,
  read_by_chauffeur BOOLEAN DEFAULT 0,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Table des notifications temps réel
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER,
  type TEXT NOT NULL, -- arrival, task_complete, message, alert
  titre TEXT NOT NULL,
  message TEXT,
  priority TEXT DEFAULT 'normal', -- low, normal, high, urgent
  read BOOLEAN DEFAULT 0,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Insérer les étapes de déchargement par défaut
INSERT INTO etapes_dechargement (ordre, titre, description, icone, duree_estimee, obligatoire) VALUES
(1, 'EPI Porté', 'Vérifier que vous portez tous vos Équipements de Protection Individuelle (casque, gilet, chaussures de sécurité)', '🦺', 2, 1),
(2, 'Placement au Quai', 'Garer le camion au quai indiqué et mettre les cales', '🚚', 5, 1),
(3, 'Échange Palettes', 'Compter et échanger les palettes européennes', '📦', 10, 1),
(4, 'Accueil Notifié', 'Signaler votre présence à l''accueil', '🔔', 3, 1),
(5, 'Remise Clés', 'Remettre les clés du camion à l''agent de quai', '🔑', 2, 1);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_chauffeur_arrivals_status ON chauffeur_arrivals(status);
CREATE INDEX IF NOT EXISTS idx_chauffeur_arrivals_arrival ON chauffeur_arrivals(arrival_time);
CREATE INDEX IF NOT EXISTS idx_chat_chauffeur ON chat_messages(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_chat_timestamp ON chat_messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_chauffeur ON notifications(chauffeur_id);
