import React, { useState } from "react";
import "../Landing.css";

const CTABanner = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! We'll notify ${email} when the app launches.`);
    setEmail("");
  };

  return (
    <section className="cta-banner">
      <div className="cta-content">

        <div className="cta-text">
          <p className="cta-label">EXCITING NEWS</p>
          <h2 className="cta-title">Meobeo Mobile App</h2>
          <p className="cta-subtitle">Coming Soon!</p>
          <p className="cta-description">
            Sign up to be the first to know when we launch!
          </p>
        </div>

        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn-dark">Notify Me</button>
        </form>

      </div>
    </section>
  );
};

export default CTABanner;
