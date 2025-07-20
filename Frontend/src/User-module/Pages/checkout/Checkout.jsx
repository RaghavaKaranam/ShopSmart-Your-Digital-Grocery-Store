import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { useAuth } from '../../AuthContext/AuthContext';
import axios from 'axios';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: user?.email || '',
    address: '',
    phone: '',
    paymentMethod: 'COD',
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/orders/place', {
        email: user.email,
        shipping: {
          name: form.name,
          address: form.address,
          phone: form.phone,
          email: form.email,
        },
        paymentMethod: form.paymentMethod,
      });

      clearCart();
      window.alert('✅ Order placed successfully! Please check your email.');
      navigate('/home');
    } catch (err) {
      window.alert('❌ Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          readOnly
        />
        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <button type="submit">Place Order</button>
      </form>

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
