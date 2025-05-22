import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // kalau kamu pakai react-router

import AdminLayout from '../components/admin_layout';
import { BsBoxArrowRight, BsPersonFill } from 'react-icons/bs';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dan role di localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect ke halaman login
    navigate('/login');
  };

  return (
    <AdminLayout>
      <section className="admin-section">
        <div className="dashboard-box">
          <BsPersonFill className="person-icon" />
          <h2>Welcome back, Admin!</h2>
          <p>Let's manage some delicious orders today 🍰</p>
          {/* Tombol logout, saat klik munculin modal */}
          <button
            onClick={() => setShowModal(true)}
            className="logout-btn"
          >
            Logout <BsBoxArrowRight className="icon" />
          </button>
        </div>

        {/* Modal konfirmasi logout */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Yakin ingin logout?</p>
              <div className="modal-actions">
                <button
                  className="btn btn-teal rounded-pill"
                  onClick={handleLogout}
                >
                  Ya, Logout
                </button>
                <button
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminPage;
