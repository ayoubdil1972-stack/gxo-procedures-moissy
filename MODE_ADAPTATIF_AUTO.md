# 🔄 Mode Adaptatif Automatique - GXO Procedures Moissy v2.19

## 📋 Résumé
**Détection automatique de la taille d'écran avec indicateur visuel "AUTO" et possibilité de forcer un mode**

---

## 🎯 Fonctionnalité

### **Mode Adaptatif Automatique**
✅ **Détection automatique** : Le site s'adapte automatiquement à la taille d'écran  
✅ **Seuil de basculement** : 768px (standard mobile/tablette)  
✅ **Indicateur visuel** : Badge orange "AUTO" sous le bouton  
✅ **Mode forcé** : Clic simple pour forcer un mode (auto → manuel)  
✅ **Réinitialisation** : Double-clic pour revenir au mode automatique  
✅ **Responsive en temps réel** : S'adapte au redimensionnement de la fenêtre  

---

## 🚀 Comportement

### **1. Mode Automatique (Par Défaut)**
```
Largeur écran < 768px  → Mode Mobile
Largeur écran ≥ 768px  → Mode Desktop
```

**Indicateur** : Badge orange "AUTO" visible sous le bouton  
**Tooltip** : 
- "Mode adaptatif automatique (< 768px) - Cliquez pour forcer ordinateur"
- "Mode adaptatif automatique (≥ 768px) - Cliquez pour forcer mobile"

### **2. Mode Forcé (Après 1er Clic)**
L'utilisateur clique sur le bouton → Le mode est **forcé** manuellement.

**Indicateur** : Badge "AUTO" caché  
**Tooltip** :
- "Mode mobile forcé - Cliquez pour passer en mode ordinateur"
- "Mode ordinateur forcé - Cliquez pour passer en mode portable"

**Persistance** : Le choix est sauvegardé dans localStorage  
**Redimensionnement** : Le mode ne change **PAS** même si on redimensionne

### **3. Retour au Mode Automatique (Double-Clic)**
L'utilisateur double-clique sur le bouton → Retour au mode **automatique**.

**Indicateur** : Badge "AUTO" réapparaît  
**Comportement** : Le site s'adapte à nouveau automatiquement

---

## 💻 Code JavaScript

### **Fonction de Détection Automatique**
```javascript
function detectScreenSize() {
  const width = window.innerWidth;
  const userPreference = localStorage.getItem('viewportModeManual');
  
  // Si mode forcé manuellement, ne pas écraser
  if (userPreference === 'true') {
    return;
  }
  
  // Afficher l'indicateur AUTO
  const autoIndicator = document.getElementById('auto-indicator');
  if (autoIndicator) {
    autoIndicator.classList.remove('hidden');
  }
  
  // Seuil : 768px
  if (width < 768) {
    // Mode Mobile
    body.classList.add('mobile-mode');
    icon.className = 'fas fa-desktop';
    button.title = 'Mode adaptatif automatique (< 768px)';
  } else {
    // Mode Desktop
    body.classList.remove('mobile-mode');
    icon.className = 'fas fa-mobile-alt';
    button.title = 'Mode adaptatif automatique (≥ 768px)';
  }
}
```

### **Fonction Toggle (Forcer un Mode)**
```javascript
function toggleViewportMode() {
  body.classList.toggle('mobile-mode');
  
  // Marquer comme choix manuel
  localStorage.setItem('viewportModeManual', 'true');
  
  // Cacher l'indicateur AUTO
  autoIndicator.classList.add('hidden');
  
  if (body.classList.contains('mobile-mode')) {
    button.title = 'Mode mobile forcé - Cliquez pour passer en ordinateur';
  } else {
    button.title = 'Mode ordinateur forcé - Cliquez pour passer en mobile';
  }
}
```

### **Fonction de Réinitialisation (Mode Auto)**
```javascript
function resetToAutoMode() {
  // Supprimer la préférence manuelle
  localStorage.removeItem('viewportModeManual');
  
  // Réafficher l'indicateur AUTO
  const autoIndicator = document.getElementById('auto-indicator');
  if (autoIndicator) {
    autoIndicator.classList.remove('hidden');
  }
  
  // Relancer la détection automatique
  detectScreenSize();
}
```

