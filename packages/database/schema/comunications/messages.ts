import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "../academics/users"

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  senderId: text("sender_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  receiverId: text("receiver_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const messagesRealtions = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
  }),
}))
