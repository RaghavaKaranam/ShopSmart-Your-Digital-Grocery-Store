// src/components/Footer/Footer.js
import React from 'react';
import './AdminFooter.css';

function AdminFooter() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} ShopSmart Pvt. Ltd. All rights reserved.</p>
      <p>Contact: support@shopsmart.com | Phone: +91-98765-43210</p>
      <p>Address: #23, Tech Street, Hyderabad, India</p>
    </footer>
  );
}

export default AdminFooter;
