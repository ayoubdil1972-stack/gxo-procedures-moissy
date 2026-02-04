# Guide d'Intégration du Système d'Avis

## 📋 Vue d'Ensemble

Le système d'avis permet aux utilisateurs de :
- ⭐ Noter les procédures (1-5 étoiles)
- 💬 Laisser des commentaires
- 👍 Aimer les commentaires utiles
- 📊 Voir les statistiques (moyenne, nombre d'avis)

## 🔧 Intégration dans une Page de Procédure

### 1. Structure HTML de la Carte Procédure

Ajoutez ces éléments dans chaque carte de procédure :

```jsx
<div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
  {/* Header avec titre et badge note */}
  <div class="flex items-start justify-between mb-4">
    <h3 class="text-xl font-bold text-gray-800 flex-1">
      <i class={`fas ${process.icon} mr-2`}></i>
      {process.title}
    </h3>
    
    {/* Badge note moyenne - caché si aucune note */}
    <div 
      data-procedure-rating={process.id} 
      class="hidden"
    >
      {/* Sera rempli par JavaScript */}
    </div>
  </div>

  {/* Contenu de la procédure */}
  <div class="space-y-3 mb-4">
    {/* ... votre contenu ... */}
  </div>

  {/* Footer avec boutons */}
  <div class="flex gap-2 mt-6">
    {/* Bouton document */}
    <a 
      href={`/static/documents/${process.document}`}
      class="flex-1 bg-[#00205B] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors text-center"
    >
      <i class="fas fa-file-download mr-2"></i>
      Télécharger
    </a>

    {/* Bouton avis - NOUVEAU */}
    <button
      onclick={`showReviewModal('${process.id}', '${process.title}')`}
      class="bg-[#FF6B35] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
      title="Donner votre avis"
    >
      <i class="fas fa-star"></i>
    </button>
  </div>
</div>
```

### 2. Exemple Complet pour reception.tsx

```jsx
export function ReceptionPage() {
  const processes = [
    {
      id: 'reception-standard',
      title: 'Réception palette fournisseur',
      icon: 'fa-truck-loading',
      duration: '15-20 min',
      level: '🟢',
      vigilance: ['Vérifier état emballage', 'Scanner BL complet'],
      document: 'Assigner camion à quai-2.docx'
    },
    // ... autres procédures
  ]

  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processes.map(process => (
          <div class="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">
                <i class={`fas ${process.icon} mr-2`}></i>
                {process.title}
              </h3>
              <div data-procedure-rating={process.id} class="hidden"></div>
            </div>

            {/* Informations */}
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-gray-600">
                <i class="fas fa-clock w-6 mr-2"></i>
                <span>{process.duration}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-signal w-6 mr-2"></i>
                <span class="text-2xl">{process.level}</span>
              </div>
            </div>

            {/* Points de vigilance */}
            {process.vigilance && (
              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p class="font-semibold text-gray-800 mb-2">
                  <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                  Points de vigilance :
                </p>
                <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {process.vigilance.map(point => (
                    <li>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Boutons d'action */}
            <div class="flex gap-2">
              <a 
                href={`/static/documents/${process.document}`}
                class="flex-1 bg-[#00205B] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors text-center"
              >
                <i class="fas fa-file-download mr-2"></i>
                Télécharger le document
              </a>
              <button
                onclick={`showReviewModal('${process.id}', '${process.title}')`}
                class="bg-[#FF6B35] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
                title="Donner votre avis"
              >
                <i class="fas fa-star"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 📊 Stockage des Données

Les avis sont stockés dans **localStorage** du navigateur :

```javascript
{
  "procedure-id": {
    "ratings": [
      { "rating": 5, "userName": "Jean", "timestamp": "2026-02-04T..." },
      { "rating": 4, "userName": "Marie", "timestamp": "2026-02-04T..." }
    ],
    "comments": [
      {
        "text": "Très claire, merci !",
        "userName": "Jean",
        "rating": 5,
        "timestamp": "2026-02-04T...",
        "date": "04/02/2026",
        "time": "10:30",
        "likes": 3
      }
    ],
    "averageRating": 4.5,
    "totalRatings": 2
  }
}
```

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `/static/reviews.js`, modifiez les classes Tailwind :

```javascript
// Bouton principal
'bg-[#00205B] hover:bg-[#003DA5]'  // Bleu GXO

// Bouton secondaire
'bg-[#FF6B35] hover:bg-[#FF8555]'  // Orange GXO

// Badge note
'bg-yellow-100 text-yellow-800'    // Jaune pour étoiles
```

### Ajouter des Filtres

Pour filtrer les commentaires (ex: par note) :

```javascript
// Dans loadProcedureReviews()
const filteredComments = data.comments.filter(c => c.rating >= 4)
```

## 🔒 Sécurité & Modération

⚠️ **Important** : Ce système stocke les avis localement (localStorage). Pour la production :

1. **Backend nécessaire** pour :
   - Authentification utilisateurs
   - Stockage centralisé (base de données)
   - Modération des commentaires
   - Protection contre spam

2. **Améliorations recommandées** :
   - Vérification email avant publication
   - Limite de caractères (min/max)
   - Détection de contenu inapproprié
   - Rate limiting (1 avis par procédure par utilisateur)

## 📱 Responsive Design

Le modal s'adapte automatiquement :
- **PC** : Largeur max 2xl (672px)
- **Tablette** : Marges réduites
- **Mobile** : Pleine largeur avec scroll

## 🎯 Bonnes Pratiques

1. **Encourager les avis** :
   - Ajouter un message après utilisation d'une procédure
   - Rappel périodique pour les utilisateurs réguliers

2. **Afficher les statistiques** :
   - Procédures les mieux notées sur l'accueil
   - Badge "Top procédure" si note > 4.5

3. **Répondre aux commentaires** :
   - Les chefs d'équipe peuvent répondre
   - Marquer les commentaires "Vérifié par l'équipe"

## 🧪 Tests

Pour tester le système :

```javascript
// Console navigateur
addRating('reception-standard', 5, 'Jean')
addComment('reception-standard', 'Excellente procédure !', 'Marie', 4)
getProcedureReviews('reception-standard')
```

## 📈 Statistiques Globales

Pour afficher les stats globales :

```javascript
function getGlobalStats() {
  const reviews = getReviews()
  const stats = {
    totalProcedures: Object.keys(reviews).length,
    totalRatings: 0,
    totalComments: 0,
    averageRating: 0
  }

  Object.values(reviews).forEach(proc => {
    stats.totalRatings += proc.totalRatings
    stats.totalComments += proc.comments.length
  })

  // Calculer moyenne globale
  let sum = 0
  let count = 0
  Object.values(reviews).forEach(proc => {
    proc.ratings.forEach(r => {
      sum += r.rating
      count++
    })
  })
  stats.averageRating = count > 0 ? (sum / count).toFixed(1) : 0

  return stats
}
```

## 🚀 Déploiement

Le système fonctionne immédiatement sans configuration :
1. ✅ Script `reviews.js` chargé dans renderer.tsx
2. ✅ Modal HTML intégré dans renderer.tsx
3. ✅ Boutons d'avis dans les cartes procédures
4. ✅ Badges de note automatiques

---

**Version** : 1.0  
**Date** : 4 février 2026  
**Compatible** : GXO Intranet v2.6+
