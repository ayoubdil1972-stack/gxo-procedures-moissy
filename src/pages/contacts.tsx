export function ContactsPage() {
  // Base de données des contacts GXO Moissy-Cramayel
  const contacts = [
    // Direction & Management
    {
      id: 1,
      nom: 'MARTIN',
      prenom: 'Jean',
      fonction: 'Directeur de Site',
      service: 'Direction',
      telephone: '01 64 13 45 00',
      extension: '4500',
      email: 'jean.martin@gxo.com',
      mobile: '06 12 34 56 78',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Bureau A101',
      keywords: 'directeur direction management site responsable'
    },
    {
      id: 2,
      nom: 'DUBOIS',
      prenom: 'Sophie',
      fonction: 'Responsable Opérations',
      service: 'Direction',
      telephone: '01 64 13 45 01',
      extension: '4501',
      email: 'sophie.dubois@gxo.com',
      mobile: '06 23 45 67 89',
      horaires: 'Lun-Ven 07h-17h',
      bureau: 'Bureau A102',
      keywords: 'responsable opérations operations management'
    },
    
    // Réception
    {
      id: 3,
      nom: 'BERNARD',
      prenom: 'Marc',
      fonction: 'Chef d\'Équipe Réception',
      service: 'Réception',
      telephone: '01 64 13 45 10',
      extension: '4510',
      email: 'marc.bernard@gxo.com',
      mobile: '06 34 56 78 90',
      horaires: '05h-13h / 13h-21h / 21h-05h',
      bureau: 'Zone Réception',
      keywords: 'chef equipe reception quai livraison goods receipt'
    },
    {
      id: 4,
      nom: 'PETIT',
      prenom: 'Laurent',
      fonction: 'Superviseur Réception',
      service: 'Réception',
      telephone: '01 64 13 45 11',
      extension: '4511',
      email: 'laurent.petit@gxo.com',
      mobile: '06 45 67 89 01',
      horaires: '06h-14h / 14h-22h',
      bureau: 'Zone Réception',
      keywords: 'superviseur reception quai controle qualite'
    },
    
    // IPL (Intra Plant Logistics)
    {
      id: 5,
      nom: 'ROBERT',
      prenom: 'Pierre',
      fonction: 'Chef d\'Équipe IPL',
      service: 'IPL',
      telephone: '01 64 13 45 20',
      extension: '4520',
      email: 'pierre.robert@gxo.com',
      mobile: '06 56 78 90 12',
      horaires: '06h-14h / 14h-22h / 22h-06h',
      bureau: 'Zone Logistique',
      keywords: 'chef equipe ipl cariste chariot elevation ltrms'
    },
    {
      id: 6,
      nom: 'RICHARD',
      prenom: 'Thomas',
      fonction: 'Coordinateur IPL',
      service: 'IPL',
      telephone: '01 64 13 45 21',
      extension: '4521',
      email: 'thomas.richard@gxo.com',
      mobile: '06 67 89 01 23',
      horaires: 'Lun-Ven 08h-16h',
      bureau: 'Zone Logistique',
      keywords: 'coordinateur ipl logistique taches affectation'
    },
    
    // Préparation
    {
      id: 7,
      nom: 'DURAND',
      prenom: 'Julien',
      fonction: 'Chef d\'Équipe Préparation',
      service: 'Préparation',
      telephone: '01 64 13 45 30',
      extension: '4530',
      email: 'julien.durand@gxo.com',
      mobile: '06 78 90 12 34',
      horaires: '05h-13h / 13h-21h',
      bureau: 'Zone Préparation',
      keywords: 'chef equipe preparation picking prelevement commandes'
    },
    {
      id: 8,
      nom: 'LEROY',
      prenom: 'Nicolas',
      fonction: 'Superviseur Préparation',
      service: 'Préparation',
      telephone: '01 64 13 45 31',
      extension: '4531',
      email: 'nicolas.leroy@gxo.com',
      mobile: '06 89 01 23 45',
      horaires: '06h-14h / 14h-22h',
      bureau: 'Zone Préparation',
      keywords: 'superviseur preparation picking rolls montage'
    },
    
    // Expédition
    {
      id: 9,
      nom: 'MOREAU',
      prenom: 'Patrick',
      fonction: 'Chef d\'Équipe Expédition',
      service: 'Expédition',
      telephone: '01 64 13 45 40',
      extension: '4540',
      email: 'patrick.moreau@gxo.com',
      mobile: '06 90 12 34 56',
      horaires: '07h-15h / 15h-23h',
      bureau: 'Zone Expédition',
      keywords: 'chef equipe expedition shipping envoi chargement'
    },
    {
      id: 10,
      nom: 'SIMON',
      prenom: 'Christophe',
      fonction: 'Coordinateur Expédition',
      service: 'Expédition',
      telephone: '01 64 13 45 41',
      extension: '4541',
      email: 'christophe.simon@gxo.com',
      mobile: '06 01 23 45 67',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Expédition',
      keywords: 'coordinateur expedition transport livraison'
    },
    
    // Qualité & Sécurité
    {
      id: 11,
      nom: 'LAURENT',
      prenom: 'Marie',
      fonction: 'Responsable Qualité',
      service: 'Qualité',
      telephone: '01 64 13 45 50',
      extension: '4550',
      email: 'marie.laurent@gxo.com',
      mobile: '06 12 34 56 78',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Bureau B201',
      keywords: 'responsable qualite controle audit conformite'
    },
    {
      id: 12,
      nom: 'MICHEL',
      prenom: 'David',
      fonction: 'Responsable Sécurité',
      service: 'Sécurité',
      telephone: '01 64 13 45 51',
      extension: '4551',
      email: 'david.michel@gxo.com',
      mobile: '06 23 45 67 89',
      horaires: 'Lun-Ven 07h-16h',
      bureau: 'Bureau B202',
      keywords: 'responsable securite hse prevention accident'
    },
    
    // Ressources Humaines
    {
      id: 13,
      nom: 'GARCIA',
      prenom: 'Isabelle',
      fonction: 'Responsable RH',
      service: 'RH',
      telephone: '01 64 13 45 60',
      extension: '4560',
      email: 'isabelle.garcia@gxo.com',
      mobile: '06 34 56 78 90',
      horaires: 'Lun-Ven 08h30-17h30',
      bureau: 'Bureau C101',
      keywords: 'responsable rh ressources humaines recrutement formation'
    },
    {
      id: 14,
      nom: 'THOMAS',
      prenom: 'Valérie',
      fonction: 'Assistante RH',
      service: 'RH',
      telephone: '01 64 13 45 61',
      extension: '4561',
      email: 'valerie.thomas@gxo.com',
      mobile: '06 45 67 89 01',
      horaires: 'Lun-Ven 09h-18h',
      bureau: 'Bureau C102',
      keywords: 'assistante rh administration personnel conges'
    },
    
    // Maintenance
    {
      id: 15,
      nom: 'MARTINEZ',
      prenom: 'José',
      fonction: 'Responsable Maintenance',
      service: 'Maintenance',
      telephone: '01 64 13 45 70',
      extension: '4570',
      email: 'jose.martinez@gxo.com',
      mobile: '06 56 78 90 12',
      horaires: 'Lun-Ven 06h-14h',
      bureau: 'Atelier Maintenance',
      keywords: 'responsable maintenance reparation chariot technique'
    },
    {
      id: 16,
      nom: 'FONTAINE',
      prenom: 'Éric',
      fonction: 'Technicien Maintenance',
      service: 'Maintenance',
      telephone: '01 64 13 45 71',
      extension: '4571',
      email: 'eric.fontaine@gxo.com',
      mobile: '06 67 89 01 23',
      horaires: '07h-15h / 15h-23h',
      bureau: 'Atelier Maintenance',
      keywords: 'technicien maintenance depannage intervention'
    },
    
    // IT Support
    {
      id: 17,
      nom: 'CHEVALIER',
      prenom: 'Alexandre',
      fonction: 'Responsable IT',
      service: 'IT',
      telephone: '01 64 13 45 80',
      extension: '4580',
      email: 'alexandre.chevalier@gxo.com',
      mobile: '06 78 90 12 34',
      horaires: 'Lun-Ven 08h-18h',
      bureau: 'Bureau D101',
      keywords: 'responsable it informatique sap ewm systeme'
    },
    {
      id: 18,
      nom: 'GIRARD',
      prenom: 'Sébastien',
      fonction: 'Support IT',
      service: 'IT',
      telephone: '01 64 13 45 81',
      extension: '4581',
      email: 'sebastien.girard@gxo.com',
      mobile: '06 89 01 23 45',
      horaires: 'Lun-Ven 07h-15h',
      bureau: 'Bureau D102',
      keywords: 'support it informatique helpdesk terminal imprimante'
    },
    
    // Administration
    {
      id: 19,
      nom: 'ROUX',
      prenom: 'Christine',
      fonction: 'Assistante de Direction',
      service: 'Administration',
      telephone: '01 64 13 45 90',
      extension: '4590',
      email: 'christine.roux@gxo.com',
      mobile: '06 90 12 34 56',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Bureau A103',
      keywords: 'assistante direction administration secretariat'
    },
    {
      id: 20,
      nom: 'VINCENT',
      prenom: 'Sylvie',
      fonction: 'Comptable',
      service: 'Administration',
      telephone: '01 64 13 45 91',
      extension: '4591',
      email: 'sylvie.vincent@gxo.com',
      mobile: '06 01 23 45 67',
      horaires: 'Lun-Ven 09h-17h',
      bureau: 'Bureau A104',
      keywords: 'comptable comptabilite factures finances'
    },
    
    // Contacts d\'urgence
    {
      id: 21,
      nom: 'URGENCES',
      prenom: 'Sécurité',
      fonction: 'Poste de Sécurité 24/7',
      service: 'Urgence',
      telephone: '01 64 13 45 00',
      extension: '4500',
      email: 'securite@gxo.com',
      mobile: '06 00 00 00 00',
      horaires: '24h/24 - 7j/7',
      bureau: 'Entrée Principale',
      keywords: 'urgence securite urgences accident secours pompiers'
    },
    {
      id: 22,
      nom: 'INFIRMERIE',
      prenom: 'Poste',
      fonction: 'Infirmerie du Site',
      service: 'Urgence',
      telephone: '01 64 13 45 99',
      extension: '4599',
      email: 'infirmerie@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Bâtiment Principal',
      keywords: 'infirmerie sante medical premiers secours soins'
    }
  ]

  const services = [
    { name: 'Tous', icon: 'fa-address-book', color: 'bg-gray-500', count: contacts.length },
    { name: 'Direction', icon: 'fa-building', color: 'bg-blue-500', count: contacts.filter(c => c.service === 'Direction').length },
    { name: 'Réception', icon: 'fa-truck-loading', color: 'bg-blue-600', count: contacts.filter(c => c.service === 'Réception').length },
    { name: 'IPL', icon: 'fa-forklift', color: 'bg-green-500', count: contacts.filter(c => c.service === 'IPL').length },
    { name: 'Préparation', icon: 'fa-dolly', color: 'bg-purple-500', count: contacts.filter(c => c.service === 'Préparation').length },
    { name: 'Expédition', icon: 'fa-shipping-fast', color: 'bg-indigo-500', count: contacts.filter(c => c.service === 'Expédition').length },
    { name: 'Qualité', icon: 'fa-medal', color: 'bg-yellow-500', count: contacts.filter(c => c.service === 'Qualité').length },
    { name: 'Sécurité', icon: 'fa-shield-alt', color: 'bg-red-500', count: contacts.filter(c => c.service === 'Sécurité').length },
    { name: 'RH', icon: 'fa-users', color: 'bg-pink-500', count: contacts.filter(c => c.service === 'RH').length },
    { name: 'Maintenance', icon: 'fa-tools', color: 'bg-orange-500', count: contacts.filter(c => c.service === 'Maintenance').length },
    { name: 'IT', icon: 'fa-laptop', color: 'bg-teal-500', count: contacts.filter(c => c.service === 'IT').length },
    { name: 'Administration', icon: 'fa-briefcase', color: 'bg-gray-600', count: contacts.filter(c => c.service === 'Administration').length },
    { name: 'Urgence', icon: 'fa-exclamation-triangle', color: 'bg-red-600', count: contacts.filter(c => c.service === 'Urgence').length }
  ]

  return (
    <div class="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white py-12 px-6 mb-8 shadow-lg">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center mb-4">
            <i class="fas fa-address-book text-5xl mr-4"></i>
            <div>
              <h1 class="text-4xl font-bold">Bibliothèque de Contacts</h1>
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