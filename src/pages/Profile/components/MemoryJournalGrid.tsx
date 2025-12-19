import React from 'react';

interface JournalEntry {
    id: string;
    title: string;
    date: string;
    coverImage: string;
    tags: { icon: string; label: string }[];
}

interface MemoryJournalGridProps {
    entries: JournalEntry[];
}

const MemoryJournalGridComponent: React.FC<MemoryJournalGridProps> = ({ entries }) => {
    return (
        <>
            <div className="memory-journal-grid">
                {entries.map((entry) => (
                    <div key={entry.id} className="journal-entry-card">
                        <div
                            className="journal-entry-image"
                            style={{ backgroundImage: `url(${entry.coverImage})` }}
                        />
                        <div className="journal-entry-overlay" />

                        <div className="journal-entry-content">
                            <div className="journal-entry-tags">
                                {entry.tags.map((tag, index) => (
                                    <span key={index} className="journal-tag">
                                        <span className="material-symbols-outlined">{tag.icon}</span>
                                    </span>
                                ))}
                            </div>

                            <h3 className="journal-entry-title">{entry.title}</h3>
                            <p className="journal-entry-date">{entry.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export const MemoryJournalGrid = React.memo(MemoryJournalGridComponent);
