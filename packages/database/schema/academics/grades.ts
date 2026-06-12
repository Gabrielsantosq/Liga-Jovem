import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { submissions } from "./submission"
import { users } from "./users"

export const grades = pgTable("grades", {
  id: text("id").primaryKey(),
  submissionId: text("submission_id").references(() => submissions.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  grade: text("grade").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const gradeRelations = relations(grades, ({ one }) => ({
  submission: one(submissions, {
    fields: [grades.submissionId],
    references: [submissions.id],
  }),
  user: one(users, {
    fields: [grades.userId],
    references: [users.id],
  }),
}))
