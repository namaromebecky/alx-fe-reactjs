import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication simulation
    // In a real app, this would make an API call
    if (credentials.username && credentials.password) {
      // Store authentication status
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', credentials.username);
      
      // Redirect to the originally requested page or dashboard
      navigate(from, { replace: true });
    } else {
      alert('Please enter both username and password');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1976d2' }}>Already Logged In</h1>
        <p>You are already authenticated as {localStorage.getItem('username') || 'User'}.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go to Dashboard
          </button>
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto',
      backgroundColor: 'white', 
      padding: '2rem', 
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#1976d2', textAlign: 'center', marginBottom: '2rem' }}>Login</h1>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '1.5rem',
        borderLeft: '4px solid #1976d2'
      }}>
        <p style={{ margin: 0 }}><strong>Demo Credentials:</strong> Any username/password will work</p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
          After login, try accessing protected routes like Dashboard or Profile
        </p>
      </div>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter any username"
            required
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter any password"
            required
          />
        </div>
        
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          Login
        </button>
      </form>
      
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1.5rem'
      }}>
        <h4 style={{ marginTop: 0, color: '#ff9800' }}>Protected Route Demo</h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          This login page is part of the protected route demonstration.
        </p>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          After logging in, you can access the Dashboard and Profile pages.
        </p>
      </div>
    </div>
  );
};

export default Login;
