import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth'; // Removed unused import
import './CreateJourney.css';

export const CreateJourney: React.FC = () => {
    // const { user } = useAuth(); // Removed unused variable
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [template, setTemplate] = useState('timeline');
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveCover = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCoverImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCreate = () => {
        if (!title || !startDate) {
            alert('Please fill in the required fields: Journey Title and Start Date');
            return;
        }

        console.log('Creating journey:', {
            title,
            startDate,
            endDate,
            location,
            description,
            template,
            coverImage
        });

        navigate('/memories');
    };

    return (
        <div className="create-journey-page">

            <main className="create-journey-main">
                <div className="create-journey-container">
                    <div className="page-intro">
                        <span className="new-badge">New Adventure</span>
                        <h1 className="page-title">Create Memory Journey</h1>
                        <p className="page-description">
                            Start a new collection of moments. Choose a theme that fits your story to begin curating your memories.
                        </p>
                    </div>

                    <form className="form-card" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                        <div className="form-content">
                            {/* Cover Image Upload */}
                            <div className="form-group">
                                <label className="input-label">Cover Image</label>
                                <div className="cover-preview">
                                    <input
                                        type="file"
                                        id="coverImage"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <div
                                        className="cover-upload-area"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {!coverImage ? (
                                            <div className="cover-upload-placeholder">
                                                <span className="material-symbols-outlined cover-upload-icon">add_photo_alternate</span>
                                                <p className="cover-upload-text">Click to upload cover image</p>
                                                <p className="cover-upload-hint">Recommended: 1200x400px (JPG, PNG)</p>
                                            </div>
                                        ) : (
                                            <>
                                                <img src={coverImage} alt="Cover preview" className="cover-image-preview" />
                                                <div className="cover-overlay">
                                                    <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '36px' }}>edit</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {coverImage && (
                                        <button
                                            type="button"
                                            className="remove-cover-btn"
                                            onClick={handleRemoveCover}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label">Journey Title</label>
                                <input
                                    type="text"
                                    className="text-input"
                                    placeholder="e.g., Summer Roadtrip to Italy"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="grid-3-cols">
                                <div className="form-group">
                                    <label className="input-label">Start Date</label>
                                    <div className="input-with-icon">
                                        <span className="material-symbols-outlined input-icon">calendar_today</span>
                                        <input
                                            type="date"
                                            className="text-input"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="input-label">End Date <span className="optional-text">(Optional)</span></label>
                                    <div className="input-with-icon">
                                        <span className="material-symbols-outlined input-icon">event</span>
                                        <input
                                            type="date"
                                            className="text-input"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Location <span className="optional-text">(Optional)</span></label>
                                    <div className="input-with-icon">
                                        <span className="material-symbols-outlined input-icon">place</span>
                                        <input
                                            type="text"
                                            className="text-input"
                                            placeholder="Add location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label">Description</label>
                                <textarea
                                    className="textarea-input"
                                    rows={3}
                                    placeholder="What is this journey about?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="form-content">
                            <div className="template-section-header">
                                <div>
                                    <h3 className="template-section-title">Choose Display Template</h3>
                                    <p className="template-section-subtitle">Select how your journey will appear to viewers.</p>
                                </div>
                                <button className="preview-btn">Preview All</button>
                            </div>

                            <div className="template-grid">
                                <label className="template-radio-label">
                                    <input
                                        type="radio"
                                        name="template"
                                        className="template-radio-input"
                                        value="timeline"
                                        checked={template === 'timeline'}
                                        onChange={(e) => setTemplate(e.target.value)}
                                    />
                                    <div className="glow-effect"></div>
                                    <div className="template-card">
                                        <div className="template-preview">
                                            <div className="preview-timeline-classic">
                                                <div className="tl-line"></div>
                                                <div className="tl-content">
                                                    <div className="tl-row" style={{ flexDirection: 'row' }}>
                                                        <div className="tl-card"></div>
                                                        <div className="tl-dot primary"></div>
                                                    </div>
                                                    <div className="tl-row" style={{ flexDirection: 'row-reverse' }}>
                                                        <div className="tl-card"></div>
                                                        <div className="tl-dot secondary"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="check-icon-wrapper">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                                            </div>
                                        </div>
                                        <div className="template-info">
                                            <div className="template-title-row">
                                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>timeline</span>
                                                <span className="template-name">Classic Timeline</span>
                                            </div>
                                            <p className="template-description">Chronological layout with a central path. Best for travel and linear stories.</p>
                                        </div>
                                    </div>
                                </label>

                                <label className="template-radio-label">
                                    <input
                                        type="radio"
                                        name="template"
                                        className="template-radio-input"
                                        value="scrapbook"
                                        checked={template === 'scrapbook'}
                                        onChange={(e) => setTemplate(e.target.value)}
                                    />
                                    <div className="glow-effect"></div>
                                    <div className="template-card">
                                        <div className="template-preview">
                                            <div className="preview-scrapbook">
                                                <div className="sb-paper"></div>
                                                <div className="sb-photo"></div>
                                                <div className="sb-tape"></div>
                                                <div className="sb-sticker"></div>
                                            </div>
                                            <div className="check-icon-wrapper">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                                            </div>
                                        </div>
                                        <div className="template-info">
                                            <div className="template-title-row">
                                                <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>style</span>
                                                <span className="template-name">Scrapbook</span>
                                            </div>
                                            <p className="template-description">Playful, free-form layout with stickers and tapes. Ideal for personal diaries.</p>
                                        </div>
                                    </div>
                                </label>

                                <label className="template-radio-label">
                                    <input
                                        type="radio"
                                        name="template"
                                        className="template-radio-input"
                                        value="grid"
                                        checked={template === 'grid'}
                                        onChange={(e) => setTemplate(e.target.value)}
                                    />
                                    <div className="glow-effect"></div>
                                    <div className="template-card">
                                        <div className="template-preview">
                                            <div className="preview-grid">
                                                <div className="pg-col">
                                                    <div className="pg-item flex-1"></div>
                                                    <div className="pg-item h-8"></div>
                                                </div>
                                                <div className="pg-col">
                                                    <div className="pg-item h-10"></div>
                                                    <div className="pg-item flex-1"></div>
                                                </div>
                                                <div className="pg-col">
                                                    <div className="pg-item flex-1"></div>
                                                </div>
                                            </div>
                                            <div className="check-icon-wrapper">
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                                            </div>
                                        </div>
                                        <div className="template-info">
                                            <div className="template-title-row">
                                                <span className="material-symbols-outlined" style={{ color: '#3b82f6' }}>grid_view</span>
                                                <span className="template-name">Photo Grid</span>
                                            </div>
                                            <p className="template-description">Visual-first layout focusing on photography. Perfect for portfolios.</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="button" className="cancel-btn" onClick={() => navigate('/memories')}>Cancel</button>
                            <button type="submit" className="create-btn">
                                Create Journey
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
