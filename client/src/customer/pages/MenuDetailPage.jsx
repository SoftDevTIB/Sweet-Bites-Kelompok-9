import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';

const MenuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container p-4">
          <h2>Loading...</h2>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="container p-4">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/menu')} className="btn btn-primary">Back to Menu</button>
        </main>
        <Footer />
      </>
    );
  }

  const normalizedPrice = typeof product.price === 'string' ? parseFloat(product.price.replace(/\./g, '').replace(',', '.')) : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.productName,
      price: normalizedPrice,
      photo: product.photo,
      imageUrl: product.photo ? `/uploads/${product.photo}` : '',
      description: product.description,
      stock: product.stock,
    });
  };

  return (
    <>
      <Header />
      <main className="container p-4" style={{ backgroundColor: '#FFF2F2' }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={product.photo ? `/uploads/${product.photo}` : ''} alt={product.productName} className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h2 style={{ color: '#3B7883' }}>{product.productName}</h2>
            <p style={{ color: 'black' }}>{product.description}</p>
            <p style={{ color: product.stock > 0 ? '#D67832' : 'gray' }}>
              {product.stock > 0 ? 'Tersedia' : 'Tidak tersedia'}
            </p>
            <h4 style={{ color: '#3B7883' }}>Rp {product.price}</h4>
            <button className="btn btn-success me-2" disabled={product.stock <= 0} onClick={handleAddToCart}>
              <FaShoppingCart /> Add To Cart
            </button>
            <button className="btn btn-outline-secondary">
              Beli Sekarang
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MenuDetailPage;
