# Test du chat bidirectionnel en production

## Date: 2026-02-13

### Configuration
- **Chauffeur de test**: ID 11, Mario, langue italienne
- **URL chauffeur**: https://gxo-moissy-v2.pages.dev/chauffeur/taches?id=11&lang=it
- **URL dashboard admin**: https://gxo-moissy-v2.pages.dev/accueil-chauffeur

### Tests à effectuer

#### 1. Test heartbeat ✅
```bash
curl -X POST "https://gxo-moissy-v2.pages.dev/api/chat/heartbeat" \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 11, "page_url": "https://gxo-moissy-v2.pages.dev/chauffeur/taches?id=11&lang=it"}'
```

**Résultat attendu**: `{"success": true, "online": true, "timestamp": "..."}`

#### 2. Test envoi message chauffeur → admin ✅
```bash
curl -X POST "https://gxo-moissy-v2.pages.dev/api/chauffeur/chat" \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 11, "message": "Ho bisogno di assistenza"}'
```

**Résultat attendu**: Message traduit en français + stocké

#### 3. Test envoi message admin → chauffeur ✅
```bash
curl -X POST "https://gxo-moissy-v2.pages.dev/api/admin/chat" \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 11, "message": "Un technicien arrive dans 2 minutes"}'
```

**Résultat attendu**: Message traduit en italien + stocké

#### 4. Test récupération messages vue admin ✅
```bash
curl "https://gxo-moissy-v2.pages.dev/api/chauffeur/chat?id=11&viewer=admin"
```

**Résultat attendu**: Messages en français (traduits)

#### 5. Test récupération messages vue chauffeur ✅
```bash
curl "https://gxo-moissy-v2.pages.dev/api/chauffeur/chat?id=11&viewer=chauffeur"
```

**Résultat attendu**: Messages en italien (traduits)

#### 6. Test statut en ligne (après création table)
```bash
curl "https://gxo-moissy-v2.pages.dev/api/chat/online-status?chauffeur_id=11"
```

**Résultat attendu**: `{"success": true, "online": true, "last_heartbeat": "...", "seconds_ago": 5}`

---

## Problème identifié

La table `chauffeur_sessions` n'existe pas en production, donc :
- Le statut en ligne reste toujours à 0 (offline)
- Le dashboard admin affiche "Hors ligne" même quand le chauffeur est actif

## Solution

Exécuter le SQL suivant dans la console Cloudflare D1 :
```sql
-- Créer la table chauffeur_sessions
CREATE TABLE IF NOT EXISTS chauffeur_sessions (
  chauffeur_id INTEGER PRIMARY KEY,
  last_heartbeat DATETIME,
  is_online INTEGER DEFAULT 0,
  page_url TEXT,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_sessions_heartbeat ON chauffeur_sessions(last_heartbeat);
CREATE INDEX IF NOT EXISTS idx_sessions_online ON chauffeur_sessions(is_online);
```

## Fonctionnalités opérationnelles (sans la table)

✅ **Chat bidirectionnel** : Les messages s'envoient et se reçoivent  
✅ **Traduction automatique** : IT ↔ FR fonctionne  
✅ **API heartbeat** : Accepte les heartbeats mais ne les stocke pas  
✅ **Dashboard admin** : Affiche les chauffeurs actifs  
❌ **Statut en ligne** : Toujours "Hors ligne" sans la table

## Après création de la table

✅ **Statut en ligne** : Badge vert "En ligne" quand heartbeat < 30s  
✅ **Statut hors ligne** : Badge gris "Hors ligne" quand heartbeat > 30s  
✅ **Rafraîchissement auto** : Toutes les 2 secondes dans le chat admin
