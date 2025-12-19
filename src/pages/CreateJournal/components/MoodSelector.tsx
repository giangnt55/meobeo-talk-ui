import React, { useState } from 'react';

interface MoodSelectorProps {
    selectedMood: string;
    onMoodSelect: (mood: string) => void;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

const moods = [
    { id: 'joyful', icon: 'sentiment_satisfied', label: 'Joyful', color: 'yellow' },
    { id: 'calm', icon: 'sentiment_content', label: 'Calm', color: 'blue' },
    { id: 'loved', icon: 'favorite', label: 'Loved', color: 'pink' },
    { id: 'inspired', icon: 'auto_awesome', label: 'Inspired', color: 'purple' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
    selectedMood,
    onMoodSelect,
    tags,
    onTagsChange,
}) => {
    const [newTag, setNewTag] = useState('');

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTag.trim()) {
            const tag = newTag.startsWith('#') ? newTag : `#${newTag}`;
            onTagsChange([...tags, tag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (index: number) => {
        onTagsChange(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="sidebar-card">
            <h3 className="sidebar-card-title">
                <span className="material-symbols-outlined">mood</span>
                Mood & Vibe
            </h3>
            <div className="mood-section">
                <label className="mood-label">Primary Emotion</label>
                <div className="mood-grid">
                    {moods.map((mood) => (
                        <button
                            key={mood.id}
                            className={`mood-btn ${selectedMood === mood.id ? 'selected' : ''} mood-${mood.color}`}
                            onClick={() => onMoodSelect(mood.id)}
                        >
                            <span className="material-symbols-outlined">{mood.icon}</span>
                            <span className="mood-label-text">{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="tags-section">
                <label className="mood-label">Context Tags</label>
                <div className="tags-container">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag-chip">
                            {tag}
                            <button onClick={() => handleRemoveTag(index)}>×</button>
                        </span>
                    ))}
                    <input
                        type="text"
                        className="tag-input"
                        placeholder="+ Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                    />
                </div>
            </div>
        </div>
    );
};
