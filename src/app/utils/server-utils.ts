"use server"

import { db } from "@/db/connection"
import { pets } from "@/db/schema"
import { eq, ilike, like } from "drizzle-orm"

export const getPetByPetId = async (petId: number) => {
  return await db.select().from(pets).where(eq(pets.id, petId))
}

export const searchPetFromDb = async (searchTerm: string) => {
  try {
    return await db
      .select()
      .from(pets)
      .where(ilike(pets.name, `%${searchTerm}%`))
  } catch (error) {
    console.error("Error searching pets:", error)
    throw new Error("Failed to search pets")
  }
}
