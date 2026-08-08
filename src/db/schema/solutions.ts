// src/db/schema.ts
import { pgTable, serial, text, pgEnum, integer } from 'drizzle-orm/pg-core'

export const systemTypeEnum = pgEnum('system_type', ['software', 'hardware', 'hybrid'])

export const systems = pgTable('systems', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: systemTypeEnum('type').notNull(),
})

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

export const fields = pgTable('fields', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

export const systemCategories = pgTable('system_categories', {
  systemId: integer('system_id').notNull().references(() => systems.id),
  categoryId: integer('category_id').notNull().references(() => categories.id),
})

export const categoryFields = pgTable('category_fields', {
  categoryId: integer('category_id').notNull().references(() => categories.id),
  fieldId: integer('field_id').notNull().references(() => fields.id),
})