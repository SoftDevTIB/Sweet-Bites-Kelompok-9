import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './RegistrationPage.css';
import SimpleHeader from '../components/header_nonav';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
        setShowToast(true);
      })
      .catch((err) => {
        console.error(err);
        alert('Terjadi kesalahan saat registrasi');
      });
  };

  const handleToastClose = () => {
    setShowToast(false);
    navigate('/login');
  };

  return (
    <>
      <SimpleHeader />
      <div className="registration-page bg-light-pink mt-4 d-flex flex-column align-items-center justify-content-center">
        <div className="registration-card bg-light-pink p-4">
          <h2 className="text-center mb-2 login-title">Registrasi</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label mb-0 text-md">Nama</label>
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
              <label htmlFor="email" className="form-label mb-0 text-md">Email:</label>
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
              <label htmlFor="phone" className="form-label mb-0 text-md">Nomor Telepon</label>
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
              <label htmlFor="password" className="form-label mb-0 text-md">Password:</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control custom-input"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-login"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', top: '40px', right: '15px', cursor: 'pointer', transform: 'translateY(-135%)', }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>


          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label mb-0 text-md">Konfirmasi Password:</label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control custom-input"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-login"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', top: '40px', right: '15px', cursor: 'pointer', transform: 'translateY(-135%)', }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>



              {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
            </div>


            <div className="d-flex justify-content-center gap-3 flex-wrap btn-responsive-box">
              <button type="submit" className="btn btn-teal rounded-pill px-5 btn-responsive" >
                Buat Akun
              </button>
              <Link to="/login" className="btn btn-outline-dark rounded-pill px-5 btn-responsive">Batal</Link>
            </div>
          </form>
        </div>
        <Toast
            message="Akun anda berhasil dibuat."
            show={showToast}
            onClose={handleToastClose}
        />
      </div>
    </>
  );
};

export default RegistrationPage;