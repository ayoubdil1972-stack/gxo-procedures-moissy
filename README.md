# 🚛 GXO Logistics Moissy - Système QR Code Chauffeurs

**Version 11.4** - Système d'induction multilingue pour chauffeurs avec vidéos optimisées

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://pages.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-Framework-blue)](https://hono.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

---

## 📱 Accès Rapide

**URL Production** : `https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur`

**Scanner le QR Code** → Choisir langue → Regarder vidéo → S'inscrire

---

## 🎯 Objectif

Système d'induction automatisé pour les chauffeurs visitant le site GXO Logistics de Moissy :
- ✅ **12 langues** disponibles
- ✅ **Vidéos optimisées** (chargement 4x plus rapide)
- ✅ **Sans sous-titres** (rognées professionnellement)
- ✅ **Mobile-first** (plein écran, responsive)
- ✅ **Base de données** (sauvegarde des inscriptions)

---

## 🌍 Langues Supportées

| Langue | Code | Vidéo | Taille |
|--------|------|-------|--------|
| 🇫🇷 Français | fr | ✅ | 5.2 MB |
| 🇳🇱 Néerlandais | nl | ✅ | 5.0 MB |
| 🇫🇮 Finnois | fi | ✅ | 5.0 MB |
| 🇩🇪 Allemand | de | ✅ | 5.0 MB |
| 🇮🇹 Italien | it | ✅ | 5.1 MB |
| 🇵🇱 Polonais | pl | ✅ | 5.1 MB |
| 🇵🇹 Portugais | pt | ✅ | 5.2 MB |
| 🇧🇬 Bulgare | bg | ✅ | 5.2 MB |
| 🇨🇿 Tchèque | cs | ✅ | 5.0 MB |
| 🇩🇰 Danois | da | ✅ | 4.5 MB |
| 🇭🇷 Croate | hr | ✅ | 5.2 MB |
| 🇷🇴 Roumain | ro | ✅ | 5.2 MB |

**Total** : 61 MB (vs 107 MB initialement, -43%)

---

## 🏗️ Architecture

```
webapp/
├── src/
│   ├── index.tsx                    # Point d'entrée Hono
│   └── pages/
│       ├── qrcode-chauffeur.tsx     # Page QR Code
│       ├── chauffeur-langue.tsx     # Sélection langue
│       ├── chauffeur-video.tsx      # Lecteur vidéo
│       └── chauffeur-inscription.tsx # Formulaire inscription
├── public/
│   └── static/
│       ├── videos/                   # 12 vidéos rognées
│       ├── gxo-logo-official.svg
│       └── test-cropped-videos.html
├── migrations/
│   └── 0001_init_schema.sql         # Schéma DB
├── seed.sql                          # Données de test
├── wrangler.jsonc                    # Config Cloudflare
├── DEPLOYMENT.md                     # Guide déploiement
└── README.md                         # Ce fichier
```

---

## ⚡ Fonctionnalités

### ✅ **Système QR Code**
- Accès rapide via scan QR
- Pas de connexion requise
- Parcours guidé étape par étape

### ✅ **Vidéos Optimisées**
- **Chargement 4x plus rapide** (500ms vs 2s)
- **Sans sous-titres** (rognées avec FFmpeg)
- **Préchargement automatique** (`preload="auto"`)
- **4 méthodes de détection** (loadedmetadata, loadeddata, canplay, timeout)
- **Spinner animé** pendant le chargement

### ✅ **Lecteur Vidéo Mobile**
- Plein écran intelligent
- Contrôles tactiles natifs
- Max-height 70vh (visage toujours visible)
- Object-fit contain
- Orientation naturelle

### ✅ **Base de Données D1**
- Sauvegarde des inscriptions
- Logs de traçabilité
- Statistiques par langue
- Cloudflare D1 (SQLite global)

### ✅ **Interface Multilingue**
- 12 langues uniformisées
- Traductions complètes
- Format identique partout
- UX cohérente

---

## 🚀 Démarrage Rapide

### Prérequis
```bash
Node.js 18+
npm ou pnpm
```

