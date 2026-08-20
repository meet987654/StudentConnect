# 🎓 StudentConnect

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)](https://www.typescriptlang.org/)

> A comprehensive platform connecting students through events, communities, and shared resources.

StudentConnect is a modern web application designed to help students connect, collaborate, and grow together. Whether you're organizing campus events, joining communities, or sharing resources, StudentConnect makes it seamless and intuitive.

## ✨ Features

- 🎯 **Event Management** - Create, discover, and join student events
- 👥 **Community Building** - Connect with like-minded students and groups
- 📚 **Resource Sharing** - Share and access educational materials
- 📊 **Analytics Dashboard** - Track engagement and participation metrics
- 🔐 **Secure Authentication** - Safe and secure user authentication
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query** - Powerful data fetching
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe backend
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Robust database (Neon)
- **Passport.js** - Authentication middleware

### DevOps & Tools
- **Vite** - Lightning-fast build tool
- **ESBuild** - Fast bundler
- **Drizzle Kit** - Database migrations
- **Cross-env** - Cross-platform environment variables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (or Neon account)
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/meet987654/StudentConnect.git
cd StudentConnect
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this

# Server Configuration (optional)
PORT=5000
NODE_ENV=development
```

**Getting a Database URL:**
- **Option 1 - Neon (Recommended)**: Create a free PostgreSQL database at [neon.tech](https://neon.tech)
- **Option 2 - Local**: Install PostgreSQL locally and create a database

### 4. Database Setup

```bash
# Push database schema
npm run db:push
```

### 5. Run the Application

**Development Mode:**
```bash
# Start backend server (runs on port 5000)
npm run dev
```

The application will be available at `http://localhost:5000`

**Production Build:**
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
StudentConnect/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── analytics/ # Analytics components
│   │   │   ├── community/ # Community components
│   │   │   ├── events/    # Event components
│   │   │   ├── navigation/# Navigation components
│   │   │   ├── onboarding/# Onboarding components
│   │   │   └── ui/        # UI component library
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   └── index.tsx      # Entry point
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Backend application
│   ├── db.ts             # Database connection
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── replitAuth.ts     # Authentication logic
│   ├── seed.ts           # Database seeding
│   └── vite.ts           # Vite integration
├── shared/               # Shared code (types, schemas)
├── .env                  # Environment variables (not in git)
├── .gitignore           # Git ignore rules
├── drizzle.config.ts    # Drizzle ORM config
├── package.json         # Backend dependencies
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type-check TypeScript
- `npm run db:push` - Push database schema changes

### Frontend
- `cd client && npm start` - Start development server
- `cd client && npm run build` - Build for production
- `cd client && npm test` - Run tests

## 🤝 Contributing

We love contributions! StudentConnect is an open-source project and we welcome contributions of all kinds.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/meet987654/StudentConnect.git
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Test your changes thoroughly

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Amazing new feature"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes clearly
   - Link any related issues

### Contribution Guidelines

- **Code Quality**: Write clean, maintainable code
- **Testing**: Test your changes before submitting
- **Documentation**: Update docs if you change functionality
- **Commits**: Use clear, descriptive commit messages
- **Issues**: Check existing issues before creating new ones

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌐 Internationalization
- ⚡ Performance optimizations
- 🧪 Test coverage

## 📝 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

## 💡 Feature Requests

Have an idea? We'd love to hear it! Open an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who help improve StudentConnect
- Built with amazing open-source tools and libraries
- Inspired by the student community

## 📧 Contact

- **Repository**: [https://github.com/meet987654/StudentConnect](https://github.com/meet987654/StudentConnect)
- **Issues**: [https://github.com/meet987654/StudentConnect/issues](https://github.com/meet987654/StudentConnect/issues)

## 🌟 Show Your Support

If you find StudentConnect useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with others

---

Made with ❤️ by the StudentConnect community
