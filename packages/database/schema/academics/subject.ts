import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { schools } from "./school"

export const subject = pgTable("subject", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  schoolId: text("school_id")
    .notNull()
    .references(() => schools.id, { onDelete: "cascade" }),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const subjectRelations = relations(subject, ({ one }) => ({
  school: one(schools, {
    fields: [subject.schoolId],
    references: [schools.id],
  }),
}))
