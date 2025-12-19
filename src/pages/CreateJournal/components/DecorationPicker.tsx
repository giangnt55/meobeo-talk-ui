import React from 'react';

interface DecorationPickerProps {
    selected: string[];
    onSelect: (decorations: string[]) => void;
}

const decorations = [
    { id: 'fire', icon: 'local_fire_department', color: 'orange' },
    { id: 'leaf', icon: 'eco', color: 'green' },
    { id: 'water', icon: 'water_drop', color: 'blue' },
    { id: 'star', icon: 'star', color: 'purple' },
    { id: 'heart', icon: 'favorite', color: 'pink' },
    { id: 'sun', icon: 'light_mode', color: 'yellow' },
    { id: 'music', icon: 'music_note', color: 'gray' },
];

export const DecorationPicker: React.FC<DecorationPickerProps> = ({ selected, onSelect }) => {
    const toggleDecoration = (id: string) => {
        if (selected.includes(id)) {
            onSelect(selected.filter((d) => d !== id));
        } else {
            onSelect([...selected, id]);
        }
    };

    return (
        <div className="sidebar-card">
            <h3 className="sidebar-card-title">
                <span className="material-symbols-outlined">brush</span>
                Decoration
            </h3>
            <div className="decoration-grid">
                {decorations.map((deco) => (
                    <button
                        key={deco.id}
                        className={`decoration-btn ${selected.includes(deco.id) ? 'selected' : ''}`}
                        onClick={() => toggleDecoration(deco.id)}
                    >
                        <span className={`material-symbols-outlined text-${deco.color}-400`}>
                            {deco.icon}
                        </span>
                    </button>
                ))}
                <button className="decoration-btn add-decoration">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </div>
    );
};
