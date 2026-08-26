import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/venues",
  "/rooms",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const PROTECTED_ROUTES = ["/me", "/bookings/create", "/payment", "/dashboard"];

function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function matchesAnyRoute(pathname: string, routes: string[]) {
  return routes.some((route) => matchesRoute(pathname, route));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Ignore Next.js internals and static files.
   */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  /*
   * Public routes.
   */
  if (matchesAnyRoute(pathname, PUBLIC_ROUTES)) {
    /*
     * Auth pages should not be accessible once a session
     * exists. We only check for the session cookie here.
     *
     * The actual user is resolved through getCurrentUser().
     */
    if (matchesAnyRoute(pathname, AUTH_ROUTES)) {
      const hasSession = request.cookies.has("better-auth.session_token");

      if (hasSession) {
        return NextResponse.redirect(new URL("/me", request.url));
      }
    }

    return NextResponse.next();
  }

  /*
   * Everything below this point requires authentication.
   */
  if (matchesAnyRoute(pathname, PROTECTED_ROUTES)) {
    const hasSession =
      request.cookies.has("better-auth.session_token") ||
      request.cookies.has("__Secure-better-auth.session_token");

    if (!hasSession) {
      const loginUrl = new URL("/auth/login", request.url);

      loginUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  /*
   * Default:
   *
   * If a new route is created and isn't explicitly public,
   * allow it for now. Individual protected pages/layouts
   * should use getCurrentUser() for authorization.
   */
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
