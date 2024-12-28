import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { SelectSession, SelectUser } from "@/db/schema"
import { user as userSchema, sessionTable } from "@/db/schema"
import { db } from "@/db/connection"
import { eq } from "drizzle-orm"
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding"
import { sha256 } from "@oslojs/crypto/sha2"

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(
  token: string,
  userId: number,
): Promise<SelectSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: SelectSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }
  await db.insert(sessionTable).values(session)
  return session
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  console.log(sessionId, "sessionId")
  console.log(token, "token")
  const result = await db
    .select({ user: userSchema, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userSchema, eq(sessionTable.userId, userSchema.id))
    .where(eq(sessionTable.id, sessionId))

  console.log(result, "result")
  if (result.length < 1) {
    return { session: null, user: null }
  }
  const { user, session } = result[0]
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id))
    return { session: null, user: null }
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await db
      .update(sessionTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionTable.id, session.id))
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

export type SessionValidationResult =
  | { session: SelectSession; user: SelectUser }
  | { session: null; user: null }

// API route handlers

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const token = generateSessionToken()
  return Response.json({ randomToken: token })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const token = body.token

  console.log(token, "token")

  return Response.json({ result: await validateSessionToken(token) })
}

export async function PATCH(request: NextRequest) {
  return createSession(request.body.token, request.body.userId)
}
