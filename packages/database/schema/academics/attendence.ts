import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "./user"

export const attendence = pgTable("attendence", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  date: timestamp("date").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const attendenceRelations = relations(attendence, ({ one }) => ({
  user: one(users, {
    fields: [attendence.userId],
    references: [users.id],
  }),
}))
