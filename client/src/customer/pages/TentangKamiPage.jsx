import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import gambarTentangKami from '../../assets/gambar_tentangkami.jpg';
import './TentangKamiPage.css';

const TentangKamiPage = () => {
  return (
    <>
      <Header />
      <div className="tentang-wrapper">
      <h1 className="tentang-title">Tentang Kami</h1> 
      <div className="tentang-content">
        <img src={gambarTentangKami} alt="Sweet Bites" className="tentang-image" />
        <div className="tentang-text">
          <p>
            <strong>Sweet Bites</strong> berawal dari hobi sederhana sang owner dalam membuat kue dan cookies di sela-sela kesibukannya sebagai mahasiswa. Awalnya, semula hanya iseng—membuat kue untuk teman-teman dekat, lalu mulai menerima pesanan kecil-kecilan. Dari dapur rumah dan tanpa sistem yang rumit, Sweet Bites mulai dikenal dari mulut ke mulut.
          </p>
          <p>
            Meski masih dijalankan sambil kuliah dan serba sederhana, setiap kue dan cookies yang dibuat selalu mengutamakan rasa dan kualitas. Sweet Bites percaya bahwa hal-hal manis bisa membawa kebahagiaan, bahkan dari gigitan pertama.
          </p>
          <p>
            Kami berharap, setiap produk dari Sweet Bites bisa menjadi bagian kecil dari hari bahagiamu — entah sebagai camilan, hadiah, atau teman saat rehat dari rutinitas harian.
          </p>
        </div>
      </div>
    </div>

      <Footer />
    </>
  );
};

export default TentangKamiPage;
