-- ===================================================================
-- RESTAURATION COMPLÈTE DES 45 QUAIS GXO MOISSY
-- ===================================================================
-- Date: 2026-03-10
-- Ce script restaure tous les quais qui ont été supprimés
-- Compatible Cloudflare D1 (utilise CURRENT_TIMESTAMP)
-- ===================================================================

-- Quais Zone A (1-10)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(1, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone B (32-38)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(32, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(33, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(34, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(35, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(36, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(37, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(38, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone C (45-49)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(45, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(46, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(47, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(48, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(49, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone D (60-62)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(60, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(61, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(62, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone E (67-69)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(67, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(68, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(69, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone F (75-79)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(75, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(76, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(77, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(78, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(79, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone G (81-87)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(81, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(82, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(83, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(84, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(85, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(86, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(87, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Quais Zone H (99-103)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(99, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(100, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(101, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(102, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(103, 'disponible', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Vérification
SELECT COUNT(*) AS total_quais FROM quai_status;
SELECT quai_numero, statut FROM quai_status ORDER BY quai_numero;

-- ===================================================================
-- RÉSULTAT ATTENDU: total_quais = 45
-- TOUS LES QUAIS: Statut "disponible"
-- ===================================================================
