# Superteam Ireland Student Onboarding Platform

## Overview

This is a modern web application built for Superteam Ireland's student onboarding program. The platform provides a comprehensive system for university students to join the Web3 community, participate in events, track learning progress, and connect with peers. The application features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database with Drizzle ORM for type-safe database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a monorepo structure with clear separation between client, server, and shared code. The frontend is built with React and Vite for fast development and hot module replacement, while the backend uses Express.js with TypeScript for type safety throughout the stack.

### Frontend Architecture
- **Framework**: React 18 with TypeScript for component-based UI development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Custom component library built on Radix UI primitives with Tailwind CSS for styling
- **Build Tool**: Vite for fast development builds and hot module replacement
- **Design System**: Shadcn/ui components with consistent theming and dark mode support

### Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API development
- **Database ORM**: Drizzle ORM for type-safe database queries and migrations
- **Authentication**: OpenID Connect (OIDC) integration with Replit authentication system
- **Session Management**: Express sessions with PostgreSQL store using connect-pg-simple
- **API Structure**: RESTful endpoints with consistent error handling and logging middleware

### Database Design
The application uses PostgreSQL with a well-structured schema including:
- **User Management**: Comprehensive user profiles with university information, skills, and social connections
- **Event System**: Events with RSVP functionality and categorization
- **Onboarding Flow**: Step-based onboarding with progress tracking and point rewards
- **Achievement System**: Gamified achievements to encourage engagement
- **Learning Resources**: Structured learning content with difficulty levels and progress tracking
- **Activity Logging**: User activity tracking for analytics and engagement metrics

### Authentication & Security
- **OIDC Integration**: Secure authentication through Replit's OpenID Connect provider
- **Session Security**: HTTP-only cookies with secure session storage
- **Route Protection**: Middleware-based authentication checks for protected endpoints
- **CORS Configuration**: Proper cross-origin request handling for development and production

### Data Management
- **Type Safety**: End-to-end TypeScript with shared types between frontend and backend
- **Schema Validation**: Zod schemas for runtime type checking and API validation
- **Database Migrations**: Drizzle Kit for database schema management and migrations
- **Optimistic Updates**: TanStack Query for optimistic UI updates and error handling

## External Dependencies

### Database & Storage
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Drizzle ORM**: Type-safe database queries with automatic TypeScript inference
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Authentication Services
- **Replit OIDC**: OpenID Connect integration for secure user authentication
- **Passport.js**: Authentication middleware with OpenID Connect strategy

### Frontend Libraries
- **Radix UI**: Accessible component primitives for building the UI component library
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **TanStack Query**: Powerful data synchronization for React applications
- **Wouter**: Minimalist routing library for React

### Development Tools
- **Vite**: Fast build tool with TypeScript support and hot module replacement
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **TypeScript**: Static type checking throughout the application stack