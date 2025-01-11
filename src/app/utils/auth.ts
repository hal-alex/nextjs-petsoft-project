"use server"
import type { SelectSession, SelectUser } from "@/db/schema"
import { user as userSchema, sessionTable } from "@/db/schema"
import { db } from "@/db/connection"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"
import { newUserEmailSchema, newUserSignUpSchema } from "./validators"
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding"
import { sha256 } from "@oslojs/crypto/sha2"
import { cookies } from "next/headers"
import { set } from "zod"

// for sign in, we need to take the entered password and
// use bcrypt.compare to compare the string to the hashed password
// but check if the user email exists first

// for sign up, need to check if the user email already exists
// then hash the password and insert the user into the database

export const isUserEmailFine = async (email: unknown) => {
  const parsedEmail = newUserEmailSchema.safeParse(email)

  if (!parsedEmail.success) {
    return false
  }

  const foundUser = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, parsedEmail.data))
    .limit(1)

  return foundUser.length > 0 ? true : false
}

// need to return session token for this function
export const signIn = async (email: unknown, password: unknown) => {
  const isEmailFine = await isUserEmailFine(email)

  if (!isEmailFine) {
    return { success: false, token: null }
  }

  const parsedUser = newUserSignUpSchema.safeParse({ email, password })

  if (!parsedUser.success) {
    return { success: false, token: null }
  }

  const foundUser = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, parsedUser.data.email))
    .limit(1)

  const isValidPassword = await bcrypt.compare(
    parsedUser.data.password,
    foundUser[0].hashedPassword,
  )

  if (!isValidPassword) {
    return { success: false, token: null }
  }

  const rawToken = await generateSessionToken()

  await createSession(rawToken, foundUser[0].id)

  const cookieStore = await cookies()

  cookieStore.set("session-token", rawToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  })
  return { success: true }
}

// also need to return session token for this function
// this is to that auto-log in can be implemented
export const signUp = async (email: unknown, password: unknown) => {
  await new Promise(async (resolve, reject) => {
    setTimeout(resolve, 1000)
  })
  const isEmailFine = await isUserEmailFine(email)

  if (isEmailFine) {
    return { success: false, token: null }
  }

  const parsedUser = newUserSignUpSchema.safeParse({ email, password })

  if (!parsedUser.success) {
    return { success: false, token: null }
  }

  const hashedPassword = await bcrypt.hash(parsedUser.data.password, 10)

  const newUser = await db
    .insert(userSchema)
    .values({ email: parsedUser.data.email, hashedPassword })
    .returning()

  const rawToken = await generateSessionToken()

  await createSession(rawToken, newUser[0].id)

  return { success: true, token: rawToken }
}

export async function generateSessionToken(): Promise<string> {
  const bytes = new Uint8Array(100)
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

  const result = await db
    .select({ user: userSchema, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userSchema, eq(sessionTable.userId, userSchema.id))
    .where(eq(sessionTable.id, sessionId))

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
  await new Promise(async (resolve, reject) => {
    setTimeout(resolve, 1000)
  })
  console.log(sessionId)
  const encodedSessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(sessionId)),
  )

  console.log(encodedSessionId)

  await db.delete(sessionTable).where(eq(sessionTable.id, encodedSessionId))
}

export type SessionValidationResult =
  | { session: SelectSession; user: SelectUser }
  | { session: null; user: null }

export const getUser = async (authToken: string) => {
  const session = await validateSessionToken(authToken)
  return session.user
}

export const isLoggedIn = async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session-token")?.value

  if (!sessionToken) {
    return false
  }

  const isValidated = await validateSessionToken(sessionToken)

  if (!isValidated.session) {
    return false
  }

  return { sessionToken }
}

export const getUserFromSession = async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session-token")?.value

  if (!sessionToken) {
    return null
  }

  const isValidated = await validateSessionToken(sessionToken)

  if (!isValidated.session) {
    return null
  }

  return isValidated.user
}
