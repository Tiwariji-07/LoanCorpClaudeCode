import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/landing']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes through without auth check
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))

  // Check for persisted auth state in cookies
  // Zustand persist stores in localStorage, but we can't read it in middleware.
  // Instead, check for the session cookie the WaveMaker backend sets.
  const hasSession = request.cookies.has('JSESSIONID') ||
    request.cookies.has('SPRING_SECURITY_REMEMBER_ME_COOKIE')

  // Also check the zustand-persisted auth flag via a lightweight cookie
  const hasAuthCookie = request.cookies.has('loancorp_authenticated')

  const isAuthenticated = hasSession || hasAuthCookie

  // Redirect unauthenticated users to login (unless on a public route)
  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login to dashboard
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|icons).*)'],
}
