#!/bin/bash

echo "🗄️  Configuration Base de Données D1"
echo "===================================="
echo ""

echo "📝 Étape 1: Créer la base de données"
echo "Exécutez cette commande:"
echo ""
echo "  wrangler d1 create gxo-chauffeurs-db"
echo ""
echo "Puis copiez le 'database_id' dans wrangler.jsonc"
echo ""

echo "📝 Étape 2: Appliquer les migrations (LOCAL)"
echo "  wrangler d1 migrations apply gxo-chauffeurs-db --local"
echo ""

echo "📝 Étape 3: Insérer les données de test (LOCAL)"
echo "  wrangler d1 execute gxo-chauffeurs-db --local --file=./seed.sql"
echo ""

echo "📝 Étape 4: Vérifier les données (LOCAL)"
echo "  wrangler d1 execute gxo-chauffeurs-db --local --command=\"SELECT * FROM chauffeurs\""
echo ""

echo "📝 Étape 5: Appliquer en PRODUCTION (après tests)"
echo "  wrangler d1 migrations apply gxo-chauffeurs-db"
echo ""

echo "✅ Script terminé. Suivez les étapes ci-dessus."
