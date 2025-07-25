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
      const cookieValue = localeCookie.split('=')[1]?.trim();
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
    
    // Browser language detection as final fallback
    const browserLang = navigator.language.split('-')[0];
    if (browserLang && isValidLocale(browserLang)) {
      return browserLang;
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

// Server-side locale detection from headers or cookies
export function getServerLocale(headers: Headers): SupportedLocale {
  try {
    // First check custom header set by middleware
    const localeHeader = headers.get('x-locale');
    if (localeHeader && isValidLocale(localeHeader)) {
      return localeHeader;
    }
    
    // Check cookie header
    const cookieHeader = headers.get('cookie');
    if (cookieHeader) {
      const cookies = cookieHeader.split(';');
      const localeCookie = cookies.find(cookie => cookie.trim().startsWith('nike-locale='));
      
      if (localeCookie) {
        const cookieValue = localeCookie.split('=')[1]?.trim();
        if (cookieValue && isValidLocale(cookieValue)) {
          return cookieValue;
        }
      }
    }
    
    // Check Accept-Language header
    const acceptLanguage = headers.get('accept-language');
    if (acceptLanguage) {
      const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
      for (const lang of languages) {
        const langCode = lang.split('-')[0];
        if (langCode && isValidLocale(langCode)) {
          return langCode;
        }
      }
    }
  } catch (error) {
    console.error('Error detecting server locale:', error);
  }
  
  return DEFAULT_LOCALE;
}