import React, { useState, useEffect } from 'react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email tidak valid';
    }

    if (phone && !/^\d{10,}$/.test(phone)) {
      newErrors.phone = 'Nomor telepon minimal 10 digit dan hanya angka';
    }

    if (
      password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
    ) {
      newErrors.password =
        'Password min. 8 karakter, ada huruf besar, kecil, angka, simbol';
    }

    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    setErrors(newErrors);
  }, [email, phone, password, confirmPassword]);

  const isFormValid = Object.keys(errors).length === 0 &&
    name && email && phone && password && confirmPassword;

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const userData = { name, email, phone, password };

    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Registrasi gagal');
        return res.json();
      })
      .then(() => {
        alert('Registrasi berhasil!');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error(err);
        alert('Terjadi kesalahan saat registrasi');
      });
  };

  return (
    <div className="registration-page bg-light-pink min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="registration-card w-50 bg-light-pink p-4">
        <h2 className="text-center mb-4 login-title">Registrasi</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nama</label>
            <input
              type="text"
              className="form-control custom-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control custom-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Nomor Telepon</label>
            <input
              type="tel"
              className="form-control custom-input"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <div className="error-text">{errors.phone}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control custom-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password:</label>
            <input
              type="password"
              className="form-control custom-input"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-teal rounded-pill px-5" >
              Buat Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
