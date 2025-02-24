import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key_change_this'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }

    try {
      // Verify token
      jwt.verify(token.value, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      // If token is invalid, redirect to signin
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname.startsWith('/signup')) {
    if (token) {
      try {
        // Verify token
        jwt.verify(token.value, JWT_SECRET)
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } catch (error) {
        // Token is invalid, let them access auth pages
        return NextResponse.next()
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
} 