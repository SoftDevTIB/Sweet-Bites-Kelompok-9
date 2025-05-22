import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';

const MenuPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <>
      <Header />
      <main className="container-fluid p-4" style={{ backgroundColor: '#FFF2F2', paddingTop: '70px' }}>
        <h2 className="text-center mb-4" style={{ color: '#D67832' }}>Menu Kami</h2>
        <div className="d-flex flex-wrap justify-content-center">
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
      </main>
      <Footer />
    </>
  );
};

export default MenuPage;
