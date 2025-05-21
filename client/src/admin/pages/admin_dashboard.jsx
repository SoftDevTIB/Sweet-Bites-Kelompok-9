import '../components/dashboard.css';

import AdminLayout from '../components/admin_layout';
import { BsBoxArrowRight, BsPersonFill } from 'react-icons/bs';

const AdminPage = () => {
  return (
    <AdminLayout>
      <section className='admin-section'>
        <div className="dashboard-box">
          <BsPersonFill className="person-icon" />
          <h2>Welcome back, Admin!</h2>
          <p>Let's manage some delicious orders today 🍰</p>
          <a href="#" className="logout-btn">
            Logout <BsBoxArrowRight className='icon'/>
          </a>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPage;