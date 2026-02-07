import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '@/components/features/TemplateCard/TemplateCard';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Button } from '@/components/common/Button/Button';
import type { MemoryTemplate } from '@/types/memory';
import { mockTemplates } from '@/mock/memoryData';
import './Templates.css';

const categories = [
  'All',
  'Travel',
  'Friendship',
  'Celebration',
  'Daily Life',
  'Love',
  'Reflections',
];

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [templates] = useState<MemoryTemplate[]>(mockTemplates);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/memories/create?template=${templateId}`);
  };

  return (
    <div className="templates-page">
      <div className="templates-container">
        {/* Header */}
        <div className="templates-header">
          <div>
            <h1 className="templates-title">Choose Your Memory Template</h1>
            <p className="templates-subtitle">
              Find the perfect canvas to tell your story.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/memories/create')}
          >
            Create Your Own
          </Button>
        </div>

        {/* Search */}
        <div className="templates-search">
          <SearchBar
            placeholder="Search templates by keyword or theme"
            onSearch={setSearchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Category Filter */}
        <div className="templates-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              category={template.category}
              thumbnail={template.thumbnail}
              onSelect={() => handleSelectTemplate(template.id)}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="templates-empty">
            <p className="empty-icon">🔍</p>
            <h3 className="empty-title">No templates found</h3>
            <p className="empty-text">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};