import { Link } from 'react-router-dom';
import { BsArrowRightCircle, BsArrowLeftCircle, BsPencilSquare, BsTrash3, BsPlusCircle, BsSearch } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AdminLayout from '../components/AdminLayout';

const AdminMenuPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // ID produk yang dipilih untuk dihapus
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          nama: item.productName,
          stok: item.stock,
          harga: 'Rp ' + Number(item.price).toLocaleString('id-ID'),
          _id: item._id,
        }));
        setProducts(formatted);
      })
      .catch(err => {
        console.error('Gagal mengambil produk:', err);
      });
  }, []);

  const filteredMenu = products.filter(item =>
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setShowModal2(true);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk");
    }
  };

  return (
    <AdminLayout>
      <section className='admin-section'>
        <div className="admin-container" style={{ maxWidth: '900px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Produk</li>
              <li className="breadcrumb-item active" aria-current="page">Daftar Menu</li>
            </ol>
          </nav>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Daftar Menu</h4>
            <Link to="/admin/addproduct" className="btn admin-btn-teal">
              <BsPlusCircle className="me-2" /> Tambah Produk
            </Link>
          </div>

          <div className="container border border-2 border-primary rounded-4 px-0 pt-2 pb-0 menu-container">
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

            <div className="card shadow-sm rounded-4 border-0 admin-table">
              <div className="card-body p-0">
                <div className="table-responsive rounded-bottom admin-wrapper">
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
                          <tr key={item._id || index}>
                            <td>{item.nama}</td>
                            <td>{item.stok}</td>
                            <td>{item.harga}</td>
                            <td>
                              <Link to={`/admin/editproduct/${item._id}`}>
                                <BsPencilSquare className="text-success cursor-pointer" />
                              </Link>
                            </td>
                            <td>
                              <BsTrash3
                                className="text-danger cursor-pointer"
                                onClick={() => {
                                  setSelectedId(item._id);
                                  setShowModal1(true);
                                }}
                              />
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

        {/* Modal Konfirmasi (Modal 1) */}
        {showModal1 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Apakah Anda yakin ingin menghapus produk?</p>
              <div className="modal-actions d-flex gap-3 justify-content-center mt-4">
                <button
                  className="btn btn-teal rounded-pill px-5"
                  onClick={() => {
                    setShowModal1(false);
                    if (selectedId) {
                      handleDelete(selectedId);
                      setSelectedId(null);
                    }
                  }}
                >
                  Ya
                </button>
                <button
                  className="btn btn-secondary rounded-pill px-5"
                  onClick={() => {
                    setShowModal1(false);
                    setSelectedId(null);
                  }}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Berhasil (Modal 2) */}
        {showModal2 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Produk berhasil dihapus!</p>
              <div className="modal-actions">
                <button
                  className="btn btn-teal rounded-pill px-5"
                  onClick={() => setShowModal2(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminMenuPage;