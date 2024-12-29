import { z } from "zod"

export const newInserBlogPostSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  author: z.string().optional(),
  views: z.coerce.number(),
  createdAt: z.date().optional(),
})

export const newUserEmailSchema = z.string().email().nonempty()

export const newUserPasswordSchema = z.string().min(5).nonempty()

export const newUserSignUpSchema = z.object({
  email: newUserEmailSchema,
  password: newUserPasswordSchema,
})
