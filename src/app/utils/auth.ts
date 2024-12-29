"use server"
import type { SelectSession, SelectUser } from "@/db/schema"
import { user as userSchema, sessionTable } from "@/db/schema"
import { db } from "@/db/connection"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"
import {
  newUserEmailSchema,
  newUserPasswordSchema,
  newUserSignUpSchema,
} from "./validators"

// for sign in, we need to take the entered password and
// use bcrypt.compare to compare the string to the hashed password
// but check if the user email exists first

// for sign up, need to check if the user email already exists
// then hash the password and insert the user into the database

export const isUserEmailFine = async (email: string) => {
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

export const signIn = async (email: string, password: string) => {
  const isEmailFine = await isUserEmailFine(email)

  if (!isEmailFine) {
    return false
  }

  const parsedUser = newUserSignUpSchema.safeParse({ email, password })

  if (!parsedUser.success) {
    return false
  }

  const foundUser = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, parsedUser.data.email))
    .limit(1)

  console.log(parsedUser.data.password, "input password")
  console.log(foundUser[0].hashedPassword, "hashed password")

  const isValidPassword = await bcrypt.compare(
    parsedUser.data.password,
    foundUser[0].hashedPassword,
  )

  console.log(isValidPassword, "is valid password")

  if (!isValidPassword) {
    return false
  }

  return true
}

// export function generateSessionToken(): string {
//   const bytes = new Uint8Array(20)
//   crypto.getRandomValues(bytes)
//   const token = encodeBase32LowerCaseNoPadding(bytes)
//   return token
// }

// export async function createSession(
//   token: string,
//   userId: number,
// ): Promise<SelectSession> {
//   const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
//   const session: SelectSession = {
//     id: sessionId,
//     userId,
//     expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
//   }
//   await db.insert(sessionTable).values(session)
//   return session
// }

// export async function validateSessionToken(
//   token: string,
// ): Promise<SessionValidationResult> {
//   const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
//   const result = await db
//     .select({ user: userSchema, session: sessionTable })
//     .from(sessionTable)
//     .innerJoin(userSchema, eq(sessionTable.userId, userSchema.id))
//     .where(eq(sessionTable.id, sessionId))
//   if (result.length < 1) {
//     return { session: null, user: null }
//   }
//   const { user, session } = result[0]
//   if (Date.now() >= session.expiresAt.getTime()) {
//     await db.delete(sessionTable).where(eq(sessionTable.id, session.id))
//     return { session: null, user: null }
//   }
//   if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
//     session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
//     await db
//       .update(sessionTable)
//       .set({
//         expiresAt: session.expiresAt,
//       })
//       .where(eq(sessionTable.id, session.id))
//   }
//   return { session, user }
// }

// export async function invalidateSession(sessionId: string): Promise<void> {
//   await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
// }

// export type SessionValidationResult =
//   | { session: SelectSession; user: SelectUser }
//   | { session: null; user: null }
