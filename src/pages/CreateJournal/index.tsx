import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Removed unused import
import { RichTextEditor } from '@/components/common/RichTextEditor/RichTextEditor';
import { TemplateSelector } from './components/TemplateSelector';
import { MoodSelector } from './components/MoodSelector';
import { DecorationPicker } from './components/DecorationPicker';
import { JournalSettings } from './components/JournalSettings';
import './CreateJournal.css';

export const CreateJournalPage: React.FC = () => {
    // const navigate = useNavigate(); // Removed unused variable
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [coverImage, setCoverImage] = useState(''); // Removed unused variables
    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const [selectedMood, setSelectedMood] = useState('joyful');
    const [tags, setTags] = useState<string[]>(['#MorningHike', '#Nature']);
    const [selectedDecorations, setSelectedDecorations] = useState<string[]>([]);
    const [allowComments, setAllowComments] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);

    // const handleSaveDraft = () => {
    //     console.log('Saving draft...');
    //     // TODO: Implement save draft
    // };

    // const handlePublish = () => {
    //     console.log('Publishing memory...');
    //     // TODO: Implement publish
    // };

    return (
        <div className="create-journal-page">
            {/* Header */}
            {/* <header className="journal-header">
                <div className="journal-header-brand">
                </div>
                <div className="journal-header-actions">
                    <button className="btn-draft" onClick={handleSaveDraft}>
                        Save as Draft
                    </button>
                    <button className="btn-publish" onClick={handlePublish}>
                        Publish Memory
                    </button>
                </div>
            </header> */}

            {/* Main Content */}
            <main className="journal-main">
                <div className="journal-container">
                    <div className="journal-grid">
                        {/* Editor Section */}
                        <div className="journal-editor-section">
                            {/* Sticky Toolbar */}
                            <div className="editor-toolbar-sticky">
                                <div className="toolbar-actions">
                                    <button className="toolbar-btn" title="Bold">
                                        <span className="material-symbols-outlined">format_bold</span>
                                    </button>
                                    <button className="toolbar-btn" title="Italic">
                                        <span className="material-symbols-outlined">format_italic</span>
                                    </button>
                                    <div className="toolbar-divider" />
                                    <button className="toolbar-btn" title="Heading">
                                        <span className="material-symbols-outlined">title</span>
                                    </button>
                                    <button className="toolbar-btn" title="Quote">
                                        <span className="material-symbols-outlined">format_quote</span>
                                    </button>
                                    <div className="toolbar-divider" />
                                    <button className="toolbar-btn" title="Add Link">
                                        <span className="material-symbols-outlined">link</span>
                                    </button>
                                    <button className="toolbar-btn" title="Add Sticker">
                                        <span className="material-symbols-outlined">sticker</span>
                                    </button>
                                </div>
                                <button className="btn-add-media">
                                    <span className="material-symbols-outlined">add_photo_alternate</span>
                                    Add Media
                                </button>
                            </div>

                            {/* Journal Paper */}
                            <div className="journal-paper">
                                {/* Tape Effect */}
                                <div className="tape-decoration" />

                                {/* Cover Upload */}
                                <div className="cover-upload-area">
                                    <div className="cover-upload-placeholder">
                                        <span className="material-symbols-outlined">add_a_photo</span>
                                        <span className="upload-text">Upload Cover Photo</span>
                                        <span className="upload-hint">Recommended: 1200x600px</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="journal-content">
                                    <input
                                        type="text"
                                        className="journal-title-input"
                                        placeholder="Give your memory a title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    {/* Metadata */}
                                    <div className="journal-metadata">
                                        <button className="metadata-btn">
                                            <span className="material-symbols-outlined">calendar_today</span>
                                            <span>Today</span>
                                        </button>
                                        <span className="metadata-dot">•</span>
                                        <button className="metadata-btn">
                                            <span className="material-symbols-outlined">location_on</span>
                                            <span>Add Location</span>
                                        </button>
                                        <span className="metadata-dot">•</span>
                                        <div className="tag-friends-btn">+ Tag Friends</div>
                                    </div>

                                    {/* Rich Text Editor */}
                                    <RichTextEditor
                                        value={content}
                                        onChange={setContent}
                                        placeholder="Start writing your story here..."
                                        minHeight="200px"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="journal-sidebar">
                            <TemplateSelector
                                selected={selectedTemplate}
                                onSelect={setSelectedTemplate}
                            />
                            <MoodSelector
                                selectedMood={selectedMood}
                                onMoodSelect={setSelectedMood}
                                tags={tags}
                                onTagsChange={setTags}
                            />
                            <DecorationPicker
                                selected={selectedDecorations}
                                onSelect={setSelectedDecorations}
                            />
                            <JournalSettings
                                allowComments={allowComments}
                                isPrivate={isPrivate}
                                onAllowCommentsChange={setAllowComments}
                                onPrivateChange={setIsPrivate}
                            />
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
};
