import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/header';
import Footer from '../components/footer';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [kota, setKota] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kodePos, setKodePos] = useState('');

  useEffect(() => {
    const savedKota = localStorage.getItem('checkout_kota');
    const savedAlamat = localStorage.getItem('checkout_alamat');
    const savedKodePos = localStorage.getItem('checkout_kodePos');
    if (savedKota) setKota(savedKota);
    if (savedAlamat) setAlamat(savedAlamat);
    if (savedKodePos) setKodePos(savedKodePos);
  }, []);

  const handleKotaChange = (e) => {
    setKota(e.target.value);
    localStorage.setItem('checkout_kota', e.target.value);
  };

  const handleAlamatChange = (e) => {
    setAlamat(e.target.value);
    localStorage.setItem('checkout_alamat', e.target.value);
  };

  const handleKodePosChange = (e) => {
    setKodePos(e.target.value);
    localStorage.setItem('checkout_kodePos', e.target.value);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const ongkir = 10000;
  const total = subtotal + ongkir;

  const formatPrice = (price) => {
    return 'Rp ' + price.toLocaleString('id-ID');
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-content-container">
          <h2 className="checkout-title">Check Out</h2>
          <p className="checkout-subtitle">
            *hanya melayani daerah DKI Jakarta dan sameday (pesanan diproses jika pesan sebelum jam 16:00)
          </p>

          <div className="address-section">
            <h5>Alamat</h5>
            <div className="address-box">
              <input
                type="text"
                placeholder="Kota"
                value={kota}
                onChange={handleKotaChange}
                className="address-input"
                disabled={false}
                readOnly={false}
              />
              <input
                type="text"
                placeholder="Nomor rumah dan nama jalan"
                value={alamat}
                onChange={handleAlamatChange}
                className="address-input"
                disabled={false}
                readOnly={false}
              />
              <input
                type="text"
                placeholder="Kode Pos"
                value={kodePos}
                onChange={handleKodePosChange}
                className="address-input"
                disabled={false}
                readOnly={false}
              />
            </div>
          </div>

          <div className="order-section">
            <div className="order-items">
              <h5>Pesanan</h5>
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="order-item-details">
                    <h6 className="order-item-name">{item.name}</h6>
                    <p className="order-item-price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="order-item-quantity">{item.quantity} x</div>
                  <div className="order-item-total">{formatPrice(item.quantity * item.price)}</div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <p>
                Total Item <span style={{ float: 'right' }}>{totalItems} buah</span>
              </p>
              <p className="subtotal">
                SubTotal <span style={{ float: 'right' }}>{formatPrice(subtotal)}</span>
              </p>
              <p className="ongkir">
                Ongkir <span style={{ float: 'right' }}>{formatPrice(ongkir)}</span>
              </p>
              <hr />
              <p className="total">
                TOTAL <span style={{ float: 'right' }}>{formatPrice(total)}</span>
              </p>
              <button
                className="payment-button"
                onClick={async () => {
                  try {
                    const response = await fetch('http://localhost:5000/api/orders', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        kota,
                        alamat,
                        kodePos,
                        cartItems,
                      }),
                    });
                    if (response.ok) {
                      alert('Pesanan berhasil dikirim!');
                    } else {
                      alert('Gagal mengirim pesanan.');
                    }
                  } catch (error) {
                    console.error('Error submitting order:', error);
                    alert('Terjadi kesalahan saat mengirim pesanan.');
                  }
                }}
              >
                Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
