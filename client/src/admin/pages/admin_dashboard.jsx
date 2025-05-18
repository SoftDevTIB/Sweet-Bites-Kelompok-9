import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../components/dashboard.css';

import AdminLayout from '../components/admin_layout';

const AdminPage = () => {
  return (
    <AdminLayout>
      <section>
        <div className="dashboard-box">
          <i className="bi bi-person-fill avatar"></i>
          <h2>Welcome back, Admin!</h2>
          <p>Let's manage some delicious orders today 🍰</p>
          <a href="#" className="logout-btn">
            Logout <i className="bi bi-box-arrow-right"></i>
          </a>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminPage;