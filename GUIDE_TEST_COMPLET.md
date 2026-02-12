# 🧪 GUIDE DE TEST COMPLET - SYSTÈME CHAUFFEURS

## 🎯 OBJECTIF

Tester l'intégralité du parcours chauffeur extérieur avant déploiement en production.

---

## ✅ CHECKLIST PRÉ-DÉPLOIEMENT

### 1. Tests Sandbox (Actuellement)
```
Base URL: https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai
```

- [ ] Page QR Code charge correctement
- [ ] QR Code est visible et scannable
- [ ] Sélection langue : 12 langues affichées
- [ ] Vidéo NL se lance sur iPhone 12
- [ ] Bouton PLAY orange visible
- [ ] Barre de progression fonctionne
- [ ] Formulaire inscription accessible
- [ ] Validation tâches fonctionne
- [ ] Toutes les vidéos (12) sont présentes

### 2. Tests Production (Après déploiement)
```
Base URL: https://gxo-procedures-moissy.pages.dev
```

- [ ] Page QR Code charge correctement
- [ ] QR Code est visible et scannable
- [ ] Sélection langue : 12 langues affichées
- [ ] Vidéo NL se lance sur iPhone 12
- [ ] Bouton PLAY orange visible
- [ ] Barre de progression fonctionne
- [ ] Formulaire inscription accessible
- [ ] Validation tâches fonctionne
- [ ] Toutes les vidéos (12) sont déployées

---

## 🔬 TESTS DÉTAILLÉS

### Test 1 : Page QR Code

**URL Sandbox** :
```
https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai/qrcode-chauffeur
```

**URL Production** :
```
https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
```

**Tests à effectuer** :
```bash
# Test 1.1 : Page charge (200 OK)
curl -I https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur
# Attendu: HTTP/2 200

# Test 1.2 : QR Code présent
curl -s https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur | grep "qrcode-container"
# Attendu: <div id="qrcode-container">

# Test 1.3 : Logo GXO présent
curl -s https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur | grep "gxo-logo"
# Attendu: src="/static/gxo-logo-official.svg"

# Test 1.4 : Lien vers sélection langue
curl -s https://gxo-procedures-moissy.pages.dev/qrcode-chauffeur | grep "/chauffeur/langue"
# Attendu: href="/chauffeur/langue"
```

**Test manuel (navigateur)** :
1. Ouvrir l'URL
2. ✅ Logo GXO visible
3. ✅ QR Code orange visible
4. ✅ Instructions en français
5. ✅ Bouton "Accéder au système" cliquable
6. ✅ Design responsive (mobile + desktop)

---

### Test 2 : Sélection de langue

**URL Sandbox** :
```
https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai/chauffeur/langue
```

**URL Production** :
```
https://gxo-procedures-moissy.pages.dev/chauffeur/langue
```

**Tests à effectuer** :
```bash
# Test 2.1 : Page charge
curl -I https://gxo-procedures-moissy.pages.dev/chauffeur/langue
# Attendu: HTTP/2 200

# Test 2.2 : 12 langues présentes
curl -s https://gxo-procedures-moissy.pages.dev/chauffeur/langue | grep -c "chauffeur/video?lang="
# Attendu: 12

# Test 2.3 : Français présent
curl -s https://gxo-procedures-moissy.pages.dev/chauffeur/langue | grep "Français"
# Attendu: <h3>Français</h3>

# Test 2.4 : Nederlands présent
curl -s https://gxo-procedures-moissy.pages.dev/chauffeur/langue | grep "Nederlands"
# Attendu: <h3>Nederlands</h3>
```

**Test manuel (navigateur)** :
1. Ouvrir l'URL
2. ✅ Logo GXO visible
3. ✅ Titre multilingue affiché
4. ✅ 12 cartes de langue visibles
5. ✅ Drapeaux emoji affichés
6. ✅ Hover effect fonctionne
7. ✅ Clic redirige vers vidéo

