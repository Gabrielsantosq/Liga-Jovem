import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"
import { missions } from "./mission"

export const studentMissions = pgTable("student_missions", {
  id: text("id").notNull(),
  studentId: text("student_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  missionId: text("mission_id")
    .references(() => missions.id, { onDelete: "cascade" })
    .notNull(),
  progress: text("progress").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  finishedAt: timestamp("finished_at").notNull(),
})

export const studentMissionsRelations = relations(studentMissions, ({ one }) => ({
  user: one(users, {
    fields: [studentMissions.studentId],
    references: [users.id],
  }),
  mission: one(missions, {
    fields: [studentMissions.missionId],
    references: [missions.id],
  })
}))
