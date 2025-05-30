

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './customer/pages/Homepage';
import MenuPage from './customer/pages/MenuPage';
import KontakPage from './customer/pages/Kontak';
import MenuDetailPage from './customer/pages/MenuDetailPage';
import TentangKamiPage from './customer/pages/TentangKamiPage';
import LoginPage from './customer/pages/LoginPage';
import RegistrationPage from './customer/pages/RegistrationPage';
import CartPage from './customer/pages/CartPage';
import CheckoutPage from './customer/pages/CheckoutPage';
import { CartProvider } from './customer/context/CartContext';
import ProtectedRoute from './customer/components/ProtectedRoute'; // <<== Tambahin ini
import ChangePasswordPage from './customer/pages/ChangePasswordPage';

import AdminPage from './admin/pages/admin_dashboard';
import AdminMenuPage from './admin/pages/admin_menu';
import AdminOrdersPage from './admin/pages/admin_orders';
import AddProductPage from './admin/pages/admin_addproduct';
import EditProductPage from './admin/pages/admin_editproduct';
import AdminOrderDetailPage from './admin/pages/admin_orderdetail';
import ProfilePage from './customer/pages/ProfilePage';
import PesananPage from './customer/pages/PesananPage';
import DetailPesananPage from './customer/pages/DetailPesananPage';


function App() {
  return (
    <main>
      <CartProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/change-password" element={<ChangePasswordPage  />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/kontak" element={<KontakPage />} />
        <Route path="/tentang" element={<TentangKamiPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pesanan" element={<PesananPage />} />
        <Route path="/pesanan/detail" element={<DetailPesananPage/>} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Admin-only routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminMenuPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addproduct"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/editproduct/:productId"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <EditProductPage />
              </ProtectedRoute>
            }
          
          />
        <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />
        <Route
            path="/admin/orders/detail"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOrderDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
      
      
    </main>
  );
}

export default App;


