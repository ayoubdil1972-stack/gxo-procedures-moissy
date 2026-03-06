-- SQL SIMPLE ET TESTÉ - Un seul bloc à copier-coller

-- Supprimer la contrainte CHECK actuelle et la recréer
PRAGMA writable_schema = 1;

UPDATE sqlite_master 
SET sql = REPLACE(sql, 
  "CHECK(statut IN ('disponible', 'en_cours', 'indisponible'))",
  "CHECK(statut IN ('disponible', 'en_cours', 'indisponible', 'fin_dechargement'))"
)
WHERE name = 'quai_status' AND type = 'table';

PRAGMA writable_schema = 0;

-- Forcer la vérification de l'intégrité
PRAGMA integrity_check;

-- Test: mettre le quai 75 en fin_dechargement
UPDATE quai_status 
SET statut = 'fin_dechargement',
    commentaire = 'Migration réussie - Test'
WHERE quai_numero = 75;

-- Afficher le résultat
SELECT 'Migration réussie!' as status, quai_numero, statut, commentaire 
FROM quai_status 
WHERE quai_numero = 75;
