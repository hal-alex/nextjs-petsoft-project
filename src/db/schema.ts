import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core"
import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { relations } from "drizzle-orm"

export const user = pgTable("user", {
  id: serial().primaryKey().notNull(),
  email: varchar("email").notNull().unique(),
  hashedPassword: varchar("hashed_password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isPaid: boolean("is_paid").notNull().default(false),
})

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export const userRelations = relations(user, ({ many }) => ({
  pets: many(user),
}))

export const pets = pgTable("pets", {
  id: serial().primaryKey().notNull(),
  name: varchar("name").notNull(),
  ownerName: varchar("owner_name").notNull(),
  imageUrl: varchar("image_url"),
  age: integer("age").notNull(),
  notes: text("notes"),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: integer("user_id")
    .references(() => user.id)
    .notNull(),
})

export const petsRelations = relations(pets, ({ one }) => ({
  user: one(user, {
    fields: [pets.userId],
    references: [user.id],
  }),
}))

export const blogPost = pgTable("blog_post", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  author: varchar("author"),
  views: integer("views"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type SelectPet = InferSelectModel<typeof pets>
export type InsertPet = InferInsertModel<typeof pets>

export type SelectBlogPost = InferSelectModel<typeof blogPost>
export type InsertBlogPost = InferInsertModel<typeof blogPost>

export type SelectUser = InferSelectModel<typeof user>
export type InsertUser = InferInsertModel<typeof user>

export type SelectSession = InferSelectModel<typeof sessionTable>
export type InsertSession = InferInsertModel<typeof sessionTable>

// this schema does not work
export const insertBlogPostSchema = createInsertSchema(blogPost)

export const insertUserSchema = createInsertSchema(user)
