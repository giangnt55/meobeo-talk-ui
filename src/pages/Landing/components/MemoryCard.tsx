import React from "react";
import "../Landing.css";

interface MemoryProps {
  icon: string;
  date: string;
  title: string;
  description: string;
}

const MemoryCard: React.FC<MemoryProps> = ({ icon, date, title, description }) => {
  return (
    <div className="memory-card">
      <div className="memory-header">
        <span className="material-symbols-outlined">{icon}</span>
        <p className="memory-date">{date}</p>
      </div>
      <h3 className="memory-title">{title}</h3>
      <p className="memory-description">{description}</p>
    </div>
  );
};

export default MemoryCard;
