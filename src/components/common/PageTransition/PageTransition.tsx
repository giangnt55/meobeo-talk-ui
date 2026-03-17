import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

interface PageTransitionProps {
    children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('fadeIn');

    useEffect(() => {
        if (location !== displayLocation) {
            const rafId = window.requestAnimationFrame(() => {
                setTransitionStage('fadeOut');
            });
            return () => window.cancelAnimationFrame(rafId);
        }
        return;
    }, [location, displayLocation]);

    return (
        <div
            className={`page-transition ${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === 'fadeOut') {
                    setTransitionStage('fadeIn');
                    setDisplayLocation(location);
                }
            }}
        >
            {transitionStage === 'fadeOut' ? displayLocation.pathname : children}
        </div>
    );
};
