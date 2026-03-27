import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { User } from '@/types/auth';
import './Navbar.css';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated: boolean;
    user: User | null;
    onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    onClose,
    isAuthenticated,
    user,
    onLogout,
}) => {
    const navigate = useNavigate();

    const go = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleLogout = () => {
        onLogout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="mobile-menu-backdrop" onClick={onClose} />

            {/* Slide Menu */}
            <div className="mobile-menu navbar-dropdown-container">

                {/* Header */}
                <div className="mobile-menu-header">
                    <h3>Menu</h3>
                    <button className="close-btn" onClick={onClose} aria-label="Close menu">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="mobile-menu-content">

                    {/* User info (authenticated) */}
                    {isAuthenticated && user && (
                        <div className="mobile-user-info">
                            <div className="mobile-avatar">
                                {user.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt={user.display_name || user.username}
                                    />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {(user.display_name || user.username || 'U').charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="mobile-user-details">
                                <p className="user-name">{user.display_name || user.username}</p>
                                <p className="user-email">@{user.username}</p>
                            </div>
                        </div>
                    )}

                    {/* Navigation links */}
                    <nav className="mobile-nav">
                        {isAuthenticated && (
                            <Link to="/home" className="mobile-nav-link" onClick={() => go('/home')}>
                                <span className="material-symbols-outlined">home</span>
                                Trang Chủ
                            </Link>
                        )}
                        {isAuthenticated ? (
                            <Link to="/blog" className="mobile-nav-link" onClick={() => go('/blog')}>
                                <span className="material-symbols-outlined">article</span>
                                Blog
                            </Link>
                        ) : (
                            <Link to="/explore" className="mobile-nav-link" onClick={() => go('/explore')}>
                                <span className="material-symbols-outlined">explore</span>
                                Explore
                            </Link>
                        )}
                        <Link to="/memories" className="mobile-nav-link" onClick={() => go('/memories')}>
                            <span className="material-symbols-outlined">history</span>
                            Ký Ức
                        </Link>
                        <Link to="/about" className="mobile-nav-link" onClick={() => go('/about')}>
                            <span className="material-symbols-outlined">info</span>
                            Về Tụi Mình
                        </Link>
                    </nav>

                    {/* ── Authenticated section ── */}
                    {isAuthenticated ? (
                        <>
                            {/* Create section */}
                            <div className="mobile-create-section">
                                <p className="mobile-section-label">Tạo Mới</p>
                                <div className="mobile-create-grid">
                                    <Link
                                        to="/blog/create"
                                        className="mobile-create-item"
                                        onClick={() => go('/blog/create')}
                                    >
                                        <div className="create-menu-icon create-icon-blog">
                                            <span className="material-symbols-outlined">edit_note</span>
                                        </div>
                                        <div className="create-menu-content">
                                            <span className="create-menu-title">Blog Mới</span>
                                            <span className="create-menu-subtitle">Viết câu chuyện</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/memories/create"
                                        className="mobile-create-item"
                                        onClick={() => go('/memories/create')}
                                    >
                                        <div className="create-menu-icon create-icon-memory">
                                            <span className="material-symbols-outlined">add_a_photo</span>
                                        </div>
                                        <div className="create-menu-content">
                                            <span className="create-menu-title">Ký Ức Mới</span>
                                            <span className="create-menu-subtitle">Lưu giữ khoảnh khắc</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/journey/create"
                                        className="mobile-create-item"
                                        onClick={() => go('/journey/create')}
                                    >
                                        <div className="create-menu-icon create-icon-journey">
                                            <span className="material-symbols-outlined">flight</span>
                                        </div>
                                        <div className="create-menu-content">
                                            <span className="create-menu-title">Hành Trình</span>
                                            <span className="create-menu-subtitle">Bắt đầu bộ sưu tập</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Account actions */}
                            <div className="mobile-menu-actions">
                                <Link
                                    to={`/profile/${user?.username}`}
                                    className="mobile-action-link"
                                    onClick={() => go(`/profile/${user?.username}`)}
                                >
                                    <span className="material-symbols-outlined">person</span>
                                    Hồ Sơ Của Tôi
                                </Link>
                                <Link
                                    to="/settings/profile"
                                    className="mobile-action-link"
                                    onClick={() => go('/settings/profile')}
                                >
                                    <span className="material-symbols-outlined">settings</span>
                                    Cài Đặt
                                </Link>
                                <button className="mobile-logout-btn" onClick={handleLogout}>
                                    <span className="material-symbols-outlined">logout</span>
                                    Đăng Xuất
                                </button>
                            </div>
                        </>
                    ) : (
                        /* ── Guest section ── */
                        <div className="mobile-menu-actions">
                            <Button
                                variant="primary"
                                onClick={() => go('/signup')}
                                className="mobile-action-btn"
                            >
                                Bắt Đầu Viết Blog
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => go('/login')}
                                className="mobile-action-btn"
                            >
                                Đăng Nhập
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
