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

### 4️⃣ Inscription (12 langues)
**Format d'URL** : `https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang={code}`

| Langue | URL Directe |
|--------|-------------|
| 🇫🇷 Français | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=fr |
| 🇳🇱 Néerlandais | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=nl |
| 🇩🇪 Allemand | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=de |
| 🇮🇹 Italien | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=it |
| 🇧🇬 Bulgare | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=bg |
| 🇨🇿 Tchèque | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=cs |
| 🇩🇰 Danois | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=da |
| 🇫🇮 Finnois | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=fi |
| 🇭🇷 Croate | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=hr |
| 🇵🇱 Polonais | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=pl |
| 🇵🇹 Portugais | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=pt |
| 🇷🇴 Roumain | https://gxo-moissy-v2.pages.dev/chauffeur/inscription?lang=ro |

**Formulaire simplifié** :
- Pseudo/Nom du chauffeur
- Entreprise
- Numéro de quai (sélection 1-30)
- Aucun champ obligatoire

### 5️⃣ Tâches en Temps Réel (12 langues)
**Format d'URL** : `https://gxo-moissy-v2.pages.dev/chauffeur/taches?id={chauffeur_id}&lang={code}`

**Exemple** : https://gxo-moissy-v2.pages.dev/chauffeur/taches?id=6&lang=fr

**Fonctionnalités** :
- ✅ Affichage des 5 tâches EPI avec icônes colorées
- ✅ Validation immédiate par tâche (animation + badge vert)
- ✅ Barre de progression temps réel (0% → 100%)
- ✅ Chat support bidirectionnel avec badge de messages non lus
- ✅ Auto-refresh toutes les 5 secondes
- ✅ Message de félicitations à 100%

**Les 5 Tâches** :
1. 🦺 **EPI Porté** - Gilet et chaussures de sécurité
2. 🚚 **Placement à Quai** - Véhicule correctement positionné
3. 📦 **Échange de Palettes** - Palettes échangées si nécessaire
4. 🔔 **Accueil Notifié** - Informations transmises à l'accueil
5. 🔑 **Clés Remises** - Clés confiées à l'agent de quai

### 6️⃣ Dashboard Admin - Accueil Chauffeur
**https://gxo-moissy-v2.pages.dev/accueil-chauffeur**

**Fonctionnalités** :
- ✅ Liste des chauffeurs actifs en temps réel
- ✅ Avatar + nom + entreprise + numéro de quai
- ✅ Barre de progression colorée par chauffeur
- ✅ 5 icônes de tâches avec statut (complété/en attente)
- ✅ Badge "En ligne/Hors ligne"
- ✅ Bouton "Chat" avec compteur de messages non lus
- ✅ Bouton "Clôturer" pour terminer un chauffeur
- ✅ Auto-refresh toutes les 5 secondes
- ✅ Statistiques en temps réel (Total, Prêts, En cours)

## 📱 Fonctionnalités

### Pour les chauffeurs
- ✅ **Consignes de sécurité multilingues** (12 langues: FR, NL, DE, IT, BG, CS, DA, FI, HR, PL, PT, RO)
- ✅ **Interface responsive** avec design moderne et animations
- ✅ **Fichiers HTML statiques** ultra-rapides (servis via CDN Cloudflare)
- ✅ **Support parfait** sur iPhone/Android
- ✅ **Inscription simplifiée** (pseudo, entreprise, quai 1-30)
- ✅ **Page des tâches en temps réel** avec 5 tâches EPI
- ✅ **Validation immédiate** avec animation et badge vert
- ✅ **Barre de progression** dynamique (0% → 100%)
- ✅ **Chat support bidirectionnel** avec l'équipe GXO
- ✅ **Badge de messages non lus** avec compteur
- ✅ **Auto-refresh** toutes les 5 secondes

### Pour les administrateurs
- ✅ **Dashboard temps réel** des chauffeurs actifs
- ✅ **Suivi de progression** individuel par chauffeur
- ✅ **Chat bidirectionnel** avec les chauffeurs
- ✅ **Badge de messages non lus** par chauffeur
- ✅ **Clôture des missions** avec bouton dédié
- ✅ **Statistiques en direct** (Total, Prêts, En cours)
- ✅ **Auto-refresh** toutes les 5 secondes
- ✅ **Base de données D1** (Cloudflare) pour persistence

