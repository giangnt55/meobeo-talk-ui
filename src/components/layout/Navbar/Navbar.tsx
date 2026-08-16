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
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
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

      // 3. Listen for new notifications (skip chat_message — handled by useChat)
      const unsubscribe = socketService.onMessage((data: unknown) => {
        const wsData = data as { type?: string };
        if (wsData.type && wsData.type !== 'chat_message') {
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
                <img src="/logo/logo_meow.png" alt="Meowmuc" />
              </div>
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
                    {/* Chat */}
                    <ChatNavButton />
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

// ── Chat Nav Button ────────────────────────────────────────────────────────────

const ChatNavButton: React.FC = () => {
  const navigate = useNavigate();
  const unreadCount = useSelector((s: RootState) => s.chat.unreadCount);
  const totalUnread = Object.values(unreadCount).reduce((sum, n) => sum + n, 0);

  return (
    <div className="relative">
      <button
        className="notification-btn"
        aria-label="Tin nhắn"
        onClick={() => navigate('/chat')}
      >
        <span className="material-symbols-outlined">chat</span>
        {totalUnread > 0 && (
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 ring-2 ring-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};
