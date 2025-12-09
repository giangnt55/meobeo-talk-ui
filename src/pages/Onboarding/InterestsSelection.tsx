import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import './Onboarding.css';

interface Interest {
  id: string;
  name: string;
  category: string;
  image: string;
}

const interests: Interest[] = [
  { id: '1', name: 'Travel', category: 'Popular', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400' },
  { id: '2', name: 'Foodie', category: 'Popular', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
  { id: '3', name: 'Photography', category: 'Popular', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400' },
  { id: '4', name: 'UI/UX', category: 'Tech', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400' },
  { id: '5', name: 'Startups', category: 'Tech', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400' },
  { id: '6', name: 'Wellness', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400' },
  { id: '7', name: 'Indie Games', category: 'Gaming', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400' },
  { id: '8', name: 'Book Lovers', category: 'Arts', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400' },
  { id: '9', name: 'Film Making', category: 'Arts', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400' },
  { id: '10', name: 'Street Art', category: 'Arts', image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400' },
  { id: '11', name: 'Podcasts', category: 'Popular', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400' },
  { id: '12', name: 'DIY', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400' },
];

const categories = ['Popular', 'Tech', 'Lifestyle', 'Arts', 'Gaming', 'Wellness'];

export const InterestsSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, success, info, warning, removeToast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInterests = interests.filter((interest) => {
    const matchesCategory = activeCategory === 'Popular' || interest.category === activeCategory;
    const matchesSearch = !searchQuery || interest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else {
        if (prev.length >= 10) {
          warning('Maximum reached', 'You can select up to 10 interests');
          return prev;
        }
        return [...prev, interestId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedInterests.length < 5) {
      warning('Select more interests', 'Please select at least 5 interests');
      return;
    }
    success('Interests saved', 'Moving to next step');
    setTimeout(() => navigate('/onboarding/follow'), 500);
  };

  const remaining = Math.max(0, 5 - selectedInterests.length);

  return (
    <div className="onboarding-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="onboarding-main">
        <div className="onboarding-wide-container">
          <div className="onboarding-content">
            <ProgressBar
              currentStep={2}
              totalSteps={3}
              stepLabel="Interests Selection"
            />

            <div className="onboarding-header">
              <h1 className="onboarding-title">What are you interested in?</h1>
              <p className="onboarding-subtitle">
                Select 5 or more topics to see the content you love.
              </p>
            </div>

            <div className="search-section">
              <SearchBar
                placeholder="Search for interests"
                onSearch={setSearchQuery}
                onChange={setSearchQuery}
              />
            </div>

            <div className="tabs-section">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`tab-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="interests-grid">
              {filteredInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    className={`interest-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleInterest(interest.id)}
                  >
                    <div
                      className="interest-image"
                      style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${interest.image})`,
                      }}
                    >
                      <p className="interest-name">#{interest.name}</p>
                    </div>
                    {isSelected && (
                      <div className="interest-selected-overlay">
                        <span className="check-icon">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="onboarding-footer">
              <p className="selection-status">
                {selectedInterests.length} selected.{' '}
                {remaining > 0 ? `Select ${remaining} more.` : 'Ready to continue!'}
              </p>
              <div className="footer-actions">
                <button
                  className="skip-button"
                  onClick={() => navigate('/onboarding/follow')}
                >
                  Skip for now
                </button>
                <Button
                  variant="primary"
                  onClick={handleContinue}
                  disabled={selectedInterests.length < 5}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};