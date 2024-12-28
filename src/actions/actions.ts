"use server"

import { db } from "@/db/connection"
import {
  InsertPet,
  pets,
  blogPost as blogPostFromDb,
  insertBlogPostSchema,
} from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { newInserBlogPostSchema } from "@/app/utils/validators"
import { z } from "zod"

export const addPet = async (pet: InsertPet) => {
  try {
    await db.insert(pets).values(pet).execute()

    revalidatePath("/app", "layout")
  } catch (error) {
    return { message: "Could not add pet" }
  }
}

export const updatePet = async (petId: number, editedPet: InsertPet) => {
  try {
    await db.update(pets).set(editedPet).where(eq(pets.id, petId)).execute()
    revalidatePath("/app", "layout")
  } catch (error) {
    return { message: "Could not update pet" }
  }
}

export const deletePet = async (petId: number) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  try {
    await db.delete(pets).where(eq(pets.id, petId)).execute()
    revalidatePath("/app", "layout")
  } catch (error) {
    return { message: "Could not delete pet" }
  }
}

export const addBlogPost = async (blogPost: unknown) => {
  console.log(blogPost)
  try {
    const parsed = newInserBlogPostSchema.parse(blogPost)
    await db.insert(blogPostFromDb).values(parsed).execute()
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors }
    }
    return { error: "Could not add blog post" }
  }
}

// user actions
