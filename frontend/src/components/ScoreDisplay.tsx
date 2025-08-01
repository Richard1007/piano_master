import React, { useState } from "react";
import { addToLeaderboard } from "../utils/firebase";
import Leaderboard from "./Leaderboard";
import { Button } from "./common";

const ScoreDisplay: React.FC<{
  score: number;
  total: number;
  difficulty: "easy" | "hard";
  onPlayAgain?: () => void;
}> = ({ score, total, difficulty, onPlayAgain }) => {
  const [showLeaderboardForm, setShowLeaderboardForm] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [username, setUsername] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [sortBy, setSortBy] = useState<"accuracy" | "rounds" | "correct">(
    "accuracy"
  );

  const percentage = (score / total) * 100;
  const timestamp = new Date().toLocaleString();

  const getTitle = () => {
    if (percentage >= 50) return "🎉 Congratulations! 🎉";
    return "✨ Keep Going! ✨";
  };

  const handleUploadToLeaderboard = async () => {
    if (!username.trim()) return;

    setIsUploading(true);
    try {
      await addToLeaderboard({
        username: username.trim(),
        score,
        total,
        accuracy: percentage,
        difficulty,
        timestamp: new Date().toISOString(),
      });

      setUploadSuccess(true);
      setShowLeaderboardForm(false);
    } catch (error) {
      console.error("Failed to upload to leaderboard:", error);
      alert("Failed to upload to leaderboard. Please try again.");
    } finally {
      setIsUploading(false);
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

  return (
    <div className="score-display">
      <h2>{getTitle()}</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Rounds</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Correct</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Difficulty</span>
          <span className="stat-value">{difficulty}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{percentage.toFixed(0)}%</span>
        </div>
      </div>

      <div className="timestamp">
        <span>Completed: {timestamp}</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {!showLeaderboardForm && !uploadSuccess && !showLeaderboard && (
        <div className="action-buttons">
          <Button onClick={() => setShowLeaderboardForm(true)} variant="light">
            🏆 Upload to Leaderboard
          </Button>
          <Button onClick={() => setShowLeaderboard(true)} variant="light">
            📊 Check Leaderboard
          </Button>
          {onPlayAgain && (
            <Button onClick={onPlayAgain} variant="primary">
              Play Again
            </Button>
          )}
        </div>
      )}

      {showLeaderboardForm && (
        <div className="leaderboard-form">
          <h3>🏆 Upload to Leaderboard</h3>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              maxLength={20}
              disabled={isUploading}
            />
          </div>
          <div className="form-actions">
            <Button
              onClick={handleUploadToLeaderboard}
              disabled={!username.trim() || isUploading}
              variant="primary"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              onClick={() => setShowLeaderboardForm(false)}
              disabled={isUploading}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showLeaderboard && (
        <div className="leaderboard-modal">
          <div className="leaderboard-header">
            <h3>📊 Leaderboard</h3>
            <div className="sort-controls">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "accuracy" | "rounds" | "correct")
                }
                className="sort-select"
              >
                <option value="accuracy">Accuracy</option>
                <option value="rounds">Rounds</option>
                <option value="correct">Correct</option>
              </select>
            </div>
            <Button
              onClick={() => setShowLeaderboard(false)}
              variant="secondary"
              size="small"
            >
              Close
            </Button>
          </div>
          <div className="leaderboard-content">
            <Leaderboard
              difficulty={difficulty}
              maxEntries={20}
              sortBy={sortBy}
            />
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="upload-success">
          <p>✅ Successfully uploaded to leaderboard!</p>
          {onPlayAgain && (
            <Button onClick={onPlayAgain} variant="primary">
              Play Again
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
