import { Link } from 'react-router-dom';
import { BsArrowRightCircle, BsArrowLeftCircle, BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const statusColors = {
  Menunggu: '#FF55E5',
  Diproses: '#FF8C00',
  Dikirim: '#FFD400',
  Selesai: '#00FF3C',
};

const StatusBadge = ({ status }) => {
  const color = statusColors[status] || '#ccc';

  return (
    <div className="d-flex align-items-center gap-2">
      <span
        style={{
          backgroundColor: color,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
      <span className="text-capitalize fw-medium">{status}</span>
    </div>
  );
};

const dummyOrders = [
  { id: 'ORD00027', waktu: '23 April 2025, 10:00', pelanggan: 'Vivian', total: 30000, status: 'Menunggu' },
  { id: 'ORD00026', waktu: '23 April 2025, 09:20', pelanggan: 'Stefi', total: 30000, status: 'Diproses' },
  { id: 'ORD00025', waktu: '22 April 2025, 15:00', pelanggan: 'Angel', total: 20000, status: 'Dikirim' },
  { id: 'ORD00024', waktu: '22 April 2025, 17:45', pelanggan: 'Felix', total: 10000, status: 'Dikirim' },
  { id: 'ORD00023', waktu: '21 April 2025, 10:00', pelanggan: 'Vivian', total: 10000, status: 'Selesai' },
  { id: 'ORD00022', waktu: '21 April 2025, 11:20', pelanggan: 'Stefi', total: 10000, status: 'Selesai' },
  { id: 'ORD00021', waktu: '21 April 2025, 15:00', pelanggan: 'Angel', total: 10000, status: 'Selesai' },
  { id: 'ORD00020', waktu: '23 April 2025, 17:45', pelanggan: 'Felix', total: 10000, status: 'Selesai' },
];

const AdminOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = dummyOrders.filter(order => {
    const matchesSearch =
      order.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'Semua' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const statusOptions = ['Semua', 'Menunggu', 'Diproses', 'Dikirim', 'Selesai'];

  return (
    <AdminLayout>
      <section className='admin-section'>
        <div className="admin-container" style={{ maxWidth: '1000px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Pesanan</li>
              <li className="breadcrumb-item active" aria-current="page">Daftar Pesanan</li>
            </ol>
          </nav>

          <h4 className="fw-bold mb-3">Daftar Pesanan</h4>

          {/* Tabel Pesanan */}
          <div className="container border border-2 border-primary rounded-4 px-0 pt-2 pb-0">
            {/* Filter dan Search */}
            <div className="mb-3 mx-3 filter-search">
              <div className="d-flex flex-wrap gap-2 align-items-center filter-group">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold d-flex align-items-center gap-2 ${
                      statusFilter === status ? 'filter-btn-active' : 'filter-btn'
                    }`}
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                    }}
                  >
                    {status === 'Semua' ? (
                      <span className="text-capitalize">{status}</span>
                    ) : (
                      <StatusBadge status={status} />
                    )}
                  </button>
                ))}
              </div>

              <div className="d-flex align-items-center gap-2 mt-2 search-group">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search pelanggan / ID"
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <BsSearch className='order-src-btn'/>
              </div>
            </div>


            <div className="card shadow-sm rounded-4 border-0 admin-table admin-order-table">
              <div className="card-body p-0">
                <div className="rounded-bottom admin-wrapper">
                  <table className="table table-borderless mb-0">
                    <thead className="text-center">
                      <tr>
                        <th>ID Pesanan</th>
                        <th>Waktu</th>
                        <th>Pelanggan</th>
                        <th>Total Harga</th>
                        <th>Status</th>
                        <th>Lihat Detail</th>
                      </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {currentItems.length > 0 ? (
                        currentItems.map((order, index) => (
                          <tr key={order.id || index}>
                            <td>{order.id}</td>
                            <td>{order.waktu}</td>
                            <td className="fw-semibold">{order.pelanggan}</td>
                            <td>Rp {order.total.toLocaleString('id-ID')}</td>
                            <td><StatusBadge status={order.status} /></td>
                            <td>
                              <Link to="/admin/orders/detail" className="link-no-style">
                                <BsSearch className="text-primary cursor-pointer detail-btn" />
                                Detail
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">Tidak ada pesanan yang cocok.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
              <button
                className="btn btn-outline-teal"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <BsArrowLeftCircle />
              </button>
              <span className="text-center">
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

export default AdminOrdersPage;