### **Event Listeners**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const userPreference = localStorage.getItem('viewportModeManual');
  
  if (userPreference === 'true') {
    // Mode forcé : appliquer la préférence
    applyManualMode();
  } else {
    // Mode auto : détecter la taille d'écran
    detectScreenSize();
  }
  
  // Double-clic pour réinitialiser en mode auto
  const toggleButton = document.getElementById('viewport-toggle');
  toggleButton.addEventListener('dblclick', function(e) {
    e.preventDefault();
    resetToAutoMode();
  });
  
  // Écouter le redimensionnement (mode auto uniquement)
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      detectScreenSize();
    }, 250);
  });
});
```

---

## 🎨 Styles CSS

### **Indicateur AUTO**
```css
.auto-indicator {
  position: absolute;
  bottom: -20px;
  right: 50%;
  transform: translateX(50%);
  background: #FF6B35; /* Orange GXO */
  color: white;
  font-size: 8px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 6px rgba(255, 107, 53, 0.4);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.auto-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}
```

### **Bouton Toggle (position relative pour l'indicateur)**
```css
.viewport-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* ... autres styles ... */
  position: relative; /* Pour positionner l'indicateur */
}
```

---

## 📊 Scénarios d'Usage

### **Scénario 1 : Utilisateur sur Desktop (1920px)**
1. **Premier chargement** : Mode Desktop automatique, badge "AUTO" visible
2. **Redimensionnement à 600px** : Bascule automatiquement en mode Mobile
3. **Redimensionnement à 1000px** : Rebascule automatiquement en mode Desktop

### **Scénario 2 : Utilisateur préfère forcer Mobile sur Desktop**
1. **Premier chargement** : Mode Desktop automatique (1920px)
2. **Clic sur bouton** : Force le mode Mobile, badge "AUTO" caché
3. **Redimensionnement** : Reste en mode Mobile (forcé)
4. **Double-clic** : Retour au mode automatique, badge "AUTO" réapparaît

### **Scénario 3 : Utilisateur sur smartphone (375px)**
1. **Premier chargement** : Mode Mobile automatique, badge "AUTO" visible
2. **Rotation paysage (667px)** : Reste en mode Mobile (< 768px)
3. **Clic sur bouton** : Force le mode Desktop (rare mais possible)
4. **Double-clic** : Retour au mode Mobile automatique

---

## 🔧 LocalStorage

### **Clés Utilisées**
| Clé | Valeurs | Description |
|-----|---------|-------------|
| `viewportMode` | `"mobile"` / `"desktop"` | Mode actuellement actif |
| `viewportModeManual` | `"true"` / absent | Si présent : mode forcé manuellement |

### **États**
```javascript
// Mode Automatique
localStorage.getItem('viewportModeManual') === null
→ Détection automatique active

