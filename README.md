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
git clone https://github.com/your-username/piano-ear-training.git
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

You may notice that we didn't install or start the backend server. That is becauuse this app uses **Firebase Realtime Database** to handle the leaderboard in real-time — storing and updating scores instantly.  
To keep things simple and make it easier for others to run and share this project:

- We use the **Firebase Client SDK** (not the Admin SDK)
- This means the database logic technically runs in the frontend
- Even though a `backend/` folder is set up, it’s **not required** right now
- Client-side code has permission to read and write leaderboard entries securely (via Firebase rules)

## 📄 License

MIT License. See `LICENSE` file for details.
