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
.then(async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  console.log(data);
  console.log('Role:', data.role);
  return data;
})
.then((data) => {
  if (data.role === 'admin') {
    window.location.href = '/admin'; // redirect admin
  } else if (data.role === 'user') {
    window.location.href = '/';  // redirect user
  } else {
    // kalau role bukan admin atau user
    alert('Login failed: role tidak valid');
    // gak redirect kemana-mana
  }
})
.catch((err) => {
  alert(err.message || 'Login failed');
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
