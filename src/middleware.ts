// import { NextResponse } from "next/server"

// export function middleware(request: Request) {
//   console.log("Request URL:", request.url)
//   return NextResponse.next()
// }

import { auth } from "@/app/utils/auth"

export default auth

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
}
