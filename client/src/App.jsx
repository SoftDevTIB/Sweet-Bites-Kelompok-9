import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './customer/pages/Homepage';
import MenuPage from './customer/pages/MenuPage';
import MenuDetailPage from './customer/pages/MenuDetailPage';
import LoginPage from './customer/pages/LoginPage';
import RegistrationPage from './customer/pages/RegistrationPage';


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
      </Routes>
    </main>
  );
}

export default App;
