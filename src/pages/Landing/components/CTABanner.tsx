import React, { useState } from "react";
import "../Landing.css";

const CTABanner = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cảm ơn cậu nha! Tụi mình sẽ gửi email tới ${email} ngay khi ứng dụng ra mắt nè.`);
    setEmail("");
  };

  return (
    <section className="cta-banner">
      <div className="cta-content">

        <div className="cta-text">
          <p className="cta-label">TIN VUI CHẤN ĐỘNG</p>
          <h2 className="cta-title">App Meowmuc Bỏ Túi</h2>
          <p className="cta-subtitle">Sắp Ra Mắt Rồi Đó!</p>
          <p className="cta-description">
            Đăng ký ngay để nhận tin nhắn lúc tụi mình ra mắt nha!
          </p>
        </div>

        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Để lại email của cậu nè"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn-dark">Báo Cho Tớ Nhé</button>
        </form>

      </div>
    </section>
  );
};

export default CTABanner;
