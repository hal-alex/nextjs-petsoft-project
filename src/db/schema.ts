import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { InferSelectModel, InferInsertModel } from "drizzle-orm"

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

export type SelectPet = InferSelectModel<typeof pets>
export type InsertPet = InferInsertModel<typeof pets>