### Installation
```bash
# Cloner
git clone https://github.com/VOTRE_USERNAME/gxo-procedures-moissy.git
cd gxo-procedures-moissy

# Installer
npm install

# Build
npm run build

# Lancer en local
pm2 start ecosystem.config.cjs
```

### Test Local
```
http://localhost:3000/qrcode-chauffeur
```

---

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur Vite dev
npm run build            # Build production

# PM2 (sandbox/local)
pm2 start ecosystem.config.cjs
pm2 logs --nostream
pm2 restart gxo-procedures-moissy

# Database (nécessite Cloudflare config)
npm run db:migrate:local   # Migrations local
npm run db:migrate:prod    # Migrations production
npm run db:seed            # Données de test
npm run db:reset           # Reset DB local

# Déploiement (nécessite Cloudflare config)
npm run deploy             # Build + deploy
npm run deploy:prod        # Deploy production
```

---

## 🗄️ Base de Données

### Schéma

**Table `chauffeurs`** : Inscriptions
- id, nom, prenom, email, telephone
- langue, video_completed, tasks_completed
- statut (en_attente, valide, refuse)
- dates (inscription, created_at, updated_at)

**Table `logs_inscriptions`** : Traçabilité
- chauffeur_id, action, details
- user_agent, ip_address, created_at

**Table `statistiques`** : Analytics
- date, langue
- total_visites, total_videos_vues, total_inscriptions

---

## 🔧 Configuration

### Cloudflare Pages
1. Créer compte sur https://dash.cloudflare.com
2. Obtenir API Token
3. Configurer `wrangler.jsonc`
4. Voir **DEPLOYMENT.md** pour les détails

### Base de Données D1
```bash
# Créer la DB
npx wrangler d1 create gxo-chauffeurs-db

# Copier le database_id dans wrangler.jsonc

# Appliquer migrations
npx wrangler d1 migrations apply gxo-chauffeurs-db --local
npx wrangler d1 migrations apply gxo-chauffeurs-db
```

---

## 📊 Statistiques

### Performances
- **Chargement initial** : < 2s
- **Chargement vidéo** : < 1s (500ms)
- **Build time** : ~2s
- **Bundle size** : 235 KB

### Vidéos
- **Total** : 12 langues
- **Taille** : 61 MB (-43% vs original)
- **Résolution** : 720x1160 (rognée -120px)
- **Format** : MP4 H.264, CRF 28

---

## 🎯 Roadmap

- [x] **v11.0** : Vidéos rognées sans sous-titres
- [x] **v11.1** : Page de test interactive
- [x] **v11.2** : Chargement 4x plus rapide
- [x] **v11.3** : Changelog interactif
- [x] **v11.4** : Uniformisation 12 langues
- [x] **v11.5** : Configuration DB + Documentation
- [ ] **v12.0** : Interface admin (dashboard)
- [ ] **v12.1** : Export CSV / Excel
- [ ] **v12.2** : Statistiques avancées
- [ ] **v12.3** : Notifications email

---

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide de déploiement complet (298 lignes)
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique des versions
- **[scripts/db-setup.sh](./scripts/db-setup.sh)** - Script setup DB

---

## 🧪 Tests

### Tests Fonctionnels
```bash
# Test pages
curl -I https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
curl -I https://gxo-procedures-moissy.pages.dev/chauffeur/langue
curl -I https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=fr

# Test vidéos
curl -I https://gxo-procedures-moissy.pages.dev/static/videos/instructions-fr.mp4
```

### Tests DB
```bash
# Test local
npx wrangler d1 execute gxo-chauffeurs-db --local --command="SELECT * FROM chauffeurs"

# Test production
npx wrangler d1 execute gxo-chauffeurs-db --command="SELECT COUNT(*) FROM chauffeurs"
```

---

## 🤝 Contribution

Ce projet est développé en interne pour GXO Logistics Moissy.

---

## 📄 Licence

Propriétaire - GXO Logistics Moissy © 2026

---

## 📞 Support

- **Technique** : IT Department
- **Fonctionnel** : RH Department
- **Documentation** : Voir DEPLOYMENT.md

---

**Dernière mise à jour** : 11 février 2026  
**Version** : 11.5  
**Auteur** : GXO Logistics Moissy
