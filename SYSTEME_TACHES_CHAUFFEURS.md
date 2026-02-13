# 🚀 GXO - Système de Gestion des Tâches Chauffeurs v12.0

## 📋 Vue d'Ensemble

**Version** : 12.0  
**Date** : 11 février 2026  
**Statut** : ✅ Prêt pour déploiement

Le nouveau système permet de :
1. ✅ **Chauffeurs** : Suivre et valider leurs tâches de déchargement étape par étape
2. ✅ **Admins** : Surveiller tous les chauffeurs en temps réel avec un dashboard
3. ✅ **Communication** : Chat bidirectionnel entre chauffeurs et admins

---

## 🎯 Parcours Complet du Chauffeur

### **Étape 1 : Arrivée et Scan QR Code**
- URL : `/qrcode-chauffeur`
- Le chauffeur scanne le QR Code affiché sur site

### **Étape 2 : Sélection de Langue**
- URL : `/chauffeur/langue`
- 12 langues disponibles : FR, NL, FI, DE, IT, PL, PT, BG, CS, DA, HR, RO

### **Étape 3 : Vidéo d'Instructions**
- URL : `/chauffeur/consignes?lang=XX`
- Vidéo d'induction sans sous-titres (chargement < 1s)
- Obligation de regarder la vidéo complète

### **Étape 4 : Inscription** ✨ NOUVEAU
- URL : `/chauffeur/inscription`
- Formulaire :
  - Pseudo / Nom
  - Entreprise de transport
  - Numéro de quai attribué (Q1-Q20)
- Redirection automatique vers `/chauffeur/taches?id=XXX`

### **Étape 5 : Tâches de Déchargement** ✨ NOUVEAU
- URL : `/chauffeur/taches?id=XXX`
- **5 Tâches Obligatoires** :
  1. 🦺 **EPI Porté** (2 min) - Casque, gilet, chaussures
  2. 🚚 **Placement au Quai** (5 min) - Garer et caler le camion
  3. 📦 **Échange Palettes** (10 min) - Compter palettes EUR
  4. 🔔 **Accueil Notifié** (3 min) - Signaler sa présence
  5. 🔑 **Remise Clés** (2 min) - Remettre les clés à l'agent

**Fonctionnalités** :
- ✅ Barre de progression en temps réel
- ✅ Timer depuis l'arrivée
- ✅ Validation individuelle de chaque tâche
- ✅ Message de félicitations à 100%
- ✅ Bouton chat pour communiquer avec l'accueil
- ✅ Actualisation automatique toutes les 10s

---

## 👨‍💼 Dashboard Admin

### **Accès**
- URL : `/admin/chauffeurs-dashboard`
- Route protégée (nécessite authentification)

### **Fonctionnalités**

#### **1. Statistiques Temps Réel**
- 📊 **Tâches Complètes** : Nombre de chauffeurs ayant terminé
- ⏳ **En Cours** : Nombre de chauffeurs actifs
- 🆕 **Nouveaux** : Chauffeurs venant d'arriver
- 💬 **Messages Non Lus** : Notifications de chat

#### **2. Tableau des Chauffeurs Actifs**
Pour chaque chauffeur :
- **Informations** : Pseudo, Entreprise, Quai assigné
- **Progression** : Barre visuelle + pourcentage
- **Tâches** : 5 icônes (✅ validé / ⭕ en attente)
- **Durée** : Temps écoulé depuis l'arrivée
- **Actions** :
  - 💬 **Chat** : Ouvrir conversation
  - 👁️ **Détails** : Voir le profil complet

#### **3. Système de Chat**
- Chat bidirectionnel en temps réel
- Historique complet des messages
- Statut lu/non lu
- Notification visuelle de nouveaux messages
- Interface modale élégante

#### **4. Notifications Temps Réel**
- Affichage des événements importants :
  - Nouveau chauffeur arrivé
  - Tâches terminées
  - Messages reçus
  - Alertes
- Système de priorité (low, normal, high, urgent)
- Marquer comme lu

#### **5. Actualisation Automatique**
- Mise à jour toutes les 5 secondes
- Pas de rechargement de page nécessaire
- Animation fluide des changements

