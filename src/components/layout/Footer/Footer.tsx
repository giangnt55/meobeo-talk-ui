import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2024 Meobeo Talk. All rights reserved.</p>
        <div className="footer__links">
          <a className="footer__link" href="#">Terms</a>
          <a className="footer__link" href="#">Privacy</a>
          <a className="footer__link" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};