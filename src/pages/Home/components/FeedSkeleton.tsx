import React from 'react';

export const SkeletonArticle: React.FC = () => (
    <div className="stream-skeleton-article">
        <div className="stream-skeleton-body">
            <div className="stream-skeleton-line" style={{ height: '0.75rem', width: '40%' }} />
            <div className="stream-skeleton-line" style={{ height: '1.25rem', width: '85%' }} />
            <div className="stream-skeleton-line" style={{ height: '1rem', width: '70%' }} />
            <div className="stream-skeleton-line" style={{ height: '1rem', width: '60%' }} />
            <div
                className="stream-skeleton-line"
                style={{ height: '0.75rem', width: '30%', marginTop: '0.5rem' }}
            />
        </div>
        <div
            className="stream-skeleton-line stream-skeleton-thumb"
            style={{ flexShrink: 0 }}
        />
    </div>
);
