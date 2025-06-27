import React, { useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import './category.css';

export default function AddCategory() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim inputs
    const trimmedCategory = category.trim();
    const trimmedSubcategory = subcategory.trim();

    // Reset message
    setMessage('');
    setType('');

    // Basic validation
    if (!trimmedCategory || !trimmedSubcategory) {
      setMessage('Both fields are required.');
      setType('error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/category/add-category', {
        category: trimmedCategory,
        subcategory: trimmedSubcategory,
      });

      setMessage(res.data.message);
      setType('success');
      setCategory('');
      setSubcategory('');
    } catch (err) {
      console.error('Error adding category:', err);
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
      setType('error');
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="add-category-container">
        <h2>Add Category / Subcategory</h2>

        <form onSubmit={handleSubmit} className="category-form">
          <label htmlFor="category">Category Name</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="e.g., Fruits & Vegetables"
          />

          <label htmlFor="subcategory">Subcategory Name</label>
          <input
            type="text"
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
            placeholder="e.g., Cut Fruit, Tender Coconut"
          />

          <button type="submit">Add Subcategory</button>

          {message && (
            <p className={type === 'success' ? 'success-message' : 'error-message'}>
              {message}
            </p>
          )}
        </form>
      </div>
      <AdminFooter />
    </>
  );
}
