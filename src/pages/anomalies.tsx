export function AnomaliesPage() {
  const anomalies = [
    {
      id: 'retour-fournisseur',
      title: 'Retour fournisseur',
      icon: 'fa-undo',
      level: '🔴',
      document: 'RETOUR FOURNISSEUR.docx',
      description: 'Procédure complète pour gérer un retour marchandise vers le fournisseur'
    },
    {
      id: 'decision-tree-broken',
      title: 'Produits cassés/expirés',
      icon: 'fa-exclamation-triangle',
      level: '🔴',
      document: '0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf',
      description: 'Arbre de décision pour gérer les produits endommagés ou périmés'
    },
    {
      id: 'mail-fournisseur',
      title: 'Contact fournisseur (retard/absence)',
      icon: 'fa-envelope',
      level: '🟢',
      document: 'Mail fournisseur.docx',
      description: 'Modèle de mail pour informer un fournisseur en cas de retard ou no-show'
    }
  ]

  const faq = [
    {
      question: 'Le film de la palette est déchiré',
      reponse: 'Zone quarantaine → Prise de photo → Signalement au chef d\'équipe → Ne pas mettre en stock',
      urgence: 'high'
    },
    {
      question: 'Écart quantité entre BL et réception physique',
      reponse: '1. Vérifier BL → 2. Compter à nouveau → 3. Si surplus : fichier GDS pour re-contrôle → 4. Si manco : signalement Invoice Moissy sous 48h',
      urgence: 'high'
    },
    {
      question: 'Produit avec BBD expiré',
      reponse: 'Ne PAS accepter → Faire signer le BL par le chauffeur → Photo obligatoire → Créer return line (ME22N) → Stock Control change type de stock en B2',
      urgence: 'high'
    },
    {
      question: 'Camion en retard (> 2h)',
      reponse: 'Vérifier portail → Si no-show : demander au fournisseur de rebooker via portal Action → Envoyer mail type "Mail fournisseur.docx"',
      urgence: 'medium'
    },
    {
      question: 'Étiquette illisible ou manquante',
      reponse: 'Vérifier BL pour retrouver info → Rééditer étiquette via HU dans MON → Imprimer sur imprimante contrôleur ou bureau',
      urgence: 'medium'
    },
    {
      question: 'TU bloqué en statut "Active"',
      reponse: 'Transaction EWM → MON → Transport Unit Overview → Filtrer date J-1 → Vérifier articles/HU/statut → Action : Unload + Finish unloading → Ou : Arrival + Departure',
      urgence: 'medium'
    },
    {
      question: 'Palette hazardous non signalée',
      reponse: 'STOP immédiat → Isoler la palette → Vérifier fiche sécurité → Apposer signalétique hazardous → Ranger uniquement en zone T220/T120 → Informer chef d\'équipe',
      urgence: 'high'
    },
    {
      question: 'Produit non référencé dans le système',
      reponse: 'Vérifier code article sur BL → Chercher dans MAT1 → Si inexistant : contacter Order Planning → Créer conditionnement via ZMM42 si nécessaire',
      urgence: 'medium'
    }
  ]

  return (
    <div>
      <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-3">
              <i class="fas fa-exclamation-circle mr-3"></i>
              Anomalies & FAQ
            </h1>
            <p class="text-xl opacity-90">
              Gestion incidents, litiges, arbres de décision
            </p>
          </div>
          <a href="/" class="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            <i class="fas fa-home mr-2"></i>Retour
          </a>
        </div>
      </div>

      {/* Procédures anomalies */}
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-folder-open mr-3 text-red-500"></i>
          Procédures anomalies
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {anomalies.map((anomalie) => (
            <div id={anomalie.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                <div class="flex items-center mb-2">
                  <i class={`fas ${anomalie.icon} text-2xl mr-3`}></i>
                  <h3 class="text-xl font-bold">{anomalie.title}</h3>
                </div>
                <div class="text-sm opacity-90">
                  Niveau {anomalie.level}
                </div>
              </div>
              
              <div class="p-6">
                <p class="text-gray-600 text-sm mb-4">
                  {anomalie.description}
                </p>

                <a 
                  href={`/static/documents/${anomalie.document}`}
                  target="_blank"
                  class="gxo-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 flex items-center justify-center w-full"
                >
                  <i class="fas fa-file-download mr-2"></i>
                  Voir la procédure
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ - Arbres de décision */}
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-question-circle mr-3 text-orange-500"></i>
          FAQ - Que faire si...
        </h2>
        
        <div class="space-y-4">
          {faq.map((item, index) => (
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <button 
                onclick={`toggleFaq(${index})`}
                class="w-full text-left p-6 flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                <div class="flex-1 flex items-start">
                  {item.urgence === 'high' && (
                    <i class="fas fa-exclamation-triangle text-red-500 text-xl mr-4 mt-1"></i>
                  )}
                  {item.urgence === 'medium' && (
                    <i class="fas fa-info-circle text-orange-500 text-xl mr-4 mt-1"></i>
                  )}
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-1">
                      {item.question}
                    </h3>
                    {item.urgence === 'high' && (
                      <span class="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                        URGENT
                      </span>
                    )}
                  </div>
                </div>
                <i class="fas fa-chevron-down text-gray-400 text-xl ml-4 transition-transform" id={`faq-icon-${index}`}></i>
              </button>
              
              <div id={`faq-content-${index}`} class="hidden p-6 pt-0 border-t border-gray-100">
                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
                    <i class="fas fa-arrow-right mr-2"></i>
                    Solution
                  </h4>
                  <p class="text-gray-700 whitespace-pre-line">
                    {item.reponse}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact urgence */}
      <div class="mt-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8">
        <h2 class="text-2xl font-bold mb-4 flex items-center">
          <i class="fas fa-phone-alt mr-3"></i>
          En cas d'urgence
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white bg-opacity-20 rounded-lg p-4">
            <div class="text-3xl font-bold mb-1">15</div>
            <div class="text-sm opacity-90">SAMU / Urgences médicales</div>
          </div>
          <div class="bg-white bg-opacity-20 rounded-lg p-4">
            <div class="text-3xl font-bold mb-1">18</div>
            <div class="text-sm opacity-90">Pompiers</div>
          </div>
          <div class="bg-white bg-opacity-20 rounded-lg p-4">
            <div class="text-3xl font-bold mb-1">999</div>
            <div class="text-sm opacity-90">Sécurité interne GXO</div>
          </div>
        </div>
      </div>
    </div>
  )
}
