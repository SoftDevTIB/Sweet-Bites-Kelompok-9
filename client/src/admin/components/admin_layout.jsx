import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Offcanvas } from 'bootstrap';
import { BsHouse, BsGrid, BsHandbag, BsList } from 'react-icons/bs';

import logo from '../../assets/logo.png';
import './admin_layout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    const offcanvasEl = document.getElementById('offcanvasMenu');
    let offcanvas = Offcanvas.getInstance(offcanvasEl);
    if (!offcanvas) {
      offcanvas = new Offcanvas(offcanvasEl);
    }
    offcanvas.hide();
    navigate(path);
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid sticky">
        <div className="row justify-content-between align-items-center header">
          <div className="col-2">
            <button
              className="btn menu-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <BsList className='icon' />
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

      {/* Sidebar (Offcanvas) */}
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
          <ul className="list-unstyled">
            <li>
              <Link to="/admin" onClick={(e) => handleNavigate(e, '/admin')}>
                <BsHouse className="icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/menu" onClick={(e) => handleNavigate(e, '/menu')}>
                <BsGrid className="icon" /> Produk
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={(e) => handleNavigate(e, '/orders')}>
                <BsHandbag className="icon" /> Pesanan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;