import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { schools } from "../academics/school"
import { classes } from "../academics/classes"
import { users } from "../academics/users"

export const announcements = pgTable("announcements", {
  id: text("id").primaryKey(),
  schoolId: text("scholl_id").references(() => schools.id, {
    onDelete: "cascade",
  }),
  classId: text("class_id").references(() => classes.id, {
    onDelete: "cascade",
  }),
  authorId: text("author_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
})

export const announcementsRelations = relations(announcements, ({ one }) => ({
  school: one(schools, {
    fields: [announcements.schoolId],
    references: [schools.id],
  }),
  classes: one(classes, {
    fields: [announcements.classId],
    references: [classes.id],
  }),
  author: one(users, {
    fields: [announcements.authorId],
    references: [users.id],
  }),
}))
