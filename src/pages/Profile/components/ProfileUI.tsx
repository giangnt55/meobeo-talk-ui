import React from 'react';

export const ProfileSkeleton: React.FC = () => (
    <div className="min-h-screen bg-[#f8f7f6] dark:bg-[#221810] animate-pulse">
        <div className="w-full h-[320px] md:h-[400px] bg-slate-200 dark:bg-slate-800" />
        <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 flex flex-col items-center gap-6">
            <div className="size-40 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white" />
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            <div className="h-5 w-72 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-16 w-80 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        </div>
    </div>
);

export const ProfileNotFound: React.FC<{ message: string; onHome: () => void }> = ({ message, onHome }) => (
    <div className="min-h-screen bg-[#f8f7f6] dark:bg-[#221810] flex items-center justify-center">
        <div className="text-center space-y-4 p-12">
            <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-slate-600">person_off</span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Người dùng không tồn tại</h2>
            <p className="text-slate-500 max-w-md">{message}</p>
            <button
                onClick={onHome}
                className="mt-4 px-8 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
            >
                Quay về trang chủ
            </button>
        </div>
    </div>
);

export const EmptyState: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <div className="flex flex-col items-center gap-3 py-24 text-slate-400 dark:text-slate-600">
        <span className="material-symbols-outlined text-6xl opacity-40">{icon}</span>
        <p className="text-base font-medium">{text}</p>
    </div>
);

export type TabId = 'all' | 'blogs' | 'memories' | 'journeys';

export const TabButton: React.FC<{
    id: TabId;
    active: TabId;
    icon: string;
    label: string;
    onSelect: (id: TabId) => void;
}> = ({ id, active, icon, label, onSelect }) => (
    <button
        onClick={() => onSelect(id)}
        className={`pb-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            active === id
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
        }`}
    >
        <span className="material-symbols-outlined text-lg">{icon}</span>
        {label}
    </button>
);
