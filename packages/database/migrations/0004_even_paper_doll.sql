CREATE TABLE "audit_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_id" text NOT NULL,
	"entity_type" text NOT NULL,
	"before_json" text NOT NULL,
	"after_json" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text,
	"subject_id" text,
	"completion_percentage" text NOT NULL,
	"performace_percentage" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" text PRIMARY KEY NOT NULL,
	"scholl_id" text,
	"class_id" text,
	"author_id" text,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text,
	"url" text NOT NULL,
	"mime_type" text NOT NULL,
	"size" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendar_events" (
	"id" text PRIMARY KEY NOT NULL,
	"scholl_id" text,
	"class_id" text,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"sender_id" text,
	"receiver_id" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_subject_id_subject_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subject"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_scholl_id_schools_id_fk" FOREIGN KEY ("scholl_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_scholl_id_schools_id_fk" FOREIGN KEY ("scholl_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;