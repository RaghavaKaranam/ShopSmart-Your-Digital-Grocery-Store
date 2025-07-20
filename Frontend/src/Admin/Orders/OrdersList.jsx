// src/admin/orders/Orders.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import { Link } from 'react-router-dom';
import '../Admin-DashBoard/adminDashboard.css';
import './OrdersList.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="admin-dashboard-container">
        <aside className="admin-sidebar">
          <Link to="/admin/add-product" className="admin-link"><button>Add Products</button></Link>
          <Link to="/admin/feedback" className="admin-link"><button>Users Feedback</button></Link>
          <Link to="/admin/edit-product" className="admin-link"><button>Edit Product</button></Link>
          <Link to="/admin/orders" className="admin-link"><button>Checkout Products</button></Link>
          <Link to="/admin/users" className="admin-link"><button>Users</button></Link>
        </aside>

        <main className="admin-main-content">
          <h2>All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Shipping</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Placed On</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i}>
                    <td>{o.shipping?.name}<br />{o.shipping?.email}</td>
                    <td>{o.shipping?.address}<br />{o.shipping?.phone}</td>
                    <td>
                      {o.products.map((p, idx) => (
                        <div key={idx}>
                          {p.title} (x{p.quantity}) - ₹{p.price}<br />
                        </div>
                      ))}
                    </td>
                    <td>₹{o.totalAmount}</td>
                    <td>{o.paymentMethod}</td>
                    <td>{o.status}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
      <AdminFooter />
    </>
  );
}
