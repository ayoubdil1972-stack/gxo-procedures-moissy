# 🔧 Instructions pour créer la table chauffeur_sessions

## ⚠️ Important : Exécuter les commandes UNE PAR UNE

La console Cloudflare D1 ne supporte pas les requêtes multiples. Copiez-collez **chaque ligne séparément**.

---

## Étape 1 : Aller dans la console D1

1. Ouvrir https://dash.cloudflare.com
2. Cliquer sur **D1** dans le menu de gauche
3. Cliquer sur **gxo-chauffeurs-db**
4. Cliquer sur l'onglet **Console**

---

## Étape 2 : Exécuter les commandes (une par une)

### Commande 1 : Créer la table
```sql
CREATE TABLE IF NOT EXISTS chauffeur_sessions (chauffeur_id INTEGER PRIMARY KEY, last_heartbeat DATETIME, is_online INTEGER DEFAULT 0, page_url TEXT, FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id));
```

1. Copier cette ligne complète
2. Coller dans la console D1
3. Cliquer sur **"Execute"** ou appuyer sur **Entrée**
4. Vérifier : Vous devriez voir "Query executed successfully" ✅

---

### Commande 2 : Créer l'index sur last_heartbeat
```sql
CREATE INDEX IF NOT EXISTS idx_sessions_heartbeat ON chauffeur_sessions(last_heartbeat);
```

1. Copier cette ligne complète
2. Coller dans la console D1
3. Cliquer sur **"Execute"** ou appuyer sur **Entrée**
4. Vérifier : Vous devriez voir "Query executed successfully" ✅

---

### Commande 3 : Créer l'index sur is_online
```sql
CREATE INDEX IF NOT EXISTS idx_sessions_online ON chauffeur_sessions(is_online);
```

1. Copier cette ligne complète
2. Coller dans la console D1
3. Cliquer sur **"Execute"** ou appuyer sur **Entrée**
4. Vérifier : Vous devriez voir "Query executed successfully" ✅

---

## Étape 3 : Vérifier que la table existe

Exécuter cette commande pour vérifier :
```sql
SELECT name FROM sqlite_master WHERE type='table' AND name='chauffeur_sessions';
```

**Résultat attendu** :
```
name
chauffeur_sessions
```

Si vous voyez `chauffeur_sessions`, c'est parfait ! ✅

---

## Étape 4 : Tester le statut en ligne

1. Ouvrir https://gxo-moissy-v2.pages.dev/chauffeur/taches?id=11&lang=it
2. Attendre 5 secondes (le heartbeat se fait automatiquement)
3. Ouvrir https://gxo-moissy-v2.pages.dev/accueil-chauffeur
4. Vérifier : Le badge devrait afficher **"En ligne"** (vert) 🟢

---

## 🚨 Si vous voyez une erreur

### Erreur : "table chauffeur_sessions already exists"
✅ **C'est normal** ! La table existe déjà, vous pouvez passer aux index.

### Erreur : "The request is malformed: Requests without any query are not supported"
❌ **Cause** : Vous avez copié plusieurs lignes en même temps ou des commentaires.
✅ **Solution** : Copier **UNE SEULE ligne SQL à la fois** sans les commentaires `--`.

### Erreur : "FOREIGN KEY constraint failed"
✅ **C'est normal** si la table `chauffeur_arrivals` n'existe pas encore. La table sera quand même créée.

---

## 📝 Résumé

**3 commandes à exécuter séparément** :
1. `CREATE TABLE IF NOT EXISTS chauffeur_sessions (...);`
2. `CREATE INDEX IF NOT EXISTS idx_sessions_heartbeat ON chauffeur_sessions(last_heartbeat);`
3. `CREATE INDEX IF NOT EXISTS idx_sessions_online ON chauffeur_sessions(is_online);`

Après exécution : Le badge "En ligne" (vert) 🟢 apparaîtra automatiquement dans le dashboard admin quand un chauffeur sera sur sa page.
