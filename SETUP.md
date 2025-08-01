# Piano Ear Training App - Setup Guide

A modern web application for piano ear training with three modes: Intro, Playground, and Challenge. Built with React, TypeScript, and Vite.

## 🎹 Features

- **Intro Mode**: Beautiful landing page with mode selection
- **Playground Mode**: Interactive piano with instant audio feedback
- **Challenge Mode**: Test your ear training skills with scoring and leaderboards
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, accessible interface with smooth animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/piano-ear-training.git
cd piano-ear-training
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to root directory
cd ..
```

### 3. Start the Development Servers

You'll need to run both the frontend and backend servers:

#### Terminal 1 - Frontend (React/Vite)

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

#### Terminal 2 - Backend (Express)

```bash
cd backend
npm start
```

The backend will be available at: `http://localhost:3000`

### 4. Open the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## 🏗️ Project Structure

```
piano-ear-training/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   └── audio/           # Piano audio files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── common/      # Reusable components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── index.ts
│   │   │   ├── IntroMode.tsx
│   │   │   ├── PlaygroundMode.tsx
│   │   │   ├── ChallengeMode.tsx
│   │   │   ├── Piano.tsx
│   │   │   ├── ScoreDisplay.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── ModeToggle.tsx
│   │   ├── styles/          # CSS files
│   │   │   ├── variables.css
│   │   │   ├── buttons.css
│   │   │   ├── layout.css
│   │   │   └── components.css
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   ├── index.tsx        # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/                  # Express backend server
│   ├── index.js             # Server entry point
│   └── package.json
├── package.json             # Root package.json
└── SETUP.md                # This file
```

## 🎵 Audio Files

The application requires piano audio files to function properly. Ensure the following files are present in `frontend/public/audio/`:

- `c.mp3` - C note
- `d.mp3` - D note
- `e.mp3` - E note
- `f.mp3` - F note
- `g.mp3` - G note
- `a.mp3` - A note
- `b.mp3` - B note
- `c2.mp3` - High C note

If audio files are missing, the piano will still work but without sound.

## 🔧 Development

### Available Scripts

#### Frontend Scripts

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

#### Backend Scripts

```bash
cd backend

# Start development server
npm start

# Start with nodemon (if installed)
npm run dev
```

### Environment Variables

Create a `.env` file in the frontend directory for any environment-specific configurations:

```bash
# frontend/.env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_CONFIG=your_firebase_config_here
```

### Code Style

The project uses:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)

## 🚀 Production Deployment

### Build for Production

```bash
# Build frontend
cd frontend
npm run build

# The built files will be in frontend/dist/
```

### Deploy Options

1. **Vercel** (Recommended for frontend)

   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

2. **Netlify**

   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Firebase Hosting**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

### Backend Deployment

Deploy the backend to:

- **Heroku**
- **Railway**
- **Render**
- **Vercel** (serverless functions)

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Kill process on port 5173 (frontend)
   lsof -ti:5173 | xargs kill -9

   # Kill process on port 3000 (backend)
   lsof -ti:3000 | xargs kill -9
   ```

2. **Node modules issues**

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**

   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

4. **Audio not playing**
   - Check browser console for errors
   - Ensure audio files exist in `frontend/public/audio/`
   - Check browser autoplay policies

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Development

The app is fully responsive and works on mobile devices. For mobile development:

1. **Enable mobile debugging** in Chrome DevTools
2. **Test touch interactions** on the piano keys
3. **Verify responsive breakpoints** work correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-username/piano-ear-training/issues) page
2. Create a new issue with detailed information
3. Include your operating system, Node.js version, and error messages

## 🎯 Next Steps

After setting up the project, you can:

1. **Customize the design** by modifying CSS variables in `frontend/src/styles/variables.css`
2. **Add new piano notes** by updating `frontend/src/utils/notes.ts`
3. **Implement new game modes** by creating new components
4. **Add authentication** using Firebase Auth
5. **Deploy to production** using the deployment guides above

---

**Happy coding! 🎹✨**
