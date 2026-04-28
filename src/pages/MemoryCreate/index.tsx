import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import './MemoryCreate.css';

interface MemoryFormData {
  photo: string | null;
  feelings: string;
  mood: string;
  isPublic: boolean;
}

const MOOD_OPTIONS = [
  { id: 'soft', label: 'Soft', icon: 'cloud' },
  { id: 'joyful', label: 'Joyful', icon: 'wb_sunny' },
  { id: 'blue', label: 'Blue', icon: 'water_drop' },
  { id: 'energetic', label: 'Energetic', icon: 'bolt' },
  { id: 'peaceful', label: 'Peaceful', icon: 'spa' }
];

export const MemoryCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState<MemoryFormData>({
    photo: null,
    feelings: '',
    mood: 'joyful',
    isPublic: true
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.photo || !formData.feelings) {
      alert('Please add a photo and describe your feelings');
      return;
    }

    console.log('Saving memory:', formData);
    // TODO: Integrate with API
    navigate('/memories');
  };

  return (
    <>
      <SEO
        title="Thêm Ký Ức Mới - Meowmuc"
        description="Create a new memory"
      />
      <main className="memory-create-container">
        {/* Page Header */}
        <div className="memory-header">
          <h1>New Memory</h1>
          <p>Capture the feeling of this moment.</p>
        </div>

        {/* Editor Layout */}
        <div className="memory-editor-layout">
          {/* Left Column: Photo Upload */}
          <div
            className={`photo-upload-area ${isDragging ? 'dragging' : ''} ${formData.photo ? 'has-photo' : ''}`}
            onClick={() => !formData.photo && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {!formData.photo ? (
              <div className="upload-placeholder">
                <span className="material-symbols-outlined">add_a_photo</span>
                <p className="upload-title">Add Photo</p>
                <p className="upload-subtitle">Drag & drop or click to upload</p>
              </div>
            ) : (
              <>
                <img src={formData.photo} alt="Memory" className="uploaded-photo" />
                <button
                  className="change-photo-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <span className="material-symbols-outlined">edit</span>
                  Change Photo
                </button>
              </>
            )}
          </div>

          {/* Right Column: Inputs */}
          <div className="memory-inputs">
            {/* Feelings Textarea */}
            <div className="feelings-section">
              <label htmlFor="feelings">How does this moment feel?</label>
              <textarea
                id="feelings"
                className="feelings-textarea"
                placeholder="Write about your feelings, the atmosphere, the smells..."
                value={formData.feelings}
                onChange={(e) => setFormData({ ...formData, feelings: e.target.value })}
              />
            </div>

            {/* Mood Selection */}
            <div className="mood-section">
              <p className="mood-label">Mood</p>
              <div className="mood-buttons">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.id}
                    className={`mood-button ${formData.mood === mood.id ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, mood: mood.id })}
                  >
                    <span className={`material-symbols-outlined ${formData.mood === mood.id ? 'filled' : ''}`}>
                      {mood.icon}
                    </span>
                    <span>{mood.label}</span>
                  </button>
                ))}
                <button className="add-mood-button">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Privacy Toggle */}
            <div className="privacy-section">
              <div className="privacy-info">
                <span className="privacy-title">Visibility</span>
                <span className="privacy-description">Control who can see this memory</span>
              </div>
              <div className="privacy-toggle">
                <span className={`toggle-label ${!formData.isPublic ? 'active' : ''}`}>Private</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${formData.isPublic ? 'active' : ''}`}>Public</span>
              </div>
            </div>

            {/* Save Button */}
            <button className="save-memory-button" onClick={handleSave}>
              Save Memory
            </button>
          </div>
        </div>
      </main>
    </>
  );
};