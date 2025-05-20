import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './customer/pages/Homepage';
import MenuPage from './customer/pages/MenuPage';
import MenuDetailPage from './customer/pages/MenuDetailPage';
import CartPage from './customer/pages/CartPage';
import { CartProvider } from './customer/context/CartContext';

function App() {
  return (
    <CartProvider>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<MenuDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
