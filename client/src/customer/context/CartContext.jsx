import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart hanya sekali saat pertama kali render
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
        .then(async data => {
          const normalized = (data.items || []).map(i => ({
            id: i.productId.toString(),
            name: i.name,
            price: i.price,
            imageUrl: i.imageUrl,
            quantity: i.quantity,
            stock: 0, // placeholder
          }));
          // Fetch latest stock for each product
          const updatedItems = await Promise.all(normalized.map(async item => {
            try {
              const res = await fetch(`http://localhost:5000/api/products/${item.id}`);
              if (!res.ok) throw new Error('Failed to fetch product');
              const product = await res.json();
              return { ...item, stock: product.stock };
            } catch {
              return item;
            }
          }));
          setCartItems(updatedItems);
        })
        .catch(() => {
          const local = JSON.parse(localStorage.getItem('cart')) || [];
          setCartItems(local);
        });
    } else {
      const local = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(local);
    }
  }, []); // ✅ hanya dijalankan sekali

  // Mirror to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

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
      if (existing.quantity + 1 > existing.stock) {
        // Stock exceeded, do not add
        return false;
      }
      updated = cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      syncApi('put', `/${item.id}`, { productId: item.id, quantity: existing.quantity + 1 });
    } else {
      if (item.quantity > item.stock) {
        // Stock exceeded, do not add
        return false;
      }
      updated = [...cartItems, { ...item, quantity: 1, stock: item.stock }];
      syncApi('post', ``, {
        productId: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1,
      });
    }
    setCartItems(updated);
    return true;
  };

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
            name: i.name,
            price: i.price,
            imageUrl: i.imageUrl,
            quantity: i.quantity
          }))
        })
      });
    } catch (err) {
      console.error('Failed to overwrite cart', err);
    }
  };

  const updateQuantity = (id, quantity) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return false;
    if (quantity > item.stock) {
      // Stock exceeded, do not update
      return false;
    }
    const updated = cartItems.map(i =>
      i.id === id ? { ...i, quantity } : i
    );
    setCartItems(updated);
    syncApi('put', `/${id}`, { productId: id, quantity });
    return true;
  };

  const removeFromCart = id => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    syncApi('delete', `/${id}`);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');

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
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, overwriteCart: overwriteCartApi }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
