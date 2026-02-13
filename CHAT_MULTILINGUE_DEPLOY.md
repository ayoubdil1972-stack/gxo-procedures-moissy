# ✅ Chat Multilingue + Statut En Ligne - Version 13.1.0

## 🎯 Nouvelles Fonctionnalités Implémentées

### 1. 🌍 Traduction Automatique Bidirectionnelle

#### Chauffeur → Admin
- **Message original** : Dans la langue du chauffeur (IT, NL, DE, etc.)
- **Traduction automatique** : En français pour l'admin
- **Stockage** : `message` (original) + `translated_fr` (traduction française)
- **Exemple** :
  ```
  Chauffeur (IT): "Buongiorno, ho bisogno di aiuto con il camion"
  Admin voit: "Bonjour, j'ai besoin d'aide avec le camion"
  ```

#### Admin → Chauffeur
- **Message original** : En français
- **Traduction automatique** : Dans la langue du chauffeur
- **Stockage** : `message` (français) + `translated_chauffeur` (traduction)
- **Exemple** :
  ```
  Admin (FR): "Bonjour Luigi, je vous envoie un technicien immédiatement"
  Chauffeur voit (IT): "Ciao Luigi, ti manderò subito un tecnico"
  ```

#### API de Traduction
- **Service** : Google Translate API gratuite
- **Fichier** : `src/services/translation.ts`
- **Fonction** : `traduireTexte(texte, langueCible, langueSource)`
- **Langues supportées** : FR, EN, NL, DE, IT, BG, CS, DA, FI, HR, PL, PT, RO

### 2. 💬 Envoi de Messages Admin → Chauffeur

#### API POST /api/admin/chat
**Request** :
```json
{
  "chauffeur_id": 2,
  "message": "Bonjour, tout va bien ?"
}
```

**Response** :
```json
{
  "success": true,
  "translated": "Ciao, va tutto bene?"
}
```

**Fonctionnement** :
1. Admin envoie un message en français
2. API récupère la langue du chauffeur (ex: IT)
3. Message traduit automatiquement en italien
4. Message stocké avec `translated_chauffeur`
5. Chauffeur voit le message traduit dans sa langue

#### Interface Admin
- **Bouton "Chat"** sur chaque carte chauffeur
- **Modal de chat** avec historique
- **Input** : "Votre message (sera traduit automatiquement)..."
- **Indication** : "Vos messages seront traduits automatiquement en italien"
- **Badge** : Compteur de messages non lus

### 3. 🟢 Statut En Ligne / Hors Ligne

#### Table chauffeur_sessions
**Migration 0008** : `migrations/0008_chat_translation_and_sessions.sql`
```sql
CREATE TABLE chauffeur_sessions (
  chauffeur_id INTEGER PRIMARY KEY,
  last_heartbeat DATETIME,
  is_online INTEGER DEFAULT 0,
  page_url TEXT,
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);
```

#### Système de Heartbeat
**API POST /api/chat/heartbeat**
```json
{
  "chauffeur_id": 2,
  "page_url": "/chauffeur/taches?id=2"
}
```

**Fréquence** : Toutes les 5 secondes (côté chauffeur)

**JavaScript** : `public/static/chauffeur-taches.js`
```javascript
// Heartbeat automatique
async function sendHeartbeat() {
  await fetch('/api/chat/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chauffeur_id: chauffeurId,
      page_url: window.location.href
    })
  });
}

// Appelé toutes les 5 secondes
setInterval(() => {
  sendHeartbeat();
}, 5000);
```

#### Calcul du Statut
**API GET /api/chauffeur/liste**
```sql
CASE 
  WHEN last_heartbeat IS NOT NULL 
    AND (julianday('now') - julianday(last_heartbeat)) * 86400 < 30 
  THEN 1 
  ELSE 0 
END as online_status
```

**Logique** :
- **En ligne** : Si heartbeat < 30 secondes
- **Hors ligne** : Si heartbeat > 30 secondes OU aucun heartbeat

