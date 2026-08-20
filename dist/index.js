var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default;
var init_vite_config = __esm({
  async "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react(),
        runtimeErrorOverlay(),
        ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
          await import("@replit/vite-plugin-cartographer").then(
            (m) => m.cartographer()
          )
        ] : []
      ],
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "client", "src"),
          "@shared": path.resolve(import.meta.dirname, "shared"),
          "@assets": path.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true
      },
      server: {
        fs: {
          strict: true,
          deny: ["**/.*"]
        }
      }
    });
  }
});

// server/vite.ts
var vite_exports = {};
__export(vite_exports, {
  log: () => log,
  serveStatic: () => serveStatic,
  setupVite: () => setupVite
});
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  try {
    const serverOptions = {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true
    };
    const vite = await createViteServer({
      ...vite_config_default,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          viteLogger.error(msg, options);
        }
      },
      server: serverOptions,
      appType: "custom"
    });
    app2.use(vite.middlewares);
    app2.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const clientTemplate = path2.resolve(
          import.meta.dirname,
          "..",
          "client",
          "index.html"
        );
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        viteLogger.error(`Error serving ${url}: ${e.message}`);
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
    log("Vite dev server initialized", "vite");
  } catch (error) {
    log(`Failed to initialize Vite: ${error.message}`, "vite");
    throw error;
  }
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}
var viteLogger;
var init_vite = __esm({
  async "server/vite.ts"() {
    "use strict";
    await init_vite_config();
    viteLogger = createLogger();
  }
});

