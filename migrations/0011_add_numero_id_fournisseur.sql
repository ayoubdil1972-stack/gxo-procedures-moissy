-- Migration 0011: Ajouter les colonnes numero_id et fournisseur à fin_dechargement
-- Date: 2026-03-06

-- Créer la table si elle n'existe pas avec toutes les colonnes
CREATE TABLE IF NOT EXISTS fin_dechargement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL,
  nom_agent TEXT NOT NULL,
  numero_id TEXT,
  fournisseur TEXT,
  palettes_attendues INTEGER NOT NULL,
  palettes_recues INTEGER NOT NULL,
  palettes_a_rendre TEXT NOT NULL,
  problemes TEXT,
  autres_commentaire TEXT,
  remarques TEXT,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
