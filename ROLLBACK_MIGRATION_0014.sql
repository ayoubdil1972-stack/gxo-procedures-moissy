-- ===================================================================
-- ROLLBACK MIGRATION 0014 - Revenir à l'état précédent
-- ===================================================================
-- Date: 2026-03-10
-- Ce script annule la migration 0014 et restaure la contrainte CHECK
-- sans le statut 'mise_a_quai_non_decharge'
-- ===================================================================

-- ATTENTION: Ce script supprime temporairement tous les quais
-- Assurez-vous d'avoir un backup ou utilisez RESTORE_QUAIS.sql après

-- COMMANDE 1: Supprimer table temporaire si existe
DROP TABLE IF EXISTS quai_status_old;

-- COMMANDE 2: Créer l'ancienne table avec 6 statuts (SANS mise_a_quai_non_decharge)
CREATE TABLE quai_status_old (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible',
  timer_start TEXT,
  timer_duration INTEGER,
  timer_controle_start TEXT,
  timer_controle_duration INTEGER,
  controle_debut_timestamp TEXT,
  controle_fin_timestamp TEXT,
  controle_fournisseur TEXT,
  controle_id_chauffeur TEXT,
  controleur_nom TEXT,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle'))
);

-- COMMANDE 3: Copier les données (FILTRER mise_a_quai_non_decharge)
INSERT INTO quai_status_old (
  id, quai_numero, statut, timer_start, timer_duration, 
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
)
SELECT 
  id, quai_numero, 
  CASE 
    WHEN statut = 'mise_a_quai_non_decharge' THEN 'disponible'
    ELSE statut 
  END as statut,
  timer_start, timer_duration,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  CASE 
    WHEN statut = 'mise_a_quai_non_decharge' THEN 'Statut mise_a_quai_non_decharge converti en disponible'
    ELSE commentaire 
  END as commentaire,
  commentaire_auteur, created_at, updated_at
FROM quai_status
WHERE statut != 'mise_a_quai_non_decharge' OR statut IS NULL;

-- COMMANDE 4: Supprimer la nouvelle table
DROP TABLE quai_status;

-- COMMANDE 5: Renommer
ALTER TABLE quai_status_old RENAME TO quai_status;

-- COMMANDE 6: Recréer l'index
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);

-- COMMANDE 7: Vérifier
SELECT COUNT(*) AS total_quais FROM quai_status;
SELECT DISTINCT statut FROM quai_status;

-- ===================================================================
-- APRÈS CE ROLLBACK:
-- 1. Exécuter RESTORE_QUAIS.sql pour remettre les 45 quais
-- 2. Le statut 'mise_a_quai_non_decharge' n'est plus accepté
-- 3. Interface v3.8.0 continuera de fonctionner mais le bouton
--    "Mise à quai non déchargé" retournera une erreur
-- ===================================================================
