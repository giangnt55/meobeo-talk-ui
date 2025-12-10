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
                            <h1>Connecting Through Stories</h1>
                            <h2>
                                We believe in the power of authentic expression. Meobeo Talk is a space for
                                sharing, discovering, and connecting with a vibrant community of creators and
                                thinkers.
                            </h2>
                        </div>
                    </section>

                    {/* Main Content Grid */}
                    <div className="about-content-grid">
                        {/* Our Mission */}
                        <div className="about-mission-section">
                            <h2>Our Mission</h2>
                            <p>
                                To create a vibrant and supportive space where everyone can share their unique
                                voice, connect with others through authentic storytelling, and foster a
                                community built on creativity and mutual respect.
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
                            <h2>Our Values</h2>
                        </div>

                        {/* Value Cards */}
                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">lightbulb</span>
                            </div>
                            <h3>Creativity</h3>
                            <p>
                                We champion creative expression in all its forms, providing the tools for our
                                community to bring their ideas to life.
                            </p>
                        </div>

                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                            <h3>Community</h3>
                            <p>
                                We foster a supportive and inclusive environment where meaningful connections
                                can flourish.
                            </p>
                        </div>

                        <div className="about-value-card">
                            <div className="about-value-icon">
                                <span className="material-symbols-outlined">fingerprint</span>
                            </div>
                            <h3>Authenticity</h3>
                            <p>
                                We encourage genuine voices and stories, celebrating the unique perspectives of
                                every individual.
                            </p>
                        </div>

                        {/* Meet The Team */}
                        <div className="about-team-header">
                            <h2>Meet the Team</h2>
                            <p>The passionate individuals behind Meobeo Talk.</p>
                        </div>

                        {/* Team Member Cards */}
                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1dlAaNKwXml0cpE0ZUDvKhnHteI-CDorWaI7gscyJvtUo3PqJOfkK4zb6O7zk9J-cYQwGdxR3GhGRFmaef6RKciMU9xaqAkMwXSOSOTfvvGyhwUgB50U-B60iE_7DffHPxOJDxzarK97gelrfsYYb4qskK-98AODYjN05fUz4ve_bZb4vRN4sKNG7MsdfYYJDTe7MZSz14Do9rQdqb5E3u99taVgjwWLsRbYf6OLB_iDc4LZX1Mh2zU0cviKKpPlfW8mqChOtCN9j"
                                alt="Jane Doe"
                                className="about-team-avatar"
                            />
                            <h4>Jane Doe</h4>
                            <p className="about-team-role">Founder &amp; CEO</p>
                            <p className="about-team-bio">Visionary leader with a passion for building communities.</p>
                        </div>

                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATdNb2rWYwUsHGliAydopPVPyjTZHYZO9mzD_EECn7vB4VuGCfHCkQdyUDHN98ZViy3mdpga3xn4q_mVKfSoGHcE5FzLaPz94DvtRY6BKE6XGW8UgYKmjzlTjkRJ4CG4oBYOnzqjFy0CPcWY8PAKTPIu1I72--GK08_QvD-0dC_TcyavYBXYz1dECB9vwAC8cS8ZfqMSLoaHssoHrnjU0gwgKms0ukZ3dhiKlxgneDcPkgghIWlt6QO_MFTf2vbseMSVp1ndjpprsI"
                                alt="John Smith"
                                className="about-team-avatar"
                            />
                            <h4>John Smith</h4>
                            <p className="about-team-role">Lead Developer</p>
                            <p className="about-team-bio">
                                The architect of our platform, dedicated to a seamless user experience.
                            </p>
                        </div>

                        <div className="about-team-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvHtoamDgkAJ0pL_LQ9z01JoUSM7DrGJ-Yyr5pqDGZxSFx6scaIAM-jqNefw9eCHcitkz-Vul9KN-dA4jMP4gA4W7-qlH3vYqQ6FXzLdmrXirvZiFI0eTlD_kLOcRBlD_YeFLJfA-peKspuVR3DOfpV9v4y--JpbTin9vs1htHsT_b-qe-MM5mYZynnl3vZOck6tqtGEWwWyO8dCZPZrl22O3vpVcjD-6ic-8odRyDa9BX-2mgvNmpi0WmKig8nPw80fmOhrFZeMIa"
                                alt="Emily White"
                                className="about-team-avatar"
                            />
                            <h4>Emily White</h4>
                            <p className="about-team-role">Community Manager</p>
                            <p className="about-team-bio">
                                The heart of our community, ensuring everyone feels welcome.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <section className="about-cta-section">
                        <h2>Ready to Share Your Story?</h2>
                        <p>
                            Join a growing community of writers, creators, and thinkers. Start your blog today
                            and let your voice be heard.
                        </p>
                        <Button variant="primary" onClick={() => navigate('/signup')} className="about-cta-button">
                            Join the Conversation
                        </Button>
                    </section>
                </div>
            </main>
        </div>
    );
};
