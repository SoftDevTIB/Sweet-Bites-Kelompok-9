import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import './ProductCard.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const ProductCard = ({ id, name, price, stock, imageUrl }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const normalizedPrice = typeof price === 'string' ? parseFloat(price.replace(/\./g, '').replace(',', '.')) : price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, name, price: normalizedPrice, stock, imageUrl });
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleCardClick = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <>
      <div className="card m-2" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
        <img src={imageUrl} className="card-img-top" alt={name} />
        <div className="card-body p-0">
          <div className='p-2'>
            <div className="title-wrapper">
              <h6 className="card-title font-est">{name}</h6>
            </div>
            <p className="card-text">Rp {price}</p>
            <p className={stock > 0 ? 'available-text' : 'not-available-text'}>
              {stock > 0 ? 'Tersedia' : 'Tidak tersedia'}
            </p>
          </div>
          <button
            className="btn add-to-cart-btn"
            disabled={stock <= 0}
            onClick={handleAddToCart}
          >
            <FiShoppingCart /> Add To Cart
          </button>
        </div>
      </div>
      <Toast message="Berhasil ditambahkan ke keranjang!" show={showToast} onClose={handleToastClose} />
    </>
  );
};

export default ProductCard;
