import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import axios from 'axios';
import Toast from '../../customer/components/Toast';
import AdminLayout from '../components/AdminLayout';

const backendUrl = import.meta.env.VITE_API_URL;

const AdminUserDetailPage = () => {
    const { userId } = useParams(); 
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${backendUrl}/api/admin/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
                console.log(res.data);
            } catch (err) {
                console.error('Gagal mengambil detail user', err);
                setShowToast(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [userId]);

    const handleToastClose = () => {
        setShowToast(false);
        navigate('/admin/users');
    };

    return (
        <AdminLayout>
            <section className="admin-section">
                <div className="admin-container" style={{ maxWidth: '900px' }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">Pelanggan</li>
                        <li
                            className="breadcrumb-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/admin/users')}
                        >
                            Daftar Pelanggan
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Detail Pelanggan</li>
                        </ol>
                    </nav>

                    <h4 className="fw-bold mb-4">Detail Pelanggan</h4>

                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <p className="fs-4 text-oren">Loading...</p>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="p-5 pb-4 mt-4 rounded-4 user-detail-box" style={{ maxWidth: '600px', width: '100%' }}>
                                <div className="d-flex flex-column flex-md-row align-items-start gap-5">
                                    <div className="d-flex justify-content-center align-items-center rounded-4 p-4 user-icon">
                                        <FiUser size={80} />
                                    </div>

                                    <div className="w-100">
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-semibold">Nama:</span>
                                            <span className="text-muted">{user?.name || '-'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-semibold">Email:</span>
                                            <span className="text-muted">{user?.email || '-'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-semibold">No. Telepon:</span>
                                            <span className="text-muted">{user?.phone || '-'}</span>
                                        </div>
                                        <div className="mb-3">
                                            {user?.address?.alamat || user?.address?.kota || user?.address?.kodePos ? (
                                                <>
                                                    <span className="fw-semibold d-block">Alamat:</span>
                                                    <span className="text-muted d-block">{user?.address?.alamat || ''}</span>
                                                    <span className="text-muted d-block">
                                                        {user?.address?.kota || ''} {user?.address?.kodePos || ''}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="fw-semibold">Alamat:</span>
                                                    <span className="ps-3 text-muted">-</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Toast
                message="Gagal memuat data pengguna."
                show={showToast}
                onClose={handleToastClose}
            />
        </AdminLayout>
    );
};

export default AdminUserDetailPage;