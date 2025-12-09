import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/common/Button/Button';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { FaBell, FaRegCommentDots, FaCameraRetro } from 'react-icons/fa';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LEFT AREA */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <FaCameraRetro size={26} />
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

        {/* RIGHT AREA */}
        <div className="navbar-right">
          <div className="desktop-only">
            <SearchBar placeholder="Search memories..." />
          </div>

          <button className="icon-button desktop-only">
            <FaBell size={20} />
          </button>

          <button className="icon-button desktop-only">
            <FaRegCommentDots size={20} />
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
