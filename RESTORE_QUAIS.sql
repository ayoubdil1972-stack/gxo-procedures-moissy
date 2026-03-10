-- ===================================================================
-- RESTAURATION COMPLÈTE DES 45 QUAIS GXO MOISSY
-- ===================================================================
-- Date: 2026-03-10
-- Ce script restaure tous les quais qui ont été supprimés
-- ===================================================================

-- Quais Zone A (1-10)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(1, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(2, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(3, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(4, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(5, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(6, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(7, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(8, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(9, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(10, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone B (32-38)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(32, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(33, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(34, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(35, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(36, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(37, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(38, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone C (45-49)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(45, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(46, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(47, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(48, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(49, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone D (60-62)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(60, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(61, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(62, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone E (67-69)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(67, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(68, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(69, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone F (75-79)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(75, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(76, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(77, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(78, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(79, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone G (81-87)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(81, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(82, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(83, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(84, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(85, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(86, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(87, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Quais Zone H (99-103)
INSERT OR REPLACE INTO quai_status (quai_numero, statut, created_at, updated_at) VALUES
(99, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(100, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(101, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(102, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime')),
(103, 'disponible', datetime('now', 'localtime'), datetime('now', 'localtime'));

-- Vérification
SELECT COUNT(*) AS total_quais FROM quai_status;
SELECT quai_numero, statut FROM quai_status ORDER BY quai_numero;

-- ===================================================================
-- RÉSULTAT ATTENDU: total_quais = 45
-- TOUS LES QUAIS: Statut "disponible"
-- ===================================================================
