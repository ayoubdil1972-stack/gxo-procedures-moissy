# ✅ CORRÉLATION KPI RÉTABLIE - Version 3.11.36

## 📅 Date : 29 mars 2026 - 14h30

## 🎯 Problème identifié

La page **Chef d'équipe → Suivi des KPI** (https://gxomoissyprocedures.pages.dev/chef-equipe?v=2) affichait :
- ❌ 0 camion traité
- ❌ 0 min temps déchargement moyen
- ❌ 0 min temps contrôle moyen
- ❌ Aucun quai affiché dans la grille

**Cause racine** : L'API `/api/chef-equipe/kpi/reception-camion` utilisait une requête qui cherchait `WHERE statut = 'fin_controle'`, mais ce statut n'est plus utilisé par le nouveau flux de travail qui laisse les quais en statut "fin_dechargement" même après le contrôle.

## 🔧 Solutions appliquées

### Version 3.11.35 (première tentative)
- ✅ Changement de la structure de retour API : `kpi` → `quais` pour correspondre au frontend
- ✅ Suppression de la table `kpi_archives` au profit de la lecture directe depuis `quai_status`
- ✅ Calcul des moyennes basé sur les durées réelles stockées dans `timer_duration` et `timer_controle_duration`

### Version 3.11.36 (solution finale)
**Changement de requête SQL** dans `/api/chef-equipe/kpi/reception-camion` :

**Avant (v3.11.35)** :
```sql
SELECT * FROM quai_status 
WHERE statut = 'fin_controle'
  AND DATE(updated_at) = DATE("now")
```

**Après (v3.11.36)** :
```sql
SELECT * FROM quai_status 
WHERE timer_controle_duration IS NOT NULL
  AND timer_duration IS NOT NULL
  AND DATE(controle_fin_timestamp) = DATE("now")
```

**Explication** :
- ✅ Détecte les quais avec contrôle terminé en cherchant `timer_controle_duration IS NOT NULL`
- ✅ S'assure que le déchargement est aussi terminé avec `timer_duration IS NOT NULL`
- ✅ Filtre par date de fin de contrôle (`controle_fin_timestamp`) au lieu de `updated_at`
- ✅ Indépendant du statut du quai (peut être "fin_dechargement", "disponible", etc.)

## ✅ Résultat de test (29 mars 2026)

### Test API direct :
```bash
curl "https://gxomoissyprocedures.pages.dev/api/chef-equipe/kpi/reception-camion?date=2026-03-29"
```

**Réponse** :
```json
{
  "success": true,
  "quais": [
    {
      "id": 2,
      "quai_numero": 2,
      "timer_duration": 7202,       // 120 minutes déchargement
      "timer_controle_duration": 7236,  // 121 minutes contrôle
      "controle_fin_timestamp": "2026-03-29 13:09:39",
      "controleur_nom": "Asma",
      "commentaire": "Déchargement terminé - AGENT_TEST_KPI..."
    }
  ],
  "moyennes": {
    "total_camions": 1,
    "dechargement_minutes": 120,
    "controle_minutes": 121
  },
  "date": "2026-03-29"
}
```

### Affichage sur page Chef d'équipe :
| Indicateur | Valeur |
|------------|--------|
| 🚛 Camions traités | 1 |
| ⏱️ Temps déchargement moyen | 120 min |
| ⏱️ Temps contrôle moyen | 121 min |
| 📦 Quais affichés | Quai 2 (carte verte ✅) |

**Objectifs de performance** :
- ⚠️ Déchargement : 120 min > 30 min (objectif) → Carte ROUGE
- ⚠️ Contrôle : 121 min > 40 min (objectif) → Carte ROUGE

## 📊 Corrélation rétablie

✅ **Page Accueil Chauffeur** (`https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2`)  
↔️ **Partage la même base de données**  
✅ **Page Chef d'Équipe → KPI** (`https://gxomoissyprocedures.pages.dev/chef-equipe?v=2`)

### Flux de données :
1. **Démarrage quai** → Timer déchargement commence (timer_start)
2. **Fin déchargement** → Timer figé (timer_duration), statut → "fin_dechargement"
3. **Démarrage contrôle** → Timer contrôle commence (timer_controle_start)
4. **Fin contrôle** → Timer contrôle figé (timer_controle_duration), statut → "fin_controle"
5. **API KPI** → Détecte automatiquement les quais avec `timer_controle_duration IS NOT NULL`
6. **Affichage** → Moyennes calculées + Cartes de quais affichées

## 🔒 Garanties

✅ **Pas de modification des pages verrouillées** :
- `accueil-chauffeur?v=2` → Inchangée
- `controleur?v=2` → Inchangée

✅ **Lecture seule depuis `quai_status`** :
- Aucune écriture dans une table séparée
- Utilise directement les timers déjà calculés

✅ **Rafraîchissement automatique** :
- Toutes les 30 secondes sur la page Chef d'équipe

✅ **Calcul dynamique des moyennes** :
- Temps déchargement moyen = moyenne des `timer_duration` en minutes
- Temps contrôle moyen = moyenne des `timer_controle_duration` en minutes

## 🚀 Déploiement

| Élément | Statut |
|---------|--------|
| Version | v3.11.36 ✅ |
| Build | Réussi ✅ |
| Commit | 559be84 ✅ |
| Déploiement | https://9b3e0b07.gxomoissyprocedures.pages.dev ✅ |
| Production | https://gxomoissyprocedures.pages.dev ✅ |
| Test API | Réussi (1 quai détecté) ✅ |

## 📝 Instructions utilisateur

### Pour le Chef d'équipe :
1. Ouvrir https://gxomoissyprocedures.pages.dev/chef-equipe?v=2
2. Cliquer sur l'onglet **"Suivi des KPI"**
3. Sélectionner la date souhaitée (par défaut : aujourd'hui)
4. Cliquer sur **"Actualiser"** pour rafraîchir
5. Consulter :
   - 🚛 **Camions traités** : nombre total de quais terminés
   - ⏱️ **Temps déchargement moyen** : moyenne en minutes
   - ⏱️ **Temps contrôle moyen** : moyenne en minutes
   - 📦 **Grille de quais** : cartes détaillées par quai

### Codes couleur des cartes moyennes :
- 🟢 **VERT** : Objectif atteint (≤30 min déchargement, ≤40 min contrôle)
- 🔴 **ROUGE** : Objectif dépassé (>30 min déchargement, >40 min contrôle)

## 📂 Fichiers modifiés

| Fichier | Lignes modifiées | Description |
|---------|-----------------|-------------|
| `src/index.tsx` | 3720-3765 | API `/api/chef-equipe/kpi/reception-camion` - Requête SQL corrigée |
| `dist/_worker.js` | Build | Backend compilé avec nouvelle logique |

## ⚙️ Commandes de déploiement utilisées

```bash
# Build
npm run build

# Commit
git add -A
git commit -m "v3.11.36 - KPI chercher timer_controle_duration au lieu de statut"

# Déploiement
npx wrangler pages deploy dist --project-name gxomoissyprocedures
```

## 🎉 Mission accomplie

✅ **Corrélation entre accueil-chauffeur et chef-equipe rétablie**  
✅ **Suivi des KPI opérationnel avec données en temps réel**  
✅ **Aucune modification des pages verrouillées**  
✅ **Calcul automatique des moyennes basé sur les timers réels**  
✅ **Affichage des cartes de quais avec toutes les informations**

---

**Version** : v3.11.36  
**Date** : 29 mars 2026 - 14h30  
**Statut** : ✅ TERMINÉ et DÉPLOYÉ
