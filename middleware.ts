import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidLocale, DEFAULT_LOCALE } from '@/lib/locale'

export function middleware(request: NextRequest) {
  // Get locale from cookie, header, or default
  let locale = DEFAULT_LOCALE;
  
  try {
    // First try cookie
    const cookieLocale = request.cookies.get('nike-locale')?.value;
    if (cookieLocale && isValidLocale(cookieLocale)) {
      locale = cookieLocale;
    } else {
      // Try Accept-Language header as fallback
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0]?.trim()).filter(Boolean);
        for (const lang of languages) {
          const langCode = lang?.split('-')[0];
          if (langCode && isValidLocale(langCode)) {
            locale = langCode;
            break;
          }
        }
      }
    }
  } catch (error) {
    console.error('Middleware locale detection error:', error);
    locale = DEFAULT_LOCALE;
  }
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Add the locale to headers so it can be accessed in server components
  requestHeaders.set('x-locale', locale)
  
  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}