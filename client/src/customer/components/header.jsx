import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './header.css';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header d-flex justify-content-between align-items-center py-3 px-4">
      <div className="logo">
        <img src={logo} alt="Sweet Bites Logo" style={{ height: '50px' }} />
      </div>
      <nav className="nav-links d-flex gap-4">
        <Link to="/" className="text-decoration-none text-dark fw-medium">HOME</Link>
        <Link to="/menu" className="text-decoration-none text-dark fw-medium">MENU</Link>
        <Link to="/kontak" className="text-decoration-none text-dark fw-medium">KONTAK</Link>
        <Link to="/tentang" className="text-decoration-none text-dark fw-medium">TENTANG KAMI</Link>
      </nav>
      <div className="icons d-flex gap-3 position-relative">
        <Link to="/cart" className="icon position-relative">
          <FaShoppingCart />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>
        <FaUser className="icon" />
      </div>
    </header>
  );
};

export default Header;
