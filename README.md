# 🚛 GXO Moissy - Système de Gestion des Quais et Chauffeurs

## 📋 Vue d'ensemble

Application web complète pour la gestion en temps réel des quais de déchargement et le suivi des chauffeurs sur le site GXO Logistics à Moissy-Cramayel.

**Production** : https://gxomoissyprocedures.com  
**Version actuelle** : 3.5.3  
**Dernière mise à jour** : 2026-03-08  
**Backup** : https://www.genspark.ai/api/files/s/3OzkBV0q  
**GitHub** : https://github.com/ayoubdil1972-stack/gxo-procedures-moissy

### 🆕 **NOUVEAU v3.5.3 : Vérifications des 7 Points de Contrôle**
- **7 Points de contrôle obligatoires** : Formulaire complet de vérification qualité du camion
  1. ✅ Extérieur / Essieux (vérification plombage)
  2. ✅ Côtés gauche et droit (déchirures, etc.)
  3. ✅ Paroi avant (double fond, etc.)
  4. ✅ Plancher (trappes, plancher amovible, etc.)
  5. ✅ Plafond / Toit (déchirures, usures, etc.)
  6. ✅ Portes intérieures / extérieures (herméticité, etc.)
  7. ✅ Cales roues bien positionnées
- **4 Points optionnels (marchandises alimentaires)** :
  - Présence de nuisibles
  - Présence de corps étrangers
  - Propreté générale du camion
  - Odeur anormale
- **Interface utilisateur améliorée** :
  - Sections repliables/dépliables (7 points + Problématiques)
  - 3 choix par point : ✅ Conforme / ❌ Non conforme / ⚪ N/A
  - Validation automatique avec alerte points manquants
  - Scroll automatique vers erreurs
- **Conservation des données** : 
  - Cases cochées conservées lors du repli/dépli
  - Stockage JSON des vérifications en base de données
  - Historique complet traçable

### 🔄 **v3.5 : Traçabilité Complète des Opérations**
- **Formulaire contrôleur** : Saisie obligatoire du nom de l'agent de contrôle avec auto-complétion  
- **Rubrique "Déchargement terminé"** : Affichage permanent de la durée de déchargement  
- **Rubrique "Contrôle terminé"** : Affichage complet avec :
  - ⏱️ Durée du contrôle (HH:MM:SS)
  - 👤 Nom du contrôleur
  - 🚚 Fournisseur
  - 🆔 ID Chauffeur (ex: 1820048)
  - 🕐 Date/heure de début du contrôle (format: 07/03/2026 à 20h35)
