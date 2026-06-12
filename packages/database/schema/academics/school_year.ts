import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { schools } from "./school"

export const schoolYearStatusEnum = pgEnum("school_year_status", [
  "active",
  "inactive",
])

export const schoolYear = pgTable("school_year", {
  id: text("id").primaryKey(),
  status: schoolYearStatusEnum("status"),
  schoolId: text("school_id").references(() => schools.id, {
    onDelete: "cascade",
  }),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const schoolYearRelations = relations(schoolYear, ({ one }) => ({
  school: one(schools, {
    fields: [schoolYear.schoolId],
    references: [schools.id],
  }),
}))
