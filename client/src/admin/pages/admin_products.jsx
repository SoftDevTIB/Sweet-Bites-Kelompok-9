import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../components/dashboard.css';

import AdminLayout from '../components/admin_layout';

const AdminProductPage = () => {
  return (
    <AdminLayout>
      <section>
        <div className="dashboard-box">
          <h2>Products</h2>
          <p>yumm 🍰</p>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminProductPage;