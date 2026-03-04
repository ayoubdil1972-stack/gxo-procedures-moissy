-- Nettoyer les timer_start numériques obsolètes
-- Réinitialiser tous les quais en mode "disponible" avec timer_start NULL

UPDATE quai_status 
SET statut = 'disponible', 
    timer_start = NULL, 
    commentaire = NULL, 
    commentaire_auteur = NULL,
    updated_at = datetime('now')
WHERE 1=1;

-- Vérifier les 5 premiers quais après nettoyage
SELECT quai_numero, statut, timer_start, updated_at 
FROM quai_status 
ORDER BY quai_numero ASC 
LIMIT 5;
