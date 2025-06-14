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
  const [timeFilter, setTimeFilter] = useState('day');
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
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        const data = await response.json();
        setDashboardData(data);

        console.log(data);

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

  const filterSalesData = (sales, filter) => {
    const now = new Date();

    return sales.filter((sale) => {
      const saleDate = new Date(sale._id);
      const diffTime = now - saleDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (filter === 'day') {
        return (
          saleDate.getDate() === now.getDate() &&
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      } else if (filter === 'week') {
        return diffDays < 7;
      } else if (filter === 'month') {
        return diffDays < 30;
      } else if (filter === 'year') {
        return saleDate.getFullYear() === now.getFullYear();
      }

      return true;
    });
  };

  const generateChartData = () => {
    const now = new Date();
    const filteredSales = filterSalesData(dashboardData?.salesByDate || [], timeFilter);

    let labels = [];
    let dataPoints = [];

    if (timeFilter === 'day') {
      labels = Array.from({ length: 8 }, (_, i) => `${i * 3}:00`);
      dataPoints = Array(8).fill(0);

      filteredSales.forEach((sale) => {
        const saleDate = new Date(sale._id);
        const hour = saleDate.getHours();
        const index = Math.floor(hour / 3);
        if (index >= 0 && index < 8) {
          dataPoints[index] += sale.total;
        }
      });

    } else if (timeFilter === 'week') {
      labels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(now.getDate() - 6 + i);
        return d.toLocaleDateString('id-ID', { weekday: 'short' });
      });
      dataPoints = Array(7).fill(0);

      filteredSales.forEach((sale) => {
        const saleDate = new Date(sale._id);
        const index = Math.floor((saleDate.getDate() - (now.getDate() - 6)));
        if (index >= 0 && index < 7) {
          dataPoints[index] += sale.total;
        }
      });

    } else if (timeFilter === 'month') {
      labels = Array.from({ length: 6 }, (_, i) => {
        const daysAgo = 25 - i * 5;
        const labelDate = new Date(now);
        labelDate.setDate(now.getDate() - daysAgo);
        return labelDate.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        });
      });

      dataPoints = Array(6).fill(0);

      filteredSales.forEach((sale) => {
        const saleDate = new Date(sale._id);
        const diffDays = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 30) {
          const index = Math.floor((30 - diffDays - 1) / 5);
          if (index >= 0 && index < 6) {
            dataPoints[index] += sale.total;
          }
        }
      });

    } else if (timeFilter === 'year') {
      labels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
      ];
      dataPoints = Array(12).fill(0);

      filteredSales.forEach((sale) => {
        const saleDate = new Date(sale._id);
        if (saleDate.getFullYear() === now.getFullYear()) {
          const index = saleDate.getMonth();
          dataPoints[index] += sale.total;
        }
      });
    }

    return {
      labels,
      datasets: [
        {
          label: 'Penjualan',
          data: dataPoints,
          fill: true,
          borderColor: '#4e9488',
          backgroundColor: 'rgba(78, 148, 136, 0.2)',
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#4e9488',
        },
      ],
    };
  };

  const chartData = generateChartData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { color: '#D67832' },
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
          color: '#D67832',
        },
      },
      x: {
        ticks: { color: '#D67832', maxRotation: 45, minRotation: 30 },
        grid: { display: false },
      },
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
              <div className="row g-4 mb-5">
                {[{
                  label: 'Total Produk', value: dashboardData.totalProducts, icon: <FiShoppingBag className='dash-icon' />
                }, {
                  label: 'Total Penjualan', value: dashboardData.totalSales.toLocaleString('id-ID'), icon: <FiDollarSign className='dash-icon' />
                }, {
                  label: 'Total User', value: dashboardData.totalUsers, icon: <FiUser className='dash-icon' />
                }].map((item, i) => (
                  <div className="col-md-4" key={i}>
                    <div className="dash-box p-4 rounded-4 text-center shadow-sm">
                      <h3 className="fw-bold">{item.value}</h3>
                      <span className='text-muted'>{item.label} {item.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4">
                <div className="col-md-8">
                  <div className="dash-chart p-4 rounded-4 shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-teal">Grafik Penjualan</h5>
                      <select
                        className="form-select w-auto rounded-4 chart-btn"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                      >
                        <option value="day">Daily</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                      </select>
                    </div>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 pt-4 rounded-4 shadow-sm h-100 bestseller-box">
                    <h5 className="mb-3 text-center text-teal">Produk Terlaris</h5>
                    <div className="bestseller-product p-3 py-2 rounded">
                      <ul className="p-0 m-0">
                        {dashboardData.bestSellers
                          .sort((a, b) => b.totalSold - a.totalSold)
                          .slice(0, 3)
                          .map((product, index) => (
                            <li key={index} className="d-flex align-items-center py-3" style={{
                              borderTop: index !== 0 ? '1px solid #3B7883' : 'none',
                              listStyle: 'none',
                              gap: '12px',
                            }}>
                              <div style={{
                                fontWeight: 'bold',
                                fontSize: '1.25rem',
                                color: '#4e9488',
                                width: '20px',
                                textAlign: 'center',
                                flexShrink: 0
                              }}>{index + 1}.</div>

                              <img
                                src={productPhotos[product.productId] || ''}
                                alt={product.productName}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  flexShrink: 0
                                }}
                              />

                              <div style={{ lineHeight: '1.2' }}>{product.productName}</div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p>Yakin ingin logout?</p>
                <div className="modal-actions">
                  <button className="btn btn-teal rounded-pill" onClick={handleLogout}>Ya, Logout</button>
                  <button className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Batal</button>
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