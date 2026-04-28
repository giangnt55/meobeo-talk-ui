import "../Landing.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Kể Câu Chuyện Của Cậu.</h1>
      <h1 className="hero-title hero-title-gradient">Tìm Thấy Tổ Ấm Nhỏ.</h1>
      <p className="hero-description">
        Meowmuc là một góc nhỏ rộn ràng, ấm áp để cậu thỏa sức kể những câu chuyện đáng yêu,
        san sẻ trải nghiệm và viết nên những điều tuyệt vời đó.
      </p>

      <div className="hero-actions">
        <button className="btn-large btn-primary">Bắt Đầu Thôi Nè</button>
      </div>
    </section>
  );
};

export default HeroSection;
