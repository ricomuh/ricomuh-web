import { pgTable, varchar, serial, text, timestamp } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  content: text("content").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const featuredArticlesTable = pgTable("featured_articles", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull().unique(),
  image: varchar("image").notNull(),
  title: varchar("title").notNull(),
  website: varchar("website").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
