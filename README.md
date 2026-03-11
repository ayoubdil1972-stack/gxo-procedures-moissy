# 🚛 GXO Moissy - Système de Gestion des Quais et Chauffeurs

## 📋 Vue d'ensemble

Application web complète pour la gestion en temps réel des quais de déchargement et le suivi des chauffeurs sur le site GXO Logistics à Moissy-Cramayel.

**Production** : https://gxomoissyprocedures.pages.dev  
**Version actuelle** : 3.11.7 FINAL  
**Dernière mise à jour** : 2026-03-11 17:22 UTC  
**GitHub** : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy

---

## 🆕 **VERSION 3.11.7 : CORRECTION DÉFINITIVE TIMERS +1H** ✅

### 🎯 **Problème Résolu**
Les timers affichaient systématiquement **1 heure de plus** que la durée réelle :
- ❌ Déchargement de 30s affichait **01:00:30**
- ❌ Contrôle de 20s affichait **01:00:20**

### ✅ **Solution Appliquée : Triple Protection**

#### 1. **Backend - Correction au moment du figement** (v3.11.5)
Soustraction automatique de 3600s si la durée calculée >= 3600s :
```typescript
timerDuration = rawDuration >= 3600 ? rawDuration - 3600 : rawDuration
```

#### 2. **API - Correction SQL permanente à la lecture** (v3.11.6)
Requête SQL avec `CASE WHEN` dans `/api/quais` :
```sql
SELECT 
  CASE 
    WHEN timer_duration >= 3600 THEN timer_duration - 3600
    ELSE timer_duration
  END as timer_duration
FROM quai_status
```

#### 3. **KPI Chef d'Équipe - Correction cohérente** (v3.11.7)
Même correction SQL appliquée à :
- `/api/chef-equipe/kpi/reception-camion` (quai_status)
- `/api/chef-equipe/kpi/reception-camion` (quai_historique)

### 📊 **Résultat**
- ✅ **Page Gestion Quais** : Affiche durées exactes (00:00:30, 00:00:20, etc.)
- ✅ **Page KPI Chef d'Équipe** : Affiche durées exactes identiques
- ✅ **Moyennes correctes** : Calculs de moyennes basés sur vraies durées
- ✅ **Automatique et permanent** : Aucune action manuelle requise

---

## 🎯 Fonctionnalités principales

### 1. 📦 Gestion des Quais (45 quais)

#### Interface de gestion en temps réel
- **URL** : https://gxomoissyprocedures.pages.dev/accueil-chauffeur?v=2
- **Organisation par zones** : 6 zones (A-F) pour 45 quais réels GXO Moissy
- **Visualisation colorée** : Statut immédiat avec codes couleur
- **Scan QR Code** : Démarrage/arrêt automatique des opérations
- **Timers précis** : Affichage exact des durées (correction automatique -1h)

#### Statuts disponibles

| Statut | Couleur | Icône | Description | Timer |
|--------|---------|-------|-------------|-------|
| **Disponible** | 🟢 Vert | ✅ | Prêt pour chargement | Aucun |
| **En cours** | 🟡 Jaune | ⏱️ | Déchargement actif | ⏱️ Défile en temps réel |
| **Fin de déchargement** | 🔵 Bleu | 📋 | Opération terminée | ⏱️ **FIGÉ** sur durée exacte |
| **En contrôle** | 🟠 Orange | 🔍 | Contrôle qualité en cours | ⏱️ Défile en temps réel |
| **Fin de contrôle** | 🟣 Violet clair | 📝 | Contrôle terminé | ⏱️ **FIGÉ** sur durée exacte |
| **Indisponible** | 🔴 Rouge | 🚫 | Problème signalé | Aucun |

---

### 2. 📊 KPI Chef d'Équipe

#### Interface de suivi
- **URL** : https://gxomoissyprocedures.pages.dev/chef-equipe?v=2
- **Données en temps réel** : Synchronisation avec page Gestion Quais
- **Durées exactes** : Même correction automatique appliquée
- **Historique** : Affichage des quais terminés (quai_status + quai_historique)
- **Statistiques** : Moyennes calculées sur vraies durées

