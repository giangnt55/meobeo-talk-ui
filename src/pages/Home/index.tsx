import React from 'react';
import { SEO } from '@/components/common/SEO/SEO';
import StreamFeed from './components/StreamFeed';

const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="Trang Chủ"
                description="Khám phá những câu chuyện, kỷ niệm và hành trình tuyệt vời từ cộng đồng Meobeo Talk."
            />
            <StreamFeed />
        </>
    );
};

export default Home;
