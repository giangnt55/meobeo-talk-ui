import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProfileCover } from './components/ProfileCover';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ProfileContent } from './components/ProfileContent';
import './Profile.css';

export const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'posts' | 'journal' | 'journeys'>('posts');
    const [searchQuery, setSearchQuery] = useState('');

    const isOwnProfile = currentUser?.username === username;

    // Mock data - sẽ được thay thế bằng API calls
    const userData = {
        displayName: 'Alex Doe',
        username: 'alexdoe',
        bio: 'Digital artist & storyteller. Exploring the intersection of technology and creativity.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADweeidT_517mG3XyWhAoqCFDI0uosKBtCLRfeu0CnLr0ca1gHhg4HNEG5XFWyXz8_cM3jvmUt9QqpiJ0iPuLYPGmHCYvwn4ZQN1gsqwsoASJaRam5iR9oUDQ8tuKp7ySIOn6_rmC3PAUlCK_XsyvlIVyPVinQ5CX7Bw4RXW5HzJ-fpYSFwWkh0oRQsQPZBXq2eJijirYxSYPONLlPi4dPvMQcpn6-RmIw_xWGGrOme5_Ennt6spyB5y6jUHSMkCfxUmF-PaC0IuaX',
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbFsPgQrGC3CsWmzQ4SYHSi2YlCe6ilcMIpLIsyRQRgGQdoHu9RDwHoELY87O0kHSqp_6vSS-RsTKrpY-8ly1RzobGzeaOwpRdN7eGh5Ue3Q-oUlxcA-q-smOd8W7Tz9FgHHk16YxlS2UBTbqBIO4wsky7_hk_UJQ9F0x83zIhxNw59mKxT6VpGCUP_dcthXdDIG73038l_eIt9IcTnuuJS_wyGWQErBM3pxSxxaS24q4L6EIm4_cF4gQ1MwX4mKquTBG-rBgxIUw1',
        stats: {
            posts: 128,
            followers: 1200,
            following: 345,
        },
        socialLinks: [
            { name: 'Twitter', icon: 'alternate_email', url: '#' },
            { name: 'Instagram', icon: 'photo_camera', url: '#' },
            { name: 'Website', icon: 'language', url: '#' },
        ],
    };

    const blogPosts = [
        {
            id: '1',
            title: 'My Creative Journey',
            excerpt: 'A deep dive into the world of digital art and inspiration.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1fYkZxVo9lPmUaCzxhxE0vnZe1kQeIzbhE3gNQKDEFEcInVgIa3lYTFzwYZdm9HagRUzrinZmrzVRBuNDNId53oQCtsPyw1_a7fM9dl3MH9GUz1p3Yy4PLaYFGVmR3QTVeS33nM9mW_8iiK6txlgP-qNhjNASXXFYwRf7kI5BdBKVkRFJMgtQxFeHnjrYkzHa3wwY4Lt8kcJQPds0I2euN6yXnYBZj-n5HXSYNrRQZHUAEF64vpdTJkAxpKdNeiYdL5CJjcuvu5v-',
            date: 'Oct 24, 2023',
            readTime: '5 min read',
            likes: 2100,
            comments: 152,
        },
        {
            id: '2',
            title: 'Tech & Design Fusion',
            excerpt: 'How modern technology is reshaping the design industry.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSlviCIj1iY4xMkVENzL03VpDcolWk_-SAe4fEOac8SBvhs_PJNgge14cOk6gScUMiQEaxIFieNQ2VcNaz2NyuvXvX9SLTj_olXae1MqhUUNkwW1a03FyHl8bDZ3wlhb8kDb50qinaGTuAnM3PzoYOMPRUtcshw9hMfXy0Mdzx719WgmZnqfudlGpSEa8x38c9a2DN-q6aN_Qh3tIRixqhxqCCyfLseAY_-rG8JqR4UpT4VGby_1VhR7VWWt4Yw4b9f8w8_VTV2sGg',
            date: 'Oct 20, 2023',
            readTime: '8 min read',
            likes: 1800,
            comments: 98,
        },
    ];

    const journalEntries = [
        {
            id: '1',
            title: 'Morning Hike',
            date: 'Nov 02, 2023',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmq_54oMnOKv57atDxjYizPcwO6xEXtd5FRxNw4hGGCKF2vw5OfTyPsL-azpeLHHCznuLTy1vnQGoHDCFM6PzrHpZU2hWTdrOEHTRcx-Jme-CxaCZhspkXGZ_2mmdLkD4AtZQ_UxAuOG3iy8KBpA3OJjpKlgHm2N7eVmN-aUf46AnBhOHF1jo1oi9bAKFXxO9tWB9C5mkuhx4J7_AmC_jkV8I0uiSXvKCA-IbFXxVNEzJZI7GR8rRzFda-i2xpgiIH6gldLxvOt1dq',
            tags: [{ icon: 'sunny', label: 'Sunny' }, { icon: 'hiking', label: 'Hiking' }],
        },
        {
            id: '2',
            title: 'Coffee & Reads',
            date: 'Oct 29, 2023',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH_nVtKxEp0UUZDGD_hAzMp9bEg7qmFO30xEDUzIdbVRuvn1bYEfvTldWJA-8bLFxgdXkXMPJu_6lVC2jWk3QzWPc7JV3UnKfOn2XNJ-yy6gFFO_JFfe1JMOigFVw-24bwfhqC8rK-7L_Wx2K5lH3Wb6k747gH_dq0rPCW5EW4u9ycSBRAiTS1o0JWq4UM0MZ5wx0-QxI8UU74yZhvUtIMNfbVlFAie-XRklUefugqlIjElaA6iSh1GvMB6_aCB0c8lnIdyND-DyJA',
            tags: [{ icon: 'local_cafe', label: 'Coffee' }, { icon: 'menu_book', label: 'Reading' }],
        },
        {
            id: '3',
            title: 'City Lights',
            date: 'Oct 25, 2023',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvFK_oY8eIM4V5tcss5WqS8bAJn5j329hHoZ8hvZdG4misjbvEtHFhWPW-FnRqMg2eBPFQmOAZj22RH6hF5AErYOrVPGgg1cRXIazUYMtPMyW5YcuTY5cUVqIZZkYWki-P6Pcidtvc1IvNkLsfi3r8vEUZ_NXfrF9hWT_NeTI9aMMR9vX1brmJBjK6lCPYjQi7x2PhQLm7qBHvt7TT47jddX2-MQq8UaaDwaorg8S6Kl28a9sO8ko9NGWnzxSx4ppj1TFOASWqpH0E',
            tags: [{ icon: 'nightlight', label: 'Night' }, { icon: 'location_city', label: 'City' }],
        },
        {
            id: '4',
            title: 'Friends & Fun',
            date: 'Oct 18, 2023',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8a4kvIBmC3HLlXOg_w-TnRjFidHjoPyHjXdW9iExROeTULRnUO1fyOZa4ZYz0Fzz1TEj51_1Y8wzif33qYi3DupH8mFX5L0QTUwiUu8X6nX4tF1Ie7bi2Y4fJwQf9x1evaGiwvMtdYw9Q6zTvpgjxSYVfq5tUPfgVzlGY0J6syCN0csdjZ2qtVkyw_iuxA5nuJmkwlG9Uwnr1WfyIq-rTlmoicE20DUjQutGUdy7VvMrzolbWAdG0wN4XqcayzGQZxoYtaRsWnS_',
            tags: [{ icon: 'sentiment_satisfied', label: 'Happy' }, { icon: 'groups', label: 'Friends' }],
        },
    ];

    const journeys = [
        {
            id: '1',
            title: 'Euro Summer 2023',
            description: 'A month-long backpacking adventure through France, Italy, and Spain. Captured moments from street cafes to mountain peaks.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGdH1PIj7YljSCb96dV1M35GrD1fMJ10KSkiwn3ZGD2_hb8Plu3zBPL9uKsakn31qychl7l5BPjL_bItqSmOlBbC70qxsbY8D0Ifz72bGACsWTJ20k1KD5Ei9ti7mmctMq1dfMK5XdhNALfgEc7mZUyymko67rxB8X2XymPc3R05LESLMwU0-yBtAaDNrO0hYRyhJ7Jk1czxZX0VCNvNlVhvDw_kRFCWZUxkt1vMBlUpezMa3GwOPfj0fd9lBJUtYgYSp7LW2JyIpk',
            category: 'Travel',
            categoryColor: '#ad2bee',
            entriesCount: 14,
        },
        {
            id: '2',
            title: 'Culinary Experiments',
            description: 'My journey into learning how to cook authentic Asian cuisine. From failed dumplings to perfect ramen broths.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsklvNCpyfWaFIsaKRUjdM_YP8ZCRF5Dx9KBNra7W6ItF7_xavEMDjvjQ3O60LuVt0KkjUdcysyf8gHbhXpwsV7joet4TtTP7q67dQVmYmKsWfJ5xAgoABOySkNRIzNdgaqCEc8icLECSRIh1KOOUFGgEI8TPcABxXreHA04xHKYLBG2vBsqX0VghcH4JmBdCOsFKSE0xpB5yOj_sz3T1yTto-y6_FwMz86xFSdMxA9iPzybGxAxHgfdAnM2w-GgssrLp3wh4UWHVi',
            category: 'Cooking',
            categoryColor: '#f97316',
            entriesCount: 8,
        },
    ];

    return (
        <div className="profile-page">
            <ProfileCover
                coverImage={userData.coverImage}
                avatar={userData.avatar}
                isOwnProfile={isOwnProfile}
            />

            <div className="profile-content">
                <div className="profile-grid">
                    <ProfileSidebar
                        userData={userData}
                        isOwnProfile={isOwnProfile}
                    />

                    <ProfileContent
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        blogPosts={blogPosts}
                        journalEntries={journalEntries}
                        journeys={journeys}
                    />
                </div>
            </div>
        </div>
    );
};