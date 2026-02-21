import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { profileApi, type UserProfile } from '@/api/services/profileApi';
import { blogApi, getContentPreview, type Blog } from '@/api/services/blogApi';
import { api } from '@/lib/ky-client';
import type { Post } from '@/types/post';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type TabId = 'all' | 'blogs' | 'memories' | 'journeys';

type FeedItem =
    | { kind: 'blog'; data: Blog }
    | { kind: 'journey'; data: Post };

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const fmtDate = (s: string) =>
    new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });

const DEFAULT_COVER =
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80';

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
const TabButton: React.FC<{
    id: TabId;
    active: TabId;
    icon: string;
    label: string;
    onSelect: (id: TabId) => void;
}> = ({ id, active, icon, label, onSelect }) => (
    <button
        onClick={() => onSelect(id)}
        className={`pb-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${active === id
            ? 'border-primary text-primary'
            : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
    >
        <span className="material-symbols-outlined text-lg">{icon}</span>
        {label}
    </button>
);

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => (
    <Link
        to={`/blog/${blog.id}`}
        className="group flex flex-col md:flex-row gap-6 p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-md transition-all"
    >
        <div className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
            {blog.banner_url ? (
                <img
                    src={blog.banner_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary/30">article</span>
                </div>
            )}
        </div>
        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        Blog
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                        {fmtDate(blog.created_at)}
                        {blog.read_time_minutes > 0 && ` • ${blog.read_time_minutes} min read`}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                </h3>
                {blog.content_html && (
                    <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed text-sm">
                        {getContentPreview(blog.content_html, 150)}
                    </p>
                )}
            </div>
            <div className="mt-4 flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    <span className="text-xs font-semibold">{fmt(blog.reaction_count)}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="text-xs font-semibold">{fmt(blog.comment_count)}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 ml-auto">
                    <span className="material-symbols-outlined text-lg">bookmark</span>
                </span>
            </div>
        </div>
    </Link>
);

const JourneyCard: React.FC<{ journey: Post }> = ({ journey }) => (
    <Link
        to={`/journeys/${journey.id}`}
        className="group flex flex-col md:flex-row gap-6 p-4 bg-primary/5 dark:bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all"
    >
        <div className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
            {journey.banner_url ? (
                <img
                    src={journey.banner_url}
                    alt={journey.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-amber-500/40">explore</span>
                </div>
            )}
        </div>
        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                        Journey
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                        {journey.journey_start_date ? fmtDate(journey.journey_start_date) : fmtDate(journey.created_at)}
                        {journey.journal_count ? ` • ${journey.journal_count} Stories` : ''}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2">
                    {journey.title}
                </h3>
                {journey.content && (
                    <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed text-sm">
                        {getContentPreview(journey.content, 150)}
                    </p>
                )}
            </div>
            <div className="mt-4 flex items-center gap-4">
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors">
                    View Journey
                </button>
                <div className="flex items-center gap-1 text-slate-400 ml-auto">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                    <span className="text-xs font-semibold">{fmt(journey.view_count)}</span>
                </div>
            </div>
        </div>
    </Link>
);

/* ────────────────────────────────────────────
   Loading skeleton
──────────────────────────────────────────── */
const ProfileSkeleton: React.FC = () => (
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

/* ────────────────────────────────────────────
   Not-found state
──────────────────────────────────────────── */
const NotFound: React.FC<{ message: string; onHome: () => void }> = ({ message, onHome }) => (
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

/* ────────────────────────────────────────────
   Main Page
──────────────────────────────────────────── */
export const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<TabId>('all');

    // Data state
    const [profileUser, setProfileUser] = useState<UserProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
    const [journeys, setJourneys] = useState<Post[]>([]);
    const [contentLoading, setContentLoading] = useState(false);

    const isOwnProfile = currentUser?.username === username;

    /* fetch profile */
    useEffect(() => {
        if (!username) { navigate('/'); return; }
        setProfileLoading(true);
        setProfileError(null);
        profileApi.getProfileByUsername(username)
            .then(setProfileUser)
            .catch(() => setProfileError('Không tìm thấy người dùng này.'))
            .finally(() => setProfileLoading(false));
    }, [username, navigate]);

    /* fetch content once profile loaded */
    const fetchContent = useCallback(async () => {
        if (!profileUser) return;
        setContentLoading(true);
        try {
            const [blogsRes, journeysRes] = await Promise.allSettled([
                blogApi.getUserBlogs(profileUser.id),
                api
                    .get(`users/${profileUser.id}/journeys`)
                    .json<{ success: boolean; data: Post[] }>(),
            ]);
            if (blogsRes.status === 'fulfilled') setBlogPosts(blogsRes.value.posts || []);
            if (journeysRes.status === 'fulfilled' && journeysRes.value.success)
                setJourneys(journeysRes.value.data || []);
        } finally {
            setContentLoading(false);
        }
    }, [profileUser]);

    useEffect(() => { fetchContent(); }, [fetchContent]);

    /* build feed for "All" tab */
    const allFeed: FeedItem[] = [
        ...blogPosts.map((b): FeedItem => ({ kind: 'blog', data: b })),
        ...journeys.map((j): FeedItem => ({ kind: 'journey', data: j })),
    ].sort((a, b) => {
        const dateA = a.kind === 'blog' ? a.data.created_at : (a.data as Post).created_at;
        const dateB = b.kind === 'blog' ? b.data.created_at : (b.data as Post).created_at;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    /* ── early returns ── */
    if (profileLoading) return <ProfileSkeleton />;
    if (profileError || !profileUser)
        return <NotFound message={profileError || 'Không tìm thấy hồ sơ.'} onHome={() => navigate('/')} />;

    const displayName = profileUser.display_name || profileUser.full_name || profileUser.username;
    const avatar = profileUser.avatar;

    /* ── render ── */
    return (
        <div className="relative flex min-h-screen flex-col bg-[#f8f7f6] dark:bg-[#221810] text-slate-900 dark:text-slate-100 font-display">

            {/* ── Hero Banner ── */}
            <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${DEFAULT_COVER}')`,
                        filter: 'brightness(0.9) saturate(1.1)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8f7f6] dark:from-[#221810] via-transparent to-transparent" />
            </div>

            {/* ── Profile Card ── */}
            <div className="max-w-5xl mx-auto w-full px-6 -mt-32 relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="size-36 md:size-44 rounded-full border-4 border-[#f8f7f6] dark:border-[#221810] overflow-hidden bg-white shadow-xl">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt={displayName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary flex items-center justify-center">
                                    <span className="text-white text-5xl font-bold">
                                        {displayName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name & Bio */}
                    <div className="mt-6 space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {displayName}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            @{profileUser.username}
                        </p>
                        {profileUser.bio && (
                            <p className="text-slate-600 dark:text-slate-400 italic max-w-md text-base mt-1">
                                "{profileUser.bio}"
                            </p>
                        )}
                    </div>

                    {/* Stats + Action Row */}
                    <div className="mt-8 flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full justify-center">
                        {/* Stats pill */}
                        <div className="flex gap-8 md:gap-12 py-4 px-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-primary">
                                    {profileUser.post_count}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                                    Stories
                                </span>
                            </div>
                            <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-primary">
                                    {profileUser.follower_count}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                                    Followers
                                </span>
                            </div>
                            <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-primary">
                                    {profileUser.following_count}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                                    Following
                                </span>
                            </div>
                        </div>

                        {/* CTA */}
                        {isOwnProfile ? (
                            <Link
                                to="/settings/profile"
                                className="w-full md:w-auto px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95 text-center"
                            >
                                Chỉnh Sửa Hồ Sơ
                            </Link>
                        ) : (
                            <button className="w-full md:w-auto px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95">
                                Theo Dõi
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Tabs & Search ── */}
                <div className="mt-16 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-x-auto no-scrollbar">
                    <div className="flex gap-10 min-w-max">
                        <TabButton id="all" active={activeTab} onSelect={setActiveTab} icon="grid_view" label="All Feed" />
                        <TabButton id="blogs" active={activeTab} onSelect={setActiveTab} icon="article" label="Blogs" />
                        <TabButton id="memories" active={activeTab} onSelect={setActiveTab} icon="auto_awesome" label="Memories" />
                        <TabButton id="journeys" active={activeTab} onSelect={setActiveTab} icon="explore" label="Journeys" />
                    </div>

                    <div className="hidden lg:flex max-w-[280px] w-full items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 mb-2 border border-transparent focus-within:border-primary/20 transition-all">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 focus:outline-none focus:border-transparent focus:shadow-none text-sm w-full placeholder:text-slate-400/60 text-slate-900 dark:text-slate-100 ml-2"
                            placeholder="Search in profile..."
                            type="text"
                        />
                    </div>
                </div>

                {/* ── Content Feed ── */}
                <div className="mt-8 space-y-6 pb-24">
                    {contentLoading ? (
                        /* skeleton cards */
                        [1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="flex gap-6 p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 animate-pulse"
                            >
                                <div className="w-56 h-40 flex-shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700" />
                                <div className="flex-1 space-y-3 py-2">
                                    <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                                    <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            {/* ALL TAB */}
                            {activeTab === 'all' && (
                                allFeed.length === 0 ? (
                                    <EmptyState icon="inbox" text="Chưa có nội dung nào." />
                                ) : (
                                    allFeed.map(item =>
                                        item.kind === 'blog'
                                            ? <BlogCard key={`b-${item.data.id}`} blog={item.data} />
                                            : <JourneyCard key={`j-${item.data.id}`} journey={item.data} />
                                    )
                                )
                            )}

                            {/* BLOGS TAB */}
                            {activeTab === 'blogs' && (
                                blogPosts.length === 0 ? (
                                    <EmptyState icon="article" text="Chưa có bài blog nào." />
                                ) : (
                                    blogPosts.map(b => <BlogCard key={b.id} blog={b} />)
                                )
                            )}

                            {/* MEMORIES TAB */}
                            {activeTab === 'memories' && (
                                <EmptyState icon="auto_awesome" text="Chưa có ký ức nào." />
                            )}

                            {/* JOURNEYS TAB */}
                            {activeTab === 'journeys' && (
                                journeys.length === 0 ? (
                                    <EmptyState icon="explore" text="Chưa có hành trình nào." />
                                ) : (
                                    journeys.map(j => <JourneyCard key={j.id} journey={j} />)
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   Empty state helper
───────────────────────────────────────── */
const EmptyState: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <div className="flex flex-col items-center gap-3 py-24 text-slate-400 dark:text-slate-600">
        <span className="material-symbols-outlined text-6xl opacity-40">{icon}</span>
        <p className="text-base font-medium">{text}</p>
    </div>
);