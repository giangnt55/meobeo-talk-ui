import React, { useState, useId } from 'react';
import './Toggle.css';

export interface ToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    id?: string;
    name?: string;
    'aria-label'?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    disabled = false,
    size = 'md',
    className = '',
    id: providedId,
    name,
    'aria-label': ariaLabel,
}) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    // Support both controlled and uncontrolled modes
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;

        if (!isControlled) {
            setUncontrolledChecked(newChecked);
        }

        onChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Support Space and Enter keys
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) {
                const newChecked = !checked;
                if (!isControlled) {
                    setUncontrolledChecked(newChecked);
                }
                onChange?.(newChecked);
            }
        }
    };

    return (
        <label
            className={`toggle ${size} ${disabled ? 'disabled' : ''} ${className}`}
            htmlFor={id}
        >
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className="toggle-input"
                aria-label={ariaLabel}
                aria-checked={checked}
                role="switch"
            />
            <span className="toggle-track">
                <span className="toggle-thumb" />
            </span>
        </label>
    );
};
