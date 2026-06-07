import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/ua-kit'];

function isAuthenticated(request: NextRequest): boolean {
  const raw = request.cookies.get('auth')?.value;
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    return !!parsed?.state?.token;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = isAuthenticated(request);

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    if (authed && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/search', request.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
