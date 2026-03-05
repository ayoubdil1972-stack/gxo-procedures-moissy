# 📊 Guide d'Utilisation des Codes-Barres GXO Moissy

## 📋 Vue d'Ensemble

Ce document explique comment générer, imprimer et utiliser les codes-barres pour le système de gestion des 45 quais de déchargement GXO Moissy.

---

## 🎯 Liste Complète des Codes-Barres

### Zone A (Quais 1-10)
- **D001** → Quai 1
- **D002** → Quai 2
- **D003** → Quai 3
- **D004** → Quai 4
- **D005** → Quai 5
- **D006** → Quai 6
- **D007** → Quai 7
- **D008** → Quai 8
- **D009** → Quai 9
- **D010** → Quai 10

### Zone B (Quais 32-38)
- **D032** → Quai 32
- **D033** → Quai 33
- **D034** → Quai 34
- **D035** → Quai 35
- **D036** → Quai 36
- **D037** → Quai 37
- **D038** → Quai 38

### Zone C (Quais 45-49)
- **D045** → Quai 45
- **D046** → Quai 46
- **D047** → Quai 47
- **D048** → Quai 48
- **D049** → Quai 49

### Zone D (Quais 60-69)
- **D060** → Quai 60
- **D061** → Quai 61
- **D062** → Quai 62
- **D067** → Quai 67
- **D068** → Quai 68
- **D069** → Quai 69

### Zone E (Quais 75-87)
- **D075** → Quai 75
- **D076** → Quai 76
- **D077** → Quai 77
- **D078** → Quai 78
- **D079** → Quai 79
- **D081** → Quai 81
- **D082** → Quai 82
- **D083** → Quai 83
- **D084** → Quai 84
- **D085** → Quai 85
- **D086** → Quai 86
- **D087** → Quai 87

### Zone F (Quais 99-103)
- **D099** → Quai 99
- **D100** → Quai 100
- **D101** → Quai 101
- **D102** → Quai 102
- **D103** → Quai 103

---

## 🖨️ Comment Générer le PDF des Codes-Barres

### Méthode 1 : Via le Site Web (Recommandé)

1. **Accéder au générateur :**
   - URL sandbox : `https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai/generate-barcodes.html`
   - URL production : `https://gxomoissyprocedures.com/generate-barcodes.html`

2. **Générer le PDF :**
   - Cliquer sur le bouton **"🖨️ Imprimer en PDF"**
   - Dans la boîte de dialogue d'impression :
     - Destination : **"Enregistrer au format PDF"**
     - Mise en page : **Portrait (A4)**
     - Marges : **Par défaut**
   - Cliquer sur **"Enregistrer"**

3. **Résultat :**
   - Fichier PDF de ~15 pages
   - 45 codes-barres organisés par zones
   - Format professionnel prêt à imprimer

### Méthode 2 : Ouvrir le Fichier Local

1. Ouvrir le fichier `generate-barcodes.html` dans un navigateur
2. Suivre la même procédure que la Méthode 1

---

## 🖨️ Instructions d'Impression

### Recommandations d'Impression

**Format :**
- Papier : **A4 (210 × 297 mm)**
- Orientation : **Portrait**
- Qualité : **Haute qualité** (minimum 300 DPI)
- Couleur : **Couleur** (pour distinguer les zones)

**Imprimante :**
- Utiliser une imprimante laser pour une meilleure durabilité
- Alternative : imprimante jet d'encre avec papier de qualité

**Support :**
- Papier standard 80g/m² : Pour test
- Papier photo 200g/m² : Pour usage temporaire
- Étiquettes adhésives : Pour installation permanente
- Plastification recommandée pour environnement industriel

### Options d'Étiquettes

**Étiquettes autocollantes recommandées :**
- Avery L7173 (99,1 × 57 mm) - 10 par page
- Herma 4426 (105 × 57 mm) - 10 par page
- Format personnalisé : 100 × 60 mm minimum

---

## 📱 Comment Scanner les Codes-Barres

### Matériel Requis

**Scanner code-barres HID (USB ou Bluetooth) :**
- Honeywell Voyager 1200g (USB filaire)
- Zebra DS2208 (USB filaire)
- Socket Mobile S700 (Bluetooth)
- Tout scanner compatible HID émettant CODE128

**Configuration du scanner :**
- Mode HID : Activé (émule un clavier)
- Suffixe : **Enter/Retour chariot** activé
- Format : CODE128 activé
- Préfixe : Aucun (optionnel)

### Procédure de Test

**Étape 1 : Préparer l'environnement**
1. Imprimer les codes-barres
2. Connecter le scanner USB (ou coupler le Bluetooth)
3. Ouvrir la page : `https://gxomoissyprocedures.com/accueil-chauffeur`
4. Cliquer sur l'onglet **"Gestion des Quais"**
5. Vérifier que l'indicateur **"Scanner Actif"** est visible (coin bas-droite)

**Étape 2 : Scanner un code**
1. Pointer le scanner vers le code-barres (ex: **D075**)
2. Appuyer sur le bouton du scanner
3. Le scanner émet un bip et une lumière (confirmation lecture)

**Étape 3 : Observer le résultat**
1. ✅ **Notification verte** : "Scan réussi ! Quai 75 activé"
2. 🔊 **Son de confirmation** (beep court)
3. 🟢 **Surbrillance verte** sur la carte du quai (2 secondes)
4. 📜 **Scroll automatique** vers le quai scanné
5. ⏱️ **Timer démarre** à 00:00:00
6. 📊 **Statut passe** à "En cours d'utilisation" (jaune)
7. 📝 **Historique mis à jour** (panneau "Derniers Scans")

