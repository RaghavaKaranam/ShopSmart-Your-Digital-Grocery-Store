// src/admin/Edit-Product/EditProduct.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import '../Admin-DashBoard/adminDashboard.css'; // ✅ Sidebar styles
import './EditProduct.css';
import { Link } from 'react-router-dom';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 50;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error:', err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({ ...p });
  };

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/products/${editingId}`, form);
    setEditingId(null);
    fetchProducts();
  };

  const filteredProducts = products.filter(p => {
    const search = searchTerm.toLowerCase();
    return (
      p.ProductName?.toLowerCase().includes(search) ||
      p.Category?.toLowerCase().includes(search) ||
      String(p.Price).includes(search)
    );
  });

  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <AdminHeader />
      <div className="admin-dashboard-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <Link to="/admin/add-product" className="admin-link"><button>Add Products</button></Link>
          <Link to="/admin/feedback" className="admin-link"><button>Users Feedback</button></Link>
          <Link to="/admin/edit-product" className="admin-link"><button>Edit Product</button></Link>
          <Link to="/admin/orders" className="admin-link"><button>Checkout Products</button></Link>
          <Link to="/admin/users" className="admin-link"><button>Users</button></Link>
        </aside>

        <main className="admin-main-content">
          <h2>Manage Products</h2>

          <input
            type="text"
            className="search-bar"
            placeholder="Search by name, category, or price..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(p => (
                <tr key={p._id}>
                  {editingId === p._id ? (
                    <>
                      <td><input name="ProductName" value={form.ProductName} onChange={handleEditChange} /></td>
                      <td><input name="Category" value={form.Category} onChange={handleEditChange} /></td>
                      <td><input name="SubCategory" value={form.SubCategory} onChange={handleEditChange} /></td>
                      <td><input name="Price" type="number" value={form.Price} onChange={handleEditChange} /></td>
                      <td><input name="Quantity" value={form.Quantity} onChange={handleEditChange} /></td>
                      <td><input name="Image_Url" value={form.Image_Url} onChange={handleEditChange} /></td>
                      <td>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{p.ProductName}</td>
                      <td>{p.Category}</td>
                      <td>{p.SubCategory}</td>
                      <td>₹{p.Price}</td>
                      <td>{p.Quantity}</td>
                      <td><img src={p.Image_Url} alt={p.ProductName} width="50" /></td>
                      <td>
                        <button onClick={() => startEdit(p)}>Edit</button>
                        <button onClick={() => handleDelete(p._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {Math.ceil(filteredProducts.length / pageSize)}</span>
            <button disabled={page >= filteredProducts.length / pageSize} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </main>
      </div>
      <AdminFooter />
    </>
  );
}
