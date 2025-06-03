import React from 'react';
import logo from '../../assets/logo.png';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Sweet Bites Logo" />
        </div>
        <div className="footer-links">
          <div>
            <p className="mb-2">HOME</p>
            <p className="mb-2">MENU</p>
            <p className="mb-2">TENTANG KAMI</p>
          </div>
          <div>
            <p className="mb-2">LINE</p>
            <p className="mb-2">WHATSAPP</p>
            <p className="mb-2">INSTAGRAM</p>
            <p className="mb-2">EMAIL</p>
          </div>
          <div>
            <p className="mb-2">TERMS & CONDITIONS</p>
            <p className="mb-2">FAQ</p>
          </div>
        </div>
      </div>
      <div className="copyright">
        Sweet Bites 2025 CopyRight @
      </div>
    </footer>
  );
};

export default Footer;