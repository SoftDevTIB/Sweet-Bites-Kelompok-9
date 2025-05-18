import { Routes, Route } from 'react-router-dom';
import AdminPage from './admin/pages/admin_dashboard';
import AdminProductPage from './admin/pages/admin_products';
import AdminOrdersPage from './admin/pages/admin_orders';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/products" element={<AdminProductPage />} />
      <Route path="/orders" element={<AdminOrdersPage />} />
    </Routes>
  );
}

export default App;
