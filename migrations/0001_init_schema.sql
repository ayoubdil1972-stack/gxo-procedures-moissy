-- Table des chauffeurs inscrits
CREATE TABLE IF NOT EXISTS chauffeurs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telephone TEXT,
  langue TEXT NOT NULL,
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
  video_completed BOOLEAN DEFAULT 1,
  tasks_completed TEXT, -- JSON: ["task1", "task2", ...]
  statut TEXT DEFAULT 'en_attente', -- en_attente, valide, refuse
  commentaire TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_chauffeurs_email ON chauffeurs(email);
CREATE INDEX IF NOT EXISTS idx_chauffeurs_statut ON chauffeurs(statut);
CREATE INDEX IF NOT EXISTS idx_chauffeurs_langue ON chauffeurs(langue);
CREATE INDEX IF NOT EXISTS idx_chauffeurs_date ON chauffeurs(date_inscription);

-- Table de logs pour traçabilité
CREATE TABLE IF NOT EXISTS logs_inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER,
  action TEXT NOT NULL, -- inscription, validation, refus, modification
  details TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeurs(id)
);

CREATE INDEX IF NOT EXISTS idx_logs_chauffeur ON logs_inscriptions(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_logs_action ON logs_inscriptions(action);

-- Table de statistiques
CREATE TABLE IF NOT EXISTS statistiques (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  langue TEXT NOT NULL,
  total_visites INTEGER DEFAULT 0,
  total_videos_vues INTEGER DEFAULT 0,
  total_inscriptions INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, langue)
);

CREATE INDEX IF NOT EXISTS idx_stats_date ON statistiques(date);
CREATE INDEX IF NOT EXISTS idx_stats_langue ON statistiques(langue);
