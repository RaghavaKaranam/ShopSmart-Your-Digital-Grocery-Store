// src/User-module/CartContext/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch items from DB when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(res => setCartItems(res.data))
      .catch(err => console.error('Failed to fetch cart:', err));
  }, []);

  const addToCart = async (product) => {
    try {
      const res = await axios.post('http://localhost:5000/cart/add', {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image
      });

      const addedProduct = res.data;

      setCartItems(prev => {
        const exists = prev.find(item => item.id === addedProduct.id);
        if (exists) {
          return prev.map(item =>
            item.id === addedProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { ...addedProduct }];
        }
      });
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/remove/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:5000/cart/clear');
      setCartItems([]);
    } catch (err) {
      console.error('Clear cart failed:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
