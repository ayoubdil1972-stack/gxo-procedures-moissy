# GXO Procedures Moissy

Application de formation et gestion pour les chauffeurs GXO Logistics - Site de Moissy-Cramayel.

## 🌐 URLs

- **Production**: https://gxo-procedures-moissy.pages.dev
- **GitHub**: https://github.com/ayoubdil1972-stack/gxo-procedures-moissy
- **Cloudflare Dashboard**: https://dash.cloudflare.com/8b193b1c61a45eb50fb2dab89cf8bfe5/pages/view/gxo-procedures-moissy

## 📱 Fonctionnalités

### Pour les chauffeurs
- ✅ Vidéos d'instructions multilingues (NL, FR, DE, FI, DA, CS, BG, PL, RO, IT, ES, PT)
- ✅ Interface intuitive avec bouton PLAY orange
- ✅ Barre de progression
- ✅ Support iPhone/Android avec range requests
- ✅ Questionnaire de validation
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

Le site est déployé automatiquement via GitHub Actions sur Cloudflare Pages.

### Configuration requise
- Node.js 20+
- npm 10+

### Déploiement automatique
Chaque push sur la branche `main` déclenche un déploiement automatique.

## 🛠️ Technologies

- **Backend**: Hono (TypeScript)
- **Frontend**: Vanilla JS avec Tailwind CSS (CDN)
- **Base de données**: Cloudflare D1 (SQLite)
- **Hébergement**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 📦 Structure

```
webapp/
├── src/
│   └── index.tsx          # Application Hono principale
├── public/
│   └── static/
│       ├── videos/        # 12 vidéos d'instructions (5 MB chacune)
│       ├── images/        # Logos et images
│       └── *.js          # Scripts frontend
├── migrations/            # Migrations D1
├── .github/
│   └── workflows/
│       └── deploy.yml    # Déploiement automatique
└── package.json
```

## 📱 Test sur iPhone 12

URL de test vidéo NL :
```
https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
```

Résultat attendu :
- ✅ Page noire avec bande orange
- ✅ Logo GXO
- ✅ Bouton PLAY orange
- ✅ Vidéo se lance immédiatement
- ✅ Barre de progression orange
- ✅ Bouton "Doorgaan" (Continuer) à la fin

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
- [Corrections automatiques](./CORRECTION_AUTOMATIQUE.md)
- [Nouveau token](./NOUVEAU_TOKEN.md)

## 🎯 Statut

- ✅ Projet créé sur Cloudflare
- ✅ Workflow GitHub Actions configuré
- ✅ Build fonctionnel
- ✅ Base de données D1 configurée
- ⏳ Premier déploiement en attente

## 📞 Support

Pour toute question ou problème, consultez les guides de documentation dans le dépôt.

---

**Dernière mise à jour :** 12 février 2026  
**Version :** 12.1.1  
**Statut :** ✅ Prêt pour le déploiement
