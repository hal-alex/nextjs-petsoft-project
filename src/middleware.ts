import { NextResponse } from "next/server"

export function middleware(request: Request) {
  console.log("Request URL:", request.url)
  return NextResponse.next()
}
