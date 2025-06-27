import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { fullName, email, mobile, password } = formData;
    if (!fullName || !email || !mobile || !password) {
      setError("All fields are required");
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:5000/users/signup', formData);
      setMessage(res.data.message);
      setFormData({ fullName: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Mobile Number</label>
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Sign Up</button>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
      </form>
    </div>
  );
}

export default SignUp;
