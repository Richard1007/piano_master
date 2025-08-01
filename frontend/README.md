# Piano Keyboard Frontend

A React TypeScript application featuring a piano keyboard with two modes: Playground and Challenge.

## Features

### 🎹 Playground Mode

- Interactive piano keyboard covering C4 to C5 (13 keys)
- Click any key to play the corresponding note
- Visual feedback with hover and click animations
- Responsive design for different screen sizes

### 🎯 Challenge Mode

- 5-round ear training game
- Listen to a scale followed by a target note
- Click the correct key to score points
- Final score display with percentage and encouraging messages

## Technical Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for piano-specific styling

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Add audio files:**
   Place MP3 files in `public/audio/` with the following names:

   - C4.mp3, C#4.mp3, D4.mp3, D#4.mp3, E4.mp3
   - F4.mp3, F#4.mp3, G4.mp3, G#4.mp3, A4.mp3
   - A#4.mp3, B4.mp3, C5.mp3

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Audio Files Setup

The application expects piano note samples in MP3 format. You can:

- **Download free samples** from websites like Freesound.org
- **Use a piano sample library**
- **Record your own** using a digital piano
- **Use online piano note generators**

### Required Files:

```
public/audio/
├── C4.mp3
├── C#4.mp3
├── D4.mp3
├── D#4.mp3
├── E4.mp3
├── F4.mp3
├── F#4.mp3
├── G4.mp3
├── G#4.mp3
├── A4.mp3
├── A#4.mp3
├── B4.mp3
└── C5.mp3
```

## Project Structure

```
src/
├── components/
│   ├── Piano.tsx          # Playground mode keyboard
│   ├── Challenge.tsx      # Challenge mode game
│   ├── ModeToggle.tsx     # Mode switching buttons
│   ├── ScoreDisplay.tsx   # Final score display
│   ├── BlackKey.tsx       # Individual black key component
│   └── WhiteKey.tsx       # Individual white key component
├── styles/
│   └── Piano.css          # Piano-specific styling
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
└── index.css              # Global styles with Tailwind
```

## Styling

The application uses a combination of:

- **Tailwind CSS** for utility classes and responsive design
- **Custom CSS** for piano-specific styling (key positioning, gradients, animations)
- **CSS Grid/Flexbox** for layout
- **CSS transitions** for smooth interactions

## Browser Compatibility

- Modern browsers with ES6+ support
- Audio API support for note playback
- Responsive design works on desktop, tablet, and mobile

## Development Notes

- Audio files are loaded dynamically when keys are clicked
- Error handling for missing audio files with console warnings
- TypeScript for type safety and better development experience
- ESLint configuration for code quality

## Future Enhancements

- [ ] Add keyboard shortcuts for note playback
- [ ] Implement different piano sounds/instruments
- [ ] Add difficulty levels to challenge mode
- [ ] Include visual note highlighting during playback
- [ ] Add metronome functionality
- [ ] Implement note recording and playback
