import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import AdminLayout from '../components/AdminLayout';
import { FiShoppingBag, FiDollarSign, FiUser } from 'react-icons/fi';
import { BsBoxArrowRight } from 'react-icons/bs';
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [productPhotos, setProductPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard data');

        const data = await response.json();
        setDashboardData(data);

        // Ambil foto dari setiap productId
        const photoMap = {};
        await Promise.all(
          data.bestSellers.map(async (product) => {
            try {
              const res = await fetch(`http://localhost:5000/api/products/${product.productId}`);
              const prod = await res.json();
              photoMap[product.productId] = `http://localhost:5000/uploads/${prod.photo}`;
            } catch (err) {
              console.error(`Gagal fetch foto untuk produk ${product.productId}`, err);
            }
          })
        );

        setProductPhotos(photoMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboard();
  }, []);

  const chartData = {
    labels: dashboardData?.salesByDate.map(item => item._id) || [],
    datasets: [
      {
        label: 'Penjualan',
        data: dashboardData?.salesByDate.map(item => item.total) || [],
        fill: true,
        borderColor: '#4e9488',
        backgroundColor: 'rgba(78, 148, 136, 0.2)',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#4e9488',
      },
    ],
  };

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
          callback: (value) => `${value}`,
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

  return (
    <AdminLayout>
      <section className="admin-section"> 
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Dashboard</h2>
            <button onClick={() => setShowModal(true)} className="logout-btn">
              Logout <BsBoxArrowRight className="icon" />
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Info Cards */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                    <h3 className="fw-bold">{dashboardData.totalProducts}</h3>
                    <span className='text-muted'>
                      Total Produk
                      <FiShoppingBag className='dash-icon' />
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                    <h3 className="fw-bold">
                      {dashboardData.totalSales.toLocaleString('id-ID')}
                    </h3>
                    <span className='text-muted'>
                      Total Penjualan
                      <FiDollarSign className='dash-icon' />
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                    <h3 className="fw-bold">{dashboardData.totalUsers}</h3>
                    <span className='text-muted'>
                      Total User
                      <FiUser className='dash-icon' />
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart & Produk Terlaris */}
              <div className="row g-4">
                <div className="col-md-8">
                  <div className="dash-chart p-4 rounded-4 shadow-sm h-100">
                    <h5 className="mb-3 text-teal">Grafik Penjualan</h5>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 pt-4 rounded-4 shadow-sm h-100 bestseller-box">
                    <h5 className="mb-3 text-center text-teal">Produk Terlaris</h5>
                    <div className="bestseller-product p-4 rounded">
                      <div className="d-flex fw-semibold pb-2 mb-2">
                        <div style={{ width: '60px' }}>IMAGE</div>
                        <div className="flex-grow-1 text-center">PRODUCT NAME</div>
                      </div>

                      <ul className="p-0 m-0">
                        {dashboardData.bestSellers.map((product, index) => (
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
                              src={productPhotos[product.productId] || ''}
                              alt={product.productName}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginRight: '12px'
                              }}
                            />
                            <span>{product.productName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Modal Logout */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p>Yakin ingin logout?</p>
                <div className="modal-actions">
                  <button className="btn btn-teal rounded-pill" onClick={handleLogout}>
                    Ya, Logout
                  </button>
                  <button className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPage;