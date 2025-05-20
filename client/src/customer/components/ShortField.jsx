import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ name, price, available, imageUrl }) => {
  return (
    <div className="card m-2" style={{ width: '14rem' }}>
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body p-2">
        <h6 className="card-title">{name}</h6>
        <p className="card-text">Rp {price}</p>
        <p className={available ? 'available-text' : 'text-muted'}>
          {available ? 'Tersedia' : 'Tidak tersedia'}
        </p>
        <button className="btn btn-sm btn-success" disabled={!available}>
          <FaShoppingCart /> Add To Cart
        </button>
      </div>
    </div> 
  );
};

export default ProductCard;
