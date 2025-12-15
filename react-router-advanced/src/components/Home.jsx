import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ color: '#1976d2', marginBottom: '1.5rem' }}>Welcome to Advanced React Router Demo</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#555' }}>
        This project demonstrates advanced routing techniques in React using React Router.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#1976d2' }}>Nested Routes</h3>
          <p>Visit the Profile page to see nested routing in action with sub-sections.</p>
          <Link to="/profile" style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            Go to Profile
          </Link>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#1976d2' }}>Dynamic Routing</h3>
          <p>Check out blog posts with dynamic URLs like /blog/post-1, /blog/post-2</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/blog/post-1" style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4caf50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              Post 1
            </Link>
            <Link to="/blog/post-2" style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4caf50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              Post 2
            </Link>
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#1976d2' }}>Protected Routes</h3>
          <p>Try accessing Dashboard without logging in. You'll be redirected to login.</p>
          <Link to="/dashboard" style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#ff9800',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            Try Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
