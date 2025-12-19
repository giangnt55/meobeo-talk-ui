import React from 'react';

interface Journey {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    category: string;
    categoryColor: string;
    entriesCount: number;
}

interface MemoryJourneysListProps {
    journeys: Journey[];
}

const MemoryJourneysListComponent: React.FC<MemoryJourneysListProps> = ({ journeys }) => {
    return (
        <>
            <div className="memory-journeys-list">
                {journeys.map((journey) => (
                    <div key={journey.id} className="profile-journey-card">
                        <div className="profile-journey-image-wrapper">
                            <div
                                className="profile-journey-image"
                                style={{ backgroundImage: `url(${journey.coverImage})` }}
                            />
                            <div className="profile-journey-image-overlay" />
                        </div>

                        <div className="profile-journey-content">
                            <div className="profile-journey-meta">
                                <span
                                    className="profile-journey-category"
                                    style={{
                                        backgroundColor: `${journey.categoryColor}1A`,
                                        color: journey.categoryColor
                                    }}
                                >
                                    {journey.category}
                                </span>
                                <span className="meta-dot">●</span>
                                <span className="profile-journey-entries">{journey.entriesCount} Entries</span>
                            </div>

                            <h3 className="profile-journey-title">{journey.title}</h3>
                            <p className="profile-journey-description">{journey.description}</p>

                            <button className="profile-journey-view-btn">
                                View Journey Details
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export const MemoryJourneysList = React.memo(MemoryJourneysListComponent);
