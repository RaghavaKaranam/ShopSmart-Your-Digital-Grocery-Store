import React, { useState } from 'react';
import './Feedback.css';
import axios from 'axios';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    aspects: '',
    expectations: '',
    recommendation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback/submit', formData);
      alert(`Thank you, ${formData.name}. Your feedback has been submitted.`);
      setFormData({
        name: '', email: '', phone: '', age: '',
        aspects: '', expectations: '', recommendation: ''
      });
    } catch (err) {
      alert('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Client Feedback Form</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Name*
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Phone
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Age
          <input type="text" name="age" value={formData.age} onChange={handleChange} />
        </label>

        <label>
          Email*
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          What aspects did you enjoy on our Service?
          <textarea name="aspects" rows="3" value={formData.aspects} onChange={handleChange}></textarea>
        </label>

        <label>
          Did the final develivery of the Product meet your expectations?
          <textarea name="expectations" rows="3" value={formData.expectations} onChange={handleChange}></textarea>
        </label>

        <label>
          How likely are you to recommend our services to others?
          <textarea name="recommendation" rows="3" value={formData.recommendation} onChange={handleChange}></textarea>
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
