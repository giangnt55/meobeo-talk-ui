import React, { useState } from 'react';
import './PublishingSidebar.css';

interface PublishingSidebarProps {
    visibility: 'public' | 'private';
    onVisibilityChange: (visibility: 'public' | 'private') => void;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    onPublish: () => void;
    onSchedule: () => void;
}

const PublishingSidebar: React.FC<PublishingSidebarProps> = ({
    visibility,
    onVisibilityChange,
    tags,
    onTagsChange,
    onPublish,
    onSchedule,
}) => {
    const [newTag, setNewTag] = useState('');

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!tags.includes(newTag.trim())) {
                onTagsChange([...tags, newTag.trim()]);
            }
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <aside className="publishing-sidebar-container">
            <div className="publishing-sidebar">
                {/* Publishing Card */}
                <div className="publishing-card">
                    <h3 className="card-title">Publishing</h3>

                    {/* Visibility Toggle */}
                    <div className="visibility-section">
                        <label className="section-label">Visibility</label>
                        <div className="visibility-toggle">
                            <button
                                className={`toggle-btn ${visibility === 'public' ? 'active' : ''}`}
                                onClick={() => onVisibilityChange('public')}
                            >
                                Public
                            </button>
                            <button
                                className={`toggle-btn ${visibility === 'private' ? 'active' : ''}`}
                                onClick={() => onVisibilityChange('private')}
                            >
                                Private
                            </button>
                        </div>
                    </div>

                    {/* Tags Input */}
                    <div className="tags-section">
                        <label className="section-label">Tags</label>
                        <div className="tags-list">
                            {tags.map((tag) => (
                                <span key={tag} className="tag-item">
                                    #{tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="tag-remove"
                                        aria-label={`Remove ${tag}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Add a tag..."
                            className="tag-input"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="actions-section">
                        <button onClick={onPublish} className="publish-btn">
                            Publish Now
                        </button>
                        <button onClick={onSchedule} className="schedule-btn">
                            Schedule for later
                        </button>
                    </div>
                </div>

                {/* Helper Card */}
                <div className="helper-card">
                    <p className="helper-text">
                        Changes are auto-saved locally.<br />
                        Last sync: <span className="sync-status">Successful</span>
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default PublishingSidebar;