// server/static.ts
var static_exports = {};
__export(static_exports, {
  serveStatic: () => serveStatic2
});
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
function serveStatic2(app2) {
  const distPath = path3.resolve(process.cwd(), "dist", "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}
var init_static = __esm({
  "server/static.ts"() {
    "use strict";
  }
});

// server/index.ts
import "dotenv/config";
import express3 from "express";
import { createServer as createServer2 } from "http";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  achievements: () => achievements,
  achievementsRelations: () => achievementsRelations,
  eventRsvps: () => eventRsvps,
  eventRsvpsRelations: () => eventRsvpsRelations,
  events: () => events,
  eventsRelations: () => eventsRelations,
  insertAchievementSchema: () => insertAchievementSchema,
  insertEventRsvpSchema: () => insertEventRsvpSchema,
  insertEventSchema: () => insertEventSchema,
  insertLearningResourceSchema: () => insertLearningResourceSchema,
  insertOnboardingStepSchema: () => insertOnboardingStepSchema,
  insertUserAchievementSchema: () => insertUserAchievementSchema,
  insertUserActivitySchema: () => insertUserActivitySchema,
  insertUserOnboardingProgressSchema: () => insertUserOnboardingProgressSchema,
  insertUserSchema: () => insertUserSchema,
  learningResources: () => learningResources,
  onboardingSteps: () => onboardingSteps,
  onboardingStepsRelations: () => onboardingStepsRelations,
  sessions: () => sessions,
  upsertUserSchema: () => upsertUserSchema,
  userAchievements: () => userAchievements,
  userAchievementsRelations: () => userAchievementsRelations,
  userActivities: () => userActivities,
  userActivitiesRelations: () => userActivitiesRelations,
  userOnboardingProgress: () => userOnboardingProgress,
  userOnboardingProgressRelations: () => userOnboardingProgressRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { sql } from "drizzle-orm";
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
  unique
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
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
  updatedAt: timestamp("updated_at").defaultNow()
});
var events = pgTable("events", {
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
  eventType: varchar("event_type").notNull(),
  // 'workshop', 'hackathon', 'meetup', 'office_hours'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var eventRsvps = pgTable("event_rsvps", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  eventId: integer("event_id").references(() => events.id).notNull(),
  status: varchar("status").default("attending"),
  // 'attending', 'maybe', 'not_attending'
  createdAt: timestamp("created_at").defaultNow()
});
var onboardingSteps = pgTable("onboarding_steps", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  points: integer("points").default(0),
  order: integer("order").notNull(),
  isRequired: boolean("is_required").default(true)
});
var userOnboardingProgress = pgTable("user_onboarding_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  stepId: integer("step_id").references(() => onboardingSteps.id).notNull(),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow()
}, (table) => ({
  uniqueUserStep: unique("unique_user_step").on(table.userId, table.stepId)
}));
var achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  icon: varchar("icon").notNull(),
  points: integer("points").default(0),
  category: varchar("category")
  // 'onboarding', 'community', 'events', 'projects'
});
var userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  earnedAt: timestamp("earned_at").defaultNow()
});
var learningResources = pgTable("learning_resources", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  url: varchar("url").notNull(),
  type: varchar("type").notNull(),
  // 'article', 'video', 'tutorial', 'documentation'
  difficulty: varchar("difficulty"),
  // 'beginner', 'intermediate', 'advanced'
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow()
});
var userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  activityType: varchar("activity_type").notNull(),
  // 'login', 'event_rsvp', 'profile_update', etc.
  metadata: jsonb("metadata"),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var usersRelations = relations(users, ({ many }) => ({
  eventRsvps: many(eventRsvps),
  onboardingProgress: many(userOnboardingProgress),
  achievements: many(userAchievements),
  activities: many(userActivities)
}));
var eventsRelations = relations(events, ({ many }) => ({
  rsvps: many(eventRsvps)
}));
var eventRsvpsRelations = relations(eventRsvps, ({ one }) => ({
  user: one(users, {
    fields: [eventRsvps.userId],
    references: [users.id]
  }),
  event: one(events, {
    fields: [eventRsvps.eventId],
    references: [events.id]
  })
}));
var onboardingStepsRelations = relations(onboardingSteps, ({ many }) => ({
  userProgress: many(userOnboardingProgress)
}));
var userOnboardingProgressRelations = relations(userOnboardingProgress, ({ one }) => ({
  user: one(users, {
    fields: [userOnboardingProgress.userId],
    references: [users.id]
  }),
  step: one(onboardingSteps, {
    fields: [userOnboardingProgress.stepId],
    references: [onboardingSteps.id]
  })
}));
var achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements)
}));
var userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id]
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id]
  })
}));
var userActivitiesRelations = relations(userActivities, ({ one }) => ({
  user: one(users, {
    fields: [userActivities.userId],
    references: [users.id]
  })
}));
var insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true
});
var upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true
});
var insertEventSchema = createInsertSchema(events).extend({
  date: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertEventRsvpSchema = createInsertSchema(eventRsvps).omit({
  id: true,
  createdAt: true
});
var insertOnboardingStepSchema = createInsertSchema(onboardingSteps).omit({
  id: true
});
var insertUserOnboardingProgressSchema = createInsertSchema(userOnboardingProgress).omit({
  id: true,
  createdAt: true
});
var insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true
});
var insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  earnedAt: true
});
var insertLearningResourceSchema = createInsertSchema(learningResources).omit({
  id: true,
  createdAt: true
});
var insertUserActivitySchema = createInsertSchema(userActivities).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
console.log("Initializing database connection...");
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5e3,
  idleTimeoutMillis: 3e4
});
var db = drizzle({ client: pool, schema: schema_exports });
console.log("Database connection initialized");

