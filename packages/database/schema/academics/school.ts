import { pgEnum, pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const schools = pgTable("schools", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  timeZone: text("time_zone"),
  street: text("street"),
  number: text("number"),
  complement: text("complement"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
