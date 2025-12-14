import React from 'react';
import { Button } from '@/components/common/Button/Button';

interface Highlight {
    title: string;
    date: string;
    image: string;
    excerpt: string;
    tag: string;
    tagColor: string;
    tagIcon: string;
    aspect: string;
}

const HIGHLIGHTS: Highlight[] = [
    {
        title: 'Morning walk with Bailey',
        date: 'Oct 24, 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdZhAuBONST73M-_8g2ZGghO3hMQb0fN8ukJwYMHbO22kAybtaoRecL6EUcPn_QIsOITEQ2jkKUokoWDn8qkOIAEyTjZie5DQWA-4RXqy0u8We-IEQasVZgZY8mowknQ_Ld5rfbgVDUtGU4127m8Zjq3gqpv3W85e2B5H4K55O41c8m9s_YAqdlOak5Jx4BR7opN82et149IbJe7P7CFeOXFAOzjRkOvYEDVp-jY9-7VD18ZfBTPkLbi-R75sVqexAoK_km7oEI6Fs',
        excerpt: 'The sun was perfect today. Bailey found a huge stick and refused to let go.',
        tag: 'Happy',
        tagColor: 'orange',
        tagIcon: 'sunny',
        aspect: '4/3'
    },
    {
        title: 'City Lights & Deep Thoughts',
        date: 'Oct 20, 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-HfPP_juYzd0QyYsQ5ESPWZwrewZDUirLaRNZTLNeSjQugusIVDhaAegL6pa2An1DnNW4PPeSza1tSME_C5dZZ43JJJjQItV2CR-_Zi5eR269BjoYC7VSGBI9gGiXzy9OaPikw_zk7XnSarfXDPGH1LoWA3cFEuDG6KeiqtsDIbmRJkY6n4Sl9DDc8CgTqNE_kYJzGeHTHk_DLKh-s8o2BI22et9pE9OlfuWp_67s7qSHRQ1Lkd40_4L-n_MKGVwYVf3hMv07dsuJ',
        excerpt: 'Sometimes you just need to drive around the city and listen to synthwave.',
        tag: 'Reflective',
        tagColor: 'purple',
        tagIcon: 'nightlight',
        aspect: '3/4'
    },
    {
        title: 'Best Pizza in Town',
        date: 'Oct 18, 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsxe93PQnFDqeFst-bdDt1w4RrBy-0DkfOpwTbj506l-wxIr5CELusMqfgyZCmme1HicALsjFxooqhNMlFA_FqSUiTwmxWSfX83rwK9IE1sFhNlozZ4PQcoR1YzztqD1FbDtsGpIsGNW0NtGV62V7xY8otqKv4EUE3TRE7mGxAWN6vxZZH_mGKhPM2aM_H9y9_niR6O4KSa3KESs-rYylrqP_hTlPGKgscKPbLeTC3GB2zg9u_9uA8VGmb0r2BWmnOwCR63S7Ll8Yd',
        excerpt: 'Finally tried the new spot downtown. The truffle mushroom pizza is to die for.',
        tag: 'Foodie',
        tagColor: 'blue',
        tagIcon: 'restaurant',
        aspect: '4/3'
    },
    {
        title: 'Forest Bathing',
        date: 'Oct 15, 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1MLIFWDZxlnQ8Vx9F_CufkhBln2Q6G7cud35QNk3mfjz6xKk9bf-IgexrColkKKOMP6OgBIQyE2nKFxi0Hejwigx9f7PQaXZuVPCcCiUX7Pd-zuLo_FKQdUlx3vENgIbvFomM_XFkHISGQhbvy9wF_Dkxt3cftu0j-KlqJxJ9vgpGXHRuenmbArObY2-q7w06wDlFRV-9fbmYs5dYKn-7xKl-zAdlpI39kvyaKsgq9f2Q-zofPggpjtei5WJCV3xgHVS1UOnzMVko',
        excerpt: 'Took a day off to just breathe. The air was so crisp.',
        tag: 'Nature',
        tagColor: 'green',
        tagIcon: 'forest',
        aspect: '4/3'
    },
    {
        title: 'Studio Mess',
        date: 'Oct 12, 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD0BXOmsiJRmYTvvTxVhpieQpkZo6G1jIQTz-V34uIRVSVc8hmGGZPcb5rCs6gOdQwBxQ0kEjOecBZEmfL2jUxfNxItanTv5OVg91c3AE1qI5Xzxk3iyv2gkdt9Wv2_gXEOkhQGyDMTnRKVQ54Befg8azPVU_kPU6QQiig8_6dydlLYFJJGJfwABMTEntJsML9yY4Urnkx_V0lydimPqb9bDr0xTKsh5kFiK8l6S0ct2sGLrPGPBBztjWpBHwezS9Yyk0g5Rjz_pTS',
        excerpt: 'Creativity is messy and I am absolutely loving it.',
        tag: 'Creative',
        tagColor: 'yellow',
        tagIcon: 'light_mode',
        aspect: '3/4'
    },
    {
        title: 'Live Music Returns',
        date: 'Oct 10, 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCENtedlGZvZl4N_6-K-eVtx9q8Es5naUq_nQTIj4iQWOYWqfm4mfDXfS8QPrhaqQ9dmv8AxPL6wR-vzcQwDm9buVESbwtwrKOolhA836AD9HdSMHuZlIhN9XXCQfBMjW4N8Lc93bxFYvA-NwwZSRPActKh6_rXBSfktNfZiRZeksfF0LwcKPSM14sGgMPtw-ZlssxeD4qkVw9CaaEacveiUgN8Qin4PDIUW_k-Wqkn8ow3Pz00MImg8Ssr4JzXkV0ob-br0kbcltQ',
        excerpt: 'The energy in the room was electric. Nothing beats live music.',
        tag: 'Concert',
        tagColor: 'pink',
        tagIcon: 'music_note',
        aspect: '4/3'
    }
];

export const JournalHighlightsSection: React.FC = () => {
    return (
        <section className="memories-section">
            <div className="section-header">
                <div className="memories-title-group">
                    <h2 className="section-title">Journal Highlights</h2>
                    <p className="memories-subtitle">Recent moments from your personal timeline.</p>
                </div>
                <div className="memories-actions">
                    <Button variant="ghost" rounded="full">
                        <span className="material-symbols-outlined">grid_view</span>
                    </Button>
                    <Button variant="ghost" rounded="full">
                        <span className="material-symbols-outlined">list</span>
                    </Button>
                </div>
            </div>

            <div className="highlights-grid">
                {HIGHLIGHTS.map((highlight, index) => (
                    <article key={index} className="highlight-card group">
                        <div className="highlight-image-wrapper" style={{ aspectRatio: highlight.aspect }}>
                            <div className="highlight-tag">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: '14px', color: highlight.tagColor }}
                                >
                                    {highlight.tagIcon}
                                </span>
                                {highlight.tag}
                            </div>
                            <button className="highlight-like-btn">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite</span>
                            </button>
                            <img src={highlight.image} alt={highlight.title} className="highlight-image" />
                        </div>

                        <div style={{ padding: '0 4px', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                {highlight.date}
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>{highlight.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {highlight.excerpt}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
