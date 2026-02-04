# Changelog Version 2.8 - Refonte Identité & URL

**Date** : 4 février 2026  
**Version** : 2.8 STABLE  
**Statut** : ✅ PRÊT POUR PRODUCTION

---

## 🎯 Objectif de la version 2.8

Améliorer l'identité du projet avec un nom plus descriptif et un sous-titre optimisé pour une meilleure lisibilité.

---

## 🔄 Changements majeurs

### 1. Refonte du nom du projet

**Avant** : `gxo-intranet`  
**Après** : `gxo-procedures-moissy`

#### Fichiers modifiés :
- ✅ `package.json` : Nom du projet et script deploy:prod
- ✅ `wrangler.jsonc` : Nom du projet Cloudflare
- ✅ `ecosystem.config.cjs` : Nom du service PM2
- ✅ `README.md` : Documentation mise à jour

### 2. Optimisation du sous-titre

**Avant** :
```
Centre de ressources opérationnelles - GXO Moissy-Cramayel
```

**Après** :
```
GXO Moissy-Cramayel - Ressources Opérationnelles
```

#### Avantages :
- ✅ Plus court et concis
- ✅ Tient sur une seule ligne sur mobile
- ✅ Meilleure lisibilité
- ✅ Hiérarchie visuelle améliorée (lieu → fonction)

---

## 📊 Impact technique

### Services PM2
```bash
# Ancien nom
pm2 list → gxo-intranet

# Nouveau nom
pm2 list → gxo-procedures-moissy
```

### Déploiement Cloudflare
```bash
# Ancien
npm run deploy:prod → wrangler pages deploy dist --project-name gxo-intranet

# Nouveau
npm run deploy:prod → wrangler pages deploy dist --project-name gxo-procedures-moissy
```

### URL de production (future)
```
https://gxo-procedures-moissy.pages.dev
```

---

## 🧪 Tests effectués

- ✅ Build réussi : `npm run build` (141.05 kB)
- ✅ Service PM2 redémarré avec nouveau nom
- ✅ Sous-titre affiché correctement sur la page d'accueil
- ✅ Navigation header mise à jour
- ✅ Tous les liens fonctionnels

---

## 📦 Contenu de la version 2.8

### Statistiques
- **Pages** : 7
- **Procédures** : 70 (29 Réception + 7 IPL + 5 Préparation + 3 Retours + 6 Nouvel Arrivant + 20 Anomalies)
- **Documents** : 36 (incluant PDF EWM 1.5MB)
- **Contacts** : 22
- **Bundle** : 141.05 kB

### Fonctionnalités principales
- ✅ HUB Procédures Logistiques
- ✅ Système d'avis avec notation étoiles
- ✅ Bibliothèque intelligente (34 documents)
- ✅ Annuaire de contacts (22 contacts)
- ✅ Manuel EWM Goods Receipt
- ✅ Interface 100% française
- ✅ Responsive design
- ✅ Aperçu PDF natif

---

## 🚀 Déploiement

### Commandes de déploiement

```bash
# Développement local
npm run build
pm2 restart gxo-procedures-moissy

# Production Cloudflare Pages
npm run deploy:prod
```

### URLs

- **Sandbox** : https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai
- **Production** : À déployer avec le nouveau nom `gxo-procedures-moissy`

---

## 📝 Notes de migration

### Pour les développeurs

1. **Mettre à jour les variables d'environnement** :
   ```bash
   # Si vous aviez des références à "gxo-intranet"
   # Remplacer par "gxo-procedures-moissy"
   ```

2. **PM2** :
   ```bash
   # Arrêter l'ancien service
   pm2 delete gxo-intranet
   
   # Démarrer le nouveau
   pm2 start ecosystem.config.cjs
   ```

3. **Git** :
   ```bash
   git pull
   npm install
   npm run build
   ```

### Pour le déploiement Cloudflare

**IMPORTANT** : Avant le premier déploiement, mettre à jour `cloudflare_project_name` dans meta_info :

```bash
# Lire la configuration actuelle
meta_info(action="read", key="cloudflare_project_name")

# Si nécessaire, mettre à jour
meta_info(action="write", key="cloudflare_project_name", value="gxo-procedures-moissy")
```

---

## ✅ Checklist de validation

- [x] Nom du projet mis à jour dans package.json
- [x] Nom du projet mis à jour dans wrangler.jsonc
- [x] Nom du service PM2 mis à jour dans ecosystem.config.cjs
- [x] Sous-titre recentré et optimisé dans home.tsx
- [x] README.md mis à jour
- [x] Build réussi
- [x] Service redémarré avec succès
- [x] Tests de navigation OK
- [x] Commit Git effectué

---

## 🔜 Prochaines étapes recommandées

1. **Déploiement production** :
   ```bash
   npm run deploy:prod
   ```

2. **Vérification post-déploiement** :
   - Tester toutes les pages
   - Vérifier les documents
   - Tester le système d'avis
   - Valider l'annuaire

3. **Communication** :
   - Informer les équipes du nouveau nom
   - Partager la nouvelle URL de production
   - Former sur les nouvelles fonctionnalités

---

## 📞 Support

Pour toute question concernant cette version :
- Consulter le README.md
- Voir les autres CHANGELOG (v2.4, v2.5, v2.6, v2.7)
- Contacter l'équipe technique

---

**Version 2.8 - GXO Procedures Moissy - Prête pour Production** 🚀
