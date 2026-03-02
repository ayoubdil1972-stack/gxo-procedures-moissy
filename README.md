# GXO Procedures Moissy

Application de formation et gestion pour les chauffeurs GXO Logistics - Site de Moissy-Cramayel.

**Version** : 18.0.0 - STABLE | **Date** : 2026-03-02

## 🎯 Fonctionnalités principales (v18.0.0)

### ✅ Checklist interactive sur page Réception uniquement
- **1 rubrique avec checklist interactive** : Réception
- **4 rubriques sans checklist** : Contrôleur, Agent Quai, Administrateur, Accueil Chauffeur
- **Modal avec liste d'étapes** : Affichage numéroté et détaillé sur Réception
- **Design cohérent** : Interface GXO avec icônes et couleurs
- **Responsive** : Fonctionne sur mobile et desktop
- **Stable** : Pas de problème de cache Cloudflare

### ✅ Chat bidirectionnel avec traduction automatique
- **Communication en temps réel** : Admin ↔ Chauffeur
- **Traduction automatique** : Italien ↔ Français (extensible à toutes les 12 langues)
- **Rafraîchissement automatique** : Messages apparaissent sans recharger
- **Badge compteur** : Nombre de messages non lus

### ✅ Système de statut en ligne/hors ligne
- **Heartbeat automatique** : Toutes les 5 secondes depuis la page chauffeur
- **Badge visuel** : 🟢 "En ligne" (vert) / "Hors ligne" (gris)
- **Mise à jour en temps réel** : Statut actualisé toutes les 2-5 secondes

### ✅ Gestion des tâches chauffeur
- **Version française simple et stable**
- **5 tâches EPI** : Port des équipements de protection individuelle
- **Validation immédiate** : Animation + badge vert
- **Barre de progression** : 0% → 100%
- **Message de félicitations** : À la complétion de toutes les tâches

### ✅ Procédures détaillées
Chaque rubrique dispose de procédures détaillées :
- **Réception** : 8 procédures **avec checklist interactive**
- **Contrôleur Qualité** : 5 procédures (sans checklist)
- **Agent de Quai** : 6 procédures (sans checklist)
- **Administrateur** : 5 procédures (sans checklist)
- **Accueil Chauffeur** : 4 procédures (sans checklist)

## 🌐 URLs

- **Production**: https://gxo-procedures-moissy.pages.dev
- **Production (alias)**: https://gxo-moissy-v2.pages.dev
- **GitHub Code**: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy
- **Sandbox Dev**: https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai

### 📋 Pages des procédures :
```
✅ https://gxo-moissy-v2.pages.dev/reception          ← CHECKLIST INTERACTIVE
✅ https://gxo-moissy-v2.pages.dev/controleur         ← Sans checklist
✅ https://gxo-moissy-v2.pages.dev/agent-quai         ← Sans checklist
✅ https://gxo-moissy-v2.pages.dev/administrateur     ← Sans checklist
✅ https://gxo-moissy-v2.pages.dev/accueil-chauffeur  ← Sans checklist
```

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

**Formulaire simplifié** :
- Pseudo/Nom du chauffeur
- Entreprise
- Numéro de quai (sélection 1-30)
- Aucun champ obligatoire

### 5️⃣ Tâches en Temps Réel (Version française)

**Format d'URL** : `https://gxo-moissy-v2.pages.dev/chauffeur/taches?id={chauffeur_id}`

**Exemple** : https://gxo-moissy-v2.pages.dev/chauffeur/taches?id=6

**Fonctionnalités** :
- ✅ Affichage des 5 tâches EPI avec icônes colorées
- ✅ Validation immédiate par tâche (animation + badge vert)
- ✅ Barre de progression temps réel (0% → 100%)
- ✅ **Chat support bidirectionnel** avec traduction automatique
- ✅ Badge de messages non lus sur le bouton chat
- ✅ **Heartbeat automatique** toutes les 5 secondes
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
- ✅ **Badge statut** : 🟢 "En ligne" (vert) / "Hors ligne" (gris)
- ✅ **Bouton Chat** avec compteur de messages non lus
- ✅ **Chat modal** : Envoi/réception messages avec traduction auto
- ✅ **Rafraîchissement** : Liste toutes les 5s, chat toutes les 2s
- ✅ Bouton "Clôturer" pour terminer un chauffeur
- ✅ Statistiques en temps réel (Total, Prêts, En cours)

## 📱 Fonctionnalités

### Pour les administrateurs (Intranet)
- ✅ **Checklist interactive sur Réception uniquement** : Modal détaillé avec 8 procédures
- ✅ **Gestion des procédures** : Réception, Contrôle, Agent Quai, Admin, Accueil
- ✅ **Documentation accessible** : Procédures détaillées étape par étape
- ✅ **Interface moderne** : Design GXO avec Tailwind CSS
- ✅ **Dashboard temps réel** des chauffeurs actifs
- ✅ **Chat bidirectionnel** avec les chauffeurs
- ✅ **Suivi de progression** individuel par chauffeur
- ✅ **Clôture des missions** avec bouton dédié

