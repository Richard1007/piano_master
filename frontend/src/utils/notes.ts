// Shared notes configuration for Piano and Challenge components
export const PIANO_NOTES = [
  { note: "C4", type: "white", key: "a", audioFile: "c4.wav" },
  { note: "C#4", type: "black", key: "w", audioFile: "c_sharp4.wav" },
  { note: "D4", type: "white", key: "s", audioFile: "d4.wav" },
  { note: "D#4", type: "black", key: "e", audioFile: "d_sharp4.wav" },
  { note: "E4", type: "white", key: "d", audioFile: "e4.wav" },
  { note: "F4", type: "white", key: "f", audioFile: "f4.wav" },
  { note: "F#4", type: "black", key: "t", audioFile: "f_sharp4.wav" },
  { note: "G4", type: "white", key: "g", audioFile: "g4.wav" },
  { note: "G#4", type: "black", key: "y", audioFile: "g_sharp4.wav" },
  { note: "A4", type: "white", key: "h", audioFile: "a4.wav" },
  { note: "A#4", type: "black", key: "u", audioFile: "a_sharp4.wav" },
  { note: "B4", type: "white", key: "j", audioFile: "b4.wav" },
  { note: "C5", type: "white", key: "k", audioFile: "c5.wav" },
];

export type Note = typeof PIANO_NOTES[0];
export type NoteType = "white" | "black";

// Helper functions
export const getWhiteNotes = () => PIANO_NOTES.filter(note => note.type === "white");
export const getBlackNotes = () => PIANO_NOTES.filter(note => note.type === "black");
export const getNoteByKey = (key: string) => PIANO_NOTES.find(note => note.key === key);
export const getNoteByName = (noteName: string) => PIANO_NOTES.find(note => note.note === noteName); 