---

## 📊 Structure de la Base de Données

### **Migration 0003 : Système de Tâches**
Fichier : `migrations/0003_chauffeur_tasks_system.sql`

#### **Table : `etapes_dechargement`**
Template des étapes configurables
```sql
- id, ordre, titre, description, icone, duree_estimee
- obligatoire, active, created_at
```

#### **Table : `chauffeur_arrivals`**
Enregistre l'arrivée et la progression de chaque chauffeur
```sql
- id, pseudo, entreprise, numero_quai, langue
- video_completed, status (in_progress, completed, cancelled)
- arrival_time, completion_time
- task_epi_porte, task_epi_porte_time
- task_placement_quai, task_placement_quai_time
- task_palette_change, task_palette_change_time
- task_accueil_notifie, task_accueil_notifie_time
- task_clefs_remises, task_clefs_remises_time
- progression_percent
```

#### **Table : `chat_messages`**
Messages entre chauffeurs et admins
```sql
- id, chauffeur_id, sender (chauffeur/admin), message
- message_type (text, voice, file)
- read_by_admin, read_by_chauffeur
- timestamp
```

#### **Table : `notifications`**
Notifications pour les admins
```sql
- id, chauffeur_id, type (arrival, task_complete, message, alert)
- titre, message, priority (low, normal, high, urgent)
- read, timestamp
```

---

## 🔌 API Endpoints

### **Chauffeurs (Public)**

#### `POST /api/chauffeur/inscription`
Inscrire un nouveau chauffeur
```json
{
  "pseudo": "Jean Dupont",
  "entreprise": "DHL Express",
  "numero_quai": "Q5",
  "langue": "fr",
  "video_completed": true
}
```

#### `POST /api/chauffeur/valider-tache`
Valider une tâche
```json
{
  "chauffeur_id": 123,
  "tache": "epi" // epi, placement, palette, accueil, clefs
}
```

#### `GET /api/chauffeur/progression?id=123`
Récupérer la progression d'un chauffeur

#### `POST /api/chauffeur/chat`
Envoyer un message (chauffeur → admin)
```json
{
  "chauffeur_id": 123,
  "message": "J'ai besoin d'aide"
}
```

#### `GET /api/chauffeur/chat?chauffeur_id=123`
Récupérer les messages d'un chauffeur

#### `POST /api/chauffeur/notification`
Créer une notification
```json
{
  "chauffeur_id": 123,
  "type": "all_tasks_complete",
  "titre": "Chauffeur Prêt",
  "message": "Jean a terminé toutes les tâches au quai Q5"
}
```

### **Admin (Protected)**

#### `GET /api/chauffeur/liste`
Liste de tous les chauffeurs actifs

#### `POST /api/admin/chat`
Envoyer un message (admin → chauffeur)
```json
{
  "chauffeur_id": 123,
  "message": "Un agent arrive dans 5 minutes"
}
```

#### `POST /api/chauffeur/chat/mark-read`
Marquer les messages comme lus
```json
{
  "chauffeur_id": 123,
  "reader": "admin" // ou "chauffeur"
}
```

#### `GET /api/notifications/non-lues`
Récupérer les notifications non lues

#### `POST /api/notification/mark-read`
Marquer une notification comme lue
```json
{
  "notification_id": 456
}
```

---

## 📁 Fichiers Créés

### **Pages TypeScript** (`src/pages/`)
1. `chauffeur-taches.tsx` - Page des tâches chauffeur
2. `admin-dashboard-chauffeurs.tsx` - Dashboard admin
3. `chauffeur-inscription.tsx` - Formulaire d'inscription (mis à jour)

### **Scripts JavaScript** (`public/static/`)
1. `chauffeur-taches.js` - Logique de la page tâches
2. `admin-dashboard-chauffeurs.js` - Logique du dashboard admin
3. `chauffeur-inscription.js` - Logique d'inscription et redirection

### **Base de Données** (`migrations/`)
1. `0003_chauffeur_tasks_system.sql` - Migration complète du système

### **Backend** (`src/`)
1. `index.tsx` - Routes et API endpoints (mis à jour)

