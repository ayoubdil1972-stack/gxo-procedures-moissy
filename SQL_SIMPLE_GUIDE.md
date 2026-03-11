# 🔧 CORRECTION -1 HEURE (Version Simple)

## ÉTAPE 1 : Ouvrir Console Cloudflare D1

1. Aller sur : **https://dash.cloudflare.com**
2. Cliquer : **Workers & Pages**
3. Cliquer : **D1**
4. Cliquer sur : **gxo-chauffeurs-db**
5. Cliquer : **Console**

---

## ÉTAPE 2 : Exécuter les Commandes (UNE PAR UNE)

### Commande 1 : Corriger Déchargement

Copier-coller cette commande dans la console et cliquer **Execute** :

```sql
UPDATE quai_status SET timer_duration = timer_duration - 3600, updated_at = datetime('now', 'localtime') WHERE timer_duration >= 3600;
```

**Résultat attendu :** `✅ 2 rows updated` (ou plus)

---

### Commande 2 : Corriger Contrôle

Copier-coller cette commande dans la console et cliquer **Execute** :

```sql
UPDATE quai_status SET timer_controle_duration = timer_controle_duration - 3600, updated_at = datetime('now', 'localtime') WHERE timer_controle_duration >= 3600;
```

**Résultat attendu :** `✅ 1 rows updated` (ou plus)

---

### Commande 3 : Vérifier

Copier-coller cette commande pour voir les résultats :

```sql
SELECT quai_numero, statut, timer_duration, timer_controle_duration, commentaire_auteur FROM quai_status WHERE timer_duration IS NOT NULL OR timer_controle_duration IS NOT NULL ORDER BY quai_numero;
```

**Résultat attendu :**
- Quai 1 : `timer_duration = 18` (au lieu de 3618) ✅
- Quai 2 : `timer_duration = 34` (au lieu de 3634) ✅

---

## ÉTAPE 3 : Vider Cache et Tester

1. **Vider le cache** : Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
2. **Ouvrir** : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
3. **Vérifier** : Les quais existants affichent maintenant les durées correctes

---

## ✅ VERSION 3.9.8 DÉJÀ DÉPLOYÉE

Le code en production (v3.9.8) **retire automatiquement 1h** pour les **NOUVEAUX** quais.

**Donc :**
- ✅ **Nouveaux quais** (après v3.9.8) → durées correctes automatiquement
- ⏳ **Anciens quais** (avant v3.9.8) → nécessitent le SQL ci-dessus

---

## 🧪 TEST COMPLET

### Pour Anciens Quais (après SQL)
- Vider cache → Vérifier quais 1 et 2 → Durées correctes ✅

### Pour Nouveaux Quais (avec v3.9.8)
1. Mettre un quai "En cours"
2. Attendre 20 secondes
3. Terminer le déchargement
4. **✅ VÉRIFIER** : Timer affiche `00:00:20` (PAS `01:00:20`)

---

## ⚠️ SI ERREUR "Requests without any query"

Cela signifie que la console D1 n'a pas reçu la requête. 

**Solutions :**
1. Copier UNE SEULE commande à la fois
2. Cliquer sur **Execute** (ne pas appuyer sur Entrée)
3. Attendre le résultat avant la suivante

**OU**

Exécuter les 2 commandes en une seule fois :

```sql
UPDATE quai_status SET timer_duration = timer_duration - 3600 WHERE timer_duration >= 3600; UPDATE quai_status SET timer_controle_duration = timer_controle_duration - 3600 WHERE timer_controle_duration >= 3600;
```

---

## 📄 RÉCAPITULATIF

| Quoi | Statut | Action |
|------|--------|--------|
| Code v3.9.8 (correction auto -1h) | ✅ Déployé | Aucune action nécessaire |
| Anciens quais (données fausses) | ⏳ À corriger | Exécuter SQL ci-dessus |
| Nouveaux quais | ✅ Automatique | Aucune action nécessaire |

---

**URL Production** : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2  
**Version** : v3.9.8 (commit 9556829)  
**Date** : 2026-03-10 21:19 UTC
