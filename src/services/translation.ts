// Service de traduction pour le chat
// Utilise l'API Google Translate gratuite (via translate.googleapis.com)

export async function traduireTexte(texte: string, langueCible: string, langueSource: string = 'auto'): Promise<string> {
  try {
    // API Google Translate gratuite (pas besoin de clé API pour usage basique)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${langueSource}&tl=${langueCible}&dt=t&q=${encodeURIComponent(texte)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // L'API retourne un tableau complexe, extraire le texte traduit
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0];
    }
    
    // Si la traduction échoue, retourner le texte original
    return texte;
  } catch (error) {
    console.error('Erreur traduction:', error);
    // En cas d'erreur, retourner le texte original
    return texte;
  }
}

// Détecter la langue d'un texte
export async function detecterLangue(texte: string): Promise<string> {
  try {
    // API simple de détection de langue
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(texte)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // La langue détectée est dans data[2]
    if (data && data[2]) {
      return data[2];
    }
    
    return 'fr'; // Par défaut, français
  } catch (error) {
    console.error('Erreur détection langue:', error);
    return 'fr';
  }
}
