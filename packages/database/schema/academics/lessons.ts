import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { topics } from "./topics"
import { subject } from "./subject"
import { classes } from "./classes"
import { users } from "./users"

export const lessons = pgTable("lessons", {
  id: text("id").primaryKey(),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  classId: text("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subject.id, { onDelete: "cascade" }),
  teacherId: text("teacher_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const lessonsRelations = relations(lessons, ({ one }) => ({
  topic: one(() => topics, {
    fields: [lessons.topicId],
    references: [topics.id],
  }),
  class: one(() => classes, {
    fields: [lessons.classId],
    references: [classes.id],
  }),
  subject: one(() => subject, {
    fields: [lessons.subjectId],
    references: [subject.id],
  }),
  teacher: one(() => users, {
    fields: [lessons.teacherId],
    references: [users.id],
  }),
}))
