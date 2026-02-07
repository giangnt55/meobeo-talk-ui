import React, { useState } from 'react';
import './MoodFilter.css';

type Category = 'All' | 'Blogs' | 'Memories' | 'Journeys' | 'Saved';

interface CategoryFilterProps {
    onCategoryChange?: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const categories: Category[] = ['All', 'Blogs', 'Memories', 'Journeys', 'Saved'];

    const handleCategoryClick = (category: Category) => {
        setActiveCategory(category);
        onCategoryChange?.(category);
    };

    return (
        <div className="category-filter-container">
            <div className="category-filter-wrapper">
                <div className="category-filter-buttons no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-filter-button ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
