-- Ajouter les champs de traduction au chat
ALTER TABLE chat_messages ADD COLUMN original_lang TEXT DEFAULT 'fr';
ALTER TABLE chat_messages ADD COLUMN translated_fr TEXT;
ALTER TABLE chat_messages ADD COLUMN translated_chauffeur TEXT;

-- Le champ original_lang stocke la langue du message original
-- translated_fr stocke la traduction en français (pour l'admin)
-- translated_chauffeur stocke la traduction dans la langue du chauffeur
