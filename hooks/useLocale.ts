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

  const changeLocale = (newLocale: SupportedLocale) => {
    try {
      setLocale(newLocale);
      setCurrentLocale(newLocale);
      
      // Use router navigation instead of window.location.reload to avoid hydration issues
      if (typeof window !== 'undefined') {
        window.location.href = window.location.pathname;
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