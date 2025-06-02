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

  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);

  const kotaList = [
    'Jakarta Pusat',
    'Jakarta Utara',
    'Jakarta Selatan',
    'Jakarta Timur',
    'Jakarta Barat',
    'Kepulauan Seribu',
  ];

   useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        console.log('User dataaaaaaaaaa:', data);
        // juga simpan ke localStorage supaya bisa dipakai ulang
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('userPhone', data.phone);
      })
      .catch(err => {
        console.error('Failed to fetch user data:', err);
      });
    }
  }, [token]);

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
  if (!user) {
    setMessage('Data user belum dimuat, silakan coba lagi.');
    return;
  }

  if (!kota || !alamat || !kodePos) {
    setMessage('Mohon lengkapi semua data alamat.');
    return;
  }

  if (!/^\d{5}$/.test(kodePos)) {
    setMessage('Kode pos harus 5 digit angka.');
    return;
  }

  const addressData = { province: provinsi, kota, alamat, kodePos };
  const cartItemsWithProductId = cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  try {
    // Update alamat dulu
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

    // Buat transaksi order di backend dan minta token Midtrans
    const orderRes = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
        customer: {
          name: user.name,
          email: user.email || '',
          phone: user.phone || '',
        },
        addressData,
        cartItems: cartItemsWithProductId,
        deliveryFee: ongkir,
        totalAmount: total,
        deliveryDate: '', // kalau ada, isi tanggal pengiriman
      }),
    });

    if (!orderRes.ok) {
      setMessage('Gagal membuat transaksi.');
      return;
    }

    const responseData = await orderRes.json();
    const transactionToken = responseData.token;

    if (!transactionToken) {
      setMessage('Token transaksi tidak ditemukan.');
      return;
    }


    window.snap.pay(transactionToken, {
      onSuccess: function(result) {
        setMessage('Pembayaran berhasil!');
        clearCart();
        console.log(result);
      },
      onPending: function(result) {
        setMessage('Pembayaran pending, silakan selesaikan.');
        console.log(result);
      },
      onError: function(result) {
        setMessage('Terjadi kesalahan saat pembayaran.');
        console.log(result);
      },
      onClose: function() {
        setMessage('Pembayaran dibatalkan.');
      }
    });

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
