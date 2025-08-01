import React, { useState, useEffect } from "react";
import "./IntroMode.css";
import type { Mode } from "../types";

interface IntroModeProps {
  setMode: (mode: Mode) => void;
}

interface ModeCardProps {
  icon: string;
  title: string;
  features: string[];
  onClick: () => void;
  variant: "playground" | "challenge";
}

const ModeCard: React.FC<ModeCardProps> = ({
  icon,
  title,
  features,
  onClick,
  variant,
}) => (
  <div className={`mode-card ${variant}-card`} onClick={onClick}>
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <ul className="card-features">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <div className="card-glow"></div>
  </div>
);

interface StatItemProps {
  number: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, label }) => (
  <div className="stat-item">
    <span className="stat-number">{number}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const IntroMode: React.FC<IntroModeProps> = ({ setMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePlaygroundClick = () => {
    setMode("playground");
  };

  const handleChallengeClick = () => {
    setMode("challenge");
  };

  const modeCards = [
    {
      icon: "🎮",
      title: "Playground",
      features: [
        "Instant audio feedback",
        "Visual note names",
        "Beginner friendly",
      ],
      onClick: handlePlaygroundClick,
      variant: "playground" as const,
    },
    {
      icon: "🎯",
      title: "Challenge",
      features: [
        "Identify notes by sound",
        "Infinite practice",
        "Global leaderboard",
      ],
      onClick: handleChallengeClick,
      variant: "challenge" as const,
    },
  ];

  const stats = [
    { number: "1", label: "Learning Days" },
    { number: "12", label: "Scores Submitted" },
    { number: "38%", label: "Avg Accuracy" },
  ];

  return (
    <div className={`wrapper intro-mode ${isLoaded ? "loaded" : ""}`}>
      {/* Animated background gradient */}
      <div className="background-gradient">
        <div className="gradient-layer"></div>
        <div className="gradient-layer"></div>
        <div className="gradient-layer"></div>
      </div>

      {/* Main content */}
      <div className="intro-content">
        {/* Hero section */}
        <div className="hero-section">
          <h1 className="hero-title">Piano Ear Training</h1>
          <p className="hero-subtitle">
            Master the fundamentals anytime, anywhere! <br />
            just 5 minutes a day
          </p>
        </div>

        {/* Mode cards */}
        <div className="mode-cards">
          {modeCards.map((card) => (
            <ModeCard key={card.title} {...card} />
          ))}
        </div>

        {/* Sample challenge section */}
        <div className="sample-section">
          <button onClick={handleChallengeClick} className="sample-btn">
            Start a daily Challenge
          </button>
        </div>

        {/* Stats preview */}
        <div className="stats-preview">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>

        {/* Footer */}
        <footer className="intro-footer">
          <div className="footer-links">
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">
              Contact
            </a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">
              Terms
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IntroMode;
