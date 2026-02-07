export function ContactsPage() {
  // Base de données des contacts GXO Moissy-Cramayel - Tous services
  const contacts = [
    
    // Direction
    {
      id: 1,
      nom: 'NGUIDJOL',
      prenom: 'Gabriel',
      fonction: 'Directeur Opérationnel',
      service: 'Direction',
      telephone: '06 26 39 00 52',
      extension: '',
      email: 'gabriel.nguidjol@gxo.com',
      mobile: '06 26 39 00 52',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Direction',
      keywords: 'directeur operationnel direction management'
    },
    {
      id: 2,
      nom: 'MOUNAIM',
      prenom: 'Hassan',
      fonction: 'Directeur de site',
      service: 'Direction',
      telephone: '06 23 36 29 99',
      extension: '',
      email: 'hassan.mounaim@gxo.com',
      mobile: '06 23 36 29 99',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Direction',
      keywords: 'directeur site direction management'
    },
    {
      id: 3,
      nom: 'GUSSIE',
      prenom: 'Rocky',
      fonction: 'Directeur d\'Exploitation IPL/Réception',
      service: 'Direction',
      telephone: '06 22 11 97 45',
      extension: '',
      email: 'rocky.gussie@gxo.com',
      mobile: '06 22 11 97 45',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Direction',
      keywords: 'directeur exploitation ipl reception'
    },
    {
      id: 4,
      nom: 'MEBTOUL',
      prenom: 'Nabelle',
      fonction: 'Directeur d\'Exploitation Préparation/Expédition',
      service: 'Direction',
      telephone: '06 30 24 58 17',
      extension: '',
      email: 'nabelle.mebtoul@gxo.com',
      mobile: '06 30 24 58 17',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Direction',
      keywords: 'directeur exploitation preparation expedition'
    },
    {
      id: 5,
      nom: 'BARSOUM',
      prenom: 'Rafik',
      fonction: 'Directeur d\'Exploitation GDS/Process Control/Retour',
      service: 'Direction',
      telephone: '06 23 36 99 37',
      extension: '',
      email: 'rafik.barsoum@gxo.com',
      mobile: '06 23 36 99 37',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Direction',
      keywords: 'directeur exploitation gds process control retour'
    },
    {
      id: 6,
      nom: 'LE BRIS',
      prenom: 'Fabrice',
      fonction: 'Responsable maintenance',
      service: 'Direction',
      telephone: '06 22 92 23 02',
      extension: '',
      email: 'fabrice.lebris@gxo.com',
      mobile: '06 22 92 23 02',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Direction',
      keywords: 'responsable maintenance direction'
    },
    {
      id: 7,
      nom: 'HADDOUCHANE',
      prenom: 'Houssam',
      fonction: 'Ingénieur Méthode',
      service: 'Direction',
      telephone: '07 76 11 44 11',
      extension: '',
      email: 'houssam.haddouchane@gxo.com',
      mobile: '07 76 11 44 11',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Direction',
      keywords: 'ingenieur methode direction'
    },
    {
      id: 8,
      nom: 'VALY',
      prenom: 'Thierry',
      fonction: 'RQHSSE',
      service: 'Direction',
      telephone: '07 77 82 73 30',
      extension: '',
      email: 'thierry.valy@gxo.com',
      mobile: '07 77 82 73 30',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Direction',
      keywords: 'rqhsse qualite securite environnement'
    },
    
    // Réception
    {
      id: 200,
      nom: '',
      prenom: '',
      fonction: 'Admin',
      service: 'Réception',
      telephone: '',
      extension: '150327',
      email: 'admin.reception@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Réception',
      keywords: 'admin reception'
    },
    {
      id: 201,
      nom: '',
      prenom: '',
      fonction: 'Agent de quai',
      service: 'Réception',
      telephone: '',
      extension: '150321',
      email: 'agent.quai1@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'agent quai reception'
    },
    {
      id: 202,
      nom: '',
      prenom: '',
      fonction: 'Agent de quai',
      service: 'Réception',
      telephone: '',
      extension: '150325',
      email: 'agent.quai2@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'agent quai reception'
    },
    {
      id: 203,
      nom: '',
      prenom: '',
      fonction: 'Agent de quai',
      service: 'Réception',
      telephone: '',
      extension: '150310',
      email: 'agent.quai3@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'agent quai reception'
    },
    {
      id: 204,
      nom: '',
      prenom: '',
      fonction: 'Agent de quai',
      service: 'Réception',
      telephone: '',
      extension: '150347',
      email: 'agent.quai4@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'agent quai reception'
    },
    {
      id: 205,
      nom: '',
      prenom: '',
      fonction: 'Agent de quai',
      service: 'Réception',
      telephone: '',
      extension: '150328',
      email: 'agent.quai5@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'agent quai reception'
    },
    {
      id: 206,
      nom: '',
      prenom: '',
      fonction: 'Contrôleur',
      service: 'Réception',
      telephone: '',
      extension: '150352',
      email: 'controleur1@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'controleur reception'
    },
    {
      id: 207,
      nom: '',
      prenom: '',
      fonction: 'Contrôleur',
      service: 'Réception',
      telephone: '',
      extension: '150240',
      email: 'controleur2@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'controleur reception'
    },
    {
      id: 208,
      nom: '',
      prenom: '',
      fonction: 'Contrôleur',
      service: 'Réception',
      telephone: '',
      extension: '150313',
      email: 'controleur3@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'controleur reception'
    },
    {
      id: 209,
      nom: '',
      prenom: '',
      fonction: 'Contrôleur',
      service: 'Réception',
      telephone: '',
      extension: '150344',
      email: 'controleur4@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'controleur reception'
    },
    {
      id: 210,
      nom: '',
      prenom: '',
      fonction: 'Contrôleur',
      service: 'Réception',
      telephone: '',
      extension: '150226',
      email: 'controleur5@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Réception',
      keywords: 'controleur reception'
    },
    {
      id: 211,
      nom: '',
      prenom: '',
      fonction: 'Accueil chauffeur',
      service: 'Réception',
      telephone: '',
      extension: '140148',
      email: 'accueil.chauffeur@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 07h-17h',
      bureau: 'Zone Réception',
      keywords: 'accueil chauffeur reception'
    },
    
      email: 'marius.dimitru@gxo.com',
      mobile: '06 23 07 06 32',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable exploitation ipl reception rh'
    },
    {
      id: 505,
      nom: 'TOUPANE',
      prenom: 'Bruno',
      fonction: 'Responsable d\'Exploitation Retour',
      service: 'RH',
      telephone: '06 05 53 81 08',
      extension: '',
      email: 'bruno.toupane@gxo.com',
      mobile: '06 05 53 81 08',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable exploitation retour rh'
    },
    {
      id: 506,
      nom: 'MBOKO NKOMO',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation Process Control / GDS',
      service: 'RH',
      telephone: '06 18 73 04 67',
      extension: '',
      email: 'marius.mbokonkomo@gxo.com',
      mobile: '06 18 73 04 67',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable exploitation process control gds rh'
    },
    {
      id: 507,
      nom: 'AZARELLI',
      prenom: 'Robert',
      fonction: 'Responsable d\'Exploitation Nuit',
      service: 'RH',
      telephone: '06 31 28 67 91',
      extension: '',
      email: 'robert.azarelli@gxo.com',
      mobile: '06 31 28 67 91',
      horaires: 'Nuit',
      bureau: 'RH',
      keywords: 'responsable exploitation nuit rh'
    },
    {
      id: 508,
      nom: 'PARISOT',
      prenom: 'Laetitia',
      fonction: 'Assistante du personnel',
      service: 'RH',
      telephone: '01 84 26 02 12',
      extension: '',
      email: 'laetitia.parisot@gxo.com',
      mobile: '01 84 26 02 12',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'assistante personnel rh'
    },
    {
      id: 509,
      nom: 'BAKISSI',
      prenom: 'Van Lagetille',
      fonction: 'Assistante gestion du personnel',
      service: 'RH',
      telephone: '01 84 26 02 64',
      extension: '',
      email: 'vanlagetille.bakissi@gxo.com',
      mobile: '01 84 26 02 64',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'assistante gestion personnel rh'
    },
    {
      id: 510,
      nom: 'FELIX',
      prenom: 'Justine',
      fonction: 'Assistante gestion du personnel',
      service: 'RH',
      telephone: '01 84 26 03 04',
      extension: '',
      email: 'justine.felix@gxo.com',
      mobile: '01 84 26 03 04',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'assistante gestion personnel rh'
    },
    {
      id: 511,
      nom: 'CHAMPION',
      prenom: 'Adeline',
      fonction: 'Assistante gestion du personnel',
      service: 'RH',
      telephone: '01 84 26 02 13',
      extension: '',
      email: 'adeline.champion@gxo.com',
      mobile: '01 84 26 02 13',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'assistante gestion personnel rh'
    },
    {
      id: 512,
      nom: 'LE TERRIER',
      prenom: 'Gilles',
      fonction: 'Responsable maintenance',
      service: 'RH',
      telephone: '06 22 92 23 02',
      extension: '',
      email: 'gilles.leterrier@gxo.com',
      mobile: '06 22 92 23 02',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable maintenance rh'
    },

  ]

  const services = [
    { name: 'Tous', icon: 'fa-address-book', color: 'bg-gray-500', count: contacts.length },
    { name: 'Direction', icon: 'fa-building', color: 'bg-orange-500', count: contacts.filter(c => c.service === 'Direction').length },
    { name: 'Process Control', icon: 'fa-clipboard-check', color: 'bg-green-500', count: contacts.filter(c => c.service === 'Process Control').length },
    { name: 'Réception', icon: 'fa-truck-loading', color: 'bg-orange-600', count: contacts.filter(c => c.service === 'Réception').length },
    { name: 'IPL', icon: 'fa-forklift', color: 'bg-teal-500', count: contacts.filter(c => c.service === 'IPL').length },
    { name: 'Préparation', icon: 'fa-dolly', color: 'bg-purple-500', count: contacts.filter(c => c.service === 'Préparation').length },
    { name: 'Expédition', icon: 'fa-shipping-fast', color: 'bg-indigo-500', count: contacts.filter(c => c.service === 'Expédition').length },
    { name: 'Retours', icon: 'fa-undo-alt', color: 'bg-cyan-500', count: contacts.filter(c => c.service === 'Retours').length },
    { name: 'Maintenance', icon: 'fa-tools', color: 'bg-orange-500', count: contacts.filter(c => c.service === 'Maintenance').length },
    { name: 'RH', icon: 'fa-users', color: 'bg-pink-500', count: contacts.filter(c => c.service === 'RH').length }
  ]

  return (
    <div class="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div class="bg-gradient-to-r from-[#FF4500] to-[#FF5A1A] text-white py-12 px-6 mb-8 shadow-lg">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center mb-4">
            <i class="fas fa-address-book text-5xl mr-4"></i>
            <div>
              <h1 class="text-4xl font-bold">Annuaire Complet GXO Moissy-Cramayel</h1>
              <p class="text-lg mt-2 text-gray-200">Annuaire GXO Moissy-Cramayel - {contacts.length} contacts</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6">
        {/* Documents PDF Référence */}
        <div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <i class="fas fa-file-pdf text-3xl text-red-600 mr-4 mt-1"></i>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                <i class="fas fa-info-circle mr-2"></i>
                Documents de Référence
              </h3>
              <p class="text-gray-700 mb-4">
                Consultez les documents PDF officiels pour la liste complète et mise à jour des contacts GXO Moissy-Cramayel.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="/static/documents/Contacts_Page1.pdf" 
                  target="_blank"
                  class="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <i class="fas fa-file-pdf text-4xl text-red-600 mr-4"></i>
                  <div>
                    <div class="font-semibold text-gray-800">Contacts - Page 1</div>
                    <div class="text-sm text-gray-600">915 KB • PDF</div>
                  </div>
                  <i class="fas fa-external-link-alt ml-auto text-gray-400"></i>
                </a>
                <a 
                  href="/static/documents/Contacts_Page2.pdf" 
                  target="_blank"
                  class="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <i class="fas fa-file-pdf text-4xl text-red-600 mr-4"></i>
                  <div>
                    <div class="font-semibold text-gray-800">Contacts - Page 2</div>
                    <div class="text-sm text-gray-600">655 KB • PDF</div>
                  </div>
                  <i class="fas fa-external-link-alt ml-auto text-gray-400"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recherche */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex items-center mb-4">
            <i class="fas fa-search text-2xl text-gray-600 mr-3"></i>
            <h2 class="text-2xl font-bold text-gray-800">Recherche de Contact</h2>
          </div>
          
          <div class="relative">
            <input
              type="text"
              id="search-input"
              placeholder="Rechercher par nom, prénom, fonction, service, téléphone..."
              class="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-[#FF4500] focus:outline-none"
              onkeyup="filterContacts()"
            />
            <i class="fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
          
          <button 
            onclick="clearSearch()"
            class="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <i class="fas fa-times mr-2"></i>Effacer
          </button>
        </div>

        {/* Filtres par Service */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex items-center mb-4">
            <i class="fas fa-filter text-2xl text-gray-600 mr-3"></i>
            <h2 class="text-2xl font-bold text-gray-800">Filtrer par Service</h2>
          </div>
          
          <div class="flex flex-wrap gap-3">
            {services.map(service => (
              <button 
                onclick={`filterByService('${service.name}')`}
                class={`filter-btn ${service.color} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity shadow`}
                data-service={service.name}
              >
                <i class={`${service.icon} mr-2`}></i>{service.name} ({service.count})
              </button>
            ))}
          </div>
        </div>

        {/* Grille de Contacts */}
        <div class="mb-4">
          <div class="text-sm text-gray-600">
            <i class="fas fa-info-circle mr-2"></i>
            <span id="contacts-count">{contacts.length}</span> contact(s) affiché(s)
          </div>
        </div>

        <div id="contacts-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(contact => {
            const serviceInfo = services.find(s => s.name === contact.service)
            const serviceColor = serviceInfo ? serviceInfo.color : 'bg-gray-500'
            const serviceIcon = serviceInfo ? serviceInfo.icon : 'fa-user'
            
            return (
              <div 
                class={`contact-card bg-white rounded-lg shadow-lg border-l-4 ${serviceColor.replace('bg-', 'border-')} overflow-hidden hover:shadow-xl transition-shadow`}
                data-service={contact.service}
                data-keywords={contact.keywords}
                data-nom={contact.nom.toLowerCase()}
                data-prenom={contact.prenom.toLowerCase()}
                data-fonction={contact.fonction.toLowerCase()}
                data-telephone={contact.telephone}
                data-email={contact.email}
              >
                <div class="p-6">
                  {/* Header */}
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <div class="flex items-center mb-2">
                        <span class={`text-xs font-bold ${serviceColor.replace('bg-', 'text-')} uppercase tracking-wide`}>
                          Service : {contact.service}
                        </span>
                      </div>
                      <h3 class="text-xl font-bold text-gray-800">
                        {contact.prenom} {contact.nom}
                      </h3>
                      <p class="text-sm text-gray-600 font-medium mt-1">
                        {contact.fonction}
                      </p>
                    </div>
                    {contact.service === 'Urgence' && (
                      <span class="text-3xl animate-pulse">🚨</span>
                    )}
                  </div>

                  {/* Informations de Contact */}
                  <div class="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    {/* Téléphone */}
                    <div class="flex items-center text-gray-700">
                      <i class="fas fa-phone text-green-600 w-6 mr-3"></i>
                      <a href={`tel:${contact.telephone}`} class="hover:text-[#FF4500] font-medium">
                        {contact.telephone}
                      </a>
                    </div>

                    {/* Extension */}
                    {contact.extension && (
                      <div class="flex items-center text-gray-700">
                        <i class="fas fa-hashtag text-orange-600 w-6 mr-3"></i>
                        <span class="text-sm">Ext. {contact.extension}</span>
                      </div>
                    )}

                    {/* Mobile */}
                    {contact.mobile && (
                      <div class="flex items-center text-gray-700">
                        <i class="fas fa-mobile-alt text-purple-600 w-6 mr-3"></i>
                        <a href={`tel:${contact.mobile}`} class="hover:text-[#FF4500] font-medium">
                          {contact.mobile}
                        </a>
                      </div>
                    )}

                    {/* Email */}
                    <div class="flex items-center text-gray-700">
                      <i class="fas fa-envelope text-red-600 w-6 mr-3"></i>
                      <a href={`mailto:${contact.email}`} class="hover:text-[#FF4500] text-sm break-all">
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Détails Supplémentaires */}
                  <div class="space-y-2 text-sm">
                    {/* Horaires */}
                    <div class="flex items-start text-gray-600">
                      <i class="fas fa-clock text-orange-600 w-6 mr-3 mt-1"></i>
                      <span class="flex-1">{contact.horaires}</span>
                    </div>

                    {/* Bureau */}
                    <div class="flex items-start text-gray-600">
                      <i class="fas fa-map-marker-alt text-teal-600 w-6 mr-3 mt-1"></i>
                      <span class="flex-1">{contact.bureau}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div class="mt-6 flex gap-2">
                    <a 
                      href={`tel:${contact.telephone}`}
                      class="flex-1 bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors text-center"
                    >
                      <i class="fas fa-phone mr-2"></i>Appeler
                    </a>
                    <a 
                      href={`mailto:${contact.email}`}
                      class="bg-[#FF4500] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF5A1A] transition-colors"
                      title="Envoyer un email"
                    >
                      <i class="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Message aucun résultat */}
        <div id="no-results" class="hidden text-center py-12">
          <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
          <p class="text-xl text-gray-600 font-semibold">Aucun contact trouvé</p>
          <p class="text-gray-500 mt-2">Essayez avec d'autres mots-clés ou filtres</p>
        </div>
      </div>

      {/* Script JavaScript pour la recherche et les filtres */}
      <script dangerouslySetInnerHTML={{__html: `
        function filterContacts() {
          const searchTerm = document.getElementById('search-input').value.toLowerCase()
          const cards = document.querySelectorAll('.contact-card')
          let visibleCount = 0

          cards.forEach(card => {
            const nom = card.dataset.nom || ''
            const prenom = card.dataset.prenom || ''
            const fonction = card.dataset.fonction || ''
            const service = card.dataset.service.toLowerCase()
            const keywords = card.dataset.keywords || ''
            const telephone = card.dataset.telephone || ''
            const email = card.dataset.email || ''

            const matches = nom.includes(searchTerm) ||
                          prenom.includes(searchTerm) ||
                          fonction.includes(searchTerm) ||
                          service.includes(searchTerm) ||
                          keywords.includes(searchTerm) ||
                          telephone.includes(searchTerm) ||
                          email.includes(searchTerm)

            if (matches) {
              card.style.display = 'block'
              visibleCount++
            } else {
              card.style.display = 'none'
            }
          })

          updateCount(visibleCount)
        }

        function filterByService(serviceName) {
          const cards = document.querySelectorAll('.contact-card')
          let visibleCount = 0

          // Clear search input
          document.getElementById('search-input').value = ''

          cards.forEach(card => {
            const cardService = card.dataset.service

            if (serviceName === 'Tous' || cardService === serviceName) {
              card.style.display = 'block'
              visibleCount++
            } else {
              card.style.display = 'none'
            }
          })

          // Update active filter button
          document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.service === serviceName) {
              btn.style.opacity = '1'
              btn.style.transform = 'scale(1.05)'
            } else {
              btn.style.opacity = '0.7'
              btn.style.transform = 'scale(1)'
            }
          })

          updateCount(visibleCount)
        }

        function clearSearch() {
          document.getElementById('search-input').value = ''
          filterByService('Tous')
        }

        function updateCount(count) {
          document.getElementById('contacts-count').textContent = count
          const noResults = document.getElementById('no-results')
          const container = document.getElementById('contacts-container')

          if (count === 0) {
            noResults.classList.remove('hidden')
            container.classList.add('hidden')
          } else {
            noResults.classList.add('hidden')
            container.classList.remove('hidden')
          }
        }

        // Initialize - show all contacts
        filterByService('Tous')
      `}} />
    </div>
  )
}