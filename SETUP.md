# Setup Guide for StudentConnect

## ✅ What Has Been Fixed

### 1. Environment Configuration
- ✅ Added `dotenv` package to load environment variables
- ✅ Created `.env.example` template file
- ✅ Configured `.env` file loading in `server/index.ts`

### 2. Cross-Platform Compatibility
- ✅ Installed `cross-env` for Windows compatibility
- ✅ Updated npm scripts to use `cross-env`
- ✅ Fixed server listen configuration (removed `reusePort` for Windows)

### 3. Authentication System
- ✅ Created generic `server/auth.ts` (replaces Replit-specific auth)
- ✅ Updated all routes to use new authentication system
- ✅ Session management works with both PostgreSQL and in-memory storage

### 4. Project Structure
- ✅ Removed unnecessary Replit-specific files (`.replit`, `.config`, `.local`)
- ✅ Removed `attached_assets` folder
- ✅ Removed `netlify.toml`
- ✅ Updated `.gitignore` with proper exclusions

### 5. Documentation
- ✅ Created professional `README.md`
- ✅ Created `CONTRIBUTING.md` for open source contributions
- ✅ Created `LICENSE` (MIT)
- ✅ Created `.env.example` template

### 6. Backend Server
- ✅ **Backend is now running successfully on port 5000!**
- ✅ Database connection working with Neon PostgreSQL

## ⚠️ Known Issues

### Frontend Build Error
The client folder has dependency version conflicts. The Radix UI packages are outdated and incompatible.

**Two Options to Fix:**

#### Option 1: Use the Main Vite Frontend (Recommended)
The main `StudentConnect` folder already has a complete React frontend that works with Vite. The `client` folder appears to be a duplicate/legacy version.

**To use the main frontend:**
1. Delete the `client` folder: `rm -rf client`
2. The backend serves the Vite-built frontend automatically in development mode
3. Access the app at `http://localhost:5000`

#### Option 2: Fix the Client Folder Dependencies
If you need to keep the separate client folder:

```bash
cd client
rm -rf node_modules package-lock.json
# Update package.json with compatible versions
npm install
npm run build
```

## 🚀 Current Status

### Backend ✅
- **Status**: Running successfully
- **URL**: http://localhost:5000
- **API Endpoints**: Available at http://localhost:5000/api/*

### Frontend ⏳
- **Option 1**: Use main Vite frontend (built into backend)
- **Option 2**: Fix client folder dependencies

## 📝 Next Steps

1. **Decide on Frontend Architecture**
   - Keep the integrated Vite frontend (in main folder)
   - OR fix the separate client folder

2. **Database Schema**
   ```bash
   npm run db:push
   ```

3. **Access the Application**
   - Open browser to `http://localhost:5000`
   - Use the development login endpoint

4. **Development Workflow**
   ```bash
   # Start backend with hot reload
   npm run dev
   
   # Backend runs on port 5000
   # Vite serves frontend automatically in dev mode
   ```

## 🔧 Available Commands

### Backend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run db:push   # Update database schema
npm run check     # TypeScript type check
```

### Frontend (if using client folder)
```bash
cd client
npm run build     # Build frontend
npm start         # Start frontend server
```

## 📦 Project Structure (Cleaned)

```
StudentConnect/
├── server/          # Backend Express application
│   ├── auth.ts     # Authentication (NEW - generic)
│   ├── db.ts       # Database connection
│   ├── index.ts    # Server entry point
│   ├── routes.ts   # API routes
│   └── ...
├── client/          # OPTIONAL separate frontend
├── shared/          # Shared types and schemas
├── .env            # Environment variables (not in git)
├── .env.example    # Environment template
├── .gitignore      # Git ignore rules
├── package.json    # Backend dependencies
├── README.md       # Project documentation
├── CONTRIBUTING.md # Contribution guidelines
├── LICENSE         # MIT License
└── SETUP.md        # This file
```

## 🌐 Environment Variables

Required variables in `.env`:

```env
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

## 🎯 Recommended Next Actions

1. **Choose frontend approach** (integrated Vite or separate client)
2. **Push database schema**: `npm run db:push`
3. **Test the application**: Open `http://localhost:5000`
4. **Set up seed data** (if needed): `npm run seed` (if seed script exists)

## 🐛 Troubleshooting

### Backend won't start
- Check `.env` file has valid `DATABASE_URL`
- Verify port 5000 is not already in use
- Check database connection with: `psql $DATABASE_URL`

### Frontend build fails
- See "Frontend Build Error" section above
- Consider using integrated Vite frontend instead

### Database connection fails
- Verify DATABASE_URL format: `postgresql://user:password@host:port/database`
- Check network connectivity to database
- Verify database exists and credentials are correct

---

**Status**: Backend running successfully ✅  
**Next Step**: Choose frontend architecture and initialize database schema
