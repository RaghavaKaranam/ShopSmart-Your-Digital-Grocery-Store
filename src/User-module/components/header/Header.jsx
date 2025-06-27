import React, { useState } from 'react';
import './Header.css';
import Logo from '../../Images/Logo.png';
import { FaShoppingCart, FaUserCircle, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  return (
    <>
      <header className="Header">
        <div className="header-content">
          {/* Left: Logo and Title */}
          <div className="logo-title">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
            <div>
              <h1 id="Title">ShopSmart: Your Digital Grocery Store</h1>
              <p className="slogan">Freshness Delivered. Simplicity Guaranteed.</p>
            </div>
          </div>

          {/* Right: Buttons and Cart */}
          <div className="header-actions">
            {!user ? (
              <>
                <Link to="/signup" className="action-btn">Sign Up</Link>
                <Link to="/login" className="action-btn">Login</Link>
              </>
            ) : (
              <div className="user-dropdown">
                <button className="user-icon" onClick={toggleDropdown}>
                  <FaUserCircle size={24} />
                  <span className="user-letter">
                    {user?.name?.split(' ')[0] || user?.fullName?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <FaTimes
                      size={16}
                      style={{ position: 'absolute', top: 6, right: 6, cursor: 'pointer' }}
                      onClick={toggleDropdown}
                    />
                    <span>{user?.name || user?.fullName || 'User'}</span>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
            <Link to="/cart" className="cart-icon" title="Go to Cart">
              <FaShoppingCart size={24} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation menu */}
      <div className="Intro">
        <div className="menu">
          <ul>
            <Link to="/home"><li>Home</li></Link>
            <Link to="/"><li>About us</li></Link>
            <Link to="/product"><li>Products</li></Link>
            <Link to="/feedback"><li>FeedBack</li></Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
