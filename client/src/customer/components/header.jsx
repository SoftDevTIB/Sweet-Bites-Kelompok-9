import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './header.css';
import { useCart } from '../context/CartContext';
import { BsBoxArrowRight } from 'react-icons/bs';


const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
        
        <div className="icons d-flex gap-3 align-items-center position-relative">
          {isLoggedIn ? (
            <button
              onClick={handleLogoutClick}
              className="btn btn-logout px-3 py-1 rounded"
            >
              <BsBoxArrowRight className="icon" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-login px-3 py-1 rounded d-flex align-items-center gap-2"
              style={{
                color: '#198754',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
               <BsBoxArrowRight className="icon" />
              Login
            </Link>
          )}
          <Link to="/cart" className="icon position-relative">
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
          <Link to="/profile" className="icon">
            <FaUser size={20} />
          </Link>

          
        </div>
      </header>

      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="modal-content p-4 rounded shadow bg-white">
            <h5>Konfirmasi Logout</h5>
            <p>Apakah kamu yakin ingin logout?</p>
            <div className="d-flex justify-content-center g px-3 mt-3">
              <button onClick={handleCancelLogout} className="btn me-3 btn-secondary rounded-pill px-4">Batal</button>
              <button onClick={handleConfirmLogout} className="btn btn-teal rounded-pill">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
