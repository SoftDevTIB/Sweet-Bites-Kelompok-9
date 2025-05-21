import '../components/dashboard.css';
import { Link } from 'react-router-dom';
import { BsArrowRightCircle, BsArrowLeftCircle, BsPencilSquare, BsTrash3, BsPlusCircle, BsSearch } from 'react-icons/bs';
import { useState } from 'react';

import AdminLayout from '../components/admin_layout';
import '../components/admin_menu.css';

const AdminMenuPage = () => {
  const allMenuItems = [
    { nama: 'Choco Oreo', stok: 32, harga: 'Rp 10.000' },
    { nama: 'Cheese Tart', stok: 15, harga: 'Rp 10.000' },
    { nama: 'Brownies', stok: 6, harga: 'Rp 10.000' },
    { nama: 'Ogura Pandan', stok: 7, harga: 'Rp 10.000' },
    { nama: 'Red Velvet', stok: 12, harga: 'Rp 10.000' },
    { nama: 'Matcha Roll', stok: 9, harga: 'Rp 10.000' },
    { nama: 'Tiramisu', stok: 5, harga: 'Rp 10.000' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredMenu = allMenuItems.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredMenu.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <AdminLayout>
      <section className='admin-section'>
        <div className="container" style={{ maxWidth: '900px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Produk</li>
              <li className="breadcrumb-item active" aria-current="page">Daftar Menu</li>
            </ol>
          </nav>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Daftar Menu</h4>
            <Link to="/admin/addproduct" className="btn btn-teal">
              <BsPlusCircle className="me-2" /> Tambah Produk
            </Link>
          </div>

          <div className="container border border-2 border-primary rounded-4 px-0 pt-2 pb-0 menu-container">
            {/* Search Bar */}
            <div className='row justify-content-end mx-0 mb-2 pb-0 search-bar'>
              <div className="col-10 col-sm-6 col-md-4 p-0">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); 
                  }}
                />
              </div>
              <div className='col-auto src-btn'> 
                <BsSearch />
              </div>
            </div>

            {/* Tabel Menu */}
            <div className="card shadow-sm rounded-4 border-0">
              <div className="card-body p-0">
                <div className="table-responsive rounded-bottom">
                  <table className="table table-borderless mb-0">
                    <thead className="text-center">
                      <tr>
                        <th>Nama Produk</th>
                        <th>Stok</th>
                        <th>Harga</th>
                        <th>Edit</th>
                        <th>Hapus</th>
                      </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.nama}</td>
                            <td>{item.stok}</td>
                            <td>{item.harga}</td>
                            <td>
                              <BsPencilSquare className="text-success cursor-pointer" />
                            </td>
                            <td>
                              <BsTrash3 className="text-danger cursor-pointer" />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">Tidak ada produk yang cocok.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigasi Halaman */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
              <button
                className="btn btn-outline-teal"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <BsArrowLeftCircle />
              </button>
              <span className='text-center'>
                Menampilkan {currentPage} dari {totalPages} halaman
              </span>
              <button
                className="btn btn-outline-teal"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <BsArrowRightCircle />
              </button>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminMenuPage;