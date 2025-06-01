// src/admin/pages/AdminOrderDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import Toast from '../../customer/components/Toast';

const statusColors = {
  menunggu: '#FF55E5',   // Warna pink lembut
  diproses: '#FF8C00',   // Oranye
  dikirim:  '#FFD400',   // Kuning
  selesai:  '#00FF3C',   // Hijau
};

const AdminOrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error('Gagal load order detail:', err);
        setError('Gagal mengambil detail pesanan');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value.toLowerCase();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(res.data);
      setStatus(res.data.status);
      setShowToast(true);
    } catch (err) {
      console.error('Gagal update status:', err);
      alert('Tidak dapat memperbarui status.');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center p-5">Loading detail pesanan...</div>
      </AdminLayout>
    );
  }
  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center p-5 text-danger">
          {error || 'Pesanan tidak ditemukan.'}
        </div>
      </AdminLayout>
    );
  }

  // Format tanggal order menjadi "DD MMMM YYYY"
  const formattedDate = new Date(order.orderDate).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Ambil nama dan alamat user (asumsi di‐populate di backend)
  const customerName = order.userId?.name || '-';
  const alamatUser = order.userId?.address
    ? `${order.userId.address.alamat}, ${order.userId.address.kota}`
    : '-';

  // Hitung subtotal: jumlah tiap item = price * quantity
  const subtotal = order.items.reduce((sum, item) => {
    const hargaSatuan = item.productId?.price || 0;
    return sum + hargaSatuan * item.quantity;
  }, 0);

  const ongkir = order.deliveryFee || 0;
  const totalBayar = subtotal + ongkir;

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <AdminLayout>
      <section className="admin-section">
        <div className="admin-container" style={{ maxWidth: '900px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Pesanan</li>
              <li
                className="breadcrumb-item"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/admin/orders')}
              >
                Daftar Pesanan
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Detail Pesanan {order.orderId}
              </li>
            </ol>
          </nav>

          <h4 className="fw-bold mb-3">Detail Pesanan</h4>

          <div
            className="rounded-3 p-4 m-2 m-lg-5"
            style={{ backgroundColor: '#ffeecc' }}
          >
            <h4 className="text-center fw-semibold mb-4 text-oren">{order.orderId}</h4>

            <div className="mb-3">
              <p>
                <span className="fw-bold me-md-3 me-2">Pembeli:</span>
                {customerName}
              </p>
              <p>
                <span className="fw-bold me-md-3 me-2">Waktu:</span>
                {formattedDate}
              </p>
              <p>
                <span className="fw-bold me-md-3 me-2">Alamat:</span>
                {alamatUser}
              </p>

              <div className="d-flex align-items-center">
                <strong className="me-2">Status:</strong>
                <div className="d-inline-flex align-items-center px-2 py-1 border rounded-pill">
                  <span
                    className="me-2 rounded-circle status-color-circle"
                    style={{
                      backgroundColor: statusColors[status.toLowerCase()] || '#ccc'
                    }}
                  ></span>
                  <select
                    value={status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                    onChange={(e) => {
                      // Ambil value option, ubah jadi lowercase
                      const selected = e.target.value;
                      setStatus(selected.toLowerCase());
                      handleStatusChange({ target: { value: selected } });
                    }}
                    className="form-select border-0 p-0 bg-transparent select-box"
                  >
                    <option>Menunggu</option>
                    <option>Diproses</option>
                    <option>Dikirim</option>
                    <option>Selesai</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive rounded-3 overflow-hidden mb-4 border border-2 border-primary admin-order-detail-scroll">
              <table className="table table-borderless text-center align-middle admin-order-table mb-0">
                <thead className="text-white" style={{ backgroundColor: '#d37635' }}>
                  <tr>
                    <th>Nama Produk</th>
                    <th>Jumlah</th>
                    <th>Harga Satuan</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => {
                    const namaProduk = item.productId?.productName || '-';
                    const hargaSatuan = item.productId?.price || 0;
                    const totalItem = hargaSatuan * item.quantity;
                    return (
                      <tr key={idx}>
                        <td>{namaProduk}</td>
                        <td>{item.quantity}x</td>
                        <td>Rp {hargaSatuan.toLocaleString('id-ID')}</td>
                        <td>Rp {totalItem.toLocaleString('id-ID')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="text-end px-sm-1 px-md-5">
              <p>
                <span className="me-md-3 me-2">Sub Total:</span> Rp{' '}
                {subtotal.toLocaleString('id-ID')}
              </p>
              <p>
                <span className="me-md-3 me-2">Ongkir:</span> Rp{' '}
                {ongkir.toLocaleString('id-ID')}
              </p>
              <p className="fw-bold">
                <span className="me-md-3 me-2 text-teal">Total Bayar:</span>
                <span className="text-oren">
                  Rp {totalBayar.toLocaleString('id-ID')}
                </span>
              </p>
            </div>
          </div>
        </div>

        <Toast
        message="Status pesanan berhasil diperbarui"
        show={showToast}
        onClose={handleToastClose}
      />
      </section>
    </AdminLayout>
  );
};

export default AdminOrderDetailPage;
