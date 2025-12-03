import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimelineView } from '../../components/features/TimelineView/TimelineView';
import { FilterSidebar } from '../../components/features/FilterSidebar/FilterSidebar';
import { SearchBar } from '../../components/common/SearchBar/SearchBar';
import { Button } from '../../components/common/Button/Button';
import type { Memory, MemoryFilter } from '../../types/memory';
import { mockMemories } from '../../mock/memoryData';
import { filterMemories } from '../../utils/memoryHelpers';
import './Timeline.css';

export const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<Memory[]>(mockMemories);
  const [filter, setFilter] = useState<MemoryFilter>({
    sortBy: 'newest',
  });

  useEffect(() => {
    const filtered = filterMemories(mockMemories, filter);
    setMemories(filtered);
  }, [filter]);

  const handleMemoryClick = (memoryId: string) => {
    navigate(`/memory/${memoryId}`);
  };

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = mockMemories.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.content.toLowerCase().includes(query.toLowerCase())
      );
      setMemories(filtered);
    } else {
      setMemories(mockMemories);
    }
  };

  return (
    <div className="timeline-page">
      <div className="timeline-container">
        <aside className="timeline-sidebar">
          <FilterSidebar onFilterChange={setFilter} />
        </aside>

        <main className="timeline-main">
          <div className="timeline-header">
            <div>
              <h1 className="timeline-title">Your Memory Journal</h1>
              <p className="timeline-subtitle">
                A look back at your cherished moments.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/memory/create')}
            >
              + New Memory
            </Button>
          </div>

          <div className="timeline-search">
            <SearchBar
              placeholder="Search memories..."
              onSearch={handleSearch}
            />
          </div>

          <TimelineView
            memories={memories}
            onMemoryClick={handleMemoryClick}
          />
        </main>
      </div>
    </div>
  );
};