// server/storage.ts
import { eq, desc, asc, sql as sql2, and } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.email,
      set: {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async updateUserProfile(id, data) {
    const [user] = await db.update(users).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return user;
  }
  async updateUserPoints(id, pointsToAdd) {
    const [user] = await db.update(users).set({
      points: sql2`${users.points} + ${pointsToAdd}`,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, id)).returning();
    return user;
  }
  async getTopUsers(limit = 10) {
    return db.select().from(users).orderBy(desc(users.points)).limit(limit);
  }
  // Event operations
  async getEvents() {
    return db.select().from(events).orderBy(asc(events.date));
  }
  async getFeaturedEvents() {
    return db.select().from(events).where(eq(events.isFeatured, true)).orderBy(asc(events.date));
  }
  async getEvent(id) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }
  async createEvent(event) {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
  async updateEvent(id, eventData) {
    const [event] = await db.update(events).set({ ...eventData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(events.id, id)).returning();
    return event;
  }
  // RSVP operations
  async createRsvp(rsvp) {
    const [newRsvp] = await db.insert(eventRsvps).values(rsvp).returning();
    return newRsvp;
  }
  async getUserRsvps(userId) {
    return db.select().from(eventRsvps).where(eq(eventRsvps.userId, userId));
  }
  async getEventRsvps(eventId) {
    return db.select().from(eventRsvps).where(eq(eventRsvps.eventId, eventId));
  }
  async updateRsvp(userId, eventId, status) {
    const [rsvp] = await db.update(eventRsvps).set({ status }).where(and(
      eq(eventRsvps.userId, userId),
      eq(eventRsvps.eventId, eventId)
    )).returning();
    return rsvp;
  }
  // Onboarding operations
  async getOnboardingSteps() {
    return db.select().from(onboardingSteps).orderBy(asc(onboardingSteps.order));
  }
  async getUserOnboardingProgress(userId) {
    return db.select().from(userOnboardingProgress).where(eq(userOnboardingProgress.userId, userId));
  }
  async updateOnboardingProgress(userId, stepId, completed) {
    const [progress] = await db.insert(userOnboardingProgress).values({
      userId,
      stepId,
      isCompleted: completed,
      completedAt: completed ? /* @__PURE__ */ new Date() : null
    }).onConflictDoUpdate({
      target: [userOnboardingProgress.userId, userOnboardingProgress.stepId],
      set: {
        isCompleted: completed,
        completedAt: completed ? /* @__PURE__ */ new Date() : null
      }
    }).returning();
    return progress;
  }
  // Achievement operations
  async getAchievements() {
    return db.select().from(achievements);
  }
  async getUserAchievements(userId) {
    return db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }
  async grantAchievement(userId, achievementId) {
    const [achievement] = await db.insert(userAchievements).values({ userId, achievementId }).returning();
    return achievement;
  }
  // Learning resources
  async getLearningResources(difficulty) {
    if (difficulty) {
      return db.select().from(learningResources).where(eq(learningResources.difficulty, difficulty));
    }
    return db.select().from(learningResources);
  }
  // Analytics
  async recordUserActivity(activity) {
    const [newActivity] = await db.insert(userActivities).values(activity).returning();
    return newActivity;
  }
  async getUserActivities(userId) {
    return db.select().from(userActivities).where(eq(userActivities.userId, userId)).orderBy(desc(userActivities.createdAt));
  }
  async getPlatformStats() {
    const totalUsersResult = await db.select({ count: sql2`count(*)` }).from(users);
    const totalEventsResult = await db.select({ count: sql2`count(*)` }).from(events);
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsersResult = await db.select({ count: sql2`count(distinct user_id)` }).from(userActivities).where(sql2`created_at >= ${thirtyDaysAgo}`);
    return {
      totalUsers: totalUsersResult[0]?.count || 0,
      totalEvents: totalEventsResult[0]?.count || 0,
      totalProjects: 0,
      // This would come from a projects table if implemented
      activeUsers: activeUsersResult[0]?.count || 0
    };
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
var MemoryStoreSession = MemoryStore(session);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  console.log("Using memory store for sessions");
  const sessionStore = new MemoryStoreSession({
    checkPeriod: 864e5
    // prune expired entries every 24h
  });
  return session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      // Disable for development
      maxAge: sessionTtl
    }
  });
}
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = scryptSync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        if (!user || !comparePasswords(password, user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const user = await storage.createUser({
        email,
        password: hashPassword(password)
      });
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(201).json({ message: "Registered successfully", user: { id: user.id, email: user.email } });
      });
    } catch (err) {
      next(err);
    }
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in successfully", user: req.user });
  });
  app2.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.json({ message: "Logged out successfully" });
    });
  });
  app2.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { password, ...user } = req.user;
    res.json(user);
  });
}
var isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

