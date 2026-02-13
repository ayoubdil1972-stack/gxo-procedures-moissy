// Configuration Cloudflare R2 pour les vidéos
// ⚠️ IMPORTANT: Remplacer R2_PUBLIC_URL par votre vraie URL après avoir activé l'accès public

export const R2_CONFIG = {
  // URL publique de votre bucket R2
  // Format: https://pub-XXXXXXXXXXXXX.r2.dev
  // Obtenir via: Dashboard Cloudflare → R2 → gxo-videos → Settings → Public Access
  BASE_URL: process.env.R2_PUBLIC_URL || 'https://pub-2c4381bbcb67487eaca05acc5a5bb501.r2.dev',
  
  // Nom du bucket
  BUCKET_NAME: 'gxo-videos',
  
  // Configuration cache (1 an)
  CACHE_MAX_AGE: 31536000,
  
  // Liste des langues disponibles
  SUPPORTED_LANGUAGES: [
    'fr', 'nl', 'de', 'fi', 'da', 'cs',
    'bg', 'pl', 'ro', 'it', 'pt', 'hr'
  ] as const,
};

export type SupportedLanguage = typeof R2_CONFIG.SUPPORTED_LANGUAGES[number];

/**
 * Génère l'URL complète d'une vidéo depuis R2
 * @param langue Code langue (fr, nl, de, etc.)
 * @returns URL complète de la vidéo
 */
export function getVideoUrl(langue: string): string {
  // Valider la langue
  if (!R2_CONFIG.SUPPORTED_LANGUAGES.includes(langue as any)) {
    console.warn(`⚠️ Langue non supportée: ${langue}, utilisation de 'fr' par défaut`);
    langue = 'fr';
  }
  
  return `${R2_CONFIG.BASE_URL}/instructions-${langue}.mp4`;
}

/**
 * Obtenir toutes les URLs de vidéos
 * @returns Map des URLs par langue
 */
export function getAllVideoUrls(): Record<SupportedLanguage, string> {
  return R2_CONFIG.SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    acc[lang] = getVideoUrl(lang);
    return acc;
  }, {} as Record<SupportedLanguage, string>);
}

/**
 * Vérifier si une langue est supportée
 */
export function isLanguageSupported(langue: string): boolean {
  return R2_CONFIG.SUPPORTED_LANGUAGES.includes(langue as any);
}
