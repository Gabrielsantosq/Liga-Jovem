import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { activities } from "./activities"
import { users } from "./users"

export const submissionStatusEnum = pgEnum("submission_status", [
  "pending",
  "approved",
  "rejected",
])

export const submissions = pgTable("submissions", {
  id: text("id").primaryKey(),
  activityId: text("activity_id").references(() => activities.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  status: text("status").notNull(),
  content: text("content"),
  attachmentUrl: text("attachment_url"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  grade: text("grade"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const submissionRelations = relations(submissions, ({ one }) => ({
  activity: one(activities, {
    fields: [submissions.activityId],
    references: [activities.id],
  }),
  user: one(users, {
    fields: [submissions.userId],
    references: [users.id],
  }),
}))
