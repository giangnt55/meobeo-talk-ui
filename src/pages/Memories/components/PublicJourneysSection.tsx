import React from 'react';
import { Button } from '@/components/common/Button/Button';

interface PublicJourney {
    title: string;
    author: string;
    image: string;
    authorAvatar: string;
    excerpt: string;
    memories: number;
    likes: number;
}

const PUBLIC_JOURNEYS: PublicJourney[] = [
    {
        title: 'Culinary Tour of Italy',
        author: 'Sarah J.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsxe93PQnFDqeFst-bdDt1w4RrBy-0DkfOpwTbj506l-wxIr5CELusMqfgyZCmme1HicALsjFxooqhNMlFA_FqSUiTwmxWSfX83rwK9IE1sFhNlozZ4PQcoR1YzztqD1FbDtsGpIsGNW0NtGV62V7xY8otqKv4EUE3TRE7mGxAWN6vxZZH_mGKhPM2aM_H9y9_niR6O4KSa3KESs-rYylrqP_hTlPGKgscKPbLeTC3GB2zg9u_9uA8VGmb0r2BWmnOwCR63S7Ll8Yd',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD0BXOmsiJRmYTvvTxVhpieQpkZo6G1jIQTz-V34uIRVSVc8hmGGZPcb5rCs6gOdQwBxQ0kEjOecBZEmfL2jUxfNxItanTv5OVg91c3AE1qI5Xzxk3iyv2gkdt9Wv2_gXEOkhQGyDMTnRKVQ54Befg8azPVU_kPU6QQiig8_6dydlLYFJJGJfwABMTEntJsML9yY4Urnkx_V0lydimPqb9bDr0xTKsh5kFiK8l6S0ct2sGLrPGPBBztjWpBHwezS9Yyk0g5Rjz_pTS',
        excerpt: 'From Rome to Florence, tasting the best pasta and wine.',
        memories: 24,
        likes: 142
    },
    {
        title: 'Hidden Hiking Trails',
        author: 'Mike T.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1MLIFWDZxlnQ8Vx9F_CufkhBln2Q6G7cud35QNk3mfjz6xKk9bf-IgexrColkKKOMP6OgBIQyE2nKFxi0Hejwigx9f7PQaXZuVPCcCiUX7Pd-zuLo_FKQdUlx3vENgIbvFomM_XFkHISGQhbvy9wF_Dkxt3cftu0j-KlqJxJ9vgpGXHRuenmbArObY2-q7w06wDlFRV-9fbmYs5dYKn-7xKl-zAdlpI39kvyaKsgq9f2Q-zofPggpjtei5WJCV3xgHVS1UOnzMVko',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdZhAuBONST73M-_8g2ZGghO3hMQb0fN8ukJwYMHbO22kAybtaoRecL6EUcPn_QIsOITEQ2jkKUokoWDn8qkOIAEyTjZie5DQWA-4RXqy0u8We-IEQasVZgZY8mowknQ_Ld5rfbgVDUtGU4127m8Zjq3gqpv3W85e2B5H4K55O41c8m9s_YAqdlOak5Jx4BR7opN82et149IbJe7P7CFeOXFAOzjRkOvYEDVp-jY9-7VD18ZfBTPkLbi-R75sVqexAoK_km7oEI6Fs',
        excerpt: 'Discovering the path less traveled in the Pacific Northwest.',
        memories: 18,
        likes: 89
    }
];

export const PublicJourneysSection: React.FC = () => {
    return (
        <section className="public-journeys-container">
            <div className="section-header">
                <div className="memories-title-group">
                    <h2 className="section-title">Discover Public Journeys</h2>
                    <p className="memories-subtitle">Explore stories shared by the community.</p>
                </div>
                <div className="memories-actions">
                    <Button variant="ghost" size="sm" rounded="full">
                        <span className="material-symbols-outlined">refresh</span>
                    </Button>
                    <a href="#" className="view-all-link">See More</a>
                </div>
            </div>

            <div className="public-list-grid">
                {PUBLIC_JOURNEYS.map((journey, index) => (
                    <div key={index} className="public-card">
                        <div
                            className="public-card-image"
                            style={{ backgroundImage: `url("${journey.image}")` }}
                        ></div>
                        <div className="public-card-content">
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <div
                                        style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundImage: `url("${journey.authorAvatar}")`, backgroundSize: 'cover' }}
                                    ></div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>By {journey.author}</span>
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>{journey.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {journey.excerpt}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>photo_library</span> {journey.memories} Memories
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>favorite</span> {journey.likes} Likes
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
