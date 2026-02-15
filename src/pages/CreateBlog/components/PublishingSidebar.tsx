import React, { useState, useEffect } from 'react';
import './PublishingSidebar.css';
import { CategoryDropdown } from './CategoryDropdown';
import { categoryApi } from '@/api/services/categoryApi';

interface PublishingSidebarProps {
    visibility: 'public' | 'private' | 'followers';
    onVisibilityChange: (visibility: 'public' | 'private' | 'followers') => void;
    category: string;
    onCategoryChange: (category: string) => void;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    onPublish: () => void;
    onSchedule: () => void;
    onSaveDraft?: () => void;
    isPublishing?: boolean;
}

const PublishingSidebar: React.FC<PublishingSidebarProps> = ({
    visibility,
    onVisibilityChange,
    category,
    onCategoryChange,
    tags,
    onTagsChange,
    onPublish,
    onSchedule,
    onSaveDraft,
    isPublishing = false,
}) => {
    const [newTag, setNewTag] = useState('');
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getCategories();
                setCategories(data.map(cat => ({
                    value: cat.id,
                    label: cat.name
                })));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

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
                    <h3 className="card-title">Xuất bản</h3>

                    {/* Visibility Toggle */}
                    <div className="visibility-section">
                        <label className="section-label">Hiển thị</label>
                        <div className="visibility-toggle">
                            <button
                                className={`toggle-btn ${visibility === 'public' ? 'active' : ''}`}
                                onClick={() => onVisibilityChange('public')}
                            >
                                Công khai
                            </button>
                            <button
                                className={`toggle-btn ${visibility === 'private' ? 'active' : ''}`}
                                onClick={() => onVisibilityChange('private')}
                            >
                                Riêng tư
                            </button>
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="section-container">
                        <label className="section-label">Chuyên mục</label>
                        {isLoadingCategories ? (
                            <div className="category-loading">Đang tải...</div>
                        ) : (
                            <CategoryDropdown
                                value={category}
                                onChange={onCategoryChange}
                                categories={categories}
                            />
                        )}
                    </div>

                    {/* Tags Input */}
                    <div className="tags-section">
                        <label className="section-label">Thẻ</label>
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
                            placeholder="Thêm thẻ..."
                            className="tag-input"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="actions-section">
                        <button
                            onClick={onPublish}
                            className={`publish-btn ${isPublishing ? 'loading' : ''}`}
                            disabled={isPublishing}
                        >
                            {isPublishing ? 'Đang xuất bản...' : 'Xuất bản ngay'}
                        </button>
                        <button
                            onClick={onSaveDraft}
                            className="draft-btn"
                            disabled={isPublishing}
                        >
                            Lưu nháp
                        </button>
                        <button onClick={onSchedule} className="schedule-btn" disabled={isPublishing}>
                            Lên lịch sau
                        </button>
                    </div>
                </div>

                {/* Helper Card */}
                <div className="helper-card">
                    <p className="helper-text">
                        Thay đổi được tự động lưu cục bộ.<br />
                        Đồng bộ lần cuối: <span className="sync-status">Thành công</span>
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default PublishingSidebar;
