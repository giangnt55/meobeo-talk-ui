import React from 'react';
// import HomeSidebar from './components/HomeSidebar'; // Removed unused import
import FeedMasonry from './components/FeedMasonry';
import TrendingSidebar from './components/TrendingSidebar';
import { SEO } from '@/components/common/SEO/SEO';
import './Home.css';

const Home: React.FC = () => {
    return (
        <>
            <SEO />
            <div className="home-container">
                <div className="home-wrapper">
                    {/* <HomeSidebar /> */}
                    <FeedMasonry />
                    <TrendingSidebar />
                </div>
            </div>
        </>
    );
};

export default Home;
