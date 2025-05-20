import React from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPage.css'; 

    const RegistrationPage = () => {
  return (
    <div className="registration-page bg-light-pink min-vh-100 d-flex flex-column align-items-center justify-content-center">

      <div className="registration-card w-50 bg-light-pink p-4">
        <h2 className="text-center mb-4 login-title">Registrasi</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nama</label>
            <input type="text" className="form-control custom-input" id="name" placeholder="Masukkan nama Anda" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control custom-input" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Nomor Telepon</label>
            <input type="tel" className="form-control custom-input " id="phone" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control custom-input" id="password" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Konfirmasi Password:</label>
            <input type="password" className="form-control custom-input" id="password" />
          </div>
          <button type="submit" className="btn btn-teal w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;