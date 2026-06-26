import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const level = pgTable("level", {
  id: text("id").primaryKey(),
  level: text("level").notNull(),
  xpRequired: text("xp_required").notNull(),
  rewardDescription: text("reward_description").notNull(),
})
