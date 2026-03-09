// Traductions pour les non-conformités et problèmes
// GXO Moissy - Alertes Écart & Non-conformité

// ===== NON-CONFORMITÉS (Points de vérification 1-11) =====
export const NON_CONFORMITES = {
  point_1: "Extérieur / Essieux (plombage camion)",
  point_2: "Côtés gauche et droit (déchirures, usures)",
  point_3: "Paroi avant (double fond)",
  point_4: "Sol (trous, déchirures)",
  point_5: "Plafond / Toit (déchirures, usures)",
  point_6: "Portes intérieures / extérieures (herméticité)",
  point_7: "Cales roues bien positionnées",
  point_8: "Nuisibles",
  point_9: "Corps étranger",
  point_10: "Propreté",
  point_11: "Odeur"
}

// ===== PROBLÈMES RENCONTRÉS (Problématiques cochables) =====
export const PROBLEMES_RENCONTRES = {
  palettes_largeur: "Palettes chargées en largeur",
  palettes_instables: "Palettes instables / chargées de manière incorrecte",
  palettes_mal_dechargees: "Palettes mal déchargées",
  marchandises_dangereuses: "Marchandises dangereuses non chargées à l'arrière",
  palettes_mal_filmees: "Palettes mal filmées",
  mauvais_formulaire_tu: "Mauvais formulaire TU entrant",
  autres: "Autres"
}

// ===== JOURS DE LA SEMAINE =====
export const JOURS_SEMAINE = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche"
}

// ===== FONCTION DE TRADUCTION =====
export function traduireNonConformite(point) {
  return NON_CONFORMITES[point] || point
}

export function traduireProbleme(probleme) {
  return PROBLEMES_RENCONTRES[probleme] || probleme
}

export function traduireJour(jour) {
  return JOURS_SEMAINE[jour] || jour
}
