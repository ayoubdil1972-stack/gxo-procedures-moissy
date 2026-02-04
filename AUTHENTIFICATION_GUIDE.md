# 🔐 Système d'Authentification GXO - Guide de Configuration

**Version** : 2.9  
**Date** : 4 février 2026  
**Statut** : ✅ OPÉRATIONNEL

---

## 🎯 Vue d'ensemble

Le système d'authentification sécurisé protège l'accès au HUB Procédures GXO Moissy-Cramayel avec :

- ✅ Page de connexion avec logo GXO
- ✅ Authentification par identifiant et mot de passe
- ✅ Session sécurisée (8 heures)
- ✅ Protection contre les attaques par force brute (5 tentatives max)
- ✅ Verrouillage temporaire (15 minutes après 5 échecs)
- ✅ Déconnexion sécurisée
- ✅ Affichage du nom d'utilisateur connecté

---

## 🔑 Identifiants par Défaut

### ⚠️ IMPORTANT : IDENTIFIANTS DE DÉMONSTRATION

**Ces identifiants sont à usage de test uniquement. CHANGEZ-LES IMMÉDIATEMENT EN PRODUCTION !**

### 👤 Comptes disponibles

| Rôle | Identifiant | Mot de passe | Description |
|------|-------------|--------------|-------------|
| **Administrateur** | `gxo.admin` | `GXO2026!Moissy` | Accès complet |
| **Utilisateur** | `gxo.user` | `GXO@Moissy2026` | Accès standard |
| **Chef d'équipe** | `chef.equipe` | `ChefGXO2026!` | Accès manager |

---

## 🛡️ Sécurité Implémentée

### Protection contre les attaques

1. **Limitation des tentatives**
   - Maximum 5 tentatives échouées
   - Verrouillage automatique pendant 15 minutes
   - Compteur de tentatives affiché

2. **Protection des données**
   - Mots de passe jamais affichés en clair
   - Session encodée en Base64 (LocalStorage)
   - Délai de 500ms entre tentatives (anti-bruteforce)

3. **Gestion de session**
   - Durée : 8 heures
   - Vérification automatique sur chaque page
   - Redirection vers /login si session expirée
   - Option "Se souvenir de moi"

4. **Interface sécurisée**
   - Toggle pour afficher/masquer le mot de passe
   - Messages d'erreur informatifs
   - Animation shake en cas d'erreur
   - Badge de connexion sécurisée

---

## 📂 Fichiers du Système d'Authentification

### Frontend

```
src/pages/login.tsx          # Page de connexion
src/login-renderer.tsx       # Layout spécifique login
public/static/auth.js        # Logique d'authentification
```

### Backend

```
src/index.tsx                # Routes et middleware d'authentification
```

---

## 🔧 Configuration Personnalisée

### Modifier les identifiants (PRODUCTION)

Éditez le fichier `/home/user/webapp/public/static/auth.js` :

```javascript
const AUTH_CONFIG = {
  credentials: [
    { 
      username: 'votre.identifiant', 
      password: 'VotreMotDePasse123!', 
      role: 'admin', 
      name: 'Votre Nom' 
    },
    // Ajoutez d'autres utilisateurs ici
  ],
  sessionDuration: 8 * 60 * 60 * 1000, // 8 heures
  maxAttempts: 5,
  lockoutDuration: 15 * 60 * 1000 // 15 minutes
};
```

### Bonnes pratiques pour les mots de passe

✅ **À FAIRE :**
- Minimum 12 caractères
- Majuscules + minuscules + chiffres + symboles
- Unique par utilisateur
- Changement régulier (tous les 3 mois)

❌ **À ÉVITER :**
- Mots de passe par défaut
- Informations personnelles
- Mots du dictionnaire
- Répétition de caractères

---

## 🚀 Utilisation

### Pour les utilisateurs

1. **Se connecter**
   - Aller sur https://gxo-procedures-moissy.pages.dev/login
   - Entrer identifiant et mot de passe
   - Cocher "Se souvenir de moi" (optionnel)
   - Cliquer sur "Se connecter"

2. **Naviguer**
   - Accès à toutes les pages après connexion
   - Session valide pendant 8 heures
   - Nom d'utilisateur affiché dans le header

3. **Se déconnecter**
   - Cliquer sur le nom d'utilisateur dans le header
   - Confirmer la déconnexion

### Messages d'erreur

| Message | Signification | Action |
|---------|---------------|--------|
| "Identifiant ou mot de passe incorrect" | Identifiants invalides | Vérifier vos identifiants |
| "Compte temporairement verrouillé" | 5 tentatives échouées | Attendre 15 minutes |
| "Session expirée" | Session de plus de 8h | Se reconnecter |

---

## 🔒 Sécurité Avancée (Recommandations Production)

### ⚠️ Limitations actuelles (LocalStorage)

Le système actuel utilise **LocalStorage** côté client :
- ✅ Simple à mettre en place
- ✅ Fonctionne sans backend complexe
- ⚠️ Les données sont accessibles côté client
- ⚠️ Pas de vérification serveur

### 🚀 Recommandations pour la production

Pour une sécurité maximale, implémentez :

