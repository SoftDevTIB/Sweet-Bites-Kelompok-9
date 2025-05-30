import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const statusColors = {
  Menunggu: '#FF55E5',
  Diproses: '#FF8C00',
  Dikirim: '#FFD400',
  Selesai: '#00FF3C',
};

const AdminOrderDetailPage = () => {
  const [status, setStatus] = useState('Menunggu');

  return (
    <AdminLayout>
      <section className="admin-section">
        <div className="admin-container" style={{ maxWidth: '900px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Pesanan</li>
              <li className="breadcrumb-item">Daftar Pesanan</li>
              <li className="breadcrumb-item active" aria-current="page">
                Detail Pesanan ORD00027
              </li>
            </ol>
          </nav>

          <h4 className="fw-bold mb-3">Detail Pesanan</h4>

          <div className="rounded-3 p-4 m-2 m-lg-5" style={{ backgroundColor: '#ffeecc' }}>
            <h4 className="text-center mb-4 text-red">ORD 00027</h4>

            <div className="mb-3">
              <p><span className="fw-bold me-md-3 me-2">Pembeli:</span>Vivian</p>
              <p><span className="fw-bold me-md-3 me-2">Waktu:</span>23 April 2025</p>
              <p><span className="fw-bold me-md-3 me-2">Alamat:</span>Jl. Mawar No. 10, Jakarta Barat</p>

              <div className="d-flex align-items-center">
                <strong className="me-2">Status:</strong>
                <div className="d-inline-flex align-items-center px-2 py-1 border rounded-pill">
                  <span
                    className="me-2 rounded-circle status-color-circle"
                    style={{
                      backgroundColor: statusColors[status] || '#ccc'
                    }}
                  ></span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                  <tr>
                    <td>Choco Oreo</td>
                    <td>1x</td>
                    <td>Rp 10.000</td>
                    <td>Rp 10.000</td>
                  </tr>
                  <tr>
                    <td>Cheese Tart</td>
                    <td>1x</td>
                    <td>Rp 10.000</td>
                    <td>Rp 10.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-end px-sm-1 px-md-5">
              <p><span className="me-md-3 me-2">Sub Total:</span> Rp 20.000</p>
              <p><span className="me-md-3 me-2">Ongkir:</span> Rp 10.000</p>
              <p className="fw-bold">
                <span className="me-md-3 me-2 text-teal">Total Bayar:</span>
                <span className="text-red">Rp 30.000</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminOrderDetailPage;