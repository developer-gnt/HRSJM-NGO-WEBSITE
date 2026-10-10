import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { maintenanceConfig } from "@/config/maintenance";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets and internal Next.js requests must always pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // When maintenance is enabled:
  if (maintenanceConfig.enabled) {
    // Both home route (/) and (/maintenance) render the Maintenance page directly
    if (pathname === "/" || pathname === "/maintenance") {
      return NextResponse.next();
    }
    // Redirect any other route (/about, /contact, etc.) to /maintenance
    const maintenanceUrl = request.nextUrl.clone();
    maintenanceUrl.pathname = "/maintenance";
    return NextResponse.redirect(maintenanceUrl);
  }

  // When maintenance is disabled:
  // Redirect visitors away from /maintenance to home page
  if (!maintenanceConfig.enabled && pathname === "/maintenance") {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
