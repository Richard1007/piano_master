import React, { useState, useEffect, useRef } from "react";
import { PIANO_NOTES } from "../utils/notes";

interface PianoProps {
  showKeys?: boolean;
  onKeyClick?: (note: string, audioFile: string) => void;
  className?: string;
  activeKey?: string | null;
  getKeyClassName?: (note: string) => string;
}

const Piano: React.FC<PianoProps> = ({
  showKeys = true,
  onKeyClick,
  className = "piano-keys",
  activeKey: externalActiveKey,
  getKeyClassName,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use external activeKey if provided, otherwise use internal state
  const activeKey =
    externalActiveKey !== undefined ? externalActiveKey : internalActiveKey;

  const playNote = (note: string, audioFile: string) => {
    try {
      if (audioRef.current) {
        const audioPath = `/audio/${audioFile}`;
        console.log(`Attempting to play: ${audioPath} for note: ${note}`);

        audioRef.current.src = audioPath;
        audioRef.current.play().catch((error) => {
          console.warn(
            `Could not play audio for ${note} (${audioFile}):`,
            error
          );
        });
      }
    } catch (error) {
      console.warn(`Audio file not found for ${note} (${audioFile}):`, error);
    }

    // Visual feedback
    if (externalActiveKey === undefined) {
      setInternalActiveKey(note);
      setTimeout(() => setInternalActiveKey(null), 150);
    }
  };

  const handleKeyClick = (note: string, audioFile: string) => {
    if (onKeyClick) {
      onKeyClick(note, audioFile);
    } else {
      playNote(note, audioFile);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = PIANO_NOTES.find((k) => k.key === e.key.toLowerCase());
    if (key) {
      handleKeyClick(key.note, key.audioFile);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onKeyClick]);

  return (
    <>
      <ul className={className}>
        {PIANO_NOTES.map(({ note, type, key, audioFile }) => (
          <li
            key={note}
            className={`key ${type} ${!showKeys ? "hide" : ""} ${
              activeKey === note ? "active" : ""
            } ${getKeyClassName ? getKeyClassName(note) : ""}`}
            data-key={key}
            onClick={() => handleKeyClick(note, audioFile)}
          >
            <span>{note}</span>
          </li>
        ))}
      </ul>

      <audio ref={audioRef} />
    </>
  );
};

export default Piano;
