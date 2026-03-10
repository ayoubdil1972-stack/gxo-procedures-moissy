# 🚨 GUIDE DE RESTAURATION DES QUAIS

## Situation
La migration SQL a supprimé tous les quais lors de la commande `DROP TABLE quai_status`.

## ✅ SOLUTION RAPIDE - Restaurer les 45 Quais

### Étape 1 : Ouvrir le Dashboard Cloudflare
1. Aller sur https://dash.cloudflare.com
2. Cliquer sur **Workers & Pages**
3. Cliquer sur **D1**
4. Sélectionner **gxo-chauffeurs-db**
5. Cliquer sur **Console**

### Étape 2 : Vérifier l'état actuel
```sql
SELECT COUNT(*) AS total FROM quai_status;
```
**Si résultat = 0** → Tous les quais ont été supprimés, continuez

### Étape 3 : Restaurer TOUS les 45 quais

**⚠️ IMPORTANT : Copier-coller TOUT LE BLOC suivant d'un coup dans la console**

```sql
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
```

### Étape 4 : Vérifier la restauration
```sql
SELECT COUNT(*) AS total_quais FROM quai_status;
```
**Résultat attendu** : `total_quais = 45`

```sql
SELECT quai_numero, statut FROM quai_status ORDER BY quai_numero;
```
**Résultat attendu** : Liste des 45 quais tous en statut "disponible"

### Étape 5 : Vérifier l'interface
1. Aller sur https://dc5b90eb.gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
2. ✅ Les 45 quais doivent apparaître en vert
3. ✅ Le modal de gestion fonctionne (3 options : Disponible, Mise à quai non déchargé, Indisponible)

---

## 📋 LISTE DES 45 QUAIS GXO MOISSY

| Zone | Quais | Total |
|------|-------|-------|
| **A** | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 | 10 |
| **B** | 32, 33, 34, 35, 36, 37, 38 | 7 |
| **C** | 45, 46, 47, 48, 49 | 5 |
| **D** | 60, 61, 62 | 3 |
| **E** | 67, 68, 69 | 3 |
| **F** | 75, 76, 77, 78, 79 | 5 |
| **G** | 81, 82, 83, 84, 85, 86, 87 | 7 |
| **H** | 99, 100, 101, 102, 103 | 5 |
| **TOTAL** | | **45** |

---

## 🔧 MODAL DE GESTION - État Actuel

Le modal de gestion (v3.8.0) affiche **3 options** :

1. **✅ Disponible** (vert)
   - Pas de commentaire requis
   - Quai prêt pour chargement

2. **📦 Mise à quai non déchargé** (marron)
   - **Commentaire obligatoire**
   - Pour camions stationnés mais pas encore déchargés
   - ⚠️ **NE FONCTIONNE PAS** tant que migration 0014 n'est pas appliquée

3. **🚫 Indisponible** (rouge)
   - **Commentaire obligatoire**
   - Pour signaler un problème

**Statuts gérés par QR codes** (pas dans le modal) :
- ⏱️ En cours (jaune)
- 📋 Fin de déchargement (bleu)

**Statuts automatiques** (pas dans le modal) :
- 🔍 En contrôle (orange)
- 📝 Fin de contrôle (violet)

---

## ⚠️ POUR ACTIVER "MISE À QUAI NON DÉCHARGÉ"

Le bouton existe dans le modal MAIS ne fonctionne pas encore.

**Pour l'activer** :
1. Exécuter la migration 0014 (voir `MIGRATION_REQUISE.md`)
2. OU Attendre que l'utilisateur ait les permissions D1

**Fichiers disponibles** :
- `migrations/0014_add_mise_a_quai_status.sql` - Migration complète
- `MIGRATION_REQUISE.md` - Instructions détaillées
- `RESTORE_QUAIS.sql` - Ce fichier (restauration quais)
- `ROLLBACK_MIGRATION_0014.sql` - Annuler la migration si nécessaire

---

## 📞 SUPPORT

**Après restauration** :
- ✅ 45 quais fonctionnels
- ✅ Statuts Disponible et Indisponible fonctionnent
- ⚠️ Statut "Mise à quai non déchargé" nécessite migration 0014

**Si problème** :
- Vérifier le nombre de quais : `SELECT COUNT(*) FROM quai_status;`
- Lister tous les quais : `SELECT * FROM quai_status ORDER BY quai_numero;`
- Vérifier les statuts : `SELECT DISTINCT statut FROM quai_status;`
