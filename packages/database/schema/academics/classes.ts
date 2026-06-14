import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { schools } from "./school"
import { schoolYear } from "./school_year"

const shiftEnum = pgEnum("shift", ["morning", "afternoon", "night"])

export const classes = pgTable("classes", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").references(() => schools.id, { onDelete: "cascade" }),
  schoolYearId: text("school_year_id").references(() => schoolYear.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  gradeLevel: text("grade_level").notNull(),
  shift: text("shift").notNull().default("morning"),
  code: text("code").unique(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const classesRelations = relations(classes, ({ one }) => ({
  school: one(schools, { fields: [classes.schoolId], references: [schools.id] }),
  schoolYear: one(schoolYear, {
    fields: [classes.schoolYearId],
    references: [schoolYear.id],
  }),
}))
