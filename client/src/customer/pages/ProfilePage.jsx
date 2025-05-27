import Header from '../components/header';
import Footer from '../components/footer';
import './Profil_PesananPage.css';
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { BsReceipt } from "react-icons/bs";
import { Link } from 'react-router-dom';

const ProfilePage = () => {
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
                <Link to="/history" className="btn mini-nav-btn d-flex align-items-center">
                    <BsReceipt className='me-2' />
                    History
                </Link>
                <Link to="/profile" className="btn mini-nav-btn-active d-flex align-items-center">
                    <FiUser className='me-2' />
                    Profile
                </Link>
            </div>
        </div>
        </main>
        <Footer />
    </>
  );
};

export default ProfilePage;