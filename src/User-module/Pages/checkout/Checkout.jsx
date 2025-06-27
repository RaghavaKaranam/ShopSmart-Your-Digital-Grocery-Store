import React, { useState } from 'react';
import './Checkout.css';
import axios from 'axios';

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMode: 'COD'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/checkout', formData);
      setMessage(res.data.message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        paymentMode: 'COD'
      });
    } catch (err) {
      console.error(err);
      setError("Order failed. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Full Name</label>
        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />

        <label>Phone Number</label>
        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />

        <label>Shipping Address</label>
        <textarea name="address" required rows="3" value={formData.address} onChange={handleChange} />

        <label>City</label>
        <input type="text" name="city" required value={formData.city} onChange={handleChange} />

        <label>Pincode</label>
        <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} />

        <label>Payment Mode</label>
        <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="UPI">UPI</option>
        </select>

        <button type="submit">Place Order</button>
        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}

export default Checkout;
