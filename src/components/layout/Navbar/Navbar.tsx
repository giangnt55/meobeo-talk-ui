import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button/Button';
import { MobileMenu } from './MobileMenu';
import { NotificationDropdown } from '@/components/features/Notification/NotificationDropdown';
import { Notification } from '@/types/notification';
import './Navbar.css';

// Mock data (temporary)
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'comment',
    actor: { name: 'Alex Smith', initials: 'AS' },
    content: { target: 'Creative Coding' },
    timestamp: '2 min ago',
    isRead: false
  },
  {
    id: '2',
    type: 'like',
    actor: { name: 'Mary Jane', initials: 'MJ' },
    content: {},
    timestamp: '1 hour ago',
    isRead: true
  },
  {
    id: '3',
    type: 'mention',
    actor: { name: 'Sarah Jenkins', initials: 'SJ' },
    content: {},
    timestamp: '3 hours ago',
    isRead: true
  },
  {
    id: '4',
    type: 'system',
    actor: { name: 'Meobeo Talk' },
    content: { text: 'Welcome to the community! 🎉' },
    timestamp: '1 day ago',
    isRead: true
  }
];

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mockNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <Link to="/" className="navbar-brand">
              <div className="navbar-logo">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_543)">
                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor" />
                    <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd" />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_543">
                      <rect fill="white" height="48" width="48" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="navbar-title">Meobeo Talk</h2>
            </Link>

            {/* Desktop Navigation */}
            <div className="navbar-desktop">
              <nav className="navbar-links">
                {isAuthenticated ? (
                  <>
                    <Link to="/home" className="nav-link">Main Feed</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/memories" className="nav-link">Memories</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                  </>
                ) : (
                  <>
                    <Link to="/home" className="nav-link">Main Feed</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/memories" className="nav-link">Memories</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    {/* <Link to="/contact" className="nav-link">Contact</Link> */}
                  </>
                )}
              </nav>

              <div className="navbar-actions">
                {isAuthenticated ? (
                  <>
                    <div className="relative">
                      <button
                        className="notification-btn"
                        aria-label="Notifications"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                        <span className="material-symbols-outlined icon-filled">notifications</span>
                        {/* Unread indicator */}
                        {mockNotifications.some(n => !n.isRead) && (
                          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 ring-2 ring-white"></span>
                          </span>
                        )}
                      </button>
                      <NotificationDropdown
                        isOpen={showNotifications}
                        onClose={() => setShowNotifications(false)}
                        notifications={mockNotifications}
                        onMarkAllRead={() => console.log('Mark all read')}
                      />
                    </div>

                    <div className="user-menu-wrapper">
                      <button
                        className="user-avatar-btn"
                        onClick={toggleUserMenu}
                        aria-label="User menu"
                      >
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.displayName} className="avatar-image" />
                        ) : (
                          <div className="avatar-placeholder">
                            {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                      </button>
                      {isUserMenuOpen && (
                        <div className="user-dropdown">
                          <div className="dropdown-header">
                            <p className="user-name">{user?.displayName}</p>
                            <p className="user-email">{user?.email}</p>
                          </div>
                          <div className="dropdown-divider"></div>
                          <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                            <span className="material-symbols-outlined">person</span>
                            Profile
                          </Link>
                          <Link to="/settings/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                            <span className="material-symbols-outlined">settings</span>
                            Settings
                          </Link>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item logout" onClick={handleLogout}>
                            <span className="material-symbols-outlined">logout</span>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/signup')}
                      className="start-blog-btn"
                    >
                      Start Your Blog
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/login')}
                      className="login-btn"
                    >
                      Log In
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};
