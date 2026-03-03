// Service de traduction pour le chat
// Utilise Google Cloud Translation API v2 (REST API simple)

// API Key sera configurée via wrangler secret
// Pour dev local, mettre GOOGLE_TRANSLATE_API_KEY dans .dev.vars

export async function traduireTexte(
  texte: string, 
  langueCible: string, 
  langueSource: string = 'auto',
  apiKey?: string
): Promise<string> {
  try {
    // Si pas de clé API, retourner le texte original (mode dégradé)
    if (!apiKey) {
      console.warn('⚠️ [TRADUCTION] Pas de clé API Google - mode dégradé');
      return texte;
    }

    // Normaliser les codes de langue
    const source = langueSource === 'autodetect' ? 'auto' : langueSource;
    
    console.log(`🔄 [TRADUCTION] Tentative Google: "${texte.substring(0, 50)}..." (${source} → ${langueCible})`);
    
    // Google Cloud Translation API v2 (REST)
    // https://cloud.google.com/translate/docs/reference/rest/v2/translate
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const body: any = {
      q: texte,
      target: langueCible,
      format: 'text'
    };
    
    // Si langue source spécifiée (pas auto), l'inclure
    if (source !== 'auto') {
      body.source = source;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [TRADUCTION] Erreur HTTP:', response.status, errorText);
      return texte;
    }
    
    const data = await response.json();
    console.log(`📦 [TRADUCTION] Réponse Google:`, JSON.stringify(data).substring(0, 200));
    
    // Google retourne : { data: { translations: [{ translatedText: "...", detectedSourceLanguage: "..." }] } }
    if (data && data.data && data.data.translations && data.data.translations[0]) {
      const traduction = data.data.translations[0].translatedText;
      const langueDetectee = data.data.translations[0].detectedSourceLanguage;
      
      console.log(`✅ [TRADUCTION] Succès Google (${langueDetectee || source} → ${langueCible}): "${traduction.substring(0, 50)}..."`);
      return traduction;
    }
    
    console.warn('⚠️ [TRADUCTION] Format réponse Google inattendu:', data);
    return texte;
  } catch (error) {
    console.error('❌ [TRADUCTION] Erreur exception Google:', error);
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