#### Affichage Dashboard Admin
**Badge En ligne** (vert) :
```html
<span class="flex items-center gap-1 text-xs text-green-600">
  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
  En ligne
</span>
```

**Badge Hors ligne** (gris) :
```html
<span class="flex items-center gap-1 text-xs text-gray-400">
  <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
  Hors ligne
</span>
```

---

## 🧪 Tests Locaux Complets

### Test 1 : Traduction Chauffeur → Admin (IT → FR)
```bash
# Chauffeur italien envoie un message
curl -X POST http://localhost:3000/api/chauffeur/chat \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 2, "message": "Buongiorno, ho bisogno di aiuto con il camion"}'

# Résultat
{
  "success": true,
  "translated_fr": "Bonjour, j'ai besoin d'aide avec le camion",
  "translated_chauffeur": "Buongiorno, ho bisogno di aiuto con il camion"
}
```

### Test 2 : Admin Voit la Traduction Française
```bash
# Admin récupère les messages
curl "http://localhost:3000/api/chauffeur/chat?id=2&viewer=admin"

# Résultat
{
  "sender": "chauffeur",
  "message": "Bonjour, j'ai besoin d'aide avec le camion"  ← Traduit en FR
}
```

### Test 3 : Traduction Admin → Chauffeur (FR → IT)
```bash
# Admin envoie un message en français
curl -X POST http://localhost:3000/api/admin/chat \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 2, "message": "Bonjour Luigi, je vous envoie un technicien immédiatement"}'

# Résultat
{
  "success": true,
  "translated": "Ciao Luigi, ti manderò subito un tecnico"
}
```

### Test 4 : Chauffeur Voit la Traduction Italienne
```bash
# Chauffeur récupère les messages
curl "http://localhost:3000/api/chauffeur/chat?id=2&viewer=chauffeur"

# Résultat
{
  "sender": "admin",
  "message": "Ciao Luigi, ti manderò subito un tecnico"  ← Traduit en IT
}
```

### Test 5 : Heartbeat et Statut En Ligne
```bash
# Chauffeur envoie heartbeat
curl -X POST http://localhost:3000/api/chat/heartbeat \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 2, "page_url": "/chauffeur/taches?id=2"}'

# Résultat
{
  "success": true,
  "online": true,
  "timestamp": "2026-02-13T18:21:51.135Z"
}

# Vérifier statut dans la liste
curl "http://localhost:3000/api/chauffeur/liste" | jq '.chauffeurs[] | {id, pseudo, online_status}'

# Résultat
{
  "id": 2,
  "pseudo": "Luigi",
  "online_status": 1  ← EN LIGNE
}
{
  "id": 1,
  "pseudo": "Mario",
  "online_status": 0  ← HORS LIGNE
}
```

---

## 📊 Structure de la Base de Données

### Table chat_messages
```sql
CREATE TABLE chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chauffeur_id INTEGER NOT NULL,
  sender TEXT NOT NULL,                  -- 'chauffeur' ou 'admin'
  message TEXT NOT NULL,                 -- Message original
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT 0,
  original_lang TEXT DEFAULT 'fr',       -- Langue originale
  translated_fr TEXT,                    -- Traduction française (pour admin)
  translated_chauffeur TEXT,             -- Traduction chauffeur (pour lui)
  delivered_at DATETIME,
  read_at DATETIME,
  sender_online INTEGER DEFAULT 1,
  read_by_admin INTEGER DEFAULT 0,       -- Lu par admin
  read_by_chauffeur INTEGER DEFAULT 0,   -- Lu par chauffeur
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);
```

### Table chauffeur_sessions
```sql
CREATE TABLE chauffeur_sessions (
  chauffeur_id INTEGER PRIMARY KEY,
  last_heartbeat DATETIME,              -- Dernière activité
  is_online INTEGER DEFAULT 0,          -- 1 = en ligne, 0 = hors ligne
  page_url TEXT,                        -- Page actuelle du chauffeur
  FOREIGN KEY (chauffeur_id) REFERENCES chauffeur_arrivals(id)
);
```

---

## 🔌 APIs Modifiées

