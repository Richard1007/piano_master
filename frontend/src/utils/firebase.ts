// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getDatabase, ref, push, onValue, off, query, orderByChild, limitToLast, DataSnapshot } from "@firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeb-qQZAY8we2swYLaFm7IrEp2ej4xCFQ",
  authDomain: "piano-ear-training.firebaseapp.com",
  databaseURL: "https://piano-ear-training-default-rtdb.firebaseio.com",
  projectId: "piano-ear-training",
  storageBucket: "piano-ear-training.firebasestorage.app",
  messagingSenderId: "467540346960",
  appId: "1:467540346960:web:b7048c446dbccf1d5ee955",
  measurementId: "G-GF8DYFFC1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Leaderboard types
export interface LeaderboardEntry {
  id?: string; // Firebase key
  username: string;
  score: number;
  total: number;
  accuracy: number;
  difficulty: "easy" | "hard";
  timestamp: string;
  date: string; // For easier querying
}

// Firebase leaderboard functions
export const addToLeaderboard = async (entry: Omit<LeaderboardEntry, 'date'>) => {
  try {
    const leaderboardRef = ref(database, 'leaderboard');
    const entryWithDate = {
      ...entry,
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };
    
    const newEntryRef = await push(leaderboardRef, entryWithDate);
    return newEntryRef.key;
  } catch (error) {
    console.error('Error adding to leaderboard:', error);
    throw error;
  }
};

export const getLeaderboard = (callback: (entries: LeaderboardEntry[]) => void) => {
  const leaderboardRef = ref(database, 'leaderboard');
  const leaderboardQuery = query(
    leaderboardRef,
    orderByChild('accuracy'),
    limitToLast(50) // Get top 50 entries
  );

  onValue(leaderboardQuery, (snapshot: DataSnapshot) => {
    const entries: LeaderboardEntry[] = [];
    snapshot.forEach((childSnapshot: DataSnapshot) => {
      const entry = childSnapshot.val() as LeaderboardEntry;
      entry.id = childSnapshot.key || ''; // Add Firebase key as id
      entries.push(entry);
    });
    
    // Sort by accuracy descending (highest first)
    entries.sort((a, b) => b.accuracy - a.accuracy);
    callback(entries);
  });

  // Return unsubscribe function
  return () => off(leaderboardRef);
};

export const getLeaderboardByDifficulty = (
  difficulty: "easy" | "hard", 
  callback: (entries: LeaderboardEntry[]) => void
) => {
  const leaderboardRef = ref(database, 'leaderboard');
  const leaderboardQuery = query(
    leaderboardRef,
    orderByChild('difficulty'),
    limitToLast(50)
  );

  onValue(leaderboardQuery, (snapshot: DataSnapshot) => {
    const entries: LeaderboardEntry[] = [];
    snapshot.forEach((childSnapshot: DataSnapshot) => {
      const entry = childSnapshot.val() as LeaderboardEntry;
      if (entry.difficulty === difficulty) {
        entry.id = childSnapshot.key || '';
        entries.push(entry);
      }
    });
    
    // Sort by accuracy descending
    entries.sort((a, b) => b.accuracy - a.accuracy);
    callback(entries);
  });

  return () => off(leaderboardRef);
};

export { app, analytics, database }; 