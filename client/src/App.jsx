import { Routes, Route } from 'react-router-dom';
import AdminPage from './admin/pages/admin_dashboard';
import AdminMenuPage from './admin/pages/admin_menu';
import AdminOrdersPage from './admin/pages/admin_orders';
import AddProductPage from './admin/pages/admin_addproduct';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/menu" element={<AdminMenuPage />} />
      <Route path="/addproduct" element={<AddProductPage />} />
      <Route path="/orders" element={<AdminOrdersPage />} />
    </Routes>
  );
}

export default App;
