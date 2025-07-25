import { SupportedLocale, DEFAULT_LOCALE, isValidLocale } from '@/lib/locale'

export async function getServerLocale(): Promise<SupportedLocale> {
  try {
    // Only import cookies when actually needed and in server context
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      const localeCookie = cookieStore.get('nike-locale')
      
      if (localeCookie?.value && isValidLocale(localeCookie.value)) {
        return localeCookie.value
      }
    }
  } catch (error) {
    console.error('Error reading locale from cookies:', error)
  }
  
  return DEFAULT_LOCALE
}

export async function setServerLocale(locale: SupportedLocale): Promise<void> {
  try {
    // Only import cookies when actually needed and in server context
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      cookieStore.set('nike-locale', locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
    }
  } catch (error) {
    console.error('Error setting locale cookie:', error)
  }
}

// Helper function to get locale from headers (set by middleware)
export function getLocaleFromHeaders(): SupportedLocale {
  try {
    // This works in server components where headers() is available
    if (typeof window === 'undefined') {
      // Try to get from Next.js headers
      try {
        const { headers } = require('next/headers')
        const headersList = headers()
        const locale = headersList.get('x-locale')
        
        if (locale && isValidLocale(locale)) {
          return locale
        }
      } catch (error) {
        // headers() might not be available in all contexts
      }
    }
  } catch (error) {
    console.error('Error reading locale from headers:', error)
  }
  
  return DEFAULT_LOCALE
}