// src/admin/Users_details/Users_details.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import { Link } from 'react-router-dom';
import '../Admin-DashBoard/adminDashboard.css';
import './User_details.css';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/users/all')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
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
          <h2>All Registered Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.fullName || u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.mobile}</td>
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
