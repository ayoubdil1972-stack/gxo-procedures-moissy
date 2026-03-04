# 🚀 Guide de Déploiement Production - 45 Quais Réels GXO Moissy

## 📋 Vue d'ensemble

Ce guide explique comment déployer les **45 quais réels GXO Moissy** en production.

### ✅ Quais à implémenter (45 total)

| Plage    | Quais                              | Quantité |
|----------|------------------------------------|----------|
| 1-10     | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10      | 10       |
| 32-38    | 32, 33, 34, 35, 36, 37, 38         | 7        |
| 45-49    | 45, 46, 47, 48, 49                 | 5        |
| 60-62    | 60, 61, 62                         | 3        |
| 67-69    | 67, 68, 69                         | 3        |
| 75-79    | 75, 76, 77, 78, 79                 | 5        |
| 81-87    | 81, 82, 83, 84, 85, 86, 87         | 7        |
| 99-103   | 99, 100, 101, 102, 103             | 5        |
| **TOTAL**| **45 quais**                       | **45**   |

---

## 🔧 Étape 1: Mise à jour de la base D1 Production

### 1.1 Connexion à Cloudflare D1

1. Aller sur: https://dash.cloudflare.com
2. Storage & Databases → D1
3. Sélectionner `gxo-chauffeurs-db`
4. Cliquer sur l'onglet **Console**

### 1.2 Suppression des anciens quais (11-30)

**⚠️ IMPORTANT**: Exécuter cette commande pour supprimer les quais 11-30 s'ils existent:

```sql
DELETE FROM quai_status WHERE quai_numero BETWEEN 11 AND 30;
```

**Vérification**:
```sql
SELECT COUNT(*) FROM quai_status;
```
→ Résultat attendu: nombre de quais restants (peut varier)

### 1.3 Insertion des 45 quais réels

**⚠️ CRITIQUE**: Utiliser **INSERT_45_QUAIS_PRODUCTION.sql** (pas INSERT_45_QUAIS.sql)

1. Ouvrir: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/blob/main/INSERT_45_QUAIS_PRODUCTION.sql
2. Cliquer sur le bouton **"Raw"**
3. Sélectionner **TOUT le contenu** (Ctrl+A / Cmd+A)
4. Copier (Ctrl+C / Cmd+C)
5. Retourner dans la console D1 Cloudflare
6. Coller le SQL et **Exécuter**

**Vérification**:
```sql
SELECT COUNT(*) as total FROM quai_status;
```
→ Résultat attendu: **45**

```sql
SELECT quai_numero FROM quai_status ORDER BY quai_numero ASC;
```
→ Résultat attendu: 1,2,3,4,5,6,7,8,9,10,32,33,34,35,36,37,38,45,46,47,48,49,60,61,62,67,68,69,75,76,77,78,79,81,82,83,84,85,86,87,99,100,101,102,103

---

## 🚀 Étape 2: Déploiement du Code

### 2.1 Option A: Auto-Deploy (Recommandé)

Le commit **299d25f** déclenche automatiquement le déploiement via GitHub Actions.

**Vérification**:
1. Aller sur: https://dash.cloudflare.com
2. Workers & Pages → **gxo-procedures-moissy**
3. Onglet **Deployments**
4. Vérifier que le dernier déploiement est **Success**
5. Le commit affiché doit être **299d25f** ou plus récent

### 2.2 Option B: Déploiement Manuel

Si l'auto-deploy ne fonctionne pas:

1. Aller sur: https://dash.cloudflare.com
2. Workers & Pages → **gxo-procedures-moissy**
3. Onglet **Deployments**
4. Cliquer sur **"Create deployment"**
5. Sélectionner la branche **"main"**
6. Cliquer sur **"Save and Deploy"**
7. Attendre que le statut passe à **"Success"** (≈2-3 min)

---

## 🧹 Étape 3: Purge des Caches

### 3.1 Cache Cloudflare

1. Aller sur: https://dash.cloudflare.com
2. Sélectionner le domaine **gxomoissyprocedures.com**
3. Onglet **Caching**
4. Cliquer sur **"Purge Everything"**
5. Confirmer la purge

