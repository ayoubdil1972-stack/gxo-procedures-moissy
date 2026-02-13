-- Migration 0007: Nouveau workflow chauffeur (inscription -> tâches -> support)

-- Table chauffeurs_v2 (nouveau système simplifié)
CREATE TABLE IF NOT EXISTS chauffeurs_v2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  entreprise TEXT NOT NULL,
  telephone TEXT NOT NULL,
  plaque TEXT NOT NULL,
  type_camion TEXT NOT NULL,
  langue TEXT NOT NULL DEFAULT 'fr',
  statut TEXT NOT NULL DEFAULT 'actif', -- actif, parti, suspendu
  date_arrivee DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_depart DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table taches_v2
CREATE TABLE IF NOT EXISTS taches_v2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- chargement, dechargement
  quai TEXT NOT NULL,
  porte TEXT,
  statut TEXT NOT NULL DEFAULT 'en_cours', -- attente, en_cours, termine
  heure_debut DATETIME DEFAULT CURRENT_TIMESTAMP,
  heure_fin DATETIME,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeurs_v2(id) ON DELETE CASCADE
);

-- Table messages_v2 (support chauffeur <-> admin)
CREATE TABLE IF NOT EXISTS messages_v2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL,
  expediteur TEXT NOT NULL, -- chauffeur, admin
  message TEXT NOT NULL,
  date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,
  vu INTEGER DEFAULT 0, -- 0 = non vu, 1 = vu
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeurs_v2(id) ON DELETE CASCADE
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_chauffeurs_v2_statut ON chauffeurs_v2(statut);
CREATE INDEX IF NOT EXISTS idx_chauffeurs_v2_date_arrivee ON chauffeurs_v2(date_arrivee);
CREATE INDEX IF NOT EXISTS idx_taches_v2_chauffeur ON taches_v2(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_taches_v2_statut ON taches_v2(statut);
CREATE INDEX IF NOT EXISTS idx_messages_v2_chauffeur ON messages_v2(chauffeur_id);
CREATE INDEX IF NOT EXISTS idx_messages_v2_vu ON messages_v2(vu);
CREATE INDEX IF NOT EXISTS idx_messages_v2_expediteur ON messages_v2(expediteur);
