import { jwtVerify } from 'jose';
import { NextResponse, type NextRequest } from 'next/server';

const secretRefreshKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (pathname.startsWith('/company')) {
    console.log(refreshToken);
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login/company', req.url));
    }
  }
  if (pathname.startsWith('/login')) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}
