import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: Re-enable auth protection after pages are built
// const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
  // Auth disabled during development — all routes are accessible
  return NextResponse.next()

  // const token = request.cookies.get('auth_token')?.value
  // const { pathname } = request.nextUrl
  // const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
  // if (!token && !isPublic) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  // if (token && isPublic) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  // return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
