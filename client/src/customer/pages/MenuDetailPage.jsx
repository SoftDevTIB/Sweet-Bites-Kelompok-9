import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import Header from '../components/header';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';
import './MenuDetailPage.css';
import Toast from '../components/Toast';

const backendUrl = import.meta.env.VITE_API_URL;

const MenuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  useEffect(() => {
    const headerElement = document.querySelector('.header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${backendUrl}/api/products/${id}`)
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
        <main className="py-5 text-center">
          <div className="pp-container d-flex justify-content-center align-items-center">
            <p className='fs-4 text-oren'>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="container p-4" style={{ paddingTop: headerHeight }}>
          <h2>Product not found</h2>
          <button onClick={() => navigate('/menu')} className="btn btn-primary">Back to Menu</button>
        </main>
        <Footer />
      </>
    );
  }

  const normalizedPrice = typeof product.price === 'string' ? parseFloat(product.price.replace(/\./g, '').replace(',', '.')) : product.price;

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      setToastMessage('Stok tidak tersedia');
      setToastShow(true);
      return false;
    }
    const success = addToCart({
      id: product._id,
      name: product.productName,
      price: normalizedPrice,
      photo: product.photo,
      imageUrl: product.photo ? `/uploads/${product.photo}` : '',
      description: product.description,
      stock: product.stock,
    });
    if (success) {
      setToastMessage('Berhasil ditambahkan ke keranjang!');
    } else {
      setToastMessage('Stok tidak tersedia');
    }
    setToastShow(true);
    return success;
  };

  return (
    <>
      <Header />
      <Toast message={toastMessage} show={toastShow} onClose={() => setToastShow(false)} />
      <main className="container p-5 menu-detail-padding">
        <div className="row">
          <div className="col-md-4">
            <img src={product.photo ? `${backendUrl}/uploads/${product.photo}` : ''} alt={product.productName} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h2 className="menu-detail-heading">{product.productName}</h2>
            <p className="menu-detail-description">{product.description}</p>
            <p className={product.stock > 0 ? 'menu-detail-stock-available' : 'menu-detail-stock-unavailable'}>
              {product.stock > 0 ? `Tersedia - Stok: ${product.stock}` : 'Tidak tersedia'}
            </p>
            {product.stick && (
              <p className="menu-detail-stick"><strong>Stick:</strong> {product.stick}</p>
            )}
            <h4 className="menu-detail-price">Rp {formatPrice(product.price)}</h4>
            <div className="d-flex flex-wrap gap-3 mt-3 detail-btn-group">
              <button
                className="btn btn-add-to-cart"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
              >
                <FiShoppingCart /> Add To Cart
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  const success = handleAddToCart();
                  if (success) {
                    navigate('/checkout');
                  }
                }}
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MenuDetailPage;
