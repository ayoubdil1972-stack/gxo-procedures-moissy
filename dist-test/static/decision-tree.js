// Arbre de décision intelligent pour la Réception
// Système de questions-réponses adapté au métier et à la situation

const decisionTree = {
  // Question racine : Type de problème
  root: {
    question: "Quel type de problème rencontrez-vous ?",
    icon: "fa-question-circle",
    type: "single",
    options: [
      { id: "probleme_palette", text: "Problème avec une palette", icon: "fa-pallet", next: "probleme_palette" },
      { id: "probleme_camion", text: "Problème avec le camion", icon: "fa-truck", next: "probleme_camion" },
      { id: "probleme_systeme", text: "Problème système (EWM/SAP)", icon: "fa-computer", next: "probleme_systeme" },
      { id: "probleme_document", text: "Problème de document", icon: "fa-file-alt", next: "probleme_document" },
      { id: "probleme_qualite", text: "Problème qualité produit", icon: "fa-exclamation-triangle", next: "probleme_qualite" }
    ]
  },

  // =============================================
  // BRANCHE 1: Problème palette
  // =============================================
  probleme_palette: {
    question: "Quel est le problème avec la palette ?",
    icon: "fa-pallet",
    type: "single",
    options: [
      { id: "palette_endommagee", text: "Palette endommagée/film déchiré", icon: "fa-box-open", next: "palette_endommagee" },
      { id: "palette_non_conforme", text: "Palette non conforme (taille, poids)", icon: "fa-ruler", next: "palette_non_conforme" },
      { id: "palette_sans_etiquette", text: "Palette sans étiquette ou illisible", icon: "fa-tag", next: "palette_sans_etiquette" },
      { id: "palette_hazardous", text: "Palette hazardous non signalée", icon: "fa-skull-crossbones", next: "palette_hazardous" }
    ]
  },

  palette_endommagee: {
    question: "Quelle est l'ampleur des dégâts ?",
    icon: "fa-box-open",
    type: "single",
    options: [
      { id: "degats_legers", text: "Légers (film déchiré, carton abîmé)", icon: "fa-check-circle", next: "solution_palette_degats_legers" },
      { id: "degats_importants", text: "Importants (produits visibles, risque casse)", icon: "fa-exclamation-circle", next: "solution_palette_degats_importants" }
    ]
  },

  solution_palette_degats_legers: {
    type: "solution",
    title: "Solution : Dégâts légers sur palette",
    icon: "fa-tools",
    priority: "MOYEN",
    metiers: ["Réceptionnaire", "Cariste", "Chef d'équipe"],
    etapes: [
      { ordre: 1, action: "Prendre des photos de la palette sous tous les angles", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Refaire le film si nécessaire (sécuriser la charge)", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Apposer une étiquette 'CONTRÔLÉ - CONFORME'", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Signaler dans le système (commentaire dans EWM)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 5, action: "Ranger la palette en zone normale", duree: "3 min", responsable: "Cariste" }
    ],
    documents: ["Assigner camion à quai-2.docx"],
    points_vigilance: [
      "Ne pas accepter si les produits sont endommagés",
      "Photos obligatoires pour traçabilité",
      "Signalement dans EWM indispensable"
    ],
    consequences: {
      si_non_fait: "Risque de responsabilité en cas de réclamation client",
      delai_impact: "Aucun si traité immédiatement"
    }
  },

  solution_palette_degats_importants: {
    type: "solution",
    title: "Solution : Dégâts importants sur palette",
    icon: "fa-exclamation-triangle",
    priority: "ÉLEVÉ",
    metiers: ["Réceptionnaire", "Chef d'équipe", "Contrôle Qualité"],
    etapes: [
      { ordre: 1, action: "⚠️ STOP - Ne pas accepter la palette", duree: "0 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Prendre photos détaillées (avant manipulation)", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Isoler la palette en zone quarantaine", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Appeler le chef d'équipe immédiatement", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 5, action: "Faire signer le BL par le chauffeur (mention 'REFUSÉ')", duree: "3 min", responsable: "Chef d'équipe" },
      { ordre: 6, action: "Créer un Return Line dans SAP (ME22N)", duree: "10 min", responsable: "Chef d'équipe" },
      { ordre: 7, action: "Envoyer photos + rapport au fournisseur", duree: "15 min", responsable: "Chef d'équipe" },
      { ordre: 8, action: "Changer le stock en B2 (Blocked Stock)", duree: "5 min", responsable: "Chef d'équipe" }
    ],
    documents: ["RETOUR FOURNISSEUR.docx", "Assigner camion à quai-2.docx"],
    points_vigilance: [
      "Ne JAMAIS stocker une palette endommagée en zone normale",
      "Le chauffeur DOIT signer le BL avec mention du refus",
      "Créer le Return Line sous 48h maximum"
    ],
    consequences: {
      si_non_fait: "Responsabilité financière + risque sécurité",
      delai_impact: "Retour fournisseur impossible après 48h"
    }
  },

  palette_sans_etiquette: {
    type: "solution",
    title: "Solution : Palette sans étiquette ou illisible",
    icon: "fa-tag",
    priority: "MOYEN",
    metiers: ["Réceptionnaire", "Administratif"],
    etapes: [
      { ordre: 1, action: "Vérifier le BL fournisseur (références, quantités)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Vérifier si étiquette existe mais illisible", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Accéder à EWM → Goods Receipt → Print Label", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Entrer le numéro HU ou générer nouveau HU", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 5, action: "Imprimer l'étiquette (imprimante Zebra)", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 6, action: "Apposer l'étiquette sur la palette (angle visible)", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 7, action: "Vérifier que le scanner lit bien l'étiquette", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 8, action: "Compléter la réception dans EWM", duree: "2 min", responsable: "Réceptionnaire" }
    ],
    documents: ["Réediter une étiquette.docx"],
    points_vigilance: [
      "Toujours vérifier la concordance BL ↔ Étiquette",
      "Ne jamais stocker sans étiquette lisible",
      "Étiquette doit être sur l'angle avant-droit de la palette"
    ],
    consequences: {
      si_non_fait: "Palette perdue dans le stock, inventaire impossible",
      delai_impact: "Blocage immédiat du processus de stockage"
    }
  },

  palette_hazardous: {
    type: "solution",
    title: "Solution : Palette hazardous non signalée",
    icon: "fa-skull-crossbones",
    priority: "CRITIQUE",
    metiers: ["Réceptionnaire", "Chef d'équipe", "Responsable Sécurité"],
    etapes: [
      { ordre: 1, action: "⚠️ STOP IMMÉDIAT - Ne pas manipuler", duree: "0 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Isoler la zone (périmètre de sécurité)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Appeler le chef d'équipe ET responsable sécurité", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Récupérer la fiche de données de sécurité (FDS)", duree: "5 min", responsable: "Chef d'équipe" },
      { ordre: 5, action: "Vérifier la classification du produit (UN, classe)", duree: "5 min", responsable: "Responsable Sécurité" },
      { ordre: 6, action: "Apposer signalétique hazardous réglementaire", duree: "3 min", responsable: "Responsable Sécurité" },
      { ordre: 7, action: "Ranger en zone hazardous (T220 ou T120 selon classe)", duree: "10 min", responsable: "Cariste habilité" },
      { ordre: 8, action: "Mettre à jour EWM (flag Hazardous Material)", duree: "5 min", responsable: "Chef d'équipe" },
      { ordre: 9, action: "Avertir le fournisseur du manquement", duree: "15 min", responsable: "Chef d'équipe" }
    ],
    documents: ["0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf"],
    points_vigilance: [
      "NE JAMAIS stocker du hazardous en zone normale",
      "Manipulation UNIQUEMENT par personnel habilité",
      "Signalétique obligatoire (pictogrammes réglementaires)",
      "Respect strict des zones T220/T120 selon classification"
    ],
    consequences: {
      si_non_fait: "Danger sécurité + amende réglementaire + responsabilité pénale",
      delai_impact: "Traitement immédiat obligatoire"
    }
  },

  // =============================================
  // BRANCHE 2: Problème camion
  // =============================================
  probleme_camion: {
    question: "Quel est le problème avec le camion ?",
    icon: "fa-truck",
    type: "single",
    options: [
      { id: "camion_retard", text: "Camion en retard (> 2h)", icon: "fa-clock", next: "solution_camion_retard" },
      { id: "camion_absent", text: "Camion absent (no-show)", icon: "fa-times-circle", next: "solution_camion_absent" },
      { id: "camion_mauvais_quai", text: "Camion au mauvais quai", icon: "fa-exchange-alt", next: "solution_camion_mauvais_quai" }
    ]
  },

  solution_camion_retard: {
    type: "solution",
    title: "Solution : Camion en retard (> 2 heures)",
    icon: "fa-clock",
    priority: "MOYEN",
    metiers: ["Réceptionnaire", "Chef d'équipe", "Administratif"],
    etapes: [
      { ordre: 1, action: "Vérifier le portail GXO (statut du camion)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Consulter l'heure de RDV initialement prévue", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Contacter le transporteur (numéro sur BL)", duree: "5 min", responsable: "Administratif" },
      { ordre: 4, action: "Si retard > 2h : Re-book via portal Action", duree: "10 min", responsable: "Administratif" },
      { ordre: 5, action: "Envoyer mail type au fournisseur (template)", duree: "5 min", responsable: "Administratif" },
      { ordre: 6, action: "Mettre à jour le planning de réception", duree: "3 min", responsable: "Chef d'équipe" },
      { ordre: 7, action: "Libérer le quai pour autre livraison si besoin", duree: "2 min", responsable: "Chef d'équipe" }
    ],
    documents: ["Mail fournisseur.docx", "Assigner camion à quai-2.docx"],
    points_vigilance: [
      "Re-booking obligatoire si retard > 2 heures",
      "Toujours garder trace de l'échange avec transporteur",
      "Libérer le quai pour optimiser les opérations"
    ],
    consequences: {
      si_non_fait: "Désorganisation du planning, perte de productivité",
      delai_impact: "Impact immédiat sur les autres réceptions"
    }
  },

  solution_camion_absent: {
    type: "solution",
    title: "Solution : Camion absent (no-show)",
    icon: "fa-times-circle",
    priority: "ÉLEVÉ",
    metiers: ["Administratif", "Chef d'équipe"],
    etapes: [
      { ordre: 1, action: "Attendre 30 min après heure de RDV", duree: "30 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Vérifier portail GXO (aucune notification)", duree: "2 min", responsable: "Administratif" },
      { ordre: 3, action: "Contacter le transporteur (appel + mail)", duree: "10 min", responsable: "Administratif" },
      { ordre: 4, action: "Envoyer mail fournisseur (modèle no-show)", duree: "5 min", responsable: "Administratif" },
      { ordre: 5, action: "Demander nouveau RDV via portal Action", duree: "10 min", responsable: "Administratif" },
      { ordre: 6, action: "Libérer le quai et mettre à jour planning", duree: "3 min", responsable: "Chef d'équipe" },
      { ordre: 7, action: "Enregistrer l'incident (fichier Excel tracking)", duree: "5 min", responsable: "Administratif" }
    ],
    documents: ["Mail fournisseur.docx"],
    points_vigilance: [
      "Attendre 30 min avant de qualifier de no-show",
      "Toujours documenter (mail + appel)",
      "Pénalités possibles selon contrat fournisseur"
    ],
    consequences: {
      si_non_fait: "Perte de créneau, impact planning journée",
      delai_impact: "Réception reportée au lendemain minimum"
    }
  },

  solution_camion_mauvais_quai: {
    type: "solution",
    title: "Solution : Camion au mauvais quai",
    icon: "fa-exchange-alt",
    priority: "FAIBLE",
    metiers: ["Réceptionnaire", "Agent de sécurité"],
    etapes: [
      { ordre: 1, action: "Vérifier le numéro de quai assigné dans EWM", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Contacter le chauffeur (expliquer l'erreur)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Vérifier disponibilité du bon quai", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Demander au chauffeur de se déplacer", duree: "5 min", responsable: "Agent de sécurité" },
      { ordre: 5, action: "Guider le camion vers le bon quai", duree: "3 min", responsable: "Agent de sécurité" },
      { ordre: 6, action: "Sécuriser la zone et commencer déchargement", duree: "2 min", responsable: "Réceptionnaire" }
    ],
    documents: ["Assigner camion à quai-2.docx"],
    points_vigilance: [
      "Ne jamais décharger au mauvais quai (erreur système)",
      "Toujours vérifier l'assignation EWM avant déchargement",
      "Sécurité : accompagner le chauffeur lors du déplacement"
    ],
    consequences: {
      si_non_fait: "Erreur de traçabilité dans EWM, confusion des livraisons",
      delai_impact: "Retard de 10-15 minutes"
    }
  },

  // =============================================
  // BRANCHE 3: Problème système
  // =============================================
  probleme_systeme: {
    question: "Quel est le problème système ?",
    icon: "fa-computer",
    type: "single",
    options: [
      { id: "tu_bloque", text: "TU bloqué en statut Active", icon: "fa-pause-circle", next: "solution_tu_bloque" },
      { id: "ecart_quantite", text: "Écart quantité BL vs Réception", icon: "fa-balance-scale", next: "solution_ecart_quantite" },
      { id: "produit_non_reference", text: "Produit non référencé", icon: "fa-question", next: "solution_produit_non_reference" }
    ]
  },

  solution_tu_bloque: {
    type: "solution",
    title: "Solution : TU bloqué en statut Active",
    icon: "fa-pause-circle",
    priority: "MOYEN",
    metiers: ["Administratif", "Chef d'équipe"],
    etapes: [
      { ordre: 1, action: "Accéder à EWM → MON → Transport Unit Overview", duree: "2 min", responsable: "Administratif" },
      { ordre: 2, action: "Filtrer par TU concerné (numéro ou date)", duree: "1 min", responsable: "Administratif" },
      { ordre: 3, action: "Vérifier les HU associés au TU", duree: "2 min", responsable: "Administratif" },
      { ordre: 4, action: "Vérifier le statut exact (Active vs Completed)", duree: "1 min", responsable: "Administratif" },
      { ordre: 5, action: "Option 1 : Unload + Finish unloading", duree: "3 min", responsable: "Administratif" },
      { ordre: 6, action: "Option 2 (si erreur) : Arrival + Departure", duree: "3 min", responsable: "Administratif" },
      { ordre: 7, action: "Valider et vérifier passage à 'Completed'", duree: "2 min", responsable: "Administratif" },
      { ordre: 8, action: "Si blocage persiste : contacter IT Support", duree: "5 min", responsable: "Chef d'équipe" }
    ],
    documents: ["Cloture TU actif.docx"],
    points_vigilance: [
      "Toujours vérifier les HU avant de clôturer",
      "Ne jamais forcer la clôture sans comprendre l'origine",
      "Filtrer par date J-1 (exclure date du jour)"
    ],
    consequences: {
      si_non_fait: "TU reste bloqué, stock non disponible",
      delai_impact: "Impact immédiat sur disponibilité stock"
    }
  },

  solution_ecart_quantite: {
    type: "solution",
    title: "Solution : Écart quantité BL vs Réception physique",
    icon: "fa-balance-scale",
    priority: "ÉLEVÉ",
    metiers: ["Réceptionnaire", "Chef d'équipe", "Contrôle Qualité"],
    etapes: [
      { ordre: 1, action: "STOP - Ne pas clôturer la réception", duree: "0 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Vérifier le BL fournisseur (quantité annoncée)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Recompter physiquement les articles", duree: "10 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Prendre photos de la palette + BL", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 5, action: "Remplir fichier GDS (Goods Discrepancy Sheet)", duree: "5 min", responsable: "Contrôle Qualité" },
      { ordre: 6, action: "Signaler à Invoice Moissy sous 48h maximum", duree: "10 min", responsable: "Chef d'équipe" },
      { ordre: 7, action: "Enregistrer quantité réelle dans EWM (pas BL)", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 8, action: "Apposer étiquette 'ÉCART QUANTITÉ' sur palette", duree: "1 min", responsable: "Réceptionnaire" }
    ],
    documents: ["Verification dossier aprés control.docx"],
    points_vigilance: [
      "JAMAIS clôturer avec quantité BL si écart physique",
      "Signalement Invoice Moissy OBLIGATOIRE sous 48h",
      "Toujours recompter avant de confirmer l'écart"
    ],
    consequences: {
      si_non_fait: "Écart financier, litige fournisseur, inventaire faux",
      delai_impact: "Signalement après 48h = écart non traitable"
    }
  },

  solution_produit_non_reference: {
    type: "solution",
    title: "Solution : Produit non référencé dans le système",
    icon: "fa-question",
    priority: "ÉLEVÉ",
    metiers: ["Administratif", "Order Planning"],
    etapes: [
      { ordre: 1, action: "Vérifier le code produit sur le BL", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Rechercher dans SAP via MAT1 (Material Master)", duree: "3 min", responsable: "Administratif" },
      { ordre: 3, action: "Si introuvable : contacter Order Planning", duree: "5 min", responsable: "Administratif" },
      { ordre: 4, action: "Order Planning vérifie avec le fournisseur", duree: "30 min", responsable: "Order Planning" },
      { ordre: 5, action: "Créer conditionnement via ZMM42 (si validé)", duree: "15 min", responsable: "Order Planning" },
      { ordre: 6, action: "Attendre activation du code (délai 1-2h)", duree: "120 min", responsable: "IT" },
      { ordre: 7, action: "Mettre palette en zone quarantaine en attendant", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 8, action: "Réceptionner une fois code activé", duree: "5 min", responsable: "Réceptionnaire" }
    ],
    documents: ["EWM Procedure document - 01. Goods Receipt - FR.pdf"],
    points_vigilance: [
      "Ne JAMAIS créer de code produit sans validation Order Planning",
      "Palette en quarantaine obligatoire (zone Q)",
      "Délai activation 1-2h minimum après création"
    ],
    consequences: {
      si_non_fait: "Impossible de réceptionner, palette bloquée",
      delai_impact: "Retard réception 2-3 heures minimum"
    }
  },

  // =============================================
  // BRANCHE 4: Problème document
  // =============================================
  probleme_document: {
    question: "Quel est le problème avec le document ?",
    icon: "fa-file-alt",
    type: "single",
    options: [
      { id: "bl_manquant", text: "BL manquant ou illisible", icon: "fa-file-excel", next: "solution_bl_manquant" },
      { id: "bl_non_signe", text: "BL non signé par chauffeur", icon: "fa-signature", next: "solution_bl_non_signe" }
    ]
  },

  solution_bl_manquant: {
    type: "solution",
    title: "Solution : BL manquant ou illisible",
    icon: "fa-file-excel",
    priority: "ÉLEVÉ",
    metiers: ["Réceptionnaire", "Administratif"],
    etapes: [
      { ordre: 1, action: "Demander au chauffeur s'il a un double du BL", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Si oui : scanner et garder copie", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Si non : vérifier portail GXO (ASN électronique)", duree: "5 min", responsable: "Administratif" },
      { ordre: 4, action: "Contacter le fournisseur (demande BL par mail)", duree: "10 min", responsable: "Administratif" },
      { ordre: 5, action: "Faire décharge manuscrite signée par chauffeur", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 6, action: "Noter : 'BL manquant - décharge temporaire'", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 7, action: "Réceptionner avec numéro ASN (si disponible)", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 8, action: "Attendre BL officiel fournisseur avant clôture finale", duree: "Variable", responsable: "Administratif" }
    ],
    documents: ["Assigner camion à quai-2.docx"],
    points_vigilance: [
      "Toujours faire signer une décharge par le chauffeur",
      "Ne jamais clôturer définitivement sans BL officiel",
      "Garder trace de tous les échanges (mails, appels)"
    ],
    consequences: {
      si_non_fait: "Impossible de facturer, litige fournisseur",
      delai_impact: "Blocage comptable jusqu'à réception BL"
    }
  },

  solution_bl_non_signe: {
    type: "solution",
    title: "Solution : BL non signé par le chauffeur",
    icon: "fa-signature",
    priority: "MOYEN",
    metiers: ["Réceptionnaire"],
    etapes: [
      { ordre: 1, action: "Demander au chauffeur de signer le BL", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Expliquer l'obligation réglementaire (preuve livraison)", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Si refus : noter sur BL 'Refus de signature chauffeur'", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Prendre photo du chauffeur + camion (plaque)", duree: "1 min", responsable: "Réceptionnaire" },
      { ordre: 5, action: "Faire contre-signature par chef d'équipe", duree: "2 min", responsable: "Chef d'équipe" },
      { ordre: 6, action: "Signaler au fournisseur (mail avec photos)", duree: "5 min", responsable: "Administratif" }
    ],
    documents: ["Assigner camion à quai-2.docx"],
    points_vigilance: [
      "Signature chauffeur = preuve de livraison",
      "En cas de refus : double signature interne obligatoire",
      "Photos = preuve alternative"
    ],
    consequences: {
      si_non_fait: "Aucune preuve de livraison en cas de litige",
      delai_impact: "Risque de non-paiement par fournisseur"
    }
  },

  // =============================================
  // BRANCHE 5: Problème qualité
  // =============================================
  probleme_qualite: {
    question: "Quel problème qualité constatez-vous ?",
    icon: "fa-exclamation-triangle",
    type: "single",
    options: [
      { id: "produit_perime", text: "Produit périmé (BBD dépassé)", icon: "fa-calendar-times", next: "solution_produit_perime" },
      { id: "produit_casse", text: "Produit cassé/endommagé", icon: "fa-glass-broken", next: "solution_produit_casse" }
    ]
  },

  solution_produit_perime: {
    type: "solution",
    title: "Solution : Produit avec BBD (Best Before Date) expiré",
    icon: "fa-calendar-times",
    priority: "CRITIQUE",
    metiers: ["Réceptionnaire", "Chef d'équipe", "Contrôle Qualité"],
    etapes: [
      { ordre: 1, action: "⚠️ NE PAS ACCEPTER le produit", duree: "0 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Prendre photo de l'étiquette avec BBD visible", duree: "2 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Faire signer le BL par chauffeur (mention 'REFUSÉ - BBD')", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Isoler palette en zone quarantaine (rouge)", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 5, action: "Créer Return Line dans SAP (transaction ME22N)", duree: "10 min", responsable: "Chef d'équipe" },
      { ordre: 6, action: "Changer le stock en B2 (Blocked Stock)", duree: "5 min", responsable: "Chef d'équipe" },
      { ordre: 7, action: "Envoyer rapport + photos au fournisseur", duree: "15 min", responsable: "Chef d'équipe" },
      { ordre: 8, action: "Organiser retour fournisseur sous 72h", duree: "Variable", responsable: "Administratif" }
    ],
    documents: ["0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf", "RETOUR FOURNISSEUR.docx"],
    points_vigilance: [
      "NE JAMAIS accepter un produit périmé",
      "Signature chauffeur OBLIGATOIRE avec mention refus",
      "Return Line à créer sous 48h maximum"
    ],
    consequences: {
      si_non_fait: "Responsabilité pénale + rappel produit + amende sanitaire",
      delai_impact: "Traitement immédiat obligatoire"
    }
  },

  solution_produit_casse: {
    type: "solution",
    title: "Solution : Produit cassé ou endommagé",
    icon: "fa-glass-broken",
    priority: "ÉLEVÉ",
    metiers: ["Réceptionnaire", "Chef d'équipe", "Contrôle Qualité"],
    etapes: [
      { ordre: 1, action: "Évaluer l'ampleur des dégâts (nombre de produits)", duree: "3 min", responsable: "Réceptionnaire" },
      { ordre: 2, action: "Prendre photos détaillées (avant manipulation)", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 3, action: "Si < 10% dégâts : Accepter avec réserves", duree: "Variable", responsable: "Réceptionnaire" },
      { ordre: 4, action: "Si > 10% dégâts : Refuser la palette entière", duree: "Variable", responsable: "Chef d'équipe" },
      { ordre: 5, action: "Faire signer BL avec réserves détaillées", duree: "5 min", responsable: "Réceptionnaire" },
      { ordre: 6, action: "Isoler produits endommagés en zone écart", duree: "10 min", responsable: "Réceptionnaire" },
      { ordre: 7, action: "Remplir GDS (Goods Discrepancy Sheet)", duree: "10 min", responsable: "Contrôle Qualité" },
      { ordre: 8, action: "Créer Return Line pour produits refusés", duree: "10 min", responsable: "Chef d'équipe" },
      { ordre: 9, action: "Envoyer rapport au fournisseur sous 24h", duree: "15 min", responsable: "Chef d'équipe" }
    ],
    documents: ["0.6 Decision tree broken expired goods Regular,ZIDC,ZEXT,HUB, A-Br V3.pdf", "RETOUR FOURNISSEUR.docx"],
    points_vigilance: [
      "Seuil 10% = limite acceptation/refus",
      "Photos AVANT toute manipulation",
      "BL signé avec réserves détaillées obligatoire"
    ],
    consequences: {
      si_non_fait: "Responsabilité financière, impossibilité de retour fournisseur",
      delai_impact: "Signalement sous 24h pour réclamation valide"
    }
  }
};

// Fonction pour obtenir un nœud de l'arbre
function getDecisionNode(nodeId) {
  return decisionTree[nodeId] || null;
}

// Fonction pour afficher l'arbre de décision
function showDecisionTree(startNode = 'root') {
  const node = getDecisionNode(startNode);
  if (!node) {
    console.error('Node not found:', startNode);
    return;
  }

  const modal = document.getElementById('decision-tree-modal');
  if (!modal) {
    createDecisionTreeModal();
  }

  renderDecisionNode(startNode);
  document.getElementById('decision-tree-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Fonction pour créer la modal de l'arbre de décision
function createDecisionTreeModal() {
  const modal = document.createElement('div');
  modal.id = 'decision-tree-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in">
      <!-- Header -->
      <div class="bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white p-6 flex items-center justify-between">
        <div class="flex items-center">
          <i class="fas fa-sitemap text-3xl mr-4"></i>
          <div>
            <h3 class="text-2xl font-bold">Assistant Intelligent Réception</h3>
            <p class="text-sm opacity-75 mt-1">Guidage pas à pas selon votre situation</p>
          </div>
        </div>
        <button onclick="closeDecisionTree()" class="text-white hover:text-gray-200 transition-colors">
          <i class="fas fa-times text-2xl"></i>
        </button>
      </div>
      
      <!-- Body (contenu dynamique) -->
      <div id="decision-tree-content" class="p-6 overflow-y-auto max-h-[70vh]">
        <!-- Le contenu sera injecté dynamiquement -->
      </div>
      
      <!-- Footer avec navigation -->
      <div id="decision-tree-footer" class="bg-gray-100 p-4 flex items-center justify-between border-t">
        <button onclick="goBackDecisionTree()" id="back-btn" class="hidden px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-colors">
          <i class="fas fa-arrow-left mr-2"></i>
          Retour
        </button>
        <button onclick="closeDecisionTree()" class="ml-auto px-6 py-2 bg-gradient-to-r from-[#00205B] to-[#003DA5] text-white rounded-lg font-bold hover:shadow-lg transition-all">
          <i class="fas fa-times mr-2"></i>
          Fermer
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Historique de navigation
let navigationHistory = [];

// Fonction pour rendre un nœud de décision
function renderDecisionNode(nodeId) {
  const node = getDecisionNode(nodeId);
  const content = document.getElementById('decision-tree-content');
  
  if (node.type === 'solution') {
    // Afficher la solution complète
    content.innerHTML = `
      <div class="space-y-6">
        <!-- Titre de la solution -->
        <div class="flex items-start">
          <div class="bg-blue-100 rounded-full p-4 mr-4">
            <i class="fas ${node.icon} text-blue-600 text-3xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="text-2xl font-bold text-gray-800 mb-2">${node.title}</h4>
            <div class="flex items-center gap-4">
              <span class="px-3 py-1 bg-${node.priority === 'CRITIQUE' ? 'red' : node.priority === 'ÉLEVÉ' ? 'orange' : node.priority === 'MOYEN' ? 'yellow' : 'green'}-100 text-${node.priority === 'CRITIQUE' ? 'red' : node.priority === 'ÉLEVÉ' ? 'orange' : node.priority === 'MOYEN' ? 'yellow' : 'green'}-800 rounded-full text-sm font-bold">
                Priorité : ${node.priority}
              </span>
              <span class="text-gray-600">
                <i class="fas fa-users mr-2"></i>
                ${node.metiers.join(', ')}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Étapes de la solution -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h5 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-list-ol text-blue-600 mr-3"></i>
            Étapes à suivre
          </h5>
          <div class="space-y-4">
            ${node.etapes.map(etape => `
              <div class="flex items-start bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  ${etape.ordre}
                </div>
                <div class="flex-1">
                  <p class="text-gray-800 font-semibold">${etape.action}</p>
                  <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span><i class="fas fa-clock mr-1"></i>${etape.duree}</span>
                    <span><i class="fas fa-user mr-1"></i>${etape.responsable}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Documents associés -->
        ${node.documents.length > 0 ? `
          <div class="bg-blue-50 rounded-xl p-6">
            <h5 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <i class="fas fa-file-alt text-blue-600 mr-3"></i>
              Documents de référence
            </h5>
            <div class="space-y-2">
              ${node.documents.map(doc => `
                <a href="/static/documents/${doc}" target="_blank" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <i class="fas fa-download mr-2"></i>
                  ${doc}
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Points de vigilance -->
        <div class="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
          <h5 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <i class="fas fa-exclamation-triangle text-orange-600 mr-3"></i>
            Points de vigilance
          </h5>
          <ul class="space-y-2">
            ${node.points_vigilance.map(point => `
              <li class="flex items-start">
                <i class="fas fa-check-circle text-orange-600 mr-2 mt-1"></i>
                <span class="text-gray-700">${point}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <!-- Conséquences -->
        <div class="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
          <h5 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <i class="fas fa-exclamation-circle text-red-600 mr-3"></i>
            Conséquences si non traité
          </h5>
          <div class="space-y-2">
            <p class="text-gray-700"><strong>Impact :</strong> ${node.consequences.si_non_fait}</p>
            <p class="text-gray-700"><strong>Délai :</strong> ${node.consequences.delai_impact}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    // Afficher la question avec les options
    content.innerHTML = `
      <div class="space-y-6">
        <!-- Question -->
        <div class="text-center mb-8">
          <div class="inline-block bg-blue-100 rounded-full p-6 mb-4">
            <i class="fas ${node.icon} text-blue-600 text-5xl"></i>
          </div>
          <h4 class="text-2xl font-bold text-gray-800">${node.question}</h4>
        </div>
        
        <!-- Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${node.options.map(option => `
            <button onclick="selectDecisionOption('${option.next}')" class="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all text-left group">
              <div class="flex items-start">
                <div class="bg-blue-100 rounded-full p-3 mr-4 group-hover:bg-blue-200 transition-colors">
                  <i class="fas ${option.icon} text-blue-600 text-2xl"></i>
                </div>
                <div class="flex-1">
                  <h5 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">${option.text}</h5>
                  <p class="text-sm text-gray-600 mt-1">Cliquez pour continuer</p>
                </div>
                <i class="fas fa-chevron-right text-gray-400 group-hover:text-blue-600 transition-colors"></i>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Afficher/cacher le bouton retour
  const backBtn = document.getElementById('back-btn');
  if (navigationHistory.length > 0) {
    backBtn.classList.remove('hidden');
  } else {
    backBtn.classList.add('hidden');
  }
}

// Fonction pour sélectionner une option
function selectDecisionOption(nextNode) {
  navigationHistory.push(nextNode);
  renderDecisionNode(nextNode);
}

// Fonction pour revenir en arrière
function goBackDecisionTree() {
  if (navigationHistory.length > 0) {
    navigationHistory.pop();
    const previousNode = navigationHistory.length > 0 
      ? navigationHistory[navigationHistory.length - 1] 
      : 'root';
    renderDecisionNode(previousNode);
  }
}

// Fonction pour fermer l'arbre de décision
function closeDecisionTree() {
  const modal = document.getElementById('decision-tree-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  document.body.style.overflow = '';
  navigationHistory = [];
}

// Exporter les fonctions globalement
window.showDecisionTree = showDecisionTree;
window.selectDecisionOption = selectDecisionOption;
window.goBackDecisionTree = goBackDecisionTree;
window.closeDecisionTree = closeDecisionTree;
