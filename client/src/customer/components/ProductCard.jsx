import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const ProductCard = ({ id, name, price, available, imageUrl }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const normalizedPrice = typeof price === 'string' ? parseFloat(price.replace(/\./g, '').replace(',', '.')) : price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, name, price: normalizedPrice, available, imageUrl });
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
      <div className="card m-2" style={{ width: '14rem', cursor: 'pointer' }} onClick={handleCardClick}>
        <img src={imageUrl} className="card-img-top" alt={name} />
        <div className="card-body p-0">
          <div className='p-2'>
            <h6 className="card-title font-est fs-5">{name}</h6>
            <p className="card-text">Rp {price}</p>
            <p className={available ? 'available-text' : 'text-muted'}>
              {available ? 'Tersedia' : 'Tidak tersedia'}
            </p>
          </div>
          <button
            className="btn add-to-cart-btn"
            disabled={!available}
            onClick={handleAddToCart}
          >
            <FaShoppingCart /> Add To Cart
          </button>
        </div>
      </div>
      <Toast message="Berhasil ditambahkan ke keranjang!" show={showToast} onClose={handleToastClose} />
    </>
  );
};

export default ProductCard;
