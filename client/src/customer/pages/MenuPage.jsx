import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';
import gambar1 from '../../assets/Choco_oreo.jpg';

const MenuPage = () => {
  const staticProducts = [
    { id: '1', name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: '2', name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: '3', name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: '4', name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: '5', name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
    { id: '6', name: 'Choco Oreo', price: '10.000', available: true, imageUrl: gambar1 },
  ];

  return (
    <>
      <Header />
      <main className="container-fluid p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <h2 className="text-center mb-4" style={{ color: '#D67832' }}>Menu Kami</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {staticProducts.map(product => (
            <Link key={product.id} to={`/menu/${product.id}`} style={{ textDecoration: 'none' }}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                available={product.available}
                imageUrl={product.imageUrl}
              />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MenuPage;
