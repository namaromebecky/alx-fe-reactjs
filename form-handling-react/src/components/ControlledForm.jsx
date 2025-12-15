import React, { useState } from 'react';

const ControlledForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitMessage('');
      
      try {
        const response = await mockApiCall(formData);
        setSubmitMessage(`Success! ${response.message}`);
        setFormData({ username: '', email: '', password: '' });
      } catch (error) {
        setSubmitMessage(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const mockApiCall = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `User ${data.username} registered successfully!`
        });
      }, 1000);
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Controlled Form Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: errors.username ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.username && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: errors.email ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.email && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: errors.password ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.password && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
      
      {submitMessage && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: submitMessage.includes('Error') ? '#f8d7da' : '#d4edda',
          border: submitMessage.includes('Error') ? '1px solid #f5c6cb' : '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default ControlledForm;
