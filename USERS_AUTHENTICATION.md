# 🔐 Comptes Utilisateurs GXO Moissy Procédures

**Date de création** : 2 juin 2026  
**Version** : v3.13.5  
**Base de données** : D1 SQLite (table `users`)

---

## 👥 Liste des Utilisateurs Créés

### 1. **Sonia Cornette** (Chef d'Équipe)
- **Email** : `sonia.cornette@gxo.com`
- **Mot de passe** : `GXOsc2026`
- **Rôle** : Chef d'équipe
- **Statut** : Actif
- **Logique du mot de passe** : GXO + initiales (sc) + année (2026)

---

### 2. **Rocky Gussie**
- **Email** : `rocky.gussie@gxo.com`
- **Mot de passe** : `GXOrg2026`
- **Rôle** : Utilisateur
- **Statut** : Actif
- **Logique du mot de passe** : GXO + initiales (rg) + année (2026)

---

### 3. **Marius Dumitru**
- **Email** : `marius.dumitru@gxo.com`
- **Mot de passe** : `GXOmd2026`
- **Rôle** : Utilisateur
- **Statut** : Actif
- **Logique du mot de passe** : GXO + initiales (md) + année (2026)

---

### 4. **Hassan Mounaim**
- **Email** : `hassan.mounaim@gxo.com`
- **Mot de passe** : `GXOhm2026`
- **Rôle** : Utilisateur
- **Statut** : Actif
- **Logique du mot de passe** : GXO + initiales (hm) + année (2026)

---

### 5. **Gabriel Nguidjol**
- **Email** : `gabriel.nguidjol@gxo.com`
- **Mot de passe** : `GXOgn2026`
- **Rôle** : Utilisateur
- **Statut** : Actif
- **Logique du mot de passe** : GXO + initiales (gn) + année (2026)

---

## 🔑 Format des Mots de Passe

**Structure** : `GXO` + `initiales` + `2026`

Cette structure permet de :
- ✅ Faciliter la mémorisation (GXO = entreprise, 2026 = année)
- ✅ Personnaliser chaque compte (initiales uniques)
- ✅ Rester simple pour une première connexion
- ✅ Être en rapport avec le site GXO Moissy Procédures

**Exemple** :
- Sonia Cornette → **S**onia **C**ornette → `GXOsc2026`
- Rocky Gussie → **R**ocky **G**ussie → `GXOrg2026`

---

## 📊 Structure de la Base de Données

### Table `users`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INTEGER | ID unique auto-incrémenté |
| `email` | TEXT | Email GXO (unique, clé de connexion) |
| `password` | TEXT | Mot de passe en clair |
| `nom` | TEXT | Nom de famille |
| `prenom` | TEXT | Prénom |
| `role` | TEXT | Rôle (user, chef, admin) |
| `statut` | TEXT | Statut (actif, inactif) |
| `dernier_login` | DATETIME | Date du dernier login |
| `created_at` | DATETIME | Date de création |
| `updated_at` | DATETIME | Date de modification |

### Table `user_sessions` (optionnel)

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INTEGER | ID unique |
| `user_id` | INTEGER | Référence vers users.id |
| `session_token` | TEXT | Token de session unique |
| `ip_address` | TEXT | Adresse IP de connexion |
| `user_agent` | TEXT | Navigateur utilisé |
| `expires_at` | DATETIME | Date d'expiration |
| `created_at` | DATETIME | Date de création |

---

## 🔒 Sécurité

### ⚠️ Important - Mots de Passe en Clair

**Attention** : Les mots de passe sont actuellement stockés **en clair** dans la base de données pour simplifier la phase de développement.

**Pour la production** :
1. ✅ **Hasher les mots de passe** avec bcrypt ou argon2
2. ✅ **Forcer le changement** du mot de passe à la première connexion
3. ✅ **Implémenter une politique** de complexité des mots de passe
4. ✅ **Ajouter la double authentification** (2FA) si nécessaire
5. ✅ **Logger les tentatives** de connexion échouées

### Exemple de Hash (à implémenter plus tard)

```javascript
// Au lieu de :
password: "GXOsc2026"

// Stocker un hash bcrypt :
password: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```

