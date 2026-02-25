import React, { useState } from 'react';
import './ProfileSettings.css';

type TabType = 'profile' | 'account' | 'privacy' | 'notifications';

export const ProfileSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    return (
        <div className="flex-1 flex max-w-7xl mx-auto w-full px-6 lg:px-20 py-10 gap-10">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden md:block">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">
                    Settings
                </h3>
                <nav className="space-y-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left ${activeTab === 'profile'
                            ? 'sidebar-item-active flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-l-xl transition-all'
                            : 'flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-l-xl transition-all'
                            }`}
                    >
                        <span className="material-symbols-outlined text-xl">person</span>
                        Profile Info
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`w-full text-left ${activeTab === 'account'
                            ? 'sidebar-item-active flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-l-xl transition-all'
                            : 'flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-l-xl transition-all'
                            }`}
                    >
                        <span className="material-symbols-outlined text-xl">manage_accounts</span>
                        Account Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`w-full text-left ${activeTab === 'privacy'
                            ? 'sidebar-item-active flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-l-xl transition-all'
                            : 'flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-l-xl transition-all'
                            }`}
                    >
                        <span className="material-symbols-outlined text-xl">lock</span>
                        Privacy
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full text-left ${activeTab === 'notifications'
                            ? 'sidebar-item-active flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-l-xl transition-all'
                            : 'flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-l-xl transition-all'
                            }`}
                    >
                        <span className="material-symbols-outlined text-xl">notifications</span>
                        Notifications
                    </button>

                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                        <button className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all text-left text-sm font-semibold">
                            <span className="material-symbols-outlined text-xl">logout</span>
                            Sign Out
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'account' && <AccountTab />}
            {(activeTab === 'privacy' || activeTab === 'notifications') && (
                <div className="flex-1 max-w-3xl flex items-center justify-center text-slate-400">
                    Coming Soon / In Development
                </div>
            )}
        </div>
    );
};

