import React from 'react';

interface TemplateSelectorProps {
    selected: string;
    onSelect: (template: string) => void;
}

const templates = [
    { id: 'classic', name: 'Classic Blog', isActive: true },
    { id: 'gallery', name: 'Gallery Grid', isActive: false },
    { id: 'scrapbook', name: 'Scrapbook', isActive: false },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect }) => {
    return (
        <div className="sidebar-card">
            <h3 className="sidebar-card-title">
                <span className="material-symbols-outlined">dashboard</span>
                Choose Template
            </h3>
            <div className="journal-template-grid">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        className={`journal-template-card ${selected === template.id ? 'selected' : ''}`}
                        onClick={() => onSelect(template.id)}
                    >
                        {selected === template.id && (
                            <div className="template-check">
                                <span className="material-symbols-outlined">check</span>
                            </div>
                        )}
                        <div className="template-preview">
                            {template.id === 'classic' && (
                                <>
                                    <div className="preview-image" />
                                    <div className="preview-line short" />
                                    <div className="preview-line" />
                                    <div className="preview-line medium" />
                                </>
                            )}
                            {template.id === 'gallery' && (
                                <>
                                    <div className="preview-grid">
                                        <div className="preview-grid-item" />
                                        <div className="preview-grid-item" />
                                    </div>
                                    <div className="preview-line" />
                                    <div className="preview-line" />
                                </>
                            )}
                            {template.id === 'scrapbook' && (
                                <>
                                    <div className="preview-line" />
                                    <div className="preview-image rotated" />
                                </>
                            )}
                        </div>
                        <div className={`template-label ${selected === template.id ? 'active' : ''}`}>
                            {template.name}
                        </div>
                    </button>
                ))}
                <button className="template-card add-template">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </div>
    );
};
