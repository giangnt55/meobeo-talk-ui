import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabel,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <p className="progress-text">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {stepLabel && <p className="progress-label">{stepLabel}</p>}
    </div>
  );
};