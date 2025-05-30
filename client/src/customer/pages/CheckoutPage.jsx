import React, { useState, useEffect } from 'react';
import { useCart} from '../context/CartContext';
import Header from '../components/header';
import Footer from '../components/footer';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const { clearCart } = useCart();

  const [provinsi] = useState('DKI Jakarta');
  const [kota, setKota] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kodePos, setKodePos] = useState('');
  const [message, setMessage] = useState(''); // untuk pesan status

  const kotaList = [
    'Jakarta Pusat',
    'Jakarta Utara',
    'Jakarta Selatan',
    'Jakarta Timur',
    'Jakarta Barat',
    'Kepulauan Seribu',
  ];

  useEffect(() => {
    const savedKota = localStorage.getItem('checkout_kota') || '';
    const savedAlamat = localStorage.getItem('checkout_alamat') || '';
    const savedKodePos = localStorage.getItem('checkout_kodePos') || '';

    setKota(savedKota);
    setAlamat(savedAlamat);
    setKodePos(savedKodePos);
  }, []);

  const handleKotaChange = (e) => {
    const val = e.target.value;
    setKota(val);
    localStorage.setItem('checkout_kota', val);
  };

  const handleAlamatChange = (e) => {
    const val = e.target.value;
    setAlamat(val);
    localStorage.setItem('checkout_alamat', val);
  };

  const handleKodePosChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setKodePos(val);
      localStorage.setItem('checkout_kodePos', val);
    }
  };

  const formatPrice = (price) => 'Rp ' + price.toLocaleString('id-ID');
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const ongkir = 10000;
  const total = subtotal + ongkir;

  const handleSubmit = async () => {
  const token = localStorage.getItem('token');

  if (!kota || !alamat || !kodePos) {
    setMessage('Mohon lengkapi semua data alamat.');
    return;
  }

  const addressData = { province: provinsi, kota, alamat, kodePos };

  // Map cartItems supaya ada productId
  const cartItemsWithProductId = cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  try {
    const updateAddressRes = await fetch('http://localhost:5000/api/users/update-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });

    if (!updateAddressRes.ok) {
      setMessage('Gagal memperbarui alamat.');
      return;
    }

    const orderRes = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...addressData, cartItems: cartItemsWithProductId, deliveryFee: 10000 }),
    });

    if (orderRes.ok) {
      setMessage('Pesanan berhasil dikirim!');
      clearCart(); 
    } else {
      setMessage('Gagal mengirim pesanan.');
    }
  } catch (error) {
    console.error('Order error:', error);
    setMessage('Terjadi kesalahan saat memproses.');
  }
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
              Pilih Kabupaten/Kota
              <select value={kota} onChange={handleKotaChange} className="address-input">
                
                <option value=""></option>
                {kotaList.map((k, idx) => (
                  <option key={idx} value={k}>{k}</option>
                ))}
              </select>
                Alamat Lengkap
              <input
                type="text"
                placeholder="Alamat Lengkap"
                value={alamat}
                onChange={handleAlamatChange}
                className="address-input"
              />
              Kode Pos
              <input
                type="text"
                placeholder="Kode Pos"
                value={kodePos}
                onChange={handleKodePosChange}
                className="address-input"
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
              <p>Total Item <span style={{ float: 'right' }}>{totalItems} buah</span></p>
              <p className="subtotal">SubTotal <span style={{ float: 'right' }}>{formatPrice(subtotal)}</span></p>
              <p className="ongkir">Ongkir <span style={{ float: 'right' }}>{formatPrice(ongkir)}</span></p>
              <hr />
              <p className="total">TOTAL <span style={{ float: 'right' }}>{formatPrice(total)}</span></p>

              <button className="payment-button" onClick={handleSubmit}>
                Pembayaran
              </button>

              {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
