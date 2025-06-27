import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedbackView.css';
import AdminHeader from '../Admin-Header/AdminHeader';
import AdminFooter from '../Admin-footer/AdminFooter';
import { Link } from 'react-router-dom';
function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(res.data);
    } catch (err) {
      setError('Failed to fetch feedbacks');
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

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
          <Link to="/admin/checkout-products" className="admin-link">
            <button>Checkout Products</button>
          </Link>
          <Link to="/admin/users" className="admin-link">
            <button>Users</button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          
       
      <div className="feedback-admin-container">
        <h2>User Feedbacks</h2>
        {error && <p className="error">{error}</p>}
        {feedbacks.length === 0 ? (
          <p>No feedbacks found.</p>
        ) : (
          <table className="feedback-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>Age</th>
                <th>expectations</th>
                <th>recommendation</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr key={fb._id}>
                  <td>{index + 1}</td>
                  <td>{fb.name}</td>
                  <td>{fb.email}</td>
                  <td>{fb.phone}</td>
                  <td>{fb.age}</td>
                  <td>{fb.expectations}</td>
                  <td>{fb.recommendation}</td>
                  <td>
                    <button onClick={() => deleteFeedback(fb._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
       </main>
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminFeedback;
