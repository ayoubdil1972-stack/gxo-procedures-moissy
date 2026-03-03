-- Migration : Ajouter colonnes de traduction à chat_messages

-- Vérifier si la table existe
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL,
  sender TEXT NOT NULL DEFAULT 'chauffeur',
  message TEXT NOT NULL,
  original_lang TEXT DEFAULT 'fr',
  translated_fr TEXT,
  translated_chauffeur TEXT,
  read_by_admin INTEGER DEFAULT 0,
  read_by_chauffeur INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_chauffeur_id ON chat_messages(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
