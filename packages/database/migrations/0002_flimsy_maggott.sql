ALTER TABLE "classes" ALTER COLUMN "school_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "school_year_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "shift" SET DEFAULT 'morning';--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "code" text;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_code_unique" UNIQUE("code");