import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: DropdownOption[] | string[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
    value,
    onChange,
    options,
    placeholder = 'Select an option',
    className = '',
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    // Normalize options to DropdownOption format
    const normalizedOptions: DropdownOption[] = options.map(opt =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const selectedOption = normalizedOptions.find(opt => opt.value === value);
    const displayValue = selectedOption?.label || placeholder;

    return (
        <div className={`dropdown ${className}`} ref={dropdownRef}>
            <div
                className={`dropdown-trigger ${disabled ? 'disabled' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={value ? '' : 'placeholder'}>{displayValue}</span>
                <span className="material-symbols-outlined dropdown-arrow">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </div>

            {isOpen && !disabled && (
                <div className="dropdown-menu">
                    {normalizedOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`dropdown-item ${value === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
