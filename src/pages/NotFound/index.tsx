import React from 'react';
import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './NotFound.css';

export const NotFoundPage: React.FC = () => {
    useDocumentTitle('Trang không tồn tại');
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="bg-blob-1"></div>
            <div className="bg-blob-2"></div>

            <div className="not-found-content">
                <div className="graphic-container">
                    <div className="graphic-content">
                        <span className="number-shadow">404</span>
                        <span className="number-text">4</span>
                        <div className="graphic-icon-wrapper">
                            <span className="icon-glow"></span>
                            <span className="material-symbols-outlined graphic-icon">pets</span>
                        </div>
                        <span className="number-text">4</span>
                    </div>
                </div>

                <div className="text-content">
                    <h1 className="not-found-heading">
                        <span className="sub-heading">Uh oh!</span>
                        Where did it go?
                    </h1>
                    <p className="not-found-desc">
                        Looks like this page has wandered off on its own adventure. Don't worry, our community is still buzzing with stories right next door.
                    </p>
                </div>

                <div className="action-buttons">
                    <div className="">
                        <Button
                            variant="primary"
                            size="lg"
                            rounded="full"
                            className="w-full sm:w-auto text-lg px-8 h-14"
                            onClick={() => navigate('/home')}
                        // icon={<span className="material-symbols-outlined">arrow_forward</span>}
                        >
                            Go to Home Feed
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        rounded="full"
                        className="w-full sm:w-auto text-lg px-8 h-14"
                        onClick={() => navigate(-1)}
                    >
                        Back to Safety
                    </Button>
                </div>

                {/* <div className="discovery-section">
                    <div className="discovery-label-wrapper">
                        <p className="discovery-label">While you are here</p>
                    </div>

                    <div className="discovery-grid">
                        <a href="#" className="discovery-card">
                            <div className="card-gradient"></div>
                            <div className="card-content">
                                <div className="card-icon-box">
                                    <span className="material-symbols-outlined text-4xl">edit_note</span>
                                </div>
                                <h3 className="card-title">Read the Blog</h3>
                                <p className="card-desc">Dive into the latest thoughts, stories, and updates from our vibrant community.</p>
                            </div>
                            <div className="card-arrow">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </a>

                        <a href="#" className="discovery-card">
                            <div className="card-gradient"></div>
                            <div className="card-content">
                                <div className="card-icon-box">
                                    <span className="material-symbols-outlined text-4xl">photo_library</span>
                                </div>
                                <h3 className="card-title">Memory Journeys</h3>
                                <p className="card-desc">Khám phá những khoảnh khắc ấm áp và nhật ký xinh xẻo từ cư dân Meowmuc nha.</p>
                            </div>
                            <div className="card-arrow">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </a>

                        <a href="#" className="discovery-card">
                            <div className="card-gradient"></div>
                            <div className="card-content">
                                <div className="card-icon-box">
                                    <span className="material-symbols-outlined text-4xl">forum</span>
                                </div>
                                <h3 className="card-title">Join Discussions</h3>
                                <p className="card-desc">Connect with like-minded people and start new conversations today.</p>
                            </div>
                            <div className="card-arrow">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </a>
                    </div>
                </div> */}
            </div>
        </div>
    );
};