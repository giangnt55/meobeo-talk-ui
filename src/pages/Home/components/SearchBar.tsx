import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

interface SearchBarProps {
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search' }) => {
    return (
        <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input
                className="search-input"
                placeholder={placeholder}
                type="text"
            />
        </div>
    );
};

export default SearchBar;
