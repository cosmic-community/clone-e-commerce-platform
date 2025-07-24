'use client'

import { useState, useEffect } from 'react';
import { SupportedLocale, getCurrentLocale, setCurrentLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function useLocale() {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    const currentLocale = getCurrentLocale();
    setLocale(currentLocale);
    setIsLoaded(true);
  }, []);

  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    setCurrentLocale(newLocale);
    
    // Trigger page refresh to re-fetch data with new locale
    window.location.reload();
  };

  return {
    locale,
    changeLocale,
    isLoaded
  };
}