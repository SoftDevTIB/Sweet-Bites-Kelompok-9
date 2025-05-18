import { Link } from 'react-router-dom';
import { BsHouse, BsGrid, BsHandbag, BsList } from 'react-icons/bs';

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
              className="btn menu-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <BsList className='icon'/>
            </button>
          </div>
          <div className="col"></div>
          <img
            src={logo}
            alt="Sweet Bstes Logo"
            className="logo position-absolute top-50 start-50 translate-middle"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        style={{ width: '20%' }}
        data-bs-backdrop="false"
        tabsndex="-1"
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
            <Link to="/admin"><BsHouse className='icon'/> Dashboard</Link>
            <Link to="/products"><BsGrid className='icon'/> Produk</Link>
            <Link to="/orders"><BsHandbag className='icon'/> Pesanan</Link>
          </ul>
        </div>
      </div>

      {/* Main Content goes here */}
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
