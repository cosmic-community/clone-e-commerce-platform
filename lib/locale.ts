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
    const stored = localStorage.getItem('nike-locale');
    if (stored && isValidLocale(stored)) {
      return stored;
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  return DEFAULT_LOCALE;
}

export function setCurrentLocale(locale: SupportedLocale): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('nike-locale', locale);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}