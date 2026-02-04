export function ContactsPage() {
  const contacts = [
    // Réception
    {
      id: 1,
      nom: 'Jean Dupont',
      prenom: 'Jean',
      poste: 'Responsable Réception',
      service: 'Réception',
      telephone: '+33 1 60 60 10 01',
      mobile: '+33 6 12 34 56 78',
      email: 'jean.dupont@gxo.com',
      equipe: 'Matin',
      badge: 'R001',
      competences: ['EWM', 'Goods Receipt', 'Contrôle qualité', 'SAP']
    },
    {
      id: 2,
      nom: 'Marie Martin',
      prenom: 'Marie',
      poste: 'Agent Réception',
      service: 'Réception',
      telephone: '+33 1 60 60 10 02',
      mobile: '+33 6 23 45 67 89',
      email: 'marie.martin@gxo.com',
      equipe: 'Après-midi',
      badge: 'R002',
      competences: ['Réception palettes', 'Contrôle BL', 'Déchargement']
    },
    {
      id: 3,
      nom: 'Pierre Dubois',
      prenom: 'Pierre',
      poste: 'Chef d\'Équipe Réception',
      service: 'Réception',
      telephone: '+33 1 60 60 10 03',
      mobile: '+33 6 34 56 78 90',
      email: 'pierre.dubois@gxo.com',
      equipe: 'Nuit',
      badge: 'R003',
      competences: ['Supervision', 'EOP checks', 'ICPE', 'Conditionnement']
    },

    // IPL (Intra Plant Logistics)
    {
      id: 4,
      nom: 'Sophie Bernard',
      prenom: 'Sophie',
      poste: 'Responsable IPL',
      service: 'IPL',
      telephone: '+33 1 60 60 20 01',
      mobile: '+33 6 45 67 89 01',
      email: 'sophie.bernard@gxo.com',
      equipe: 'Matin',
      badge: 'I001',
      competences: ['LTRMS', 'LTRA', 'Gestion tâches', 'Priorisation']
    },
    {
      id: 5,
      nom: 'Thomas Petit',
      prenom: 'Thomas',
      poste: 'Cariste IPL',
      service: 'IPL',
      telephone: '+33 1 60 60 20 02',
      mobile: '+33 6 56 78 90 12',
      email: 'thomas.petit@gxo.com',
      equipe: 'Après-midi',
      badge: 'I002',
      competences: ['Conduite chariot', 'LTRMS', 'Affectation tâches']
    },
    {
      id: 6,
      nom: 'Claire Robert',
      prenom: 'Claire',
      poste: 'Cariste Senior IPL',
      service: 'IPL',
      telephone: '+33 1 60 60 20 03',
      mobile: '+33 6 67 89 01 23',
      email: 'claire.robert@gxo.com',
      equipe: 'Matin',
      badge: 'I003',
      competences: ['LS03N', 'Visualisation stocks', 'Formation caristes']
    },

    // Préparation
    {
      id: 7,
      nom: 'Luc Richard',
      prenom: 'Luc',
      poste: 'Responsable Préparation',
      service: 'Préparation',
      telephone: '+33 1 60 60 30 01',
      mobile: '+33 6 78 90 12 34',
      email: 'luc.richard@gxo.com',
      equipe: 'Matin',
      badge: 'P001',
      competences: ['LT24', 'Prélèvement', 'Montage rolls', 'Formation']
    },
    {
      id: 8,
      nom: 'Isabelle Durand',
      prenom: 'Isabelle',
      poste: 'Préparatrice',
      service: 'Préparation',
      telephone: '+33 1 60 60 30 02',
      mobile: '+33 6 89 01 23 45',
      email: 'isabelle.durand@gxo.com',
      equipe: 'Après-midi',
      badge: 'P002',
      competences: ['Prélèvement', 'Écart prélèvement', 'Quai fictif']
    },

    // Retours
    {
      id: 9,
      nom: 'Medhi Seghir',
      prenom: 'Medhi',
      poste: 'Responsable Retours & Déchets',
      service: 'Retours',
      telephone: '+33 1 60 60 40 01',
      mobile: '+33 6 90 12 34 56',
      email: 'medhi.seghir@gxo.com',
      equipe: 'Matin',
      badge: 'RT001',
      competences: ['PAPREC', 'BIONERVAL', 'Biodéchets', 'Transfert rolls']
    },
    {
      id: 10,
      nom: 'Prescilla Delton',
      prenom: 'Prescilla',
      poste: 'Agent Retours',
      service: 'Retours',
      telephone: '+33 1 60 60 40 02',
      mobile: '+33 6 01 23 45 67',
      email: 'prescilla.delton@gxo.com',
      equipe: 'Après-midi',
      badge: 'RT002',
      competences: ['Collecte biodéchets', 'Clôture livraison retour', 'ASN']
    },

    // Direction & Management
    {
      id: 11,
      nom: 'François Moreau',
      prenom: 'François',
      poste: 'Directeur de Site',
      service: 'Direction',
      telephone: '+33 1 60 60 00 01',
      mobile: '+33 6 11 22 33 44',
      email: 'francois.moreau@gxo.com',
      equipe: 'Bureau',
      badge: 'DIR001',
      competences: ['Management', 'Stratégie', 'KPI', 'Relations clients']
    },
    {
      id: 12,
      nom: 'Nathalie Leroy',
      prenom: 'Nathalie',
      poste: 'Responsable Opérations',
      service: 'Direction',
      telephone: '+33 1 60 60 00 02',
      mobile: '+33 6 22 33 44 55',
      email: 'nathalie.leroy@gxo.com',
      equipe: 'Bureau',
      badge: 'DIR002',
      competences: ['Opérations', 'Coordination équipes', 'Performance', 'Sécurité']
    },

    // RH & Formation
    {
      id: 13,
      nom: 'Sylvie Girard',
      prenom: 'Sylvie',
      poste: 'Responsable RH',
      service: 'Ressources Humaines',
      telephone: '+33 1 60 60 50 01',
      mobile: '+33 6 33 44 55 66',
      email: 'sylvie.girard@gxo.com',
      equipe: 'Bureau',
      badge: 'RH001',
      competences: ['Recrutement', 'Formation', 'Intégration', 'Paie']
    },
    {
      id: 14,
      nom: 'Marc Lambert',
      prenom: 'Marc',
      poste: 'Formateur',
      service: 'Ressources Humaines',
      telephone: '+33 1 60 60 50 02',
      mobile: '+33 6 44 55 66 77',
      email: 'marc.lambert@gxo.com',
      equipe: 'Bureau',
      badge: 'RH002',
      competences: ['Formation CACES', 'Onboarding', 'Procédures', 'EWM']
    },

    // IT Support
    {
      id: 15,
      nom: 'David Fontaine',
      prenom: 'David',
      poste: 'Technicien IT',
      service: 'IT Support',
      telephone: '+33 1 60 60 60 01',
      mobile: '+33 6 55 66 77 88',
      email: 'david.fontaine@gxo.com',
      equipe: 'Bureau',
      badge: 'IT001',
      competences: ['SAP', 'EWM', 'Terminaux RF', 'Réseau', 'Support utilisateur']
    },
    {
      id: 16,
      nom: 'Émilie Garnier',
      prenom: 'Émilie',
      poste: 'Support IT',
      service: 'IT Support',
      telephone: '+33 1 60 60 60 02',
      mobile: '+33 6 66 77 88 99',
      email: 'emilie.garnier@gxo.com',
      equipe: 'Bureau',
      badge: 'IT002',
      competences: ['Imprimantes', 'Scanners', 'Maintenance matériel']
    },

    // Qualité & Sécurité
    {
      id: 17,
      nom: 'Philippe Rousseau',
      prenom: 'Philippe',
      poste: 'Responsable Qualité',
      service: 'Qualité',
      telephone: '+33 1 60 60 70 01',
      mobile: '+33 6 77 88 99 00',
      email: 'philippe.rousseau@gxo.com',
      equipe: 'Bureau',
      badge: 'Q001',
      competences: ['Audit qualité', 'ISO', 'Non-conformités', 'Amélioration continue']
    },
    {
      id: 18,
      nom: 'Sandrine Bonnet',
      prenom: 'Sandrine',
      poste: 'Responsable Sécurité',
      service: 'Sécurité',
      telephone: '+33 1 60 60 80 01',
      mobile: '+33 6 88 99 00 11',
      email: 'sandrine.bonnet@gxo.com',
      equipe: 'Bureau',
      badge: 'S001',
      competences: ['Sécurité', 'Prévention accidents', 'Formation sécurité', 'Audits']
    },

    // Maintenance
    {
      id: 19,
      nom: 'Alain Perrin',
      prenom: 'Alain',
      poste: 'Chef Maintenance',
      service: 'Maintenance',
      telephone: '+33 1 60 60 90 01',
      mobile: '+33 6 99 00 11 22',
      email: 'alain.perrin@gxo.com',
      equipe: 'Matin',
      badge: 'M001',
      competences: ['Maintenance préventive', 'Réparation chariots', 'Gestion pannes']
    },
    {
      id: 20,
      nom: 'Bruno Mercier',
      prenom: 'Bruno',
      poste: 'Technicien Maintenance',
      service: 'Maintenance',
      telephone: '+33 1 60 60 90 02',
      mobile: '+33 7 00 11 22 33',
      email: 'bruno.mercier@gxo.com',
      equipe: 'Après-midi',
      badge: 'M002',
      competences: ['Électricité', 'Mécanique', 'Batteries', 'Convoyeurs']
    }
  ]

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white rounded-2xl shadow-2xl p-8 mb-8">
          <div class="flex items-center mb-4">
            <i class="fas fa-address-book text-5xl mr-6"></i>
            <div>
              <h1 class="text-4xl font-bold">Annuaire des Contacts</h1>
              <p class="text-blue-100 mt-2">GXO Logistics - Moissy-Cramayel</p>
            </div>
          </div>
          <div class="bg-white/10 rounded-lg p-4 mt-6">
            <p class="text-sm">
              <i class="fas fa-info-circle mr-2"></i>
              Retrouvez tous les contacts de l'équipe GXO Moissy-Cramayel : téléphone, email, service, compétences
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center mb-2">
            <i class="fas fa-search text-gray-400 text-xl mr-3"></i>
            <input
              type="text"
              id="search-input"
              placeholder="Rechercher par nom, prénom, service, poste, compétences..."
              class="flex-1 text-lg border-none outline-none"
              onkeyup="filterContacts()"
            />
            <button 
              onclick="clearSearch()" 
              class="text-gray-400 hover:text-[#FF6B35] transition-colors ml-4"
              title="Effacer la recherche"
            >
              <i class="fas fa-times-circle text-2xl"></i>
            </button>
          </div>
          <p class="text-xs text-gray-500 ml-12">Exemples : "Jean", "Réception", "Responsable", "EWM", "Matin"</p>
        </div>

        {/* Filters */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-filter mr-2 text-[#00205B]"></i>
            Filtrer par Service
          </h3>
          <div class="flex flex-wrap gap-3">
            <button 
              onclick="filterByService('Tous')"
              class="filter-btn bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
              data-service="Tous"
            >
              <i class="fas fa-globe mr-2"></i>Tous ({contacts.length})
            </button>
            <button 
              onclick="filterByService('Réception')"
              class="filter-btn bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
              data-service="Réception"
            >
              <i class="fas fa-truck-loading mr-2"></i>Réception ({contacts.filter(c => c.service === 'Réception').length})
            </button>
            <button 
              onclick="filterByService('IPL')"
              class="filter-btn bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              data-service="IPL"
            >
              <i class="fas fa-forklift mr-2"></i>IPL ({contacts.filter(c => c.service === 'IPL').length})
            </button>
            <button 
              onclick="filterByService('Préparation')"
              class="filter-btn bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors"
              data-service="Préparation"
            >
              <i class="fas fa-dolly mr-2"></i>Préparation ({contacts.filter(c => c.service === 'Préparation').length})
            </button>
            <button 
              onclick="filterByService('Retours')"
              class="filter-btn bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors"
              data-service="Retours"
            >
              <i class="fas fa-undo-alt mr-2"></i>Retours ({contacts.filter(c => c.service === 'Retours').length})
            </button>
            <button 
              onclick="filterByService('Direction')"
              class="filter-btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
              data-service="Direction"
            >
              <i class="fas fa-user-tie mr-2"></i>Direction ({contacts.filter(c => c.service === 'Direction').length})
            </button>
            <button 
              onclick="filterByService('Ressources Humaines')"
              class="filter-btn bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors"
              data-service="Ressources Humaines"
            >
              <i class="fas fa-users mr-2"></i>RH ({contacts.filter(c => c.service === 'Ressources Humaines').length})
            </button>
            <button 
              onclick="filterByService('IT Support')"
              class="filter-btn bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors"
              data-service="IT Support"
            >
              <i class="fas fa-laptop mr-2"></i>IT Support ({contacts.filter(c => c.service === 'IT Support').length})
            </button>
            <button 
              onclick="filterByService('Qualité')"
              class="filter-btn bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
              data-service="Qualité"
            >
              <i class="fas fa-award mr-2"></i>Qualité ({contacts.filter(c => c.service === 'Qualité').length})
            </button>
            <button 
              onclick="filterByService('Sécurité')"
              class="filter-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
              data-service="Sécurité"
            >
              <i class="fas fa-shield-alt mr-2"></i>Sécurité ({contacts.filter(c => c.service === 'Sécurité').length})
            </button>
            <button 
              onclick="filterByService('Maintenance')"
              class="filter-btn bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
              data-service="Maintenance"
            >
              <i class="fas fa-wrench mr-2"></i>Maintenance ({contacts.filter(c => c.service === 'Maintenance').length})
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div class="bg-blue-50 border-l-4 border-[#00205B] rounded-lg p-4 mb-6">
          <p class="text-gray-700 font-semibold">
            <span id="contact-count">{contacts.length}</span> contact(s) trouvé(s)
          </p>
        </div>

        {/* No Results Message */}
        <div id="no-results" class="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-6 hidden">
          <div class="flex items-center">
            <i class="fas fa-exclamation-triangle text-yellow-600 text-3xl mr-4"></i>
            <div>
              <h3 class="text-lg font-bold text-yellow-800 mb-1">Aucun contact trouvé</h3>
              <p class="text-yellow-700 text-sm">Essayez avec d'autres mots-clés ou filtres</p>
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        <div id="contacts-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(contact => {
            const serviceColors = {
              'Réception': 'border-blue-500 bg-blue-50',
              'IPL': 'border-green-500 bg-green-50',
              'Préparation': 'border-purple-500 bg-purple-50',
              'Retours': 'border-yellow-500 bg-yellow-50',
              'Direction': 'border-red-500 bg-red-50',
              'Ressources Humaines': 'border-pink-500 bg-pink-50',
              'IT Support': 'border-indigo-500 bg-indigo-50',
              'Qualité': 'border-teal-500 bg-teal-50',
              'Sécurité': 'border-orange-500 bg-orange-50',
              'Maintenance': 'border-amber-500 bg-amber-50'
            }

            const serviceIcons = {
              'Réception': 'fa-truck-loading',
              'IPL': 'fa-forklift',
              'Préparation': 'fa-dolly',
              'Retours': 'fa-undo-alt',
              'Direction': 'fa-user-tie',
              'Ressources Humaines': 'fa-users',
              'IT Support': 'fa-laptop',
              'Qualité': 'fa-award',
              'Sécurité': 'fa-shield-alt',
              'Maintenance': 'fa-wrench'
            }

            return (
              <div 
                class={`contact-card bg-white rounded-lg shadow-lg border-l-4 ${serviceColors[contact.service]} overflow-hidden hover:shadow-xl transition-shadow`}
                data-service={contact.service}
                data-nom={contact.nom.toLowerCase()}
                data-prenom={contact.prenom.toLowerCase()}
                data-poste={contact.poste.toLowerCase()}
                data-equipe={contact.equipe.toLowerCase()}
                data-competences={contact.competences.join(' ').toLowerCase()}
              >
                <div class="p-6">
                  {/* Header */}
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <div class="flex items-center mb-2">
                        <i class={`fas ${serviceIcons[contact.service]} text-2xl mr-3`}></i>
                        <span class="text-xs font-semibold text-gray-600 uppercase">{contact.service}</span>
                      </div>
                      <h3 class="text-xl font-bold text-gray-800 mb-1">{contact.prenom} {contact.nom}</h3>
                      <p class="text-sm text-gray-600 font-semibold">{contact.poste}</p>
                    </div>
                    <div class="bg-[#00205B] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {contact.badge}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div class="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    <div class="flex items-center text-sm">
                      <i class="fas fa-phone text-[#00205B] w-5 mr-3"></i>
                      <a href={`tel:${contact.telephone}`} class="text-gray-700 hover:text-[#00205B]">{contact.telephone}</a>
                    </div>
                    <div class="flex items-center text-sm">
                      <i class="fas fa-mobile-alt text-[#00205B] w-5 mr-3"></i>
                      <a href={`tel:${contact.mobile}`} class="text-gray-700 hover:text-[#00205B]">{contact.mobile}</a>
                    </div>
                    <div class="flex items-center text-sm">
                      <i class="fas fa-envelope text-[#00205B] w-5 mr-3"></i>
                      <a href={`mailto:${contact.email}`} class="text-gray-700 hover:text-[#00205B] truncate">{contact.email}</a>
                    </div>
                    <div class="flex items-center text-sm">
                      <i class="fas fa-clock text-[#00205B] w-5 mr-3"></i>
                      <span class="text-gray-700">Équipe {contact.equipe}</span>
                    </div>
                  </div>

                  {/* Compétences */}
                  <div class="mb-4">
                    <h4 class="text-xs font-bold text-gray-600 uppercase mb-2 flex items-center">
                      <i class="fas fa-star mr-2"></i>Compétences
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      {contact.competences.map(comp => (
                        <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-300">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div class="flex gap-2">
                    <a 
                      href={`tel:${contact.mobile}`} 
                      class="flex-1 bg-[#00205B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003DA5] transition-colors text-center"
                    >
                      <i class="fas fa-phone mr-2"></i>Appeler
                    </a>
                    <a 
                      href={`mailto:${contact.email}`} 
                      class="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FF8555] transition-colors"
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

        {/* Back to Home */}
        <div class="text-center mt-12">
          <a 
            href="/" 
            class="inline-flex items-center bg-white text-[#00205B] px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <i class="fas fa-home mr-2"></i>
            Retour à l'accueil
          </a>
        </div>
      </div>

      {/* JavaScript for Search and Filters */}
      <script>{`
        function filterContacts() {
          const searchTerm = document.getElementById('search-input').value.toLowerCase();
          const cards = document.querySelectorAll('.contact-card');
          let visibleCount = 0;

          cards.forEach(card => {
            const nom = card.dataset.nom;
            const prenom = card.dataset.prenom;
            const service = card.dataset.service.toLowerCase();
            const poste = card.dataset.poste;
            const equipe = card.dataset.equipe;
            const competences = card.dataset.competences;

            const matches = nom.includes(searchTerm) || 
                           prenom.includes(searchTerm) ||
                           service.includes(searchTerm) ||
                           poste.includes(searchTerm) ||
                           equipe.includes(searchTerm) ||
                           competences.includes(searchTerm);

            if (matches) {
              card.style.display = 'block';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });

          document.getElementById('contact-count').textContent = visibleCount;
          document.getElementById('no-results').classList.toggle('hidden', visibleCount > 0);
        }

        function filterByService(service) {
          const cards = document.querySelectorAll('.contact-card');
          let visibleCount = 0;

          cards.forEach(card => {
            if (service === 'Tous' || card.dataset.service === service) {
              card.style.display = 'block';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });

          document.getElementById('contact-count').textContent = visibleCount;
          document.getElementById('no-results').classList.toggle('hidden', visibleCount > 0);
          
          // Clear search
          document.getElementById('search-input').value = '';
        }

        function clearSearch() {
          document.getElementById('search-input').value = '';
          filterContacts();
        }
      `}</script>
    </div>
  )
}
