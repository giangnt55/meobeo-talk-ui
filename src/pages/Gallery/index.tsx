import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GalleryView } from '@/components/features/GalleryView/GalleryView';
// import { Button } from '@/components/common/Button/Button'; // Removed unused import
import { mockMemories } from '@/mock/memoryData';
import './Gallery.css';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'gallery' | 'timeline' | 'map'>('gallery');

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-header">
          <h1 className="gallery-title">Memory Journal</h1>
        </div>

        <div className="view-switcher">
          <button
            className={`view-option ${view === 'gallery' ? 'active' : ''}`}
            onClick={() => setView('gallery')}
          >
            Gallery
          </button>
          <button
            className={`view-option ${view === 'timeline' ? 'active' : ''}`}
            onClick={() => navigate('/timeline')}
          >
            Timeline
          </button>
          <button
            className={`view-option ${view === 'map' ? 'active' : ''}`}
            onClick={() => setView('map')}
          >
            Map
          </button>
        </div>

        <div className="gallery-filters">
          <button className="filter-button">
            Filter by Year <span>▼</span>
          </button>
          <button className="filter-button">
            Filter by Tags <span>▼</span>
          </button>
          <button className="filter-button active">
            Sort: Newest First <span>▼</span>
          </button>
        </div>

        <GalleryView
          memories={mockMemories}
          onMemoryClick={(id) => navigate(`/memories/${id}`)}
        />
      </div>
    </div>
  );
};