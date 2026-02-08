import React from 'react';
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaUser } from 'react-icons/fa';
import { IoChatbubble } from 'react-icons/io5';
import './HomeSidebar.css';

const HomeSidebar: React.FC = () => {
    return (
        <header className="home-sidebar">
            <div className="sidebar-content">
                <div className="sidebar-top">
                    {/* Logo and Brand */}
                    <div className="sidebar-brand">
                        <IoChatbubble className="brand-icon" />
                        <h1 className="brand-title">Meobeo Talk</h1>
                    </div>

                    <div className="sidebar-nav-section">
                        {/* User Profile */}
                        <div className="user-profile">
                            <div
                                className="user-avatar"
                                style={{
                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_l5485jFfEnq30wOLc6IZMzwsL3aT8NDAzZDu1WBM0_pPymgZ3LtHj-JRGs6smZvu-qlEmud_ZWUsM62jghAWQLN_KlDpVrDx62LHlTaydxtzLcChoT4hqTC3_6YqkK1i3AuUYGugqmSW20nOn70HvDUJo2DY9sZoiUUVFSxshpvRbnafkX9IhQy4neGOa7V9__Y-tuWdEVVxXwlAU0HczEsMUhGe9zGLLH7Xq1VGJwP0pAF175rTsaVxjfvdHyCGtRlhh7Za05oL")'
                                }}
                            />
                            <div className="user-info">
                                <h2 className="user-name">Alex Chen</h2>
                                <p className="user-handle">@alextheblogger</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="sidebar-nav">
                            <a href="/" className="nav-item active">
                                <FaHome className="nav-icon fill" />
                                <p className="nav-text">Trang Chủ</p>
                            </a>
                            <a href="/explore" className="nav-item">
                                <FaCompass className="nav-icon" />
                                <p className="nav-text">Khám Phá</p>
                            </a>
                            <a href="/notifications" className="nav-item">
                                <FaBell className="nav-icon" />
                                <p className="nav-text">Thông Báo</p>
                            </a>
                            <a href="/messages" className="nav-item">
                                <FaEnvelope className="nav-icon" />
                                <p className="nav-text">Tin Nhắn</p>
                            </a>
                            <a href="/bookmarks" className="nav-item">
                                <FaBookmark className="nav-icon" />
                                <p className="nav-text">Đã Lưu</p>
                            </a>
                            <a href="/profile" className="nav-item">
                                <FaUser className="nav-icon" />
                                <p className="nav-text">Hồ Sơ</p>
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Create Post Button */}
                <button className="create-post-btn">
                    <span>Đăng Bài</span>
                </button>
            </div>
        </header>
    );
};

export default HomeSidebar;
