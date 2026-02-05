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
    
    // Process Control
    {
      id: 100,
      nom: 'DA SILVA',
      prenom: 'Melissa',
      fonction: 'Chef d\'équipe Process Control',
      service: 'Process Control',
      telephone: '',
      extension: '150300',
      email: 'melissa.dasilva@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'chef equipe process control'
    },
    {
      id: 101,
      nom: '',
      prenom: '',
      fonction: 'Process Control',
      service: 'Process Control',
      telephone: '',
      extension: '149238',
      email: 'processcontrol@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'process control'
    },
    {
      id: 102,
      nom: 'GUSSIE',
      prenom: 'Rocky',
      fonction: 'Directeur d\'Exploitation',
      service: 'Process Control',
      telephone: '06 22 11 97 45',
      extension: '',
      email: 'rocky.gussie@gxo.com',
      mobile: '06 22 11 97 45',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'directeur exploitation process control'
    },
    {
      id: 103,
      nom: 'DIMITRU',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation IPL/Réception',
      service: 'Process Control',
      telephone: '06 23 07 06 32',
      extension: '',
      email: 'marius.dimitru@gxo.com',
      mobile: '06 23 07 06 32',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'responsable exploitation ipl reception'
    },
    {
      id: 104,
      nom: 'LAROCHE',
      prenom: 'Florent',
      fonction: 'Responsable d\'Exploitation',
      service: 'Process Control',
      telephone: '',
      extension: '0676868450',
      email: 'florent.laroche@gxo.com',
      mobile: '0676868450',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'responsable exploitation process control'
    },
    {
      id: 105,
      nom: 'MBIA',
      prenom: 'Michèle',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'Process Control',
      telephone: '',
      extension: '',
      email: 'michele.mbia@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'backup chef exploitation process control'
    },
    {
      id: 106,
      nom: 'Coutton',
      prenom: 'Mélanie',
      fonction: 'Chef d\'Exploitation',
      service: 'Process Control',
      telephone: '',
      extension: '0621860304/150362',
      email: 'melanie.coutton@gxo.com',
      mobile: '0621860304',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'chef exploitation process control'
    },
    {
      id: 107,
      nom: 'VLAVO',
      prenom: 'Eric',
      fonction: 'Chef d\'équipe AM',
      service: 'Process Control',
      telephone: '',
      extension: '150252',
      email: 'eric.vlavo@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Process Control',
      keywords: 'chef equipe am matin process control'
    },
    {
      id: 108,
      nom: 'DRUTHINUS',
      prenom: 'Richard',
      fonction: 'Chef d\'équipe Matin',
      service: 'Process Control',
      telephone: '',
      extension: '150270',
      email: 'richard.druthinus@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Process Control',
      keywords: 'chef equipe matin process control'
    },
    {
      id: 109,
      nom: 'LAZAOUI',
      prenom: 'Brahim',
      fonction: 'Chef d\'équipe Après-midi',
      service: 'Process Control',
      telephone: '',
      extension: '156239',
      email: 'brahim.lazaoui@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Process Control',
      keywords: 'chef equipe apres-midi process control'
    },
    {
      id: 110,
      nom: 'JEAN PIERRE',
      prenom: 'Johnny',
      fonction: 'Back UP CEL',
      service: 'Process Control',
      telephone: '',
      extension: '150270',
      email: 'johnny.jeanpierre@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Process Control',
      keywords: 'backup cel process control'
    },
    {
      id: 111,
      nom: '',
      prenom: '',
      fonction: 'Admin',
      service: 'Process Control',
      telephone: '',
      extension: '150294',
      email: 'admin.processcontrol@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Process Control',
      keywords: 'admin process control'
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
    
    // IPL
    {
      id: 300,
      nom: 'GUSSIE',
      prenom: 'Rocky',
      fonction: 'Directeur d\'Exploitation',
      service: 'IPL',
      telephone: '06 22 11 97 45',
      extension: '',
      email: 'rocky.gussie@gxo.com',
      mobile: '06 22 11 97 45',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'directeur exploitation ipl'
    },
    {
      id: 301,
      nom: 'DIMITRU',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation IPL/Réception',
      service: 'IPL',
      telephone: '06 23 07 06 32',
      extension: '',
      email: 'marius.dimitru@gxo.com',
      mobile: '06 23 07 06 32',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'responsable exploitation ipl reception'
    },
    {
      id: 302,
      nom: 'LAROCHE',
      prenom: 'Florent',
      fonction: 'Responsable d\'Exploitation',
      service: 'IPL',
      telephone: '0676868450',
      extension: '',
      email: 'florent.laroche@gxo.com',
      mobile: '0676868450',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'responsable exploitation ipl'
    },
    {
      id: 303,
      nom: 'MBIA',
      prenom: 'Michèle',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'IPL',
      telephone: '',
      extension: '',
      email: 'michele.mbia@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'backup chef exploitation ipl'
    },
    {
      id: 304,
      nom: 'SENASSAOUI',
      prenom: 'Mohamed',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'IPL',
      telephone: '',
      extension: '',
      email: 'mohamed.senassaoui@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'backup chef exploitation ipl'
    },
    {
      id: 305,
      nom: 'HOUMADI',
      prenom: 'François',
      fonction: 'Chef d\'équipe AM',
      service: 'IPL',
      telephone: '',
      extension: '150294',
      email: 'francois.houmadi@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone IPL',
      keywords: 'chef equipe am matin ipl'
    },
    {
      id: 306,
      nom: 'ALCEGAIRE',
      prenom: 'Ainel',
      fonction: 'Chef d\'équipe AM',
      service: 'IPL',
      telephone: '',
      extension: '150365',
      email: 'ainel.alcegaire@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone IPL',
      keywords: 'chef equipe am matin ipl'
    },
    {
      id: 307,
      nom: 'MONGAMBA',
      prenom: 'Didier',
      fonction: 'Chef d\'équipe PM',
      service: 'IPL',
      telephone: '',
      extension: '150365',
      email: 'didier.mongamba@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone IPL',
      keywords: 'chef equipe pm apres-midi ipl'
    },
    {
      id: 308,
      nom: 'BAH',
      prenom: 'Mamadou',
      fonction: 'Chef d\'équipe PM',
      service: 'IPL',
      telephone: '',
      extension: '150294',
      email: 'mamadou.bah@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone IPL',
      keywords: 'chef equipe pm apres-midi ipl'
    },
    {
      id: 309,
      nom: 'GENEST',
      prenom: 'Estelle',
      fonction: 'Responsable d\'Exploitation',
      service: 'IPL',
      telephone: '',
      extension: '150307',
      email: 'estelle.genest@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'responsable exploitation ipl'
    },
    {
      id: 310,
      nom: 'DIMITRU',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation',
      service: 'IPL',
      telephone: '',
      extension: '150265',
      email: 'marius.dimitru@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'responsable exploitation ipl'
    },
    {
      id: 311,
      nom: 'MESSINA',
      prenom: 'Christophe',
      fonction: 'Chef d\'Exploitation',
      service: 'IPL',
      telephone: '',
      extension: '150259',
      email: 'christophe.messina@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'chef exploitation ipl'
    },
    {
      id: 312,
      nom: 'CHAUVIN',
      prenom: 'Thomas',
      fonction: 'Chef d\'Exploitation',
      service: 'IPL',
      telephone: '',
      extension: '150211',
      email: 'thomas.chauvin@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'chef exploitation ipl'
    },
    {
      id: 313,
      nom: 'NAJAH',
      prenom: 'Khadija',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'IPL',
      telephone: '',
      extension: '150237',
      email: 'khadija.najah@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'backup chef exploitation ipl'
    },
    {
      id: 314,
      nom: 'PEREIRA',
      prenom: 'Jean Pierre',
      fonction: 'Chef d\'équipe AM',
      service: 'IPL',
      telephone: '',
      extension: '150242',
      email: 'jeanpierre.pereira@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone IPL',
      keywords: 'chef equipe am matin ipl'
    },
    {
      id: 315,
      nom: 'PAUCHARD',
      prenom: 'Corine',
      fonction: 'Chef d\'équipe AM',
      service: 'IPL',
      telephone: '',
      extension: '150308',
      email: 'corine.pauchard@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone IPL',
      keywords: 'chef equipe am matin ipl'
    },
    {
      id: 316,
      nom: 'PALMONT',
      prenom: 'Rodrigue',
      fonction: 'Chef d\'équipe AM',
      service: 'IPL',
      telephone: '',
      extension: '150232',
      email: 'rodrigue.palmont@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone IPL',
      keywords: 'chef equipe am matin ipl'
    },
    {
      id: 317,
      nom: 'KEITA',
      prenom: 'Moussa',
      fonction: 'Chef d\'équipe AM',
      service: 'IPL',
      telephone: '',
      extension: '150272',
      email: 'moussa.keita@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone IPL',
      keywords: 'chef equipe am matin ipl'
    },
    {
      id: 318,
      nom: 'CHOUCOUTOU',
      prenom: 'Allan',
      fonction: 'Back Up CEL Preparation',
      service: 'IPL',
      telephone: '',
      extension: '150232',
      email: 'allan.choucoutou@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone IPL',
      keywords: 'backup cel preparation ipl'
    },
    {
      id: 319,
      nom: 'HAMELET',
      prenom: 'Adriana',
      fonction: 'Chef d\'équipe PM',
      service: 'IPL',
      telephone: '',
      extension: '150272',
      email: 'adriana.hamelet@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone IPL',
      keywords: 'chef equipe pm apres-midi ipl'
    },
    {
      id: 320,
      nom: 'MIGAMBANOU',
      prenom: 'Beni-Carisma',
      fonction: 'Chef d\'équipe PM',
      service: 'IPL',
      telephone: '',
      extension: '150242',
      email: 'benicarisma.migambanou@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone IPL',
      keywords: 'chef equipe pm apres-midi ipl'
    },
    {
      id: 321,
      nom: 'KAMBA LUKOKI',
      prenom: 'Claverd',
      fonction: 'Chef d\'équipe PM',
      service: 'IPL',
      telephone: '',
      extension: '150258',
      email: 'claverd.kambalukoki@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone IPL',
      keywords: 'chef equipe pm apres-midi ipl'
    },
    {
      id: 322,
      nom: 'SZCZEZINA',
      prenom: 'David',
      fonction: 'Chef d\'équipe NUIT',
      service: 'IPL',
      telephone: '',
      extension: '150211',
      email: 'david.szczezina@gxo.com',
      mobile: '',
      horaires: 'Nuit',
      bureau: 'Zone IPL',
      keywords: 'chef equipe nuit ipl'
    },
    {
      id: 323,
      nom: 'WAZANE',
      prenom: 'Brahim',
      fonction: 'Chef d\'équipe NUIT',
      service: 'IPL',
      telephone: '',
      extension: '150258',
      email: 'brahim.wazane@gxo.com',
      mobile: '',
      horaires: 'Nuit',
      bureau: 'Zone IPL',
      keywords: 'chef equipe nuit ipl'
    },
    {
      id: 324,
      nom: '',
      prenom: '',
      fonction: 'Contrôle qualité',
      service: 'IPL',
      telephone: '',
      extension: '150241',
      email: 'controle.qualite1@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'controle qualite ipl'
    },
    {
      id: 325,
      nom: '',
      prenom: '',
      fonction: 'Contrôle qualité',
      service: 'IPL',
      telephone: '',
      extension: '150301',
      email: 'controle.qualite2@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone IPL',
      keywords: 'controle qualite ipl'
    },
    
    // Préparation
    {
      id: 9,
      nom: 'GENEST',
      prenom: 'Estelle',
      fonction: 'Responsable d\'Exploitation',
      service: 'Préparation',
      telephone: '',
      extension: '150307',
      email: 'estelle.genest@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Préparation',
      keywords: 'responsable exploitation preparation picking'
    },
    {
      id: 10,
      nom: 'DIMITRU',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation',
      service: 'Préparation',
      telephone: '',
      extension: '150265',
      email: 'marius.dimitru@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Préparation',
      keywords: 'responsable exploitation preparation picking'
    },
    {
      id: 23,
      nom: 'MESSINA',
      prenom: 'Christophe',
      fonction: 'Chef d\'Exploitation',
      service: 'Préparation',
      telephone: '',
      extension: '150259',
      email: 'christophe.messina@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Préparation',
      keywords: 'chef exploitation preparation picking'
    },
    {
      id: 24,
      nom: 'CHAUVIN',
      prenom: 'Thomas',
      fonction: 'Chef d\'Exploitation',
      service: 'Préparation',
      telephone: '',
      extension: '150211',
      email: 'thomas.chauvin@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Préparation',
      keywords: 'chef exploitation preparation picking'
    },
    {
      id: 25,
      nom: 'NAJAH',
      prenom: 'Khadija',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'Préparation',
      telephone: '',
      extension: '150237',
      email: 'khadija.najah@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Préparation',
      keywords: 'backup chef exploitation preparation picking'
    },
    {
      id: 26,
      nom: 'TCHOMBA NYEMBO',
      prenom: 'Blaise',
      fonction: 'Back Up Chef d\'exploitation',
      service: 'Préparation',
      telephone: '',
      extension: '150244',
      email: 'blaise.tchomba@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Zone Préparation',
      keywords: 'backup chef exploitation preparation picking'
    },
    {
      id: 27,
      nom: 'LUKUSA',
      prenom: 'Jean-Paul',
      fonction: 'Chef d\'équipe AM',
      service: 'Préparation',
      telephone: '',
      extension: '150244',
      email: 'jeanpaul.lukusa@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Zone Préparation',
      keywords: 'chef equipe am matin preparation picking'
    },
    {
      id: 28,
      nom: 'BINDELT',
      prenom: 'Lionel',
      fonction: 'Chef d\'équipe PM',
      service: 'Préparation',
      telephone: '',
      extension: '150244 / 150262',
      email: 'lionel.bindelt@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Zone Préparation',
      keywords: 'chef equipe pm apres-midi preparation picking'
    },
    {
      id: 29,
      nom: 'NDEBEKA MALEKA',
      prenom: 'Aymar',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150311',
      email: 'aymar.ndebeka@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    {
      id: 30,
      nom: 'PREPARATEUR',
      prenom: '',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150336',
      email: 'preparateur336@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    {
      id: 31,
      nom: 'PREPARATEUR',
      prenom: '',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150371',
      email: 'preparateur371@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    {
      id: 32,
      nom: 'PREPARATEUR',
      prenom: '',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150372',
      email: 'preparateur372@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    {
      id: 33,
      nom: 'PREPARATEUR',
      prenom: '',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150373',
      email: 'preparateur373@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    {
      id: 34,
      nom: 'PREPARATEUR',
      prenom: '',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150374',
      email: 'preparateur374@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    {
      id: 35,
      nom: 'PREPARATEUR',
      prenom: '',
      fonction: 'Préparateur',
      service: 'Préparation',
      telephone: '',
      extension: '150375',
      email: 'preparateur375@gxo.com',
      mobile: '',
      horaires: 'Variable',
      bureau: 'Zone Préparation',
      keywords: 'preparateur preparation picking prelevement'
    },
    
    // Expédition
    {
      id: 42,
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
      id: 43,
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
      id: 44,
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
      id: 45,
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
      id: 46,
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
      id: 47,
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
      id: 48,
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
      id: 49,
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
      id: 50,
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
      id: 51,
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
      id: 52,
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
      id: 53,
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
      id: 54,
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
      id: 55,
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
      id: 56,
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
    
    // Maintenance
    {
      id: 400,
      nom: 'LE BRIS',
      prenom: 'Fabrice',
      fonction: 'Responsable maintenance',
      service: 'Maintenance',
      telephone: '06 22 92 23 02',
      extension: '',
      email: 'fabrice.lebris@gxo.com',
      mobile: '06 22 92 23 02',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Maintenance',
      keywords: 'responsable maintenance'
    },
    {
      id: 401,
      nom: 'TAGRO',
      prenom: 'Jean-Jacques',
      fonction: 'Chef d\'équipe maintenance',
      service: 'Maintenance',
      telephone: '06 20 28 53 80',
      extension: '',
      email: 'jeanjacques.tagro@gxo.com',
      mobile: '06 20 28 53 80',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Maintenance',
      keywords: 'chef equipe maintenance'
    },
    {
      id: 402,
      nom: 'RAGOBERT',
      prenom: 'Prescillia',
      fonction: 'Admin Maintenance',
      service: 'Maintenance',
      telephone: '',
      extension: '150215',
      email: 'prescillia.ragobert@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Maintenance',
      keywords: 'admin maintenance'
    },
    {
      id: 403,
      nom: '',
      prenom: '',
      fonction: 'Technicien maintenance NUIT',
      service: 'Maintenance',
      telephone: '',
      extension: '150260',
      email: 'technicien.nuit@gxo.com',
      mobile: '',
      horaires: 'Nuit',
      bureau: 'Maintenance',
      keywords: 'technicien maintenance nuit'
    },
    {
      id: 404,
      nom: '',
      prenom: '',
      fonction: 'Technicien maintenance PM',
      service: 'Maintenance',
      telephone: '',
      extension: '150367',
      email: 'technicien.pm@gxo.com',
      mobile: '',
      horaires: 'Après-midi',
      bureau: 'Maintenance',
      keywords: 'technicien maintenance pm'
    },
    {
      id: 405,
      nom: '',
      prenom: '',
      fonction: 'Technicien maintenance AM',
      service: 'Maintenance',
      telephone: '',
      extension: '150275',
      email: 'technicien.am@gxo.com',
      mobile: '',
      horaires: 'Matin',
      bureau: 'Maintenance',
      keywords: 'technicien maintenance am'
    },
    {
      id: 406,
      nom: '',
      prenom: '',
      fonction: 'Agent local de charge',
      service: 'Maintenance',
      telephone: '',
      extension: '150305',
      email: 'agent.charge@gxo.com',
      mobile: '',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'Maintenance',
      keywords: 'agent local charge maintenance'
    },
    
    // Ressources Humaines
    {
      id: 500,
      nom: 'LE BANNER',
      prenom: 'Camille',
      fonction: 'RQHSSE',
      service: 'RH',
      telephone: '06 23 71 65 92',
      extension: '',
      email: 'camille.lebanner@gxo.com',
      mobile: '06 23 71 65 92',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'rqhsse qualite securite environnement rh'
    },
    {
      id: 501,
      nom: 'BOUGASSIER',
      prenom: 'Estelle',
      fonction: 'Responsable Ressources Humaines',
      service: 'RH',
      telephone: '06 68 08 00 11',
      extension: '',
      email: 'estelle.bougassier@gxo.com',
      mobile: '06 68 08 00 11',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable ressources humaines rh'
    },
    {
      id: 502,
      nom: 'LAROCHE',
      prenom: 'Florent',
      fonction: 'Responsable d\'Exploitation IPL/Réception',
      service: 'RH',
      telephone: '06 76 86 84 50',
      extension: '',
      email: 'florent.laroche@gxo.com',
      mobile: '06 76 86 84 50',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable exploitation ipl reception rh'
    },
    {
      id: 503,
      nom: 'GENEST',
      prenom: 'Estelle',
      fonction: 'Responsable d\'Exploitation Préparation/Expédition',
      service: 'RH',
      telephone: '06 20 77 54 95',
      extension: '',
      email: 'estelle.genest@gxo.com',
      mobile: '06 20 77 54 95',
      horaires: 'Lun-Ven 08h-17h',
      bureau: 'RH',
      keywords: 'responsable exploitation preparation expedition rh'
    },
    {
      id: 504,
      nom: 'DIMITRU',
      prenom: 'Marius',
      fonction: 'Responsable d\'Exploitation IPL/Réception',
      service: 'RH',
      telephone: '06 23 07 06 32',
      extension: '',
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
    { name: 'Direction', icon: 'fa-building', color: 'bg-blue-500', count: contacts.filter(c => c.service === 'Direction').length },
    { name: 'Process Control', icon: 'fa-clipboard-check', color: 'bg-green-500', count: contacts.filter(c => c.service === 'Process Control').length },
    { name: 'Réception', icon: 'fa-truck-loading', color: 'bg-blue-600', count: contacts.filter(c => c.service === 'Réception').length },
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
      <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white py-12 px-6 mb-8 shadow-lg">
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