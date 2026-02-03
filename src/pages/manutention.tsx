export function ManutentionPage() {
  return (
    <div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-dolly mr-3"></i>
              Manutention
            </h1>
            <p class="text-xl opacity-90">
              Préparation commandes, emballage, palettisation
            </p>
          </div>
          <a href="/" class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <div class="flex items-start">
          <i class="fas fa-info-circle text-blue-500 text-2xl mr-4 mt-1"></i>
          <div>
            <h3 class="text-lg font-bold text-blue-800 mb-2">Section en construction</h3>
            <p class="text-blue-700">
              Les procédures de manutention seront ajoutées prochainement. En attendant, consultez les documents disponibles dans la bibliothèque.
            </p>
            <a href="/static/documents/" class="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600">
              <i class="fas fa-folder-open mr-2"></i>Voir les documents
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