#### Fonctionnalités
- ✅ Affichage des quais en fin de contrôle
- ✅ Durées déchargement et contrôle exactes
- ✅ Informations complètes (agent, fournisseur, ID chauffeur, contrôleur)
- ✅ Filtrage par date
- ✅ Archivage automatique

---

### 3. 🛡️ Vérifications des 7 Points de Contrôle

#### Points obligatoires (7)

| # | Point de contrôle | Exemples de vérification |
|---|-------------------|--------------------------|
| 1 | Extérieur / Essieux | Vérifier le plombage du camion |
| 2 | Côtés gauche et droit | Déchirures, impacts, etc. |
| 3 | Paroi avant | Double fond, cloison, etc. |
| 4 | Plancher | Trappes, plancher amovible, etc. |
| 5 | Plafond / Toit | Déchirures, usures, etc. |
| 6 | Portes intérieures/extérieures | Herméticité, serrures, etc. |
| 7 | Cales roues | Bien positionnées et fonctionnelles |

#### Points optionnels (4 - marchandises alimentaires)

| # | Point de contrôle | Critère |
|---|-------------------|---------|
| 8 | Présence de nuisibles | Insectes, rongeurs, etc. |
| 9 | Présence de corps étrangers | Débris, objets suspects, etc. |
| 10 | Propreté générale du camion | État de propreté |
| 11 | Odeur anormale | Odeurs suspectes ou inhabituelles |

---

## 🗄️ Architecture Technique

### Stack technologique

#### Frontend
- **Framework** : Vanilla JavaScript (ES6+)
- **Styling** : TailwindCSS (CDN)
- **Icons** : FontAwesome 6.4.0
- **HTTP Client** : Axios 1.6.0
- **Utilities** : Lodash 4.17.21, DayJS 1.11.10

#### Backend
- **Framework** : Hono 4.x (Edge runtime)
- **Plateforme** : Cloudflare Pages + Workers
- **Base de données** : Cloudflare D1 (SQLite distribué)
- **Déploiement** : Wrangler CLI

### Structure de la base de données

