import React from 'react';

export const MemoriesFilters: React.FC = () => {
    return (
        <div className="memories-filters">
            <span className="filter-label">Filter by:</span>
            <button className="filter-chip active">All</button>
            <button className="filter-chip">2023</button>
            <button className="filter-chip">Happy</button>
            <button className="filter-chip">Travel</button>
            <button className="filter-chip">Nostalgic</button>
        </div>
    );
};
