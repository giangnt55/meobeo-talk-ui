
import React from 'react';
import { useNavigate } from 'react-router-dom';


import { Button } from '@/components/common/Button/Button';
import './Welcome.css';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-layout">
        <main className="welcome-main">
          <div className="content-wrapper">
            <div className="hero-graphic">
              <div className="graphic-bg-blur"></div>
              <div className="graphic-circle">
                <div className="inner-circle">
                  <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                    celebration
                  </span>
                </div>
                <div className="deco-star">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
                <div className="deco-heart">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </div>
                <div className="deco-dot-blue"></div>
                <div className="deco-dot-green"></div>
              </div>
            </div>

            <div className="text-section">
              <h1 className="welcome-heading">Chào mừng cậu đến nhà Meowmuc!</h1>
              <p className="welcome-description">
                Cậu đã sẵn sàng rồi nè! Cùng bắt đầu trò chuyện, kể những câu chuyện thú vị và khám phá những điều tuyệt vời trong cộng đồng nhỏ ấm áp của tụi mình nha.
              </p>
            </div>

            <div className="action-buttons">
              <Button
                variant="primary"
                size="lg"
                rounded="lg"
                className="welcome-action-btn"
                onClick={() => navigate('/home')}
                leftIcon={<span className="material-symbols-outlined">explore</span>}
              >
                Explore the Main Feed
              </Button>
              <Button
                variant="outline"
                size="lg"
                rounded="lg"
                className="welcome-action-btn"
                onClick={() => navigate('/memories/create')}
                leftIcon={<span className="material-symbols-outlined">post_add</span>}
              >
                Start Creating Your First Post
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WelcomePage;
