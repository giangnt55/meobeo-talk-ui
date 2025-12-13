import React, { useState } from 'react';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import './ProfileSettings.css';

export const ProfileSettingsPage: React.FC = () => {
    const [preferences, setPreferences] = useState({
        profileVisibility: true,
        marketingEmails: false,
    });

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

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
                                        <span className="link-text">Account</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">security</span>
                                        <span className="link-text">Privacy & Safety</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">notifications</span>
                                        <span className="link-text">Notifications</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">palette</span>
                                        <span className="link-text">Appearance</span>
                                    </a>
                                    <a className="sidebar-link" href="#">
                                        <span className="material-symbols-outlined">extension</span>
                                        <span className="link-text">Connected Apps</span>
                                    </a>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="settings-main">
                            <div className="settings-card">
                                <div className="section-heading">
                                    <h2>Account Settings</h2>
                                    <p>Manage your basic profile information and account security.</p>
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
                                            <p className="profile-meta">Member since September 2023</p>
                                        </div>
                                        <div className="profile-actions">
                                            <Button variant="outline" size="sm" rounded="full">Change Avatar</Button>
                                            <Button variant="ghost" size="sm" rounded="full" className="text-error hover:bg-error-light">Remove</Button>
                                        </div>
                                    </div>
                                </section>

                                <section className="form-section">
                                    <h3 className="section-title">Personal Information</h3>
                                    <div className="form-grid">
                                        <Input
                                            label="Display Name"
                                            value="Jane Doe"
                                            fullWidth
                                            endIcon={<span className="material-symbols-outlined text-[#896f61]">edit</span>}
                                            readOnly
                                        />
                                        <Input
                                            label="Username"
                                            value="@janedoe"
                                            fullWidth
                                            endIcon={<span className="material-symbols-outlined text-green-500">check_circle</span>}
                                            readOnly
                                        />
                                        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label className="text-sm font-bold ml-2">Bio</label>
                                            <textarea
                                                className="textarea-field"
                                                placeholder="Tell us a little about yourself..."
                                                defaultValue="Digital nomad, coffee enthusiast, and lover of all things design. Creating stories on Meobeo Talk."
                                            />
                                            <span className="text-xs text-[#896f61] text-right mr-2">120/160 characters</span>
                                        </div>
                                        <div className="col-span-full relative">
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                value="jane.doe@example.com"
                                                fullWidth
                                                readOnly
                                            />
                                            <Button size="sm" variant="secondary" rounded="full" className="absolute right-2 top-[2rem] z-10 h-8 text-xs">Verify</Button>
                                        </div>
                                    </div>
                                </section>

                                <section className="form-section">
                                    <h3 className="section-title">Preferences</h3>
                                    <div className="flex flex-col gap-4">
                                        <div className="pref-item">
                                            <div className="flex items-center gap-4">
                                                <div className="pref-icon-wrapper">
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </div>
                                                <div className="pref-label">
                                                    <h4>Profile Visibility</h4>
                                                    <p>Make your profile visible to search engines</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`toggle-switch ${preferences.profileVisibility ? 'checked' : ''}`}
                                                onClick={() => togglePreference('profileVisibility')}
                                            >
                                                <div className="toggle-thumb"></div>
                                            </div>
                                        </div>

                                        <div className="pref-item">
                                            <div className="flex items-center gap-4">
                                                <div className="pref-icon-wrapper">
                                                    <span className="material-symbols-outlined">mark_email_unread</span>
                                                </div>
                                                <div className="pref-label">
                                                    <h4>Marketing Emails</h4>
                                                    <p>Receive news about product updates</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`toggle-switch ${preferences.marketingEmails ? 'checked' : ''}`}
                                                onClick={() => togglePreference('marketingEmails')}
                                            >
                                                <div className="toggle-thumb"></div>
                                            </div>
                                        </div>

                                        <div className="pref-item">
                                            <div className="flex items-center gap-4">
                                                <div className="pref-icon-wrapper">
                                                    <span className="material-symbols-outlined">verified_user</span>
                                                </div>
                                                <div className="pref-label">
                                                    <h4>Two-Factor Auth</h4>
                                                    <p>Secure your account with 2FA</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-primary font-bold">Setup</Button>
                                        </div>
                                    </div>
                                </section>

                                <div className="settings-footer">
                                    <a href="#" className="deactivate-link">Deactivate Account</a>
                                    <div className="footer-btn-group">
                                        <Button variant="outline" rounded="full" className="flex-1 sm:flex-none">Cancel</Button>
                                        <Button variant="primary" rounded="full" className="flex-1 sm:flex-none shadow-lg shadow-primary/30">Save Changes</Button>
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
