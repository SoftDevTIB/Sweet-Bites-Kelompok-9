import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';
import tiramisuImage from '../../assets/tiramisu.png';
import './Homepage.css';

const HomePage = () => {
  
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = products.map(product => product.photo ? `/uploads/${product.photo}` : '/src/assets/Choco_oreo.jpg');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);
        setProducts(selected);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    if (typeof price === 'string') {
      const numericPrice = price.replace(/\D/g, '');
      return numericPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return price;
  };

  return (
    <>
      <Header />
      <main className="homepage-main">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-text">
              <h2 className="hero-title">Manisnya Seporsi Kebahagiaan</h2>
              <span>Nikmati kue dan cookies lezat dengan harga terjangkau, pas untuk ngemil atau teman santai</span>
            </div>
            <div className="hero-image-container">
              <img src={tiramisuImage} alt="Tiramisu" className="hero-image" />
            </div>
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
                className="btn me-3 btn-rekomendasi"
                onClick={() => {
                  const element = document.getElementById('recommendation-section');
                  if (element) {
                    const yOffset = -80;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                Lihat Rekomendasi
              </button>
              <button
                className="btn me-2 btn-menu px-5"
                onClick={() => {
                  window.location.href = '/menu#top';
                }}
              >
                Cek Menu
              </button>
            </div>
          </div>
        </section>

        <div className="container recommendation-container">
          {/* Recommendation Section */}
          <section className="py-4 text-center">
            <h3 id="recommendation-section" className="recommendation-title">Rekomendasi</h3>
            <div className="d-flex flex-wrap justify-content-center product-cards-container">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.productName}
                  price={formatPrice(product.price)}
                  stock={product.stock}
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
