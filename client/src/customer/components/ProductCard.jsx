import React from 'react';

const ProductCard = ({ name, price, available, imageUrl }) => {
  return (
    <div className="card m-2" style={{ width: '14rem' }}>
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body p-2">
        <h6 className="card-title">{name}</h6>
        <p className="card-text">Rp {price}</p>
        <p className="text-muted">{available ? 'Tersedia' : 'Tidak tersedia'}</p>
        <button className="btn btn-sm btn-success" disabled={!available}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
