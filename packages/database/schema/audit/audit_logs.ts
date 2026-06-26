import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"

export const auditLogs = pgTable("audit_logs", {
  id: text("id").primaryKey(),
  actorId: text("actor_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  entityType: text("entity_type").notNull(),
  beforeJson: text("before_json").notNull(),
  afterJson: text("after_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.actorId],
    references: [users.id],
  }),
}))
