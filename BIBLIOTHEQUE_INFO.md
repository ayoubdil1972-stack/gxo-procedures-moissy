# 📚 Bibliothèque de Documents GXO - Guide d'Utilisation

## 🎯 Vue d'ensemble

La bibliothèque centralise **30 documents** essentiels pour les opérations GXO Moissy-Cramayel.

## 📊 Statistiques

### Documents par rubrique
- **Réception** : 10 documents (Word)
- **IPL** : 9 documents (7 Word + 1 Excel + 1 Template)
- **Préparation** : 5 documents (Word)
- **Chef d'équipe** : 5 documents (Word)
- **Anomalies** : 2 documents (1 Word + 1 PDF)

### Types de fichiers
- **📄 Word (.docx)** : 28 documents
- **📊 Excel (.xlsx, .xltm)** : 2 fichiers
- **📕 PDF** : 1 arbre de décision

## 🔍 Fonctionnalités de recherche

### 1. Recherche intelligente en temps réel
- Recherche par **nom** du document
- Recherche par **catégorie** (Réception, IPL, etc.)
- Recherche par **mots-clés** (LTRMS, SAP, étiquettes, etc.)
- Recherche par **description** complète

### 2. Filtres par rubrique
Boutons de filtre rapide :
- **Tous** (30 documents)
- **Réception** (10) - Icône camion bleu
- **IPL** (9) - Icône chariot vert
- **Préparation** (5) - Icône diable violet
- **Chef d'équipe** (5) - Icône cravate orange
- **Anomalies** (2) - Icône alerte rouge

### 3. Niveaux de complexité
- 🟢 **Essentiel** : Opérations de base quotidiennes
- 🟡 **Standard** : Procédures intermédiaires
- 🔴 **Avancé** : Cas complexes et rares

## 📱 Interface utilisateur

### Cartes de documents
Chaque carte affiche :
- **Icône de rubrique** (couleur métier)
- **Nom du document** (titre clair)
- **Description** (objectif du document)
- **Type de fichier** (icône Word/Excel/PDF)
- **Niveau de complexité** (🟢🟡🔴)
- **Boutons d'action** : Ouvrir + Télécharger

### Actions disponibles
1. **Ouvrir** : Visualisation dans un nouvel onglet
2. **Télécharger** : Sauvegarde locale du fichier

## 🎨 Design

### Couleurs par rubrique
- **Réception** : Bleu (#3B82F6)
- **IPL** : Vert (#10B981)
- **Préparation** : Violet (#8B5CF6)
- **Chef d'équipe** : Orange (#F97316)
- **Anomalies** : Rouge (#EF4444)

### Responsive
- ✅ PC : Grille 3 colonnes
- ✅ Tablette : Grille 2 colonnes
- ✅ Mobile : Liste 1 colonne

## 🚀 Accès

### URL principale
`https://[votre-domaine]/bibliotheque`

### Raccourcis depuis navigation
- Lien **"Bibliothèque"** dans la barre de navigation
- Bouton depuis la page d'accueil (section Documents)

## 💡 Cas d'usage

### Exemple 1 : Trouver un document sur les étiquettes
1. Taper "étiquette" dans la recherche
2. 3 résultats apparaissent :
   - Fausses étiquettes
   - Fausses étiquettes date du jour
   - Rééditer une étiquette

### Exemple 2 : Voir tous les documents IPL
1. Cliquer sur le bouton **"IPL (9)"**
2. 9 documents IPL s'affichent :
   - Affectation de tâche LTRMS
   - Annuler une tâche
   - Connexion terminal
   - Priorisation LTRMS
   - Sortir tâche LTRA
   - Visualisation stocks LS03N
   - Relancer tâche cariste
   - Passation anomalies (Excel)
   - Workload planning (Template)

### Exemple 3 : Documents pour nouvel arrivant
1. Rechercher "formation" ou "intégration"
2. Document trouvé : **Formation à l'intégration** (RHM-0001-1-I)

## 📈 Avantages

### Pour les opérateurs
- ✅ **Accès rapide** : Maximum 2 clics pour trouver un document
- ✅ **Recherche intuitive** : Pas besoin de connaître le nom exact
- ✅ **Visuel clair** : Icônes et couleurs facilitent la navigation

### Pour les managers
- ✅ **Centralisation** : Tous les documents au même endroit
- ✅ **Organisation** : Classification claire par métier
- ✅ **Traçabilité** : Facilite la formation et l'audit

### Pour les formateurs
- ✅ **Support pédagogique** : Documents accessibles instantanément
- ✅ **Niveaux de complexité** : Adaptation selon l'expérience
- ✅ **Descriptions claires** : Contexte d'utilisation précisé

## 🔄 Mises à jour

### Ajouter un document
1. Copier le fichier dans `/public/static/documents/`
2. Ajouter l'entrée dans `bibliotheque.tsx`
3. Reconstruire avec `npm run build`

### Modifier une description
1. Éditer `src/pages/bibliotheque.tsx`
2. Modifier le champ `description` du document
3. Reconstruire et redéployer

## 📞 Support

Pour toute question ou amélioration de la bibliothèque, contacter l'équipe IT GXO Moissy.

---

**Version** : 2.0  
**Dernière mise à jour** : 2026-02-03  
**Documents disponibles** : 30
