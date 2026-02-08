import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { interestsApi } from '@/api/services/interestsApi';
import { onboardingApi } from '@/api/services/onboardingApi';
import type { Interest } from '@/schemas/onboarding.schema';
import './Onboarding.css';

export const InterestsSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, success, warning, error, removeToast } = useToast();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load interests and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [interestsData, categoriesData, userInterests] = await Promise.all([
          interestsApi.getInterests(),
          interestsApi.getCategories(),
          interestsApi.getUserInterests().catch(() => []), // Don't fail if user has no interests yet
        ]);

        setInterests(interestsData);
        setCategories(categoriesData);

        // Set first category as active
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0]);
        }

        // Pre-select user's existing interests
        if (userInterests.length > 0) {
          setSelectedInterests(userInterests.map(i => i.id));
        }
      } catch (err) {
        console.error('Failed to load interests:', err);
        error('Failed to load', 'Could not load interests. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [error]);

  const filteredInterests = interests.filter((interest) => {
    const matchesCategory = !activeCategory || interest.category.toLowerCase() === activeCategory.toLowerCase();
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

  const handleContinue = async () => {
    if (selectedInterests.length < 5) {
      warning('Select more interests', 'Please select at least 5 interests');
      return;
    }

    setIsSaving(true);

    try {
      // Save interests
      await interestsApi.addUserInterests(selectedInterests);

      // Update onboarding progress
      await onboardingApi.updateStep(2, [1, 2]);

      success('Interests saved', 'Moving to next step');
      setTimeout(() => navigate('/onboarding/follow'), 500);
    } catch (err) {
      console.error('Failed to save interests:', err);
      error('Failed to save', 'Please try again');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = async () => {
    setIsSaving(true);
    try {
      // Still update onboarding step even if skipping
      await onboardingApi.updateStep(2, [1, 2]);
      navigate('/onboarding/follow');
    } catch (err) {
      console.error('Failed to update onboarding:', err);
      // Navigate anyway on skip
      navigate('/onboarding/follow');
    } finally {
      setIsSaving(false);
    }
  };

  const remaining = Math.max(0, 5 - selectedInterests.length);

  if (isLoading) {
    return (
      <div className="onboarding-page">
        <main className="onboarding-main">
          <div className="onboarding-container">
            <div className="onboarding-card">
              <p style={{ textAlign: 'center', padding: '2rem' }}>Loading interests...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="onboarding-main">
        <div className="onboarding-wide-container">
          <div className="onboarding-content">
            <ProgressBar
              currentStep={2}
              totalSteps={3}
              stepLabel="Chọn Sở Thích"
            />

            <div className="onboarding-header">
              <h1 className="onboarding-title">Bạn thích gì dợ?</h1>
              <p className="onboarding-subtitle">
                Chọn ít nhất 5 chủ đề để tụi mình gợi ý nội dung chuẩn gu nha.
              </p>
            </div>

            <div className="search-section">
              <SearchBar
                placeholder="Tìm sở thích"
                onSearch={setSearchQuery}
                onChange={setSearchQuery}
              />
            </div>

            <div className="tabs-section">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`tab-button ${activeCategory.toLowerCase() === category.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  disabled={isSaving}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
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
                    disabled={isSaving}
                  >
                    <div
                      className="interest-image"
                      style={{
                        backgroundImage: interest.image_url
                          ? `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${interest.image_url})`
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

            {filteredInterests.length === 0 && (
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                Hông tìm thấy gì hết trơn. Thử tìm từ khác xem sao ha.
              </p>
            )}

            <div className="onboarding-footer">
              <p className="selection-status">
                {selectedInterests.length} đã chọn.{' '}
                {remaining > 0 ? `Chọn thêm ${remaining} cái nữa nha.` : 'Sẵn sàng rồi nè!'}
              </p>
              <div className="footer-actions">
                <button
                  className="skip-button"
                  onClick={handleSkip}
                  disabled={isSaving}
                >
                  Để sau nha
                </button>
                <Button
                  variant="primary"
                  onClick={handleContinue}
                  disabled={selectedInterests.length < 5 || isSaving}
                  isLoading={isSaving}
                  loadingText="Đang lưu..."
                  rounded="lg"
                >
                  Tiếp Tục
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