- **Conservation permanente** : Les deux rubriques restent affichées jusqu'au reset manuel
- **QR Codes dédiés** : 
  - 📥 [Télécharger QR Début de contrôle](https://gxomoissyprocedures.com/download-qr-controle) (C001-C103)
  - 📥 [Télécharger QR Fin de contrôle](https://gxomoissyprocedures.com/download-qr-fin-controle) (FC001-FC103)
  - 📥 [Télécharger QR Fin de déchargement](https://gxomoissyprocedures.com/download-qr-fin-dechargement) (F001-F103)

---

## 🎯 Fonctionnalités principales

### 1. 📦 Gestion des Quais (45 quais)

#### Interface de gestion en temps réel
- **Organisation par zones** : 6 zones (A-F) pour 45 quais réels GXO Moissy
- **Visualisation colorée** : Statut immédiat avec codes couleur
- **Scan QR Code** : Démarrage/arrêt automatique des opérations
- **Modal de gestion** : Changement de statut en 1 clic

#### Statuts disponibles

| Statut | Couleur | Icône | Description | Timer |
|--------|---------|-------|-------------|-------|
| **Disponible** | 🟢 Vert | ✅ | Prêt pour chargement | Aucun |
| **En cours** | 🟡 Jaune | ⏱️ | Déchargement actif | ⏱️ Défile en temps réel |
| **Fin de déchargement** | 🔵 Bleu | 📋 | Opération terminée | ⏱️ **FIGÉ** sur durée exacte |
| **En contrôle** | 🟠 Orange | 🔍 | Contrôle qualité en cours | ⏱️ Défile en temps réel |
| **Fin de contrôle** | 🟣 Violet clair | 📝 | Contrôle terminé | ⏱️ **FIGÉ** sur durée exacte |
| **Indisponible** | 🔴 Rouge | 🚫 | Problème signalé | Aucun |

#### Workflow complet

```
1️⃣  SCAN QR START DÉCHARGEMENT (ex: "D075")
    ↓
    Statut: Disponible → En cours
    Timer déchargement: Démarrage automatique (00:00:01 → 00:00:02 → ...)
    
2️⃣  SCAN QR FIN DÉCHARGEMENT (ex: "F075")
    ↓
    Formulaire de fin de déchargement :
    - Nom agent
    - Numéro ID fournisseur
    - Fournisseur
    - Palettes (attendues/reçues/à rendre)
    - 🆕 Vérifications des 7 points de contrôle (obligatoire)
    - Problématiques rencontrées (optionnel)
    - Commentaires
    ↓
    Statut: En cours → Fin de déchargement
    Timer déchargement: FIGÉ sur durée exacte (ex: 01:23:45)
    Commentaire: "Déchargement terminé - Jean Dupont - Transport Express - ID:TEST123"
    Vérifications: JSON {point_1: "conforme", point_2: "non_conforme", ...}
    
3️⃣  SCAN QR START CONTRÔLE (ex: "C075")
    ↓
    Statut: Fin de déchargement → En contrôle
    Timer contrôle: Démarrage automatique (00:00:00 → 00:00:01 → ...)
    ✅ Conservation : Durée déchargement + Commentaire + Vérifications
    
4️⃣  SCAN QR FIN CONTRÔLE (ex: "FC075")
    ↓
    Formulaire contrôleur : Saisie nom agent de contrôle
    ↓
    Statut: En contrôle → Fin de contrôle
    Timer contrôle: FIGÉ sur durée exacte (ex: 00:15:32)
    ✅ Conservation : Tout l'historique (déchargement + vérifications + contrôle)
    
5️⃣  ACTION MANUELLE (clic sur carte violette)
    ↓
    Modal → Bouton "Disponible"
    ↓
    Statut: Fin de contrôle → Disponible
    Timers: Disparaissent
    Historique: Archivé en base de données
```

---

### 2. 🛡️ Vérifications des 7 Points de Contrôle

#### Page de saisie
**URL** : https://gxomoissyprocedures.com/scan-fin-dechargement?quai=XX

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

#### Points optionnels (4 - marchandises alimentaires uniquement)

| # | Point de contrôle | Critère |
|---|-------------------|---------|
| 8 | Présence de nuisibles | Insectes, rongeurs, etc. |
| 9 | Présence de corps étrangers | Débris, objets suspects, etc. |
| 10 | Propreté générale du camion | État de propreté |
| 11 | Odeur anormale | Odeurs suspectes ou inhabituelles |

#### Interface utilisateur

**Sections repliables** :
- 📋 "Vérifications des 7 points de contrôle" (chevron ▼/▲)
- ⚠️ "Problématiques rencontrées" (chevron ▼/▲)

**Choix par point** :
- ✅ **Conforme** (vert)
- ❌ **Non conforme** (rouge)
- ⚪ **Non applicable** (gris)

**Validation automatique** :
- Alert si points obligatoires manquants
- Dépliage automatique section avec erreurs
- Scroll vers section problématique
- Liste des points manquants affichée

**Conservation des données** :
- Cases cochées conservées lors repli/dépli
- Stockage JSON en base : `{point_1: "conforme", point_2: "non_conforme", ...}`
- Traçabilité complète avec timestamp

---

### 3. 🚚 Gestion des Chauffeurs

#### Dashboard en temps réel
- **Suivi actif** : Liste des chauffeurs présents sur site
- **Progression des tâches** : Checklist visuelle (EPI, Placement, Palettes, etc.)
- **Statistiques** : Total / Prêts / En cours
- **Auto-refresh** : Mise à jour automatique toutes les 30 secondes

#### Tâches suivies
- 🦺 Port des EPI
- 🚚 Placement au quai
- 📦 Échange de palettes
- 🔔 Notification accueil
- 🔑 Remise des clés

---

### 4. 📊 Pages de scan QR

#### Génération de codes QR
- **QR START** : `/generate-barcodes.html` - Génère QR codes de démarrage (D001-D103)
- **QR FIN DÉCHARGEMENT** : `/download-qr-fin-dechargement` - Génère QR codes de fin (F001-F103)
- **QR START CONTRÔLE** : `/download-qr-controle` - Génère QR codes début contrôle (C001-C103)
- **QR FIN CONTRÔLE** : `/download-qr-fin-controle` - Génère QR codes fin contrôle (FC001-FC103)
- **Téléchargement** : Export PDF avec étiquettes imprimables
- **Format** : Code128 lisible par douchettes standard

#### Pages de scan
- **Scan START** : `/scan-dechargement?quai=XX` - Démarre le timer
- **Scan FIN** : `/scan-fin-dechargement?quai=XX` - Affiche formulaire de fin avec 7 points de contrôle
- **Scan CONTRÔLE** : `/scan-controle?quai=XX` - Démarre timer contrôle
- **Scan FIN CONTRÔLE** : `/scan-fin-controle?quai=XX` - Formulaire contrôleur

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
  timer_start INTEGER,
  timer_duration INTEGER,
  timer_controle_start INTEGER,
  timer_controle_duration INTEGER,
  commentaire TEXT,
  commentaire_auteur TEXT,
  controleur_nom TEXT,
  controle_debut_timestamp TEXT,
  controle_fournisseur TEXT,
  controle_id_chauffeur TEXT,
  verification_points TEXT,        -- 🆕 JSON des 11 points de contrôle
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

#### Table `fin_dechargement` (historique)
```sql
CREATE TABLE fin_dechargement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quai_numero INTEGER NOT NULL,
  nom_agent TEXT NOT NULL,
  numero_id TEXT NOT NULL,
  fournisseur TEXT NOT NULL,
  palettes_attendues INTEGER NOT NULL,
  palettes_recues INTEGER NOT NULL,
  palettes_a_rendre TEXT NOT NULL,
  verification_points TEXT,        -- 🆕 JSON des vérifications
  problemes TEXT,                  -- JSON array
  autres_commentaire TEXT,
  remarques TEXT,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

### Migrations SQL en production

**IMPORTANT** : Ces migrations doivent être exécutées dans l'ordre sur la base de données **gxo-chauffeurs-db**.

**Où ?** https://dash.cloudflare.com → Workers & Pages → D1 → **gxo-chauffeurs-db** → **Console**

#### Migration 0016 : Ajouter colonne verification_points (v3.5.0)
```sql
ALTER TABLE quai_status ADD COLUMN verification_points TEXT;
```

#### Vérification (doit afficher 45)
```sql
SELECT COUNT(*) AS total_quais FROM quai_status;
```

**Résultat attendu** : `total_quais = 45` ✅

### Déploiement en production

```bash
# Build
npm run build

# Configuration Cloudflare (première fois)
npx wrangler login

# Déploiement
npm run deploy
# ou
npx wrangler pages deploy dist --project-name gxo-procedures-moissy

# Vérification
curl https://gxomoissyprocedures.com/api/quais
```

---

## 📂 Structure du projet

```
gxo-procedures-moissy/
├── src/
│   ├── index.tsx              # Point d'entrée Hono (backend)
│   └── types/                 # Types TypeScript
├── public/
│   └── static/                # Assets statiques
│       ├── accueil-chauffeur-quais.js
│       ├── accueil-chauffeur-dashboard.js
│       ├── accueil-chauffeur-tabs.js
│       └── styles.css
├── dist/                      # Build output (Cloudflare)
│   ├── _worker.js             # Worker compilé
│   ├── _routes.json           # Configuration routing
│   └── static/                # Assets statiques copiés
├── migrations/                # Migrations D1
│   ├── 0014_add_controleur_nom.sql
│   ├── 0015_add_controle_details.sql
│   └── 0016_add_verification_points.sql
├── wrangler.jsonc             # Configuration Cloudflare
├── ecosystem.config.cjs       # Configuration PM2
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🧪 Tests

### Test local du workflow complet

```bash
# Test timer figé
./test-timer-fige-v2.sh

# Résultat attendu :
# ✅ Quai en statut 'fin_dechargement'
# ✅ Timer figé : 11 secondes (00:00:11)
# ✅ Commentaire avec agent/fournisseur/ID
# ✅ Vérifications : 7 points remplis
```

### Vérification manuelle

```bash
# État des quais
curl http://localhost:3000/api/quais | jq '.quais[] | select(.quai_numero == 75)'

# Historique fin de déchargement
curl http://localhost:3000/api/fin-dechargement?quai=75 | jq '.'
```

---

## 📊 API Routes

### Gestion des quais

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/quais` | Liste tous les quais avec leur statut |
| POST | `/api/quais/:numero` | Met à jour le statut d'un quai |
| POST | `/api/fin-dechargement` | Enregistre la fin de déchargement |
| GET | `/api/fin-dechargement?quai=XX` | Historique d'un quai |

### Pages publiques

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/accueil-chauffeur` | Dashboard chauffeurs + Gestion quais |
| `/scan-dechargement?quai=XX` | Page scan QR START |
| `/scan-fin-dechargement?quai=XX` | Page scan QR FIN (avec 7 points de contrôle) |
| `/scan-controle?quai=XX` | Page scan QR CONTRÔLE START |
| `/scan-fin-controle?quai=XX` | Page scan QR CONTRÔLE FIN |
| `/generate-barcodes.html` | Génération QR START |
| `/download-qr-fin-dechargement` | Génération QR FIN |
| `/download-qr-controle` | Génération QR CONTRÔLE START |
| `/download-qr-fin-controle` | Génération QR CONTRÔLE FIN |

---

## 🐛 Dépannage

### Le toggle "Problématiques" ne se déplie pas

**Cause** : Erreur JavaScript SyntaxError (ligne 801)

**Solution appliquée (v3.5.3)** :
- Correction double échappement `\\n` dans alert()
- Protection try-catch autour des toggles
- Console.log de debug ajoutés

**Test** :
1. Ouvrir console F12
2. Vérifier absence de "SyntaxError"
3. Chercher messages : "✅ problematiques-header trouvé"
4. Cliquer → Vérifier message : "🟡 Toggle Problématiques cliqué"

### Le timer figé continue à défiler

**Cause** : Migration SQL non appliquée en production

**Solution** :
1. Vérifier que les migrations SQL ont été exécutées
2. Vider le cache navigateur (Ctrl+Shift+Delete)
3. Rafraîchir la page (Ctrl+F5)

### Les vérifications ne s'enregistrent pas

**Cause** : Colonne `verification_points` manquante

**Solution** : Appliquer la migration 0016 (voir section Déploiement)

---

## 🔄 Changelog

### v3.5.3 (2026-03-08) - FIX CRITIQUE SYNTAXERROR ✅
- 🔧 **Fix critique** : Correction erreur JavaScript SyntaxError ligne 801
- 🐛 **Problème** : alert() avec `\n` non échappé cassait TOUT le script
- ✅ **Solution** : Double échappement `\\n\\n` dans le message d'alerte
- 🔍 **Debug ajouté** : Try-catch + console.log pour diagnostics
- ✅ **Impact** : Toggle "Problématiques" et "Vérifications" fonctionnent maintenant
- 📦 **Commit** : 03bd8bc
- 💾 **Backup** : https://www.genspark.ai/api/files/s/3OzkBV0q

### v3.5.2 (2026-03-08) - VERSION DEBUG 🔍
- 🔍 **Debug tools** : Console.log complets pour identifier erreurs
- 🛡️ **Protection** : Try-catch autour toggles Vérifications + Problématiques
- 📊 **Logs** : 7 messages de traçabilité (init, trouvé, cliqué, ouvert/fermé)
- 🎯 **Objectif** : Identifier cause exacte du toggle non fonctionnel

### v3.5.1 (2026-03-08) - FIX ORDRE DÉCLARATION FORMDATA 🔧
- 🐛 **Fix** : Variable `formData` utilisée avant déclaration (ligne 1060 avant 1067)
- ✅ **Solution** : Déplacement déclaration ligne 1031 (immédiatement après e.preventDefault())
- 🎯 **Impact** : Résolution erreur JavaScript qui bloquait toggles

### v3.5.0 (2026-03-08) - VÉRIFICATIONS DES 7 POINTS DE CONTRÔLE 🆕
- 🆕 **Formulaire 7 points** : Vérifications obligatoires qualité camion
  - Point 1 : Extérieur / Essieux (plombage)
  - Point 2 : Côtés gauche/droit (déchirures)
  - Point 3 : Paroi avant (double fond)
  - Point 4 : Plancher (trappes, amovible)
  - Point 5 : Plafond / Toit (déchirures, usures)
  - Point 6 : Portes (herméticité)
  - Point 7 : Cales roues (positionnement)
- 🆕 **4 Points optionnels** : Marchandises alimentaires uniquement
  - Point 8 : Nuisibles
  - Point 9 : Corps étrangers
  - Point 10 : Propreté générale
  - Point 11 : Odeur anormale
- 🎨 **Interface** : Sections repliables avec chevrons ▼/▲
- ✅ **Validation** : Automatique avec alerte + scroll vers erreurs
- 💾 **Stockage** : JSON en base de données (colonne verification_points)
- 📦 **Migration** : 0016_add_verification_points.sql
- 🔄 **Conservation** : Cases cochées lors repli/dépli
- 📊 **Traçabilité** : Historique complet avec timestamp

### v3.4.0 (2026-03-07) - TRAÇABILITÉ COMPLÈTE DES OPÉRATIONS 🆕
- 🆕 **Formulaire contrôleur** : Saisie obligatoire nom agent + auto-complétion
- 📋 **Rubrique "Déchargement terminé"** : Durée affichée en permanence
- 📝 **Rubrique "Contrôle terminé"** : Infos complètes (durée, nom, fournisseur, ID, date/heure)
- 🗄️ **Colonnes BDD** : controleur_nom, controle_debut_timestamp, controle_fournisseur, controle_id_chauffeur
- 📦 **Migrations** : 0014_add_controleur_nom.sql + 0015_add_controle_details.sql

### v3.2.0 (2026-03-07) - SYSTÈME DE CONTRÔLE QUALITÉ 🆕
- 🆕 **Statut "En contrôle"** : Timer actif (orange 🔍)
- 🆕 **Statut "Fin de contrôle"** : Timer figé (violet 📝)
- 📋 **Conservation données** : Durée déchargement + commentaire + vérifications
- 📥 **QR Codes PDF** : C001-C103 + FC001-FC103

---

## 📥 Téléchargement QR Codes

### Pages de génération PDF
- **QR Codes Fin de Déchargement** : https://gxomoissyprocedures.com/download-qr-fin-dechargement  
  Format : F001-F103 (45 codes), disposition 3×5, A4 portrait, haute qualité
  
- **QR Codes Début de Contrôle** : https://gxomoissyprocedures.com/download-qr-controle  
  Format : C001-C103 (45 codes), disposition 3×5, A4 portrait, haute qualité
  
- **QR Codes Fin de Contrôle** : https://gxomoissyprocedures.com/download-qr-fin-controle  
  Format : FC001-FC103 (45 codes), disposition 3×5, A4 portrait, haute qualité

### Fonctionnalités
- ✅ Génération instantanée côté client (QRious + jsPDF)
- ✅ Téléchargement automatique au format PDF
- ✅ Prêt pour impression directe (300 DPI équivalent)
- ✅ Nom de fichier avec date automatique

---

## 👥 Équipe

- **Développeur principal** : Assistant IA Claude
- **Client** : GXO Logistics Moissy-Cramayel
- **Contact** : ayoubdil1972-stack (GitHub)

---

## 📄 Licence

Propriétaire - GXO Logistics © 2026

---

## 🆘 Support

Pour toute question ou problème :
1. Consulter la section Dépannage
2. Vérifier les logs : `pm2 logs gxo-procedures-moissy --nostream`
3. Tester en local : `npm run dev`
4. Ouvrir console F12 pour erreurs JavaScript
5. Contacter l'équipe technique

---

**Dernière mise à jour** : 2026-03-08  
**Version** : 3.5.3  
**Statut** : ✅ Production stable - 7 Points de Contrôle + Traçabilité Complète
