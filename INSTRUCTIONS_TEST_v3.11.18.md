# 🔧 INSTRUCTIONS DE TEST - Version v3.11.18

## ✅ Version Déployée
- **Version**: v3.11.18  
- **Date**: 13 Mars 2026 - 22:28 UTC
- **URL Production**: https://gxomoissyprocedures.pages.dev
- **URL Preview**: https://f6c12941.gxomoissyprocedures.pages.dev

---

## 🚀 NOUVELLE VERSION AVEC LOGS VERBEUX

Cette version inclut :
1. ✅ **Badge de version visible** sur la page de fin de déchargement
2. ✅ **Logs console très détaillés** pour tracer chaque étape
3. ✅ **Détection garantie** des écarts, non-conformités et problèmes

---

## 📋 PROCÉDURE DE TEST ÉTAPE PAR ÉTAPE

### 1️⃣ **VIDER LE CACHE COMPLÈTEMENT**

**Sur Chrome/Edge:**
```
1. Appuyez sur Ctrl + Shift + Delete (Windows) ou Cmd + Shift + Delete (Mac)
2. Sélectionnez "Images et fichiers en cache"
3. Période : "Toutes les périodes"
4. Cliquez sur "Effacer les données"
```

**OU utilisez le mode navigation privée:**
```
1. Ctrl + Shift + N (Chrome) ou Ctrl + Shift + P (Firefox)
2. Ouvrez directement l'URL dans cette fenêtre
```

---

### 2️⃣ **OUVRIR LA PAGE ET VÉRIFIER LA VERSION**

```
URL: https://gxomoissyprocedures.pages.dev/scan-fin-dechargement?quai=2
```

**Vous DEVEZ voir :**
- ✅ Badge vert en haut : **"v3.11.18 - 2026-03-13"**
- Si vous ne voyez PAS ce badge → Le cache n'est pas vidé → Recommencez l'étape 1

---

### 3️⃣ **OUVRIR LA CONSOLE DU NAVIGATEUR**

**Sur Chrome/Edge/Firefox:**
```
Appuyez sur F12
OU
Clic droit → Inspecter → Onglet "Console"
```

**Vous DEVEZ voir ces messages :**
```
🚀🚀🚀 VERSION v3.11.18 CHARGÉE - 2026-03-13T22:28:XX.XXXZ 🚀🚀🚀
✅ Détection automatique: Écarts + Non-conformités + Problèmes
✅ Création alertes en_attente garantie
```

**Si vous ne voyez PAS ces messages → Le cache n'est pas vidé → Recommencez l'étape 1**

---

### 4️⃣ **REMPLIR LE FORMULAIRE AVEC UN ÉCART**

```
Nom agent: [Votre nom]
N°ID: TEST_QUAI2_v11818
Fournisseur: TEST
Palettes attendues: 10
Palettes reçues: 7  ← ÉCART de 3 palettes
Palettes à rendre: Oui

Vérifications (tous ✅ Conforme) :
Point 1: ✅ Conforme
Point 2: ✅ Conforme
Point 3: ✅ Conforme
Point 4: ✅ Conforme
Point 5: ✅ Conforme
Point 6: ✅ Conforme
Point 7: ✅ Conforme

Problématiques rencontrées:
☑ Palettes instables / chargées de manière incorrecte  ← Cochez cette case

Autres commentaires: (laisser vide)
Remarques: Test v3.11.18 Quai 2
```

---

### 5️⃣ **VALIDER LE FORMULAIRE**

Cliquez sur **"Valider la fin de déchargement"**

---

### 6️⃣ **VÉRIFIER LES LOGS CONSOLE**

**Vous DEVEZ voir dans la console :**

```
📦 Données du formulaire: {quai_numero: 2, nom_agent: "...", ...}

📊 Résumé données:
  - Palettes: 10 attendues → 7 reçues
  - Écart: OUI ⚠️
  - Points vérification: 7 points
  - Problèmes: 1 problème(s) coché(s)
    → palettes_instables

🌐 Envoi vers API /api/fin-dechargement...

✅ Réponse API: {success: true, id: XXX, alerte_creee: true, ...}

🚨 ALERTE CRÉÉE: OUI ✅

🐛 Debug info: {
  verification_points_recus: 7,
  problemes_recus: 1,
  ecart_palettes: true,
  alerte_erreur: null
}
```

**Points critiques à vérifier:**
- ✅ `Écart: OUI ⚠️`
- ✅ `Problèmes: 1 problème(s) coché(s)`
- ✅ `alerte_creee: true`
- ✅ `ecart_palettes: true`

---

### 7️⃣ **VÉRIFIER L'ALERTE DANS LA PAGE CONTRÔLEUR**

```
URL: https://gxomoissyprocedures.pages.dev/controleur?v=2
```

1. Cliquez sur l'onglet **"Écart et Non-conformité"**
2. Attendez **maximum 10 secondes**
3. Vous DEVEZ voir l'alerte avec :
   - Quai 2
   - ID: TEST_QUAI2_v11818
   - Écart: 10 → 7
   - Problème: palettes_instables

---

## 🐛 SI ÇA NE FONCTIONNE TOUJOURS PAS

### Cas 1 : Badge de version absent
→ **Le cache n'est pas vidé**
→ Solution : Mode navigation privée obligatoire

### Cas 2 : Logs console absents
→ **Ancienne version chargée**
→ Solution : 
```
1. Videz TOUT le cache (pas seulement les images)
2. Fermez TOUS les onglets du site
3. Redémarrez le navigateur
4. Ouvrez en navigation privée
```

### Cas 3 : Logs présents mais `alerte_creee: false`
→ **Problème backend**
→ Solution : Copiez-collez TOUS les logs de la console et envoyez-les moi

### Cas 4 : `alerte_creee: true` mais pas d'alerte visible
→ **Problème de refresh automatique**
→ Solution : Appuyez sur F5 sur la page contrôleur

---

## 📸 CAPTURES D'ÉCRAN À ENVOYER SI PROBLÈME

Si ça ne fonctionne toujours pas, envoyez-moi des captures d'écran de :

1. **Page de fin de déchargement** → Badge de version visible en haut
2. **Console du navigateur** → TOUS les logs (de `🚀🚀🚀 VERSION` jusqu'à `🐛 Debug info`)
3. **Page contrôleur** → Rubrique "En attente" après 10 secondes

---

## ✅ RÉSULTAT ATTENDU

**Si tout fonctionne correctement :**

1. ✅ Badge **"v3.11.18 - 2026-03-13"** visible
2. ✅ Logs console présents avec **"VERSION v3.11.18 CHARGÉE"**
3. ✅ Après validation : **`alerte_creee: true`**
4. ✅ Alerte visible dans **"En attente"** en moins de 10 secondes

---

**Date de génération**: 13 Mars 2026 - 22:28 UTC  
**Version**: v3.11.18  
**Statut**: ✅ DÉPLOYÉ EN PRODUCTION
