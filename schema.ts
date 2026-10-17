import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  primaryKey,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 120 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex('users_email_idx').on(t.email)]
)

export const clothingItems = pgTable(
  'clothing_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 120 }).notNull(),
    category: varchar('category', { length: 40 }).notNull(),
    colour: varchar('colour', { length: 40 }).notNull(),
    season: varchar('season', { length: 40 }).notNull().default('all'),
    occasion: varchar('occasion', { length: 40 }).notNull().default('casual'),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index('clothing_items_user_id_idx').on(t.userId),
    index('clothing_items_category_idx').on(t.category),
  ]
)

export const outfits = pgTable(
  'outfits',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 120 }).notNull(),
    occasion: varchar('occasion', { length: 40 }).notNull().default('casual'),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('outfits_user_id_idx').on(t.userId)]
)

export const outfitItems = pgTable(
  'outfit_items',
  {
    outfitId: uuid('outfit_id')
      .notNull()
      .references(() => outfits.id, { onDelete: 'cascade' }),
    clothingItemId: uuid('clothing_item_id')
      .notNull()
      .references(() => clothingItems.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.outfitId, t.clothingItemId] })]
)

export const earlyAccessSignups = pgTable(
  'early_access_signups',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 120 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    interestCategory: varchar('interest_category', { length: 60 }),
    consent: boolean('consent').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex('early_access_email_idx').on(t.email)]
)

export const userPreferences = pgTable(
  'user_preferences',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    preferredColours: text('preferred_colours'),
    preferredStyles: text('preferred_styles'),
    preferredOccasions: text('preferred_occasions'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex('user_preferences_user_id_idx').on(t.userId)]
)

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    token: varchar('token', { length: 128 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex('sessions_token_idx').on(t.token),
    index('sessions_user_id_idx').on(t.userId),
  ]
)

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  clothingItems: many(clothingItems),
  outfits: many(outfits),
  preferences: one(userPreferences),
  sessions: many(sessions),
}))

export const clothingItemsRelations = relations(clothingItems, ({ one, many }) => ({
  user: one(users, { fields: [clothingItems.userId], references: [users.id] }),
  outfitItems: many(outfitItems),
}))

export const outfitsRelations = relations(outfits, ({ one, many }) => ({
  user: one(users, { fields: [outfits.userId], references: [users.id] }),
  outfitItems: many(outfitItems),
}))

export const outfitItemsRelations = relations(outfitItems, ({ one }) => ({
  outfit: one(outfits, { fields: [outfitItems.outfitId], references: [outfits.id] }),
  clothingItem: one(clothingItems, {
    fields: [outfitItems.clothingItemId],
    references: [clothingItems.id],
  }),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type ClothingItem = typeof clothingItems.$inferSelect
export type NewClothingItem = typeof clothingItems.$inferInsert
export type Outfit = typeof outfits.$inferSelect
export type NewOutfit = typeof outfits.$inferInsert
export type EarlyAccessSignup = typeof earlyAccessSignups.$inferSelect
export type UserPreference = typeof userPreferences.$inferSelect
