import { db } from "@/db/connection"
import { user } from "@/db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

export const saltAndHashPassword = async (password: string) =>
  await bcrypt.hash(password, 10)

export const getUserFromDb = async (email: string, password: string) => {
  const possibleUser = await db.select().from(user).where(eq(user.email, email))

  if (possibleUser.length === 0 || possibleUser[0].email !== email) {
    return null
  }

  const userFromDb = possibleUser[0]

  const passwordsMatch = await bcrypt.compare(
    userFromDb.hashedPassword,
    password,
  )

  return passwordsMatch ? userFromDb : null
}
