import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsHouse, BsGrid, BsHandbag } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.png';
import './admin.css';

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <div className="container-fluid sticky admin-header">
        <div className="row justify-content-between align-items-center">
          <div className="col"></div>
          <img
            src={logo}
            alt="Sweet Bites Logo"
            className="logo position-absolute top-50 start-50 translate-middle"
          />
        </div>
      </div>

      <div className='sidebar'>
        <nav className='nav flex-column'>
          <Link to="/admin" className='nav-link'>
            <BsHouse className="icon" />
            <span className='desc'>Dashboard</span>
          </Link>
          <Link to="/admin/menu" className='nav-link'>
            <BsGrid className="icon" />
            <span className='desc'>Produk</span>
          </Link>
          <Link to="/admin/orders" className='nav-link'>
            <BsHandbag className="icon" />
            <span className='desc'>Pesanan</span>
          </Link>
          <Link to="/admin/users" className='nav-link'>
            <FiUser className="icon" />
            <span className='desc'>Pelanggan</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className='admin-main'>{children}</main>
    </>
  );
};

export default AdminLayout;