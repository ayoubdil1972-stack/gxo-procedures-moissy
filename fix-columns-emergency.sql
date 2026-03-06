-- Script de migration d'urgence pour ajouter les colonnes manquantes
-- Exécuter si l'erreur "no such column" persiste

-- Ajouter la colonne numero_id si elle n'existe pas
ALTER TABLE fin_dechargement ADD COLUMN numero_id TEXT;

-- Ajouter la colonne fournisseur si elle n'existe pas
ALTER TABLE fin_dechargement ADD COLUMN fournisseur TEXT;

-- Vérifier la structure de la table
PRAGMA table_info(fin_dechargement);
