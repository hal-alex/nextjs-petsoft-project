import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const pets = pgTable("pets", {
  id: serial().primaryKey().notNull(),
  name: varchar("name").notNull(),
  ownerName: varchar("owner_name").notNull(),
  imageUrl: varchar("image_url"),
  age: integer("age").notNull(),
  notes: text("notes"),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const blogPost = pgTable("blog_post", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  author: varchar("author"),
  views: integer("views"),
})

export type SelectPet = InferSelectModel<typeof pets>
export type InsertPet = InferInsertModel<typeof pets>

export type SelectBlogPost = InferSelectModel<typeof blogPost>
export type InsertBlogPost = InferInsertModel<typeof blogPost>

export const insertBlogPostSchema = createInsertSchema(blogPost, {
  views: (_) => z.coerce.number().({ message: "Views must be a number" }),
})
