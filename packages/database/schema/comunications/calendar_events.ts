import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { schools } from "../academics/school"
import { classes } from "../academics/classes"

const tyoeEnum = pgEnum("type_enum", ["exam", "holiday", "meeting"])

export const calendarEvents = pgTable("calendar_events", {
  id: text("id").primaryKey(),
  schoolId: text("scholl_id").references(() => schools.id, {
    onDelete: "cascade",
  }),
  classId: text("class_id").references(() => classes.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at"),
})

export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
  scholl: one(schools, {
    fields: [calendarEvents.schoolId],
    references: [schools.id],
  }),
  classes: one(classes, {
    fields: [calendarEvents.classId],
    references: [classes.id],
  }),
}))
