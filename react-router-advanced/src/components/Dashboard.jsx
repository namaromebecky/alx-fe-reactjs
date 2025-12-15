import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1976d2', margin: 0 }}>Dashboard</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
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
      
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Welcome, {localStorage.getItem('username') || 'User'}! This is a protected route that requires authentication.
      </p>
      
      <div style={{ 
        backgroundColor: '#e8f5e9', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>Protected Route Information</h3>
        <p>This Dashboard component is wrapped in a ProtectedRoute component.</p>
        <p>If you try to access this page without being logged in, you will be redirected to the login page.</p>
        <p>The redirect preserves the intended destination, so after login you come right back here.</p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h4>Profile</h4>
          <p>Access your profile with nested routes</p>
          <a href="/profile" style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            color: '#1976d2',
            textDecoration: 'none'
          }}>
            Go to Profile →
          </a>
        </div>
        
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h4>Settings</h4>
          <p>Manage your account settings</p>
          <a href="/profile/settings" style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            color: '#1976d2',
            textDecoration: 'none'
          }}>
            Go to Settings →
          </a>
        </div>
        
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h4>Blog</h4>
          <p>Read our latest blog posts</p>
          <a href="/blog/post-1" style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            color: '#1976d2',
            textDecoration: 'none'
          }}>
            Read Blog →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
