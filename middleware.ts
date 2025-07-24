import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get locale from cookie or default to 'en'
  const locale = request.cookies.get('nike-locale')?.value || 'en'
  
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