### 3.2 Cache Navigateur

**Pour tous les utilisateurs**:
- **Windows/Linux**: Ctrl + Shift + R
- **Mac**: Cmd + Shift + R
- **Alternative**: Ouvrir une fenêtre de **navigation privée** (Ctrl+Shift+N / Cmd+Shift+N)

---

## ✅ Étape 4: Tests de Validation Production

### 4.1 Test de l'API

**URL**: https://gxomoissyprocedures.com/api/quais

**Test dans le navigateur**:
1. Ouvrir l'URL dans un nouvel onglet
2. Vérifier le JSON retourné:
   ```json
   {
     "success": true,
     "quais": [
       {"id": 1, "quai_numero": 1, "statut": "disponible", ...},
       {"id": 2, "quai_numero": 2, "statut": "disponible", ...},
       ...
     ]
   }
   ```
3. Compter le nombre de quais: **doit être 45**
4. Vérifier les numéros: 1-10, 32-38, 45-49, 60-62, 67-69, 75-79, 81-87, 99-103

**Test avec curl** (optionnel):
```bash
curl -s https://gxomoissyprocedures.com/api/quais | jq '.quais | length'
```
→ Résultat attendu: **45**

### 4.2 Test de l'Interface Utilisateur

**URL**: https://gxomoissyprocedures.com/accueil-chauffeur

**Checklist de validation**:

- [ ] **Affichage**: 45 quais affichés (grille 9x5 sur desktop)
- [ ] **Numéros**: Tous les numéros corrects (1-10, 32-38, 45-49, 60-62, 67-69, 75-79, 81-87, 99-103)
- [ ] **Responsive**: Grille s'adapte sur mobile (3 colonnes) et tablette (5-6 colonnes)
- [ ] **Statistiques**: Badge en haut affiche "45 quais GXO Moissy"
- [ ] **Statuts**: Les 3 couleurs fonctionnent (vert, jaune, rouge)

### 4.3 Test du Timer

1. Sélectionner un quai (ex: Quai 5)
2. Changer le statut en **"En cours"**
3. **Vérifier**:
   - ✅ Timer apparaît et démarre à **00:00:00**
   - ✅ Timer s'incrémente correctement (HH:MM:SS)
   - ✅ Pas de "NaN:NaN:NaN" ou erreur
4. Changer le statut en **"Disponible"**
5. **Vérifier**:
   - ✅ Timer **disparaît complètement**
6. Re-changer en **"En cours"**
7. **Vérifier**:
   - ✅ Timer **recommence à 00:00:00** (pas de reprise)
8. Rafraîchir la page (F5)
9. **Vérifier**:
   - ✅ Statut et timer **persistent** correctement

### 4.4 Test Console Navigateur

1. Ouvrir la console (F12)
2. Onglet **Console**
3. **Vérifier**:
   - ✅ Aucune erreur JavaScript
   - ✅ Pas de 404 sur les fichiers statiques
   - ✅ Requêtes API retournent 200 OK

---

## 🎯 Checklist Finale de Production

| Élément                          | Statut | Notes |
|----------------------------------|--------|-------|
| Base D1: 45 quais créés          | ☐      | `SELECT COUNT(*) FROM quai_status;` → 45 |
| Base D1: Quais 11-30 supprimés   | ☐      | Pas de quais entre 11 et 30 |
| Déploiement Cloudflare: Success  | ☐      | Commit 299d25f ou plus récent |
| Cache Cloudflare: Purgé          | ☐      | Purge Everything exécuté |
| Cache navigateur: Purgé          | ☐      | Ctrl+Shift+R ou navigation privée |
| API: 45 quais retournés          | ☐      | /api/quais retourne 45 éléments |
| Interface: 45 quais affichés     | ☐      | Grille 9x5 visible |
| Numéros: Corrects et triés       | ☐      | 1-10, 32-38, 45-49, ... 99-103 |
| Timer: Démarre à 00:00:00        | ☐      | Pas de NaN |
| Timer: S'incrémente correctement | ☐      | HH:MM:SS |
| Timer: Disparaît si Disponible   | ☐      | Pas de timer affiché |
| Timer: Recommence à 00:00:00     | ☐      | Reset complet chaque cycle |
| Timer: Persiste après F5         | ☐      | Statut/timer sauvegardés |
| Statistiques: Temps réel         | ☐      | Badges mis à jour |
| Console JS: Aucune erreur        | ☐      | F12 → Console clean |
| Responsive: Mobile/Tablette/Desktop | ☐   | Grille adaptative |

