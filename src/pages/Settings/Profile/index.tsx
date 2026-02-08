import React, { useState } from 'react';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Toggle } from '@/components/common/Toggle/Toggle';
import './ProfileSettings.css';

export const ProfileSettingsPage: React.FC = () => {
    const [preferences, setPreferences] = useState({
        profileVisibility: true,
        marketingEmails: false,
    });

    return (
        <div className="settings-page">
            <div className="settings-main-container">
                <div className="settings-content-wrapper">
                    <div className="settings-grid">
                        {/* Sidebar */}
                        <aside className="settings-sidebar">
                            <div className="sidebar-sticky">
                                <div className="user-summary">
                                    <Avatar size="lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHe7e7ibZPOyFiOFQTFYY4swStrm_3wKvH5Npifm6o6DLq6XdAjkxz3R9Gt2HdAuJDFV1d1-J3XfDMx8-CO0hATiLjPyr_5aoR3xxLFQf1U8q50iNhCBDN06zu_EFcinQltETKUyBSVQQ9bAFRZyrqV8Fhy_08_SW5Z5kciLFT4EWVxIcD-FMLQEIacru0Tvya27YQe7Jn-nk029xRnjpeHEx53JzIblrERtxQQhvBc4G20iYpKPsnC3Su-IO-ENcyr6lpJWSX1t7_" />
                                    <div className="user-info">
                                        <h1>Jane Doe</h1>
                                        <p>@janedoe</p>
                                    </div>
                                </div>
                                <nav className="sidebar-nav">
                                    <a className="sidebar-link active" href="#">
                                        <span className="material-symbols-outlined">person</span>
                                        <span className="link-text">Tài khoản</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">security</span>
                                        <span className="link-text">Riêng tư & An toàn</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">notifications</span>
                                        <span className="link-text">Thông báo</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">palette</span>
                                        <span className="link-text">Giao diện</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">extension</span>
                                        <span className="link-text">Ứng dụng kết nối</span>
                                    </a>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="settings-main">
                            <div className="settings-card">
                                <div className="section-heading">
                                    <h2>Cài đặt tài khoản</h2>
                                    <p>Quản lý thông tin cá nhân và bảo mật tài khoản.</p>
                                </div>

                                <section className="profile-header-card">
                                    <div className="avatar-wrapper">
                                        <Avatar className="profile-lg-avatar" size="xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQHQ2YCIRGk655XQhpybTzeGXZC2mFKHxZAZn5xSQMQvnXL_h2gabd3P-Lt377YTDWZkPPFOIuQqNT_MxgXT3Cv6ENcIYWkRpz4ZLQcI1eDB6mZlDhlk2LzkN6Z450UYR8lVX-LS8t_77Bz50kT2pjTDoPV5iLmWX3oEcDfJPF4I2Q2AP7W3VFX7xc0qMYLmNB3-IGPd1LKAYke3ehbxf2Aunfnm5hYjNIkEQfZAAPp-Z3Nrk865Ul5qPb2D1KuNtq2ANXygGgB9xz" />
                                        <div className="avatar-overlay">
                                            <span className="material-symbols-outlined text-white">edit</span>
                                        </div>
                                    </div>
                                    <div className="profile-info">
                                        <div>
                                            <h3 className="profile-name">Jane Doe</h3>
                                            <p className="profile-meta">Thành viên từ tháng 9, 2023</p>
                                        </div>
                                        <div className="profile-actions">
                                            <Button variant="outline" size="sm" rounded="full">Đổi ảnh đại diện</Button>
                                            <Button variant="ghost" size="sm" rounded="full" className="text-error hover:bg-error-light">Xóa</Button>
                                        </div>
                                    </div>
                                </section>

                                <section className="form-section">
                                    <h3 className="section-title">Thông tin cá nhân</h3>
                                    <div className="form-grid">
                                        <Input
                                            label="Tên hiển thị"
                                            value="Jane Doe"
                                            fullWidth
                                            endIcon={<span className="material-symbols-outlined text-[#896f61]">edit</span>}
                                            readOnly
                                        />
                                        <Input
                                            label="Tên đăng nhập"
                                            value="@janedoe"
                                            fullWidth
                                            endIcon={<span className="material-symbols-outlined text-green-500">check_circle</span>}
                                            readOnly
                                        />
                                        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label className="text-sm font-bold ml-2">Giới thiệu</label>
                                            <textarea
                                                className="textarea-field"
                                                placeholder="Kể cho chúng tớ nghe một chút về bạn..."
                                                defaultValue="Digital nomad, coffee enthusiast, and lover of all things design. Creating stories on Meobeo Talk."
                                            />
                                            <span className="text-xs text-[#896f61] text-right mr-2">120/160 ký tự</span>
                                        </div>
                                        <div className="col-span-full relative">
                                            <Input
                                                label="Địa chỉ Email"
                                                type="email"
                                                value="jane.doe@example.com"
                                                fullWidth
                                                readOnly
                                            />
                                            <Button size="sm" variant="secondary" rounded="full" className="absolute right-2 top-[2rem] z-10 h-8 text-xs">Xác thực</Button>
                                        </div>
                                    </div>
                                </section>

                                <section className="form-section">
                                    <h3 className="section-title">Tùy chọn</h3>
                                    <div className="flex flex-col gap-4">
                                        <div className="pref-item">
                                            <div className="flex items-center gap-4">
                                                <div className="pref-icon-wrapper">
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </div>
                                                <div className="pref-label">
                                                    <h4>Hiển thị hồ sơ</h4>
                                                    <p>Cho phép tìm thấy hồ sơ của bạn trên trang tìm kiếm</p>
                                                </div>
                                            </div>
                                            <Toggle
                                                checked={preferences.profileVisibility}
                                                onChange={(checked) => setPreferences(prev => ({ ...prev, profileVisibility: checked }))}
                                                aria-label="Profile Visibility"
                                            />
                                        </div>

                                        <div className="pref-item">
                                            <div className="flex items-center gap-4">
                                                <div className="pref-icon-wrapper">
                                                    <span className="material-symbols-outlined">mark_email_unread</span>
                                                </div>
                                                <div className="pref-label">
                                                    <h4>Email quảng cáo</h4>
                                                    <p>Nhận thông tin về các cập nhật mới nhất</p>
                                                </div>
                                            </div>
                                            <Toggle
                                                checked={preferences.marketingEmails}
                                                onChange={(checked) => setPreferences(prev => ({ ...prev, marketingEmails: checked }))}
                                                aria-label="Marketing Emails"
                                            />
                                        </div>

                                        <div className="pref-item">
                                            <div className="flex items-center gap-4">
                                                <div className="pref-icon-wrapper">
                                                    <span className="material-symbols-outlined">verified_user</span>
                                                </div>
                                                <div className="pref-label">
                                                    <h4>Xác thực 2 yếu tố</h4>
                                                    <p>Bảo vệ tài khoản với 2FA</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-primary font-bold">Thiết lập</Button>
                                        </div>
                                    </div>
                                </section>

                                <div className="settings-footer">
                                    <a href="#" className="deactivate-link">Vô hiệu hóa tài khoản</a>
                                    <div className="footer-btn-group">
                                        <Button variant="outline" rounded="full" className="flex-1 sm:flex-none">Hủy</Button>
                                        <Button variant="primary" rounded="full" className="flex-1 sm:flex-none shadow-lg shadow-primary/30">Lưu thay đổi</Button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};
