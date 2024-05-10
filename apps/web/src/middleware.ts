import { NextResponse, type NextRequest } from 'next/server';

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
}