### Pour les chauffeurs
- ✅ **Consignes de sécurité multilingues** (12 langues)
- ✅ **Interface responsive** avec design moderne et animations
- ✅ **Fichiers HTML statiques** ultra-rapides (servis via CDN Cloudflare)
- ✅ **Support parfait** sur iPhone/Android
- ✅ **Inscription simplifiée** (pseudo, entreprise, quai 1-30)
- ✅ **Page des tâches en temps réel** avec 5 tâches EPI
- ✅ **Validation immédiate** avec animation et badge vert
- ✅ **Barre de progression** dynamique (0% → 100%)
- ✅ **Chat support bidirectionnel** avec l'équipe GXO
- ✅ **Auto-refresh** toutes les 5 secondes

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
│   │   ├── reception.tsx      # ✅ 8 procédures AVEC checklist interactive
│   │   ├── controleur.tsx     # 5 procédures sans checklist
│   │   ├── agent-quai.tsx     # 6 procédures sans checklist
│   │   ├── administrateur.tsx # 5 procédures sans checklist
│   │   ├── accueil-chauffeur.tsx  # 4 procédures sans checklist
│   │   ├── chauffeur-langue.tsx
│   │   ├── chauffeur-inscription.tsx
│   │   └── ...
│   ├── services/              # Services (traduction, etc.)
│   └── config/                # Configuration
├── public/
│   ├── consignes/             # 12 fichiers HTML statiques
│   └── static/
│       ├── app.js             # ✅ Fonction showChecklistInteractive()
│       ├── images/            # Logos et images
│       └── *.js               # Scripts frontend
├── migrations/                # Migrations D1 (base de données)
├── dist/                      # Build output (généré)
│   ├── _worker.js             # Worker Cloudflare compilé (245.72 kB)
│   ├── _routes.json           # Configuration des routes
│   └── consignes/             # Fichiers HTML statiques copiés
├── wrangler.jsonc             # Configuration Cloudflare
└── package.json
```

## 📱 Test sur iPhone/Android

Toutes les pages sont optimisées pour mobile et testées sur :
- ✅ iPhone 12 et versions ultérieures
- ✅ Appareils Android
- ✅ Tablettes

**Résultat attendu** :
- ✅ Design responsive avec Tailwind CSS
- ✅ Logo GXO visible
- ✅ Contenu lisible et bien formaté
- ✅ Checklist interactive fonctionnelle sur page Réception
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
- **GET** `/api/chauffeur/chat?id={chauffeur_id}` - Récupérer les messages chat
- **POST** `/api/chauffeur/chat` - Envoyer un message
- **POST** `/api/chauffeur/inscription` - Inscrire un nouveau chauffeur

### Admin
- **GET** `/api/chauffeur/liste` - Liste des chauffeurs actifs
- **POST** `/api/admin/cloturer-chauffeur` - Clôturer un chauffeur

## 📄 Documentation

- [Solution Finale v17.1.0](./SOLUTION_FINALE_V17.md) - Documentation complète
- [Guide de déploiement](./GUIDE_RAPIDE_DEPLOIEMENT.md) - Instructions de déploiement
- [Instructions Cloudflare 2026](./INSTRUCTIONS_CLOUDFLARE_2026.md) - Guide interface 2026

## 🎯 Statut

- ✅ Version 18.0.0 déployée
- ✅ Checklist interactive sur Réception uniquement
- ✅ Build optimisé (245.72 kB - économie de 7.79 kB)
- ✅ Base de données D1 configurée
- ✅ Déployé en production
- ✅ Toutes les APIs testées
- ✅ Chat bidirectionnel opérationnel
- ✅ Dashboard admin temps réel

## 📊 Statistiques de Performance

- **Bundle Worker**: 245.72 KB (optimisé)
- **Fichiers statiques**: 12 fichiers HTML (~7 KB chacun)
- **Temps de chargement**: < 100ms (CDN Cloudflare)
- **Compatibilité**: 100% mobile et desktop
- **Procédures**: 28+ procédures disponibles
- **Rubriques**: 5 sections complètes
- **Checklists interactives**: 1 rubrique (Réception)

## 📞 Support

Pour toute question ou problème, consultez les guides de documentation dans le dépôt.

---

**Dernière mise à jour :** 2 mars 2026 18:30 UTC  
**Version :** 18.2.0 - Vidéo Tutoriel + Déploiement automatique stable  
**Statut :** ✅ Production - 100% Fonctionnel  
**Déploiement :** https://gxo-procedures-moissy.pages.dev  
**Build Size :** 247.39 KB  
**Tag GitHub :** v18.2.0  
**Commit :** c9b40f3
