# GXO Logistics - HUB Procédures Moissy-Cramayel

## 🎯 Vue d'ensemble du projet

**HUB Procédures Logistiques** - Intranet pour le site GXO de Moissy-Cramayel, conçu comme un centre de ressources opérationnelles centralisé destiné aux équipes terrain.

## ✨ Fonctionnalités actuelles

### Pages métiers complètes
- ✅ **Page d'accueil** : HUB métiers avec logo GXO, illustration entrepôt animée et accès rapide
- ✅ **Réception** : **29 procédures** incluant le **Manuel EWM Goods Receipt** (PDF 1.5MB), réception standard, déchargement, clôture livraison/TU, changement batterie, EOP checks, ICPE, conditionnement, etc.
- ✅ **IPL** : 7 procédures avec checklists interactives et illustration chariot élévateur (affectation tâche, priorisation, LTRMS, LTRA, LS03N, etc.)
- ✅ **Préparation** : 5 procédures complètes avec checklists interactives (dernier prélèvement, écart prélèvement, quai fictif, monteur de rolls, formation intégration)
- ✅ **Retours** : 3 procédures (rappel contenants PAPREC/BIONERVAL, clôture livraison retour, transfert roll)
- ✅ **Nouvel arrivant** : Parcours d'intégration complet en 5 étapes
- ✅ **Anomalies/FAQ** : 3 procédures anomalies + 8 questions/réponses fréquentes
- ✅ **Bibliothèque intelligente** : **34 documents** classés par rubrique avec recherche temps réel et aperçu PDF natif

