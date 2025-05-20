import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../components/tentangkami.css';
import TentangKami from '../components/TentangKami'; 

const TentangKamiPage = () => {
  return (
    <>
      <Header />
      <TentangKami />
      <Footer />
    </>
  );
};

export default TentangKamiPage;
