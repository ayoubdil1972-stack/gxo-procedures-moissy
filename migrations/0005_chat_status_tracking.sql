-- Ajout du système de suivi de statut des messages (style WhatsApp)
-- Cette migration ajoute les colonnes pour tracker : envoyé, livré, lu, horodatage

-- Ajouter la colonne delivered_at pour tracker quand le message a été livré/reçu
ALTER TABLE chat_messages ADD COLUMN delivered_at DATETIME;

-- Ajouter la colonne read_at pour tracker quand le message a été lu (avec horodatage précis)
ALTER TABLE chat_messages ADD COLUMN read_at DATETIME;

-- Ajouter la colonne sender_online pour tracker si l'expéditeur était en ligne à l'envoi
ALTER TABLE chat_messages ADD COLUMN sender_online INTEGER DEFAULT 1;

-- Ajouter les colonnes read_by_admin et read_by_chauffeur pour compatibilité avec le code existant
ALTER TABLE chat_messages ADD COLUMN read_by_admin INTEGER DEFAULT 0;
ALTER TABLE chat_messages ADD COLUMN read_by_chauffeur INTEGER DEFAULT 0;

-- Mettre à jour read_at pour les messages déjà marqués comme lus (colonne read existante)
UPDATE chat_messages 
SET read_at = datetime('now'),
    read_by_admin = CASE WHEN sender = 'chauffeur' THEN read ELSE 0 END,
    read_by_chauffeur = CASE WHEN sender = 'admin' THEN read ELSE 0 END
WHERE read = 1;

-- Mettre à jour delivered_at pour tous les messages existants (considérés comme livrés)
UPDATE chat_messages 
SET delivered_at = timestamp 
WHERE delivered_at IS NULL;