### Pour l'accueil
- ✅ **Interface d'accueil simplifiée**
- ✅ **Gestion des arrivées**
- ✅ **Documentation disponible**

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

## 🌐 APIs Disponibles

### Chauffeur
- **GET** `/api/chauffeur/progression?id={chauffeur_id}` - Récupérer la progression d'un chauffeur
- **POST** `/api/chauffeur/valider-tache` - Valider une tâche
  - Body: `{"chauffeur_id": 1, "tache": "task_epi_porte"}`
- **GET** `/api/chauffeur/chat?id={chauffeur_id}` - Récupérer les messages chat
- **POST** `/api/chauffeur/chat` - Envoyer un message
  - Body: `{"chauffeur_id": 1, "message": "Bonjour"}`
- **POST** `/api/chauffeur/chat/mark-read` - Marquer les messages comme lus
- **POST** `/api/chauffeur/inscription` - Inscrire un nouveau chauffeur
  - Body: `{"pseudo": "Jean", "entreprise": "Transport", "numero_quai": "Q15", "langue": "fr"}`

### Admin
- **GET** `/api/chauffeur/liste` - Liste des chauffeurs actifs
- **POST** `/api/admin/cloturer-chauffeur` - Clôturer un chauffeur
  - Body: `{"chauffeur_id": 1}`

### Tests Production
Toutes les APIs sont testées et fonctionnelles :
```bash
# Test liste chauffeurs
curl "https://gxo-moissy-v2.pages.dev/api/chauffeur/liste"

# Test progression
curl "https://gxo-moissy-v2.pages.dev/api/chauffeur/progression?id=1"

# Test validation tâche
curl -X POST "https://gxo-moissy-v2.pages.dev/api/chauffeur/valider-tache" \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 1, "tache": "task_epi_porte"}'

# Test chat
curl -X POST "https://gxo-moissy-v2.pages.dev/api/chauffeur/chat" \
  -H "Content-Type: application/json" \
  -d '{"chauffeur_id": 1, "message": "Bonjour"}'
```

## 📄 Documentation

- [Déploiement Production Réussi](./DEPLOIEMENT_PRODUCTION_SUCCESS.md) - ✅ Tests complets et validation
- [Corrections Appliquées](./CORRECTIONS_APPLIQUEES.md) - Détail de tous les bugs corrigés
- [Debug Status](./DEBUG_STATUS.md) - Historique du debugging
- [Workflow Chauffeur Deploy](./WORKFLOW_CHAUFFEUR_DEPLOY.md) - Documentation du workflow complet
- [Guide de déploiement automatique](./DEPLOIEMENT_AUTOMATIQUE_GITHUB.md)
- [Configuration des secrets](./SECRETS_GITHUB_GUIDE.md)
- [Migration finale - Succès](./MIGRATION_FINALE_SUCCESS.md)
- [Solution Error 1101](./DIAGNOSTIC_ERROR_1101.md)

## 🎯 Statut

- ✅ Projet créé sur Cloudflare (gxo-moissy-v2)
- ✅ 12 langues de consignes fonctionnelles
- ✅ 12 langues pour inscription et tâches
- ✅ Build optimisé (251.28 KB)
- ✅ Base de données D1 configurée et fonctionnelle
- ✅ Déployé en production
- ✅ 6 chauffeurs actifs en production
- ✅ Toutes les APIs testées et fonctionnelles
- ✅ Chat bidirectionnel opérationnel
- ✅ Validation des tâches avec animations
- ✅ Dashboard admin temps réel

## 📊 Statistiques de Performance

- **Bundle Worker**: 251.28 KB (optimisé)
- **Fichiers statiques**: 12 fichiers HTML (~7 KB chacun)
- **Temps de chargement**: < 100ms (CDN Cloudflare)
- **Compatibilité**: 100% mobile et desktop
- **Auto-refresh**: 5 secondes
- **Chauffeurs actifs**: 6 en production
- **APIs**: 100% fonctionnelles
- **Error 1101**: ✅ RÉSOLU

## 📞 Support

Pour toute question ou problème, consultez les guides de documentation dans le dépôt.

---

**Dernière mise à jour :** 13 février 2026  
**Version :** 13.0.0 - Workflow Chauffeur Complet  
**Statut :** ✅ Production - 100% Fonctionnel + Chat + Dashboard Temps Réel  
**Déploiement :** https://gxo-moissy-v2.pages.dev  
**Chauffeurs Actifs :** 6 en production
