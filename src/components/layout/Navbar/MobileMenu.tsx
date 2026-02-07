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

    const handleNavigation = (path: string) => {
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
            <div className="mobile-menu">
                <div className="mobile-menu-header">
                    <h3>Menu</h3>
                    <button className="close-btn" onClick={onClose} aria-label="Close menu">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="mobile-menu-content">
                    {isAuthenticated && user && (
                        <div className="mobile-user-info">
                            <div className="mobile-avatar">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.displayName} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {user.displayName?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                            <div className="mobile-user-details">
                                <p className="user-name">{user.displayName}</p>
                                <p className="user-email">{user.email}</p>
                            </div>
                        </div>
                    )}

                    <nav className="mobile-nav">
                        <Link to="/home" className="mobile-nav-link" onClick={() => handleNavigation('/home')}>
                            <span className="material-symbols-outlined">home</span>
                            Home
                        </Link>
                        <Link to="/blog" className="mobile-nav-link" onClick={() => handleNavigation('/blog')}>
                            <span className="material-symbols-outlined">article</span>
                            Blog
                        </Link>
                        <Link to="/memories" className="mobile-nav-link" onClick={() => handleNavigation('/memories')}>
                            <span className="material-symbols-outlined">history</span>
                            Memories
                        </Link>
                        <Link to="/about" className="mobile-nav-link" onClick={() => handleNavigation('/about')}>
                            <span className="material-symbols-outlined">info</span>
                            About Us
                        </Link>
                    </nav>

                    <div className="mobile-menu-actions">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="mobile-action-link" onClick={() => handleNavigation('/profile')}>
                                    <span className="material-symbols-outlined">person</span>
                                    Profile
                                </Link>
                                <Link to="/settings/profile" className="mobile-action-link" onClick={() => handleNavigation('//settings/profile')}>
                                    <span className="material-symbols-outlined">settings</span>
                                    Settings
                                </Link>
                                <button className="mobile-logout-btn" onClick={handleLogout}>
                                    <span className="material-symbols-outlined">logout</span>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={() => handleNavigation('/signup')}
                                    className="mobile-action-btn"
                                >
                                    Start Your Blog
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleNavigation('/login')}
                                    className="mobile-action-btn"
                                >
                                    Log In
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