**Liste des langues à vérifier** :
- [ ] 🇫🇷 Français (fr)
- [ ] 🇳🇱 Nederlands (nl)
- [ ] 🇫🇮 Suomi (fi)
- [ ] 🇩🇪 Deutsch (de)
- [ ] 🇮🇹 Italiano (it)
- [ ] 🇵🇱 Polski (pl)
- [ ] 🇵🇹 Português (pt)
- [ ] 🇧🇬 Български (bg)
- [ ] 🇨🇿 Čeština (cs)
- [ ] 🇩🇰 Dansk (da)
- [ ] 🇭🇷 Hrvatski (hr)
- [ ] 🇷🇴 Română (ro)

---

### Test 3 : Vidéo d'instructions (12 langues)

**URLs à tester** :
```
NL: https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl
FR: https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=fr
DE: https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=de
... (12 au total)
```

**Tests automatiques (pour chaque langue)** :
```bash
# Test 3.1 : Page vidéo charge
curl -I "https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl"
# Attendu: HTTP/2 200

# Test 3.2 : Fichier vidéo existe
curl -I "https://gxo-procedures-moissy.pages.dev/static/videos/instructions-nl.mp4"
# Attendu: HTTP/2 200
# Attendu: Content-Length: ~5000000 (5 MB)
# Attendu: Accept-Ranges: bytes

# Test 3.3 : Range Request fonctionne (iOS)
curl -I -H "Range: bytes=0-1023" "https://gxo-procedures-moissy.pages.dev/static/videos/instructions-nl.mp4"
# Attendu: HTTP/2 206 Partial Content
# Attendu: Content-Range: bytes 0-1023/5000000
```

**Test manuel (iPhone 12 Safari)** :
1. Ouvrir `https://gxo-procedures-moissy.pages.dev/chauffeur/video?lang=nl`
2. ✅ Page noire avec bande orange
3. ✅ Logo GXO centré
4. ✅ Label "Nederlandse instructies"
5. ✅ Bouton PLAY orange visible
6. ✅ Clic sur PLAY → vidéo se lance immédiatement
7. ✅ Pas de message d'erreur
8. ✅ Barre de progression orange visible
9. ✅ Progression se met à jour
10. ✅ Plein écran fonctionne
11. ✅ Bouton "Doorgaan" apparaît à la fin
12. ✅ Clic sur "Doorgaan" → redirige vers inscription

**Vidéos à tester (12)** :
```bash
for lang in nl fr de fi da cs bg pl ro it pt hr; do
  echo "Testing $lang..."
  curl -I "https://gxo-procedures-moissy.pages.dev/static/videos/instructions-$lang.mp4"
done
```

- [ ] instructions-nl.mp4 (5.0 MB)
- [ ] instructions-fr.mp4 (5.2 MB)
- [ ] instructions-de.mp4 (5.0 MB)
- [ ] instructions-fi.mp4 (5.0 MB)
- [ ] instructions-da.mp4 (4.5 MB)
- [ ] instructions-cs.mp4 (5.0 MB)
- [ ] instructions-bg.mp4 (5.2 MB)
- [ ] instructions-pl.mp4 (5.1 MB)
- [ ] instructions-ro.mp4 (5.2 MB)
- [ ] instructions-it.mp4 (5.1 MB)
- [ ] instructions-pt.mp4 (5.2 MB)
- [ ] instructions-hr.mp4 (5.2 MB)

---

### Test 4 : Formulaire d'inscription

**URL** :
```
https://gxo-procedures-moissy.pages.dev/chauffeur/inscription
```

