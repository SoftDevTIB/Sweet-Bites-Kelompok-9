import React from 'react';
import logo from '../../assets/logo.png';
import './footer.css';

const Footer = () => {
  return (
<footer className="footer bg-white border-top py-4 px-4">
      <div>
        <div className="row gy-4">
          <div className="col-md-3 d-flex align-items-center">
            <img src={logo} alt="Sweet Bites Logo" style={{ height: '80px', paddingLeft:'150px'}} />
          </div>
          <div className="col-md-9 d-flex justify-content-between flex-wrap">
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
        <div className="copyright text-center mt-4" style={{ fontSize: '14px' }}>
          Sweet Bites 2025 CopyRight @
        </div>
      </div>
    </footer>
  );
};

export default Footer;
