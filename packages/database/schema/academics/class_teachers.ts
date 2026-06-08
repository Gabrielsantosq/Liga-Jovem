import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { classes } from "./classes"
import { users } from "./users"
import { subject } from "./subject"

export const classTeachers = pgTable("class_teachers", {
  id: text("id").primaryKey(),
  classId: text("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  teacherId: text("teacher_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subject.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const classTeachersRelations = relations(classTeachers, ({ one }) => ({
  class: one(classes, {
    fields: [classTeachers.classId],
    references: [classes.id],
  }),
  teacher: one(users, {
    fields: [classTeachers.teacherId],
    references: [users.id],
  }),
  subject: one(subject, {
    fields: [classTeachers.subjectId],
    references: [subject.id],
  }),
}))
