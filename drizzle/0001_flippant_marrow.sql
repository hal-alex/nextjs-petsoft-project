CREATE TABLE "blog_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"author" varchar,
	"views" integer
);
