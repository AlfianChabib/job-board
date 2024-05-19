import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify, errors } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (pathname.startsWith('/company')) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login/company', req.url));
    }
  }
  if (pathname.startsWith('/login')) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (refreshToken) {
    if (pathname === '/') {
      try {
        const decoded = await jwtVerify(refreshToken, secret);
        if (decoded.payload.role === 'Company') {
          return NextResponse.redirect(new URL('/company/dashboard', req.url));
        }
        return NextResponse.next();
      } catch (error) {
        if (error instanceof errors.JOSEError) {
          if (error.name === 'JWTExpired') {
            return NextResponse.redirect(new URL('/login', req.url));
          }
        }
      }
    }
  }
}
