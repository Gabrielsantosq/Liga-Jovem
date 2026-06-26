import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  index,
  boolean,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"

export const streaks = pgTable("streaks", {
  id: text("id").primaryKey(),
  studentId: text("student_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  currentStreak: text("current_streak").notNull(),
  bestStreak: text("best_streak").notNull(),
  lastActivityDate: timestamp("last_activity_date").defaultNow(),
})

export const streaksRelations = relations(streaks, ({ one }) => ({
  user: one(users, {
    fields: [streaks.studentId],
    references: [users.id],
  }),
}))
