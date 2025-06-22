import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get all cookies for debugging
  const allCookies = request.cookies.getAll()
  const cookieNames = allCookies.map(cookie => cookie.name)
  
  // Check for the presence of Supabase auth cookies
  const hasAuthCookie = request.cookies.has('sb-access-token') || 
                       request.cookies.has('supabase-auth-token') ||
                       request.cookies.has('sb-refresh-token') ||
                       request.cookies.has('supabase-refresh-token') ||
                       cookieNames.some(name => name.startsWith('sb-'))

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const isAdmin = request.nextUrl.pathname.startsWith('/admin')

  // Debug logging
  console.log('Middleware check:', {
    path: request.nextUrl.pathname,
    hasAuthCookie,
    cookieNames,
    isDashboard,
    isAdmin
  })

  if ((isDashboard || isAdmin) && !hasAuthCookie) {
    // Redirect to login with a return URL
    const returnUrl = encodeURIComponent(request.nextUrl.pathname)
    console.log('Redirecting to login, returnUrl:', returnUrl)
    return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
} 