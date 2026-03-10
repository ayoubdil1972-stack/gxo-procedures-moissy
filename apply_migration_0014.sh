#!/bin/bash
# ===================================================================
# Script d'application de la migration 0014_add_mise_a_quai_status.sql
# ===================================================================
# Ce script applique la migration en PRODUCTION uniquement
# Base de données: gxo-chauffeurs-db
# ===================================================================

set -e  # Arrêter en cas d'erreur

DB_NAME="gxo-chauffeurs-db"
REMOTE_FLAG="--remote"  # Utiliser la base de production

echo "🚀 Application de la migration 0014_add_mise_a_quai_status.sql"
echo "📦 Ajout du statut 'mise_a_quai_non_decharge' (marron)"
echo "🗄️  Base de données: $DB_NAME (PRODUCTION)"
echo ""

# Vérifier que wrangler est installé
if ! command -v npx &> /dev/null; then
    echo "❌ npx n'est pas installé"
    exit 1
fi

echo "📊 Étape 1: Backup de la table actuelle (optionnel)"
echo "   Exécution: SELECT * FROM quai_status LIMIT 5;"
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="SELECT * FROM quai_status LIMIT 5;" || true

echo ""
echo "🔧 Étape 2: Application de la migration (7 commandes)"
echo ""

# COMMANDE 1
echo "   1/7: DROP TABLE IF EXISTS quai_status_new..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="DROP TABLE IF EXISTS quai_status_new;"

# COMMANDE 2
echo "   2/7: CREATE TABLE quai_status_new..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="
CREATE TABLE quai_status_new (
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
  CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle','mise_a_quai_non_decharge'))
);
"

# COMMANDE 3
echo "   3/7: INSERT INTO quai_status_new..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="
INSERT INTO quai_status_new (
  id, quai_numero, statut, timer_start, timer_duration, 
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
)
SELECT 
  id, quai_numero, statut, timer_start, timer_duration,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;
"

# COMMANDE 4
echo "   4/7: DROP TABLE quai_status..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="DROP TABLE quai_status;"

# COMMANDE 5
echo "   5/7: ALTER TABLE quai_status_new RENAME TO quai_status..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="ALTER TABLE quai_status_new RENAME TO quai_status;"

# COMMANDE 6
echo "   6/7: CREATE UNIQUE INDEX idx_quai_numero..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);"

# COMMANDE 7
echo "   7/7: Vérification..."
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="SELECT COUNT(*) AS total_quais FROM quai_status;"

echo ""
echo "✅ Migration appliquée avec succès !"
echo ""
echo "📊 Vérification des statuts distincts:"
npx wrangler d1 execute "$DB_NAME" $REMOTE_FLAG --command="SELECT DISTINCT statut FROM quai_status;"

echo ""
echo "🎉 Le statut 'mise_a_quai_non_decharge' est maintenant disponible !"
echo "   Couleur: Marron (amber)"
echo "   Icône: 📦"
echo "   Commentaire: Obligatoire"
