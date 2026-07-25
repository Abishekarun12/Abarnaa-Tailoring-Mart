/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Hides the embedded Sanity Studio behind a secret URL instead of the
 * predictable `/studio-internal` route it actually lives at.
 *
 * `STUDIO_ACCESS_PATH` (set in `.env`, never committed) is the only thing
 * that maps to the Studio — requests to `/studio-internal` itself are
 * rejected outright, and if the env var isn't set the Studio is completely
 * unreachable. This only hides the entry point from casual discovery; the
 * real access control is still Sanity's own login once you're in.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const STUDIO_INTERNAL_ROUTE = '/studio-internal';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.STUDIO_ACCESS_PATH;

  if (secret) {
    const secretRoute = `/${secret}`;
    if (pathname === secretRoute || pathname.startsWith(`${secretRoute}/`)) {
      const url = request.nextUrl.clone();
      url.pathname = STUDIO_INTERNAL_ROUTE + pathname.slice(secretRoute.length);
      return NextResponse.rewrite(url);
    }
  }

  if (pathname === STUDIO_INTERNAL_ROUTE || pathname.startsWith(`${STUDIO_INTERNAL_ROUTE}/`)) {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
