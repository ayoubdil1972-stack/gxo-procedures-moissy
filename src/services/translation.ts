// Service de traduction pour le chat
// Utilise MyMemory Translation API (gratuite, plus fiable pour Cloudflare Workers)

export async function traduireTexte(texte: string, langueCible: string, langueSource: string = 'auto'): Promise<string> {
  try {
    console.log(`🔄 Tentative traduction: "${texte}" (${langueSource} → ${langueCible})`);
    
    // MyMemory Translation API - Gratuite et compatible Cloudflare Workers
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=${langueSource}|${langueCible}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('❌ Erreur HTTP traduction:', response.status);
      return texte;
    }
    
    const data = await response.json();
    
    // MyMemory retourne : { responseData: { translatedText: "..." }, responseStatus: 200 }
    if (data && data.responseData && data.responseData.translatedText) {
      const traduction = data.responseData.translatedText;
      console.log(`✅ Traduction réussie: "${traduction}"`);
      return traduction;
    }
    
    console.warn('⚠️ Format réponse inattendu:', data);
    return texte;
  } catch (error) {
    console.error('❌ Erreur traduction:', error);
    return texte;
  }
}

// Détecter la langue d'un texte
export async function detecterLangue(texte: string): Promise<string> {
  try {
    // Pour détecter la langue, on traduit vers anglais et MyMemory détecte auto
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=auto|en`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Essayer d'extraire la langue détectée
    if (data && data.responseData) {
      // MyMemory ne retourne pas la langue source explicitement
      // On peut l'estimer en comparant le texte original et traduit
      return 'auto';
    }
    
    return 'fr'; // Par défaut, français
  } catch (error) {
    console.error('Erreur détection langue:', error);
    return 'fr';
  }
}
