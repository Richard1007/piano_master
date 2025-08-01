import React from "react";
import type { Mode } from "../types";

interface ModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  disabled?: boolean;
}

const ModeToggle: React.FC<ModeToggleProps> = ({
  mode,
  setMode,
  disabled = false,
}) => {
  const modes: { key: Mode; label: string }[] = [
    { key: "intro", label: "Intro" },
    { key: "playground", label: "Playground" },
    { key: "challenge", label: "Challenge" },
  ];

  return (
    <div className="mode-toggle">
      {modes.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setMode(key)}
          disabled={mode === key || disabled}
          className={mode === key ? "active" : ""}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;
