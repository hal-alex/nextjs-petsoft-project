import { z } from "zod"

export const newInserBlogPostSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  author: z.string().optional(),
  views: z.coerce.number(),
  createdAt: z.date().optional(),
})
