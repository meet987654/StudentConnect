// User type (simplified from shared schema)
export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  university: string | null;
  course: string | null;
  graduationYear: number | null;
  bio: string | null;
  skills: string[] | null;
  githubUrl: string | null;
  twitterHandle: string | null;
  telegramUsername: string | null;
  points: number | null;
  isOnboarded: boolean | null;
  referralCode: string | null;
  referredBy: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Event {
  id: number;
  title: string;
  description: string | null;
  shortDescription: string | null;
  location: string | null;
  date: Date;
  startTime: Date;
  endTime: Date;
  imageUrl: string | null;
  maxAttendees: number | null;
  isFeatured: boolean | null;
  eventType: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface EventRsvp {
  id: number;
  userId: string;
  eventId: number;
  status: string | null;
  createdAt: Date | null;
}

export interface Achievement {
  id: number;
  name: string;
  title: string;
  description: string | null;
  icon: string;
  points: number | null;
  category: string | null;
}

export interface LearningResource {
  id: number;
  title: string;
  description: string | null;
  url: string;
  type: string;
  difficulty: string | null;
  tags: string[] | null;
  createdAt: Date | null;
}

export interface OnboardingStep {
  id: number;
  name: string;
  title: string;
  description: string | null;
  points: number | null;
  order: number;
  isRequired: boolean | null;
}

export interface UserOnboardingProgress {
  id: number;
  userId: string;
  stepId: number;
  isCompleted: boolean | null;
  completedAt: Date | null;
  createdAt: Date | null;
}
