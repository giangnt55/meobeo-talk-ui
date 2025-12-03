import React from 'react';
import { Card, CardBody } from '../../common/Card/Card';
import './FilterSidebar.css';

interface FilterSidebarProps {
  onFilterChange?: (filter: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
}) => {
  return (
    <Card className="filter-sidebar">
      <CardBody>
        <div className="filter-header">
          <span className="filter-icon">🔍</span>
          <div>
            <h3 className="filter-title">Filter & Sort</h3>
            <p className="filter-subtitle">Refine your timeline</p>
          </div>
        </div>

        <div className="filter-options">
          <button className="filter-option active">
            <span className="option-icon">📅</span>
            <span>Filter by Date</span>
          </button>
          <button className="filter-option">
            <span className="option-icon">🏷️</span>
            <span>Filter by Tag</span>
          </button>
          <button className="filter-option">
            <span className="option-icon">🖼️</span>
            <span>Media Type</span>
          </button>
        </div>
      </CardBody>
    </Card>
  );
};