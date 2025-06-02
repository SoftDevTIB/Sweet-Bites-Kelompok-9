import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import Header from '../components/header';
import Footer from '../components/footer';
import Toast from '../components/Toast';
import './Profil_PesananPage.css';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowToast(true);
            setCheckingAuth(false);
            return;
        }

        // Fetch user profile from backend
        fetch('/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error('Gagal mengambil data user');
                return res.json();
            })
            .then(data => setUser(data))
            .catch(err => {
                console.error(err);
                setShowToast(true);
            })
            .finally(() => setCheckingAuth(false));
    }, [navigate]);

    const handleToastClose = () => {
        setShowToast(false);
        navigate('/login');
    };

    const handleLogoutClick = () => setShowLogoutModal(true);
    const handleConfirmLogout = () => {
        localStorage.removeItem('token');
        setShowLogoutModal(false);
        navigate('/login');
    };
    const handleCancelLogout = () => setShowLogoutModal(false);

    if (checkingAuth)
        return (
            <>
                <Header />
                <main className="py-5 text-center">
                    <div className="pp-container d-flex justify-content-center align-items-center">
                        <p className='fs-4 text-oren'>Loading...</p>
                    </div>
                </main>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <main className="py-5 text-center">
                <div className="pp-container">
                    <h2 className="mb-4 text-oren text-center">Profil</h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="p-5 pb-4 rounded-4 mx-4 profil-box" style={{ maxWidth: '600px', width: '100%' }}>
                            <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-4 pb-4">
                                <div className="d-flex justify-content-center align-items-center rounded-4 p-4 user-icon">
                                    <FiUser size={80} />
                                </div>

                                <div className="w-100">
                                    <div className="profil-row d-flex justify-content-between mb-3">
                                        <span className="fw-semibold">Nama:</span>
                                        <span className="text-muted">{user?.name || '-'}</span>
                                    </div>
                                    <div className="profil-row d-flex justify-content-between mb-3">
                                        <span className="fw-semibold">Email:</span>
                                        <span className="text-muted">{user?.email || '-'}</span>
                                    </div>
                                    <div className="profil-row d-flex justify-content-between">
                                        <span className="fw-semibold">No. Telepon:</span>
                                        <span className="text-muted">{user?.phone || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap btn-responsive-box">
                                <Link to="/change-password" className="btn btn-teal rounded-pill btn-responsive">Ganti Password</Link>
                                <button onClick={handleLogoutClick} className="btn btn-outline-dark rounded-pill px-5 btn-responsive">Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>

                {showLogoutModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content p-4 rounded shadow bg-white">
                            <h5>Konfirmasi Logout</h5>
                            <p>Apakah kamu yakin ingin logout?</p>
                            <div className="d-flex justify-content-center px-3 mt-3">
                                <button onClick={handleCancelLogout} className="btn me-3 btn-secondary rounded-pill px-4">Batal</button>
                                <button onClick={handleConfirmLogout} className="btn btn-teal rounded-pill">Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />

            <Toast
                message="Anda perlu login terlebih dahulu."
                show={showToast}
                onClose={handleToastClose}
            />
        </>
    );
};

export default ProfilePage;