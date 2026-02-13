-- Migration 0008: Chat avec traduction et sessions chauffeurs
-- Date: 2026-02-13
-- Description: Création table chauffeur_sessions pour statut en ligne

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
