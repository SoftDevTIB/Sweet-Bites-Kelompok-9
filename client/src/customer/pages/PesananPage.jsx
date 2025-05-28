import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './Profil_PesananPage.css';
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';

// Status Colors
const statusColors = {
  Menunggu: '#FF55E5',
  Diproses: '#FF8C00',
  Dikirim: '#FFD400',
  Selesai: '#00FF3C',
};

// StatusBadge Component
const StatusBadge = ({ status }) => {
    const color = statusColors[status] || '#ccc';
    return (
        <div className="d-flex align-items-center gap-2">
        <span className='status-badge' style={{ backgroundColor: color }} />
        <span className="text-capitalize fw-medium">{status}</span>
        </div>
    );
};

// Status Button Group Component
const StatusButtonGroup = ({ activeStatus, onStatusChange }) => {
    const statusOptions = ['Menunggu', 'Diproses', 'Dikirim', 'Selesai'];

    return (
        <div className="btn-group order-btn-group justify-content-center mb-4">
        {statusOptions.map((status) => (
            <button
            key={status}
            className={`btn d-flex align-items-center ${activeStatus === status ? 'order-btn-active' : ''}`}
            onClick={() => onStatusChange(status)}
            >
            <StatusBadge status={status} />
            </button>
        ))}
        </div>
    );
};

const PesananPage = () => {
    const [activeStatus, setActiveStatus] = useState('Menunggu'); // default status

    const orders = [1, 2, 3]; // dummy data

    return (
        <>
        <Header />
        <main className="py-5 text-center">
            <div className="pp-container">

            {/* Title */}
            <h3 className="mb-4 font-est">Pesanan</h3>

            {/* Status Button Group */}
            <StatusButtonGroup
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
            />

            {/* Order Cards */}
            <div>
                {orders.map((order, index) => (
                <div key={index} className='d-flex justify-content-center mb-4'>
                    <div className="order-card p-4 mx-3 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className='d-flex justify-content-between'>
                        <div className="text-start mb-2">
                        <div className='fw-bold text-lg text-oren'>ORD 00027</div>
                        <div className="text-muted text-md">Rabu, 9 April 2025</div>
                        </div>
                        <div className="text-end mb-2">
                        <div className="text-muted text-md">Total Harga</div>
                        <div className='fw-bold text-lg text-teal'>Rp 30.000</div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className='history-items d-flex flex-column gap-2'>
                        <div className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                        <div className='text-start'>
                            <span className='me-2 fw-bold'>1x</span>
                            <span className='me-2 fw-semibold'>Choco Oreo</span>
                        </div>
                        <span className='me-2 fw-bold text-end'>Rp 10.000</span>
                        </div>
                        <div className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                        <div className='text-start'>
                            <span className='me-2 fw-bold'>1x</span>
                            <span className='me-2 fw-semibold'>Hokkaido Cupcake</span>
                        </div>
                        <span className='me-2 fw-bold text-end'>Rp 10.000</span>
                        </div>
                    </div>

                    <Link to="/pesanan/detail" className="d-flex justify-content-end align-items-center mt-3 px-2 see-detail-btn">
                        <span className='me-2'>lihat detail pesanan</span>
                        <BsArrowRight />
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </main>
        <Footer />
        </>
    );
};

export default PesananPage;