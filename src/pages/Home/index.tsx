import React from 'react';
import FeedMasonry from './components/FeedMasonry';
import { SEO } from '@/components/common/SEO/SEO';

const Home: React.FC = () => {
    return (
        <>
            <SEO />
            <FeedMasonry />
        </>
    );
};

export default Home;
