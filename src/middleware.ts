import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/landing']

// Role names from GET /loancorp/Role:
//   APPROVER (id: 1) — officer/admin role
//   CUSTOMER (id: 2) — regular customer role
const OFFICER_ROLE = 'APPROVER'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes through without auth check
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))

  // Check auth cookies
  const hasSession = request.cookies.has('JSESSIONID') ||
    request.cookies.has('SPRING_SECURITY_REMEMBER_ME_COOKIE')
  const hasAuthCookie = request.cookies.has('loancorp_authenticated')
  const isAuthenticated = hasSession || hasAuthCookie

  // Read role from cookie (set by auth store on login)
  const roleName = request.cookies.get('loancorp_role')?.value

  // Redirect unauthenticated users to login (unless on a public route)
  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login based on role
  if (isAuthenticated && pathname === '/login') {
    const target = roleName === OFFICER_ROLE ? '/officer/dashboard' : '/dashboard'
    return NextResponse.redirect(new URL(target, request.url))
  }

  // Prevent customers from accessing officer routes
  if (isAuthenticated && pathname.startsWith('/officer') && roleName !== OFFICER_ROLE) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Prevent officers from accessing customer dashboard routes
  if (isAuthenticated && roleName === OFFICER_ROLE && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/officer/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|icons).*)'],
}
