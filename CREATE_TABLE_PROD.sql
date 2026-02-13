-- À exécuter dans la console Cloudflare D1
-- https://dash.cloudflare.com/...../d1

-- Créer la table chauffeur_sessions pour le statut en ligne/hors ligne
CREATE TABLE IF NOT EXISTS chauffeur_sessions (
  chauffeur_id INTEGER PRIMARY KEY,
  last_heartbeat DATETIME,
  is_online INTEGER DEFAULT 0,
  page_url TEXT,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_sessions_heartbeat ON chauffeur_sessions(last_heartbeat);
CREATE INDEX IF NOT EXISTS idx_sessions_online ON chauffeur_sessions(is_online);

-- Vérifier la création
SELECT name FROM sqlite_master WHERE type='table' AND name='chauffeur_sessions';
