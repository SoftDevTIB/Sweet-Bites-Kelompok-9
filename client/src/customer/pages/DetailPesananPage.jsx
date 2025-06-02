import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import Toast from '../components/Toast';
import { BsArrowLeft } from "react-icons/bs";

const DetailPesananPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState({ show: false, message: '' });

  const formatRupiah = (num) =>
    'Rp ' + num.toLocaleString('id-ID', { minimumFractionDigits: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowToast({ show: true, message: 'Anda perlu login terlebih dahulu.' });
      return;
    }

    const fetchOrderDetail = async () => {
      try {
        setLoading(true);

        // Ambil userId dari endpoint /api/users/id
        const meRes = await axios.get('/api/users/id', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userId = meRes.data._id;

        // Ambil detail order
        const res = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orderData = res.data;

        // Cek apakah order milik user login
        if (orderData.userId._id !== userId) {
          setShowToast({ show: true, message: 'Ini bukan pesanan Anda.' });
          return;
        }

        // Ambil detail produk
        const productIds = orderData.items.map(item =>
          typeof item.productId === 'object' ? item.productId._id : item.productId
        );
        const uniqueProductIds = [...new Set(productIds)];

        const productDetailsArr = await Promise.all(
          uniqueProductIds.map(id =>
            axios.get(`/api/products/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => res.data)
          )
        );

        const productMap = {};
        productDetailsArr.forEach(prod => {
          productMap[prod._id] = prod;
        });

        const enrichedItems = orderData.items.map(item => {
          const prodId = typeof item.productId === 'object' ? item.productId._id : item.productId;
          const product = productMap[prodId] || {};
          return {
            ...item,
            productName: product.productName || 'Produk tidak ditemukan',
            price: product.price || 0,
            photo: product.photo || '',
          };
        });

        setOrder({
          ...orderData,
          items: enrichedItems,
        });

      } catch (err) {
        console.error(err);
        setError('Gagal memuat data pesanan.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

  const handleToastClose = () => {
    setShowToast({ show: false, message: '' });
    navigate('/pesanan');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-5 text-center">
          <div className="pp-container d-flex justify-content-center align-items-center">
            <p className='fs-4 text-oren'>Loading...</p>
          </div>
        </main>
        <Footer />
        <Toast
          message={showToast.message}
          show={showToast.show}
          onClose={handleToastClose}
        />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="py-5 text-center">
          <div className="pp-container d-flex justify-content-center align-items-center">
            <p className='fs-4 text-danger'>{error}</p>
          </div>
        </main>
        <Footer />
        <Toast
          message={showToast.message}
          show={showToast.show}
          onClose={handleToastClose}
        />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="py-5 text-center">
          <div className="pp-container d-flex justify-content-center align-items-center">
            <p className='fs-4 text-muted'>Data pesanan tidak ditemukan.</p>
          </div>
        </main>
        <Footer />
        <Toast
          message={showToast.message}
          show={showToast.show}
          onClose={handleToastClose}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-5 text-center">
        <div className="pp-container">
          <div className="d-flex justify-content-center align-items-center position-relative title-box" style={{ maxWidth: "700px", height: "50px" }}>
            <h2 className="mb-4 text-oren text-center">Pesanan</h2>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-1">
            <div className="w-100 p-4 rounded-5 order-box" style={{ maxWidth: "700px", backgroundColor: "#fef0d4", border: "1px solid #f5a150" }}>
              <div className="d-flex justify-content-between align-items-center mb-1 detail-border pb-2">
                <span className='fw-bold text-lg' style={{ color: "#d47500" }}>{order.orderId}</span>
                <span className='fw-normal text-md'>
                  {new Date(order.orderDate).toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>

              <div className="d-md-flex gap-5 align-items-stretch mt-3">
                {/* Order Items */}
                <div className="flex-grow-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className={`d-flex align-items-start py-3 order-detail-item ${idx === order.items.length - 1 ? 'border-0' : ''}`}>
                      <img src={item.photo ? `/uploads/${item.photo}` : ''} alt={item.productName} className="rounded me-3" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                      <div className="flex-grow-1 text-start">
                        <div className="fw-medium text-lg text-teal font-est">{item.productName}</div>
                        <div className='text-md'>{formatRupiah(item.price)}</div>
                      </div>
                      <div className="text-end pt-3 text-md">
                        <div>{item.quantity} x</div>
                        <div className="fw-semibold">{formatRupiah(item.price * item.quantity)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="d-flex flex-column flex-grow-1 justify-content-end" style={{ minWidth: '250px' }}>
                  <div className="p-3 price-box text-md">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <span>Sub Total</span>
                        <span className="fw-semibold">{formatRupiah(order.totalAmount)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Ongkir</span>
                        <span className="fw-semibold">{formatRupiah(order.deliveryFee)}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3 p-2 total-box">
                      <span className="fw-semibold">Total</span>
                      <span className="fw-semibold">
                        {formatRupiah(order.totalAmount + order.deliveryFee)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center position-relative title-box mb-4" style={{ maxWidth: "700px", height: "50px" }}>
            <Link to="/pesanan" className="d-flex align-items-center back-button">
              <BsArrowLeft className='me-2' />
              <span className='fw-normal font-est'>Kembali</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      {/* Toast */}
      <Toast
        message={showToast.message}
        show={showToast.show}
        onClose={handleToastClose}
      />
    </>
  );
};

export default DetailPesananPage;