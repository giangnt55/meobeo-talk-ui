import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/ToastContainer/ToastContainer';
import './Onboarding.css';

export const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, success, warning, removeToast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        success('Avatar uploaded', 'Your profile picture has been updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (!displayName.trim()) {
      warning('Missing information', 'Please enter your display name');
      return;
    }
    success('Profile saved', 'Moving to next step');
    setTimeout(() => navigate('/onboarding/interests'), 500);
  };

  const handleSkip = () => {
    navigate('/onboarding/interests');
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
                    hidden
                  />
                </label>
              </div>
              <button className="avatar-upload-button">
                <label>
                  Upload an Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
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
                fullWidth
              />

              <div className="form-group">
                <div className="textarea-header">
                  <label className="form-label">Bio</label>
                  <span className="char-count">{bio.length} / 160</span>
                </div>
                <textarea
                  className="form-textarea"
                  placeholder="Tell us a little about yourself..."
                  value={bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 160) {
                      setBio(e.target.value);
                    }
                  }}
                  rows={4}
                />
              </div>
            </div>

            <div className="onboarding-actions">
              <Button
                variant="primary"
                fullWidth
                onClick={handleContinue}
              >
                Continue
              </Button>
              <button className="skip-button" onClick={handleSkip}>
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};