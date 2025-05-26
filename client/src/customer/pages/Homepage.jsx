import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';
import './Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = products.map(product => product.photo ? `/uploads/${product.photo}` : '/src/assets/Choco_oreo.jpg');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <>
      <Header />
      <main className="homepage-main">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <h2 className="hero-title">Manisnya Seporsi Kebahagiaan</h2>
            <p>Nikmati kue dan cookies lezat dengan harga terjangkau, pas untuk ngemil atau teman santai</p>
          </section>
        </div>

        {/* Highlight Section */}
        <section className="highlight-section highlight-carousel">
          <div className="container highlight-container highlight-wrapper">
            <div className="highlight-image-container">
              <img
                src={carouselImages[currentImageIndex]}
                alt="Product"
                className="highlight-image"
                onClick={() => setCurrentImageIndex((currentImageIndex + 1) % carouselImages.length)}
                style={{ cursor: 'pointer' }}
              />
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <span
                    key={index}
                    className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex((index + 1) % carouselImages.length)}
                  />
                ))}
              </div>
            </div>
            <div className="highlight-text">
              <h4>Porsi Pas, Rasa Kelas!</h4>
              <p>Cocok dinikmati sendiri, atau berbagi dengan orang tersayang</p>
              <button
                className="btn me-2"
                style={{ backgroundColor: '#D67832', color: 'white' }}
                onClick={() => {
                  const element = document.getElementById('recommendation-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Lihat Rekomendasi
              </button>
              <button
                className="btn me-2"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #2D2D2D',
                  color: '#2D2D2D',
                  borderRadius: '0.375rem',
                }}
                onClick={() => navigate('/menu')}
              >
                Cek Menu
              </button>
            </div>
          </div>
        </section>

        <div className="container">
          {/* Recommendation Section */}
          <section className="p-4 text-center">
            <h3 id="recommendation-section" className="recommendation-title">Rekomendasi</h3>
            <div className="d-flex flex-wrap justify-content-center product-cards-container">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.productName}
                  price={product.price}
                  available={product.stock > 0}
                  imageUrl={product.photo ? `/uploads/${product.photo}` : ''}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
