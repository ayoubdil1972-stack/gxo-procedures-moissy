-- Création de la table controleur_alertes pour le système d'alertes écart & non-conformité
-- Version : 3.5.16
-- Date : 2026-03-08

CREATE TABLE IF NOT EXISTS controleur_alertes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL,
  numero_id TEXT NOT NULL,
  fournisseur TEXT NOT NULL,
  heure_premier_scan TEXT,
  heure_fin_dechargement TEXT,
  ecart_palettes_attendues INTEGER,
  ecart_palettes_recues INTEGER,
  non_conformites TEXT,
  consignes TEXT,
  statut TEXT DEFAULT 'en_attente',
  traite_par TEXT,
  traite_le TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_alertes_statut ON controleur_alertes(statut);
CREATE INDEX IF NOT EXISTS idx_alertes_quai ON controleur_alertes(quai_numero);
CREATE INDEX IF NOT EXISTS idx_alertes_created ON controleur_alertes(created_at);

-- Vérification
SELECT 'Table controleur_alertes créée avec succès' AS message;
SELECT COUNT(*) AS total_alertes FROM controleur_alertes;
