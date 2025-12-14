import React from 'react';

interface Journey {
    type: string;
    title: string;
    image: string;
    location: string;
    description: string;
    progress: number;
    entries: number | string;
}

const JOURNEYS: Journey[] = [
    {
        type: 'private',
        title: 'Summer in Japan',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3q9A0At3e9wci1tweqfZl6CWpVC2WxnfRHApyrWAVc6t9c0a1lxsEGX61ayS_MfPlRWqydGgx2gPXA6Xl_XjrFfFpBdMgZzsRLJSylaJs3oZDygN08KU5To4uXsSJjWj1k_4hPD3j_LthfKPWpMnWrUF_DeErIbA1XPUdavz3-4U6X_JLjlpgk9Ddx_5cjTbK__ujN7Jd_sZhq-4ip1MmZFaFx_owYiaB0BtOcR2NoAurEmFGcnGs3X-8i0X1Uxkk44-WZ0K7u8Mi',
        location: 'Kyoto, Japan',
        description: 'Exploring ancient temples and neon streets. A trip to remember forever.',
        progress: 75,
        entries: 12
    },
    {
        type: 'public',
        title: 'Weekend Reads',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIublXwlE4PPX6nsDGAqQcc5kv2No5gyuEe1BkJ1X61H-7LcbU8uRr8tK5ESU81aU1IFbq81Ibt6XvBZE0RcZgDg7SxG8k7QeiPfszXPPBuB92b-P-NuiZ6X-LeIWzjZjQLXusquK_7oooA6g7hSyx_m_YXVHqssbA1UTubSIBj08seMGOZzLbQcTx81mi6XeCa3yV4nt0tIjCgJLlLp9G7ARpeTqYZS2DCO_gc9VXD7BKa8A94-R0CssMOYs6tWh9qWZBFGfArBjF',
        location: 'Home Life',
        description: 'Quiet afternoons spent with good books and better coffee.',
        progress: 25,
        entries: 5
    },
    {
        type: 'friends',
        title: '2023 Highlights',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCEG7tK6YOsf0kS9iVJjWFIs6x74SV6c25uft6gukrYoJOSmswvipoQ2aWlPTs1Cb8jI7g88_aHQ3g9q-AFG_j0qH--RYK8l0oFVBLH4zNeuj4uZvzxUlG6QF7JvSDJAtUhGZh_T8PmVeej1Mjv21PY7_ZwI-sebEhESDvToH928ubsG3OYGhz4fSqrJ4tkciFBTkK94hKVsW-dqDQG8LufhRf66VtGWP4ubJ6bq70e0oi3LYWCzKIlpuRlDe-Xbn6m5LyX16ckfjp',
        location: 'Social',
        description: 'Best moments with friends and family throughout the year.',
        progress: 100,
        entries: 'Completed'
    }
];

export const MyJourneysSection: React.FC = () => {
    return (
        <section className="memories-section">
            <div className="section-header">
                <div className="section-title-group">
                    <h2 className="section-title">My Journeys</h2>
                    <span className="section-count">3 Active</span>
                </div>
                <a href="#" className="view-all-link">
                    View All
                    <span className="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>

            <div className="journeys-scroll">
                {/* New Journey Card */}
                <div className="journey-card new-journey-card">
                    <div className="new-journey-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>post_add</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>New Journey</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Start a new collection</span>
                    </div>
                </div>

                {/* Journey Cards */}
                {JOURNEYS.map((journey, index) => (
                    <div key={index} className="journey-card group">
                        <div className="journey-overlay"></div>

                        {/* Status Tag */}
                        <div className="journey-tag">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                                {journey.type === 'private' ? 'lock' : journey.type === 'public' ? 'public' : 'group'}
                            </span>
                            {journey.type === 'private' ? 'Private' : journey.type === 'public' ? 'Public' : 'Friends Only'}
                        </div>

                        <div
                            className="journey-bg"
                            style={{ backgroundImage: `url("${journey.image}")` }}
                        ></div>

                        <div className="journey-content">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                                    {journey.type === 'private' ? 'location_on' : journey.type === 'public' ? 'home' : 'celebration'}
                                </span>
                                <span>{journey.location}</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 }}>{journey.title}</h3>
                            <p style={{ fontSize: '0.875rem', opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {journey.description}
                            </p>

                            <div style={{ paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ height: '4px', flex: 1, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '999px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${journey.progress}%`, backgroundColor: journey.progress === 100 ? '#10b981' : 'var(--primary)', borderRadius: '999px' }}></div>
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.9 }}>
                                    {typeof journey.entries === 'number' ? `${journey.entries} Entries` : journey.entries}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
