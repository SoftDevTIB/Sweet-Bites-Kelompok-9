import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return 'Semua field harus diisi';
    }
    if (newPassword.length < 8) {
      return 'Password baru minimal 8 karakter';
    }
    if (newPassword !== confirmPassword) {
      return 'Password baru dan konfirmasi tidak cocok';
    }
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Gagal mengganti password');
      }

      setSuccess('Password berhasil diubah');
      // Optional: redirect after delay
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="change-password-page bg-light-pink min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="change-password-card bg-light-pink p-4">
        <h2 className="text-center mb-4">Ganti Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-3 position-relative">
            <label htmlFor="oldPassword" className="form-label">Password Lama:</label>
            <input
              type={showOld ? 'text' : 'password'}
              id="oldPassword"
              className="form-control custom-input"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setShowOld(!showOld)}>
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="newPassword" className="form-label">Password Baru:</label>
            <input
              type={showNew ? 'text' : 'password'}
              id="newPassword"
              className="form-control custom-input"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password Baru:</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              id="confirmPassword"
              className="form-control custom-input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-teal rounded-pill px-4">Submit</button>
            <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
