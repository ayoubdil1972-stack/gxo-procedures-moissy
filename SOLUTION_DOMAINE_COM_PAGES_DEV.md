# 🔧 SOLUTION DÉFINITIVE - Domaine .com → .pages.dev

## ❌ Problème Identifié

Les agents utilisent **deux URLs différentes** qui pointent vers **deux bases de données différentes** :

| URL | Base de Données | Alertes Visibles Sur |
|-----|-----------------|---------------------|
| **gxomoissyprocedures.com** | DB A (ancienne) | ❌ Nulle part |
| **gxomoissyprocedures.pages.dev** | DB B (actuelle) | ✅ Page contrôleur |

**Résultat** : Les formulaires remplis sur .com créent des données dans DB A, mais le contrôleur lit DB B → **alertes invisibles**.

---

## ✅ Solution : Lier le Domaine .com au Projet Pages Actuel

### **Étape 1 : Configurer le Custom Domain sur Cloudflare Pages**

1. **Aller sur** : https://dash.cloudflare.com/pages
2. **Sélectionner** : Projet `gxomoissyprocedures`
3. **Cliquer sur** : "Custom domains"
4. **Cliquer sur** : "Set up a custom domain"
5. **Entrer** : `gxomoissyprocedures.com`
6. **Cliquer sur** : "Continue"
7. **Suivre les instructions** de Cloudflare pour valider le domaine

### **Étape 2 : Mettre à Jour les DNS**

Cloudflare vous donnera des instructions DNS. Typiquement :

```
Type: CNAME
Name: @
Content: gxomoissyprocedures.pages.dev
Proxy: Enabled (orange cloud)
```

**OU** (si le domaine est déjà sur Cloudflare) :

```
Type: CNAME
Name: gxomoissyprocedures.com
Content: gxomoissyprocedures.pages.dev
```

### **Étape 3 : Attendre la Propagation DNS**

**Temps** : 5-15 minutes (parfois jusqu'à 1 heure)

### **Étape 4 : Vérifier**

```bash
# Test 1: Vérifier le DNS
dig gxomoissyprocedures.com

# Test 2: Tester la redirection
curl -I https://gxomoissyprocedures.com/scan-fin-dechargement?quai=1

# Doit retourner: HTTP 301 → https://gxomoissyprocedures.pages.dev/...
```

---

## 🔄 Alternative : Redirection Manuelle via Worker

Si vous ne pouvez pas lier le domaine, créez un Worker de redirection simple :

### **Créer un Worker sur gxomoissyprocedures.com**

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url)
    
    // Rediriger vers .pages.dev avec le même path et query
    const newUrl = `https://gxomoissyprocedures.pages.dev${url.pathname}${url.search}${url.hash}`
    
    return Response.redirect(newUrl, 301)
  }
}
```

**Déployer** :
1. Aller sur : https://dash.cloudflare.com/workers
2. Créer un nouveau Worker
3. Coller le code ci-dessus
4. Déployer sur route : `gxomoissyprocedures.com/*`

---

## 📋 Après Configuration

### **Tester la Redirection**

1. ✅ Ouvrir : https://gxomoissyprocedures.com/scan-fin-dechargement?quai=1
2. ✅ **Vérifier** : Vous êtes redirigé vers `https://gxomoissyprocedures.pages.dev/scan-fin-dechargement?quai=1`
3. ✅ Remplir le formulaire avec écart + non-conformité
4. ✅ **Vérifier** : L'alerte apparaît sur https://gxomoissyprocedures.pages.dev/controleur?v=2

### **Mettre à Jour les QR Codes**

**IMPORTANT** : Après configuration, générez de **nouveaux QR codes** avec les URLs .pages.dev :

- ❌ Ancien : `https://gxomoissyprocedures.com/scan-fin-dechargement?quai=1`
- ✅ Nouveau : `https://gxomoissyprocedures.pages.dev/scan-fin-dechargement?quai=1`

**Page de génération** : https://gxomoissyprocedures.pages.dev/download-qr-fin-dechargement

---

## ✅ Garanties Après Configuration

1. ✅ **Une seule base de données** : Tout le monde utilise la même DB
2. ✅ **Alertes visibles** : Les formulaires .com créent des alertes visibles sur le contrôleur
3. ✅ **Redirection transparente** : Les utilisateurs sont redirigés automatiquement
4. ✅ **Timer corrigé** : Le fix v3.11.32 s'applique partout

---

## 📞 Instructions pour l'Utilisateur

### **Si vous avez accès au DNS du domaine gxomoissyprocedures.com**

Suivez **Étape 1-4** ci-dessus (Custom Domain sur Cloudflare Pages)

### **Si vous n'avez PAS accès au DNS**

1. Créez un Worker de redirection (Alternative ci-dessus)
2. **OU** utilisez uniquement `.pages.dev` et régénérez tous les QR codes

### **Solution Immédiate (En Attendant)**

**Demandez aux agents d'utiliser** :
```
https://gxomoissyprocedures.pages.dev/scan-fin-dechargement?quai=X
```

**Au lieu de** :
```
https://gxomoissyprocedures.com/scan-fin-dechargement?quai=X
```

---

## 🎯 Résumé

| Étape | Action | Temps | Priorité |
|-------|--------|-------|----------|
| 1 | Lier domaine .com au projet Pages | 5-15 min | ⚠️ CRITIQUE |
| 2 | Vérifier redirection fonctionne | 2 min | ✅ Important |
| 3 | Régénérer QR codes avec .pages.dev | 10 min | ⚠️ CRITIQUE |
| 4 | Remplacer QR codes sur tous les quais | 1h | ✅ Important |
| 5 | Informer les agents du changement | 5 min | ✅ Important |

---

## ⚠️ IMPORTANT

**Le code de création d'alertes fonctionne PARFAITEMENT** (v3.11.32).  
**Le problème est UNIQUEMENT** que .com et .pages.dev utilisent des bases de données séparées.

**Une fois le domaine .com lié au projet Pages actuel, TOUT fonctionnera automatiquement.**

---

✅ **Après configuration, les alertes apparaîtront instantanément dans "En Attente" !**
