# Configuration Google Cloud Translation API

## 🎯 Pourquoi Google Cloud Translation ?

**Avantages** :
- ✅ **Support de 133 langues** (dont toutes les 12 langues demandées)
- ✅ **Détection automatique de la langue** (pas besoin de spécifier la langue source)
- ✅ **Qualité professionnelle** (meilleure que MyMemory)
- ✅ **Compatible Cloudflare Workers** (simple REST API)
- ✅ **Gratuit jusqu'à 500 000 caractères/mois**
- ✅ **Pas de limite de requêtes par seconde**

**Langues supportées** :
🇫🇷 Français (fr) · 🇮🇹 Italien (it) · 🇳🇱 Néerlandais (nl) · 🇩🇪 Allemand (de) · 🇧🇬 Bulgare (bg) · 🇨🇿 Tchèque (cs) · 🇩🇰 Danois (da) · 🇫🇮 Finnois (fi) · 🇭🇷 Croate (hr) · 🇵🇱 Polonais (pl) · 🇵🇹 Portugais (pt) · 🇷🇴 Roumain (ro) · 🇬🇧 Anglais (en)

---

## 🚀 Configuration (5 minutes)

### Étape 1 : Créer un projet Google Cloud

1. **Aller sur** : https://console.cloud.google.com
2. **Se connecter** avec un compte Google
3. **Créer un nouveau projet** :
   - Cliquer sur "Select a project" (en haut)
   - Cliquer sur "NEW PROJECT"
   - Nom du projet : `gxo-procedures-translation`
   - Cliquer sur "CREATE"

### Étape 2 : Activer l'API Cloud Translation

