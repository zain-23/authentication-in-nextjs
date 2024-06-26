import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export default async function middleware(req: NextRequest) {
  // check if route is protected
  const protectedRoutes = ["/dashboard"];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie!);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/sign-up", req.nextUrl));
    }

    // return route
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
