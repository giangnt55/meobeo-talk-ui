import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button/Button';
import { MobileMenu } from './MobileMenu';
import { NotificationDropdown } from '@/components/features/Notification/NotificationDropdown';
import { Notification } from '@/types/notification';
import { socketService } from '@/api/services/socketService';
import { notificationApi } from '@/api/services/notificationApi';
import { NavbarSearch } from './NavbarSearch';
import './Navbar.css';

type DropdownType = 'create' | 'notifications' | 'user' | 'mobile' | null;

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, accessToken } = useAuth();
  const navigate = useNavigate();

  // Single source of truth for all navbar dropdowns
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  type RecordData = Record<string, unknown>;

  const toRecord = useCallback((value: unknown): RecordData =>
    typeof value === 'object' && value !== null ? (value as RecordData) : {},
    []);

  const mapBackendToFrontend = useCallback((n: unknown): Notification => {
    const incoming = toRecord(n);
    const dataCandidate = toRecord(incoming.data);
    const hasDataWrapper = Boolean(incoming.type && (dataCandidate.id || dataCandidate.actor_id));

    const source = hasDataWrapper ? dataCandidate : incoming;
    const sourceRecord = toRecord(source);

    const actorCandidate = toRecord(sourceRecord.Actor || sourceRecord.actor || incoming.actor);

    const actorName =
      (actorCandidate.display_name as string) ||
      (actorCandidate.username as string) ||
      (actorCandidate.name as string) ||
      (incoming.actor_name as string) ||
      'Someone';

    const actorAvatar = (actorCandidate.avatar_url as string) || (actorCandidate.avatar as string) || '';

    const rawPayload: unknown = sourceRecord.payload ?? sourceRecord.data ?? {};
    let actualPayload: unknown = rawPayload;

    // Handle sql.NullString representation from backend API
    const rawPayloadRecord = toRecord(rawPayload);
    if (typeof rawPayload === 'object' && rawPayload !== null && 'String' in rawPayloadRecord && 'Valid' in rawPayloadRecord) {
      actualPayload = rawPayloadRecord.String;
    }

    const payloadRecord = toRecord(actualPayload);

    const parsedPayload: RecordData =
      typeof actualPayload === 'string'
        ? (() => {
          try {
            return JSON.parse(actualPayload);
          } catch {
            return {};
          }
        })()
        : payloadRecord;

    const content = {
      text: (parsedPayload as RecordData).text as string | undefined || (sourceRecord.message as string) || '',
      highlight: (parsedPayload as RecordData).highlight as string | undefined,
      target: (parsedPayload as RecordData).target as string | undefined,
      link: (parsedPayload as RecordData).link as string | undefined,
    };

    return {
      id: (sourceRecord.id as string) || `temp-${Date.now()}`,
      type: ((sourceRecord.type as Notification['type']) || (incoming.type as Notification['type']) || 'info') as Notification['type'],
      actor: {
        name: actorName,
        avatar: actorAvatar,
        initials: actorName.charAt(0).toUpperCase(),
      },
      content,
      timestamp: sourceRecord.created_at
        ? new Date(sourceRecord.created_at as string).toLocaleString()
        : new Date().toLocaleString(),
      isRead: Boolean(sourceRecord.is_read),
    };
  }, [toRecord]);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await notificationApi.getNotifications();
      const notificationsList = data.notifications || [];
      const formattedNotifications = notificationsList.map(mapBackendToFrontend);
      setNotifications(formattedNotifications);
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [mapBackendToFrontend]);

  const handleNewNotification = useCallback((data: unknown) => {
    const newNotification = mapBackendToFrontend(data);
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, [mapBackendToFrontend]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // If clicking inside ANY dropdown container, let the onClick handler of that specific container manage it
      if (target.closest('.navbar-dropdown-container')) return;
      setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      // 1. Connect to WebSocket
      socketService.connect(accessToken);

      // 2. Fetch initial notifications
      const rafId = window.requestAnimationFrame(() => fetchNotifications());

      // 3. Listen for new notifications
      const unsubscribe = socketService.onMessage((data: unknown) => {
        const wsData = data as { type?: string };
        if (wsData.type) {
          handleNewNotification(data);
        }
      });

      return () => {
        cancelAnimationFrame(rafId);
        unsubscribe();
        socketService.disconnect();
      };
    }
    return;
  }, [isAuthenticated, accessToken, fetchNotifications, handleNewNotification]);

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Only mark as read if it has a valid UUID (not a temp ID)
      const isTempId = notification.id.startsWith('temp-');

      if (!notification.isRead && !isTempId) {
        await notificationApi.markAsRead(notification.id);
        setNotifications(prev =>
          prev.map(n => (n.id === notification.id ? { ...n, isRead: true } : n))
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }

      const link = notification.content?.link;
      if (link) {
        navigate(link);
        setActiveDropdown(null);
      }
    } catch (error) {
      console.error('Failed to handle notification click:', error);
    }
  };

  const handleLogout = async () => {
    setActiveDropdown(null);
    socketService.disconnect();
    await logout();
    navigate('/');
  };

  const toggleDropdown = (dropdown: DropdownType) => {
    setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
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
                    <Link to="/home" className="nav-link">Trang Chủ</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/memories" className="nav-link">Ký Ức</Link>
                    <Link to="/about" className="nav-link">Về Tụi Mình</Link>
                  </>
                ) : (
                  <>
                    <Link to="/explore" className="nav-link">Khám Phá</Link>
                    {/* <Link to="/memories" className="nav-link">Ký Ức</Link> */}
                    <Link to="/about" className="nav-link">Về Tụi Mình</Link>
                  </>
                )}
              </nav>

              {/* Search */}
              <NavbarSearch />

              <div className="navbar-actions">
                {isAuthenticated ? (
                  <>
                    {/* Create+ Dropdown */}
                    <div className="create-dropdown-wrapper navbar-dropdown-container">
                      <button
                        className="create-dropdown-btn"
                        onClick={() => toggleDropdown('create')}
                        aria-expanded={activeDropdown === 'create'}
                      >
                        <span>Tạo Mới</span>
                        <span className="material-symbols-outlined">expand_more</span>
                      </button>
                      <div className={`create-dropdown-menu ${activeDropdown === 'create' ? 'show' : ''}`}>
                        <Link to="/blog/create" className="create-menu-item" onClick={() => setActiveDropdown(null)}>
                          <div className="create-menu-icon create-icon-blog">
                            <span className="material-symbols-outlined">edit_note</span>
                          </div>
                          <div className="create-menu-content">
                            <span className="create-menu-title">Blog Mới</span>
                            <span className="create-menu-subtitle">Viết câu chuyện</span>
                          </div>
                        </Link>
                        <Link to="/memories/create" className="create-menu-item" onClick={() => setActiveDropdown(null)}>
                          <div className="create-menu-icon create-icon-memory">
                            <span className="material-symbols-outlined">add_a_photo</span>
                          </div>
                          <div className="create-menu-content">
                            <span className="create-menu-title">Ký Ức Mới</span>
                            <span className="create-menu-subtitle">Lưu giữ khoảnh khắc</span>
                          </div>
                        </Link>
                        <Link to="/journey/create" className="create-menu-item" onClick={() => setActiveDropdown(null)}>
                          <div className="create-menu-icon create-icon-journey">
                            <span className="material-symbols-outlined">flight</span>
                          </div>
                          <div className="create-menu-content">
                            <span className="create-menu-title">Hành Trình Mới</span>
                            <span className="create-menu-subtitle">Bắt đầu bộ sưu tập</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="relative navbar-dropdown-container">
                      <button
                        className="notification-btn"
                        aria-label="Notifications"
                        onClick={() => toggleDropdown('notifications')}
                        aria-expanded={activeDropdown === 'notifications'}
                      >
                        <span className="material-symbols-outlined">notifications</span>
                        {/* Unread indicator */}
                        {unreadCount > 0 && (
                          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 ring-2 ring-white"></span>
                          </span>
                        )}
                      </button>
                      <NotificationDropdown
                        isOpen={activeDropdown === 'notifications'}
                        onClose={() => setActiveDropdown(null)}
                        notifications={notifications}
                        onMarkAllRead={handleMarkAllRead}
                        onNotificationClick={handleNotificationClick}
                      />
                    </div>

                    <div className="user-menu-wrapper navbar-dropdown-container">
                      <button
                        className="user-avatar-btn"
                        onClick={() => toggleDropdown('user')}
                        aria-label="User menu"
                        aria-expanded={activeDropdown === 'user'}
                      >
                        {user?.avatar_url ? (
                          <img src={user.avatar_url} alt={user.display_name || user.username} className="avatar-image" />
                        ) : (
                          <div className="avatar-placeholder">
                            {(user?.display_name || user?.username || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                      </button>
                      {activeDropdown === 'user' && (
                        <div className="user-dropdown">
                          <div className="dropdown-header">
                            <p className="user-name">{user?.display_name || user?.username}</p>
                            <p className="user-email">@{user?.username}</p>
                          </div>
                          <div className="dropdown-divider"></div>
                          <Link to={`/profile/${user?.username}`} className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                            <span className="material-symbols-outlined">person</span>
                            Hồ Sơ Của Tôi
                          </Link>
                          <Link to="/settings/profile" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                            <span className="material-symbols-outlined">settings</span>
                            Cài Đặt
                          </Link>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item logout" onClick={handleLogout}>
                            <span className="material-symbols-outlined">logout</span>
                            Đăng Xuất
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
                      Bắt Đầu Viết Blog
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/login')}
                      className="login-btn"
                    >
                      Đăng Nhập
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn navbar-dropdown-container"
              onClick={() => toggleDropdown('mobile')}
              aria-label="Toggle menu"
              aria-expanded={activeDropdown === 'mobile'}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={activeDropdown === 'mobile'}
        onClose={() => setActiveDropdown(null)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

