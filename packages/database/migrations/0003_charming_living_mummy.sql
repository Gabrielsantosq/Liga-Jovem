CREATE TABLE "badges" (
	"badge" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"rarity" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "level" (
	"id" text PRIMARY KEY NOT NULL,
	"level" text NOT NULL,
	"xp_required" text NOT NULL,
	"reward_description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "missions" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"xp_reward" text NOT NULL,
	"recurency" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "streaks" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"current_streak" text NOT NULL,
	"best_streak" text NOT NULL,
	"last_activity_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "student_badges" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"badge_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_missions" (
	"id" text NOT NULL,
	"student_id" text NOT NULL,
	"mission_id" text NOT NULL,
	"progress" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "xp" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"amount" text NOT NULL,
	"source_type" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "streaks" ADD CONSTRAINT "streaks_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_badges" ADD CONSTRAINT "student_badges_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_badges" ADD CONSTRAINT "student_badges_badge_id_badges_badge_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("badge") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_missions" ADD CONSTRAINT "student_missions_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_missions" ADD CONSTRAINT "student_missions_mission_id_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp" ADD CONSTRAINT "xp_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;