import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './About.css';

export const AboutPage: React.FC = () => {
    useDocumentTitle('Về Tụi Mình');
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <main className="about-main">
                <div className="about-container">
                    {/* Hero Section */}
                    <section className="about-hero-section">
                        <div className="about-hero-content">
                            <h1>Nối Nhịp Yêu Thương Qua Từng Trang Chuyện Nhỏ</h1>
                            <h2>
                                Tụi mình tin rằng những lời tâm tình chân thật luôn có sức mạnh diệu kỳ. Meowmuc ở đây để tạo ra một góc nhỏ bình yên, nơi cậu có thể thoải mái chia sẻ, khám phá và làm quen với những tâm hồn đầy màu sắc và đáng yêu vô cùng!
                            </h2>
                        </div>
                    </section>

                    {/* Main Content Grid */}
                    <div className="about-content-grid">
                        {/* Our Mission */}
                        <div className="about-mission-section">
                            <h2>Điều Tụi Mình ấp Ủ</h2>
                            <p>
                                Tụi mình mong muốn tạo ra một không gian ấm áp và tràn ngập niềm vui, nơi mỗi người đều có thể cất lên
                                tiếng nói mộc mạc của riêng mình, xích lại gần nhau hơn qua những lời thủ thỉ chân thành,
                                và cùng nhau đắp xây một ngôi nhà chung ngập tràn sự sáng tạo và yêu thương.
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
                            <h3>Sáng Tạo Chút Nè</h3>
                            <p>
                                Tụi mình luôn vỗ tay hoan hô mọi ý tưởng hay ho của cậu, chuẩn bị sẵn đồ nghề để cậu thoả sức
                                vẽ nên thế giới nhỏ của riêng mình một cách lung linh nhất!
                            </p>
                        </div>

                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                            <h3>Nhà Chung Ấm Áp</h3>
                            <p>
                                Nơi tụi mình có thể dựa vào nhau, cùng lắng nghe và san sẻ, để những tình bạn đẹp
                                nảy mầm và đơm hoa kết trái mỗi ngày.
                            </p>
                        </div>

                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">fingerprint</span>
                            </div>
                            <h3>Thật Là Mình</h3>
                            <p>
                                Chẳng cần phải hoàn hảo, cứ là chính cậu thôi. Tụi mình yêu những câu chuyện mộc mạc,
                                và trân trọng những nét đáng yêu rực rỡ riêng biệt của từng người.
                            </p>
                        </div>

                        {/* Meet The Team */}
                        <div className="about-team-header">
                            <h2>Gặp Gỡ Những Người Xây Tổ</h2>
                            <p>Những chú ong chăm chỉ đằng sau chiếc tổ nhỏ Meowmuc nha</p>
                        </div>

                        {/* Team Member Cards */}
                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1dlAaNKwXml0cpE0ZUDvKhnHteI-CDorWaI7gscyJvtUo3PqJOfkK4zb6O7zk9J-cYQwGdxR3GhGRFmaef6RKciMU9xaqAkMwXSOSOTfvvGyhwUgB50U-B60iE_7DffHPxOJDxzarK97gelrfsYYb4qskK-98AODYjN05fUz4ve_bZb4vRN4sKNG7MsdfYYJDTe7MZSz14Do9rQdqb5E3u99taVgjwWLsRbYf6OLB_iDc4LZX1Mh2zU0cviKKpPlfW8mqChOtCN9j"
                                alt="Trường Giang"
                                className="about-team-avatar"
                            />
                            <h4>Trường Giang</h4>
                            <p className="about-team-role">Trưởng Làng &amp; Nhạc Trưởng</p>
                            <p className="about-team-bio">Người mở đường mộng mơ với tình yêu to bự dành cho cộng đồng nhỏ của tụi mình.</p>
                        </div>

                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATdNb2rWYwUsHGliAydopPVPyjTZHYZO9mzD_EECn7vB4VuGCfHCkQdyUDHN98ZViy3mdpga3xn4q_mVKfSoGHcE5FzLaPz94DvtRY6BKE6XGW8UgYKmjzlTjkRJ4CG4oBYOnzqjFy0CPcWY8PAKTPIu1I72--GK08_QvD-0dC_TcyavYBXYz1dECB9vwAC8cS8ZfqMSLoaHssoHrnjU0gwgKms0ukZ3dhiKlxgneDcPkgghIWlt6QO_MFTf2vbseMSVp1ndjpprsI"
                                alt="Giang Nguyễn"
                                className="about-team-avatar"
                            />
                            <h4>Giang Nguyễn</h4>
                            <p className="about-team-role">Thợ Xây Mẫn Cán</p>
                            <p className="about-team-bio">
                                Người ngày đêm cặm cụi xếp từng viên gạch để góc nhỏ của tụi mình luôn vững chãi và mượt mà.
                            </p>
                        </div>

                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvHtoamDgkAJ0pL_LQ9z01JoUSM7DrGJ-Yyr5pqDGZxSFx6scaIAM-jqNefw9eCHcitkz-Vul9KN-dA4jMP4gA4W7-qlH3vYqQ6FXzLdmrXirvZiFI0eTlD_kLOcRBlD_YeFLJfA-peKspuVR3DOfpV9v4y--JpbTin9vs1htHsT_b-qe-MM5mYZynnl3vZOck6tqtGEWwWyO8dCZPZrl22O3vpVcjD-6ic-8odRyDa9BX-2mgvNmpi0WmKig8nPw80fmOhrFZeMIa"
                                alt="Giang và embe Huyền"
                                className="about-team-avatar"
                            />
                            <h4>Giang & Embe Huyền</h4>
                            <p className="about-team-role">Trạm Sạc Yêu Thương</p>
                            <p className="about-team-bio">
                                Nơi nảy mầm những niềm vui lấp lánh, đảm bảo ai bước vào cũng thấy ấm áp như về nhà.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <section className="about-cta-section">
                        <h2>Cậu Đã Sẵn Sàng Kể Chuyện Cùng Tụi Mình Chưa?</h2>
                        <p>
                            Dọn vào chung nhà với tụi mình và những người bạn dễ thương khác nha. Bắt đầu viết những dòng nhật ký đầu tiên và để tiếng lòng của cậu cất cánh bay thật xa nào!
                        </p>
                        <Button variant="primary" onClick={() => navigate('/signup')} className="about-cta-button">
                            Gia Nhập Nhà Meowmuc Ngay
                        </Button>
                    </section>
                </div>
            </main>
        </div>
    );
};
