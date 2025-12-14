import React from 'react';
import './MemoriesPage.css';
import { MemoriesHeader } from './components/MemoriesHeader';
import { MemoriesFilters } from './components/MemoriesFilters';
import { MyJourneysSection } from './components/MyJourneysSection';
import { PublicJourneysSection } from './components/PublicJourneysSection';
import { JournalHighlightsSection } from './components/JournalHighlightsSection';

export const MemoriesPage: React.FC = () => {
    return (
        <div className="memories-container">
            <div className="memories-content">
                <MemoriesHeader />
                <MemoriesFilters />

                <MyJourneysSection />
                <PublicJourneysSection />
                <JournalHighlightsSection />

                <div className="load-more-container">
                    <button className="load-more-btn">
                        Load More Memories
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