1. **Backend API avec authentification**
   - Base de données pour les utilisateurs
   - Hachage des mots de passe (bcrypt)
   - Tokens JWT signés côté serveur
   - Cookies HTTPOnly + Secure + SameSite

2. **Intégration Cloudflare**
   - Cloudflare Access (SSO)
   - Cloudflare Workers KV pour les sessions
   - Cloudflare D1 pour la base utilisateurs

3. **Fonctionnalités supplémentaires**
   - Authentification multi-facteurs (2FA)
   - Récupération de mot de passe par email
   - Logs des connexions
   - Rôles et permissions granulaires
   - Audit des accès

---

## 📊 Stockage des Données (LocalStorage)

### Clés utilisées

```javascript
// Session active
localStorage.getItem('gxo_session')
// Format: base64(JSON)
{
  username: "gxo.admin",
  role: "admin",
  name: "Administrateur",
  loginTime: 1707048000000,
  expires: 1707076800000
}

// État de verrouillage
localStorage.getItem('gxo_lockout')
{
  attempts: 0,
  lockedUntil: null
}

// Option "Se souvenir de moi"
localStorage.getItem('gxo_remember')
```

---

## 🧪 Tests

### Test des identifiants

1. **Test connexion réussie**
   ```
   Identifiant: gxo.admin
   Mot de passe: GXO2026!Moissy
   Résultat attendu: Redirection vers /
   ```

2. **Test identifiants incorrects**
   ```
   Identifiant: mauvais
   Mot de passe: incorrect
   Résultat attendu: Message "Identifiant ou mot de passe incorrect"
   Tentatives restantes: 4
   ```

3. **Test verrouillage**
   ```
   5 tentatives échouées consécutives
   Résultat attendu: "Compte temporairement verrouillé"
   Durée: 15 minutes
   ```

4. **Test expiration session**
   ```
   Modifier manuellement la date d'expiration dans LocalStorage
   Naviguer vers une page
   Résultat attendu: Redirection vers /login
   ```

---

## 🐛 Dépannage

### Problème : Impossible de se connecter

**Solutions :**
1. Vérifier les identifiants (sensibles à la casse)
2. Vider le cache du navigateur
3. Effacer LocalStorage : `localStorage.clear()`
4. Vérifier que JavaScript est activé

### Problème : Compte verrouillé

**Solutions :**
1. Attendre 15 minutes
2. Ou effacer manuellement : `localStorage.removeItem('gxo_lockout')`

### Problème : Session expirée trop rapidement

**Solution :**
Modifier la durée dans `auth.js` :
```javascript
sessionDuration: 12 * 60 * 60 * 1000 // 12 heures au lieu de 8
```

---

## 📞 Support

### En cas de problème

1. **Oubli de mot de passe**
   - Contacter votre administrateur système
   - Réinitialisation manuelle nécessaire

2. **Besoin d'un nouveau compte**
   - Demander à l'administrateur
   - Ajout dans `auth.js` (fichier de configuration)

3. **Problèmes techniques**
   - Vérifier la console du navigateur (F12)
   - Consulter les logs PM2

---

## 🔄 Mise à Jour des Identifiants

### Procédure

1. **Éditer le fichier de configuration**
   ```bash
   cd /home/user/webapp
   nano public/static/auth.js
   ```

2. **Modifier la section `AUTH_CONFIG.credentials`**
   ```javascript
   credentials: [
     { 
       username: 'nouveau.user', 
       password: 'NouveauMotDePasse2026!', 
       role: 'user', 
       name: 'Nouveau Utilisateur' 
     }
   ]
   ```

3. **Rebuild et redémarrer**
   ```bash
   npm run build
   pm2 restart gxo-procedures-moissy
   ```

4. **Tester les nouveaux identifiants**
   ```bash
   curl http://localhost:3000/login
   ```

---

## ✅ Checklist de Sécurité Production

Avant le déploiement en production :

- [ ] Changer TOUS les identifiants par défaut
- [ ] Utiliser des mots de passe forts (12+ caractères)
- [ ] Supprimer les identifiants de test
- [ ] Configurer HTTPS obligatoire
- [ ] Activer les logs de connexion
- [ ] Tester le verrouillage après 5 tentatives
- [ ] Vérifier l'expiration de session
- [ ] Former les utilisateurs
- [ ] Documenter les procédures d'urgence
- [ ] Planifier les changements de mots de passe

---

## 📝 Notes Importantes

⚠️ **ATTENTION :**
- Les identifiants par défaut sont publics dans cette documentation
- ILS DOIVENT ÊTRE CHANGÉS IMMÉDIATEMENT EN PRODUCTION
- Ne jamais partager les mots de passe par email ou messagerie
- Utiliser un gestionnaire de mots de passe sécurisé

✅ **RECOMMANDATIONS :**
- Changez les mots de passe tous les 3 mois
- Utilisez des mots de passe uniques pour chaque utilisateur
- Activez l'option "Se souvenir de moi" uniquement sur appareil personnel
- Déconnectez-vous après chaque session

---

**Version 2.9 - Système d'Authentification Sécurisé** 🔐
