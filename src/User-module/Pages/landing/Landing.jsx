// src/User-module/Pages/landing/Landing.jsx
import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <h1>Welcome to ShopSmart</h1>
        <p>Your One-Stop Digital Grocery Store</p>
        <div className="landing-buttons">
          <Link to="/admin/login" className="btn">Admin Login</Link> {/* 👈 Add here */}
          <Link to="/signup" className="btn">Sign Up</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/" className="btn btn-primary">Shop Now</Link>
        </div>
      </div>

      <section className="features">
        <div className="feature">
          <h3>Wide Range of Products</h3>
          <p>Explore groceries, personal care, and more all in one place.</p>
        </div>
        <div className="feature">
          <h3>Secure Checkout</h3>
          <p>Shop with confidence through our safe payment gateway.</p>
        </div>
        <div className="feature">
          <h3>Fast Delivery</h3>
          <p>Get your essentials delivered to your doorstep in no time.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
