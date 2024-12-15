"use server"

import { db } from "@/db/connection"
import { InsertPet, pets } from "@/db/schema"
import { revalidatePath } from "next/cache"

export const addPet = async (pet: InsertPet) => {
  await db.insert(pets).values(pet).execute()

  revalidatePath("/app", "layout")
}