---

## 🚀 Déploiement

### **Étape 1 : Appliquer la Migration**
```bash
# En local
npx wrangler d1 migrations apply gxo-chauffeurs-db --local

# En production
npx wrangler d1 migrations apply gxo-chauffeurs-db --remote
```

### **Étape 2 : Build**
```bash
npm run build
```

### **Étape 3 : Tester en Local**
```bash
# Dans le sandbox
cd /home/user/webapp
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# Tester
curl http://localhost:3000/chauffeur/inscription
curl http://localhost:3000/admin/chauffeurs-dashboard
```

### **Étape 4 : Déployer en Production**
```bash
# Depuis votre ordinateur (connexion plus rapide)
export CLOUDFLARE_API_TOKEN="GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h"
npx wrangler pages deploy dist --project-name gxo-procedures-moissy --branch main
```

---

## 🧪 Tests

### **Test Chauffeur**
1. Ouvrir : `https://gxo-moissy-v2.pages.dev/qrcode-chauffeur`
2. Scanner le QR Code
3. Choisir une langue
4. Regarder la vidéo
5. S'inscrire (pseudo, entreprise, quai)
6. Valider les 5 tâches une par une
7. Tester le chat avec l'admin

### **Test Admin**
1. Ouvrir : `https://gxo-moissy-v2.pages.dev/admin/chauffeurs-dashboard`
2. Vérifier les statistiques
3. Voir les chauffeurs actifs dans le tableau
4. Cliquer sur le bouton chat d'un chauffeur
5. Envoyer un message
6. Vérifier les notifications

---

## 📈 Prochaines Fonctionnalités (v13.0+)

### **Court Terme**
- ✨ Messages vocaux dans le chat
- ✨ Envoi de photos (ex: palettes comptées)
- ✨ Notifications push pour les admins
- ✨ Export des données en CSV

### **Moyen Terme**
- ✨ Statistiques avancées (temps moyen par tâche, etc.)
- ✨ Interface admin pour modifier les étapes
- ✨ Système de scoring des chauffeurs
- ✨ Intégration avec système d'impression d'étiquettes

### **Long Terme**
- ✨ Application mobile native
- ✨ Reconnaissance vocale pour valider les tâches
- ✨ Géolocalisation pour tracking précis

---

## 🎨 Design

### **Couleurs**
- **Orange GXO** : `#FF5A1A` / `#FF4500`
- **Bleu Admin** : `#3B82F6` / `#2563EB`
- **Vert Succès** : `#10B981`
- **Rouge Urgent** : `#EF4444`

### **Icônes** (Font Awesome)
- 🦺 EPI : `fa-hard-hat`
- 🚚 Placement : `fa-truck-loading`
- 📦 Palettes : `fa-pallet`
- 🔔 Accueil : `fa-bell`
- 🔑 Clés : `fa-key`
- 💬 Chat : `fa-comments`
- 📊 Dashboard : `fa-chart-line`

---

## 🔐 Sécurité

### **Routes Publiques** (Chauffeurs)
- `/qrcode-chauffeur`
- `/chauffeur/langue`
- `/chauffeur/video`
- `/chauffeur/inscription`
- `/chauffeur/taches`
- `/api/chauffeur/*`

### **Routes Protégées** (Admin)
- `/admin/chauffeurs-dashboard`
- `/api/admin/*`
- `/api/notifications/*`

**Note** : En production, implémenter une authentification JWT ou session-based pour les routes admin.

---

## 📞 Support

**Documentation** :
- **Ce fichier** : SYSTEME_TACHES_CHAUFFEURS.md
- **Déploiement** : DEPLOYMENT.md
- **README général** : README.md

**API Token Cloudflare** : `GHqSQXfIeCtSNCo4TmaPXWSgQOzNW8h2oMMVaT3h`

**Dashboard Cloudflare** : https://dash.cloudflare.com/

**Database ID** : `28637bef-a644-4661-8cca-829f84058875`

---

**Version** : 12.0  
**Dernière mise à jour** : 11 février 2026  
**Auteur** : GXO Logistics Moissy
