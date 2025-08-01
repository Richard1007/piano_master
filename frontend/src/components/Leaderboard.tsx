import React, { useState, useEffect } from "react";
import { getLeaderboard, getLeaderboardByDifficulty } from "../utils/firebase";
import type { LeaderboardEntry } from "../utils/firebase";

interface LeaderboardProps {
  difficulty?: "easy" | "hard" | "all";
  maxEntries?: number;
  sortBy?: "accuracy" | "rounds" | "correct";
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  difficulty = "all",
  maxEntries = 10,
  sortBy = "accuracy",
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let unsubscribe: (() => void) | undefined;

    try {
      if (difficulty === "all") {
        unsubscribe = getLeaderboard((leaderboardEntries) => {
          const sortedEntries = sortEntries(leaderboardEntries, sortBy);
          setEntries(sortedEntries.slice(0, maxEntries));
          setLoading(false);
        });
      } else {
        unsubscribe = getLeaderboardByDifficulty(
          difficulty,
          (leaderboardEntries) => {
            const sortedEntries = sortEntries(leaderboardEntries, sortBy);
            setEntries(sortedEntries.slice(0, maxEntries));
            setLoading(false);
          }
        );
      }
    } catch (err) {
      setError("Failed to load leaderboard");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [difficulty, maxEntries, sortBy]);

  const sortEntries = (entries: LeaderboardEntry[], sortBy: string) => {
    const sortedEntries = [...entries];

    switch (sortBy) {
      case "accuracy":
        return sortedEntries.sort((a, b) => b.accuracy - a.accuracy);
      case "rounds":
        return sortedEntries.sort((a, b) => b.total - a.total);
      case "correct":
        return sortedEntries.sort((a, b) => b.score - a.score);
      default:
        return sortedEntries.sort((a, b) => b.accuracy - a.accuracy);
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "accuracy":
        return "Accuracy";
      case "rounds":
        return "Rounds";
      case "correct":
        return "Correct";
      default:
        return "Accuracy";
    }
  };

  if (loading) {
    return (
      <div className="leaderboard">
        <h3>🏆 Leaderboard</h3>
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard">
        <h3>🏆 Leaderboard</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h3>🏆 Leaderboard {difficulty !== "all" && `(${difficulty})`}</h3>
      <div className="sort-info">Sorted by: {getSortLabel()}</div>
      {entries.length === 0 ? (
        <div className="no-entries">No entries yet. Be the first!</div>
      ) : (
        <div className="leaderboard-entries">
          {entries.map((entry, index) => (
            <div key={entry.id || index} className="leaderboard-entry">
              <div className="rank">#{index + 1}</div>
              <div className="username">{entry.username}</div>
              <div className="stats">
                <span className="accuracy">{Math.round(entry.accuracy)}%</span>
                <span className="score">
                  {entry.score}/{entry.total}
                </span>
                <span className="difficulty">{entry.difficulty}</span>
              </div>
              <div className="date">
                {new Date(entry.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
