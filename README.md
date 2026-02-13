# GXO Procedures Moissy

Application de formation et gestion pour les chauffeurs GXO Logistics - Site de Moissy-Cramayel.

## 🌐 URLs

- **Production**: https://gxo-moissy-v2.pages.dev
- **GitHub Code**: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy
- **GitHub Assets**: https://github.com/ayoubdil1972-stack/gxo-video-assets
- **Cloudflare Dashboard**: https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-moissy-v2

## 🚗 Workflow Chauffeur - URLs Principales

### 1️⃣ QR Code d'accueil
**https://gxo-moissy-v2.pages.dev/qrcode-chauffeur**
- Point d'entrée pour les chauffeurs
- Scanner le QR code pour accéder au système

### 2️⃣ Sélection de langue
**https://gxo-moissy-v2.pages.dev/chauffeur/langue**
- Interface de choix de langue (12 langues disponibles)
- Redirige vers les consignes dans la langue choisie

### 3️⃣ Consignes de sécurité (12 langues)

**Format d'URL** : `https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang={code}`

| Langue | Code | URL Directe |
|--------|------|-------------|
| 🇫🇷 Français | `fr` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fr |
| 🇳🇱 Néerlandais | `nl` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=nl |
| 🇩🇪 Allemand | `de` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=de |
| 🇮🇹 Italien | `it` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=it |
| 🇧🇬 Bulgare | `bg` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=bg |
| 🇨🇿 Tchèque | `cs` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=cs |
| 🇩🇰 Danois | `da` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=da |
| 🇫🇮 Finnois | `fi` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=fi |
| 🇭🇷 Croate | `hr` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=hr |
| 🇵🇱 Polonais | `pl` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=pl |
| 🇵🇹 Portugais | `pt` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=pt |
| 🇷🇴 Roumain | `ro` | https://gxo-moissy-v2.pages.dev/chauffeur/consignes?lang=ro |

### 4️⃣ Inscription
**https://gxo-moissy-v2.pages.dev/chauffeur/inscription**
- Formulaire d'inscription du chauffeur
- Collecte des informations (pseudo, entreprise, numéro de quai, langue)

### 5️⃣ Tâches
**https://gxo-moissy-v2.pages.dev/chauffeur/taches?id={chauffeur_id}**
- Liste des tâches à effectuer
- Validation des tâches

### 6️⃣ Accueil Chauffeur (post-inscription)
**https://gxo-moissy-v2.pages.dev/accueil-chauffeur**
- Page d'accueil après inscription
- Accès aux fonctionnalités

## 📱 Fonctionnalités

### Pour les chauffeurs
- ✅ Consignes de sécurité multilingues (12 langues: FR, NL, DE, IT, BG, CS, DA, FI, HR, PL, PT, RO)
- ✅ Interface responsive avec design moderne
- ✅ Fichiers HTML statiques ultra-rapides (servis via CDN Cloudflare)
- ✅ Support parfait sur iPhone/Android
- ✅ Inscription et gestion des tâches

### Pour les administrateurs
- ✅ Dashboard de gestion des chauffeurs
- ✅ Attribution des tâches
- ✅ Suivi des validations
- ✅ Base de données D1 (Cloudflare)

### Pour l'accueil
- ✅ Interface d'accueil simplifiée
- ✅ Gestion des arrivées
- ✅ Documentation disponible

## 🚀 Déploiement

Le site est déployé sur Cloudflare Pages.

### Configuration requise
- Node.js 20+
- npm 10+

### Déploiement manuel
```bash
npm run deploy:prod
```

## 🛠️ Technologies

- **Backend**: Hono (TypeScript)
- **Frontend**: HTML statique avec Tailwind CSS (CDN)
- **Base de données**: Cloudflare D1 (SQLite)
- **Hébergement**: Cloudflare Pages
- **CDN**: Cloudflare global network

## 📦 Structure

```
webapp/
├── src/
│   ├── index.tsx              # Application Hono principale
│   ├── pages/                 # Pages TSX
│   │   ├── chauffeur-langue.tsx
│   │   ├── chauffeur-inscription.tsx
│   │   └── ...
│   ├── services/              # Services (traduction, etc.)
│   └── config/                # Configuration
├── public/
│   ├── consignes/             # 12 fichiers HTML statiques (FR, NL, DE, IT, BG, CS, DA, FI, HR, PL, PT, RO)
│   └── static/
│       ├── images/            # Logos et images
│       └── *.js               # Scripts frontend
├── migrations/                # Migrations D1 (base de données)
├── dist/                      # Build output (généré)
│   ├── _worker.js             # Worker Cloudflare compilé
│   ├── _routes.json           # Configuration des routes
│   └── consignes/             # Fichiers HTML statiques copiés
├── generate-consignes.cjs     # Script de génération des pages HTML
├── wrangler.jsonc             # Configuration Cloudflare
└── package.json
```

## 📱 Test sur iPhone/Android

Toutes les pages de consignes sont optimisées pour mobile et testées sur :
- ✅ iPhone 12 et versions ultérieures
- ✅ Appareils Android
- ✅ Tablettes

**Résultat attendu** :
- ✅ Design responsive avec Tailwind CSS
- ✅ Logo GXO visible
- ✅ Contenu lisible et bien formaté
- ✅ Bouton "J'ai lu et compris les consignes" cliquable
- ✅ Support parfait des caractères spéciaux (12 langues)

## 🔧 Développement local

```bash
# Installation des dépendances
npm install

# Build
npm run build

# Démarrage du serveur local
npm run dev:sandbox
```

## 📄 Documentation

- [Guide de déploiement automatique](./DEPLOIEMENT_AUTOMATIQUE_GITHUB.md)
- [Configuration des secrets](./SECRETS_GITHUB_GUIDE.md)
- [Migration finale - Succès](./MIGRATION_FINALE_SUCCESS.md)
- [Solution Error 1101](./DIAGNOSTIC_ERROR_1101.md)

## 🎯 Statut

- ✅ Projet créé sur Cloudflare (gxo-moissy-v2)
- ✅ 12 langues de consignes fonctionnelles
- ✅ Build optimisé (231.42 KB)
- ✅ Base de données D1 configurée
- ✅ Déployé en production

## 📊 Statistiques de Performance

- **Bundle Worker**: 231.42 KB (optimisé)
- **Fichiers statiques**: 12 fichiers HTML (~7 KB chacun)
- **Temps de chargement**: < 100ms (CDN Cloudflare)
- **Compatibilité**: 100% mobile et desktop
- **Error 1101**: ✅ RÉSOLU

## 📞 Support

Pour toute question ou problème, consultez les guides de documentation dans le dépôt.

---

**Dernière mise à jour :** 13 février 2026  
**Version :** 12.1.2  
**Statut :** ✅ Production - 100% Fonctionnel
