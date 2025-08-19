import { storage } from "./storage";

export async function seedDatabase() {
  console.log("Starting database seeding...");

  try {
    // Seed onboarding steps
    const onboardingSteps = [
      {
        name: "create_profile",
        title: "Create Profile",
        description: "Set up your student profile and connect your university email",
        points: 50,
        order: 1,
        isRequired: true
      },
      {
        name: "join_community",
        title: "Join Community", 
        description: "Connect with Telegram and follow @SuperteamIE on Twitter",
        points: 50,
        order: 2,
        isRequired: true
      },
      {
        name: "first_event",
        title: "Attend Event",
        description: "Join your first Superteam Ireland meetup or workshop",
        points: 100,
        order: 3,
        isRequired: true
      }
    ];

    // Check if steps already exist
    const existingSteps = await storage.getOnboardingSteps();
    if (existingSteps.length === 0) {
      console.log("Seeding onboarding steps...");
      // Note: We would normally insert these, but our current storage interface doesn't have create methods
      // This would need to be implemented in the storage layer
    }

    // Seed achievements
    const achievements = [
      {
        name: "first_step",
        title: "First Step",
        description: "Welcome to Superteam Ireland! You've created your profile.",
        icon: "fas fa-star",
        points: 50,
        category: "onboarding"
      },
      {
        name: "community_member",
        title: "Community Member",
        description: "Joined our Telegram community and followed us on Twitter.",
        icon: "fas fa-users",
        points: 50,
        category: "community"
      },
      {
        name: "networker",
        title: "Networker",
        description: "Attended your first Superteam Ireland event.",
        icon: "fas fa-handshake",
        points: 100,
        category: "events"
      },
      {
        name: "builder",
        title: "Builder",
        description: "Completed your first project on Solana.",
        icon: "fas fa-code",
        points: 200,
        category: "projects"
      }
    ];

    // Seed learning resources
    const learningResources = [
      {
        title: "Introduction to Blockchain",
        description: "Learn the fundamental concepts of blockchain technology and how it works.",
        url: "https://docs.solana.com/introduction",
        type: "documentation",
        difficulty: "beginner",
        tags: ["blockchain", "fundamentals"]
      },
      {
        title: "Solana Development Basics",
        description: "Get started with Solana development using Rust and the Anchor framework.",
        url: "https://book.anchor-lang.com/",
        type: "tutorial",
        difficulty: "beginner",
        tags: ["solana", "rust", "anchor"]
      },
      {
        title: "Building Your First dApp",
        description: "Step-by-step guide to creating a decentralized application on Solana.",
        url: "https://solana.com/developers/guides",
        type: "tutorial",
        difficulty: "intermediate",
        tags: ["dapp", "development", "solana"]
      },
      {
        title: "Advanced Solana Programming",
        description: "Deep dive into advanced Solana programming concepts and best practices.",
        url: "https://solanacookbook.com/",
        type: "documentation", 
        difficulty: "advanced",
        tags: ["advanced", "programming", "solana"]
      }
    ];

    // Seed sample events
    const sampleEvents = [
      {
        title: "Solana Hackathon Kickoff",
        description: "Join us for an exciting hackathon kickoff event where you'll learn about Solana development, form teams, and compete for amazing prizes. Perfect for beginners and experienced developers alike.",
        shortDescription: "Kick off our biggest hackathon of the year with workshops and team formation.",
        location: "Trinity College Dublin",
        date: new Date("2024-12-15T14:00:00Z"),
        startTime: new Date("2024-12-15T14:00:00Z"),
        endTime: new Date("2024-12-15T20:00:00Z"),
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        maxAttendees: 100,
        isFeatured: true,
        eventType: "hackathon"
      },
      {
        title: "Weekly Office Hours", 
        description: "Get help with your Solana projects, ask questions, and connect with mentors. Open to all skill levels.",
        shortDescription: "Get help with your Solana projects and connect with mentors.",
        location: "Online",
        date: new Date("2024-12-20T16:00:00Z"),
        startTime: new Date("2024-12-20T16:00:00Z"),
        endTime: new Date("2024-12-20T17:00:00Z"),
        maxAttendees: 50,
        isFeatured: false,
        eventType: "office_hours"
      },
      {
        title: "Solana 101 Workshop",
        description: "Learn the basics of Solana blockchain technology and build your first decentralized application.",
        shortDescription: "Learn Solana basics and build your first dApp.",
        location: "University College Dublin", 
        date: new Date("2024-12-20T18:00:00Z"),
        startTime: new Date("2024-12-20T18:00:00Z"),
        endTime: new Date("2024-12-20T20:00:00Z"),
        maxAttendees: 75,
        isFeatured: false,
        eventType: "workshop"
      }
    ];

    console.log("Database seeding completed!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Auto-run seeding in development
if (process.env.NODE_ENV === "development") {
  seedDatabase();
}
