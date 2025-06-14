import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/user/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Redirect to login if accessing protected route without token

  if (url.pathname === "/")
    return NextResponse.redirect(new URL("/user/login", request.url));
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
