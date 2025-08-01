import React, { useState } from "react";
import { addToLeaderboard } from "../utils/firebase";
import Leaderboard from "./Leaderboard";

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

  // Simple rate limiting: 1 submission per 30 seconds
  const RATE_LIMIT_MS = 30000;
  const lastUpload = localStorage.getItem("lastUploadTime");
  const canUpload =
    !lastUpload || Date.now() - parseInt(lastUpload) > RATE_LIMIT_MS;
  const remainingTime = lastUpload
    ? Math.max(
        0,
        Math.ceil((RATE_LIMIT_MS - (Date.now() - parseInt(lastUpload))) / 1000)
      )
    : 0;

  const getTitle = () => {
    if (percentage >= 50) return "🎉 Congratulations! 🎉";
    return "🎵 Keep Going! 🎵";
  };

  const handleUploadToLeaderboard = async () => {
    if (!username.trim()) return;

    if (!canUpload) {
      alert(`Please wait ${remainingTime} seconds before uploading again.`);
      return;
    }

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

      localStorage.setItem("lastUploadTime", Date.now().toString());
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
          <button
            onClick={() => setShowLeaderboardForm(true)}
            className="btn btn-secondary"
          >
            🏆 Upload to Leaderboard
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="btn btn-secondary"
          >
            📊 Check Leaderboard
          </button>
          {onPlayAgain && (
            <button onClick={onPlayAgain} className="btn btn-primary">
              Play Again
            </button>
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
            <button
              onClick={handleUploadToLeaderboard}
              disabled={!username.trim() || isUploading || !canUpload}
              className="btn btn-primary"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              onClick={() => setShowLeaderboardForm(false)}
              disabled={isUploading}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
          {!canUpload && (
            <div className="rate-limit-warning">
              ⏰ Please wait {remainingTime} seconds before uploading again
            </div>
          )}
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
            <button
              onClick={() => setShowLeaderboard(false)}
              className="btn btn-secondary btn-small"
            >
              Close
            </button>
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
            <button onClick={onPlayAgain} className="btn btn-primary">
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
