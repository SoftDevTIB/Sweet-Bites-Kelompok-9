import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './customer/pages/Homepage';
import MenuPage from './customer/pages/MenuPage';
import KontakPage from './customer/pages/Kontak';
import MenuDetailPage from './customer/pages/MenuDetailPage';
import TentangKamiPage from './customer/pages/TentangKamiPage';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/kontak" element={<KontakPage />} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
        <Route path="/tentang" element={<TentangKamiPage />} />
      </Routes>
    </main> 
  );
}

export default App; 