1. **Aller sur** : https://console.cloud.google.com/apis/library/translate.googleapis.com
2. **Sélectionner le projet** `gxo-procedures-translation`
3. **Cliquer sur "ENABLE"** (Activer l'API)
4. **Attendre quelques secondes** (l'API sera activée)

### Étape 3 : Créer une clé API

1. **Aller sur** : https://console.cloud.google.com/apis/credentials
2. **Cliquer sur "CREATE CREDENTIALS"** (en haut)
3. **Sélectionner "API key"**
4. **Copier la clé** (format : `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
5. **Cliquer sur "RESTRICT KEY"** (recommandé pour la sécurité) :
   - API restrictions → "Restrict key"
   - Sélectionner uniquement : "Cloud Translation API"
   - Cliquer sur "SAVE"

### Étape 4 : Configurer Cloudflare Pages (Production)

1. **Aller sur Cloudflare Dashboard** : https://dash.cloudflare.com
2. **Pages** → Sélectionner `gxo-procedures-moissy`
3. **Settings** → **Environment variables**
4. **Add variable** :
   - Variable name : `GOOGLE_TRANSLATE_API_KEY`
   - Value : `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (votre clé)
   - Environment : **Production** ✅
   - Cliquer sur "Save"
5. **Redéployer** le site pour que la variable soit prise en compte

**Alternative : Via wrangler (CLI)** :
```bash
cd /home/user/webapp
npx wrangler pages secret put GOOGLE_TRANSLATE_API_KEY --project-name gxo-procedures-moissy
# Coller la clé API quand demandé
```

### Étape 5 : Tester la traduction

1. **Créer un chauffeur italien** :
   - URL : `https://gxo-procedures-moissy.pages.dev/chauffeur/inscription?lang=it`
   - Pseudo : `Mario Test`
   - Quai : `5`

2. **Envoyer un message** :
   - Aller sur : `https://gxo-procedures-moissy.pages.dev/chauffeur/taches?id=X&lang=it`
   - Envoyer : `Ho bisogno di aiuto con lo scarico`

3. **Vérifier côté admin** :
   - Aller sur : `https://gxo-procedures-moissy.pages.dev/accueil-chauffeur`
   - Vérifier que le message est traduit en français : `J'ai besoin d'aide pour le déchargement`

4. **Répondre en français** :
   - Admin répond : `Bonjour, allez au quai 7`
   - Chauffeur voit : `Ciao, vai al molo 7`

---

## 🔧 Développement local (optionnel)

Si vous voulez tester localement :

1. **Éditer `.dev.vars`** :
```bash
GOOGLE_TRANSLATE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

2. **Démarrer le serveur local** :
```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
```

3. **Tester** : http://localhost:3000

---

## 📊 Consommation & Tarifs

**Quota gratuit** :
- **500 000 caractères/mois** = ~10 000 messages de 50 caractères
- **Pas de limite de requêtes/seconde**
- **Au-delà** : $20 par million de caractères (~€18)

**Estimation pour GXO Procedures** :
- 100 messages/jour × 50 caractères = 5 000 caractères/jour
- 5 000 × 30 jours = **150 000 caractères/mois**
- **Reste dans le quota gratuit** ✅

**Surveiller la consommation** :
- https://console.cloud.google.com/apis/api/translate.googleapis.com/quotas

---

## 🔒 Sécurité

**Restrictions recommandées** :
1. **API restrictions** : Limiter uniquement à "Cloud Translation API"
2. **Application restrictions** : Limiter aux domaines Cloudflare Pages
3. **Quotas** : Configurer des alertes à 80% du quota gratuit

**Pour restreindre aux domaines** (optionnel) :
1. Aller sur : https://console.cloud.google.com/apis/credentials
2. Cliquer sur votre clé API
3. **Application restrictions** → "HTTP referrers"
4. Ajouter :
   - `https://gxo-procedures-moissy.pages.dev/*`
   - `https://*.gxo-procedures-moissy.pages.dev/*`
5. Cliquer sur "SAVE"

---

## 🐛 Dépannage

### La traduction ne fonctionne pas

**1. Vérifier que la clé API est configurée** :
```bash
npx wrangler pages secret list --project-name gxo-procedures-moissy
# Doit afficher : GOOGLE_TRANSLATE_API_KEY
```

**2. Vérifier les logs Cloudflare** :
- https://dash.cloudflare.com → Pages → gxo-procedures-moissy → Real-time Logs
- Chercher : `[TRADUCTION]`
- Si erreur `401 Unauthorized` → Clé API invalide
- Si erreur `403 Forbidden` → API non activée

**3. Vérifier que l'API est bien activée** :
- https://console.cloud.google.com/apis/api/translate.googleapis.com/metrics
- Doit afficher "API enabled"

**4. Tester la clé API directement** :
```bash
curl "https://translation.googleapis.com/language/translate/v2?key=VOTRE_CLE&q=Hello&target=fr"
# Doit retourner : {"data":{"translations":[{"translatedText":"Bonjour"}]}}
```

### Mode dégradé (sans clé API)

Si pas de clé API configurée, le système fonctionne en **mode dégradé** :
- ⚠️ Les messages ne sont **pas traduits** automatiquement
- Les utilisateurs voient les messages dans la langue originale
- Aucune erreur n'est affichée
- Les logs indiquent : `⚠️ [TRADUCTION] Pas de clé API Google - mode dégradé`

---

## 📝 Architecture technique

**Backend (`src/services/translation.ts`)** :
- Appelle Google Cloud Translation API v2 (REST)
- Détection automatique de la langue source
- Mode dégradé si pas de clé API
- Logs détaillés pour debug

**Endpoint POST `/api/chauffeur/chat`** :
- Lit la clé API depuis `c.env.GOOGLE_TRANSLATE_API_KEY` (Cloudflare binding)
- Chauffeur → Admin : détecte langue + traduit vers français
- Admin → Chauffeur : traduit français vers langue du chauffeur
- Stocke original + traductions en BDD

**Endpoint GET `/api/chauffeur/chat`** :
- Retourne tous les champs : `message`, `translated_fr`, `translated_chauffeur`
- Frontend affiche la traduction appropriée selon le rôle

**Frontend (JavaScript)** :
- Admin voit `msg.translated_fr`
- Chauffeur voit `msg.translated_chauffeur`
- Affichage automatique (pas de bouton de traduction)

---

## ✅ Checklist de déploiement

- [ ] Créer projet Google Cloud
- [ ] Activer API Cloud Translation
- [ ] Créer clé API
- [ ] Restreindre la clé API (sécurité)
- [ ] Ajouter `GOOGLE_TRANSLATE_API_KEY` dans Cloudflare Pages
- [ ] Redéployer le site
- [ ] Tester avec un chauffeur italien
- [ ] Vérifier les logs Cloudflare
- [ ] Surveiller la consommation API

---

## 📚 Documentation officielle

- **Google Cloud Translation API** : https://cloud.google.com/translate/docs
- **API Reference (v2)** : https://cloud.google.com/translate/docs/reference/rest/v2/translate
- **Supported languages** : https://cloud.google.com/translate/docs/languages
- **Quotas & Pricing** : https://cloud.google.com/translate/quotas
- **Cloudflare Pages Environment Variables** : https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables

---

## 🎓 Support

Si vous rencontrez des problèmes :
1. **Consulter les logs Cloudflare** (Real-time Logs)
2. **Vérifier la section Dépannage** ci-dessus
3. **Tester la clé API avec curl** (voir section Dépannage)
4. **Vérifier la consommation** : https://console.cloud.google.com/apis/api/translate.googleapis.com/quotas

---

**Date de création** : 2026-03-03  
**Version** : 1.0.0  
**Statut** : ✅ Prêt pour production
