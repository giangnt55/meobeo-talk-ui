import HeroSection from "./components/HeroSection";
import CTABanner from "./components/CTABanner";
import TrendingBlogs from "./components/TrendingBlogs";
import PopularMemories from "./components/PopularMemories";

const Landing = () => {
  return (
    <main className="landing-main">
      <div className="container">
        <HeroSection />
        <CTABanner />
        <TrendingBlogs />
        <PopularMemories />
      </div>
    </main>
  );
};

export default Landing;
