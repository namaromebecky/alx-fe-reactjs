import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ fontSize: '6rem', color: '#f44336', margin: 0 }}>404</h1>
      <h2 style={{ color: '#333', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <div style={{ 
        backgroundColor: '#ffebee', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem',
        display: 'inline-block'
      }}>
        <p style={{ margin: 0 }}>This is a 404 page that catches all undefined routes.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1976d2',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Go to Home
        </Link>
        <Link to="/about" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4caf50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Learn More
        </Link>
        <Link to="/dashboard" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#ff9800',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Try Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
