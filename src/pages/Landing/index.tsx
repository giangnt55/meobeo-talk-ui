import NewHeroSection from './components/NewHeroSection';
import NewFeaturesSection from './components/NewFeaturesSection';
import NewMemoryJourneyTimeline from './components/NewMemoryJourneyTimeline';
import NewCTASection from './components/NewCTASection';

const Landing = () => {
  return (
    <main className="flex-1 flex flex-col items-center w-full bg-background-light dark:bg-background-dark">
      <NewHeroSection />
      <NewFeaturesSection />
      <NewMemoryJourneyTimeline />
      <NewCTASection />
    </main>
  );
};

export default Landing;