// server/routes.ts
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.patch("/api/users/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.updateUserProfile(userId, req.body);
      res.json(user);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.get("/api/users/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const topUsers = await storage.getTopUsers(limit);
      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getEvents();
      res.json(events2);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/featured", async (req, res) => {
    try {
      const events2 = await storage.getFeaturedEvents();
      res.json(events2);
    } catch (error) {
      console.error("Error fetching featured events:", error);
      res.status(500).json({ message: "Failed to fetch featured events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app2.post("/api/events/:id/rsvp", isAuthenticated, async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const userId = req.user.id;
      const rsvpData = insertEventRsvpSchema.parse({
        userId,
        eventId,
        status: req.body.status || "attending"
      });
      const rsvp = await storage.createRsvp(rsvpData);
      await storage.recordUserActivity({
        userId,
        activityType: "event_rsvp",
        metadata: { eventId, status: rsvpData.status },
        points: 10
      });
      await storage.updateUserPoints(userId, 10);
      res.json(rsvp);
    } catch (error) {
      console.error("Error creating RSVP:", error);
      res.status(500).json({ message: "Failed to create RSVP" });
    }
  });
  app2.post("/api/events", isAuthenticated, async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });
  app2.get("/api/events/:id/rsvps", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const rsvps = await storage.getEventRsvps(eventId);
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({ message: "Failed to fetch RSVPs" });
    }
  });
  app2.get("/api/onboarding/steps", async (req, res) => {
    try {
      const steps = await storage.getOnboardingSteps();
      res.json(steps);
    } catch (error) {
      console.error("Error fetching onboarding steps:", error);
      res.status(500).json({ message: "Failed to fetch onboarding steps" });
    }
  });
  app2.get("/api/onboarding/progress", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const progress = await storage.getUserOnboardingProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching onboarding progress:", error);
      res.status(500).json({ message: "Failed to fetch onboarding progress" });
    }
  });
  app2.post("/api/onboarding/complete", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { stepId, completed } = req.body;
      const progress = await storage.updateOnboardingProgress(userId, stepId, completed);
      if (completed) {
        await storage.recordUserActivity({
          userId,
          activityType: "onboarding_step_completed",
          metadata: { stepId },
          points: 50
        });
        await storage.updateUserPoints(userId, 50);
      }
      res.json(progress);
    } catch (error) {
      console.error("Error updating onboarding progress:", error);
      res.status(500).json({ message: "Failed to update onboarding progress" });
    }
  });
  app2.get("/api/resources/:difficulty", async (req, res) => {
    try {
      const difficulty = req.params.difficulty;
      const resources = await storage.getLearningResources(difficulty);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching learning resources:", error);
      res.status(500).json({ message: "Failed to fetch learning resources" });
    }
  });
  app2.get("/api/achievements", async (req, res) => {
    try {
      const achievements2 = await storage.getAchievements();
      res.json(achievements2);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });
  app2.get("/api/users/achievements", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const achievements2 = await storage.getUserAchievements(userId);
      res.json(achievements2);
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });
  app2.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getPlatformStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching platform stats:", error);
      res.status(500).json({ message: "Failed to fetch platform stats" });
    }
  });
  app2.get("/api/users/activities", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const activities = await storage.getUserActivities(userId);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching user activities:", error);
      res.status(500).json({ message: "Failed to fetch user activities" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
function log2(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
var app = express3();
app.use((req, res, next) => {
  console.log(`>>> INCOMING REQUEST: ${req.method} ${req.url}`);
  next();
});
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log2(logLine);
    }
  });
  next();
});
async function buildApp() {
  await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    log2(`Error: ${message}`, "error");
    res.status(status).json({ message });
  });
  if (process.env.NODE_ENV === "development") {
    const { setupVite: setupVite2 } = await init_vite().then(() => vite_exports);
    await setupVite2(app, createServer2(app));
  } else {
    const { serveStatic: serveStatic3 } = await Promise.resolve().then(() => (init_static(), static_exports));
    serveStatic3(app);
  }
  return app;
}
var appPromise;
if (!process.env.VERCEL) {
  (appPromise ??= buildApp()).then((builtApp) => {
    const port = parseInt(process.env.PORT || "3001", 10);
    createServer2(builtApp).listen(port, "0.0.0.0", () => {
      log2(`serving on port ${port}`);
    });
  });
}
async function handler(req, res) {
  const builtApp = await (appPromise ??= buildApp());
  builtApp(req, res);
}
export {
  handler as default
};
