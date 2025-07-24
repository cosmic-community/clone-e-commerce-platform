'use client'

import { useState, useEffect } from 'react';
import { SupportedLocale, getCurrentLocale, setCurrentLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function useLocale() {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    try {
      const currentLocale = getCurrentLocale();
      setLocale(currentLocale);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading locale:', error);
      setLocale(DEFAULT_LOCALE);
      setIsLoaded(true);
    }
  }, []);

  const changeLocale = async (newLocale: SupportedLocale) => {
    try {
      setLocale(newLocale);
      setCurrentLocale(newLocale);
      
      // Set cookie on client side
      document.cookie = `nike-locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      
      // Force a page reload to apply the new locale on the server side
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error changing locale:', error);
    }
  };

  return {
    locale,
    changeLocale,
    isLoaded
  };
}