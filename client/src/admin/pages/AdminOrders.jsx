// src/admin/pages/AdminOrdersPage.jsx
import { Link } from 'react-router-dom';
import { BsArrowRightCircle, BsArrowLeftCircle, BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const statusColors = {
  menunggu: '#FF55E5',   // Warna pink lembut
  diproses: '#FF8C00',   // Oranye
  dikirim:  '#FFD400',   // Kuning
  selesai:  '#00C851',   // Hijau
};

const StatusBadge = ({ status }) => {
  // Buat key lowercase untuk lookup warna
  const statusKey = status.toLowerCase();
  const color = statusColors[statusKey] || '#ccc';

  // Untuk teks ditampilkan kapitalisasi pertama
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div className="d-flex align-items-center gap-2 justify-content-center">
      <span
        style={{
          backgroundColor: color,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
      <span className="text-capitalize fw-medium">{statusLabel}</span>
    </div>
  );
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('Gagal mengambil data');

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Gagal mengambil data order:', err);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const namaUser = order.userId?.name || '';
    const matchesSearch =
      namaUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Semua' ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentItems = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

          <div className="container border border-2 border-primary rounded-4 px-0 pt-2 pb-0">
            <div className="mb-3 mx-3 filter-search">
              <div className="d-flex flex-wrap gap-2 align-items-center filter-group">
                {['Semua', 'Menunggu', 'Diproses', 'Dikirim', 'Selesai'].map(option => (
                  <button
                    key={option}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold d-flex align-items-center gap-2 ${
                      statusFilter === option ? 'filter-btn-active' : 'filter-btn'
                    }`}
                    onClick={() => {
                      setStatusFilter(option);
                      setCurrentPage(1);
                    }}
                  >
                    {option === 'Semua' ? (
                      <span>{option}</span>
                    ) : (
                      <StatusBadge status={option} />
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
                <BsSearch className="order-src-btn" />
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
                          <tr key={order._id || index}>
                            <td>{order.orderId}</td>
                            <td>{new Date(order.orderDate).toLocaleString('id-ID')}</td>
                            <td className="fw-semibold">{order.userId?.name || '—'}</td>
                            <td>Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                            <td><StatusBadge status={order.status} /></td>
                            <td>
                              <Link to={`/admin/orders/detail/${order.orderId}`} className="link-no-style">
                                <BsSearch className="text-primary cursor-pointer detail-btn" /> Detail
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

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
              <button
                className="btn btn-outline-teal"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <BsArrowLeftCircle />
              </button>
              <span>Menampilkan {currentPage} dari {totalPages} halaman</span>
              <button
                className="btn btn-outline-teal"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
