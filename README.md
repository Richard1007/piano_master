# 🎹 Piano Ear Training Game

An interactive music game designed to train your musical ear anytime. Inspired by Duolingo, it makes the learning process fun and engaging, not frustrating. Compete with friends, track your own progress, and stay motivated through personal records and challenges that encourage continuous improvement.

## ✨ Features

- **Playground Mode**  
  Freely explore piano keys and hear their sounds  
  Practice recognizing notes without pressure

- **Challenge Mode**  
  Listen to a short melody and select the final note you heard

  - **Easy:** White keys only (C4–C5)
  - **Hard:** Includes both white and black keys

- Track your accuracy and progress over time
- Compete on a realtime global leaderboard
- Leaderboard powered by Firebase Realtime Database

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- Git

### Setup

```bash
git clone https://github.com/Richard1007/piano_master.git
cd piano-ear-training
```

Install dependencies:

```bash
cd frontend && npm install
# cd ../backend && npm install
```

Start development servers:

```bash
# Terminal 1
npm run dev

# Terminal 2
# cd backend && npm start
```

Visit the app at `http://localhost:5173`

## 🔧 Firebase Integration

You may notice that we didn’t install or start the backend server. That’s because this app uses **Firebase Realtime Database** to manage the leaderboard, enabling real-time score updates without needing a custom backend.

To keep the project simple and easy to run or share:

- We use the **Firebase Client SDK** instead of the Admin SDK, avoiding the need to share sensitive credentials
- All database logic runs on the **client side**, within the browser
- Although a `backend/` folder exists, it's currently **not required**
- The Firebase setup is located at `frontend/src/utils/firebase.ts`
- Client-side code has permission to read and write leaderboard entries securely, enforced through **Firebase security rules**

## 📄 License

MIT License. See `LICENSE` file for details.
