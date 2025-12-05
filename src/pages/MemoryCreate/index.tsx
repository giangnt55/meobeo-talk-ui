import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { Tag } from '../../components/common/Tag/Tag';
import { RichTextEditor } from '../../components/common/RichTextEditor/RichTextEditor';
import { Modal } from '../../components/common/Modal/Modal';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/ToastContainer/ToastContainer';
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
  const { toasts, success, error, warning, removeToast } = useToast();

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
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      success('Tag added', `Added #${newTag.trim()}`);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // In real app: Upload to server and get URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImages((prev) => [...prev, url]);
        success('Image uploaded', 'Image added to your memory');
        resolve(url);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async (isDraft: boolean = false) => {
    setIsSaving(true);

    // Validate
    if (!formData.title.trim()) {
      warning('Missing title', 'Please enter a title');
      setIsSaving(false);
      return;
    }

    if (!formData.content.trim()) {
      warning('Missing content', 'Please write some content');
      setIsSaving(false);
      return;
    }

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
      
      if (isDraft) {
        success('Draft saved', 'Your memory has been saved as a draft');
      } else {
        success('Memory published', 'Your memory is now live!');
        navigate('/timeline');
      }
    }, 1000);
  };

  return (
    <div className="memory-create-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <div className="memory-create-container">
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
          <div className="create-main">
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

            <div className="form-group">
              <label className="form-label">Your Story</label>
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Start writing your story here..."
                minHeight="20rem"
                onImageUpload={handleImageUpload}
              />
            </div>

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

          <aside className="create-sidebar">
            <div className="sidebar-card">
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
    </div>
  );
};