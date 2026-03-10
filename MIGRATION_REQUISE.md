# 🚨 ACTION REQUISE : Migration Manuelle D1

## Problème Rencontré
Erreur lors de l'utilisation du statut "mise_a_quai_non_decharge" :
```
CHECK constraint failed: statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle')
```

## Solution
La contrainte CHECK de la table `quai_status` doit être mise à jour pour inclure le nouveau statut.

## ⚠️ Instructions pour Appliquer la Migration

### Étape 1 : Ouvrir le Dashboard Cloudflare
1. Se connecter à https://dash.cloudflare.com
2. Aller dans **Workers & Pages**
3. Cliquer sur **D1**
4. Sélectionner la base de données **gxo-chauffeurs-db**
5. Cliquer sur **Console**

### Étape 2 : Exécuter les Commandes SQL

**⚠️ IMPORTANT : Exécuter les commandes UNE PAR UNE dans l'ordre**

#### Commande 1 : Supprimer la table temporaire
```sql
DROP TABLE IF EXISTS quai_status_new;
```

#### Commande 2 : Créer la nouvelle table avec le nouveau statut
```sql
CREATE TABLE quai_status_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible',
  timer_start TEXT,
  timer_duration INTEGER,
  timer_controle_start TEXT,
  timer_controle_duration INTEGER,
  controle_debut_timestamp TEXT,
  controle_fin_timestamp TEXT,
  controle_fournisseur TEXT,
  controle_id_chauffeur TEXT,
  controleur_nom TEXT,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle','mise_a_quai_non_decharge'))
);
```

#### Commande 3 : Copier toutes les données existantes
```sql
INSERT INTO quai_status_new (
  id, quai_numero, statut, timer_start, timer_duration, 
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
)
SELECT 
  id, quai_numero, statut, timer_start, timer_duration,
  timer_controle_start, timer_controle_duration,
  controle_debut_timestamp, controle_fin_timestamp,
  controle_fournisseur, controle_id_chauffeur, controleur_nom,
  commentaire, commentaire_auteur, created_at, updated_at
FROM quai_status;
```

#### Commande 4 : Supprimer l'ancienne table
```sql
DROP TABLE quai_status;
```

#### Commande 5 : Renommer la nouvelle table
```sql
ALTER TABLE quai_status_new RENAME TO quai_status;
```

#### Commande 6 : Recréer l'index unique
```sql
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);
```

#### Commande 7 : Vérifier le résultat
```sql
SELECT COUNT(*) AS total_quais FROM quai_status;
```
**Résultat attendu** : `total_quais = 45`

#### Commande 8 : Vérifier les statuts disponibles
```sql
SELECT DISTINCT statut FROM quai_status;
```

### Étape 3 : Test
Après la migration, tester en allant sur :
- https://dc5b90eb.gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
- Cliquer sur un quai
- Sélectionner "Mise à quai non déchargé" (marron 📦)
- Remplir le commentaire
- ✅ Le statut devrait s'appliquer sans erreur

## 🎨 Nouveau Statut Ajouté
- **Nom** : `mise_a_quai_non_decharge`
- **Couleur** : Marron (amber)
- **Icône** : 📦
- **Commentaire** : Obligatoire
- **Usage** : Camion stationné mais pas encore déchargé

## 📋 Fichiers Créés
- `/home/user/webapp/migrations/0014_add_mise_a_quai_status.sql` - Migration SQL complète
- `/home/user/webapp/apply_migration_0014.sh` - Script automatisé (nécessite permissions D1)

## ⚠️ Note sur l'Automation
Le token Cloudflare actuel n'a pas les permissions D1 nécessaires pour exécuter le script automatisé. 
La migration doit donc être appliquée manuellement via le Dashboard Cloudflare.

---

**Version** : 3.8.1  
**Date** : 2026-03-10  
**Commit** : 293487b