**Tests automatiques** :
```bash
# Test 4.1 : Page charge
curl -I https://gxo-procedures-moissy.pages.dev/chauffeur/inscription
# Attendu: HTTP/2 200

# Test 4.2 : Formulaire présent
curl -s https://gxo-procedures-moissy.pages.dev/chauffeur/inscription | grep "<form"
# Attendu: <form...

# Test 4.3 : API inscription fonctionne
curl -X POST https://gxo-procedures-moissy.pages.dev/api/chauffeur/inscription \
  -H "Content-Type: application/json" \
  -d '{
    "pseudo": "Test Driver",
    "entreprise": "Test Transport",
    "numero_quai": "12",
    "langue": "nl",
    "video_completed": true
  }'
# Attendu: {"success":true,"id":...}
```

**Test manuel (navigateur)** :
1. Ouvrir l'URL
2. ✅ Formulaire visible
3. ✅ Champ "Pseudo" présent
4. ✅ Champ "Entreprise" présent
5. ✅ Champ "Numéro de quai" présent
6. ✅ Langue pré-remplie (si vient de vidéo)
7. ✅ Remplir le formulaire
8. ✅ Cliquer sur "S'inscrire"
9. ✅ Message de succès affiché
10. ✅ Redirection vers /chauffeur/taches

---

### Test 5 : Gestion des tâches

**URL** :
```
https://gxo-procedures-moissy.pages.dev/chauffeur/taches
```

**Tests automatiques** :
```bash
# Test 5.1 : Page charge
curl -I https://gxo-procedures-moissy.pages.dev/chauffeur/taches
# Attendu: HTTP/2 200

# Test 5.2 : API validation tâche fonctionne
curl -X POST https://gxo-procedures-moissy.pages.dev/api/chauffeur/valider-tache \
  -H "Content-Type: application/json" \
  -d '{
    "chauffeur_id": 1,
    "tache": "epi"
  }'
# Attendu: {"success":true}
```

**Test manuel (navigateur)** :
1. Ouvrir l'URL
2. ✅ Liste des 5 tâches affichée
3. ✅ Tâche 1: EPI porté
4. ✅ Tâche 2: Placement au quai
5. ✅ Tâche 3: Échange palette
6. ✅ Tâche 4: Accueil notifié
7. ✅ Tâche 5: Clefs remises
8. ✅ Cliquer sur "Valider" pour une tâche
9. ✅ Statut change de ⏳ à ✅
10. ✅ Timestamp affiché
11. ✅ Barre de progression mise à jour
12. ✅ Toutes les tâches validables

---

## 🔄 FLUX COMPLET (TEST E2E)

### Scénario 1 : Chauffeur néerlandais sur iPhone 12

**Étape par étape** :
```
1. Ouvrir Safari sur iPhone 12
2. Scanner le QR Code (ou ouvrir /qrcode-chauffeur)
   ✅ Page QR Code chargée en <2s
   
3. Cliquer sur "Accéder au système"
   ✅ Redirigé vers /chauffeur/langue
   ✅ 12 langues affichées
   
4. Cliquer sur 🇳🇱 Nederlands
   ✅ Redirigé vers /chauffeur/video?lang=nl
   ✅ Page vidéo chargée en <1s
   
5. Cliquer sur bouton PLAY orange
   ✅ Vidéo se lance immédiatement
   ✅ Pas de buffering
   ✅ Son audible
   
6. Regarder la vidéo (30s)
   ✅ Barre de progression se met à jour
   ✅ Aucun freeze
   
7. Cliquer sur "Doorgaan" à la fin
   ✅ Redirigé vers /chauffeur/inscription
   ✅ Langue "nl" pré-remplie
   
8. Remplir le formulaire :
   - Pseudo: "Jan V."
   - Entreprise: "Transport NL"
   - Quai: "15"
   ✅ Formulaire tactile optimisé
   
9. Cliquer sur "S'inscrire"
   ✅ Message succès affiché
   ✅ Redirigé vers /chauffeur/taches
   
10. Valider les tâches une par une
    ✅ Chaque validation affiche ✅
    ✅ Timestamps enregistrés
    ✅ Progression 0% → 20% → 40% → 60% → 80% → 100%
    
11. Toutes tâches validées
    ✅ Message de félicitations
    ✅ Chauffeur prêt pour chargement
```

