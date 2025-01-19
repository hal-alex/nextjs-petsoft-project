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
import { getUserFromSession } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import { line } from "drizzle-orm/pg-core"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
import { Stripe, loadStripe } from "@stripe/stripe-js"

type PetMutationType = "edit" | "delete"

const checkAuthForPetMutation = async (
  mutationType: PetMutationType,
  petId: number,
) => {
  // authentication check - user is registered and is logged in
  const user = await getUserFromSession()
  const errorText = `Could not ${mutationType} pet`

  if (!user) {
    return { message: errorText }
  }

  // authorization check - user is the owner of the pet
  const petToMutate = await db.select().from(pets).where(eq(pets.id, petId))

  if (petToMutate.length < 1) {
    return { message: errorText }
  }

  if (petToMutate[0].userId !== user.id) {
    return { message: errorText }
  }
}

export const addPet = async (pet: InsertPet) => {
  const user = await getUserFromSession()

  if (!user) {
    return { message: "Could not add pet" }
  }

  try {
    await db
      .insert(pets)
      .values({ ...pet, userId: user.id })
      .execute()

    revalidatePath("/app", "layout")
  } catch (error) {
    return { message: "Could not add pet" }
  }
}

export const updatePet = async (petId: number, editedPet: InsertPet) => {
  const canNotMutate = await checkAuthForPetMutation("edit", petId)

  if (canNotMutate?.message) {
    return canNotMutate
  }

  try {
    await db.update(pets).set(editedPet).where(eq(pets.id, petId)).execute()
    revalidatePath("/app", "layout")
  } catch (error) {
    return { message: "Could not update pet" }
  }
}

export const deletePet = async (petId: number) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const canNotMutate = await checkAuthForPetMutation("delete", petId)

  if (canNotMutate?.message) {
    return canNotMutate
  }

  // db mutation
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

export const createCheckoutSession = async () => {
  const user = await getUserFromSession()

  if (!user) {
    return { message: "Could not create checkout session" }
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        price: "price_1QgAbaDvvYO6jebP55dyWyPG",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/payment?success=true",
    cancel_url: "http://localhost:3000/payment?cancelled=true",
  })
  redirect(checkoutSession.url)
}
