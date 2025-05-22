import React, { useState } from 'react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok');
      return;
    }

    const userData = { name, email, phone, password };

    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Registrasi gagal');
        return res.json();
      })
      .then((data) => {
        console.log('User registered:', data);
        alert('Registrasi berhasil!');
        window.location.href = '/login'; // redirect ke login
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
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-teal rounded-pill px-5">
              Buat Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
