import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './header.css';

const Header = () => {
  return (
<header className="header d-flex justify-content-between align-items-center py-3 px-4">
      <div className="logo">
        <img src={logo} alt="Sweet Bites Logo" style={{ height: '50px' }} />
      </div>
      <nav className="nav-links d-flex gap-4">
        <a href="/" className="text-decoration-none text-dark fw-medium">HOME</a>
        <a href="/menu" className="text-decoration-none text-dark fw-medium">MENU</a>
        <a href="/kontak" className="text-decoration-none text-dark fw-medium">KONTAK</a>
        <a href="/tentang" className="text-decoration-none text-dark fw-medium">TENTANG KAMI</a>
      </nav>
      <div className="icons d-flex gap-3">
        <Link to="/cart" className="icon">
          <FaShoppingCart />
        </Link>
        <FaUser className="icon" />
      </div>
    </header>
  );
};

export default Header;
