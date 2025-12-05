import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemories } from '../../hooks/useMemories';
import { useApi } from '../../hooks/useApi';
import { memoryApi } from '../../api/services/memoryApi';
import { TimelineView } from '../../components/features/TimelineView/TimelineView';
import { FilterSidebar } from '../../components/features/FilterSidebar/FilterSidebar';
import { SearchBar } from '../../components/common/SearchBar/SearchBar';
import { Button } from '../../components/common/Button/Button';
import type { MemoryFilter } from '../../types/memory';
import './Timeline.css';

export const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<MemoryFilter>({
    sortBy: 'newest',
  });

  const { memories, isLoading, error, refresh } = useMemories(filter);
  
  const { execute: deleteMemory } = useApi(memoryApi.deleteMemory, {
    showSuccessToast: true,
    successMessage: 'Memory deleted successfully',
  });

  const handleMemoryClick = (memoryId: string) => {
    navigate(`/memory/${memoryId}`);
  };

  const handleSearch = async (query: string) => {
    if (query) {
      // Implement search
      const response = await memoryApi.searchMemories(query);
      // Handle search results
    } else {
      refresh();
    }
  };

  const handleDelete = async (memoryId: string) => {
    try {
      await deleteMemory(memoryId);
      refresh(); // Reload memories
    } catch (err) {
      // Error handled by useApi
    }
  };

  if (error) {
    return (
      <div className="timeline-error">
        <p>Error loading memories: {error.message}</p>
        <Button onClick={refresh}>Try Again</Button>
      </div>
    );
  }

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

          {isLoading ? (
            <div className="timeline-loading">Loading memories...</div>
          ) : (
            <TimelineView
              memories={memories}
              onMemoryClick={handleMemoryClick}
            />
          )}
        </main>
      </div>
    </div>
  );
};