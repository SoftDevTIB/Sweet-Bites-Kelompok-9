import Header from '../components/header';
import Footer from '../components/footer';
import './Profil_PesananPage.css';
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { BsReceipt } from "react-icons/bs";
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  return (
    <>
        <Header />
        <main className="py-5 text-center">
        <div className="pp-container">
            {/* Tabs */}
            <div className="d-flex justify-content-center gap-2 mb-4">
                <Link to="/pesanan" className="btn mini-nav-btn d-flex align-items-center">
                    <FiShoppingBag className='me-2' />
                    Pesanan
                </Link>
                <Link to="/history" className="btn mini-nav-btn-active d-flex align-items-center">
                    <BsReceipt className='me-2' />
                    History
                </Link>
                <Link to="/profile" className="btn mini-nav-btn d-flex align-items-center">
                    <FiUser className='me-2' />
                    Profile
                </Link>
            </div>

            {/* Title */}
            <h3 className="mb-4 title-font">Pesanan Lama</h3>

            {/* Order Card */}
            <div className="order-card p-4 rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
                <div className='d-flex justify-content-between'>
                    <div className="text-start mb-2">
                        <div className='fw-bold text-lg text-oren'>ORD 00027</div>
                        <div className="text-muted small">Rabu, 9 April 2025</div>
                    </div>
                    <div className="text-end mb-2">
                        <div className="text-muted small">Total Harga</div>
                        <div className='fw-bold text-lg text-teal'>Rp 30.000</div>
                    </div>
                </div>

                {/* Items */}
                <div className='history-items d-flex flex-column gap-2'>
                    <div className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                        <div>
                            <span className='me-2 fw-bold'>1x</span>
                            <span className='me-2 fw-semibold'>Choco Oreo</span>
                        </div>
                        <span className='me-2 fw-bold'>Rp 10.000</span>
                    </div>
                    <div className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                        <div>
                            <span className='me-2 fw-bold'>1x</span>
                            <span className='me-2 fw-semibold'>Hokkaido Cupcake</span>
                        </div>
                        <span className='me-2 fw-bold'>Rp 10.000</span>
                    </div>
                </div>


                {/* Shipping */}
                <div className="d-flex justify-content-between mt-3 px-2 ship-section">
                    <span className='fw-semibold'>Ongkir</span>
                    <span className='fw-semibold'>Rp 10.000</span>
                </div>
            </div>

            <div className="order-card p-4 rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
                <div className='d-flex justify-content-between'>
                    <div className="text-start mb-2">
                        <div className='fw-bold text-lg text-oren'>ORD 00027</div>
                        <div className="text-muted small">Rabu, 9 April 2025</div>
                    </div>
                    <div className="text-end mb-2">
                        <div className="text-muted small">Total Harga</div>
                        <div className='fw-bold text-lg text-teal'>Rp 30.000</div>
                    </div>
                </div>

                {/* Items */}
                <div className='history-items d-flex flex-column gap-2'>
                    <div className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                        <div>
                            <span className='me-2 fw-bold'>1x</span>
                            <span className='me-2 fw-semibold'>Choco Oreo</span>
                        </div>
                        <span className='me-2 fw-bold'>Rp 10.000</span>
                    </div>
                    <div className="rounded-pill px-3 py-1 d-flex justify-content-between item">
                        <div>
                            <span className='me-2 fw-bold'>1x</span>
                            <span className='me-2 fw-semibold'>Hokkaido Cupcake</span>
                        </div>
                        <span className='me-2 fw-bold'>Rp 10.000</span>
                    </div>
                </div>


                {/* Shipping */}
                <div className="d-flex justify-content-between mt-3 px-2 ship-section">
                    <span className='fw-semibold'>Ongkir</span>
                    <span className='fw-semibold'>Rp 10.000</span>
                </div>
            </div>
        </div>
        </main>
        <Footer />
    </>
  );
};

export default HistoryPage;