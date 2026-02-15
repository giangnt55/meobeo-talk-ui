import React from 'react';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';

interface CategoryDropdownProps {
    value: string;
    onChange: (value: string) => void;
    categories: { value: string; label: string }[] | string[];
}

/**
 * CategoryDropdown - A specialized dropdown for blog categories
 * This is a thin wrapper around the common Dropdown component
 */
export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ value, onChange, categories }) => {
    return (
        <Dropdown
            value={value}
            onChange={onChange}
            options={categories}
            placeholder="Select a category"
        />
    );
};
