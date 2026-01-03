import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Button } from '@/components/common/Button/Button';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { followApi } from '@/api/services/followApi';
import { onboardingApi } from '@/api/services/onboardingApi';
import type { SuggestedUser } from '@/schemas/onboarding.schema';
import './Onboarding.css';

export const FollowUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, success, info, error, removeToast } = useToast();
  const [users, setUsers] = useState<SuggestedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [followingInProgress, setFollowingInProgress] = useState<Set<string>>(new Set());

  // Load suggested users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const suggestedUsers = await followApi.getSuggestedUsers(20);
        setUsers(suggestedUsers);
      } catch (err) {
        console.error('Failed to load suggested users:', err);
        error('Failed to load', 'Could not load suggested users. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [error]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFollow = async (userId: string, isCurrentlyFollowing: boolean) => {
    // Prevent multiple simultaneous follow/unfollow for same user
    if (followingInProgress.has(userId)) {
      return;
    }

    setFollowingInProgress(prev => new Set(prev).add(userId));

    try {
      if (isCurrentlyFollowing) {
        await followApi.unfollowUser(userId);
        info('Unfollowed', 'You unfollowed this user');

        // Update local state
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === userId ? { ...u, is_following: false } : u
          )
        );
      } else {
        await followApi.followUser(userId);
        success('Following', 'You are now following this user');

        // Update local state
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === userId ? { ...u, is_following: true } : u
          )
        );
      }
    } catch (err) {
      console.error('Failed to toggle follow:', err);
      error('Failed', 'Could not update follow status. Please try again.');
    } finally {
      setFollowingInProgress(prev => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  const handleFinish = async () => {
    setIsSaving(true);

    try {
      // Complete onboarding
      await onboardingApi.complete();

      success('Setup Complete!', 'Welcome to Meobeo Talk');
      setTimeout(() => navigate('/welcome'), 1000);
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      error('Failed to complete', 'Please try again');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = async () => {
    setIsSaving(true);
    try {
      // Complete onboarding even if skipping
      await onboardingApi.complete();
      navigate('/welcome');
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      // Navigate anyway on skip
      navigate('/welcome');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="onboarding-page">
        <main className="onboarding-main">
          <div className="onboarding-container">
            <div className="onboarding-card">
              <p style={{ textAlign: 'center', padding: '2rem' }}>Loading suggested users...</p>
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
        <div className="onboarding-container">
          <div className="onboarding-content-wide">
            <ProgressBar
              currentStep={3}
              totalSteps={3}
              stepLabel="Follow Users"
            />

            <div className="onboarding-header">
              <h1 className="onboarding-title">Connect with others</h1>
              <p className="onboarding-subtitle">
                Follow a few creators to get started. You can always find more later.
              </p>
            </div>

            <div className="search-section-compact">
              <SearchBar
                placeholder="Search for people you know"
                onSearch={setSearchQuery}
                onChange={setSearchQuery}
              />
            </div>

            <div className="users-list">
              {filteredUsers.map((user) => {
                const isFollowingUser = user.is_following;
                const isProcessing = followingInProgress.has(user.id);

                return (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <Avatar
                        src={user.avatar_url || undefined}
                        size="lg"
                        alt={user.display_name || user.username}
                      />
                      <div className="user-details">
                        <p className="user-name">
                          {user.display_name || user.username}
                        </p>
                        <p className="user-role">
                          @{user.username}
                          {user.bio && ` • ${user.bio.substring(0, 50)}${user.bio.length > 50 ? '...' : ''}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isFollowingUser ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleToggleFollow(user.id, isFollowingUser)}
                      disabled={isProcessing || isSaving}
                      isLoading={isProcessing}
                      rounded="lg"
                    >
                      {isFollowingUser ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                );
              })}
            </div>

            {filteredUsers.length === 0 && (
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                No users found. Try a different search.
              </p>
            )}

            <div className="onboarding-actions-final">
              <Button
                variant="primary"
                fullWidth
                onClick={handleFinish}
                disabled={isSaving}
                isLoading={isSaving}
                loadingText="Completing..."
                rounded="lg"
              >
                Continue
              </Button>
              <button
                className="skip-button"
                onClick={handleSkip}
                disabled={isSaving}
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
