import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authjs.session-token")?.value

  // if (!cookie) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  // console.log(new URL("/api/user", request.nextUrl.origin).toString())

  const response = await fetch(
    new URL("/api/user", request.nextUrl.origin).toString(),
  )

  
  const body = await response.json()

  console.log(body, "body")

  // console.log(sessionToken, "body")

  // if (!session || !user) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/app/:path*"],
}
