import { relations } from "drizzle-orm";
import {
  pgTable,
  // integer,
  varchar,
  // serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: varchar("uuid").primaryKey(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  content: text("content").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const featuredArticles = pgTable("featured_articles", {
  id: varchar("uuid").primaryKey(),
  url: varchar("url").notNull().unique(),
  image: varchar("image").notNull(),
  title: varchar("title").notNull(),
  website: varchar("website").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("uuid").primaryKey(),
  featured: boolean("featured").notNull().default(false),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  description: text("description").notNull(),
  url: varchar("url"),
  github: varchar("github"),
  image: varchar("image").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const projectImages = pgTable("project_images", {
  id: varchar("uuid").primaryKey(),
  // projectId: integer("project_id").references(() => projects.id, {
  //   onDelete: "cascade",
  // }),
  projectId: varchar("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  image: varchar("image").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("uuid").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const guestbook = pgTable("guestbook", {
  id: varchar("uuid").primaryKey(),
  name: varchar("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
}));
