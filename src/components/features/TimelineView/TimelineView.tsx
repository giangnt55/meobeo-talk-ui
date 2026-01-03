import React from 'react';
import { MemoryCard } from '../MemoryCard/MemoryCard';
import './TimelineView.css';
import type { Memory } from '../../../types/memory';

interface TimelineViewProps {
  memories: Memory[];
  onMemoryClick?: (memoryId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  memories,
  onMemoryClick,
}) => {
  return (
    <div className="timeline-view">
      <div className="timeline-line" />
      {memories.map((memory) => (
        <div key={memory.id} className="timeline-entry">
          <MemoryCard
            id={memory.id}
            title={memory.title}
            date={memory.date}
            content={memory.content}
            tags={memory.tags}
            mood={memory.mood}
            likes={memory.likes_count}
            comments={memory.comments_count}
            image={memory.images?.[0]}
            onClick={() => onMemoryClick?.(memory.id)}
          />
        </div>
      ))}
    </div>
  );
};