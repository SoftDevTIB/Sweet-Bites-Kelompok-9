import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace(/\./g, '').replace(',', '.')), 0);

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
          <h2 className="cart-title mb-4" style={{ color: '#D67832', textAlign: 'center' }}>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-8">
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-3">
                    <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }} />
                    <div className="flex-grow-1">
                      <h5>{item.name}</h5>
                      <p>{item.price}</p>
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
                <div className="border p-3" style={{ borderRadius: '10px', borderColor: '#D67832', borderWidth: '10px', borderStyle: 'solid' }}>
                  <p>Total Item: {totalItems} buah</p>
                  <p>SubTotal: <strong>{formatPrice(subtotal)}</strong></p>
                  <button className="btn btn-success w-100" onClick={handleCheckout}>Check out</button>
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
