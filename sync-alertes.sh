#!/bin/bash

# =====================================================
# SCRIPT: Synchronisation Alertes Manquantes
# =====================================================
# Ce script exécute le SQL de synchronisation pour créer
# les alertes manquantes en base de données production
# =====================================================

echo "🔄 SYNCHRONISATION ALERTES MANQUANTES"
echo "======================================"
echo ""

# Configuration
export CLOUDFLARE_API_TOKEN="2m4kSUXP50aWw8dN3rrfFoW-MmBCawua-UrlmxVo"
export CLOUDFLARE_ACCOUNT_ID="8b193b1c61a45eb50fb2dab89cf8bfe5"
DB_NAME="gxo-chauffeurs-db"

echo "📊 Étape 1: Analyse des déchargements sans alerte..."
echo ""

npx wrangler d1 execute $DB_NAME --remote --command="
SELECT 
  fd.id,
  fd.quai_numero,
  fd.palettes_attendues,
  fd.palettes_recues,
  substr(fd.problemes, 1, 50) as problemes,
  fd.timestamp
FROM fin_dechargement fd
LEFT JOIN controleur_alertes ca ON (
  ca.quai_numero = fd.quai_numero 
  AND ca.created_at >= datetime(fd.timestamp, '-5 minutes')
  AND ca.created_at <= datetime(fd.timestamp, '+5 minutes')
)
WHERE ca.id IS NULL
  AND (
    fd.palettes_attendues != fd.palettes_recues
    OR (fd.problemes != '[]' AND fd.problemes IS NOT NULL)
  )
ORDER BY fd.timestamp DESC
LIMIT 10;
"

echo ""
echo "🔧 Étape 2: Création des alertes manquantes..."
echo ""

npx wrangler d1 execute $DB_NAME --remote --command="
INSERT INTO controleur_alertes (
  quai_numero,
  numero_id,
  fournisseur,
  heure_premier_scan,
  heure_fin_dechargement,
  duree_dechargement_secondes,
  ecart_palettes_attendues,
  ecart_palettes_recues,
  non_conformites,
  verification_points,
  statut,
  traite_le,
  created_at
)
SELECT 
  fd.quai_numero,
  COALESCE(json_extract(fd.remarques, '$.numero_id'), 'INCONNU') as numero_id,
  COALESCE(json_extract(fd.remarques, '$.fournisseur'), 'INCONNU') as fournisseur,
  NULL as heure_premier_scan,
  fd.timestamp as heure_fin_dechargement,
  0 as duree_dechargement_secondes,
  fd.palettes_attendues as ecart_palettes_attendues,
  fd.palettes_recues as ecart_palettes_recues,
  fd.problemes as non_conformites,
  '{}' as verification_points,
  'en_attente' as statut,
  datetime('now', 'localtime') as traite_le,
  datetime('now', 'localtime') as created_at
FROM fin_dechargement fd
LEFT JOIN controleur_alertes ca ON (
  ca.quai_numero = fd.quai_numero 
  AND ca.created_at >= datetime(fd.timestamp, '-5 minutes')
  AND ca.created_at <= datetime(fd.timestamp, '+5 minutes')
)
WHERE ca.id IS NULL
  AND (
    fd.palettes_attendues != fd.palettes_recues
    OR (fd.problemes != '[]' AND fd.problemes IS NOT NULL)
  );
"

echo ""
echo "✅ Étape 3: Vérification des alertes créées..."
echo ""

npx wrangler d1 execute $DB_NAME --remote --command="
SELECT 
  ca.id,
  ca.quai_numero,
  ca.numero_id,
  ca.fournisseur,
  ca.ecart_palettes_attendues,
  ca.ecart_palettes_recues,
  substr(ca.non_conformites, 1, 30) as problemes,
  ca.statut
FROM controleur_alertes ca
WHERE ca.created_at >= datetime('now', '-2 minutes')
ORDER BY ca.created_at DESC;
"

echo ""
echo "📊 Étape 4: Statistiques globales..."
echo ""

npx wrangler d1 execute $DB_NAME --remote --command="
SELECT 'ALERTES EN ATTENTE' as type, COUNT(*) as nombre FROM controleur_alertes WHERE statut = 'en_attente'
UNION ALL
SELECT 'ALERTES TRAITÉES' as type, COUNT(*) as nombre FROM controleur_alertes WHERE statut = 'traitee'
UNION ALL
SELECT 'TOTAL ALERTES' as type, COUNT(*) as nombre FROM controleur_alertes;
"

echo ""
echo "✅ SYNCHRONISATION TERMINÉE"
echo "======================================"
echo ""
echo "🌐 Vérifiez maintenant la page contrôleur:"
echo "   https://gxomoissyprocedures.pages.dev/controleur?v=2"
echo ""
