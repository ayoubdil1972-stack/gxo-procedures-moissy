-- Table pour tracker les sessions actives et la présence en ligne des chauffeurs
CREATE TABLE IF NOT EXISTS chauffeur_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL UNIQUE,
  last_heartbeat DATETIME NOT NULL,
  is_online INTEGER DEFAULT 1,
  page_url TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Index pour accélérer les requêtes
CREATE INDEX IF NOT EXISTS idx_sessions_chauffeur ON chauffeur_sessions(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_sessions_heartbeat ON chauffeur_sessions(last_heartbeat);
CREATE INDEX IF NOT EXISTS idx_sessions_online ON chauffeur_sessions(is_online);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER IF NOT EXISTS update_sessions_timestamp 
AFTER UPDATE ON chauffeur_sessions
BEGIN
  UPDATE chauffeur_sessions SET updated_at = datetime('now') WHERE id = NEW.id;
END;
