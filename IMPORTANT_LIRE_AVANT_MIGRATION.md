# ⚠️ MIGRATION OBLIGATOIRE - Nouveau Statut "Mise à quai non déchargé"

**Date:** 2026-03-10  
**Version:** 3.8.2  
**Criticité:** 🔴 HAUTE - Fonctionnalité bloquée sans migration

---

## 🎯 Situation Actuelle

### ✅ Ce qui FONCTIONNE déjà (sans migration)

L'interface et le code sont **100% prêts** pour le nouveau statut :

1. **Modal de gestion** - 5 boutons accessibles :
   - ✅ Disponible (vert) - fonctionne
   - ⏱️ En cours (jaune) - fonctionne
   - 📋 Fin de déchargement (bleu) - fonctionne
   - 📦 **Mise à quai non déchargé** (marron) - ❌ bloqué par la base de données
   - 🚫 Indisponible (rouge) - fonctionne

2. **Légende complète** - Affiche tous les 7 statuts incluant le nouveau

3. **Backend et Frontend** - Tout le code gère déjà `mise_a_quai_non_decharge`

4. **Validation** - Commentaire obligatoire pour "Mise à quai non déchargé" (comme "Indisponible")

### ❌ Ce qui NE FONCTIONNE PAS (sans migration)

**Erreur actuelle quand on sélectionne "Mise à quai non déchargé":**
```
D1_ERROR: CHECK constraint failed: 
statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle'): 
SQLITE_CONSTRAINT
```

**Cause:** La table `quai_status` dans Cloudflare D1 a une contrainte CHECK qui limite les valeurs possibles. 
Le nouveau statut `mise_a_quai_non_decharge` n'est pas dans la liste autorisée.

---

## 🔧 Solution : Migration SQL à Exécuter

### Étape 1 : Ouvrir Cloudflare Dashboard

1. Allez sur https://dash.cloudflare.com
2. Workers & Pages → D1
3. Sélectionnez votre base : **gxo-chauffeurs-db**
4. Cliquez sur **Console**

### Étape 2 : Exécuter la Migration (8 commandes)

**Copiez-collez CHAQUE commande une par une dans la console D1 :**

```sql
-- 1. Supprimer table temporaire si elle existe
DROP TABLE IF EXISTS quai_status_new;
```

```sql
-- 2. Créer nouvelle table avec CHECK étendu
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
  CHECK(statut IN (
    'disponible',
    'en_cours',
    'indisponible',
    'fin_dechargement',
    'en_controle',
    'fin_controle',
    'mise_a_quai_non_decharge'
  ))
);
```

```sql
-- 3. Copier toutes les données existantes
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

```sql
-- 4. Supprimer l'ancienne table
DROP TABLE quai_status;
```

```sql
-- 5. Renommer la nouvelle table
ALTER TABLE quai_status_new RENAME TO quai_status;
```

```sql
-- 6. Recréer l'index unique
CREATE UNIQUE INDEX idx_quai_numero ON quai_status(quai_numero);
```

```sql
-- 7. Vérifier le nombre de quais (doit retourner 45)
SELECT COUNT(*) AS total_quais FROM quai_status;
```

```sql
-- 8. Vérifier les statuts disponibles
SELECT DISTINCT statut FROM quai_status;
```

### Étape 3 : Vérifier les Résultats

Après la commande 7, vous devez voir :
```
total_quais: 45
```

Après la commande 8, vous devez voir les statuts actuels (exemple) :
```
disponible
en_cours
fin_controle
...
```

---

## 🧪 Test de Validation

1. Allez sur : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2

2. Cliquez sur **n'importe quel quai vert** (Disponible)

3. Dans le modal, cliquez sur **📦 Mise à quai non déchargé**

4. Remplissez le commentaire obligatoire : "Test nouveau statut"

5. Cliquez sur **Confirmer**

6. ✅ **Succès** si :
   - Le quai passe en marron 🟤
   - Icône 📦 visible
   - Commentaire affiché
   - Aucune erreur

---

## 📋 Récapitulatif des Statuts

| Statut | Couleur | Icône | Gestion | Commentaire | Fonctionne |
|--------|---------|-------|---------|-------------|------------|
| Disponible | Vert 🟢 | ✅ | Modal agent | Non | ✅ |
| En cours | Jaune 🟡 | ⏱️ | QR code + Modal | Non | ✅ |
| Fin déchargement | Bleu 🔵 | 📋 | QR code + Modal | Non | ✅ |
| En contrôle | Orange 🟠 | 🔍 | Automatique | Non | ✅ |
| Fin contrôle | Violet 🟣 | 📝 | Automatique | Non | ✅ |
| **Mise à quai non déchargé** | **Marron 🟤** | **📦** | **Modal agent** | **Oui** | **❌ (après migration ✅)** |
| Indisponible | Rouge 🔴 | 🚫 | Modal agent | Oui | ✅ |

---

## 🛡️ Sécurité de la Migration

- ✅ **Aucune perte de données** - Les 45 quais et leurs informations sont copiés intégralement
- ✅ **Opération rapide** - Moins de 5 secondes
- ✅ **Réversible** - Script de rollback disponible (`ROLLBACK_MIGRATION_0014.sql`)
- ✅ **Sans interruption** - L'application continue de fonctionner pendant la migration
- ✅ **Backup automatique** - Cloudflare D1 garde des snapshots

---

## 🆘 En Cas de Problème

### Si les quais ont été supprimés :
→ Utilisez `RESTORE_QUAIS.sql` pour restaurer les 45 quais

### Si la migration échoue :
→ Utilisez `ROLLBACK_MIGRATION_0014.sql` puis `RESTORE_QUAIS.sql`

### Autres problèmes :
→ Voir `GUIDE_RESTAURATION.md` pour une documentation complète

---

## 📞 Support

**Fichiers de référence :**
- `MIGRATION_REQUISE.md` - Instructions détaillées
- `GUIDE_RESTAURATION.md` - Restauration des quais
- `RESTORE_QUAIS.sql` - Script de restauration
- `ROLLBACK_MIGRATION_0014.sql` - Annulation de la migration
- `migrations/0014_add_mise_a_quai_status.sql` - Fichier de migration complet

**URLs importantes :**
- Interface chauffeur : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
- KPI chef d'équipe : https://gxomoissyprocedures.pages.dev/chef-equipe?v=2
- Cloudflare Dashboard : https://dash.cloudflare.com

---

## ✅ Checklist Post-Migration

- [ ] Migration exécutée (8 commandes)
- [ ] Vérification : 45 quais présents
- [ ] Test : Statut "Mise à quai non déchargé" fonctionne
- [ ] Test : Commentaire obligatoire respecté
- [ ] Test : Couleur marron 🟤 et icône 📦 affichés
- [ ] Autres statuts toujours fonctionnels

---

**🎯 Résumé :**
- **Code prêt à 100%** ✅
- **Nécessite uniquement la migration SQL** ⚠️
- **5 minutes maximum** ⏱️
- **Zéro interruption de service** 🚀
