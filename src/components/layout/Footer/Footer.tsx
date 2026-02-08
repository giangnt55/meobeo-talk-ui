import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2024 Meobeo Talk. Bản quyền thuộc về tụi mình nha.</p>
        <div className="footer__links">
          <a className="footer__link" href="#">Điều Khoản</a>
          <a className="footer__link" href="#">Riêng Tư</a>
          <a className="footer__link" href="#">Liên Hệ</a>
        </div>
      </div>
    </footer>
  );
};