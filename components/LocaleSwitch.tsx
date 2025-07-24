'use client'

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { SUPPORTED_LOCALES, SupportedLocale, getLocaleInfo } from '@/lib/locale';

export default function LocaleSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { locale, changeLocale, isLoaded } = useLocale();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="relative">
        <button className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
          <Globe className="w-4 h-4" />
          <span>EN</span>
        </button>
      </div>
    );
  }

  const currentLocaleInfo = getLocaleInfo(locale);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLocaleInfo.flag}</span>
        <span className="font-medium">{currentLocaleInfo.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-2">
            {Object.entries(SUPPORTED_LOCALES).map(([code, info]) => (
              <button
                key={code}
                onClick={() => {
                  changeLocale(code as SupportedLocale);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  locale === code ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                <span className="text-lg">{info.flag}</span>
                <span>{info.name}</span>
                {locale === code && (
                  <span className="ml-auto text-xs text-gray-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}