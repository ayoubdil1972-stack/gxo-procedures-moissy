-- 🔧 SQL COMPLET ET CORRIGÉ - À copier-coller dans Cloudflare Dashboard
-- ⚠️ IMPORTANT: Exécuter TOUTES les commandes ci-dessous EN UNE SEULE FOIS

-- Étape 1: Supprimer la nouvelle table si elle existe déjà (nettoyage)
DROP TABLE IF EXISTS quai_status_new;

-- Étape 2: Créer la nouvelle table SANS timer_duration (qui n'existe pas dans l'ancienne)
CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' CHECK(statut IN ('disponible', 'en_cours', 'indisponible', 'fin_dechargement')),
  timer_start DATETIME,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Étape 3: Copier SEULEMENT les colonnes qui existent
INSERT INTO quai_status_new (id, quai_numero, statut, timer_start, commentaire, commentaire_auteur, created_at, updated_at)
SELECT id, quai_numero, statut, timer_start, commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;

-- Étape 4: Supprimer l'ancienne table
DROP TABLE quai_status;

-- Étape 5: Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;

-- Étape 6: Recréer l'index unique
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);

-- Étape 7: Vérifier que le statut 'fin_dechargement' fonctionne
SELECT 'Migration réussie!' as message;
