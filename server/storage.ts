import {
  users,
  events,
  eventRsvps,
  onboardingSteps,
  userOnboardingProgress,
  achievements,
  userAchievements,
  learningResources,
  userActivities,
  type User,
  type UpsertUser,
  type Event,
  type EventRsvp,
  type OnboardingStep,
  type UserOnboardingProgress,
  type Achievement,
  type UserAchievement,
  type LearningResource,
  type UserActivity,
  type InsertEvent,
  type InsertEventRsvp,
  type InsertOnboardingStep,
  type InsertUserOnboardingProgress,
  type InsertAchievement,
  type InsertUserAchievement,
  type InsertLearningResource,
  type InsertUserActivity,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, sql, and, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUserProfile(id: string, data: Partial<UpsertUser>): Promise<User>;
  updateUserPoints(id: string, points: number): Promise<User>;
  getTopUsers(limit?: number): Promise<User[]>;

  // Event operations
  getEvents(): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;

  // RSVP operations
  createRsvp(rsvp: InsertEventRsvp): Promise<EventRsvp>;
  getUserRsvps(userId: string): Promise<EventRsvp[]>;
  getEventRsvps(eventId: number): Promise<EventRsvp[]>;
  updateRsvp(userId: string, eventId: number, status: string): Promise<EventRsvp>;

  // Onboarding operations
  getOnboardingSteps(): Promise<OnboardingStep[]>;
  getUserOnboardingProgress(userId: string): Promise<UserOnboardingProgress[]>;
  updateOnboardingProgress(userId: string, stepId: number, completed: boolean): Promise<UserOnboardingProgress>;

  // Achievement operations
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  grantAchievement(userId: string, achievementId: number): Promise<UserAchievement>;

  // Learning resources
  getLearningResources(difficulty?: string): Promise<LearningResource[]>;

  // Analytics
  recordUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  getUserActivities(userId: string): Promise<UserActivity[]>;
  getPlatformStats(): Promise<{
    totalUsers: number;
    totalEvents: number;
    totalProjects: number;
    activeUsers: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.email,
        set: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async updateUserProfile(id: string, data: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserPoints(id: string, pointsToAdd: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        points: sql`${users.points} + ${pointsToAdd}`,
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getTopUsers(limit: number = 10): Promise<User[]> {
    return db
      .select()
      .from(users)
      .orderBy(desc(users.points))
      .limit(limit);
  }

  // Event operations
  async getEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(asc(events.date));
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return db
      .select()
      .from(events)
      .where(eq(events.isFeatured, true))
      .orderBy(asc(events.date));
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  async updateEvent(id: number, eventData: Partial<InsertEvent>): Promise<Event> {
    const [event] = await db
      .update(events)
      .set({ ...eventData, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return event;
  }

  // RSVP operations
  async createRsvp(rsvp: InsertEventRsvp): Promise<EventRsvp> {
    const [newRsvp] = await db.insert(eventRsvps).values(rsvp).returning();
    return newRsvp;
  }

  async getUserRsvps(userId: string): Promise<EventRsvp[]> {
    return db.select().from(eventRsvps).where(eq(eventRsvps.userId, userId));
  }

  async getEventRsvps(eventId: number): Promise<EventRsvp[]> {
    return db.select().from(eventRsvps).where(eq(eventRsvps.eventId, eventId));
  }

  async updateRsvp(userId: string, eventId: number, status: string): Promise<EventRsvp> {
    const [rsvp] = await db
      .update(eventRsvps)
      .set({ status })
      .where(and(
        eq(eventRsvps.userId, userId),
        eq(eventRsvps.eventId, eventId)
      ))
      .returning();
    return rsvp;
  }

  // Onboarding operations
  async getOnboardingSteps(): Promise<OnboardingStep[]> {
    return db.select().from(onboardingSteps).orderBy(asc(onboardingSteps.order));
  }

  async getUserOnboardingProgress(userId: string): Promise<UserOnboardingProgress[]> {
    return db
      .select()
      .from(userOnboardingProgress)
      .where(eq(userOnboardingProgress.userId, userId));
  }

  async updateOnboardingProgress(
    userId: string, 
    stepId: number, 
    completed: boolean
  ): Promise<UserOnboardingProgress> {
    const [progress] = await db
      .insert(userOnboardingProgress)
      .values({
        userId,
        stepId,
        isCompleted: completed,
        completedAt: completed ? new Date() : null,
      })
      .onConflictDoUpdate({
        target: [userOnboardingProgress.userId, userOnboardingProgress.stepId],
        set: {
          isCompleted: completed,
          completedAt: completed ? new Date() : null,
        },
      })
      .returning();
    return progress;
  }

  // Achievement operations
  async getAchievements(): Promise<Achievement[]> {
    return db.select().from(achievements);
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }

  async grantAchievement(userId: string, achievementId: number): Promise<UserAchievement> {
    const [achievement] = await db
      .insert(userAchievements)
      .values({ userId, achievementId })
      .returning();
    return achievement;
  }

  // Learning resources
  async getLearningResources(difficulty?: string): Promise<LearningResource[]> {
    if (difficulty) {
      return db
        .select()
        .from(learningResources)
        .where(eq(learningResources.difficulty, difficulty));
    }
    return db.select().from(learningResources);
  }

  // Analytics
  async recordUserActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const [newActivity] = await db.insert(userActivities).values(activity).returning();
    return newActivity;
  }

  async getUserActivities(userId: string): Promise<UserActivity[]> {
    return db
      .select()
      .from(userActivities)
      .where(eq(userActivities.userId, userId))
      .orderBy(desc(userActivities.createdAt));
  }

  async getPlatformStats(): Promise<{
    totalUsers: number;
    totalEvents: number;
    totalProjects: number;
    activeUsers: number;
  }> {
    const totalUsersResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    const totalEventsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(events);

    // Active users in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsersResult = await db
      .select({ count: sql<number>`count(distinct user_id)` })
      .from(userActivities)
      .where(sql`created_at >= ${thirtyDaysAgo}`);

    return {
      totalUsers: totalUsersResult[0]?.count || 0,
      totalEvents: totalEventsResult[0]?.count || 0,
      totalProjects: 0, // This would come from a projects table if implemented
      activeUsers: activeUsersResult[0]?.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();