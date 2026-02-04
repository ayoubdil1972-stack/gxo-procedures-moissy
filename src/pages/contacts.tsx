export function ContactsPage() {
  // Base de données des contacts GXO Moissy-Cramayel
  const contacts = [
    // Direction et Management
    {
      id: 1,
      name: 'Jean DUPONT',
      role: 'Directeur de Site',
      service: 'Direction',
      phone: '01 60 60 XX XX',
      extension: '1001',
      email: 'jean.dupont@gxo.com',
      department: 'Direction',
      availability: 'Lun-Ven 8h-18h',
      keywords: 'directeur, direction, management, responsable site'
    },
    {
      id: 2,
      name: 'Marie MARTIN',
      role: 'Responsable Exploitation',
      service: 'Exploitation',
      phone: '01 60 60 XX XX',
      extension: '1002',
      email: 'marie.martin@gxo.com',
      department: 'Exploitation',
      availability: 'Lun-Ven 7h-19h',
      keywords: 'exploitation, responsable, operations, supervision'
    },
    
    // Réception
    {
      id: 3,
      name: 'Pierre BERNARD',
      role: 'Chef d\'Équipe Réception',
      service: 'Réception',
      phone: '01 60 60 XX XX',
      extension: '2001',
      email: 'pierre.bernard@gxo.com',
      department: 'Réception',
      availability: 'Lun-Ven 6h-14h / 14h-22h',
      keywords: 'réception, chef équipe, goods receipt, quai, camion'
    },
    {
      id: 4,
      name: 'Sophie DUBOIS',
      role: 'Superviseur Réception',
      service: 'Réception',
      phone: '01 60 60 XX XX',
      extension: '2002',
      email: 'sophie.dubois@gxo.com',
      department: 'Réception',
      availability: 'Lun-Ven 6h-14h',
      keywords: 'réception, superviseur, contrôle, BL, inspection'
    },
    {
      id: 5,
      name: 'Medhi SEGHIR',
      role: 'Référent PAPREC/BIONERVAL',
      service: 'Réception',
      phone: '01 60 60 XX XX',
      extension: '2010',
      email: 'medhi.seghir@gxo.com',
      department: 'Réception',
      availability: 'Lun-Ven 7h-15h',
      keywords: 'paprec, bionerval, déchets, biodéchets, collecte'
    },
    {
      id: 6,
      name: 'Prescilla DELTON',
      role: 'Assistante Réception',
      service: 'Réception',
      phone: '01 60 60 XX XX',
      extension: '2011',
      email: 'prescilla.delton@gxo.com',
      department: 'Réception',
      availability: 'Lun-Ven 8h-17h',
      keywords: 'réception, assistance, administratif, BL'
    },

    // IPL / Caristes
    {
      id: 7,
      name: 'Thomas PETIT',
      role: 'Chef d\'Équipe IPL',
      service: 'IPL',
      phone: '01 60 60 XX XX',
      extension: '3001',
      email: 'thomas.petit@gxo.com',
      department: 'IPL',
      availability: 'Lun-Ven 6h-14h / 14h-22h',
      keywords: 'ipl, cariste, chariot, LTRMS, affectation tâche'
    },
    {
      id: 8,
      name: 'Julie ROUX',
      role: 'Coordinateur IPL',
      service: 'IPL',
      phone: '01 60 60 XX XX',
      extension: '3002',
      email: 'julie.roux@gxo.com',
      department: 'IPL',
      availability: 'Lun-Ven 7h-15h',
      keywords: 'ipl, coordination, stock, LS03N, priorisation'
    },

    // Préparation
    {
      id: 9,
      name: 'Laurent MOREAU',
      role: 'Chef d\'Équipe Préparation',
      service: 'Préparation',
      phone: '01 60 60 XX XX',
      extension: '4001',
      email: 'laurent.moreau@gxo.com',
      department: 'Préparation',
      availability: 'Lun-Ven 6h-14h / 14h-22h',
      keywords: 'préparation, picking, prélèvement, rolls, montage'
    },
    {
      id: 10,
      name: 'Céline SIMON',
      role: 'Superviseur Préparation',
      service: 'Préparation',
      phone: '01 60 60 XX XX',
      extension: '4002',
      email: 'celine.simon@gxo.com',
      department: 'Préparation',
      availability: 'Lun-Ven 7h-15h',
      keywords: 'préparation, supervision, qualité, contrôle'
    },

    // Retours
    {
      id: 11,
      name: 'Nicolas LAURENT',
      role: 'Responsable Retours',
      service: 'Retours',
      phone: '01 60 60 XX XX',
      extension: '5001',
      email: 'nicolas.laurent@gxo.com',
      department: 'Retours',
      availability: 'Lun-Ven 8h-17h',
      keywords: 'retours, transfert, roll, TRM, RET_PICK_01'
    },

    // Qualité
    {
      id: 12,
      name: 'Isabelle GIRARD',
      role: 'Responsable Qualité',
      service: 'Qualité',
      phone: '01 60 60 XX XX',
      extension: '6001',
      email: 'isabelle.girard@gxo.com',
      department: 'Qualité',
      availability: 'Lun-Ven 8h-17h',
      keywords: 'qualité, audit, contrôle, conformité, norme'
    },
    {
      id: 13,
      name: 'François BONNET',
      role: 'Contrôleur Qualité',
      service: 'Qualité',
      phone: '01 60 60 XX XX',
      extension: '6002',
      email: 'francois.bonnet@gxo.com',
      department: 'Qualité',
      availability: 'Lun-Ven 6h-14h',
      keywords: 'qualité, inspection, EOP, checks, vérification'
    },

    // IT / Système
    {
      id: 14,
      name: 'Alexandre MERCIER',
      role: 'Responsable IT',
      service: 'IT',
      phone: '01 60 60 XX XX',
      extension: '7001',
      email: 'alexandre.mercier@gxo.com',
      department: 'IT',
      availability: 'Lun-Ven 8h-18h',
      keywords: 'it, informatique, SAP, EWM, système, terminal'
    },
    {
      id: 15,
      name: 'Émilie LEFEBVRE',
      role: 'Support IT',
      service: 'IT',
      phone: '01 60 60 XX XX',
      extension: '7002',
      email: 'emilie.lefebvre@gxo.com',
      department: 'IT',
      availability: 'Lun-Ven 7h-19h',
      keywords: 'it, support, helpdesk, imprimante, scanner, connexion'
    },

    // RH
    {
      id: 16,
      name: 'Sandrine CHEVALIER',
      role: 'Responsable RH',
      service: 'RH',
      phone: '01 60 60 XX XX',
      extension: '8001',
      email: 'sandrine.chevalier@gxo.com',
      department: 'RH',
      availability: 'Lun-Ven 9h-17h',
      keywords: 'rh, ressources humaines, recrutement, formation, intégration'
    },

    // Sécurité
    {
      id: 17,
      name: 'David GARNIER',
      role: 'Responsable Sécurité',
      service: 'Sécurité',
      phone: '01 60 60 XX XX',
      extension: '9001',
      email: 'david.garnier@gxo.com',
      department: 'Sécurité',
      availability: '24h/24 7j/7',
      keywords: 'sécurité, urgence, accident, HSE, pompier'
    },

    // Maintenance
    {
      id: 18,
      name: 'Julien ROUSSEAU',
      role: 'Responsable Maintenance',
      service: 'Maintenance',
      phone: '01 60 60 XX XX',
      extension: '9501',
      email: 'julien.rousseau@gxo.com',
      department: 'Maintenance',
      availability: 'Lun-Ven 7h-16h',
      keywords: 'maintenance, réparation, chariot, engin, panne, batterie'
    },

    // Urgence et Services Généraux
    {
      id: 19,
      name: 'URGENCE SITE',
      role: 'Numéro d\'Urgence',
      service: 'Urgence',
      phone: '01 60 60 99 99',
      extension: '9999',
      email: 'urgence@gxo.com',
      department: 'Sécurité',
      availability: '24h/24 7j/7',
      keywords: 'urgence, secours, accident, incendie, pompier, samu'
    },
    {
      id: 20,
      name: 'ACCUEIL / STANDARD',
      role: 'Standard Téléphonique',
      service: 'Accueil',
      phone: '01 60 60 00 00',
      extension: '0',
      email: 'accueil@gxo.com',
      department: 'Accueil',
      availability: 'Lun-Ven 6h-22h',
      keywords: 'accueil, standard, réception, visiteur, chauffeur'
    }
  ]

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <div class="bg-[#00205B] text-white py-8 px-6 shadow-xl">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center mb-4">
            <i class="fas fa-address-book text-4xl mr-4"></i>
            <div>
              <h1 class="text-3xl font-bold">Bibliothèque de Contacts</h1>
              <p class="text-blue-200 mt-2">
                Annuaire GXO Moissy-Cramayel - {contacts.length} contacts disponibles
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-8">
        {/* Documents PDF */}
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-file-pdf text-red-600 mr-3"></i>
            Documents de Référence
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border-2 border-red-200 rounded-lg p-4 hover:border-red-400 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    <i class="fas fa-file-pdf text-red-600 mr-2"></i>
                    Liste Contacts - Page 1
                  </h3>
                  <p class="text-sm text-gray-600 mb-3">Annuaire officiel GXO (Page 1)</p>
                  <span class="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    PDF - 915 KB
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <button 
                    onclick="openDocumentPreview('Contacts_Page1.pdf', 'pdf', 'Liste Contacts Page 1')"
                    class="bg-[#00205B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors"
                  >
                    <i class="fas fa-eye mr-2"></i>Aperçu
                  </button>
                  <a 
                    href="/static/documents/Contacts_Page1.pdf" 
                    download
                    class="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors text-center"
                  >
                    <i class="fas fa-download mr-2"></i>Télécharger
                  </a>
                </div>
              </div>
            </div>

            <div class="border-2 border-red-200 rounded-lg p-4 hover:border-red-400 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    <i class="fas fa-file-pdf text-red-600 mr-2"></i>
                    Liste Contacts - Page 2
                  </h3>
                  <p class="text-sm text-gray-600 mb-3">Annuaire officiel GXO (Page 2)</p>
                  <span class="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    PDF - 655 KB
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <button 
                    onclick="openDocumentPreview('Contacts_Page2.pdf', 'pdf', 'Liste Contacts Page 2')"
                    class="bg-[#00205B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors"
                  >
                    <i class="fas fa-eye mr-2"></i>Aperçu
                  </button>
                  <a 
                    href="/static/documents/Contacts_Page2.pdf" 
                    download
                    class="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors text-center"
                  >
                    <i class="fas fa-download mr-2"></i>Télécharger
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recherche et Filtres */}
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <i class="fas fa-search mr-2"></i>
              Rechercher un contact
            </label>
            <input
              type="text"
              id="contact-search"
              placeholder="Rechercher par nom, service, rôle, keywords..."
              onkeyup="filterContacts()"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00205B] focus:outline-none"
            />
            <button 
              onclick="clearContactSearch()"
              class="mt-2 text-sm text-[#FF6B35] hover:text-[#FF8555] font-semibold"
            >
              <i class="fas fa-times mr-1"></i>Effacer
            </button>
          </div>

          {/* Filtres par Service */}
          <div class="mb-4">
            <p class="text-sm font-semibold text-gray-700 mb-3">
              <i class="fas fa-filter mr-2"></i>Filtrer par service
            </p>
            <div class="flex flex-wrap gap-2">
              <button 
                onclick="filterByService('all')"
                class="service-filter-btn bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                data-service="all"
              >
                Tous ({contacts.length})
              </button>
              {['Direction', 'Réception', 'IPL', 'Préparation', 'Retours', 'Qualité', 'IT', 'RH', 'Sécurité', 'Maintenance', 'Accueil'].map(service => {
                const count = contacts.filter(c => c.service === service).length
                const colors = {
                  'Direction': 'bg-purple-500 hover:bg-purple-600',
                  'Réception': 'bg-blue-500 hover:bg-blue-600',
                  'IPL': 'bg-green-500 hover:bg-green-600',
                  'Préparation': 'bg-indigo-500 hover:bg-indigo-600',
                  'Retours': 'bg-yellow-500 hover:bg-yellow-600',
                  'Qualité': 'bg-pink-500 hover:bg-pink-600',
                  'IT': 'bg-cyan-500 hover:bg-cyan-600',
                  'RH': 'bg-orange-500 hover:bg-orange-600',
                  'Sécurité': 'bg-red-500 hover:bg-red-600',
                  'Maintenance': 'bg-teal-500 hover:bg-teal-600',
                  'Accueil': 'bg-gray-500 hover:bg-gray-600'
                }
                return (
                  <button 
                    onclick={`filterByService('${service}')`}
                    class={`service-filter-btn ${colors[service]} text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors`}
                    data-service={service}
                  >
                    {service} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Compteur résultats */}
          <div class="text-sm text-gray-600">
            <span id="contact-count">{contacts.length}</span> contact(s) affiché(s)
          </div>
        </div>

        {/* Message aucun résultat */}
        <div id="no-contacts-found" class="hidden bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
          <div class="flex items-center">
            <i class="fas fa-exclamation-triangle text-yellow-500 text-2xl mr-4"></i>
            <div>
              <h3 class="font-bold text-gray-800 mb-1">Aucun contact trouvé</h3>
              <p class="text-gray-600">Essayez avec d'autres mots-clés ou filtres.</p>
            </div>
          </div>
        </div>

        {/* Liste des Contacts */}
        <div id="contacts-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(contact => {
            const serviceColors = {
              'Direction': 'border-purple-500 bg-purple-50',
              'Réception': 'border-blue-500 bg-blue-50',
              'IPL': 'border-green-500 bg-green-50',
              'Préparation': 'border-indigo-500 bg-indigo-50',
              'Retours': 'border-yellow-500 bg-yellow-50',
              'Qualité': 'border-pink-500 bg-pink-50',
              'IT': 'border-cyan-500 bg-cyan-50',
              'RH': 'border-orange-500 bg-orange-50',
              'Sécurité': 'border-red-500 bg-red-50',
              'Maintenance': 'border-teal-500 bg-teal-50',
              'Urgence': 'border-red-600 bg-red-100',
              'Accueil': 'border-gray-500 bg-gray-50'
            }

            const serviceIcons = {
              'Direction': 'fa-briefcase',
              'Exploitation': 'fa-cogs',
              'Réception': 'fa-truck-loading',
              'IPL': 'fa-forklift',
              'Préparation': 'fa-dolly',
              'Retours': 'fa-undo-alt',
              'Qualité': 'fa-check-circle',
              'IT': 'fa-laptop-code',
              'RH': 'fa-users',
              'Sécurité': 'fa-shield-alt',
              'Maintenance': 'fa-tools',
              'Urgence': 'fa-ambulance',
              'Accueil': 'fa-door-open'
            }

            return (
              <div 
                class={`contact-card bg-white rounded-lg shadow-lg border-l-4 ${serviceColors[contact.service]} overflow-hidden hover:shadow-xl transition-shadow`}
                data-service={contact.service}
                data-name={contact.name.toLowerCase()}
                data-role={contact.role.toLowerCase()}
                data-keywords={contact.keywords.toLowerCase()}
              >
                <div class="p-6">
                  {/* Header */}
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <div class="flex items-center mb-2">
                        <i class={`fas ${serviceIcons[contact.service]} text-2xl mr-3 text-gray-600`}></i>
                        <span class="text-xs font-semibold text-gray-600 uppercase">{contact.service}</span>
                      </div>
                      <h3 class="text-lg font-bold text-gray-800 mb-1">{contact.name}</h3>
                      <p class="text-sm text-gray-600">{contact.role}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div class="space-y-3 mb-4">
                    <div class="flex items-center text-sm text-gray-700">
                      <i class="fas fa-phone text-[#00205B] w-5 mr-2"></i>
                      <span class="font-semibold">{contact.phone}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-700">
                      <i class="fas fa-hashtag text-[#00205B] w-5 mr-2"></i>
                      <span>Poste: <strong>{contact.extension}</strong></span>
                    </div>
                    <div class="flex items-start text-sm text-gray-700">
                      <i class="fas fa-envelope text-[#00205B] w-5 mr-2 mt-1"></i>
                      <a href={`mailto:${contact.email}`} class="text-[#FF6B35] hover:underline break-all">
                        {contact.email}
                      </a>
                    </div>
                    <div class="flex items-start text-sm text-gray-700">
                      <i class="fas fa-clock text-[#00205B] w-5 mr-2 mt-1"></i>
                      <span class="text-xs">{contact.availability}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div class="flex gap-2 pt-4 border-t border-gray-200">
                    <a 
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      class="flex-1 bg-[#00205B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors text-center"
                    >
                      <i class="fas fa-phone mr-2"></i>Appeler
                    </a>
                    <a 
                      href={`mailto:${contact.email}`}
                      class="flex-1 bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors text-center"
                    >
                      <i class="fas fa-envelope mr-2"></i>Email
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contacts d'Urgence */}
        <div class="mt-12 bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <h2 class="text-xl font-bold text-red-800 mb-4 flex items-center">
            <i class="fas fa-exclamation-triangle text-red-600 mr-3"></i>
            Numéros d'Urgence
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-4 border-l-4 border-red-600">
              <h3 class="font-bold text-gray-800 mb-2">Urgence Site GXO</h3>
              <p class="text-2xl font-bold text-red-600 mb-1">01 60 60 99 99</p>
              <p class="text-sm text-gray-600">Poste 9999 - 24h/24</p>
            </div>
            <div class="bg-white rounded-lg p-4 border-l-4 border-red-600">
              <h3 class="font-bold text-gray-800 mb-2">SAMU</h3>
              <p class="text-2xl font-bold text-red-600 mb-1">15</p>
              <p class="text-sm text-gray-600">Urgences médicales</p>
            </div>
            <div class="bg-white rounded-lg p-4 border-l-4 border-red-600">
              <h3 class="font-bold text-gray-800 mb-2">Pompiers</h3>
              <p class="text-2xl font-bold text-red-600 mb-1">18</p>
              <p class="text-sm text-gray-600">Incendie, accidents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Aperçu PDF (réutilise le même système que bibliothèque) */}
      <div id="preview-modal" class="fixed inset-0 bg-black bg-opacity-75 hidden z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 id="preview-title" class="text-lg font-bold text-gray-800"></h3>
            <div class="flex gap-2">
              <a 
                id="preview-download-btn" 
                href="#" 
                download
                class="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
              >
                <i class="fas fa-download mr-2"></i>Télécharger
              </a>
              <button 
                onclick="closePreview()"
                class="text-gray-600 hover:text-gray-800 text-2xl px-3"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div id="preview-content" class="flex-1 overflow-hidden">
            {/* Le contenu sera injecté ici par JavaScript */}
          </div>
        </div>
      </div>
    </div>
  )
}

// Script de recherche et filtres (à ajouter dans app.js)
if (typeof window !== 'undefined') {
  window.filterContacts = function() {
    const searchTerm = document.getElementById('contact-search')?.value.toLowerCase() || ''
    const cards = document.querySelectorAll('.contact-card')
    let visibleCount = 0

    cards.forEach(card => {
      const name = card.getAttribute('data-name') || ''
      const role = card.getAttribute('data-role') || ''
      const service = card.getAttribute('data-service') || ''
      const keywords = card.getAttribute('data-keywords') || ''

      const matches = name.includes(searchTerm) || 
                     role.includes(searchTerm) || 
                     service.toLowerCase().includes(searchTerm) ||
                     keywords.includes(searchTerm)

      if (matches) {
        card.style.display = 'block'
        visibleCount++
      } else {
        card.style.display = 'none'
      }
    })

    // Mise à jour du compteur
    const countElement = document.getElementById('contact-count')
    if (countElement) countElement.textContent = visibleCount

    // Affichage message si aucun résultat
    const noResults = document.getElementById('no-contacts-found')
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0)
    }
  }

  window.filterByService = function(service) {
    const cards = document.querySelectorAll('.contact-card')
    let visibleCount = 0

    cards.forEach(card => {
      const cardService = card.getAttribute('data-service')
      if (service === 'all' || cardService === service) {
        card.style.display = 'block'
        visibleCount++
      } else {
        card.style.display = 'none'
      }
    })

    // Mise à jour du compteur
    const countElement = document.getElementById('contact-count')
    if (countElement) countElement.textContent = visibleCount

    // Effacer la recherche
    const searchInput = document.getElementById('contact-search')
    if (searchInput) searchInput.value = ''

    // Message aucun résultat
    const noResults = document.getElementById('no-contacts-found')
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0)
    }
  }

  window.clearContactSearch = function() {
    const searchInput = document.getElementById('contact-search')
    if (searchInput) {
      searchInput.value = ''
      filterContacts()
    }
  }

  window.closePreview = function() {
    const modal = document.getElementById('preview-modal')
    if (modal) modal.classList.add('hidden')
  }

  // Fermer modal avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview()
  })
}
