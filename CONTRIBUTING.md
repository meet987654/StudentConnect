# Contributing to StudentConnect

First off, thank you for considering contributing to StudentConnect! 🎉

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## 🚀 Quick Start

1. Fork the repo
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/StudentConnect.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add: Your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📋 Development Setup

See the [Installation section](README.md#installation) in the README for detailed setup instructions.

### Quick Setup

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## 🎯 Types of Contributions

### 🐛 Bug Reports

- Use the GitHub issue tracker
- Check if the issue already exists
- Include: steps to reproduce, expected behavior, actual behavior
- Add screenshots or error messages if applicable

### ✨ Feature Requests

- Use the GitHub issue tracker
- Describe the feature and its use case
- Explain how it benefits users
- If possible, suggest an implementation approach

### 📝 Documentation

- Fix typos or unclear explanations
- Add examples or tutorials
- Improve API documentation
- Translate documentation

### 💻 Code Contributions

- Bug fixes
- New features
- Performance improvements
- Refactoring
- Test coverage

## 🔄 Pull Request Process

### Before Submitting

1. **Check existing PRs** - Avoid duplicate work
2. **Create an issue** - Discuss significant changes first
3. **Test thoroughly** - Ensure your changes work
4. **Follow code style** - Match the existing codebase
5. **Update documentation** - If you change functionality

### PR Guidelines

1. **Title**: Use clear, descriptive titles
   - ✅ `Add: User profile editing feature`
   - ✅ `Fix: Event creation date validation`
   - ❌ `Update stuff`

2. **Description**: Include:
   - What changes you made
   - Why you made them
   - How to test them
   - Related issue numbers (#123)

3. **Size**: Keep PRs focused and reasonably sized
   - Large features? Break into smaller PRs
   - Each PR should address one concern

4. **Tests**: Add tests for new features
   - Unit tests for utilities
   - Integration tests for APIs
   - Component tests for UI

5. **Documentation**: Update relevant docs
   - README if setup changes
   - API docs if endpoints change
   - Comments for complex logic

### Review Process

1. Maintainers will review your PR
2. Address feedback promptly
3. Keep the PR up to date with main branch
4. Once approved, a maintainer will merge

## 🎨 Code Style

### TypeScript

```typescript
// Use descriptive names
const getUserById = async (id: string) => { ... }

// Use types, avoid 'any'
interface User {
  id: string;
  name: string;
  email: string;
}

// Use async/await over promises
const data = await fetchData();
```

### React Components

```tsx
// Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `EventCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Hooks: `use*.ts` (e.g., `useAuth.ts`)
- Types: `PascalCase.ts` (e.g., `UserTypes.ts`)

### Commit Messages

Follow the conventional commits specification:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Update existing feature
- `Docs:` - Documentation changes
- `Style:` - Code style changes (formatting)
- `Refactor:` - Code refactoring
- `Test:` - Adding tests
- `Chore:` - Maintenance tasks

**Examples:**
```
Add: User authentication with Passport.js
Fix: Event date picker timezone issue
Update: Dashboard statistics calculation
Docs: Add API endpoint documentation
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from './utils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });
});
```

## 🏗️ Project Structure

Understanding the codebase:

```
client/src/
├── components/     # Reusable UI components
│   ├── ui/        # Base UI components (buttons, inputs, etc.)
│   ├── events/    # Event-specific components
│   └── ...
├── pages/         # Page-level components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── types/         # TypeScript type definitions

server/
├── routes.ts      # API route definitions
├── db.ts          # Database connection
├── replitAuth.ts  # Authentication logic
└── ...

shared/
└── schema/        # Shared database schema & types
```

## 🌐 API Guidelines

### RESTful Conventions

- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Use plural nouns for resources (`/api/events`, not `/api/event`)
- Use kebab-case for URLs (`/api/user-profiles`)
- Return appropriate status codes

### Example Endpoint

```typescript
// GET /api/events
app.get('/api/events', async (req, res) => {
  try {
    const events = await db.query.events.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});
```

## 🤝 Community

### Be Respectful

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Getting Help

- 💬 GitHub Discussions for questions
- 🐛 GitHub Issues for bugs
- 📧 Email maintainers for private concerns

## 📚 Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

## 🎯 Good First Issues

Look for issues labeled `good first issue` to get started!

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to StudentConnect! 🚀
