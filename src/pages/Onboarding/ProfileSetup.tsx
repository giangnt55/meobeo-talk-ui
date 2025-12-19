import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { profileApi } from '@/api/services/profileApi';
import { onboardingApi } from '@/api/services/onboardingApi';
import './Onboarding.css';

export const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, success, warning, error, removeToast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        warning('File too large', 'Avatar must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        warning('Invalid file type', 'Please upload an image file');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        success('Avatar selected', 'Your profile picture will be uploaded when you continue');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!displayName.trim()) {
      warning('Missing information', 'Please enter your display name');
      return;
    }

    setIsLoading(true);

    try {
      // Upload avatar if selected
      if (avatarFile) {
        await profileApi.uploadAvatar(avatarFile);
      }

      // Update profile
      await profileApi.updateProfile({
        display_name: displayName.trim(),
        bio: bio.trim() || undefined,
      });

      // Update onboarding progress
      await onboardingApi.updateStep(1, [1]);

      success('Profile saved', 'Moving to next step');
      setTimeout(() => navigate('/onboarding/interests'), 500);
    } catch (err) {
      console.error('Failed to save profile:', err);
      error('Failed to save', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);
    try {
      // Still update onboarding step even if skipping
      await onboardingApi.updateStep(1, [1]);
      navigate('/onboarding/interests');
    } catch (err) {
      console.error('Failed to update onboarding:', err);
      // Navigate anyway on skip
      navigate('/onboarding/interests');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="onboarding-main">
        <div className="onboarding-container">
          <div className="onboarding-card">
            <ProgressBar
              currentStep={1}
              totalSteps={3}
              stepLabel="Profile Setup"
            />

            <div className="onboarding-header">
              <h1 className="onboarding-title">
                Set Up Your Meobeo Talk Profile
              </h1>
              <p className="onboarding-subtitle">
                Personalize your space. You can always change this later.
              </p>
            </div>

            <div className="avatar-section">
              <div className="avatar-upload-wrapper">
                <div
                  className="avatar-preview"
                  style={{
                    backgroundImage: avatarPreview
                      ? `url(${avatarPreview})`
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {!avatarPreview && (
                    <span className="avatar-placeholder">
                      {displayName ? displayName[0].toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <label className="avatar-upload-overlay">
                  <span className="upload-icon">📷</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isLoading}
                    hidden
                  />
                </label>
              </div>
              <button className="avatar-upload-button" disabled={isLoading}>
                <label>
                  Upload an Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isLoading}
                    hidden
                  />
                </label>
              </button>
            </div>

            <div className="onboarding-form">
              <Input
                label="Display Name"
                placeholder="e.g., Jane Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={isLoading}
                fullWidth
              />

              <div className="form-group">
                <div className="textarea-header">
                  <label className="form-label">Bio</label>
                  <span className="char-count">{bio.length} / 500</span>
                </div>
                <textarea
                  className="form-textarea"
                  placeholder="Tell us a little about yourself..."
                  value={bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setBio(e.target.value);
                    }
                  }}
                  disabled={isLoading}
                  rows={4}
                />
              </div>
            </div>

            <div className="onboarding-actions">
              <Button
                variant="primary"
                fullWidth
                onClick={handleContinue}
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Saving..."
                rounded="lg"
              >
                Continue
              </Button>
              <button
                className="skip-button"
                onClick={handleSkip}
                disabled={isLoading}
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
