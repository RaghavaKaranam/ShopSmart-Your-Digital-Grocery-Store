// src/User-module/Pages/orderHistory/OrderHistory.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthContext';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './OrderHistory.css';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    if (!user || !user.email) return;

    axios
      .get(`http://localhost:5000/orders/history/${user.email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await axios.put(`http://localhost:5000/orders/cancel/${id}`);
      alert('Order cancelled!');
      fetchOrders();
    } catch (err) {
      console.error('Error cancelling:', err);
      alert('Error cancelling order.');
    }
  };

  return (
    <>
     
      <div className="order-history-container">
        <h2>Your Order History</h2>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="order-card">
              <h3>Order #{order._id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <div className="shipping-info">
                <h4>Shipping Details</h4>
                <p><strong>Name:</strong> {order.shipping.name}</p>
                <p><strong>Address:</strong> {order.shipping.address}</p>
                <p><strong>Phone:</strong> {order.shipping.phone}</p>
                <p><strong>Email:</strong> {order.shipping.email}</p>
              </div>

              <div className="product-list">
                <h4>Products</h4>
                {order.products.map((p, i) => (
                  <div key={i} className="product-item">
                    <p>{p.title} (x{p.quantity}) — ₹{p.price} each</p>
                    <p>Subtotal: ₹{p.price * p.quantity}</p>
                  </div>
                ))}
              </div>

              <p className="total-amount">
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>

              {order.status === 'pending' && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </>
  );
}
