import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface NavigateOptions {
    delay?: number;
    replace?: boolean;
}

/**
 * Custom hook for smooth navigation with optional delay
 * Provides a better UX by allowing animations to complete before navigation
 */
export const useSmoothNavigate = () => {
    const navigate = useNavigate();

    const smoothNavigate = useCallback(
        (to: string, options: NavigateOptions = {}) => {
            const { delay = 0, replace = false } = options;

            if (delay > 0) {
                setTimeout(() => {
                    navigate(to, { replace });
                }, delay);
            } else {
                navigate(to, { replace });
            }
        },
        [navigate]
    );

    return smoothNavigate;
};
