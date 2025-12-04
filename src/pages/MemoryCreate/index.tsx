import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { Tag } from '../../components/common/Tag/Tag';
import { Modal } from '../../components/common/Modal/Modal';
import type { Memory } from '../../types/memory';
import './MemoryCreate.css';

const moods = ['Happy', 'Nostalgic', 'Reflective', 'Excited', 'Grateful', 'Peaceful'];

const visibilityOptions = [
  { value: 'public', label: 'Public', icon: '🌍', description: 'Anyone can see' },
  { value: 'friends', label: 'Friends Only', icon: '👥', description: 'Only friends' },
  { value: 'private', label: 'Private', icon: '🔒', description: 'Only you' },
];

export const MemoryCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: '',
    visibility: 'public' as 'public' | 'friends' | 'private',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (templateId) {
      // Load template data
      console.log('Loading template:', templateId);
    }
  }, [templateId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In real app, upload to server and get URLs
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((img) => img !== imageToRemove));
  };

  const handleSave = async (isDraft: boolean = false) => {
    setIsSaving(true);

    // Validate
    if (!formData.title.trim()) {
      alert('Please enter a title');
      setIsSaving(false);
      return;
    }

    if (!formData.content.trim()) {
      alert('Please enter some content');
      setIsSaving(false);
      return;
    }

    // Create memory object
    const newMemory: Partial<Memory> = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      date: formData.date,
      mood: formData.mood,
      tags: tags,
      images: images,
      visibility: formData.visibility,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'current-user',
      likes: 0,
      comments: 0,
    };

    // Simulate API call
    setTimeout(() => {
      console.log('Saving memory:', newMemory, 'isDraft:', isDraft);
      setIsSaving(false);
      navigate('/timeline');
    }, 1000);
  };

  return (
    <div className="memory-create-page">
      <div className="memory-create-container">
        {/* Header */}
        <div className="create-header">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            icon={<span>←</span>}
          >
            Back
          </Button>
          <h1 className="create-title">Create a New Memory</h1>
        </div>

        <div className="create-content">
          {/* Main Editor */}
          <div className="create-main">
            {/* Title */}
            <div className="form-group">
              <Input
                name="title"
                label="Title"
                placeholder="What's this memory called?"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
              />
            </div>

            {/* Content Editor */}
            <div className="form-group">
              <label className="form-label">Your Story</label>
              <div className="editor-container">
                <textarea
                  name="content"
                  className="editor-textarea"
                  placeholder="Start writing your story here..."
                  value={formData.content}
                  onChange={handleInputChange}
                />
                <div className="editor-toolbar">
                  <div className="toolbar-left">
                    <button className="toolbar-button" title="Bold">
                      <span className="icon">B</span>
                    </button>
                    <button className="toolbar-button" title="Italic">
                      <span className="icon">I</span>
                    </button>
                    <button className="toolbar-button" title="List">
                      <span className="icon">≡</span>
                    </button>
                    <div className="toolbar-divider" />
                    <label className="toolbar-button" title="Add Photo">
                      <span className="icon">🖼️</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        hidden
                      />
                    </label>
                    <button
                      className="toolbar-button"
                      title="Add Emoji"
                      onClick={() => setShowStickerModal(true)}
                    >
                      <span className="icon">😊</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="form-group">
                <label className="form-label">Images</label>
                <div className="images-preview">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image} alt={`Upload ${index + 1}`} />
                      <button
                        className="image-remove"
                        onClick={() => handleRemoveImage(image)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="form-group">
              <label className="form-label">Tags</label>
              <div className="tags-container">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    size="md"
                    onRemove={() => handleRemoveTag(tag)}
                  >
                    #{tag}
                  </Tag>
                ))}
              </div>
              <div className="tag-input-wrapper">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button onClick={handleAddTag} size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="create-sidebar">
            <div className="sidebar-card">
              {/* Save Buttons */}
              <div className="sidebar-section">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleSave(false)}
                  isLoading={isSaving}
                >
                  Save Memory
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                >
                  Save as Draft
                </Button>
              </div>

              <div className="sidebar-divider" />

              {/* Visibility */}
              <div className="sidebar-section">
                <h3 className="sidebar-heading">Visibility</h3>
                <div className="visibility-options">
                  {visibilityOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`visibility-option ${
                        formData.visibility === option.value ? 'active' : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          visibility: option.value as any,
                        }))
                      }
                    >
                      <span className="visibility-icon">{option.icon}</span>
                      <div className="visibility-info">
                        <span className="visibility-label">
                          {option.label}
                        </span>
                        <span className="visibility-description">
                          {option.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div className="sidebar-section">
                <h3 className="sidebar-heading">Mood</h3>
                <div className="mood-options">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      className={`mood-chip ${
                        formData.mood === mood ? 'active' : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, mood }))
                      }
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="sidebar-section">
                <h3 className="sidebar-heading">Date</h3>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>

              {/* Template */}
              {!templateId && (
                <div className="sidebar-section">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/templates')}
                  >
                    Choose Template
                  </Button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Sticker Modal */}
      <Modal
        isOpen={showStickerModal}
        onClose={() => setShowStickerModal(false)}
        title="Add Decorations"
        size="lg"
      >
        <div className="stickers-content">
          <div className="stickers-tabs">
            <button className="sticker-tab active">Stickers</button>
            <button className="sticker-tab">Frames</button>
            <button className="sticker-tab">Colors</button>
          </div>
          <div className="stickers-grid">
            {['🎉', '❤️', '⭐', '🌟', '🎨', '📸', '✈️', '🌺', '☕', '📚', '🎵', '🌈'].map(
              (emoji, idx) => (
                <button
                  key={idx}
                  className="sticker-item"
                  onClick={() => {
                    // Add emoji to content
                    setFormData((prev) => ({
                      ...prev,
                      content: prev.content + emoji,
                    }));
                    setShowStickerModal(false);
                  }}
                >
                  <span className="sticker-emoji">{emoji}</span>
                </button>
              )
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};