#### Table `quai_status` (45 lignes)
```sql
CREATE TABLE quai_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL UNIQUE,
  statut TEXT NOT NULL DEFAULT 'disponible' 
    CHECK(statut IN ('disponible','en_cours','indisponible','fin_dechargement','en_controle','fin_controle')),
  timer_start TEXT,
  timer_duration INTEGER,
  timer_controle_start TEXT,
  timer_controle_duration INTEGER,
  controle_debut_timestamp TEXT,
  controle_fin_timestamp TEXT,
  controle_fournisseur TEXT,
  controle_id_chauffeur TEXT,
  controleur_nom TEXT,
  commentaire TEXT,
  commentaire_auteur TEXT,
  verification_points TEXT,        -- JSON des 11 points de contrôle
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Quais configurés :**
- Zone A : 1-10
- Zone B : 32-38
- Zone C : 45-49
- Zone D : 60-62, 67-69
- Zone E : 75-79, 81-87
- Zone F : 99-103

#### Table `quai_historique` (archivage)
```sql
CREATE TABLE quai_historique (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL,
  statut TEXT NOT NULL,
  timer_start TEXT,
  timer_duration INTEGER,
  timer_controle_start TEXT,
  timer_controle_duration INTEGER,
  controle_debut_timestamp TEXT,
  controle_fin_timestamp TEXT,
  controle_fournisseur TEXT,
  controle_id_chauffeur TEXT,
  controleur_nom TEXT,
  commentaire TEXT,
  commentaire_auteur TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  archived_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Déploiement

### Prérequis
- Node.js 18+
- npm ou pnpm
- Compte Cloudflare avec accès D1
- Cloudflare API Token

### Installation locale

```bash
# Clone du repository
git clone https://github.com/ayoubdil1972-stack/gxo-procedures-moissy.git
cd gxo-procedures-moissy

# Installation des dépendances
npm install

# Configuration locale (.dev.vars)
echo "NODE_ENV=development" > .dev.vars

# Démarrage local (PM2)
npm run build
pm2 start ecosystem.config.cjs

# Test
curl http://localhost:3000
```

### Déploiement en production

```bash
# Build
npm run build

# Configuration Cloudflare (première fois)
npx wrangler login

# Déploiement
npm run deploy
# ou
npx wrangler pages deploy dist --project-name gxomoissyprocedures

# Vérification
curl https://gxomoissyprocedures.pages.dev/api/quais
```

---

## 📂 Structure du projet

```
gxo-procedures-moissy/
├── src/
│   ├── index.tsx              # Point d'entrée Hono (backend)
│   ├── pages/                 # Pages React/JSX
│   └── types/                 # Types TypeScript
├── public/
│   └── static/                # Assets statiques
│       ├── accueil-chauffeur-quais.js
│       ├── chef-equipe.js
│       └── styles.css
├── dist/                      # Build output (Cloudflare)
│   ├── _worker.js             # Worker compilé (445KB)
│   ├── _routes.json           # Configuration routing
│   └── static/                # Assets statiques copiés
├── wrangler.jsonc             # Configuration Cloudflare
├── ecosystem.config.cjs       # Configuration PM2
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📊 API Routes

### Gestion des quais

| Méthode | Route | Description | Correction -1h |
|---------|-------|-------------|----------------|
| GET | `/api/quais` | Liste tous les quais | ✅ CASE WHEN |
| POST | `/api/quais/:numero` | Met à jour statut | - |
| POST | `/api/fin-dechargement` | Enregistre fin déchargement | ✅ Backend |
| POST | `/api/fin-controle` | Enregistre fin contrôle | ✅ Backend |

### KPI Chef d'Équipe

| Méthode | Route | Description | Correction -1h |
|---------|-------|-------------|----------------|
| GET | `/api/chef-equipe/kpi/reception-camion` | KPI réception camion | ✅ CASE WHEN |

---

## 🔄 Changelog

### v3.11.7 (2026-03-11) - CORRECTION KPI CHEF D'ÉQUIPE ✅
- 🔧 **Correction SQL étendue** : Même correction appliquée aux KPI Chef d'Équipe
- 📊 **Cohérence données** : Page Gestion Quais et KPI affichent durées identiques
- ✅ **Moyennes exactes** : Calculs basés sur vraies durées (sans +1h)
- 🎯 **Résultat** : Synchronisation parfaite entre toutes les pages

### v3.11.6 (2026-03-11) - CORRECTION SQL PERMANENTE ✅
- 🔧 **Correction API** : CASE WHEN dans requête SQL `/api/quais`
- ✅ **Automatique** : Correction appliquée à chaque lecture
- ✅ **Permanent** : Aucune maintenance manuelle requise
- 🎯 **Impact** : Tous les quais affichent durées exactes

### v3.11.5 (2026-03-11) - CORRECTION BACKEND ✅
- 🔧 **Correction au figement** : Soustraction auto -3600s si durée >= 3600s
- ✅ **Double protection** : Backend + API SQL
- 🎯 **Logs détaillés** : Affichage "Brut" et "Corrigé" en console

### v3.11.0-v3.11.4 (2026-03-11) - TENTATIVES DIVERSES ⚠️
- Stockage Unix timestamp (v3.11.0)
- Parsing timezone UTC/localtime (v3.11.1-v3.11.3)
- Calcul julianday() (v3.11.4)
- **Résultat** : Bug persistait malgré tentatives

---

## 🆘 Support

Pour toute question ou problème :
1. Consulter la section Dépannage
2. Vérifier les logs : `pm2 logs --nostream`
3. Tester en local : `npm run build && pm2 start ecosystem.config.cjs`
4. Ouvrir console F12 pour erreurs JavaScript
5. Contacter l'équipe technique

---

## 📄 Licence

Propriétaire - GXO Logistics © 2026

---

**Dernière mise à jour** : 2026-03-11  
**Version** : 3.11.7  
**Statut** : ✅ Production stable - Timers corrigés + KPI synchronisés + Triple protection
