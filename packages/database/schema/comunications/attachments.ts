import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"

export const attachments = pgTable("attachments", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id").references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  mimeType: text("mime_type").notNull(),
  size: text("size").notNull(),
})

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  owner: one(users, {
    fields: [attachments.ownerId],
    references: [users.id],
  }),
}))
