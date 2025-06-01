import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Toast from '../components/Toast';
import './Profil_PesananPage.css';
import { BsArrowRight } from "react-icons/bs";

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
      <span className='status-badge' style={{ backgroundColor: color }} />
      <span className="text-capitalize fw-medium">{status}</span>
    </div>
  );
};

const StatusButtonGroup = ({ activeStatus, onStatusChange }) => {
  const statusOptions = ['Menunggu', 'Diproses', 'Dikirim', 'Selesai'];

  return (
    <div className="btn-group order-btn-group justify-content-center mb-4">
      {statusOptions.map((status) => (
        <button
          key={status}
          className={`btn d-flex align-items-center ${activeStatus === status ? 'order-btn-active' : ''}`}
          onClick={() => onStatusChange(status)}
        >
          <StatusBadge status={status} />
        </button>
      ))}
    </div>
  );
};

const PesananPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState('Menunggu');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setShowToast(true);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = res.data;

        // Extract unique product IDs from all orders
        const productIds = ordersData.flatMap(order => order.items.map(i => i.productId));
        const uniqueProductIds = [...new Set(productIds)];

        // Fetch product details for all unique products
        const productDetailsArr = await Promise.all(
          uniqueProductIds.map(id =>
            axios.get(`/api/products/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.data)
          )
        );

        // Map productId => product details
        const productMap = {};
        productDetailsArr.forEach(prod => {
          productMap[prod._id] = prod;
        });

        // Add product details into orders
        const enrichedOrders = ordersData.map(order => ({
          ...order,
          products: order.items.map(item => ({
            qty: item.quantity,
            name: productMap[item.productId]?.productName || 'Unknown Product',
            price: productMap[item.productId]?.price || 0,
          })),
        }));

        setOrders(enrichedOrders);
        setLoading(false);
      } catch (err) {
        console.error('Gagal mengambil data order:', err);
        setShowToast(true);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleToastClose = () => {
    setShowToast(false);
    navigate('/');
  };

  // Filter orders by activeStatus ignoring case
  const filteredOrders = orders.filter(
    order => order.status.toLowerCase() === activeStatus.toLowerCase()
  );

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Header />
      <main className="py-5 text-center">
        <div className="pp-container">
          <h3 className="mb-4 font-est">Pesanan</h3>

          <StatusButtonGroup
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
          />

          <div>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div key={index} className='d-flex justify-content-center mb-4'>
                  <div className="order-card p-4 mx-3 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className='d-flex justify-content-between'>
                      <div className="text-start mb-2">
                        <div className='fw-bold text-lg text-oren'>ORD {order.orderId.slice(-5).toUpperCase()}</div>
                        <div className="text-muted text-md">
                          {new Date(order.orderDate).toLocaleDateString('id-ID', {
                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="text-end mb-2">
                        <div className="text-muted text-md">Total Harga</div>
                        <div className='fw-bold text-lg text-teal'>Rp {order.totalAmount.toLocaleString('id-ID')}</div>
                      </div>
                    </div>

                    <div className='history-items d-flex flex-column gap-2'>
                      {order.products.map((item, i) => (
                        <div key={i} className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                          <div className='text-start'>
                            <span className='me-2 fw-bold'>{item.qty}x</span>
                            <span className='me-2 fw-semibold'>{item.name}</span>
                          </div>
                          <span className='me-2 fw-bold text-end'>Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={`/pesanan/detail/${order.orderId}`} className="d-flex justify-content-end align-items-center mt-3 px-2 see-detail-btn">
                      <span className='me-2'>lihat detail pesanan</span>
                      <BsArrowRight />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Belum ada pesanan</p>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <Toast
        message="Anda perlu login terlebih dahulu."
        show={showToast}
        onClose={handleToastClose}
      />
    </>
  );
};

export default PesananPage;