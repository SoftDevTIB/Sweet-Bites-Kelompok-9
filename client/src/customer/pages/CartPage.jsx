import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
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
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Header />
      <div className="cart-page-wrapper" style={{ minHeight: 'calc(100vh - 120px)', backgroundColor: '#FFF2F2', padding: '2rem 0' }}>
        <div className="container">
          <h2 className="cart-title mb-4" style={{ color: '#D67832', textAlign: 'center', fontSize: '1.5rem' }}>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3 cart-item" style={{ borderBottom: '2px solid #D67832', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px', borderRadius: '8px' }} />
                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                      <h5 className="product-name">{item.name}</h5>
                      <p>{formatPrice(item.price)}</p>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-link p-0 me-2" onClick={() => handleDecrease(item.id, item.quantity)}><FaMinusCircle /></button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-link p-0 ms-2" onClick={() => handleIncrease(item.id, item.quantity)}><FaPlusCircle /></button>
                        <button className="btn btn-link text-danger ms-3" onClick={() => removeFromCart(item.id)}><FaTrash /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="border p-3 cart-summary-box" style={{ borderRadius: '10px' }}>
                  <p>Total Item: {totalItems} buah</p>
                  <p>SubTotal: <strong>{formatPrice(subtotal)}</strong></p>
                  <button className="btn w-100" style={{ backgroundColor: '#3B7883', color: 'white' }} onClick={handleCheckout}>Check out</button>
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
