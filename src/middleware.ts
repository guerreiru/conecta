import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const roles = req.cookies.get("roles")?.value;

  const protectedRoutes = [
    { path: "/dashboard", roles: ["company", "provider"] },
    { path: "/admin", roles: ["admin"] },
  ];

  const authRoutes = ["/login", "/register"];

  if (authRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  for (const route of protectedRoutes) {
    if (req.nextUrl.pathname.startsWith(route.path)) {
      if (!accessToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const hasRole = route.roles.some((role) => roles?.includes(role));

      if (!hasRole) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}
