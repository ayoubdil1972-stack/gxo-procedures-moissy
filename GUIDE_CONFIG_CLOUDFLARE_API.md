# 🔑 GUIDE CONFIGURATION CLOUDFLARE API KEY

## 📋 Étapes Détaillées (5 minutes)

### Étape 1 : Accéder au Dashboard Cloudflare

1. **Ouvrir le dashboard Cloudflare** :
   - URL : https://dash.cloudflare.com
   - Se connecter avec vos identifiants

2. **Aller dans la section API Tokens** :
   - Cliquer sur votre profil (en haut à droite)
   - Sélectionner **"My Profile"**
   - Dans le menu de gauche, cliquer sur **"API Tokens"**
   - URL directe : https://dash.cloudflare.com/profile/api-tokens

---

### Étape 2 : Créer un Nouveau Token API

1. **Cliquer sur "Create Token"** (bouton bleu)

2. **Sélectionner le template "Edit Cloudflare Workers"** :
   - Ou cliquer sur **"Create Custom Token"** pour plus de contrôle

3. **Configurer les permissions** :
   
   **Permissions requises** :
   ```
   Account → Cloudflare Pages → Edit
   Account → D1 → Edit
   Account → Workers Scripts → Edit
   ```

   **Configuration détaillée** :
   - **Token name** : `gxo-procedures-deployment`
   - **Permissions** :
     - Account | Cloudflare Pages | Edit
     - Account | D1 | Edit
     - Account | Workers Scripts | Edit
   - **Account Resources** :
     - Include | Specific account | [Votre compte]
   - **Zone Resources** : All zones (ou spécifique si vous préférez)
   - **Client IP Address Filtering** : (laisser vide)
   - **TTL** : (laisser par défaut ou définir une date d'expiration)

4. **Cliquer sur "Continue to summary"**

5. **Vérifier le résumé** et cliquer sur **"Create Token"**

---

### Étape 3 : Copier le Token

⚠️ **IMPORTANT** : Le token ne sera affiché qu'une seule fois !

1. **Copier le token affiché** (commence par `ey...` ou similaire)
   - Il ressemble à : `ey1234567890abcdefghijklmnopqrstuvwxyz...`
   - Cliquer sur l'icône "Copy" à côté du token

2. **Sauvegarder le token** dans un endroit sûr temporairement :
   - Vous en aurez besoin pour l'étape suivante
   - **NE PAS** le partager publiquement
   - **NE PAS** le commiter dans Git

---

### Étape 4 : Configurer dans l'Interface AI

1. **Retourner dans cette interface**

2. **Aller dans l'onglet "Deploy"** (dans la barre latérale)

3. **Section "Cloudflare Configuration"** :
   - Trouver le champ **"Cloudflare API Token"**
   - Coller votre token copié
   - Cliquer sur **"Save"** ou **"Valider"**

---

### Étape 5 : Vérification

Une fois le token configuré, vous verrez un message de confirmation :
```
✅ Cloudflare API Key configured successfully
```

---

## 🔐 Sécurité du Token

### ✅ Bonnes pratiques :

- ✅ Créer un token avec les permissions minimales nécessaires
- ✅ Définir une date d'expiration (ex: 1 an)
- ✅ Ne jamais partager le token publiquement
- ✅ Ne jamais commiter le token dans Git
- ✅ Stocker le token dans un gestionnaire de mots de passe

### ❌ À éviter :

- ❌ Utiliser votre "Global API Key" (trop de permissions)
- ❌ Partager le token par email/chat non sécurisé
- ❌ Laisser le token sans date d'expiration
- ❌ Donner plus de permissions que nécessaire

---

## 🆘 Dépannage

### Problème : "Le token ne fonctionne pas"

**Solutions** :
1. Vérifier que les 3 permissions sont bien activées :
   - Cloudflare Pages → Edit ✅
   - D1 → Edit ✅
   - Workers Scripts → Edit ✅

2. Vérifier que le compte est bien sélectionné dans "Account Resources"

3. Attendre 1-2 minutes (propagation du token)

4. Re-créer un nouveau token si nécessaire

### Problème : "Token expiré"

**Solution** :
1. Retourner sur https://dash.cloudflare.com/profile/api-tokens
2. Supprimer l'ancien token
3. Créer un nouveau token en suivant les étapes ci-dessus

### Problème : "Permissions insuffisantes"

**Solution** :
1. Modifier le token existant (bouton "Edit" sur le dashboard)
2. Ajouter les permissions manquantes
3. Sauvegarder les modifications

---

## 📸 Captures d'Écran Attendues

### 1. Page API Tokens
Vous devriez voir :
- Liste de vos tokens existants
- Bouton bleu "Create Token"
- Templates suggérés

### 2. Configuration du Token
Vous devriez voir :
- Champs de permissions (Account, Zone, User)
- Dropdown pour sélectionner les ressources
- Section "Account Resources" avec votre compte

### 3. Token Créé
Vous devriez voir :
- Le token en clair (une seule fois)
- Bouton "Copy" pour copier
- Avertissement que le token ne sera plus affiché

---

## 🚀 Après la Configuration

Une fois le token configuré avec succès, je pourrai :

1. ✅ Déployer automatiquement sur Cloudflare Pages
2. ✅ Appliquer les migrations D1
3. ✅ Gérer les variables d'environnement
4. ✅ Monitorer les déploiements

**Temps total estimé** : 5 minutes ⏱️

---

## 🔗 Liens Utiles

- **Dashboard Cloudflare** : https://dash.cloudflare.com
- **API Tokens** : https://dash.cloudflare.com/profile/api-tokens
- **Documentation Cloudflare API** : https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
- **Permissions requises** : https://developers.cloudflare.com/workers/wrangler/ci-cd/#authentication

---

## ✅ Checklist Rapide

Avant de continuer, assurez-vous que :

- [ ] Vous êtes connecté à https://dash.cloudflare.com
- [ ] Vous avez accès à la section "API Tokens"
- [ ] Vous avez créé un token avec les 3 permissions requises
- [ ] Vous avez copié le token (commence par `ey...`)
- [ ] Vous êtes prêt à coller le token dans l'onglet "Deploy"

---

**Prêt ? Allez dans l'onglet "Deploy" et collez votre token ! 🚀**

Je serai notifié automatiquement une fois que vous aurez sauvegardé le token, et je lancerai immédiatement le déploiement en production.
