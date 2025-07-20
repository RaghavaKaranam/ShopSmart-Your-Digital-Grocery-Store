// ✅ CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (user?.email) {
        const res = await axios.get(`http://localhost:5000/cart/${user.email}`);
        setCartItems(res.data.products);
      }
    };
    load();
  }, [user]);

  const addToCart = async (product) => {
    if (!user?.email) return;

    // Send `productId` and quantity to backend
    await axios.post(`http://localhost:5000/cart/add`, {
      email: user.email,
      product: {
        productId: product.id || product.productId,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    });

    // Reload updated cart
    const res = await axios.get(`http://localhost:5000/cart/${user.email}`);
    setCartItems(res.data.products);
  };

  const removeFromCart = async (productId) => {
    if (!user?.email) return;
    await axios.post(`http://localhost:5000/cart/remove`, {
      email: user.email,
      productId
    });
    const res = await axios.get(`http://localhost:5000/cart/${user.email}`);
    setCartItems(res.data.products);
  };

  const clearCart = async () => {
    if (!user?.email) return;
    await axios.post(`http://localhost:5000/cart/clear`, { email: user.email });
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