### Design et branding
- ✅ **Logo GXO** : Logo officiel intégré dans la navigation et page d'accueil
- ✅ **Couleurs GXO** : Bleu GXO (#00205B) et Orange (#FF6B35)
- ✅ **Illustrations personnalisées** : Illustration entrepôt avec chariot élévateur et rayonnages pour IPL
- ✅ **Animation arrière-plan** : Entrepôt en SVG avec chariot élévateur sur la page d'accueil

### Fonctionnalités interactives
- ✅ **Checklists interactives** : Cases à cocher, barre de progression, animation de complétion
- ✅ **FAQ intelligente** : Accordéons dépliables avec niveaux d'urgence
- ✅ **Système de niveaux** : 🟢 Essentiel / 🟡 Standard / 🔴 Avancé
- ✅ **Liens documents** : 34 documents accessibles directement depuis les procédures
- ✅ **Aperçu PDF natif** : Visualisation documents PDF dans le navigateur (iframe)
- ✅ **Bibliothèque intelligente** : Recherche temps réel, filtres par rubrique (Réception 16, IPL 9, Préparation 4, Retours 3, Anomalies 2)
- ✅ **Responsive design** : Optimisé mobile, tablette et PC
- ✅ **Mode impression** : Checklists imprimables
- ✅ **Animations** : Effets visuels et confettis de complétion

## 🌐 URLs

- **Développement sandbox** : https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai
- **Production Cloudflare** : _(À déployer avec `npm run deploy:prod`)_
- **Nom du projet** : `gxo-procedures-moissy`

## 📁 Architecture du projet

### Structure des données
```
/home/user/webapp/
├── src/
│   ├── index.tsx              # Application Hono principale
│   ├── renderer.tsx           # Layout HTML global
│   └── pages/                 # Pages métiers
│       ├── home.tsx           # Page d'accueil
│       ├── reception.tsx      # Réception (10 procédures)
│       ├── cariste.tsx        # IPL - Intra Plant Logistics (7 procédures)
│       ├── manutention.tsx    # Préparation (5 procédures)
│       ├── chef-equipe.tsx    # Chef d'équipe
│       ├── nouveau.tsx        # Nouvel arrivant
│       └── anomalies.tsx      # Anomalies/FAQ
├── public/
│   └── static/
│       ├── app.js             # JavaScript interactif
│       ├── style.css          # Styles personnalisés
│       ├── gxo-logo.svg       # Logo GXO officiel
│       ├── ipl-illustration.svg # Illustration chariot élévateur IPL
│       └── documents/         # 26 documents procédures
└── dist/                      # Build production
```

### Services utilisés
- **Framework** : Hono (backend léger)
- **Runtime** : Cloudflare Workers/Pages
- **Styling** : TailwindCSS (CDN)
- **Icons** : Font Awesome
- **Gestion process** : PM2

## 🚀 Guide d'utilisation

### Pour les utilisateurs terrain

1. **Accéder à l'intranet** : Ouvrir l'URL sur PC, tablette ou smartphone
2. **Choisir son métier** : Cliquer sur la tuile correspondante
3. **Sélectionner un process** : Parcourir les cartes de procédures
4. **Utiliser les checklists** : Cliquer sur "Checklist interactive" pour un pas-à-pas
5. **Consulter les documents** : Télécharger les procédures détaillées
6. **FAQ** : Section Anomalies pour les cas problématiques

### Navigation rapide
- **Raccourci Ctrl+H** : Retour à l'accueil
- **ESC** : Fermer les modales
- **Recherche** : Utiliser Ctrl+F dans le navigateur

## 📊 État actuel

### ✅ Fonctionnalités complétées (100%)
- Structure complète du site
- Logo et identité GXO officielle (bleu #00205B + orange #FF6B35)
- **6 pages métiers** développées (Réception, IPL, Préparation, Retours, Nouvel Arrivant, Anomalies/FAQ)
- **65 procédures** documentées (29 Réception, 7 IPL, 5 Préparation, 3 Retours, 6 Nouvel Arrivant, 20 Anomalies/FAQ)
- **34 documents** intégrés (29 Word, 3 PDF, 1 Excel, 1 Template)
- **Manuel EWM Goods Receipt** (PDF 1.5MB) - Document de référence complet
- Checklists interactives fonctionnelles (15+ procédures)
- FAQ avec arbres de décision
- **Bibliothèque intelligente** : Recherche temps réel, filtres par rubrique, aperçu PDF natif
- Système de niveaux de complexité (🟢🟡🔴)
- Responsive design mobile/tablette/PC
- Mode impression
- Animations et effets visuels
- Interface 100% française

### 📊 Statistiques Globales
- **Pages métiers** : 6
- **Procédures totales** : 65
- **Documents** : 34
  - Réception : 16 documents (10 Word + 5 ex-Chef d'équipe + 1 PDF EWM)
  - IPL : 9 documents (7 Word + 1 Excel + 1 Template)
  - Préparation : 4 documents (Word)
  - Retours : 3 documents (Word)
  - Anomalies : 2 documents (1 Word + 1 PDF)
- **Checklists interactives** : 15+
- **Types de fichiers** : Word (29), PDF (3), Excel (1), Template (1)

### ⏳ Prochaines étapes recommandées
1. **Déploiement production** : Déployer sur Cloudflare Pages
2. **Formation utilisateurs** : Sessions de présentation et guide d'utilisation
3. **Enrichissement contenu** : Ajouter vidéos tutoriels et schémas visuels
4. **Analytics d'usage** : Tracker les procédures les plus consultées
5. **Mode hors-ligne** : Progressive Web App (PWA) pour usage sans connexion
6. **Notifications** : Alertes pour nouvelles procédures
7. **Feedback utilisateurs** : Système de commentaires et suggestions
8. **Autres manuels EWM** : Préparation, Expédition, etc.

## 🛠️ Déploiement

### Environnement de développement (Sandbox)
```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
```

### Déploiement production (Cloudflare Pages)
```bash
# Configuration
npm run build

# Déploiement
wrangler pages deploy dist --project-name gxo-intranet
```

## 📝 Notes techniques

### Performance
- Temps de chargement initial : < 2s
- Taille du bundle : ~90 KB
- Compatible tous navigateurs modernes
- Support offline en cours (PWA)

### Sécurité
- Aucune donnée sensible stockée
- Accès réseau interne recommandé
- Documents hébergés localement

### Accessibilité
- Support clavier complet
- Contrastes de couleurs validés
- Tailles de police adaptatives
- Mode réduit de mouvement

## 🎨 Charte graphique

- **Bleu GXO** : #00205B (couleur principale)
- **Orange GXO** : #FF6B35 (accent)
- **Niveaux** : 🟢 Vert / 🟡 Jaune / 🔴 Rouge
- **Police** : System fonts (-apple-system, Segoe UI, etc.)
- **Logo** : GXO Logistics officiel avec ligne orange
- **Illustrations** : SVG personnalisés (entrepôt, chariot élévateur, rayonnages)

## 📞 Support

Pour toute question ou amélioration :
- **Chef d'équipe** : Support quotidien
- **IT Support** : Problèmes techniques
- **Contribution** : Suggérer de nouvelles procédures

## 📄 Licence

© 2026 GXO Logistics - Usage interne uniquement

---

**Dernière mise à jour** : 4 février 2026  
**Version** : 2.5 STABLE  
**Développé avec** : Hono + Cloudflare Workers + TailwindCSS

---

## 📘 Documents de Référence

- **CHANGELOG_V2.5.md** : Détails de la version 2.5 (intégration Manuel EWM)
- **GUIDE_MANUEL_EWM.md** : Guide utilisateur pour le Manuel EWM Goods Receipt
- **CHANGELOG_V2.4.md** : Détails de la version 2.4 (suppression Chef d'équipe)
- **CHANGELOG_V2.1.md** : Interface française et UI compacte
- **CORRECTIONS_V2.0.md** : Corrections bibliothèque v2.0
- **BIBLIOTHEQUE_INFO.md** : Guide bibliothèque intelligente
- **APERCU_DOCUMENTS.md** : Fonctionnalité aperçu documents
