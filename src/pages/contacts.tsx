export function ContactsPage() {
  // Base de données des contacts GXO Moissy-Cramayel - EXPÉDITION & RETOURS uniquement
  const contacts = [
    
    // Expédition
    {
      id: 9,
      nom: 'GENEST',
      prenom: 'Estelle',
      fonction: 'Responsable d\'Exploitation',
      service: 'Expédition',
      telephone: '',
      extension: '150307',
      email: 'estelle.genest@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'responsable exploitation expedition shipping'
    },
    {
      id: 10,
      nom: 'DIMITRU',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation',
      service: 'Expédition',
      telephone: '',
      extension: '150265',
      email: 'marius.dimitru@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'responsable exploitation expedition shipping'
    },
    {
      id: 23,
      nom: 'MESSINA',
      prenom: 'Christophe',
      fonction: 'Chef d\'Exploitation',
      service: 'Expédition',
      telephone: '',
      extension: '150259',
      email: 'christophe.messina@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'chef exploitation expedition shipping'
    },
    {
      id: 24,
      nom: 'CHAUVIN',
      prenom: 'Thomas',
      fonction: 'Chef d\'Exploitation',
      service: 'Expédition',
      telephone: '',
      extension: '150211',
      email: 'thomas.chauvin@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'chef exploitation expedition shipping'
    },
    {
      id: 25,
      nom: 'NAJAH',
      prenom: 'Khadija',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'Expédition',
      telephone: '',
      extension: '150237',
      email: 'khadija.najah@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'backup chef exploitation expedition shipping'
    },
    {
      id: 26,
      nom: 'TCHOMBA NYEMBO',
      prenom: 'Blaise',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'Expédition',
      telephone: '',
      extension: '150244',
      email: 'blaise.tchomba@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'backup chef exploitation expedition shipping'
    },
    {
      id: 27,
      nom: 'LUKUSA',
      prenom: 'Jean-Paul',
      fonction: 'Chef d\'équipe AM',
      service: 'Expédition',
      telephone: '',
      extension: '150244',
      email: 'jeanpaul.lukusa@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone Expédition',
      keywords: 'chef equipe am matin expedition shipping'
    },
    {
      id: 28,
      nom: 'BINDELT',
      prenom: 'Lionel',
      fonction: 'Chef d\'équipe PM',
      service: 'Expédition',
      telephone: '',
      extension: '150244 / 150262',
      email: 'lionel.bindelt@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone Expédition',
      keywords: 'chef equipe pm apres-midi expedition shipping'
    },
    {
      id: 29,
      nom: 'NDEBEKA MALEKA',
      prenom: 'Aymar',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150311',
      email: 'aymar.ndebeka@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    {
      id: 30,
      nom: 'CHARGEUR',
      prenom: '',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150336',
      email: 'chargeur336@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    {
      id: 31,
      nom: 'CHARGEUR',
      prenom: '',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150371',
      email: 'chargeur371@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    {
      id: 32,
      nom: 'CHARGEUR',
      prenom: '',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150372',
      email: 'chargeur372@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    {
      id: 33,
      nom: 'CHARGEUR',
      prenom: '',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150373',
      email: 'chargeur373@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    {
      id: 34,
      nom: 'CHARGEUR',
      prenom: '',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150374',
      email: 'chargeur374@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    {
      id: 35,
      nom: 'CHARGEUR',
      prenom: '',
      fonction: 'Chargeur',
      service: 'Expédition',
      telephone: '',
      extension: '150375',
      email: 'chargeur375@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Expédition',
      keywords: 'chargeur expedition shipping chargement'
    },
    
    // Retours
    {
      id: 36,
      nom: 'TOUPANE',
      prenom: 'Bruno',
      fonction: 'Responsable d\'Exploitation',
      service: 'Retours',
      telephone: '06 85 33 81 08',
      extension: '',
      email: 'bruno.toupane@gxo.com',
      mobile: '06 85 33 81 08',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Retours',
      keywords: 'responsable exploitation retours returns'
    },
    {
      id: 37,
      nom: 'LINDO MARTINEZ',
      prenom: 'Emmanuelle',
      fonction: 'Chef d\'Exploitation',
      service: 'Retours',
      telephone: '07 88 68 37 87',
      extension: '',
      email: 'emmanuelle.lindo@gxo.com',
      mobile: '07 88 68 37 87',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Retours',
      keywords: 'chef exploitation retours returns'
    },
    {
      id: 38,
      nom: 'AHIMAKIN',
      prenom: 'Armand',
      fonction: 'Chef d\'équipe PM',
      service: 'Retours',
      telephone: '',
      extension: '150277',
      email: 'armand.ahimakin@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone Retours',
      keywords: 'chef equipe pm apres-midi retours returns'
    },
    {
      id: 39,
      nom: 'LIKOY',
      prenom: 'Kévin',
      fonction: 'Chef d\'équipe JOURNÉE',
      service: 'Retours',
      telephone: '',
      extension: '150214',
      email: 'kevin.likoy@gxo.com',
      mobile: '',
      horaires: 'Journée',
      bureau: 'Zone Retours',
      keywords: 'chef equipe journee retours returns'
    },
    {
      id: 40,
      nom: 'COQUATRIX',
      prenom: 'Aurore',
      fonction: 'Admin',
      service: 'Retours',
      telephone: '',
      extension: '150331',
      email: 'aurore.coquatrix@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 09h-17h',
      bureau: 'Zone Retours',
      keywords: 'admin administration retours returns'
    },
    {
      id: 41,
      nom: 'NDEBEKA MALEKA',
      prenom: 'Aymar',
      fonction: 'Back UP CEL Nuit',
      service: 'Retours',
      telephone: '',
      extension: '150262',
      email: 'aymar.ndebeka.retours@gxo.com',
      mobile: '',
      horaires: 'Nuit',
      bureau: 'Zone Retours',
      keywords: 'backup cel nuit retours returns'
    },

  ]

  const services = [
    { name: 'Tous', icon: 'fa-address-book', color: 'bg-gray-500', count: contacts.length },
    { name: 'Expédition', icon: 'fa-shipping-fast', color: 'bg-indigo-500', count: contacts.filter(c => c.service === 'Expédition').length },
    { name: 'Retours', icon: 'fa-undo-alt', color: 'bg-cyan-500', count: contacts.filter(c => c.service === 'Retours').length }
  ]

  return (
    <div class="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white py-12 px-6 mb-8 shadow-lg">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center mb-4">
            <i class="fas fa-address-book text-5xl mr-4"></i>
            <div>
              <h1 class="text-4xl font-bold">Contacts EXPÉDITION & RETOURS</h1>
              <p class="text-lg mt-2 text-gray-200">Annuaire GXO Moissy-Cramayel - {contacts.length} contacts</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6">
        {/* Documents PDF Référence */}
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
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
              class="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:border-[#00205B] focus:outline-none"
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
                        <i class={`${serviceIcon} text-2xl mr-3`}></i>
                        <span class={`text-xs font-semibold ${serviceColor.replace('bg-', 'text-')} uppercase`}>
                          {contact.service}
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
                      <a href={`tel:${contact.telephone}`} class="hover:text-[#00205B] font-medium">
                        {contact.telephone}
                      </a>
                    </div>

                    {/* Extension */}
                    {contact.extension && (
                      <div class="flex items-center text-gray-700">
                        <i class="fas fa-hashtag text-blue-600 w-6 mr-3"></i>
                        <span class="text-sm">Ext. {contact.extension}</span>
                      </div>
                    )}

                    {/* Mobile */}
                    {contact.mobile && (
                      <div class="flex items-center text-gray-700">
                        <i class="fas fa-mobile-alt text-purple-600 w-6 mr-3"></i>
                        <a href={`tel:${contact.mobile}`} class="hover:text-[#00205B] font-medium">
                          {contact.mobile}
                        </a>
                      </div>
                    )}

                    {/* Email */}
                    <div class="flex items-center text-gray-700">
                      <i class="fas fa-envelope text-red-600 w-6 mr-3"></i>
                      <a href={`mailto:${contact.email}`} class="hover:text-[#00205B] text-sm break-all">
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
                      class="flex-1 bg-[#00205B] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors text-center"
                    >
                      <i class="fas fa-phone mr-2"></i>Appeler
                    </a>
                    <a 
                      href={`mailto:${contact.email}`}
                      class="bg-[#FF6B35] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
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