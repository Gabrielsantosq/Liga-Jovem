import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";


export const appRoleEnum = pgEnum("app_role", ["barber", "client"]);


export const User = pgTable (
	"user", {
		 id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  		name: text("name").notNull(),
  		email: text("email").notNull().unique(),
  		emailVerified: boolean("email_verified").default(false).notNull(),
  		image: text("image"),
  		role: appRoleEnum("role").default("client").notNull(),
  		createdAt: timestamp("created_at").defaultNow().notNull(),
 		updatedAt: timestamp("updated_at")
    		.defaultNow()
    		.$onUpdate(() => /* @__PURE__ */ new Date())
    		.notNull(),
    	phone:               text("phone"),
});
