import React from 'react';
import './GalleryView.css';
import type { Memory } from '../../../types/memory';

interface GalleryViewProps {
  memories: Memory[];
  onMemoryClick?: (memoryId: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  memories,
  onMemoryClick,
}) => {
  return (
    <div className="gallery-grid">
      {memories.map((memory) => (
        <div
          key={memory.id}
          className="gallery-item"
          onClick={() => onMemoryClick?.(memory.id)}
        >
          <div
            className="gallery-image"
            style={{
              backgroundImage: memory.images?.[0]
                ? `url(${memory.images[0]})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="gallery-overlay">
              <p className="gallery-title">{memory.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};