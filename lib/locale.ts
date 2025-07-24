// Supported locales based on the CMS data
export const SUPPORTED_LOCALES = {
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
} as const;

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function isValidLocale(locale: string): locale is SupportedLocale {
  return Object.keys(SUPPORTED_LOCALES).includes(locale);
}

export function getLocaleInfo(locale: SupportedLocale) {
  return SUPPORTED_LOCALES[locale];
}

export function getCurrentLocale(): SupportedLocale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }
  
  try {
    // First try to get from cookie
    const cookies = document.cookie.split(';');
    const localeCookie = cookies.find(cookie => cookie.trim().startsWith('nike-locale='));
    
    if (localeCookie) {
      const cookieValue = localeCookie.split('=')[1];
      if (cookieValue && isValidLocale(cookieValue)) {
        return cookieValue;
      }
    }
    
    // Fallback to localStorage
    const stored = localStorage.getItem('nike-locale');
    if (stored && isValidLocale(stored)) {
      // Sync localStorage value to cookie
      document.cookie = `nike-locale=${stored}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      return stored;
    }
  } catch (error) {
    console.error('Error reading locale:', error);
  }
  
  return DEFAULT_LOCALE;
}

export function setCurrentLocale(locale: SupportedLocale): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    // Set both cookie and localStorage for redundancy
    document.cookie = `nike-locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    localStorage.setItem('nike-locale', locale);
  } catch (error) {
    console.error('Error writing locale:', error);
  }
}