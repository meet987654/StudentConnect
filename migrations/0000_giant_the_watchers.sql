CREATE TABLE "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"icon" varchar NOT NULL,
	"points" integer DEFAULT 0,
	"category" varchar
);
--> statement-breakpoint
CREATE TABLE "event_rsvps" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"event_id" integer NOT NULL,
	"status" varchar DEFAULT 'attending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"short_description" text,
	"location" varchar,
	"date" timestamp NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"image_url" varchar,
	"max_attendees" integer,
	"is_featured" boolean DEFAULT false,
	"event_type" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "learning_resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"url" varchar NOT NULL,
	"type" varchar NOT NULL,
	"difficulty" varchar,
	"tags" text[],
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "onboarding_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"points" integer DEFAULT 0,
	"order" integer NOT NULL,
	"is_required" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"achievement_id" integer NOT NULL,
	"earned_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"activity_type" varchar NOT NULL,
	"metadata" jsonb,
	"points" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_onboarding_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"step_id" integer NOT NULL,
	"is_completed" boolean DEFAULT false,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "unique_user_step" UNIQUE("user_id","step_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"university" varchar,
	"course" varchar,
	"graduation_year" integer,
	"bio" text,
	"skills" text[],
	"github_url" varchar,
	"twitter_handle" varchar,
	"telegram_username" varchar,
	"points" integer DEFAULT 0,
	"is_onboarded" boolean DEFAULT false,
	"referral_code" varchar,
	"referred_by" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_onboarding_progress" ADD CONSTRAINT "user_onboarding_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_onboarding_progress" ADD CONSTRAINT "user_onboarding_progress_step_id_onboarding_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."onboarding_steps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");