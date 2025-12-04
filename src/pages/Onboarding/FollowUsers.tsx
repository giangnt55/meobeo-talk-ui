import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { SearchBar } from '../../components/common/SearchBar/SearchBar';
import { Button } from '../../components/common/Button/Button';
import { Avatar } from '../../components/common/Avatar/Avatar';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/ToastContainer/ToastContainer';
import './Onboarding.css';

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const suggestedUsers: User[] = [
  { id: '1', name: 'Eleanor Vance', role: 'Photographer & Writer', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Marcus Holloway', role: 'Digital Artist', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Clara Bishop', role: 'UX Designer & Podcaster', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Leo Kim', role: 'Startup Founder', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Sophie Turner', role: 'Travel Blogger', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'James Chen', role: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=6' },
];

export const FollowUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, success, info, removeToast } = useToast();
  const [following, setFollowing] = useState<string[]>(['2']); // Marcus is already followed
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = suggestedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFollow = (userId: string) => {
    setFollowing((prev) => {
      if (prev.includes(userId)) {
        info('Unfollowed', 'You unfollowed this user');
        return prev.filter((id) => id !== userId);
      } else {
        success('Following', 'You are now following this user');
        return [...prev, userId];
      }
    });
  };

  const handleFinish = () => {
    success('Setup Complete!', 'Welcome to Meobeo Talk');
    setTimeout(() => navigate('/timeline'), 1000);
  };

  return (
    <div className="onboarding-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <header className="onboarding-nav">
        <div className="nav-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
            </svg>
          </div>
          <h2>Meobeo Talk</h2>
        </div>
        <div className="nav-actions">
          <button className="icon-button">🔔</button>
          <button className="icon-button">⚙️</button>
          <Avatar size="md" src="https://i.pravatar.cc/150?img=1" />
        </div>
      </header>

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
                const isFollowing = following.includes(user.id);
                return (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <Avatar src={user.avatar} size="lg" alt={user.name} />
                      <div className="user-details">
                        <p className="user-name">{user.name}</p>
                        <p className="user-role">{user.role}</p>
                      </div>
                    </div>
                    <Button
                      variant={isFollowing ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleToggleFollow(user.id)}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="onboarding-actions-final">
              <Button
                variant="primary"
                fullWidth
                onClick={handleFinish}
              >
                Continue
              </Button>
              <button className="skip-button" onClick={() => navigate('/timeline')}>
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};