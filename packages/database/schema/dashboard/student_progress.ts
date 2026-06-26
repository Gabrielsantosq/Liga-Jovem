import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { Many, relations } from "drizzle-orm"
import { users } from "../academics/users"
import { subject } from "../academics/subject"

export const studentProgress = pgTable("student_progress", {
  id: text("id").primaryKey(),
  studentId: text("student_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  subjectId: text("subject_id").references(() => subject.id, {
    onDelete: "cascade",
  }),
  completionPercentage: text("completion_percentage").notNull(),
  performacePercentage: text("performace_percentage").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const studentProgressRelations = relations(
  studentProgress,
  ({ one, many }) => ({
    user: one(users, {
      fields: [studentProgress.studentId],
      references: [users.id],
    }),
    subject: many(subjects, {
      fields: [studentProgress.subjectId],
      references: [subject.id],
    }),
  })
)
