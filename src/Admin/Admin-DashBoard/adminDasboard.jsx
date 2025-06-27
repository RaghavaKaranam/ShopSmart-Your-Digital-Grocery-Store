import React from 'react';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import { Link } from 'react-router-dom';
import './adminDashboard.css';

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <div className="admin-dashboard-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <Link to="/admin/add-category" className="admin-link">
            <button>Add Categories</button>
          </Link>
          <Link to="/admin/add-product" className="admin-link">
            <button>Add Products</button>
          </Link>
          <Link to="/admin/feedback" className="admin-link">
            <button>Users Feedback</button>
          </Link>
          <Link to="/admin/edit-product" className="admin-link">
            <button>Edit Product</button>
          </Link>
          <Link to="/admin/orders" className="admin-link">
            <button>Checkout Products</button>
          </Link>
          <Link to="/admin/users" className="admin-link">
            <button>Users</button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin! You now have access to admin-specific features.</p>
        </main>
      </div>
      <AdminFooter />
    </>
  );
}
