# 🚀 Guide de Déploiement en Production

## 📋 Statut Actuel

### ✅ Code Prêt pour Production
- **Branche** : main
- **Derniers commits** : 5 commits incluant les 5 utilisateurs GXO
- **Build** : À jour (dist/ construit le 3 août 2026 à 08:48)
- **Tests** : Validation complète effectuée

### 👥 Nouveaux Utilisateurs Inclus
Les 5 utilisateurs GXO suivants sont prêts à être déployés :

| Email | Mot de passe | Rôle | Nom |
|-------|--------------|------|-----|
| sonia.cornette@gxo.com | GXOsc2026 | chef | Sonia Cornette |
| rocky.gussie@gxo.com | GXOrg2026 | user | Rocky Gussie |
| marius.dumitru@gxo.com | GXOmd2026 | user | Marius Dumitru |
| hassan.mounaim@gxo.com | GXOhm2026 | user | Hassan Mounaim |
| gabriel.nguidjol@gxo.com | GXOgn2026 | user | Gabriel Nguidjol |

### 🔧 Améliorations Techniques
- **Cache-busting** : Système `?v=1.1.0` actif
- **Version** : auth.js Version 1.1.0
- **Compatibilité** : Tous les navigateurs forcés à recharger la nouvelle version

---

## 🔐 Configuration Cloudflare API (REQUIS)

Pour déployer en production, vous devez d'abord configurer votre clé API Cloudflare.

### Étape 1 : Créer un Token Cloudflare

1. Connectez-vous à [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Allez dans **Mon profil** → **Tokens API**
3. Cliquez sur **Créer un token**
4. Configurez les permissions suivantes :
   - **Cloudflare Pages** : Modifier
   - **Account Settings** : Lire
5. Générez et **copiez le token** (vous ne pourrez plus le voir après)

### Étape 2 : Configurer dans GenSpark

1. Ouvrez l'onglet **Deploy** dans la barre latérale gauche
2. Collez votre token API Cloudflare
3. Enregistrez la configuration
4. Revenez dans le chat et dites "API configurée, déploie maintenant"

---

## 🚀 Commandes de Déploiement

Une fois la clé API configurée, utilisez ces commandes :

### Déploiement Standard
```bash
cd /home/user/webapp
npm run deploy:prod
```

### Déploiement Manuel avec Wrangler
```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name gxo-moissy-v2
```

### Vérification Post-Déploiement
```bash
# Vérifier que le déploiement est réussi
curl -s https://gxo-moissy-v2.pages.dev/static/auth.js | head -20

# Vérifier la version du fichier auth.js
curl -s https://gxo-moissy-v2.pages.dev/static/auth.js | grep "Version:"
```

---

## 📊 Configuration Cloudflare

### Informations du Projet
- **Nom du projet** : `gxo-moissy-v2`
- **Base de données D1** : `gxo-chauffeurs-db`
- **Database ID** : `28637bef-a644-4661-8cca-829f84058875`
- **Branche de production** : `main`

### Structure des Fichiers
```
webapp/
├── dist/               # Build de production (442KB)
│   ├── _worker.js     # Worker Cloudflare
│   ├── _routes.json   # Configuration des routes
│   └── static/
│       └── auth.js    # Fichier d'authentification (Version 1.1.0)
├── src/               # Code source
├── public/            # Assets statiques
└── wrangler.jsonc     # Configuration Cloudflare
```

---

## ✅ Checklist Pré-Déploiement

Avant de déployer, vérifiez que :

- [ ] La clé API Cloudflare est configurée dans l'onglet Deploy
- [ ] Tous les commits sont sur la branche main
- [ ] Le build est à jour (`npm run build`)
- [ ] Les 5 utilisateurs sont dans `public/static/auth.js`
- [ ] Le cache-busting `?v=1.1.0` est actif dans les renderers
- [ ] Aucun changement non commité (`git status` propre)

---

## 🔍 Vérification Post-Déploiement

Après le déploiement, testez :

### 1. Accès à la Page de Connexion
```
URL Production : https://gxo-moissy-v2.pages.dev/login
```

### 2. Test des Utilisateurs GXO
Connectez-vous avec chacun des 5 nouveaux comptes :
- sonia.cornette@gxo.com / GXOsc2026
- rocky.gussie@gxo.com / GXOrg2026
- marius.dumitru@gxo.com / GXOmd2026
- hassan.mounaim@gxo.com / GXOhm2026
- gabriel.nguidjol@gxo.com / GXOgn2026

### 3. Vérifier le Cache-Busting
Dans la console du navigateur (F12), vérifiez que :
```javascript
// La page charge auth.js avec le paramètre de version
// URL doit être : /static/auth.js?v=1.1.0

// Vérifier le nombre d'utilisateurs
AUTH_CONFIG.credentials.length  // Doit retourner 8
```

---

## 🐛 Dépannage

### Problème : "Authentication error"
**Solution** : Configurez la clé API Cloudflare dans l'onglet Deploy

### Problème : Les nouveaux utilisateurs ne fonctionnent pas après déploiement
**Solution** : Videz le cache du navigateur (Ctrl + Shift + R) ou utilisez une fenêtre privée

### Problème : "Invalid access token"
**Solution** : Vérifiez que votre token a les bonnes permissions :
- Cloudflare Pages : Modifier
- Account Settings : Lire

### Problème : Build échoue
**Solution** :
```bash
cd /home/user/webapp
rm -rf node_modules dist .wrangler
npm install
npm run build
```

---

## 📝 Historique des Commits

```
1868c8a - docs: Add comprehensive problem resolution documentation
2d9797f - fix: Add cache-busting version parameter (v=1.1.0)
7d0ed02 - fix: Add version number to auth.js to force browser cache refresh
e1eced8 - fix: Add 5 GXO users to frontend authentication system
c151b77 - feat: Add user authentication system with 5 GXO users
```

---

## 🔄 Mises à Jour Futures

Pour ajouter de nouveaux utilisateurs ou modifier auth.js :

1. Modifiez `public/static/auth.js`
2. **Incrémentez la version** : `Version: 1.2.0`
3. Mettez à jour les renderers avec la nouvelle version :
   - `src/login-renderer.tsx` : `?v=1.2.0`
   - `src/renderer.tsx` : `?v=1.2.0`
4. Build et commit :
   ```bash
   npm run build
   git add -A
   git commit -m "feat: Add new users (v1.2.0)"
   ```
5. Déployez en production

---

## 📞 Support

En cas de problème pendant le déploiement :

1. Vérifiez les logs Cloudflare : https://dash.cloudflare.com
2. Consultez `PROBLEM_RESOLUTION.md` pour les problèmes d'authentification
3. Vérifiez `USERS_AUTHENTICATION.md` pour la liste complète des utilisateurs

---

**Date de création** : 3 août 2026  
**Version du guide** : 1.0  
**Statut** : ⏳ En attente de configuration API Cloudflare
