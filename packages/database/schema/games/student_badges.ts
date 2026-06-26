import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"
import { badges } from "./badges"

export const studentBadges = pgTable("student_badges", {
  id: text("id").primaryKey(),
  studentId: text("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  badgeId: text("badge_id").references(() => badges.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const studentBadgesRelations = relations(studentBadges, ({ one }) => ({
  user: one(users, {
    fields: [studentBadges.studentId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [studentBadges.badgeId],
    references: [badges.id],
  }),
}))
