import React from 'react';
import { Toggle } from '@/components/common/Toggle/Toggle';

interface JournalSettingsProps {
    allowComments: boolean;
    isPrivate: boolean;
    onAllowCommentsChange: (value: boolean) => void;
    onPrivateChange: (value: boolean) => void;
}

export const JournalSettings: React.FC<JournalSettingsProps> = ({
    allowComments,
    isPrivate,
    onAllowCommentsChange,
    onPrivateChange,
}) => {
    return (
        <div className="sidebar-card">
            <h3 className="sidebar-card-title">Settings</h3>
            <div className="settings-list">
                <label className="setting-item">
                    <span className="setting-label">Allow Comments</span>
                    <Toggle
                        checked={allowComments}
                        onChange={onAllowCommentsChange}
                        aria-label="Allow Comments"
                    />
                </label>
                <label className="setting-item">
                    <span className="setting-label">Make Private</span>
                    <Toggle
                        checked={isPrivate}
                        onChange={onPrivateChange}
                        aria-label="Make Private"
                    />
                </label>
            </div>
        </div>
    );
};
