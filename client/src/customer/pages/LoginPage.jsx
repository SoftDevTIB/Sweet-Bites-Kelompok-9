import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // lempar data ke backend (bisa ganti URL sesuai endpoint kamu)
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // bisa juga set role & redirect ke halaman admin/user
        if (data.role === 'admin') {
          window.location.href = '/';
        } else {
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.error('Login failed:', err);
        alert('Email atau password salah');
      });
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
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-teal w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
