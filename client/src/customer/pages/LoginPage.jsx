import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const { setCartItems } = useCart();

  const validateEmail = (email) => {
    if (!email) return 'Email wajib diisi';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Format email tidak valid';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password wajib diisi';
    if (password.length < 8) {
      return 'Password min. 8 karakter, ada huruf besar, kecil, angka, simbol';
    }
    return '';
  };

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  // Fungsi sinkronisasi cart lokal ke server setelah login
  async function syncCartAfterLogin(token) {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (localCart.length === 0) return;

    const payloadItems = localCart.map(item => ({
      productId: item.id,
      name:      item.name,
      price:     item.price,
      imageUrl:  item.imageUrl,
      quantity:  item.quantity
    }));

    try {
      const res = await fetch('http://localhost:5000/api/cart/overwrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: payloadItems })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal overwrite cart');
      }

      // berhasil, hapus cart lokal
      localStorage.removeItem('cart');

      // fetch ulang cart dari server untuk update context
      const cartRes = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const cartData = await cartRes.json();
      const normalized = (cartData.items || []).map(i => ({
        id:        i.productId.toString(),
        name:      i.name,
        price:     i.price,
        imageUrl:  i.imageUrl,
        quantity:  i.quantity
      }));
      setCartItems(normalized);

    } catch (error) {
      console.error('Sync cart error:', error.message);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      alert('Mohon perbaiki input terlebih dahulu');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login gagal');

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // overwrite cart server dengan cart lokal
      await syncCartAfterLogin(data.token);

      // redirect berdasarkan role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/checkout');
      }

    } catch (err) {
      alert(err.message || 'Login gagal');
    }
  };

  return (
    <div className="login-page bg-light-pink min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="login-card bg-light-pink p-4">
        <h2 className="text-center mb-4 login-title">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control custom-input"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              required
            />
            {touched.email && emailError && <div className="error-text mt-1">{emailError}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control custom-input"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              required
            />
            {touched.password && passwordError && <div className="error-text mt-1">{passwordError}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-teal rounded-pill px-5">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
