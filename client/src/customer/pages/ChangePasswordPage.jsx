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

  // Track if user sudah mulai input untuk setiap field
  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errorGlobal, setErrorGlobal] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Validasi tiap field, hanya cek jika sudah touched dan ada nilai
  const getOldPasswordError = () => {
    if (!touched.oldPassword) return '';
    if (!oldPassword) return 'Password lama harus diisi';
    return '';
  };

  const getNewPasswordError = () => {
    if (!touched.newPassword) return '';
    if (!newPassword) return 'Password baru harus diisi';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(newPassword)) {
      return 'Password harus minimal 8 karakter, mengandung huruf besar, kecil, angka, dan simbol.';
    }
    return '';
  };

  const getConfirmPasswordError = () => {
    if (!touched.confirmPassword) return '';
    if (!confirmPassword) return 'Konfirmasi password harus diisi';
    if (newPassword !== confirmPassword) {
      return 'Konfirmasi password tidak cocok';
    }
    return '';
  };

  // Cek apakah form valid (semua error kosong)
  const isFormValid = () => {
    return !getOldPasswordError() && !getNewPasswordError() && !getConfirmPasswordError();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Set semua touched jadi true supaya validasi jalan saat submit
    setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    // Cek error global dulu (jika ada field kosong)
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorGlobal('Semua field harus diisi');
      return;
    }

    // Cek validasi per field
    if (!isFormValid()) {
      setErrorGlobal('Periksa kembali input yang salah');
      return;
    }

    setErrorGlobal('');

    // Cek token login
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorGlobal('Anda harus login terlebih dahulu.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal mengganti password');
      }

      setShowSuccessModal(true);
    } catch (err) {
      setErrorGlobal(err.message);
    }
  };

  return (
    <div className="change-password-page bg-light-pink min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="change-password-card bg-light-pink p-4">
        <h2 className="text-center mb-4">Change Password</h2>
        {errorGlobal && <div className="alert alert-danger">{errorGlobal}</div>}
        <form onSubmit={handleSubmit} noValidate>
          {/* Password Lama */}
          <div className="mb-3 position-relative">
            <label htmlFor="oldPassword" className="form-label">
              Password Lama:
            </label>
            <input
              type={showOld ? 'text' : 'password'}
              id="oldPassword"
              className={`form-control custom-input ${getOldPasswordError() ? 'invalid-input' : ''}`}
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, oldPassword: true }))}
              autoComplete="current-password"
            />
            <span className="password-toggle" onClick={() => setShowOld(!showOld)}>
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </span>
            {getOldPasswordError() && <div className="error-text mt-1">{getOldPasswordError()}</div>}
          </div>

          {/* Password Baru */}
          <div className="mb-3 position-relative">
            <label htmlFor="newPassword" className="form-label">
              Password Baru:
            </label>
            <input
              type={showNew ? 'text' : 'password'}
              id="newPassword"
              className={`form-control custom-input ${getNewPasswordError() ? 'invalid-input' : ''}`}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, newPassword: true }))}
              autoComplete="new-password"
            />
            <span className="password-toggle" onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
            {getNewPasswordError() && <div className="error-text mt-1">{getNewPasswordError()}</div>}
          </div>

          {/* Konfirmasi Password Baru */}
          <div className="mb-4 position-relative">
            <label htmlFor="confirmPassword" className="form-label">
              Konfirmasi Password Baru:
            </label>
            <input
              type={showConfirm ? 'text' : 'password'}
              id="confirmPassword"
              className={`form-control custom-input ${getConfirmPasswordError() ? 'invalid-input' : ''}`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
              autoComplete="new-password"
            />
            <span className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
            {getConfirmPasswordError() && <div className="error-text mt-1">{getConfirmPasswordError()}</div>}
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-teal rounded-pill px-4">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
              Batal
            </Link>
          </div>
        </form>
      </div>

      {/* Modal sukses ganti password */}
      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="modal-content p-4 rounded shadow bg-white">
            <h5>Password Berhasil Diubah</h5>
            <p>Password kamu telah berhasil diperbarui.</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button onClick={() => { setShowSuccessModal(false); navigate('/'); }} className="btn btn-teal rounded-pill px-4">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordPage;
