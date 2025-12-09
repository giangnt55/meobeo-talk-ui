import React from 'react';
import { FaBullhorn } from 'react-icons/fa';
import SearchBar from './SearchBar';
import PostCard from './PostCard';
import './FeedMasonry.css';

const FeedMasonry: React.FC = () => {
    // Mock data for posts
    const posts = [
        {
            id: 1,
            type: 'announcement',
            title: 'Welcome to the new Meobeo Talk!',
            description: "We've refreshed the feed to bring you more of what you love."
        },
        {
            id: 2,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTDOzti4Hb9LCo9WEX-cPALT8tQv30Yt_ibJbBixdB-DKzx3bma32teoY7fD5V09AlDqS4H_Az-i-FJGhjleg1ul42y4a-KZl8qjJ1qsMb8YNdL7MI_q8SLvWrV5Ix6fVi1JP20pfxWmU3Dny_CheXLSnudxnU_3v157D8K_UxqmFrO2-Z3bu8-8L7JvE2Ok2Zdud8rLI_6h10QhWDOtY_gPIMNCbHpFLQRhb0BqFmehNK9fuD2iPUxd-1WRNOfhGnxWm1jIiQ2ju0',
            title: 'Exploring Hidden Gems',
            authorName: 'Anna Lee',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGDFUMjfSwzX07txFBkfWhaVTwMQU-vUoFY8T9yEMmvqG1ZPDzn6COUKxg2amTdHG8F-67yOIbWxfxuAzUw1uTogv3nbs2PUruyAmrkr_3dLOJrq2iNQYtmH3ksWKeu6sNISsjjMHUuTr8rtX_26_4ZunCacJX2Sr3211CT1QaoxLsxxDv73v50T4eL5FxQ-6qdCFSexbshZxPBW3aK04VTBJGfF_hKxGISasPgniGm8P7U9uYsm39Yxl1buOwd4iFhUHp5q3TVSwO'
        },
        {
            id: 3,
            type: 'trending',
            hashtag: '#AIRevolution',
            posts: '1.2M Posts about the future of tech.'
        },
        {
            id: 4,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxY8xG-iOC7-DoS74L--AYZjaBEZn1_qRf-hwLs5SqqvDm5DVZtD2IoX8peIhzQR5gxWZZcqbOdi6U0_ZsdWEypoStQd4JddAPBBtgxrhkg9ojRg3OGGFbrBNae7LslLkmbWtzbV0SNO6_aGyjysJhjs2LpphDW_bWe5sb-lNPRPa5ecaV82BfrffczO88Kb_XUwNZwSFY-bD7E8b5zFhy8SXNHfOQT0sRCSB5GPCccw8vUhpT7cGdgCJuFpQwUZBzMnNic97YSP_i',
            title: 'Golden Hour Hikes',
            authorName: 'Mark Evans',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZW-4KtcvI78j9b2CaBx_hRtR-nEepXpSPyahExExasimZSyliez2erKoiLuFhFa4lOb3R6MCCzylSFIlPrF_NQE_sBBxRPdb_bwplN8DSIKUEfySWPgtVvkzsGI2yeixMpvCRDepj7OB5AlocpKsnEsH93j1ZJvPKZmQyIA5n7D9o9-j-0nhaYblpV9WHaa-TvE6bSFpgfU2Uf0wlxPTd9vFyFrxR27W_s5MsYOr9mL3iWkRwSK91ZUHlGfEnANuojms-Ja7UyI9',
            alt: 'Man in yellow jacket looking at a sunset over mountains'
        },
        {
            id: 5,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASjoMWRl-jkzVLMbkh2hIWfkzhh1_pvIS1MZoD_lgARp9KSapuUqTpZn6J8HIy2LE2gq2ATtOZTCAuUg1fAXQyRct33Y6ayotrWEsdb_qeoogT9waQJwXDvmzvqH6zjHCzUbNA3OCYhp5-7xJVxl2CV13dH9oAfowbZpjSYCIXQsiISTTqq-7ESNmE-zQmDQ5H3rgr7l1aG6MCCPG21-eXX4Fua9DnpAYcgQJu_apjg9FbRH5SSevl9YtcV9tIa8SwLEpIhuarD9Z8',
            title: 'Desert Daydreams',
            authorName: 'Sara Ahmed',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGDFUMjfSwzX07txFBkfWhaVTwMQU-vUoFY8T9yEMmvqG1ZPDzn6COUKxg2amTdHG8F-67yOIbWxfxuAzUw1uTogv3nbs2PUruyAmrkr_3dLOJrq2iNQYtmH3ksWKeu6sNISsjjMHUuTr8rtX_26_4ZunCacJX2Sr3211CT1QaoxLsxxDv73v50T4eL5FxQ-6qdCFSexbshZxPBW3aK04VTBJGfF_hKxGISasPgniGm8P7U9uYsm39Yxl1buOwd4iFhUHp5q3TVSwO',
            alt: 'A person walking through a minimal desert landscape'
        },
        {
            id: 6,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkLQO8wi5rPw4Q_KY3IyeOZJfqaisbMS4Ixw5fd4JagMrTeZveuOHHAefr6CTqRGwG0ApJvUcxIFHcqMyr6bvITLkYCeh0MTwP-HAjjJJfujlIUDhqQt9oprqC3EdWSibszO3pIIvOn1yxmzxWIDkEcxqfcaJEz0lqDz44UOE0tRSQzxpBhyJsGxPchbLBdq3PKHcS81U0ANkjWD_OI0K3U8QKX4tpz2BsxyGObJ9S1E1mD4kjyoY5KrtuXpZ1YSTDG4gu3EhOAfKH',
            title: 'CyberPulse 2077 Trailer',
            authorName: 'GamerGeek',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClkMJJCf4Y16hFu-8_hB6M6FhEHM8eA6EDbZwkVlEMKT1Y_5XVGpKeCFcQ3f8zgsel6idAMg6LRCyiYI7f85P_ENHtD0iEghKaTAYvbR_nHdoV2JEr0KTibVc09hHABXQOfRhbwJSn4b7ozEnVk_BHlU5oVdOK7tHipkudKbMDBCpNH2E9pJSOPu50xndqIQTV4nnewJRugUmductsr6R6BJQ_oLay_ni-Ltv0kdQegs-rQaf4aHrYhwl5_Fmm7JF72CeNfBeb9cau',
            isVideo: true,
            alt: 'Neon play button sign on a brick wall'
        },
        {
            id: 7,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq2xO-8UZliHnd92YF2MO4Mqe2fxwSydRV4_ZdHiW8xb2tEl9tM97KIBHeQZQ4y5LFQWZqxZoxHR5TKIm3fWqg9yTg_8GAD1l--RUxvPSPbV-11d8g2KtBVaeOgySfb_RosKILPzmXqCG1oPLy38M0bhGt9BD8jDuncNR6QQI9JswwsmCYdMwISczDLLgAIwBS79DAzqPi_C-mJpFc3rJCdyjZzxMZK5XuOo_CLNRiNa1pzBnzXTrihZjbaFHWoEv8psd12xc4_JIB',
            title: 'My latest design project is live!',
            authorName: 'Mark Evans',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZW-4KtcvI78j9b2CaBx_hRtR-nEepXpSPyahExExasimZSyliez2erKoiLuFhFa4lOb3R6MCCzylSFIlPrF_NQE_sBBxRPdb_bwplN8DSIKUEfySWPgtVvkzsGI2yeixMpvCRDepj7OB5AlocpKsnEsH93j1ZJvPKZmQyIA5n7D9o9-j-0nhaYblpV9WHaa-TvE6bSFpgfU2Uf0wlxPTd9vFyFrxR27W_s5MsYOr9mL3iWkRwSK91ZUHlGfEnANuojms-Ja7UyI9',
            alt: 'Laptop on a desk with a blurred background'
        },
        {
            id: 8,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCItFUl_4OEvEDi_Jn4hqdG4Guiq9vxHeLp3zNd5yoIHK2xFJn1PY_H5YJWbgBZYywgZyQrfZdtg_FrmrehScqd9BGIzg3hPtgC7UgcVUyeALiEPpCnUIkVg6xyEELOsSf15pxJUOvhuzwLvW8i0KTiJjgVIN5YEPJ1aKRbFuW4vxsG4IuvqnY9WT3_qVud6EdfhZDU-0vFhH3V0HOW_6TMA0Jba4jensttJ4qttMDcdzGgU9xYJTKUWZrixWv5ov4wLfebwNZjx7l3',
            title: 'Urban Canvases',
            authorName: 'Anna Lee',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGDFUMjfSwzX07txFBkfWhaVTwMQU-vUoFY8T9yEMmvqG1ZPDzn6COUKxg2amTdHG8F-67yOIbWxfxuAzUw1uTogv3nbs2PUruyAmrkr_3dLOJrq2iNQYtmH3ksWKeu6sNISsjjMHUuTr8rtX_26_4ZunCacJX2Sr3211CT1QaoxLsxxDv73v50T4eL5FxQ-6qdCFSexbshZxPBW3aK04VTBJGfF_hKxGISasPgniGm8P7U9uYsm39Yxl1buOwd4iFhUHp5q3TVSwO',
            alt: 'Colorful building with geometric patterns'
        },
        {
            id: 9,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH_Dl4S6HnMuZ0LcIQCTpUIJMDTEfP8gSz0xch9tMGMZYWZzI6fjiLgVgRAHBglhl58BHIdqilM5XlNsVsWfKLCHma2heO9SH5Hl1G-tJyA7A2Vrfo64-ltzcDaM9h67NWdTu1poEM7jIk6rgZy9RIvkD0RAAXOB2qz3TxH9CjXhzi_yZRiVgteB9CkKuERvH1ikwuSOgiKD6LTSHZGt8bZTvhvJi4DvU4Hoh3sjZXEh5WQEwKZzcFZNJytm3bLms1SvMVaOVwkiEI',
            title: 'Summer memories',
            authorName: 'Kevin Hart',
            authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGDFUMjfSwzX07txFBkfWhaVTwMQU-vUoFY8T9yEMmvqG1ZPDzn6COUKxg2amTdHG8F-67yOIbWxfxuAzUw1uTogv3nbs2PUruyAmrkr_3dLOJrq2iNQYtmH3ksWKeu6sNISsjjMHUuTr8rtX_26_4ZunCacJX2Sr3211CT1QaoxLsxxDv73v50T4eL5FxQ-6qdCFSexbshZxPBW3aK04VTBJGfF_hKxGISasPgniGm8P7U9uYsm39Yxl1buOwd4iFhUHp5q3TVSwO',
            alt: 'View of a tropical beach with palm trees and clear blue water'
        }
    ];

    return (
        <main className="feed-main">
            {/* Sticky Header */}
            <div className="feed-header">
                <div className="feed-header-content">
                    <h2 className="feed-title">Home</h2>
                    <SearchBar />
                </div>
            </div>

            {/* Feed Content */}
            <div className="feed-content">
                <div className="masonry-grid">
                    {posts.map((post) => {
                        if (post.type === 'announcement') {
                            return (
                                <div key={post.id} className="announcement-card">
                                    <div className="announcement-content">
                                        <div className="announcement-header">
                                            <FaBullhorn className="announcement-icon" />
                                            <h3 className="announcement-label">System Announcement</h3>
                                        </div>
                                        <h4 className="announcement-title">{post.title}</h4>
                                        <p className="announcement-description">{post.description}</p>
                                    </div>
                                </div>
                            );
                        }

                        if (post.type === 'trending') {
                            return (
                                <div key={post.id} className="trending-card">
                                    <h3 className="trending-card-title">
                                        Trending: <span className="trending-hashtag">{post.hashtag}</span>
                                    </h3>
                                    <p className="trending-card-posts">{post.posts}</p>
                                    <a href="#" className="trending-card-link">Explore topic</a>
                                </div>
                            );
                        }

                        return (
                            <PostCard
                                key={post.id}
                                imageUrl={post.imageUrl!}
                                title={post.title!}
                                authorName={post.authorName!}
                                authorAvatar={post.authorAvatar!}
                                isVideo={post.isVideo}
                                alt={post.alt}
                            />
                        );
                    })}
                </div>

                {/* Loading Indicator */}
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        </main>
    );
};

export default FeedMasonry;
