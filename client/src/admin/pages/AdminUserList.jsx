import { BsArrowRightCircle, BsArrowLeftCircle, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        if (Array.isArray(data)) {
          const formatted = data.map(user => ({
            _id: user._id,
            nama: user.name,
            email: user.email,
            phone: user.phone,
          }));
          setUsers(formatted);
        } else {
          console.error('Data pengguna bukan array:', data);
        }
      } catch (err) {
        console.error('Gagal mengambil data pengguna:', err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <AdminLayout>
      <section className='admin-section'>
        <div className="admin-container" style={{ maxWidth: '900px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Pelanggan</li>
              <li className="breadcrumb-item active" aria-current="page">Daftar Pelanggan</li>
            </ol>
          </nav>

          <h4 className="fw-bold mb-3">Daftar Pelanggan</h4>

          <div className="container border border-2 border-primary rounded-4 px-0 pt-2 pb-0 menu-container">
            <div className='row justify-content-end mx-0 mb-2 pb-0 search-bar'>
              <div className="col-10 col-sm-6 col-md-4 p-0">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search nama..."
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

            <div className="card card-admin shadow-sm rounded-4 border-0 admin-table">
              <div className="card-body p-0">
                <div className="table-responsive rounded-bottom admin-wrapper">
                  <table className="table table-borderless mb-0">
                    <thead className="text-center">
                      <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Telepon</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {currentItems.length > 0 ? (
                        currentItems.map((user, index) => (
                          <tr key={user._id || index}>
                            <td>{user.nama}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || '-'}</td>
                            <td>
                              <Link to={`/admin/users/${user._id}`} className="link-no-style">
                                <BsSearch className="text-primary cursor-pointer detail-btn" /> Detail
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">Tidak ada pengguna yang cocok.</td>
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
      </section>
    </AdminLayout>
  );
};

export default AdminUserListPage;