import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart: from server if logged in, else from localStorage
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/api/cart', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch cart');
            return res.json();
          })
          .then(data => {
            const normalized = (data.items || []).map(i => ({
              id:        i.productId.toString(),
              name:      i.name,
              price:     i.price,
              imageUrl:  i.imageUrl,
              quantity:  i.quantity,
            }));
            setCartItems(normalized);
          })
          .catch(() => {
            const local = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(local);
          });
      } else {
        const local = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(local);
      }
    }, [localStorage.getItem('token')]);

    // Mirror to localStorage whenever cartItems change
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

  // Helper to call backend endpoints
  const syncApi = async (method, url, body) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await fetch(`http://localhost:5000/api/cart${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  const addToCart = item => {
    const existing = cartItems.find(i => i.id === item.id);
    let updated;
    if (existing) {
      updated = cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      syncApi('put', `/${item.id}`, { productId: item.id, quantity: existing.quantity + 1 });
    } else {
      updated = [...cartItems, { ...item, quantity: 1 }];
      syncApi('post', ``, {
        productId: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1,
      });
    }
    setCartItems(updated);
  };

    // di dalam CartProvider:
  const overwriteCartApi = async (items) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch('http://localhost:5000/api/cart/overwrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.id,
            name:      i.name,
            price:     i.price,
            imageUrl:  i.imageUrl,
            quantity:  i.quantity
          }))
        })
      });
    } catch (err) {
      console.error('Failed to overwrite cart', err);
    }
  };


  const updateQuantity = (id, quantity) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updated);
    syncApi('put', `/${id}`, { productId: id, quantity });
  };

  const removeFromCart = id => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    syncApi('delete', `/${id}`);
  };

  const clearCart = () => {
  setCartItems([]); // Kosongkan cart lokal
  localStorage.removeItem('cart'); // Hapus cart dari localStorage

  // Jika login, clear juga cart di backend
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:5000/api/cart/clear', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).catch(err => console.error('Failed to clear cart on backend', err));
  }
};


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, overwriteCart:overwriteCartApi}}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