---

## 🔧 Dépannage

### Problème 1: Les quais ne s'affichent pas

**Solution**:
1. Ouvrir la console (F12)
2. Vérifier les erreurs JavaScript
3. Tester l'API directement: https://gxomoissyprocedures.com/api/quais
4. Si l'API retourne des données, vider le cache navigateur (Ctrl+Shift+R)

### Problème 2: Seulement 30 quais au lieu de 45

**Solution**:
1. Vérifier la base D1: `SELECT COUNT(*) FROM quai_status;`
2. Si résultat = 30, exécuter INSERT_45_QUAIS_PRODUCTION.sql
3. Redéployer le code (commit 299d25f)
4. Purger les caches Cloudflare + navigateur

### Problème 3: Timer affiche "NaN:NaN:NaN"

**Solution**:
1. Vérifier que `timer_start` est bien au format datetime SQLite
2. Exécuter en D1:
   ```sql
   SELECT quai_numero, statut, timer_start 
   FROM quai_status 
   WHERE statut = 'en_cours';
   ```
3. Si `timer_start` contient des timestamps numériques (ex: 1772605409550), reset:
   ```sql
   UPDATE quai_status 
   SET statut = 'disponible', timer_start = NULL 
   WHERE statut = 'en_cours';
   ```

### Problème 4: Erreur "Requests without any query are not supported"

**Solution**:
- Utiliser **INSERT_45_QUAIS_PRODUCTION.sql** (pas INSERT_45_QUAIS.sql)
- Ce fichier ne contient **pas de lignes vides** ni de commentaires

### Problème 5: Les quais 11-30 sont toujours là

**Solution**:
1. Exécuter dans la console D1:
   ```sql
   DELETE FROM quai_status WHERE quai_numero BETWEEN 11 AND 30;
   ```
2. Vérifier: `SELECT quai_numero FROM quai_status ORDER BY quai_numero;`

---

## 📊 Statistiques de Performance

| Métrique                  | Valeur Attendue |
|---------------------------|-----------------|
| Temps de chargement page  | < 500ms         |
| Temps réponse API         | < 100ms         |
| Taille bundle JavaScript  | ~262 KB         |
| Nombre requêtes HTTP      | 4-6             |
| Score Lighthouse          | > 90/100        |

---

## 📞 Support

**En cas de problème**:
1. Vérifier ce guide de dépannage
2. Consulter les logs Cloudflare:
   - Workers & Pages → gxo-procedures-moissy → Logs
3. Vérifier les commits GitHub:
   - https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/commits/main

**Fichiers SQL**:
- INSERT_45_QUAIS_PRODUCTION.sql: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/blob/main/INSERT_45_QUAIS_PRODUCTION.sql
- DELETE_QUAIS_11_30.sql: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy/blob/main/DELETE_QUAIS_11_30.sql

---

## ✅ Conclusion

Une fois toutes les étapes complétées et la checklist validée:

**🎉 Les 45 quais réels GXO Moissy sont déployés en production !**

**URLs de Production**:
- Interface: https://gxomoissyprocedures.com/accueil-chauffeur
- API: https://gxomoissyprocedures.com/api/quais
- Dashboard Cloudflare: https://dash.cloudflare.com

**Prochaines étapes suggérées**:
- Former les utilisateurs sur les nouveaux numéros de quais
- Mettre à jour la documentation interne
- Créer une sauvegarde de la base D1
- Surveiller les logs pendant 24-48h

---

**Version**: 2.3.1  
**Date**: 2026-03-04  
**Commits**: 299d25f, 883c3d3, a711e6d
