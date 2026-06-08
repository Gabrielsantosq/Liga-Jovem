import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { classes } from "./classes"
import { users } from "./users"
import { topics } from "./topics"

const activityTypeEnum = pgEnum("activity_type", [
  "quiz",
  "assignment",
  "lecture",
  "discussion",
])

export const activities = pgTable("activities", {
  id: text("id").primaryKey(),
  classId: text("class_id").references(() => classes.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  topicId: text("topic_id").references(() => topics.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  difficulty: text("difficulty"),
  score: text("score"),
  dueDate: timestamp("due_date"),
  status: text("status"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const activitiesRelations = relations(activities, ({ one }) => ({
  class: one(classes, {
    fields: [activities.classId],
    references: [classes.id],
  }),
  user: one(users, { fields: [activities.userId], references: [users.id] }),
  topic: one(topics, { fields: [activities.topicId], references: [topics.id] }),
  }),
}))

export const activityTypeEnumValues = activityTypeEnum.enumValues
