-- =====================================================
-- SCRIPT SQL: SYNCHRONISATION ALERTES MANQUANTES
-- =====================================================
-- Ce script crée les alertes manquantes pour tous les 
-- déchargements qui ont des écarts ou problèmes mais 
-- n'ont pas d'alerte correspondante dans controleur_alertes
-- =====================================================

-- Étape 1: Afficher les déchargements avec écarts/problèmes SANS alerte
SELECT 
  fd.id,
  fd.quai_numero,
  fd.palettes_attendues,
  fd.palettes_recues,
  fd.problemes,
  fd.timestamp,
  'MANQUANT: Écart ou problème détecté mais pas d\'alerte' as statut
FROM fin_dechargement fd
LEFT JOIN controleur_alertes ca ON (
  ca.quai_numero = fd.quai_numero 
  AND ca.created_at >= datetime(fd.timestamp, '-5 minutes')
  AND ca.created_at <= datetime(fd.timestamp, '+5 minutes')
)
WHERE ca.id IS NULL
  AND (
    fd.palettes_attendues != fd.palettes_recues  -- Écart palettes
    OR fd.problemes != '[]'                        -- Problèmes cochés
    OR fd.problemes IS NOT NULL
  )
ORDER BY fd.timestamp DESC;

-- =====================================================
-- Étape 2: CRÉER LES ALERTES MANQUANTES
-- =====================================================
-- Cette requête crée automatiquement les alertes pour
-- tous les déchargements avec écarts/problèmes
-- =====================================================

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
  -- Extraire numero_id depuis le JSON remarques
  COALESCE(
    json_extract(fd.remarques, '$.numero_id'),
    'INCONNU'
  ) as numero_id,
  -- Extraire fournisseur depuis le JSON remarques
  COALESCE(
    json_extract(fd.remarques, '$.fournisseur'),
    'INCONNU'
  ) as fournisseur,
  NULL as heure_premier_scan,  -- Pas d'info disponible
  fd.timestamp as heure_fin_dechargement,
  0 as duree_dechargement_secondes,  -- Pas d'info disponible
  fd.palettes_attendues as ecart_palettes_attendues,
  fd.palettes_recues as ecart_palettes_recues,
  fd.problemes as non_conformites,
  '{}' as verification_points,  -- Pas d'info disponible dans anciens enregistrements
  'en_attente' as statut,  -- Toutes les alertes manquantes sont en attente
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
    fd.palettes_attendues != fd.palettes_recues  -- Écart palettes
    OR (fd.problemes != '[]' AND fd.problemes IS NOT NULL)  -- Problèmes cochés
  );

-- =====================================================
-- Étape 3: VÉRIFIER LES ALERTES CRÉÉES
-- =====================================================

SELECT 
  ca.id,
  ca.quai_numero,
  ca.numero_id,
  ca.fournisseur,
  ca.ecart_palettes_attendues,
  ca.ecart_palettes_recues,
  ca.non_conformites,
  ca.statut,
  ca.created_at,
  'NOUVELLE ALERTE' as note
FROM controleur_alertes ca
WHERE ca.created_at >= datetime('now', '-1 minute')
ORDER BY ca.created_at DESC;

-- =====================================================
-- RÉSUMÉ STATISTIQUES
-- =====================================================

-- Total déchargements
SELECT 
  'TOTAL DÉCHARGEMENTS' as type,
  COUNT(*) as nombre
FROM fin_dechargement;

-- Total alertes
SELECT 
  'TOTAL ALERTES' as type,
  COUNT(*) as nombre
FROM controleur_alertes;

-- Alertes en attente
SELECT 
  'ALERTES EN ATTENTE' as type,
  COUNT(*) as nombre
FROM controleur_alertes
WHERE statut = 'en_attente';

-- Alertes traitées
SELECT 
  'ALERTES TRAITÉES' as type,
  COUNT(*) as nombre
FROM controleur_alertes
WHERE statut = 'traitee';
