import React from "react";
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "small" | "medium" | "large";
  elevation?: "none" | "low" | "medium" | "high";
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "medium",
  elevation = "medium",
  onClick,
}) => {
  return (
    <div
      className={`card card-${padding} card-${elevation} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
};

export default Card;
