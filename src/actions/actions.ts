"use server"

import { db } from "@/db/connection"
import { InsertPet, pets } from "@/db/schema"

export const addPet = async (pet: InsertPet) => {
  return await db.insert(pets).values(pet).execute()
}