// ---------------------------------------------------------------------------
// SUBCOMPONENTS: Profile Tab
// ---------------------------------------------------------------------------
const ProfileTab: React.FC = () => {
    return (
        <div className="flex-1 max-w-3xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Cover Image */}
                <div className="relative h-48 w-full group overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center soft-focus-bg"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAe7IHXGGrSres7jzXnFVOfQaAppE7WngacMvJU3hri21Qb07gAmYe2I3Rw3s3jXmkx7rCC7OX2kRTMC6mGjSf8MZbAj4U6bQNxB3FDPNx9BmOfr1Hz4DIEwjMEBTaysRq2tN_XUd8XSqNTg4Ljy31nzfH1TtX-Ln5FxgBqjkEnphOBhVa4PyvbArGMUX8NHZxzxSa-vjfLjiauCc36GOsnq5TsmH4aetnnP53easFX8kAOnI5zHLSrXGr6vT6JhUtyhWV2a-op-_s')",
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/30 transition-all font-semibold text-sm cursor-pointer">
                            <span className="material-symbols-outlined text-lg">photo_camera</span>
                            Change Cover
                        </button>
                    </div>
                </div>

                {/* Profile Form Content */}
                <div className="p-8 md:p-10 -mt-16 relative">
                    <div className="flex items-end gap-6 mb-10">
                        <div className="relative group">
                            <div className="size-32 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden shadow-lg bg-white">
                                <img
                                    alt="Profile Avatar"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6M1LYtraa9g5BogU6U3BbAR3iMOlyks0gfrIDagPbzme7pavYFBLEHn4CpCjviUDFQ4mHrX0xyhjMLOGOOv7Yzr-IbF6istejIDkSNT_ox_wdyxiuHwuTa0XES5n5f2RZhKhVmEYYGKkvE5Nk-ZHkEO9i15dk4L_kf3GvO2yglEFLygXtxdU9r5kr4sB_u_3JUDa0srMNwm2zywDGcIpypSQcs5r1WhlIOIAK9Vkf95DBSOZDM52xBL0gLTBMuKHVXdIU9lPRDTg"
                                />
                            </div>
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="material-symbols-outlined text-white">photo_camera</span>
                            </label>
                        </div>
                        <div className="pb-2">
                            <button className="text-sm font-bold text-primary hover:underline cursor-pointer bg-transparent border-none p-0">
                                Change Avatar
                            </button>
                            <p className="text-xs text-slate-400 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                Display Name
                            </label>
                            <input
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-slate-100"
                                placeholder="Enter your display name"
                                type="text"
                                defaultValue="MeoBeo"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                Poetic Bio
                            </label>
                            <textarea
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-slate-100 resize-none italic"
                                placeholder="Share a piece of your soul..."
                                rows={3}
                                defaultValue={'"Collecting moments, one story at a time."'}
                            />
                            <p className="text-[10px] text-slate-400 text-right uppercase tracking-widest font-bold">
                                42 / 160 characters
                            </p>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                Social Links
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">link</span>
                                    </div>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 focus:ring-primary focus:border-primary transition-all text-sm text-slate-900 dark:text-slate-100"
                                        placeholder="Website URL"
                                        type="text"
                                        defaultValue="https://meobeo.talk/journal"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">
                                            alternate_email
                                        </span>
                                    </div>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 focus:ring-primary focus:border-primary transition-all text-sm text-slate-900 dark:text-slate-100"
                                        placeholder="Instagram handle"
                                        type="text"
                                        defaultValue="@meobeo_moments"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100 dark:border-slate-800">
                            <button className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer">
                                Cancel
                            </button>
                            <button className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 border-none cursor-pointer">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// SUBCOMPONENTS: Account Tab
// ---------------------------------------------------------------------------
const AccountTab: React.FC = () => {
    return (
        <div className="flex-1 max-w-2xl">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-deep-espresso dark:text-white">Account Settings</h1>
                <p className="text-slate-500 mt-2">Manage your account details and privacy preferences.</p>
            </header>

            <div className="space-y-12">
                {/* Email Address */}
                <section>
                    <h2 className="text-lg font-bold text-deep-espresso dark:text-slate-200 mb-6">Email Address</h2>
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Current Email
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-slate-100"
                                type="email"
                                defaultValue="meobeo.talks@gmail.com"
                            />
                        </div>
                    </div>
                </section>

                {/* Password Change */}
                <section>
                    <h2 className="text-lg font-bold text-deep-espresso dark:text-slate-200 mb-6">Password Change</h2>
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Current Password
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-slate-100"
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    New Password
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-slate-100"
                                    placeholder="Enter new password"
                                    type="password"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-slate-100"
                                    placeholder="Confirm new password"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Language Preferences */}
                <section>
                    <h2 className="text-lg font-bold text-deep-espresso dark:text-slate-200 mb-6">
                        Language Preferences
                    </h2>
                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Display Language
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary appearance-none text-slate-900 dark:text-slate-100">
                            <option value="en">English (US)</option>
                            <option value="vi">Tiếng Việt</option>
                            <option value="fr">Français</option>
                            <option value="jp">日本語</option>
                        </select>
                    </div>
                </section>

                {/* Privacy */}
                <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-deep-espresso dark:text-slate-200 mb-6">Privacy</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 m-0">
                                    Private Account
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 m-0">
                                    Only followers can see your stories and memories.
                                </p>
                            </div>
                            <input className="custom-toggle" type="checkbox" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 m-0">
                                    Show Mood Tags on Profile
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 m-0">
                                    Display your recent emotional journey markers.
                                </p>
                            </div>
                            <input className="custom-toggle" type="checkbox" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 m-0">
                                    Allow Comments from Everyone
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 m-0">
                                    Enable interaction from the whole community.
                                </p>
                            </div>
                            <input className="custom-toggle" type="checkbox" defaultChecked />
                        </div>
                    </div>
                </section>

                {/* Save Button */}
                <div className="pt-8 flex justify-end sticky bottom-6 z-10">
                    <button className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 border-none cursor-pointer">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
