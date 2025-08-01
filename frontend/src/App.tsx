import React, { useState } from "react";
import IntroMode from "./components/IntroMode";
import PlaygroundMode from "./components/PlaygroundMode";
import ChallengeMode from "./components/ChallengeMode";
import ModeToggle from "./components/ModeToggle";
import type { Mode } from "./types";

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("intro");
  const [isChallengePlaying, setIsChallengePlaying] = useState(false);

  const handleModeChange = (newMode: Mode) => {
    if (isChallengePlaying && newMode !== "challenge") {
      return; // Prevent mode change during challenge gameplay
    }
    setMode(newMode);
  };

  return (
    <div>
      <ModeToggle
        mode={mode}
        setMode={handleModeChange}
        disabled={isChallengePlaying}
      />
      {mode === "intro" ? (
        <IntroMode setMode={handleModeChange} />
      ) : mode === "playground" ? (
        <PlaygroundMode />
      ) : (
        <ChallengeMode onGameStateChange={setIsChallengePlaying} />
      )}
    </div>
  );
};

export default App;
