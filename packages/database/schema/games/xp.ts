import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"

const sourceTypeEnum = pgEnum("souce_type", [
  "activity",
  "mission",
  "daily_login",
])

export const xp = pgTable("xp", {
  id: text("id").primaryKey(),
  studentId: text("student_id").references(() => users.id, { onDelete: "cascade", }).notNull(),
  amount: text("amount").notNull(),
  sourceType: text("source_type").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const xpRelations = relations(xp, ({ one }) => ({
  user: one(users, {
    fields: [xp.studentId],
    references: [users.id]
  })
}))
