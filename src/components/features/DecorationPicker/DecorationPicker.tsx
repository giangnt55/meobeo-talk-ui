import React, { useState } from 'react';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import './DecorationPicker.css';

interface Sticker {
  id: string;
  emoji: string;
  category: string;
  keywords: string[];
}

interface DecorationPickerProps {
  onSelect?: (decoration: string) => void;
}

const stickerCategories = [
  'All',
  'Recently Used',
  'Trending',
  'Nature',
  'Cosmic',
  'Vintage',
  'Emotions',
  'Activities',
];

const stickers: Sticker[] = [
  { id: '1', emoji: '🐱', category: 'Nature', keywords: ['cat', 'animal', 'cute'] },
  { id: '2', emoji: '☀️', category: 'Nature', keywords: ['sun', 'sunny', 'weather'] },
  { id: '3', emoji: '⭐', category: 'Cosmic', keywords: ['star', 'sparkle'] },
  { id: '4', emoji: '❤️', category: 'Emotions', keywords: ['heart', 'love'] },
  { id: '5', emoji: '🌱', category: 'Nature', keywords: ['plant', 'grow'] },
  { id: '6', emoji: '📷', category: 'Vintage', keywords: ['camera', 'photo'] },
  { id: '7', emoji: '🍕', category: 'Activities', keywords: ['pizza', 'food'] },
  { id: '8', emoji: '☁️', category: 'Nature', keywords: ['cloud', 'weather'] },
  { id: '9', emoji: '📚', category: 'Activities', keywords: ['books', 'read'] },
  { id: '10', emoji: '🪐', category: 'Cosmic', keywords: ['planet', 'space'] },
  { id: '11', emoji: '🧳', category: 'Activities', keywords: ['suitcase', 'travel'] },
  { id: '12', emoji: '😎', category: 'Emotions', keywords: ['cool', 'sunglasses'] },
  { id: '13', emoji: '🌈', category: 'Nature', keywords: ['rainbow', 'color'] },
  { id: '14', emoji: '🎨', category: 'Activities', keywords: ['art', 'paint'] },
  { id: '15', emoji: '🎵', category: 'Activities', keywords: ['music', 'note'] },
  { id: '16', emoji: '🎉', category: 'Emotions', keywords: ['party', 'celebrate'] },
  { id: '17', emoji: '🌸', category: 'Nature', keywords: ['flower', 'blossom'] },
  { id: '18', emoji: '🌙', category: 'Cosmic', keywords: ['moon', 'night'] },
  { id: '19', emoji: '✨', category: 'Cosmic', keywords: ['sparkle', 'magic'] },
  { id: '20', emoji: '🍃', category: 'Nature', keywords: ['leaf', 'nature'] },
];

const frames = [
  { id: 'f1', name: 'Classic', color: '#000000' },
  { id: 'f2', name: 'Vintage', color: '#8B7355' },
  { id: 'f3', name: 'Modern', color: '#FFFFFF' },
  { id: 'f4', name: 'Gold', color: '#FFD700' },
  { id: 'f5', name: 'Silver', color: '#C0C0C0' },
  { id: 'f6', name: 'Rose Gold', color: '#B76E79' },
];

const colors = [
  { id: 'c1', name: 'Sunset', color: '#FF6B6B' },
  { id: 'c2', name: 'Ocean', color: '#4ECDC4' },
  { id: 'c3', name: 'Lavender', color: '#A8E6CF' },
  { id: 'c4', name: 'Peach', color: '#FFD3B6' },
  { id: 'c5', name: 'Sky', color: '#A8D8EA' },
  { id: 'c6', name: 'Mint', color: '#AAFFC3' },
  { id: 'c7', name: 'Coral', color: '#FFB6B9' },
  { id: 'c8', name: 'Lemon', color: '#FEE1A7' },
];

export const DecorationPicker: React.FC<DecorationPickerProps> = ({
  onSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'stickers' | 'frames' | 'colors'>(
    'stickers'
  );
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStickers = stickers.filter((sticker) => {
    const matchesCategory =
      selectedCategory === 'All' || sticker.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      sticker.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      sticker.emoji.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="decoration-picker">
      {/* Header */}
      <div className="decoration-header">
        <div>
          <h2 className="decoration-title">Decorate your memory</h2>
          <p className="decoration-subtitle">
            Add stickers, frames, and colors to make it yours.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="decoration-tabs">
        <button
          className={`decoration-tab ${
            activeTab === 'stickers' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('stickers')}
        >
          Stickers
        </button>
        <button
          className={`decoration-tab ${activeTab === 'frames' ? 'active' : ''}`}
          onClick={() => setActiveTab('frames')}
        >
          Frames
        </button>
        <button
          className={`decoration-tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
      </div>

      {/* Search */}
      {activeTab === 'stickers' && (
        <div className="decoration-search">
          <SearchBar
            placeholder="Search stickers..."
            onSearch={setSearchQuery}
            onChange={setSearchQuery}
          />
        </div>
      )}

      {/* Category Filters (Stickers only) */}
      {activeTab === 'stickers' && (
        <div className="decoration-categories">
          {stickerCategories.map((category) => (
            <button
              key={category}
              className={`category-chip ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="decoration-content">
        {/* Stickers Grid */}
        {activeTab === 'stickers' && (
          <div className="stickers-grid">
            {filteredStickers.map((sticker) => (
              <button
                key={sticker.id}
                className="sticker-button"
                onClick={() => onSelect?.(sticker.emoji)}
                title={sticker.keywords.join(', ')}
              >
                <span className="sticker-emoji">{sticker.emoji}</span>
              </button>
            ))}
          </div>
        )}

        {/* Frames Grid */}
        {activeTab === 'frames' && (
          <div className="frames-grid">
            {frames.map((frame) => (
              <button
                key={frame.id}
                className="frame-button"
                onClick={() => onSelect?.(frame.id)}
              >
                <div
                  className="frame-preview"
                  style={{ borderColor: frame.color }}
                >
                  <div className="frame-sample"></div>
                </div>
                <span className="frame-name">{frame.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Colors Grid */}
        {activeTab === 'colors' && (
          <div className="colors-grid">
            {colors.map((color) => (
              <button
                key={color.id}
                className="color-button"
                onClick={() => onSelect?.(color.color)}
              >
                <div
                  className="color-swatch"
                  style={{ backgroundColor: color.color }}
                ></div>
                <span className="color-name">{color.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredStickers.length === 0 && activeTab === 'stickers' && (
        <div className="decoration-empty">
          <p className="empty-icon">🔍</p>
          <p className="empty-text">No stickers found</p>
        </div>
      )}
    </div>
  );
};