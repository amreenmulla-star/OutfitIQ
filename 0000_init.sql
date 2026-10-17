CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(120) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password_hash" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");

CREATE TABLE IF NOT EXISTS "clothing_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "name" varchar(120) NOT NULL,
  "category" varchar(40) NOT NULL,
  "colour" varchar(40) NOT NULL,
  "season" varchar(40) DEFAULT 'all' NOT NULL,
  "occasion" varchar(40) DEFAULT 'casual' NOT NULL,
  "image_url" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "clothing_items_user_id_idx" ON "clothing_items" ("user_id");
CREATE INDEX IF NOT EXISTS "clothing_items_category_idx" ON "clothing_items" ("category");

CREATE TABLE IF NOT EXISTS "outfits" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "name" varchar(120) NOT NULL,
  "occasion" varchar(40) DEFAULT 'casual' NOT NULL,
  "description" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "outfits_user_id_idx" ON "outfits" ("user_id");

CREATE TABLE IF NOT EXISTS "outfit_items" (
  "outfit_id" uuid NOT NULL REFERENCES "outfits"("id") ON DELETE cascade,
  "clothing_item_id" uuid NOT NULL REFERENCES "clothing_items"("id") ON DELETE cascade,
  PRIMARY KEY ("outfit_id", "clothing_item_id")
);

CREATE TABLE IF NOT EXISTS "early_access_signups" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(120) NOT NULL,
  "email" varchar(255) NOT NULL,
  "interest_category" varchar(60),
  "consent" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "early_access_email_idx" ON "early_access_signups" ("email");

CREATE TABLE IF NOT EXISTS "user_preferences" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "preferred_colours" text,
  "preferred_styles" text,
  "preferred_occasions" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "user_preferences_user_id_idx" ON "user_preferences" ("user_id");

CREATE TABLE IF NOT EXISTS "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "token" varchar(128) NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_token_idx" ON "sessions" ("token");
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" ("user_id");
