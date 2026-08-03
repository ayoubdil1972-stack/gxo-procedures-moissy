-- Migration 0019: Système d'authentification des utilisateurs
-- Date: 2026-06-02
-- Description: Ajout de la table users pour l'authentification des utilisateurs GXO

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- Mot de passe en clair (simple pour démo)
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- user, chef, admin
  statut TEXT NOT NULL DEFAULT 'actif', -- actif, inactif
  dernier_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index sur l'email pour la recherche rapide
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insertion des 5 utilisateurs GXO avec mots de passe simples et mémorisables
-- Format du mot de passe: GXO + initiales + 2026
-- Exemple: Sonia Cornette → GXOsc2026

INSERT INTO users (email, password, nom, prenom, role, statut) VALUES
  ('sonia.cornette@gxo.com', 'GXOsc2026', 'Cornette', 'Sonia', 'chef', 'actif'),
  ('rocky.gussie@gxo.com', 'GXOrg2026', 'Gussie', 'Rocky', 'user', 'actif'),
  ('marius.dumitru@gxo.com', 'GXOmd2026', 'Dumitru', 'Marius', 'user', 'actif'),
  ('hassan.mounaim@gxo.com', 'GXOhm2026', 'Mounaim', 'Hassan', 'user', 'actif'),
  ('gabriel.nguidjol@gxo.com', 'GXOgn2026', 'Nguidjol', 'Gabriel', 'user', 'actif');

-- Table des sessions (optionnel pour gestion des sessions)
CREATE TABLE IF NOT EXISTS user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
