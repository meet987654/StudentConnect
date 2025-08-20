import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  serial,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  university: varchar("university"),
  course: varchar("course"),
  graduationYear: integer("graduation_year"),
  bio: text("bio"),
  skills: text("skills").array(),
  githubUrl: varchar("github_url"),
  twitterHandle: varchar("twitter_handle"),
  telegramUsername: varchar("telegram_username"),
  points: integer("points").default(0),
  isOnboarded: boolean("is_onboarded").default(false),
  referralCode: varchar("referral_code").unique(),
  referredBy: varchar("referred_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  shortDescription: text("short_description"),
  location: varchar("location"),
  date: timestamp("date").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  imageUrl: varchar("image_url"),
  maxAttendees: integer("max_attendees"),
  isFeatured: boolean("is_featured").default(false),
  eventType: varchar("event_type").notNull(), // 'workshop', 'hackathon', 'meetup', 'office_hours'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Event RSVPs
export const eventRsvps = pgTable("event_rsvps", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  eventId: integer("event_id").references(() => events.id).notNull(),
  status: varchar("status").default("attending"), // 'attending', 'maybe', 'not_attending'
  createdAt: timestamp("created_at").defaultNow(),
});

// Onboarding steps
export const onboardingSteps = pgTable("onboarding_steps", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  points: integer("points").default(0),
  order: integer("order").notNull(),
  isRequired: boolean("is_required").default(true),
});

// User onboarding progress
export const userOnboardingProgress = pgTable("user_onboarding_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  stepId: integer("step_id").references(() => onboardingSteps.id).notNull(),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  uniqueUserStep: unique("unique_user_step").on(table.userId, table.stepId),
}));

// Achievements/Badges
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  icon: varchar("icon").notNull(),
  points: integer("points").default(0),
  category: varchar("category"), // 'onboarding', 'community', 'events', 'projects'
});

// User achievements
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Learning resources
export const learningResources = pgTable("learning_resources", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  url: varchar("url").notNull(),
  type: varchar("type").notNull(), // 'article', 'video', 'tutorial', 'documentation'
  difficulty: varchar("difficulty"), // 'beginner', 'intermediate', 'advanced'
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// User activity tracking
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  activityType: varchar("activity_type").notNull(), // 'login', 'event_rsvp', 'profile_update', etc.
  metadata: jsonb("metadata"),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  eventRsvps: many(eventRsvps),
  onboardingProgress: many(userOnboardingProgress),
  achievements: many(userAchievements),
  activities: many(userActivities),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  rsvps: many(eventRsvps),
}));

export const eventRsvpsRelations = relations(eventRsvps, ({ one }) => ({
  user: one(users, {
    fields: [eventRsvps.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [eventRsvps.eventId],
    references: [events.id],
  }),
}));

export const onboardingStepsRelations = relations(onboardingSteps, ({ many }) => ({
  userProgress: many(userOnboardingProgress),
}));

export const userOnboardingProgressRelations = relations(userOnboardingProgress, ({ one }) => ({
  user: one(users, {
    fields: [userOnboardingProgress.userId],
    references: [users.id],
  }),
  step: one(onboardingSteps, {
    fields: [userOnboardingProgress.stepId],
    references: [onboardingSteps.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const userActivitiesRelations = relations(userActivities, ({ one }) => ({
  user: one(users, {
    fields: [userActivities.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventRsvpSchema = createInsertSchema(eventRsvps).omit({
  id: true,
  createdAt: true,
});

export const insertOnboardingStepSchema = createInsertSchema(onboardingSteps).omit({
  id: true,
});

export const insertUserOnboardingProgressSchema = createInsertSchema(userOnboardingProgress).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  earnedAt: true,
});

export const insertLearningResourceSchema = createInsertSchema(learningResources).omit({
  id: true,
  createdAt: true,
});

export const insertUserActivitySchema = createInsertSchema(userActivities).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type EventRsvp = typeof eventRsvps.$inferSelect;
export type OnboardingStep = typeof onboardingSteps.$inferSelect;
export type UserOnboardingProgress = typeof userOnboardingProgress.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type LearningResource = typeof learningResources.$inferSelect;
export type UserActivity = typeof userActivities.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertEventRsvp = z.infer<typeof insertEventRsvpSchema>;
export type InsertOnboardingStep = z.infer<typeof insertOnboardingStepSchema>;
export type InsertUserOnboardingProgress = z.infer<typeof insertUserOnboardingProgressSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type InsertLearningResource = z.infer<typeof insertLearningResourceSchema>;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
