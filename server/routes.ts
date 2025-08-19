import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertEventRsvpSchema, 
  insertUserActivitySchema,
  insertUserOnboardingProgressSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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

  // Update user profile
  app.patch('/api/users/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.updateUserProfile(userId, req.body);
      res.json(user);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Get user leaderboard
  app.get('/api/users/leaderboard', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const topUsers = await storage.getTopUsers(limit);
      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Events routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get('/api/events/featured', async (req, res) => {
    try {
      const events = await storage.getFeaturedEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching featured events:", error);
      res.status(500).json({ message: "Failed to fetch featured events" });
    }
  });

  app.get('/api/events/:id', async (req, res) => {
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

  // RSVP routes
  app.post('/api/events/:id/rsvp', isAuthenticated, async (req: any, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const rsvpData = insertEventRsvpSchema.parse({
        userId,
        eventId,
        status: req.body.status || 'attending'
      });

      const rsvp = await storage.createRsvp(rsvpData);
      
      // Record activity
      await storage.recordUserActivity({
        userId,
        activityType: 'event_rsvp',
        metadata: { eventId, status: rsvpData.status },
        points: 10
      });

      // Update user points
      await storage.updateUserPoints(userId, 10);

      res.json(rsvp);
    } catch (error) {
      console.error("Error creating RSVP:", error);
      res.status(500).json({ message: "Failed to create RSVP" });
    }
  });

  app.get('/api/events/:id/rsvps', async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const rsvps = await storage.getEventRsvps(eventId);
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({ message: "Failed to fetch RSVPs" });
    }
  });

  // Onboarding routes
  app.get('/api/onboarding/steps', async (req, res) => {
    try {
      const steps = await storage.getOnboardingSteps();
      res.json(steps);
    } catch (error) {
      console.error("Error fetching onboarding steps:", error);
      res.status(500).json({ message: "Failed to fetch onboarding steps" });
    }
  });

  app.get('/api/onboarding/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserOnboardingProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching onboarding progress:", error);
      res.status(500).json({ message: "Failed to fetch onboarding progress" });
    }
  });

  app.post('/api/onboarding/complete', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { stepId, completed } = req.body;
      
      const progress = await storage.updateOnboardingProgress(userId, stepId, completed);
      
      // Award points for completing step
      if (completed) {
        await storage.recordUserActivity({
          userId,
          activityType: 'onboarding_step_completed',
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

  // Learning resources
  app.get('/api/resources', async (req, res) => {
    try {
      const difficulty = req.query.difficulty as string;
      const resources = await storage.getLearningResources(difficulty);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching learning resources:", error);
      res.status(500).json({ message: "Failed to fetch learning resources" });
    }
  });

  // Achievements
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get('/api/users/achievements', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  // Analytics and stats
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getPlatformStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching platform stats:", error);
      res.status(500).json({ message: "Failed to fetch platform stats" });
    }
  });

  app.get('/api/users/activities', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const activities = await storage.getUserActivities(userId);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching user activities:", error);
      res.status(500).json({ message: "Failed to fetch user activities" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
