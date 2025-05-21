import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './customer/pages/Homepage';
import MenuPage from './customer/pages/MenuPage';
import MenuDetailPage from './customer/pages/MenuDetailPage';
import LoginPage from './customer/pages/LoginPage';
import RegistrationPage from './customer/pages/RegistrationPage';

import AdminPage from './admin/pages/admin_dashboard';
import AdminMenuPage from './admin/pages/admin_menu';
import AdminOrdersPage from './admin/pages/admin_orders';
import AddProductPage from './admin/pages/admin_addproduct';
import EditProductPage from './admin/pages/admin_editproduct';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/menu" element={<AdminMenuPage />} />
        <Route path="/admin/addproduct" element={<AddProductPage />} />
        <Route path="/admin/editproduct/:productId" element={<EditProductPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </main>
  );
}

export default App;
