import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import './OrdersList.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/checkout');
      setOrders(res.data);
    } catch (err) {
      setError('Failed to fetch checkout orders.');
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="orders-container">
        <h2>All Checkout Orders</h2>
        {error && <p className="error-message">{error}</p>}

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Items</th>
                <th>Total ₹</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id}>
                  <td>{i + 1}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.contact}</td>
                  <td>{order.address}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.productName} (x{item.quantity}) - ₹{item.price}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AdminFooter />
    </>
  );
}