### POST /api/chauffeur/chat
**Paramètres** :
- `chauffeur_id` : ID du chauffeur
- `message` : Contenu du message
- `sender` : 'chauffeur' (par défaut) ou 'admin'

**Traduction automatique** :
- Si `sender=chauffeur` : traduit vers FR
- Si `sender=admin` : traduit vers langue chauffeur

### GET /api/chauffeur/chat
**Paramètres** :
- `id` : ID du chauffeur
- `viewer` : 'chauffeur' ou 'admin'

**Logique d'affichage** :
- Si `viewer=admin` : affiche `translated_fr`
- Si `viewer=chauffeur` : affiche `translated_chauffeur`

### POST /api/admin/chat
**Paramètres** :
- `chauffeur_id` : ID du chauffeur
- `message` : Message en français

**Traduction** : Automatique vers langue chauffeur

### POST /api/chat/heartbeat
**Paramètres** :
- `chauffeur_id` : ID du chauffeur
- `page_url` : URL de la page actuelle

**Action** : Upsert dans `chauffeur_sessions` avec timestamp actuel

### GET /api/chauffeur/liste
**Retour** : Liste avec `online_status` calculé (< 30s = en ligne)

---

## 📦 Fichiers Modifiés

| Fichier | Modification |
|---------|--------------|
| `src/index.tsx` | Ajout traduction dans APIs chat + heartbeat + sessions |
| `src/services/translation.ts` | Service de traduction (existait déjà) |
| `public/static/chauffeur-taches.js` | Ajout heartbeat + viewer=chauffeur |
| `public/static/accueil-chauffeur-dashboard.js` | Ajout viewer=admin |
| `migrations/0008_chat_translation_and_sessions.sql` | Nouvelle migration sessions |

---

## 🚀 Déploiement Production

### Status Actuel
- ✅ **Code** : Poussé sur GitHub (commit `14a9b2a`)
- ✅ **Build** : 252.40 kB (stable)
- ✅ **Production** : Déployée sur https://gxo-moissy-v2.pages.dev
- ⏳ **Migration D1** : À appliquer en production

### Migration D1 Production
**IMPORTANT** : La migration 0008 doit être appliquée en production pour activer le statut en ligne.

**Option 1 : Via Dashboard Cloudflare**
1. Aller sur https://dash.cloudflare.com
2. D1 Databases → gxo-chauffeurs-db
3. Console → Copier/coller le contenu de `migrations/0008_chat_translation_and_sessions.sql`
4. Exécuter

**Option 2 : Via Wrangler (si token D1 configuré)**
```bash
npx wrangler d1 migrations apply gxo-chauffeurs-db --remote
```

---

## ✅ Fonctionnalités Testées

| Fonctionnalité | Local | Prod | Status |
|----------------|-------|------|--------|
| Traduction IT→FR | ✅ | ⏳ | Migration requise |
| Traduction FR→IT | ✅ | ⏳ | Migration requise |
| Envoi admin→chauffeur | ✅ | ⏳ | Migration requise |
| Heartbeat API | ✅ | ⏳ | Migration requise |
| Online status | ✅ | ⏳ | Migration requise |
| Badge en ligne/hors ligne | ✅ | ⏳ | Migration requise |

---

## 📝 Prochaines Étapes

1. **Appliquer migration 0008 en production** (requis)
2. Tester traduction en production
3. Tester heartbeat en production
4. Vérifier statut en ligne sur dashboard admin

---

## 🎉 Résumé

**Version** : 13.1.0  
**Commit** : `14a9b2a`  
**GitHub** : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy  
**Production** : https://gxo-moissy-v2.pages.dev

**Nouvelles fonctionnalités** :
- ✅ Traduction automatique bidirectionnelle (12 langues)
- ✅ Envoi messages admin → chauffeur avec traduction
- ✅ Statut en ligne/hors ligne avec heartbeat
- ✅ Badge coloré dans dashboard admin
- ✅ APIs testées et fonctionnelles en local

**Prêt pour production après migration D1 !** 🚀
