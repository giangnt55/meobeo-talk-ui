
import React from 'react';
import { useNavigate } from 'react-router-dom';


import { Button } from '@/components/common/Button/Button';
import './Welcome.css';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-layout">
        <header className="welcome-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="brand-logo">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_543)">
                    <path
                      d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                      fill="currentColor"
                    ></path>
                    <path
                      clipRule="evenodd"
                      d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_543">
                      <rect fill="white" height="48" width="48"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="brand-title">Meobeo Talk</h2>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div
                className="user-avatar"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIW-2THnNNT44TgojqZ7kW2Rejh9_rIf5wQ9_OpzKVQ_Dk9NhvhIG5fzaua7nCT4RHUNkfcX7eEL0tjHjtq8P-oNbHWxDebVJAZj42WJyWjX4BZN83QvERTGkUeWQyhnMFP2Sbx128KO8k6_uCQ-O_Tw-pz7On65ds9zP8YGWNhughiDkrZ-inx_s44XUl4wySnbuwsCGQB4CbFH4iNHsYiZ1q91t7NX7AeU4WBETiQBEbPChc8wxRzxknXSAMFQ1fF-b-73tzvGu3")',
                }}
              ></div>
            </div>
          </div>
        </header>

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
              <h1 className="welcome-heading">Welcome to Meobeo!</h1>
              <p className="welcome-description">
                You're all set! Join the conversation, share your story, and discover amazing content in our vibrant
                community.
              </p>
            </div>

            <div className="action-buttons">
              <Button
                variant="primary"
                size="lg"
                rounded="lg"
                className="welcome-action-btn"
                onClick={() => navigate('/home')}
                icon={<span className="material-symbols-outlined">explore</span>}
              >
                Explore the Main Feed
              </Button>
              <Button
                variant="outline"
                size="lg"
                rounded="lg"
                className="welcome-action-btn"
                onClick={() => navigate('/memory/create')}
                icon={<span className="material-symbols-outlined">post_add</span>}
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
