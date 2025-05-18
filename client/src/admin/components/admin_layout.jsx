import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './admin_layout.css';

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center header">
          <div className="col-2">
            <button
              className="btn btn-outline-dark menu-button"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
          <div className="col"></div>
          <img
            src={logo}
            alt="Sweet Bites Logo"
            className="logo position-absolute top-50 start-50 translate-middle"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        style={{ width: '20%' }}
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header sidebar">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body sidebar">
          <ul>
            <Link to="/admin"><i className="bi bi-house"></i> Dashboard</Link>
            <Link to="/products"><i className="bi bi-grid"></i> Produk</Link>
            <Link to="/orders"><i className="bi bi-handbag"></i> Pesanan</Link>
          </ul>
        </div>
      </div>

      {/* Main Content goes here */}
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
