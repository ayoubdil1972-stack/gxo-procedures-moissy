// Service de traduction multi-provider pour le chat
// Utilise MyMemory par défaut, Google Translate en backup

export async function traduireTexte(texte: string, langueCible: string, langueSource: string = 'autodetect'): Promise<string> {
  try {
    // Utiliser 'autodetect' au lieu de 'auto' pour MyMemory
    const source = langueSource === 'auto' ? 'autodetect' : langueSource;
    
    console.log(`🔄 [TRADUCTION] Tentative: "${texte.substring(0, 50)}..." (${source} → ${langueCible})`);
    
    // Essayer MyMemory d'abord
    const resultMyMemory = await traduireAvecMyMemory(texte, source, langueCible);
    if (resultMyMemory !== texte) {
      return resultMyMemory; // Succès avec MyMemory
    }
    
    // Fallback: Google Translate gratuit
    console.log(`⚠️ [TRADUCTION] MyMemory échec, essai Google Translate...`);
    const resultGoogle = await traduireAvecGoogleGratuit(texte, source, langueCible);
    if (resultGoogle !== texte) {
      return resultGoogle; // Succès avec Google
    }
    
    // Dernière tentative: LibreTranslate (open source)
    console.log(`⚠️ [TRADUCTION] Google échec, essai LibreTranslate...`);
    const resultLibre = await traduireAvecLibreTranslate(texte, source, langueCible);
    return resultLibre;
    
  } catch (error) {
    console.error('❌ [TRADUCTION] Erreur exception:', error);
    return texte;
  }
}

// Provider 1: MyMemory Translation API
async function traduireAvecMyMemory(texte: string, source: string, cible: string): Promise<string> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=${source}|${cible}`;
    console.log(`🌐 [TRADUCTION MyMemory] URL: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('❌ [TRADUCTION MyMemory] Erreur HTTP:', response.status);
      return texte;
    }
    
    const data = await response.json();
    console.log(`📦 [TRADUCTION MyMemory] Réponse:`, JSON.stringify(data).substring(0, 200));
    
    if (data && data.responseData && data.responseData.translatedText) {
      const traduction = data.responseData.translatedText;
      
      // Vérifier que ce n'est pas juste le texte original (échec silencieux)
      if (traduction.toLowerCase() !== texte.toLowerCase()) {
        console.log(`✅ [TRADUCTION MyMemory] Succès: "${traduction.substring(0, 50)}..."`);
        return traduction;
      }
    }
    
    return texte;
  } catch (error) {
    console.error('❌ [TRADUCTION MyMemory] Exception:', error);
    return texte;
  }
}

// Provider 2: Google Translate gratuit (via translate.googleapis.com)
async function traduireAvecGoogleGratuit(texte: string, source: string, cible: string): Promise<string> {
  try {
    // Google accepte 'auto' pour détection automatique
    const srcLang = source === 'autodetect' ? 'auto' : source;
    
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${srcLang}&tl=${cible}&dt=t&q=${encodeURIComponent(texte)}`;
    console.log(`🌐 [TRADUCTION Google] URL: ${url.substring(0, 100)}...`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*'
      }
    });
    
    if (!response.ok) {
      console.error('❌ [TRADUCTION Google] Erreur HTTP:', response.status);
      return texte;
    }
    
    const data = await response.json();
    
    // Format Google: [[[traduction, original, null, null, 10]]]
    if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      let traduction = '';
      for (const segment of data[0]) {
        if (segment && segment[0]) {
          traduction += segment[0];
        }
      }
      
      if (traduction && traduction.toLowerCase() !== texte.toLowerCase()) {
        console.log(`✅ [TRADUCTION Google] Succès: "${traduction.substring(0, 50)}..."`);
        return traduction;
      }
    }
    
    return texte;
  } catch (error) {
    console.error('❌ [TRADUCTION Google] Exception:', error);
    return texte;
  }
}

// Provider 3: LibreTranslate (open source, instance publique)
async function traduireAvecLibreTranslate(texte: string, source: string, cible: string): Promise<string> {
  try {
    const srcLang = source === 'autodetect' ? 'auto' : source;
    
    const url = 'https://libretranslate.com/translate';
    console.log(`🌐 [TRADUCTION LibreTranslate] Tentative ${srcLang} → ${cible}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        q: texte,
        source: srcLang,
        target: cible,
        format: 'text'
      })
    });
    
    if (!response.ok) {
      console.error('❌ [TRADUCTION LibreTranslate] Erreur HTTP:', response.status);
      return texte;
    }
    
    const data = await response.json();
    
    if (data && data.translatedText) {
      const traduction = data.translatedText;
      
      if (traduction.toLowerCase() !== texte.toLowerCase()) {
        console.log(`✅ [TRADUCTION LibreTranslate] Succès: "${traduction.substring(0, 50)}..."`);
        return traduction;
      }
    }
    
    return texte;
  } catch (error) {
    console.error('❌ [TRADUCTION LibreTranslate] Exception:', error);
    return texte;
  }
}

// Détecter la langue d'un texte (garde la fonction pour compatibilité)
export async function detecterLangue(texte: string): Promise<string> {
  try {
    // Essayer avec MyMemory
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=auto|en`;
    const response = await fetch(url);
    const data = await response.json();
    
    return 'auto';
  } catch (error) {
    console.error('Erreur détection langue:', error);
    return 'fr';
  }
}
