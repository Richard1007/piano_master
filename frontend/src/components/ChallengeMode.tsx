import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "./common";
import Piano from "./Piano";
import ScoreDisplay from "./ScoreDisplay";
import Leaderboard from "./Leaderboard";
import { PIANO_NOTES } from "../utils/notes";

// Configurable parameters
const NOTE_INTERVAL = 750; // seconds between notes
const FINAL_PAUSE = 500; // 0.5 seconds before target note

type Difficulty = "easy" | "hard";
type GameState = "idle" | "playing" | "finished" | "quit";

interface ChallengeModeProps {
  onGameStateChange: (isPlaying: boolean) => void;
}

const ChallengeMode: React.FC<ChallengeModeProps> = ({ onGameStateChange }) => {
  const [round, setRound] = useState(0);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [sortBy, setSortBy] = useState<"accuracy" | "rounds" | "correct">(
    "accuracy"
  );
  const [feedbackKeys, setFeedbackKeys] = useState<{
    [key: string]: "correct" | "incorrect";
  }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioCancelledRef = useRef<boolean>(false);

  // Notify parent component of game state changes
  useEffect(() => {
    onGameStateChange(gameState === "playing");
  }, [gameState, onGameStateChange]);

  // Filter notes based on difficulty
  const getAvailableNotes = () => {
    if (difficulty === "easy") {
      return PIANO_NOTES.filter((note) => note.type === "white");
    }
    return PIANO_NOTES;
  };

  // Generate a single random note
  const generateRandomNote = () => {
    const availableNotes = getAvailableNotes();
    const randomIndex = Math.floor(Math.random() * availableNotes.length);
    return availableNotes[randomIndex].note;
  };

  const startGame = () => {
    setRound(0);
    setScore(0);
    setIsDone(false);
    setGameState("playing");
  };

  const quitGame = () => {
    // Set cancellation flag
    audioCancelledRef.current = true;

    // Stop any playing audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Clear any pending audio timeouts
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    // Clear feedback state
    setFeedbackKeys({});

    setGameState("quit");
    setIsWaiting(false);
    setCurrentNote(null);
  };

  const resetGame = () => {
    // Set cancellation flag
    audioCancelledRef.current = true;

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Clear any pending audio timeouts
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    // Clear feedback state
    setFeedbackKeys({});

    setGameState("idle");
    setRound(0);
    setScore(0);
    setIsDone(false);
    setIsWaiting(false);
    setCurrentNote(null);
  };

  useEffect(() => {
    if (gameState === "playing") {
      // Reset cancellation flag for new round
      audioCancelledRef.current = false;
      setIsWaiting(true);

      const timeoutId = setTimeout(() => {
        if (gameState !== "playing" || audioCancelledRef.current) return;

        const note = generateRandomNote();
        setCurrentNote(note);
        const scale = [
          "c4.wav",
          "d4.wav",
          "e4.wav",
          "f4.wav",
          "g4.wav",
          "a4.wav",
          "b4.wav",
          "c5.wav",
        ];

        (async () => {
          for (let audioFile of scale) {
            if (gameState !== "playing" || audioCancelledRef.current) break;
            try {
              if (
                audioRef.current &&
                gameState === "playing" &&
                !audioCancelledRef.current
              ) {
                audioRef.current.src = `/audio/${audioFile}`;
                await audioRef.current.play();

                // Wait for the interval, but check cancellation frequently
                const startTime = Date.now();
                while (Date.now() - startTime < NOTE_INTERVAL) {
                  if (gameState !== "playing" || audioCancelledRef.current)
                    break;
                  await new Promise((resolve) => setTimeout(resolve, 50));
                }
              }
            } catch (error) {
              console.warn(`Could not play scale note ${audioFile}:`, error);
              if (gameState !== "playing" || audioCancelledRef.current) break;
              await new Promise((res) => setTimeout(res, NOTE_INTERVAL));
            }
          }

          if (gameState === "playing" && !audioCancelledRef.current) {
            // Wait for final pause, but check cancellation frequently
            const startTime = Date.now();
            while (Date.now() - startTime < FINAL_PAUSE) {
              if (gameState !== "playing" || audioCancelledRef.current) break;
              await new Promise((resolve) => setTimeout(resolve, 50));
            }

            try {
              if (
                audioRef.current &&
                gameState === "playing" &&
                !audioCancelledRef.current
              ) {
                const noteFile = PIANO_NOTES.find(
                  (n) => n.note === note
                )?.audioFile;
                if (noteFile) {
                  audioRef.current.src = `/audio/${noteFile}`;
                  await audioRef.current.play();
                }
              }
            } catch (error) {
              console.warn(`Could not play target note ${note}:`, error);
            }
          }

          if (gameState === "playing" && !audioCancelledRef.current) {
            setIsWaiting(false);
          }
        })();
      }, 1000);

      audioTimeoutRef.current = timeoutId;
    }
  }, [round, gameState]);

  const handleGuess = (note: string) => {
    if (gameState === "playing" && !isWaiting && currentNote) {
      const isCorrect = note === currentNote;

      // Create feedback object
      const feedback: { [key: string]: "correct" | "incorrect" } = {};

      if (isCorrect) {
        // If correct, show selected key in green
        feedback[note] = "correct";
      } else {
        // If incorrect, show selected key in red and correct key in green
        feedback[note] = "incorrect";
        feedback[currentNote] = "correct";
      }

      setFeedbackKeys(feedback);

      // Update score
      if (isCorrect) setScore(score + 1);

      // Clear feedback after 1 second and start next round
      setTimeout(() => {
        setFeedbackKeys({});
        setRound(round + 1);
        setCurrentNote(null);
      }, 1000);
    }
  };

  const handleKeyClick = (note: string, audioFile: string) => {
    handleGuess(note);
    setActiveKey(note);
    setTimeout(() => setActiveKey(null), 150);
  };

  const toggleDifficulty = () => {
    // Only allow difficulty change when game is idle
    if (gameState === "idle") {
      setDifficulty(difficulty === "easy" ? "hard" : "easy");
    }
  };

  const getAccuracy = () => {
    if (round === 0) return 0;
    return Math.round((score / round) * 100);
  };

  const getKeyClassName = (note: string) => {
    if (feedbackKeys[note]) {
      return `key-${feedbackKeys[note]}`;
    }
    if (activeKey === note) {
      return "active";
    }
    return "";
  };

  return (
    <div className="wrapper">
      <header className="header-row">
        <div className="header-column">
          <span className="round-display">Round {round + 1}</span>
        </div>
        <div className="header-column">
          {gameState === "playing" ? (
            <Button onClick={quitGame} variant="danger">
              Quit
            </Button>
          ) : gameState === "idle" ? (
            <div className="start-buttons">
              <Button onClick={startGame} variant="primary">
                Start
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowLeaderboard(true)}
              >
                📊 Leaderboard
              </Button>
            </div>
          ) : (
            <div className="spacer"></div>
          )}
        </div>
        <div className="header-column">
          <div
            className={`difficulty-toggle ${
              difficulty === "hard" ? "active" : ""
            } ${gameState === "playing" ? "disabled" : ""}`}
            onClick={toggleDifficulty}
          >
            <span className="easy-text">Easy</span>
            <span className="hard-text">Hard</span>
            <div className="slider"></div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {gameState === "quit" ? (
          <ScoreDisplay
            score={score}
            total={round}
            difficulty={difficulty}
            onPlayAgain={resetGame}
          />
        ) : (
          <div
            className={`piano-container challenge-mode ${
              gameState === "playing" ? "game-state-playing" : "game-state-idle"
            }`}
          >
            <Piano
              showKeys={false}
              onKeyClick={handleKeyClick}
              className="piano-keys"
              activeKey={activeKey}
              getKeyClassName={getKeyClassName}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        title="📊 Leaderboard"
        size="large"
      >
        <div className="leaderboard-header">
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
        </div>
        <div className="leaderboard-content">
          <Leaderboard
            difficulty={difficulty}
            maxEntries={20}
            sortBy={sortBy}
          />
        </div>
      </Modal>

      <audio ref={audioRef} />
    </div>
  );
};

export default ChallengeMode;
