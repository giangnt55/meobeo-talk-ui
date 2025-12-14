import React from 'react';
import { Button } from '@/components/common/Button/Button';

export const MemoriesHeader: React.FC = () => {
    return (
        <div className="memories-header">
            <div className="memories-title-row">
                <div className="memories-title-group">
                    <h1 className="memories-title">Memories</h1>
                    <p className="memories-subtitle">Your personal archive and a window to shared stories.</p>
                </div>
                <div className="memories-actions">
                    <Button variant="outline" leftIcon={<span className="material-symbols-outlined">post_add</span>}>
                        New Entry
                    </Button>
                    <Button variant="primary" leftIcon={<span className="material-symbols-outlined">add_circle</span>}>
                        New Journey
                    </Button>
                </div>
            </div>

            <div className="memories-tabs">
                <button className="memories-tab active">
                    <span className="material-symbols-outlined">person</span>
                    My Memories
                </button>
                <button className="memories-tab">
                    <span className="material-symbols-outlined">public</span>
                    Public Journeys
                </button>
                <button className="memories-tab">
                    <span className="material-symbols-outlined">trending_up</span>
                    Trending
                </button>
            </div>
        </div>
    );
};
