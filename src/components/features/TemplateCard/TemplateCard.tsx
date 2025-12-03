import React from 'react';
import { Button } from '../../common/Button/Button';
import './TemplateCard.css';

interface TemplateCardProps {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  onSelect?: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  name,
  thumbnail,
  onSelect,
}) => {
  return (
    <div className="template-card">
      <div
        className="template-thumbnail"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url(${thumbnail})`,
        }}
      >
        <p className="template-name">{name}</p>
        <div className="template-overlay">
          <Button variant="primary" onClick={onSelect}>
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
};