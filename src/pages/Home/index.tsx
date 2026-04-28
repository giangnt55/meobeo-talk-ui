import React from 'react';
import { SEO } from '@/components/common/SEO/SEO';
import StreamFeed from './components/StreamFeed';

const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="Trang Chủ"
                description="Khám phá những câu chuyện, kỷ niệm dễ thương và hành trình diệu kỳ từ gia đình Meowmuc nha."
            />
            <StreamFeed />
        </>
    );
};

export default Home;
