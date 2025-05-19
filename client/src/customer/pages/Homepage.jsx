import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';
import gambar1 from '../../assets/Choco_oreo.jpg';

const HomePage = () => {
  const staticProducts = [
    { id: 1, name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: 2, name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: 3, name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: 4, name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: 5, name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: 6, name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
  ];

  return (
    <>
      <Header />
      <main className="container-fluid p-0" style={{ backgroundColor: '#FFF2F2' }}>
        {/* Hero Section */}
        <section className="text-center p-5" style={{ backgroundColor: '#FFF2F2' }}>
          <h2 className="mb-3" style={{ color: '#D67832' }}>Manisnya Seporsi Kebahagiaan</h2>
          <p>Nikmati kue dan cookies lezat dengan harga terjangkau, pas untuk ngemil atau teman santai</p>
          <img src={gambar1} alt="Sweet Bites" style={{ maxWidth: '300px' }} />
        </section>

        {/* Highlight Section */}
        <section className="d-flex justify-content-center align-items-center p-4" style={{ backgroundColor: '#FEC0C6' }}>
          <img src={gambar1} alt="Highlight" style={{ width: '150px', marginRight: '20px' }} />
          <div>
            <h4 style={{ color: '#D67832' }}>Porsi Pas, Rasa Kelas!</h4>
            <p>Cocok dinikmati sendiri, atau berbagi dengan orang tersayang</p>
            <button className="btn btn-warning me-2">Lihat Rekomendasi</button>
            <button className="btn btn-warning me-2">Cek Menu</button>
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="p-4 text-center">
          <h3 className="mb-4 fw-bold" style={{ color: '#D67832' }}>Rekomendasi</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {staticProducts.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                available={product.available}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
