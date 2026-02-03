# 👁️ Aperçu de Documents - Guide d'Utilisation

## 🎯 Vue d'ensemble

La bibliothèque GXO Intranet permet maintenant de **prévisualiser les documents directement dans le navigateur** sans avoir à les télécharger.

---

## ✨ Fonctionnalités

### 📄 **Types de documents supportés**

| Type | Extension | Méthode de visualisation |
|------|-----------|--------------------------|
| **PDF** | `.pdf` | ✅ Affichage natif iframe |
| **Word** | `.docx` | ✅ Microsoft Office Online Viewer |
| **Excel** | `.xlsx`, `.xltm` | ✅ Microsoft Office Online Viewer |

---

## 🚀 Utilisation

### 1. **Ouvrir un aperçu**

Dans la bibliothèque, sur chaque carte de document :

1. Cliquez sur le bouton **"Aperçu"** (🔵 bleu)
2. Une fenêtre modale s'ouvre en plein écran
3. Le document s'affiche automatiquement

### 2. **Actions disponibles dans l'aperçu**

| Action | Icône | Description |
|--------|-------|-------------|
| **Télécharger** | 📥 | Télécharge le document (bouton orange) |
| **Fermer** | ✖️ | Ferme l'aperçu (bouton X) |
| **Échap** | ⌨️ | Touche clavier pour fermer |

---

## 🎨 Interface de l'aperçu

### **Modal plein écran**
```
┌─────────────────────────────────────────────────────┐
│  Nom du document                 📥 Télécharger  ✖️  │
│  Aperçu du document                                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│            CONTENU DU DOCUMENT                      │
│              (PDF, Word, Excel)                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Dimensions** : 90% de la hauteur d'écran (90vh)  
**Largeur maximale** : 1536px (max-w-6xl)

---

## 📱 Compatibilité

### **Navigateurs supportés**
- ✅ **Chrome** / **Edge** (recommandés)
- ✅ **Firefox**
- ✅ **Safari**
- ⚠️ **Mobiles** : Fonctionne mais expérience limitée

### **Appareils**
- ✅ **PC** : Expérience optimale
- ✅ **Tablette** : Bonne expérience
- ⚠️ **Smartphone** : Aperçu limité, téléchargement recommandé

---

## 🔧 Fonctionnement technique

### **PDF** (affichage natif)
```javascript
<iframe src="/static/documents/document.pdf"></iframe>
```
- Affichage direct dans le navigateur
- Pas de service externe requis
- Rapide et fiable

### **Word/Excel** (Microsoft Office Online)
```javascript
https://view.officeapps.live.com/op/embed.aspx?src=URL_DU_DOCUMENT
```
- Utilise le visualiseur Microsoft Office Online
- Nécessite une connexion Internet
- Peut prendre quelques secondes à charger

---

## ⚠️ Limitations et solutions

### **Problème : L'aperçu Word/Excel ne s'affiche pas**

**Causes possibles** :
- 📡 Connexion Internet lente ou instable
- 🔒 Document protégé par mot de passe
- 🚫 Service Microsoft temporairement indisponible

**Solutions** :
1. ✅ Cliquez sur **"Télécharger"** pour ouvrir localement
2. ✅ Vérifiez votre connexion Internet
3. ✅ Réessayez dans quelques instants

**Message d'aide affiché** :
> ℹ️ Si l'aperçu ne s'affiche pas, cliquez sur "Télécharger" pour ouvrir le document localement.

### **Problème : Type de fichier non supporté**

Pour les types non supportés, un message s'affiche :
```
📄 Aperçu non disponible
Ce type de fichier ne peut pas être prévisualisé dans le navigateur.
[Télécharger le document]
```

---

## 💡 Bonnes pratiques

### **Quand utiliser l'aperçu ?**
✅ Consultation rapide d'un document  
✅ Vérifier le contenu avant téléchargement  
✅ Lire un PDF court  
✅ Consulter une procédure simple  

### **Quand télécharger directement ?**
📥 Besoin de modifier le document  
📥 Utilisation hors ligne  
📥 Document volumineux (>5 MB)  
📥 Impression nécessaire  

---

## 🎯 Avantages de l'aperçu

### **Pour les utilisateurs**
- ⚡ **Rapidité** : Consultation immédiate sans téléchargement
- 🎯 **Simplicité** : Un seul clic pour voir le contenu
- 💾 **Économie** : Pas d'encombrement du disque dur
- 🔍 **Vérification** : S'assurer du bon document avant téléchargement

### **Pour l'organisation**
- 📊 **Efficacité** : Moins d'allers-retours
- 🌱 **Écologique** : Réduction des téléchargements inutiles
- 📈 **Productivité** : Accès plus rapide à l'information
- 🎓 **Formation** : Consultation facilitée pour les nouveaux

---

## 🔐 Sécurité et confidentialité

### **Microsoft Office Online Viewer**
- ✅ Service officiel Microsoft
- ✅ HTTPS sécurisé
- ✅ Aucune donnée stockée par Microsoft
- ✅ Visualisation temporaire uniquement

### **Données**
- 🔒 Documents hébergés sur votre serveur GXO
- 🔒 Transmission sécurisée (HTTPS)
- 🔒 Aucune copie externe permanente

---

## 📊 Exemples d'utilisation

### **Scénario 1 : Vérifier une procédure**
```
1. Chercher "LTRMS" dans la bibliothèque
2. Cliquer sur "Aperçu" du document trouvé
3. Lire rapidement la procédure
4. Fermer l'aperçu (ESC)
5. Retourner à la liste sans téléchargement
```

### **Scénario 2 : Consulter un arbre de décision (PDF)**
```
1. Filtrer par "Anomalies"
2. Cliquer sur "Aperçu" du Decision Tree PDF
3. Consulter l'arbre de décision directement
4. Télécharger si besoin pour usage ultérieur
```

### **Scénario 3 : Vérifier un template Excel**
```
1. Chercher "workload"
2. Cliquer sur "Aperçu"
3. Attendre le chargement (Office Online)
4. Vérifier la structure du template
5. Télécharger pour remplir hors ligne
```

---

## 🚀 Prochaines améliorations possibles

- 📱 Amélioration de l'expérience mobile
- 🔍 Zoom et navigation dans les documents
- 📄 Support de types supplémentaires (images, vidéos)
- 💬 Annotations et commentaires
- 📊 Statistiques de consultation

---

## 📞 Support

Pour toute question ou problème avec l'aperçu des documents, contacter l'équipe IT GXO Moissy.

---

**Version** : 2.2  
**Date** : 2026-02-03  
**Statut** : ✅ Actif
