CREATE TABLE IF NOT EXISTS "featured_articles" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"url" varchar NOT NULL,
	"image" varchar NOT NULL,
	"title" varchar NOT NULL,
	"website" varchar NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "featured_articles_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guestbook" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"content" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_images" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"project_id" varchar,
	"image" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" text NOT NULL,
	"url" varchar,
	"github" varchar,
	"image" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_uuid_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
