import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs';
import { FiShoppingBag, FiShoppingCart, FiUser } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import './header.css';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  const handleProtectedClick = async (path) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(path);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      {/* Large screen header */}
      <header className="header d-none d-md-flex justify-content-between align-items-center py-3 px-4">
        <div className="logo-nav">
          <img src={logo} alt="Sweet Bites Logo" />
        </div>
        <nav className="nav-links d-flex gap-4">
          <Link to="/">HOME</Link>
          <Link to="/menu">MENU</Link>
          <Link to="/kontak">KONTAK</Link>
          <Link to="/tentang">TENTANG KAMI</Link>
        </nav>

        <div className="icons d-flex align-items-center position-relative">
          {isLoggedIn ? (
            <button onClick={handleLogoutClick} className="btn btn-logout px-3 py-1 rounded">
              <BsBoxArrowRight size={20} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-login px-3 py-1 rounded d-flex align-items-center gap-2"
              style={{ color: '#198754', fontWeight: '600', textDecoration: 'none' }}
            >
              <BsBoxArrowInRight size={20} /> Login
            </Link>
          )}

          <Link to="/cart" className="icon position-relative">
            <FiShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button onClick={() => handleProtectedClick('/pesanan')} className="icon bg-transparent border-0 p-0">
            <FiShoppingBag size={20} />
          </button>

          <button onClick={() => handleProtectedClick('/profile')} className="icon bg-transparent border-0 p-0">
            <FiUser size={20} />
          </button>
        </div>
      </header>

      {/* Small screen navbar with collapse */}
      <nav className="navbar navbar-expand-md navbar-light d-md-none small-header">
        <div className="container-fluid py-1 px-3 d-flex align-items-center justify-content-between">
          <Link className="navbar-brand pt-0" to="/">
            <img src={logo} alt="Sweet Bites Logo" style={{ height: '50px' }} />
          </Link>
          <button
            className="navbar-toggler pt-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapseContent"
            aria-controls="navbarCollapseContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarCollapseContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0  d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">MENU</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kontak">KONTAK</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tentang">TENTANG KAMI</Link>
            </li>
          </ul>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-2 mt-md-0">
            {isLoggedIn ? (
              <button onClick={handleLogoutClick} className="btn btn-logout px-3 py-1 rounded d-flex align-items-center gap-2">
                <BsBoxArrowRight size={20} /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-login px-3 py-1 rounded d-flex align-items-center gap-2"
                style={{ color: '#198754', fontWeight: '600', textDecoration: 'none' }}
              >
                <BsBoxArrowInRight size={20} /> Login
              </Link>
            )}

            <Link to="/cart" className="position-relative icon">
              <FiShoppingCart size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>

            <button onClick={() => handleProtectedClick('/pesanan')} className="icon bg-transparent border-0 p-0">
              <FiShoppingBag size={20} />
            </button>

            <button onClick={() => handleProtectedClick('/profile')} className="icon bg-transparent border-0 p-0">
              <FiUser size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="modal-content p-4 rounded shadow bg-white">
            <h5>Konfirmasi Logout</h5>
            <p>Apakah kamu yakin ingin logout?</p>
            <div className="d-flex justify-content-center px-3 mt-3">
              <button onClick={handleCancelLogout} className="btn me-3 btn-secondary rounded-pill px-4">Batal</button>
              <button onClick={handleConfirmLogout} className="btn btn-teal rounded-pill">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="modal-backdrop">
          <div className="modal-content p-4 rounded shadow bg-white">
            <h5>Login Diperlukan</h5>
            <p>Silakan login untuk mengakses halaman ini.</p>
            <div className="d-flex justify-content-center px-3 mt-3">
              <button onClick={() => setShowLoginModal(false)} className="btn me-3 btn-secondary rounded-pill px-4">Batal</button>
              <button onClick={() => navigate('/login')} className="btn btn-teal rounded-pill">Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;