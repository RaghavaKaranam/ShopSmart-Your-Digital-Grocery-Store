// src/admin/AddProduct/AddProduct.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import '../Admin-DashBoard/adminDashboard.css'; // ✅ Reuse sidebar CSS
import './AddProducts.css'; // ✅ Form styling

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ProductName: '',
    Category: '',
    SubCategory: '',
    Price: '',
    Quantity: '',
    Image_Url: '',
  });
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setType('');

    try {
      const res = await axios.post('http://localhost:5000/products/add', form);

      if (res.data.exists) {
        setMessage('Product already exists!');
        setType('error');
      } else {
        alert('Product added successfully!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error.');
      setType('error');
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-dashboard-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
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

        {/* Main content */}
        <main className="admin-main-content">
          <h2>Add New Product</h2>
          <form className="add-product-form" onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input name="ProductName" value={form.ProductName} onChange={handleChange} required />

            <label>Category</label>
            <input name="Category" value={form.Category} onChange={handleChange} required />

            <label>SubCategory</label>
            <input name="SubCategory" value={form.SubCategory} onChange={handleChange} required />

            <label>Price</label>
            <input name="Price" type="number" value={form.Price} onChange={handleChange} required />

            <label>Quantity</label>
            <input name="Quantity" value={form.Quantity} onChange={handleChange} required />

            <label>Image URL</label>
            <input name="Image_Url" value={form.Image_Url} onChange={handleChange} required />

            <button type="submit">Add Product</button>
            {message && (
              <p className={type === 'success' ? 'success-message' : 'error-message'}>
                {message}
              </p>
            )}
          </form>
        </main>
      </div>

      <AdminFooter />
    </>
  );
}
