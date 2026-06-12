import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { subject } from "./subject"

export const topics = pgTable("topics", {
  id: text("id").primaryKey(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subject.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  dificultyLevel: text("dificulty_level"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const topicsRelations = relations(topics, ({ one }) => ({
  subject: one(() => subject, {
    fields: [topics.subjectId],
    references: [subject.id],
  }),
}))