**Étape 4 : Vérifier les données**
1. Ouvrir la console du navigateur (F12)
2. Taper : `getScannerStatus()`
3. Vérifier :
   ```javascript
   {
     isActive: true,
     lastScan: { barcode: "D075", quai: 75, timestamp: "..." },
     totalScans: 1,
     mappingsCount: 45
   }
   ```

---

## 🧪 Tests Recommandés

### Test 1 : Scanner Simple
- **Objectif :** Vérifier le scan de base
- **Code :** D001
- **Résultat attendu :** Quai 1 passe à "En cours", timer démarre

### Test 2 : Scanner Multiple
- **Objectif :** Vérifier plusieurs scans consécutifs
- **Codes :** D001, D032, D075, D099
- **Résultat attendu :** Historique affiche 4 scans

### Test 3 : Scanner Zone Complète
- **Objectif :** Tester tous les codes d'une zone
- **Codes :** D001 à D010 (Zone A)
- **Résultat attendu :** Les 10 quais passent à "En cours"

### Test 4 : Code Non Reconnu
- **Objectif :** Vérifier la gestion d'erreur
- **Code :** INVALID123
- **Résultat attendu :** Notification rouge "Code-barres non reconnu"

### Test 5 : Performance
- **Objectif :** Tester la rapidité
- **Action :** Scanner 10 codes en 30 secondes
- **Résultat attendu :** Tous les scans traités sans erreur

---

## 🔧 Dépannage

### Problème : Le scanner ne fonctionne pas

**Solution 1 : Vérifier la connexion**
- USB : Débrancher/rebrancher le scanner
- Bluetooth : Vérifier le couplage
- Tester dans un éditeur de texte (Notepad) pour confirmer que le scanner émet du texte

**Solution 2 : Vérifier la configuration**
- Le scanner doit émettre un ENTER après chaque code
- Format CODE128 doit être activé
- Consulter le manuel du scanner

### Problème : Code scanné mais pas de réaction

**Solution 1 : Vérifier la page**
- Être sur `/accueil-chauffeur`
- Onglet "Gestion des Quais" doit être actif
- Indicateur "Scanner Actif" visible

**Solution 2 : Vérifier la console**
- Ouvrir F12
- Onglet "Console"
- Chercher des erreurs JavaScript

**Solution 3 : Recharger le scanner**
- Console : `initBarcodeScanner()`
- Rafraîchir la page (Ctrl+R)

### Problème : Notification d'erreur "Code non reconnu"

**Cause :** Le code scanné n'est pas dans le mapping

**Solution :**
1. Vérifier que le code correspond au format : D001, D075, etc.
2. Vérifier que le numéro de quai est valide (1-10, 32-38, 45-49, 60-69, 75-87, 99-103)
3. Si vous utilisez des codes personnalisés, mettre à jour `barcode-scanner.js`

---

## 📊 Statistiques et Suivi

### Consulter l'Historique des Scans

**Via l'interface :**
- Panneau "Derniers Scans" (affiche les 10 derniers)
- Compteur total de scans (header bleu)

**Via l'API :**
```bash
# Récupérer tous les scans
curl https://gxomoissyprocedures.com/api/quai/scans?limit=50

# Récupérer les scans d'un quai spécifique
curl https://gxomoissyprocedures.com/api/quai/scans?quai=75&limit=10
```

**Via la console navigateur :**
```javascript
// Voir le statut actuel
getScannerStatus()

// Recharger l'historique
loadScanHistory()

// Ajouter de nouveaux mappings (temporaire)
addBarcodeMappings({
  'MON_CODE': 1,
  'AUTRE_CODE': 75
})
```

---

## 🔐 Sécurité et Maintenance

### Sauvegarde des Données

**Base de données D1 :**
- Table : `quai_scans`
- Colonnes : `id`, `barcode`, `quai_numero`, `action`, `scan_timestamp`, `created_at`
- Backup automatique : Géré par Cloudflare

**LocalStorage :**
- Clé : `gxo_scan_history`
- Limite : 50 derniers scans
- Backup manuel : Copier le contenu du localStorage

### Mise à Jour des Codes-Barres

**Si vous devez ajouter/modifier des codes :**

1. Éditer `public/static/barcode-scanner.js`
2. Modifier la section `BARCODE_MAPPING` (ligne 7-19)
3. Rebuild : `npm run build`
4. Redémarrer : `pm2 restart gxo-procedures-moissy`
5. Commit : `git add -A && git commit -m "Update barcode mappings"`
6. Push : `git push origin main`

---

## 📞 Support

**En cas de problème :**
1. Consulter la console navigateur (F12)
2. Vérifier les logs PM2 : `pm2 logs gxo-procedures-moissy --nostream`
3. Tester l'API : `curl http://localhost:3000/api/quai/scans`

**Contact :** Administrateur système GXO Moissy

---

## 📝 Changelog

**Version 2.6.0 (2026-03-05)**
- ✅ Système de scan code-barres complet
- ✅ 45 codes-barres pour tous les quais
- ✅ Générateur HTML/PDF intégré
- ✅ API de tracking des scans
- ✅ Historique en temps réel

---

**Document créé le : 2026-03-05**  
**Dernière mise à jour : 2026-03-05**  
**Version : 1.0**
