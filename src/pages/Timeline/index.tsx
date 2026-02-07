import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useMemories,
  // useDeleteMemory,
  // useLikeMemory,
} from '@/hooks/queries/useMemories';
import { TimelineView } from '@/components/features/TimelineView/TimelineView';
// import { FilterSidebar } from '@/components/features/FilterSidebar/FilterSidebar';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Button } from '@/components/common/Button/Button';
import './Timeline.css';

export const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    sortBy: 'newest' as const,
  });

  // React Query hooks
  const { data, isLoading, error, refetch } = useMemories(filters);
  // const deleteMutation = useDeleteMemory();
  // const likeMutation = useLikeMemory();

  const memories = data?.memories || [];
  const meta = data?.meta;

  const handleMemoryClick = (memoryId: string) => {
    navigate(`/memories/${memoryId}`);
  };

  // const handleDelete = async (memoryId: string) => {
  //   if (confirm('Are you sure you want to delete this memory?')) {
  //     await deleteMutation.mutateAsync(memoryId);
  //   }
  // };

  // const handleLike = (memoryId: string) => {
  //   likeMutation.mutate(memoryId);
  // };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (error) {
    return (
      <div className="timeline-error">
        <p>Error loading memories</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="timeline-page">
      <div className="timeline-container">
        {/* <aside className="timeline-sidebar">
          <FilterSidebar onFilterChange={(f) => setFilters({ ...filters, ...f })} />
        </aside> */}

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
              onClick={() => navigate('/memories/create')}
            >
              + New Memory
            </Button>
          </div>

          <div className="timeline-search">
            <SearchBar placeholder="Search memories..." />
          </div>

          {isLoading ? (
            <div className="timeline-loading">
              <div className="spinner" />
              <p>Loading memories...</p>
            </div>
          ) : (
            <>
              <TimelineView
                memories={memories}
                onMemoryClick={handleMemoryClick}
              // onLike={handleLike}
              // onDelete={handleDelete}
              />

              {meta && meta.totalPages > 1 && (
                <div className="pagination">
                  <Button
                    disabled={meta.page === 1}
                    onClick={() => handlePageChange(meta.page - 1)}
                  >
                    Previous
                  </Button>
                  <span>
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <Button
                    disabled={meta.page === meta.totalPages}
                    onClick={() => handlePageChange(meta.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};