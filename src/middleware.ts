import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { validateSessionToken } from "./app/utils/auth"

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authjs.session-token")?.value

  // console.log(cookie)

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const isValid = validateSessionToken(cookie)

  console.log(isValid)

  return NextResponse.next()
}

export const config = {
  matcher: ["/app/:path*"],
}