// Mode Forcé
localStorage.getItem('viewportModeManual') === 'true'
→ Préférence manuelle, pas de détection auto
```

---

## ✅ Avantages

### **Pour les Utilisateurs**
✅ **Confort** : Le site s'adapte automatiquement à l'écran  
✅ **Contrôle** : Possibilité de forcer un mode préféré  
✅ **Feedback visuel** : Badge "AUTO" indique le mode automatique  
✅ **Réversible** : Double-clic pour revenir au mode auto  
✅ **Persistant** : Le choix est sauvegardé entre les visites  

### **Pour le Développement**
✅ **Intelligent** : Détecte les tablettes (768px) et smartphones (< 768px)  
✅ **Performant** : Debounce de 250ms sur le resize  
✅ **Maintenable** : Code modulaire et commenté  
✅ **Accessible** : Tooltips explicatifs  

---

## 📏 Seuils de Détection

### **Pourquoi 768px ?**
| Appareil | Largeur typique | Mode |
|----------|-----------------|------|
| **Smartphone** | 320-414px | Mobile (< 768px) |
| **Tablette portrait** | 600-768px | Mobile (< 768px) |
| **Tablette paysage** | 768-1024px | Desktop (≥ 768px) |
| **Laptop** | 1024-1440px | Desktop (≥ 768px) |
| **Desktop** | 1440px+ | Desktop (≥ 768px) |

**Standard Bootstrap** : 768px est le seuil `md` (medium)  
**Standard Material Design** : 600-840dp pour tablettes  
**Standard iOS** : iPad mini/Air en portrait = 768px  

---

## 🎯 Instructions Utilisateur

### **Mode Automatique (Par Défaut)**
```
📱 Le site s'adapte automatiquement
🟠 Badge "AUTO" visible sous le bouton
🔄 Redimensionnez la fenêtre → adaptation instantanée
```

### **Forcer un Mode**
```
1️⃣ Cliquez UNE FOIS sur le bouton bleu
2️⃣ Le mode est forcé (mobile ou desktop)
3️⃣ Badge "AUTO" disparaît
4️⃣ Le mode ne change plus au redimensionnement
```

### **Retour au Mode Automatique**
```
1️⃣ Double-cliquez sur le bouton bleu
2️⃣ Badge "AUTO" réapparaît
3️⃣ Le site s'adapte à nouveau automatiquement
```

---

## 📊 Statistiques v2.19

| Métrique | Valeur | vs v2.18 | Évolution |
|----------|--------|----------|-----------|
| **Bundle** | 195.41 kB | +0.79 kB | Détection auto ajoutée |
| **Build time** | 1.05s | -0.03s | ⚡ Optimisé |
| **Modules** | 72 | - | - |
| **JS ajouté** | ~80 lignes | - | Détection + reset |
| **CSS ajouté** | ~20 lignes | - | Badge AUTO |

---

## 📂 Fichiers Modifiés

### **1. `/public/static/app.js`**
**Ajouts** :
- ✅ Fonction `detectScreenSize()` (~35 lignes)
- ✅ Fonction `resetToAutoMode()` (~8 lignes)
- ✅ Event listener `resize` avec debounce
- ✅ Event listener `dblclick` pour reset
- ✅ Gestion de l'indicateur AUTO

**Lignes ajoutées** : ~80 lignes

### **2. `/src/renderer.tsx`**
**Ajouts** :
- ✅ Span `<span id="auto-indicator">AUTO</span>`
- ✅ Styles CSS `.auto-indicator` (~20 lignes)
- ✅ `position: relative` sur `.viewport-toggle`

**Lignes ajoutées** : ~25 lignes

---

## 🌐 URLs d'Accès

- **Développement (Sandbox)** : https://3000-ibzeqaecibecjb5vgjy15-8f57ffe2.sandbox.novita.ai
- **Production** : https://gxo-procedures-moissy.pages.dev
- **Archive v2.19** : [En cours de création]

---

## 📚 Version Finale - GXO PROCEDURES MOISSY v2.19

### **Contenu**
✅ **70 procédures** documentées  
✅ **36 documents** avec aperçu  
✅ **114 contacts** (10 services)  
✅ **25 checklists** interactives  
✅ **15 solutions** arbre de décision  

### **Fonctionnalités**
✅ **Authentification** sécurisée  
✅ **Modal Déconnexion** élégante  
✅ **Icône Succès** coche verte  
✅ **Onboarding** intelligent  
✅ **Page Login** animée  
✅ **Arbre Décision** adaptatif  
✅ **Aperçus Documents** in-browser  
✅ **Toggle Desktop/Mobile**  
✅ **Mode Mobile Optimisé**  
✅ **NOUVEAU** : **Mode Adaptatif Automatique** 🎉  

### **Mode Adaptatif**
✅ Détection automatique **< 768px → Mobile**  
✅ Détection automatique **≥ 768px → Desktop**  
✅ Badge "AUTO" visible en mode automatique  
✅ Clic simple pour **forcer un mode**  
✅ Double-clic pour **retour automatique**  
✅ Responsive en **temps réel**  

### **Technique**
- **Bundle** : 195.41 kB
- **Build time** : 1.05s ⚡
- **Modules** : 72
- **Interface** : 100% française
- **Design** : Responsive adaptatif
- **État** : ✅ **Production Ready**

---

## 📊 Historique des Versions

| Version | Bundle | Nouveauté |
|---------|--------|-----------|
| v2.16 | 183.21 kB | Aperçus documents |
| v2.17 | 184.83 kB | Toggle Desktop/Mobile |
| v2.18 | 194.62 kB | Mode Mobile Optimisé |
| **v2.19** | **195.41 kB** | **🎉 Mode Adaptatif Automatique** |

---

## 🎉 Félicitations !

### **🔄 Plateforme GXO v2.19 - Mode Adaptatif Intelligent**
- ✅ Détection automatique **taille d'écran**
- ✅ Badge "AUTO" **orange visible**
- ✅ Seuil intelligent **768px**
- ✅ Force mode **1 clic**
- ✅ Retour auto **double-clic**
- ✅ Responsive **temps réel**
- ✅ **Prêt pour production** 🚀

---

**Date** : 2026-02-04  
**Version** : **v2.19**  
**Status** : ✅ **Production Ready - Adaptive Mode**
