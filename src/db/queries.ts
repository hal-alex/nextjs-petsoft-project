import { getUserFromSession } from "@/app/utils/auth"
import { db } from "./connection"
import { user, userRelations, pets } from "./schema"
import { eq } from "drizzle-orm"

export const getAllPets = async () => {
  return await db.query.pets.findMany()
}

export async function getPetsByUserId() {
  const userIdFromSession = await getUserFromSession()

  if (!userIdFromSession) {
    return []
  }

  const result = await db.query.pets.findMany({
    where: eq(pets.userId, userIdFromSession?.id),
  })

  return result
}
