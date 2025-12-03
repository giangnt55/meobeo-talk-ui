import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '../../common/Avatar/Avatar';
import { Button } from '../../common/Button/Button';
import { SearchBar } from '../../common/SearchBar/SearchBar';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <svg viewBox="0 0 48 48" fill="currentColor">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
              </svg>
            </div>
            <span className="brand-name">Meobeo Talk</span>
          </Link>

          <div className="navbar-nav desktop-only">
            <Link
              to="/timeline"
              className={`nav-link ${isActive('/timeline') ? 'active' : ''}`}
            >
              Timeline
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
            >
              Gallery
            </Link>
            <Link
              to="/map"
              className={`nav-link ${isActive('/map') ? 'active' : ''}`}
            >
              Map View
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <div className="desktop-only">
            <SearchBar placeholder="Search memories..." />
          </div>

          <Link to="/memory/create">
            <Button variant="primary" size="md">
              New Memory
            </Button>
          </Link>

          <button className="icon-button desktop-only">
            <span className="icon">🔔</span>
          </button>

          <button className="icon-button desktop-only">
            <span className="icon">💬</span>
          </button>

          <Avatar
            src="https://i.pravatar.cc/150?img=1"
            alt="User Avatar"
            size="md"
          />
        </div>
      </div>
    </nav>
  );
};