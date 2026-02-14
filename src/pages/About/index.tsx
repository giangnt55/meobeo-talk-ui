import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import './About.css';

export const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <main className="about-main">
                <div className="about-container">
                    {/* Hero Section */}
                    <section className="about-hero-section">
                        <div className="about-hero-content">
                            <h1>Kết Nối Qua Từng Câu Chuyện</h1>
                            <h2>
                                Chúng mình tin vào sức mạnh của sự thể hiện chân thật. Meobeo Talk là không gian
                                để chia sẻ, khám phá và kết nối với cộng đồng sáng tạo đầy sôi động và nhiệt huyết!
                            </h2>
                        </div>
                    </section>

                    {/* Main Content Grid */}
                    <div className="about-content-grid">
                        {/* Our Mission */}
                        <div className="about-mission-section">
                            <h2>Sứ Mệnh Của Chúng Mình</h2>
                            <p>
                                Tạo nên một không gian sôi động và hỗ trợ tuyệt vời, nơi mọi người có thể chia sẻ
                                giọng nói độc đáo của riêng mình, kết nối với nhau qua những câu chuyện chân thành,
                                và xây dựng cộng đồng dựa trên sự sáng tạo và tôn trọng lẫn nhau.
                            </p>
                        </div>

                        {/* Our Story Image */}
                        <div
                            className="about-story-image"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB21MrlbRIsmyxS0b2YpcAS562XAwra2u9r3BbrQqA8-QcF8g1nGvjnKW_ypNfHzgl9IZ3pvQ3WsFsFzUEpP-3HuMGlafNvdtrodh7ycjCAVngNSgfujIdj5qcvURdfrR8BIpjLr-dJCQ_nsHqh8dyBGAcehqOFkuJFFm_6N8Cbdxeyx0mAjP64Hi6oY4g3Wll8JNidgisP2oUR6_3sHJZjYEuuup-24AH8Z8nGpK1KIpKDZQ2LZ2Y_W_ctXLqkOH1rChvjpDR_lQec")`,
                            }}
                        />

                        {/* Our Values Header */}
                        <div className="about-values-header">
                            <h2>Giá Trị Cốt Lõi</h2>
                        </div>

                        {/* Value Cards */}
                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">lightbulb</span>
                            </div>
                            <h3>Sáng Tạo</h3>
                            <p>
                                Chúng mình ủng hộ mọi hình thức thể hiện sáng tạo, cung cấp công cụ để cộng đồng
                                biến ý tưởng thành hiện thực một cách tuyệt vời nhất!
                            </p>
                        </div>

                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                            <h3>Cộng Đồng</h3>
                            <p>
                                Chúng mình xây dựng môi trường hỗ trợ và cởi mở, nơi những kết nối ý nghĩa
                                có thể phát triển và lan tỏa mạnh mẽ.
                            </p>
                        </div>

                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">fingerprint</span>
                            </div>
                            <h3>Chân Thật</h3>
                            <p>
                                Chúng mình khuyến khích những giọng nói và câu chuyện chân thành, tôn vinh
                                góc nhìn độc đáo của từng cá nhân trong cộng đồng.
                            </p>
                        </div>

                        {/* Meet The Team */}
                        <div className="about-team-header">
                            <h2>Gặp Gỡ Đội Ngũ</h2>
                            <p>Những con người đầy nhiệt huyết đằng sau Meobeo Talk.</p>
                        </div>

                        {/* Team Member Cards */}
                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1dlAaNKwXml0cpE0ZUDvKhnHteI-CDorWaI7gscyJvtUo3PqJOfkK4zb6O7zk9J-cYQwGdxR3GhGRFmaef6RKciMU9xaqAkMwXSOSOTfvvGyhwUgB50U-B60iE_7DffHPxOJDxzarK97gelrfsYYb4qskK-98AODYjN05fUz4ve_bZb4vRN4sKNG7MsdfYYJDTe7MZSz14Do9rQdqb5E3u99taVgjwWLsRbYf6OLB_iDc4LZX1Mh2zU0cviKKpPlfW8mqChOtCN9j"
                                alt="Trường Giang"
                                className="about-team-avatar"
                            />
                            <h4>Trường Giang</h4>
                            <p className="about-team-role">Nhà Sáng Lập &amp; CEO</p>
                            <p className="about-team-bio">Người lãnh đạo đầy tầm nhìn với niềm đam mê xây dựng cộng đồng.</p>
                        </div>

                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATdNb2rWYwUsHGliAydopPVPyjTZHYZO9mzD_EECn7vB4VuGCfHCkQdyUDHN98ZViy3mdpga3xn4q_mVKfSoGHcE5FzLaPz94DvtRY6BKE6XGW8UgYKmjzlTjkRJ4CG4oBYOnzqjFy0CPcWY8PAKTPIu1I72--GK08_QvD-0dC_TcyavYBXYz1dECB9vwAC8cS8ZfqMSLoaHssoHrnjU0gwgKms0ukZ3dhiKlxgneDcPkgghIWlt6QO_MFTf2vbseMSVp1ndjpprsI"
                                alt="Giang Nguyễn"
                                className="about-team-avatar"
                            />
                            <h4>Giang Nguyễn</h4>
                            <p className="about-team-role">Nhà Phát Triển</p>
                            <p className="about-team-bio">
                                Kiến trúc sư của nền tảng, tận tâm mang đến trải nghiệm người dùng mượt mà nhất.
                            </p>
                        </div>

                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvHtoamDgkAJ0pL_LQ9z01JoUSM7DrGJ-Yyr5pqDGZxSFx6scaIAM-jqNefw9eCHcitkz-Vul9KN-dA4jMP4gA4W7-qlH3vYqQ6FXzLdmrXirvZiFI0eTlD_kLOcRBlD_YeFLJfA-peKspuVR3DOfpV9v4y--JpbTin9vs1htHsT_b-qe-MM5mYZynnl3vZOck6tqtGEWwWyO8dCZPZrl22O3vpVcjD-6ic-8odRyDa9BX-2mgvNmpi0WmKig8nPw80fmOhrFZeMIa"
                                alt="Giang và embe Huyền"
                                className="about-team-avatar"
                            />
                            <h4>Giang & Embe Huyền</h4>
                            <p className="about-team-role">Phát triển ý tưởng</p>
                            <p className="about-team-bio">
                                Trái tim của cộng đồng, đảm bảo mọi người đều cảm thấy được chào đón.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <section className="about-cta-section">
                        <h2>Sẵn Sàng Chia Sẻ Câu Chuyện Của Bạn?</h2>
                        <p>
                            Tham gia cộng đồng đang phát triển mạnh mẽ với các nhà văn, người sáng tạo và những
                            tư tưởng gia. Bắt đầu blog của bạn ngay hôm nay và để tiếng nói của bạn được lan tỏa!
                        </p>
                        <Button variant="primary" onClick={() => navigate('/signup')} className="about-cta-button">
                            Tham Gia Ngay
                        </Button>
                    </section>
                </div>
            </main>
        </div>
    );
};
