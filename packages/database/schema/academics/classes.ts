import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { school } from "./school"
import { schoolYears } from "./schoolYears"

const shiftEnum = pgEnum("shift", ["morning", "afternoon", "night"])

export const classes = pgTable("classes", {
  id: text("id").primaryKey(),
  schoolId: text("school_id")
    .notNull()
    .references(() => school.id, { onDelete: "cascade" }),
  schoolYearId: text("school_year_id")
    .notNull()
    .references(() => schoolYears.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  gradeLevel: text("grade_level").notNull(),
  shift: text("shift").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const classesRelations = relations(classes, ({ one }) => ({
  school: one(school, { fields: [classes.schoolId], references: [school.id] }),
  schoolYear: one(schoolYears, {
    fields: [classes.schoolYearId],
    references: [schoolYears.id],
  }),
}))
