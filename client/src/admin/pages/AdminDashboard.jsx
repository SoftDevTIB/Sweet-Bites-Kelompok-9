import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import AdminLayout from '../components/AdminLayout';
import { FiShoppingBag, FiDollarSign, FiUser } from 'react-icons/fi';
import { BsBoxArrowRight, BsPersonFill } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import imgdummy from '../../assets/Choco_oreo.jpg';

// Registrasi ChartJS
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dan role di localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect ke halaman login
    navigate('/login');
  };

  // Data chart dummy
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Penjualan',
        data: [85, 40, 60, 100, 90, 85, 70, 120, 95, 90, 110, 150],
        fill: true,
        borderColor: '#4e9488',
        backgroundColor: 'rgba(78, 148, 136, 0.2)',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#4e9488',
      },
    ],
  };

  // Opsi chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}K`,
          color: '#D67832',
        },
        beginAtZero: true,
        grid: {
          borderDash: [5, 5], 
          color: '#D67832',
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: '#D67832',
        },
        grid: {
          display: false,
        },
      }
    },
  };

  // Dummy data produk terlaris
  const topProducts = [
    { name: 'Choco Cookies' },
    { name: 'Strawberry Tart'},
    { name: 'Matcha Cake' },
  ];

  return (
    <AdminLayout>
      <section className="admin-section">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Dashboard</h2>
            <button
            onClick={() => setShowModal(true)}
            className="logout-btn"
          >
            Logout <BsBoxArrowRight className="icon" />
          </button>
          </div>

          {/* Info Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                <h3 className="fw-bold">30</h3>
                <span className='text-muted'>
                  Total Produk
                  <FiShoppingBag className='dash-icon' />
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                <h3 className="fw-bold">9.200.000</h3>
                <span className='text-muted'>
                  Total Penjualan
                  <FiDollarSign className='dash-icon' />
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                <h3 className="fw-bold">50</h3>
                <span className='text-muted'>
                  Total User
                  <FiUser className='dash-icon' />
                </span>
              </div>
            </div>
          </div>

          {/* Chart & Produk Terlaris */}
          <div className="row g-4">
            {/* Grafik Penjualan */}
            <div className="col-md-8">
              <div className="dash-chart p-4 rounded-4 shadow-sm h-100">
                <h5 className="mb-3 text-teal">Grafik Penjualan (Yearly)</h5>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Produk Terlaris */}
            <div className="col-md-4">
              <div className="p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#FADB9A', borderRadius: '16px' }}>
                <h5 className="mb-3 text-center text-teal">Product Terlaris</h5>

                {/* Header kolom */}
                <div className="d-flex fw-semibold pb-2 mb-2">
                  <div style={{ width: '60px' }}>IMAGE</div>
                  <div className="flex-grow-1 text-center">PRODUCT NAME</div>
                </div>

                {/* Daftar produk */}
                <ul className="p-0 m-0">
                  {topProducts.map((product, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-center py-2"
                      style={{
                        borderTop: '1px solid #3B7883',
                        backgroundColor: 'transparent',
                        listStyle: 'none'
                      }}
                    >
                      <img
                        src={imgdummy}
                        alt={product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '12px'
                        }}
                      />
                      <span>{product.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Modal konfirmasi logout */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Yakin ingin logout?</p>
              <div className="modal-actions">
                <button
                  className="btn btn-teal rounded-pill"
                  onClick={handleLogout}
                >
                  Ya, Logout
                </button>
                <button
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminPage;