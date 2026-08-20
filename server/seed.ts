import "dotenv/config";
import { db } from "./db";
import { events, onboardingSteps, achievements, learningResources } from "@shared/schema";

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await db.delete(learningResources);
    await db.delete(achievements);
    await db.delete(onboardingSteps);
    await db.delete(events);

    // Seed onboarding steps
    const onboardingData = [
      {
        name: "profile_setup",
        title: "Complete Your Profile",
        description: "Add your university, course, and skills to help us personalize your experience",
        points: 100,
        order: 1,
        isRequired: true,
      },
      {
        name: "join_telegram",
        title: "Join Telegram Community",
        description: "Connect with other Irish students and stay updated on events",
        points: 50,
        order: 2,
        isRequired: true,
      },
      {
        name: "follow_twitter",
        title: "Follow @SuperteamIE",
        description: "Stay updated with our latest announcements and opportunities",
        points: 50,
        order: 3,
        isRequired: true,
      },
      {
        name: "first_event",
        title: "Attend Your First Event",
        description: "RSVP and attend any Superteam Ireland event",
        points: 200,
        order: 4,
        isRequired: false,
      },
    ];

    await db.insert(onboardingSteps).values(onboardingData);
    console.log("✅ Onboarding steps seeded");

    // Seed sample events
    const eventsData = [
      {
        title: "Solana Development Workshop",
        description: "Learn to build your first dApp on Solana with hands-on coding session. We'll cover Anchor framework, program development, and frontend integration.",
        shortDescription: "Build your first Solana dApp with expert guidance",
        location: "Trinity College Dublin, Hamilton Building",
        date: new Date("2024-12-15T14:00:00Z"),
        startTime: new Date("2024-12-15T14:00:00Z"),
        endTime: new Date("2024-12-15T17:00:00Z"),
        maxAttendees: 50,
        isFeatured: true,
        eventType: "workshop",
        imageUrl: "/api/placeholder/400/200",
      },
      {
        title: "Web3 Career Night",
        description: "Network with Web3 professionals and learn about career opportunities in the Solana ecosystem. Featuring guest speakers from top blockchain companies.",
        shortDescription: "Network with Web3 professionals and explore career paths",
        location: "Dublin City Centre, WeWork",
        date: new Date("2024-12-20T18:00:00Z"),
        startTime: new Date("2024-12-20T18:00:00Z"),
        endTime: new Date("2024-12-20T21:00:00Z"),
        maxAttendees: 100,
        isFeatured: false,
        eventType: "meetup",
      },
      {
        title: "DeFi Hackathon Weekend",
        description: "48-hour hackathon focused on building DeFi applications on Solana. Mentorship from industry experts, prizes worth €10,000.",
        shortDescription: "48-hour DeFi hackathon with €10,000 in prizes",
        location: "UCD Innovation Academy",
        date: new Date("2024-12-28T09:00:00Z"),
        startTime: new Date("2024-12-28T09:00:00Z"),
        endTime: new Date("2024-12-29T18:00:00Z"),
        maxAttendees: 150,
        isFeatured: true,
        eventType: "hackathon",
      },
      {
        title: "Weekly Office Hours",
        description: "Drop-in session for getting help with your Solana projects, career advice, and general Web3 questions.",
        shortDescription: "Get help with your projects and ask questions",
        location: "Online (Discord)",
        date: new Date("2024-12-13T16:00:00Z"),
        startTime: new Date("2024-12-13T16:00:00Z"),
        endTime: new Date("2024-12-13T17:00:00Z"),
        eventType: "office_hours",
      },
    ];

    await db.insert(events).values(eventsData);
    console.log("✅ Events seeded");

    // Seed achievements
    const achievementsData = [
      {
        name: "early_bird",
        title: "Early Bird",
        description: "Joined the community in the first week",
        icon: "fas fa-clock",
        points: 100,
        category: "onboarding",
      },
      {
        name: "profile_complete",
        title: "Profile Master",
        description: "Completed your profile with all details",
        icon: "fas fa-user-check",
        points: 50,
        category: "onboarding",
      },
      {
        name: "community_member",
        title: "Community Member",
        description: "Joined both Telegram and followed Twitter",
        icon: "fas fa-users",
        points: 100,
        category: "community",
      },
      {
        name: "event_attendee",
        title: "Event Attendee",
        description: "Attended your first Superteam event",
        icon: "fas fa-calendar-check",
        points: 200,
        category: "events",
      },
      {
        name: "hackathon_participant",
        title: "Hackathon Hero",
        description: "Participated in a Superteam hackathon",
        icon: "fas fa-code",
        points: 500,
        category: "events",
      },
    ];

    await db.insert(achievements).values(achievementsData);
    console.log("✅ Achievements seeded");

    // Seed learning resources
    const resourcesData = [
      {
        title: "Solana Cookbook",
        description: "Comprehensive guide to building on Solana with examples and best practices",
        url: "https://solanacookbook.com/",
        type: "documentation",
        difficulty: "beginner",
        tags: ["solana", "basics", "development"],
      },
      {
        title: "Anchor Framework Tutorial",
        description: "Learn Anchor, the most popular framework for Solana development",
        url: "https://book.anchor-lang.com/",
        type: "tutorial",
        difficulty: "intermediate",
        tags: ["anchor", "framework", "smart-contracts"],
      },
      {
        title: "Web3.js Guide",
        description: "Complete guide to interacting with Solana programs using Web3.js",
        url: "https://solana-labs.github.io/solana-web3.js/",
        type: "documentation",
        difficulty: "intermediate",
        tags: ["web3js", "frontend", "integration"],
      },
      {
        title: "Rust Programming Language",
        description: "Learn Rust, the primary language for Solana program development",
        url: "https://doc.rust-lang.org/book/",
        type: "tutorial",
        difficulty: "beginner",
        tags: ["rust", "programming", "fundamentals"],
      },
      {
        title: "DeFi Development on Solana",
        description: "Advanced guide to building decentralized finance applications",
        url: "https://github.com/solana-labs/solana-program-library",
        type: "tutorial",
        difficulty: "advanced",
        tags: ["defi", "advanced", "spl-tokens"],
      },
      {
        title: "NFT Metadata Standard",
        description: "Understanding and implementing Metaplex NFT standards",
        url: "https://docs.metaplex.com/",
        type: "documentation",
        difficulty: "intermediate",
        tags: ["nft", "metaplex", "metadata"],
      },
    ];

    await db.insert(learningResources).values(resourcesData);
    console.log("✅ Learning resources seeded");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run if this is the main module
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] === __filename;

if (isMainModule) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seed };