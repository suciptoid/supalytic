DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('owner', 'admin', 'member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "websites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"domain" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "website_users" (
	"user_id" uuid NOT NULL,
	"website_id" uuid NOT NULL,
	"role" "roles" DEFAULT 'owner',
	CONSTRAINT website_users_user_id_website_id PRIMARY KEY("user_id","website_id")
);
