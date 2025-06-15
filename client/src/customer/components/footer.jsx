import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
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
              <Link className="mb-2 footer-link" to="/">HOME</Link>
              <Link className="mb-2 footer-link" to="/menu">MENU</Link>
              <Link className="mb-2 footer-link" to="/tentang">TENTANG KAMI</Link>
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