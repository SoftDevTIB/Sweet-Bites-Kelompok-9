import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';
import { GiCupcake } from 'react-icons/gi';
import { LuCakeSlice } from "react-icons/lu";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Cart items in CartPage:', cartItems);
  }, [cartItems]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const formatPrice = (price) => {
    return 'Rp ' + price.toLocaleString('id-ID');
  };

  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = (id, quantity) => {
    if (quantity === 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <>
      <Header />
      <div className="cart-page-wrapper" style={{ minHeight: 'calc(100vh - 120px)', backgroundColor: '#FFF2F2', padding: '2rem 0' }}>
        <div className="container">
          <h2 className="cart-title mb-4" style={{ color: '#D67832', textAlign: 'center', fontSize: '2rem'}}>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message" style={{fontSize: '1.2rem' }}>Ups! Keranjangmu masih kosong nih.<br />
            Yuk, jelajahi produk kami dan tambahkan yang kamu suka ke keranjang!<GiCakeSlice/><GiCupcake/><LuCakeSlice/><FaRegFaceSmileBeam/></p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-4 cart-item" style={{ borderBottom: '2px solid #D67832', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '140px', height: '140px', objectFit: 'cover', marginRight: '15px', borderRadius: '8px' }} />
                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                      <h5 className="product-name">{item.name}</h5>
                      <p>{formatPrice(item.price)}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="quantity-btn">
                          <button onClick={() => handleDecrease(item.id, item.quantity)}><CiCircleMinus className="quantity-icon" /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrease(item.id, item.quantity)}><CiCirclePlus className="quantity-icon" /></button>
                        </div>
                        <button className="btn btn-link trash-btn" onClick={() => removeFromCart(item.id)}><FaRegTrashAlt /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="border p-5 cart-summary-box">
                  <div className="total-item-row">
                    <span>Total Item</span>
                    <span>{totalItems} buah</span>
                  </div>
                  <div className="total-item-line"></div>
                  <div className="subtotal-row">
                    <span className="subtotal-label">SubTotal</span>
                    <span className="subtotal-value">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="checkout-button-wrapper">
                    <button className="btn checkout-btn" onClick={handleCheckout}>Check out</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
