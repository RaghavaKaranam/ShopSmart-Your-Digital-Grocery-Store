import React, { useState } from 'react';
import './AdminHeader.css';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-company-name">ShopSmart</h1>
        <h2 className="admin-panel-heading">Admin Panel</h2>
      </div>

      <div className="admin-header-right">
        <div className="admin-user">
          <button onClick={() => setDropdownVisible(!dropdownVisible)} className="admin-user-icon">
            <FaUserCircle size={22} />
            <span className="admin-name">
              {admin?.name || 'Admin'}
            </span>
          </button>

          {dropdownVisible && (
            <div className="admin-dropdown">
              <FaTimes
                className="dropdown-close"
                onClick={() => setDropdownVisible(false)}
              />
              
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
