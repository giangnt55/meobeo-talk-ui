import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DecorationPicker } from '@/components/features/DecorationPicker/DecorationPicker';
import { Button } from '@/components/common/Button/Button';
import './Decorations.css';

export const DecorationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memoryId = searchParams.get('memoryId');

  const handleDecorationSelect = (decoration: string) => {
    console.log('Selected decoration:', decoration);
    // In real app, apply decoration to memory

    // For now, just log and optionally navigate back
    if (memoryId) {
      // Apply to existing memory
      navigate(`/memories/${memoryId}`);
    } else {
      // Apply to new memory being created
      navigate('/memories/create');
    }
  };

  return (
    <div className="decorations-page">
      <div className="decorations-container">
        <div className="decorations-header">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            leftIcon={<span>←</span>}
          >
            Back
          </Button>
        </div>

        <DecorationPicker onSelect={handleDecorationSelect} />
      </div>
    </div>
  );
};