---

## 🚀 Prochaines Étapes

### Phase 1 : API d'Authentification (À Implémenter)

1. **Route de Login** : `POST /api/auth/login`
   - Vérifier email + mot de passe
   - Créer une session
   - Retourner un token

2. **Route de Logout** : `POST /api/auth/logout`
   - Invalider le token
   - Supprimer la session

3. **Route de Profil** : `GET /api/auth/me`
   - Retourner les infos de l'utilisateur connecté

4. **Middleware d'Auth** : Protéger les routes sensibles
   - Chef d'équipe : `/chef-equipe`
   - Contrôleur : `/controleur`
   - Agent de quai : `/agent-quai`
   - Archives : `/archives`

### Phase 2 : Interface de Login (À Créer)

1. **Page de connexion** : `/login`
   - Formulaire email + mot de passe
   - Message d'erreur si échec
   - Redirection vers dashboard si succès

2. **Redirection automatique** :
   - Si non connecté → `/login`
   - Si connecté → page demandée

3. **Gestion des sessions** :
   - Cookies HTTP-only
   - Durée de vie : 8 heures
   - Renouvellement automatique

---

## 📝 Commandes Utiles

### Requêtes SQL pour la Gestion des Utilisateurs

```sql
-- Lister tous les utilisateurs
SELECT email, nom, prenom, role, statut FROM users;

-- Chercher un utilisateur par email
SELECT * FROM users WHERE email = 'sonia.cornette@gxo.com';

-- Mettre à jour le dernier login
UPDATE users 
SET dernier_login = CURRENT_TIMESTAMP 
WHERE email = 'sonia.cornette@gxo.com';

-- Changer le statut d'un utilisateur
UPDATE users 
SET statut = 'inactif' 
WHERE email = 'rocky.gussie@gxo.com';

-- Changer le mot de passe
UPDATE users 
SET password = 'NouveauMDP2026', updated_at = CURRENT_TIMESTAMP 
WHERE email = 'marius.dumitru@gxo.com';

-- Ajouter un nouvel utilisateur
INSERT INTO users (email, password, nom, prenom, role, statut)
VALUES ('nouveau@gxo.com', 'GXOxx2026', 'Nom', 'Prenom', 'user', 'actif');

-- Supprimer un utilisateur
DELETE FROM users WHERE email = 'ancien@gxo.com';
```

### Commandes Wrangler D1

```bash
# Voir tous les utilisateurs (local)
npx wrangler d1 execute gxo-chauffeurs-db --local \
  --command="SELECT email, nom, prenom, role FROM users"

# Voir tous les utilisateurs (production)
npx wrangler d1 execute gxo-chauffeurs-db --remote \
  --command="SELECT email, nom, prenom, role FROM users"

# Appliquer la migration en production
npx wrangler d1 execute gxo-chauffeurs-db --remote \
  --file=./migrations/0019_add_users_authentication.sql
```

---

## 📧 Communication des Identifiants

### Email de Bienvenue (Modèle)

```
Objet : Accès à la Plateforme GXO Moissy Procédures

Bonjour [Prénom],

Votre compte sur la plateforme GXO Moissy Procédures a été créé.

Identifiants de connexion :
- Email : [email]
- Mot de passe : [password]

URL de connexion : https://gxomoissyprocedures.pages.dev/login

⚠️ Important :
- Vous devrez changer votre mot de passe lors de votre première connexion
- Ne partagez jamais vos identifiants
- Contactez l'IT en cas de problème

Cordialement,
L'équipe GXO Moissy
```

---

## 🎯 Résumé

✅ **5 utilisateurs créés** avec des mots de passe faciles à retenir  
✅ **Structure simple** : GXO + initiales + 2026  
✅ **Base de données prête** : Table `users` et `user_sessions`  
✅ **Migration appliquée** : En local (à appliquer en production)  
✅ **Documentation complète** : Tous les détails pour la gestion future  

**Prochaine étape** : Implémenter les routes d'authentification et la page de login.

---

**Créé le** : 2 juin 2026  
**Par** : Assistant GenSpark AI  
**Projet** : GXO Moissy Procédures v3.13.5
