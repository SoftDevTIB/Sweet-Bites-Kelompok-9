import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/footer';
import Toast from '../components/Toast'; 
import './ChangePasswordPage.css';

const backendUrl = import.meta.env.VITE_API_URL;

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errorGlobal, setErrorGlobal] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowToast(true);
    }
  }, []);

  const handleToastClose = () => {
    setShowToast(false);
    navigate('/login');
  };

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

  const isFormValid = () => {
    return !getOldPasswordError() && !getNewPasswordError() && !getConfirmPasswordError();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorGlobal('Semua field harus diisi');
      return;
    }

    if (!isFormValid()) {
      setErrorGlobal('Periksa kembali input yang salah');
      return;
    }

    setErrorGlobal('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorGlobal('Anda harus login terlebih dahulu.');
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/auth/change-password`, {
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
    <>
      <Header />
      <main className='pp-container'>
        <div className="change-password-page bg-light-pink d-flex flex-column align-items-center justify-content-center py-5">
          <div className="change-password-card bg-light-pink p-4">
            <h2 className="text-center mb-4">Change Password</h2>
            {errorGlobal && <div className="alert alert-danger">{errorGlobal}</div>}
            <form onSubmit={handleSubmit} noValidate>
              {/* Field Password Lama */}
              <div className="mb-3 position-relative">
                <label htmlFor="oldPassword" className="form-label">Password Lama:</label>
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

              {/* Field Password Baru */}
              <div className="mb-3 position-relative">
                <label htmlFor="newPassword" className="form-label">Password Baru:</label>
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

              {/* Field Konfirmasi Password Baru */}
              <div className="mb-4 position-relative">
                <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password Baru:</label>
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
                <button type="submit" className="btn btn-teal rounded-pill px-4">Konfirmasi</button>
                <Link to="/profile" className="btn btn-outline-dark rounded-pill px-4">Batal</Link>
              </div>
            </form>
          </div>

          {/* Modal sukses */}
          {showSuccessModal && (
            <div className="modal-backdrop">
              <div className="modal-content p-4 rounded shadow bg-white">
                <h5>Password Berhasil Diubah</h5>
                <p>Password kamu telah berhasil diperbarui.</p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button onClick={() => { setShowSuccessModal(false); navigate('/profile'); }} className="btn btn-teal rounded-pill px-4">
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Toast jika belum login */}
      <Toast
        message="Anda perlu login terlebih dahulu."
        show={showToast}
        onClose={handleToastClose}
      />
    </>
  );
};

export default ChangePasswordPage;