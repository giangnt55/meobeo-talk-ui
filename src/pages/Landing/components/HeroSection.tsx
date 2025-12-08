import "../Landing.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Share Your Story.</h1>
      <h1 className="hero-title hero-title-gradient">Find Your Community.</h1>
      <p className="hero-description">
        Meobeo Talk is a vibrant social blogging platform to share thoughts,
        experiences, and creative content.
      </p>

      <div className="hero-actions">
        <button className="btn-large btn-primary">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection;