**Temps total attendu** : 3-5 minutes

---

### Scénario 2 : Chauffeur français sur Android

**Étape par étape** :
```
1. Ouvrir Chrome sur Android
2. Scanner le QR Code
   ✅ Page QR Code chargée
   
3. Cliquer sur "Accéder au système"
   ✅ Sélection langue affichée
   
4. Cliquer sur 🇫🇷 Français
   ✅ Page vidéo chargée
   
5. Cliquer sur PLAY
   ✅ Vidéo se lance
   
6. Regarder la vidéo
   ✅ Lecture fluide
   
7. Cliquer sur "Continuer"
   ✅ Formulaire d'inscription
   
8. Remplir et soumettre
   ✅ Inscription réussie
   
9. Valider les tâches
   ✅ Toutes validées
```

---

## 📊 RÉSULTATS ATTENDUS

### Performance
- [ ] Page QR Code : <2s
- [ ] Sélection langue : <1s
- [ ] Chargement vidéo : <1s
- [ ] Lecture vidéo : fluide, 0 freeze
- [ ] Formulaire : <1s
- [ ] Validation tâche : <500ms

### Fonctionnalités
- [ ] 12/12 langues fonctionnent
- [ ] 12/12 vidéos se lancent
- [ ] QR Code scannable
- [ ] Formulaire validation correcte
- [ ] Tâches enregistrées en DB

### Compatibilité
- [ ] iPhone 12 (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (Chrome, Firefox, Safari)

---

## 🚨 PROBLÈMES CONNUS & SOLUTIONS

### Problème 1 : Vidéo ne se lance pas sur iOS
**Symptôme** : Bouton PLAY grisé, message d'erreur
**Cause** : Range Requests non supportés
**Solution** : Vérifier headers Accept-Ranges sur Cloudflare

### Problème 2 : QR Code ne scanne pas
**Symptôme** : Appareil photo ne reconnaît pas le QR
**Cause** : Contraste insuffisant, taille trop petite
**Solution** : QR Code orange #FF5A1A sur fond blanc, taille 200x200px

### Problème 3 : Inscription échoue
**Symptôme** : Erreur 500 après submit
**Cause** : DB D1 non initialisée
**Solution** : Exécuter migrations avant déploiement

---

## 📝 RAPPORT DE TEST

### Template de rapport
```markdown
# Rapport de Test - Système Chauffeurs

**Date** : [DATE]
**Testeur** : [NOM]
**Environnement** : [Sandbox / Production]
**Appareil** : [iPhone 12 / Android / Desktop]

## Tests effectués

### ✅ Tests réussis
- [ ] Page QR Code
- [ ] Sélection langue
- [ ] Vidéo NL
- [ ] Vidéo FR
- [ ] Formulaire inscription
- [ ] Validation tâches

### ❌ Tests échoués
- [ ] [Décrire le problème]

### 📊 Performance
- Temps de chargement page : [X]s
- Temps de chargement vidéo : [X]s
- Fluidité vidéo : [Fluide / Saccadé]

### 💡 Recommandations
- [Recommandation 1]
- [Recommandation 2]

### 📸 Captures d'écran
- [Ajouter captures si nécessaire]
```

---

## 🎯 CRITÈRES DE VALIDATION

### ✅ Ready for Production si :
- [ ] Tous les tests sandbox passent
- [ ] 12/12 vidéos fonctionnent
- [ ] Test iPhone 12 réussi
- [ ] Test Android réussi
- [ ] Performance < 2s par page
- [ ] Aucune erreur console
- [ ] DB D1 accessible
- [ ] QR Code scannable

### ❌ Blocker si :
- [ ] Vidéos ne se lancent pas sur iOS
- [ ] Erreurs 500 sur API
- [ ] QR Code non scannable
- [ ] Performance > 5s
- [ ] Formulaire ne soumet pas

---

**Dernière mise à jour** : 12 février 2026  
**Status** : ✅ Prêt pour tests
